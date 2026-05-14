import Types  "../types/roles";
import Map    "mo:core/Map";
import List   "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Order "mo:core/Order";
import CommonTypes "../types/common";

module {
  // ── State ────────────────────────────────────────────────────────────────────
  // Key: shopId, Value: list of staff members for that shop
  public type State = {
    // shopId -> [StaffMember]
    shopStaff  : Map.Map<Text, List.List<Types.StaffMember>>;
    // shopId -> owner principal (single owner per shop)
    shopOwners : Map.Map<Text, Principal>;
    // shopId -> customerId counter
    nextCustomerId : Map.Map<Text, Nat>;
    customers : Map.Map<Text, List.List<Types.Customer>>;  // shopId -> customers
  };

  public func newState() : State {
    {
      shopStaff      = Map.empty<Text, List.List<Types.StaffMember>>();
      shopOwners     = Map.empty<Text, Principal>();
      nextCustomerId = Map.empty<Text, Nat>();
      customers      = Map.empty<Text, List.List<Types.Customer>>();
    };
  };

  // ── Staff management ─────────────────────────────────────────────────────────

  public func getMyRole(state : State, shopId : Text, caller : Principal) : Types.ShopRole {
    // If no owner set yet, bootstrap: caller is treated as owner
    switch (state.shopOwners.get(shopId)) {
      case null #owner;
      case (?owner) {
        if (Principal.equal(owner, caller)) #owner
        else {
          switch (state.shopStaff.get(shopId)) {
            case null #owner; // no staff list: fallback owner
            case (?staffList) {
              switch (staffList.find(func(s : Types.StaffMember) : Bool { Principal.equal(s.principal, caller) })) {
                case (?_) #staff;
                case null #owner; // unknown callers treated as owner for backward compat
              };
            };
          };
        };
      };
    };
  };

  public func getShopStaff(state : State, shopId : Text) : [Types.StaffMember] {
    switch (state.shopStaff.get(shopId)) {
      case null [];
      case (?list) list.toArray();
    };
  };

  public func addStaff(state : State, shopId : Text, owner : Principal, staffPrincipal : Principal) : Result<(), Text> {
    ensureOwner(state, shopId, owner);
    if (Principal.equal(owner, staffPrincipal)) return #err("Owner cannot add themselves as staff");
    let list = switch (state.shopStaff.get(shopId)) {
      case null {
        let l = List.empty<Types.StaffMember>();
        state.shopStaff.add(shopId, l);
        l;
      };
      case (?l) l;
    };
    // Dedup: do not add if already staff
    switch (list.find(func(s : Types.StaffMember) : Bool { Principal.equal(s.principal, staffPrincipal) })) {
      case (?_) #err("Already a staff member");
      case null {
        list.add({ principal = staffPrincipal; role = #staff; addedAt = Time.now() });
        #ok(());
      };
    };
  };

  public func removeStaff(state : State, shopId : Text, owner : Principal, staffPrincipal : Principal) : Result<(), Text> {
    ensureOwner(state, shopId, owner);
    switch (state.shopStaff.get(shopId)) {
      case null #err("No staff found");
      case (?list) {
        let sizeBefore = list.size();
        let filtered = list.filter(func(s : Types.StaffMember) : Bool { not Principal.equal(s.principal, staffPrincipal) });
        list.clear();
        list.append(filtered);
        if (list.size() < sizeBefore) #ok(()) else #err("Staff member not found");
      };
    };
  };

  // ── Customer management ──────────────────────────────────────────────────────

  public func createOrUpdateCustomer(state : State, shopId : Text, name : Text, phone : Text) : Types.CustomerId {
    let list = switch (state.customers.get(shopId)) {
      case null {
        let l = List.empty<Types.Customer>();
        state.customers.add(shopId, l);
        l;
      };
      case (?l) l;
    };
    // Dedup by phone (primary key for a shop)
    let phoneLower = phone.toLower();
    switch (list.findIndex(func(c : Types.Customer) : Bool { c.phone.toLower() == phoneLower })) {
      case (?idx) {
        let existing = list.at(idx);
        // Update name if different
        if (existing.name != name) {
          list.put(idx, { existing with name = name });
        };
        existing.id;
      };
      case null {
        let nextId = switch (state.nextCustomerId.get(shopId)) {
          case null 1;
          case (?n) n + 1;
        };
        state.nextCustomerId.add(shopId, nextId);
        let c : Types.Customer = {
          id               = nextId;
          shopId           = shopId;
          name             = name;
          phone            = phone;
          totalBills       = 0;
          totalSpent       = 0.0;
          lastPurchaseDate = null;
          createdAt        = Time.now();
        };
        list.add(c);
        nextId;
      };
    };
  };

  public func getShopCustomers(state : State, shopId : Text) : [Types.CustomerView] {
    switch (state.customers.get(shopId)) {
      case null [];
      case (?list) {
        // Sort by lastPurchaseDate desc (most recent first), nulls last
        let sorted = list.sort(func(a : Types.Customer, b : Types.Customer) : Order.Order {
          switch (a.lastPurchaseDate, b.lastPurchaseDate) {
            case (null, null) #equal;
            case (null, ?_)   #greater;
            case (?_, null)   #less;
            case (?da, ?db)   Int.compare(db, da);
          };
        });
        sorted.map<Types.Customer, Types.CustomerView>(func(c : Types.Customer) : Types.CustomerView {
          { c with shopId = c.shopId };
        }).toArray();
      };
    };
  };

  public func searchCustomers(state : State, shopId : Text, searchQuery : Text) : [Types.CustomerView] {
    let q = searchQuery.toLower();
    switch (state.customers.get(shopId)) {
      case null [];
      case (?list) {
        list.filter(func(c : Types.Customer) : Bool {
          c.name.toLower().contains(#text q) or c.phone.toLower().contains(#text q);
        }).map<Types.Customer, Types.CustomerView>(func(c : Types.Customer) : Types.CustomerView {
          { c with shopId = c.shopId };
        }).toArray();
      };
    };
  };

  // ── Owner registration ──────────────────────────────────────────────────────

  public func registerShopOwner(state : State, shopId : Text, caller : Principal) {
    // Only set the owner if not already set (first-call wins)
    switch (state.shopOwners.get(shopId)) {
      case null { state.shopOwners.add(shopId, caller) };
      case (?_) {}; // already registered — no-op
    };
  };

  public func isShopOwner(state : State, shopId : Text, caller : Principal) : Bool {
    switch (state.shopOwners.get(shopId)) {
      case null true; // unregistered shop: bootstrap as owner
      case (?owner) Principal.equal(owner, caller);
    };
  };

  public func ensureOwner(state : State, shopId : Text, caller : Principal) {
    if (not isShopOwner(state, shopId, caller)) {
      Runtime.trap("Only the shop owner can perform this action");
    };
  };

  // ── Customer stats update (called after bill creation) ───────────────────────

  public func recordBillForCustomer(state : State, shopId : Text, customerPhone : Text, amount : Float, billTime : Int) {
    switch (state.customers.get(shopId)) {
      case null {};
      case (?list) {
        let phoneLower = customerPhone.toLower();
        list.mapInPlace(func(c : Types.Customer) : Types.Customer {
          if (c.phone.toLower() == phoneLower) {
            { c with
              totalBills       = c.totalBills + 1;
              totalSpent       = c.totalSpent + amount;
              lastPurchaseDate = ?billTime;
            };
          } else c;
        });
      };
    };
  };

  // ── Bills lookup for customer ────────────────────────────────────────────────

  public func getCustomerBills(billList : List.List<CommonTypes.Bill>, shopId : Text, customerId : Types.CustomerId, customers : Map.Map<Text, List.List<Types.Customer>>) : [CommonTypes.Bill] {
    // Find the customer to get name+phone
    let customerOpt : ?Types.Customer = switch (customers.get(shopId)) {
      case null null;
      case (?list) list.find(func(c : Types.Customer) : Bool { c.id == customerId });
    };
    switch (customerOpt) {
      case null [];
      case (?customer) {
        billList.filter(func(b : CommonTypes.Bill) : Bool {
          b.customerPhone.toLower() == customer.phone.toLower();
        }).toArray();
      };
    };
  };

  // ── Shop deletion helpers ────────────────────────────────────────────────────
  // Removes shopOwners entry, shopStaff entry, customers entry, and nextCustomerId entry for a shopId.
  public func removeShopData(state : State, shopId : Text) {
    state.shopOwners.remove(shopId);
    state.shopStaff.remove(shopId);
    state.customers.remove(shopId);
    state.nextCustomerId.remove(shopId);
  };

  // Removes all staff entries across all shops for a given principal.
  // Also removes the principal from shopOwners if they own any shop.
  public func removeUserData(state : State, principalText : Text) {
    // Remove all shopOwner entries where this principal is the owner
    let ownedShops = List.empty<Text>();
    for ((shopId, owner) in state.shopOwners.entries()) {
      if (owner.toText() == principalText) {
        ownedShops.add(shopId);
      };
    };
    ownedShops.forEach(func(shopId : Text) {
      state.shopOwners.remove(shopId);
    });
    // Remove this principal from all shop staff lists
    for ((_, staffList) in state.shopStaff.entries()) {
      let filtered = staffList.filter(func(s : Types.StaffMember) : Bool {
        s.principal.toText() != principalText
      });
      staffList.clear();
      staffList.append(filtered);
    };
  };

  // ── Result type alias ────────────────────────────────────────────────────────
  public type Result<A, B> = { #ok : A; #err : B };
};
