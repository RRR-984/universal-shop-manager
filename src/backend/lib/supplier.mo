import Types  "../types/supplier";
import List   "mo:core/List";
import Time   "mo:core/Time";
import Nat    "mo:core/Nat";
import Array "mo:core/Array";
import Int "mo:core/Int";

module {
  // ── State ─────────────────────────────────────────────────────────────────
  public type State = {
    suppliers         : List.List<Types.Supplier>;
    supplierPurchases : List.List<Types.SupplierPurchase>;
    var nextSuppId    : Nat;  // used to generate unique IDs
    var nextPurchId   : Nat;
  };

  public func newState() : State {
    {
      suppliers         = List.empty<Types.Supplier>();
      supplierPurchases = List.empty<Types.SupplierPurchase>();
      var nextSuppId    = 1;
      var nextPurchId   = 1;
    };
  };

  // ── Supplier CRUD ─────────────────────────────────────────────────────────

  public func createSupplier(state : State, shopId : Text, name : Text, businessType : Text, phone : Text, email : ?Text, address : ?Text, city : ?Text, defaultTransportCharge : ?Text) : Types.Supplier {
    let id = state.nextSuppId.toText() # "-" # Time.now().toText();
    state.nextSuppId += 1;
    let s : Types.Supplier = {
      id; shopId; name; businessType; phone; email; address; city; defaultTransportCharge;
    };
    state.suppliers.add(s);
    s;
  };

  public func getSupplier(state : State, supplierId : Types.SupplierId) : ?Types.Supplier {
    state.suppliers.find(func(s : Types.Supplier) : Bool { s.id == supplierId });
  };

  public func listSuppliersByShop(state : State, shopId : Text) : [Types.Supplier] {
    state.suppliers.filter(func(s : Types.Supplier) : Bool { s.shopId == shopId }).toArray();
  };

  public func updateSupplier(state : State, supplierId : Types.SupplierId, name : Text, businessType : Text, phone : Text, email : ?Text, address : ?Text, city : ?Text, defaultTransportCharge : ?Text) : ?Types.Supplier {
    var found = false;
    state.suppliers.mapInPlace(func(s : Types.Supplier) : Types.Supplier {
      if (s.id == supplierId) {
        found := true;
        { s with name; businessType; phone; email; address; city; defaultTransportCharge };
      } else s;
    });
    if (not found) return null;
    getSupplier(state, supplierId);
  };

  public func deleteSupplier(state : State, supplierId : Types.SupplierId) : Bool {
    let sizeBefore = state.suppliers.size();
    let remaining = state.suppliers.filter(func(s : Types.Supplier) : Bool { s.id != supplierId });
    state.suppliers.clear();
    state.suppliers.append(remaining);
    state.suppliers.size() < sizeBefore;
  };

  // ── SupplierPurchase CRUD ─────────────────────────────────────────────────

  public func createSupplierPurchase(state : State, shopId : Text, supplierId : Types.SupplierId, productId : Nat, quantity : Float, purchasePrice : Text, transportCharge : Text, notes : ?Text) : Types.SupplierPurchase {
    let id = state.nextPurchId.toText() # "-" # Time.now().toText();
    state.nextPurchId += 1;
    let p : Types.SupplierPurchase = {
      id; shopId; supplierId; productId;
      purchaseDate  = Time.now();
      quantity; purchasePrice; transportCharge; notes;
    };
    state.supplierPurchases.add(p);
    p;
  };

  public func listPurchasesBySupplier(state : State, shopId : Text, supplierId : Types.SupplierId) : [Types.SupplierPurchase] {
    state.supplierPurchases.filter(func(p : Types.SupplierPurchase) : Bool {
      p.shopId == shopId and p.supplierId == supplierId
    }).toArray();
  };

  public func listPurchasesByProduct(state : State, shopId : Text, productId : Nat) : [Types.SupplierPurchase] {
    state.supplierPurchases.filter(func(p : Types.SupplierPurchase) : Bool {
      p.shopId == shopId and p.productId == productId
    }).toArray();
  };

  // Returns the last 3 SupplierPurchase records for a product, each decorated
  // with the supplierName — used by the price-comparison modal.
  public func getLastNPurchasesForProduct(state : State, shopId : Text, productId : Nat, n : Nat) : [Types.SupplierPurchaseWithName] {
    // Collect all purchases for this product+shop, sorted by date descending
    let all = state.supplierPurchases.filter(func(p : Types.SupplierPurchase) : Bool {
      p.shopId == shopId and p.productId == productId
    }).toArray();
    // Sort descending by purchaseDate
    let sorted = all.sort(func(a, b) {
      if (a.purchaseDate > b.purchaseDate) #less
      else if (a.purchaseDate < b.purchaseDate) #greater
      else #equal
    });
    // Take first n, decorate with supplierName
    let limit = if (n < sorted.size()) n else sorted.size();
    let result = List.empty<Types.SupplierPurchaseWithName>();
    var i = 0;
    while (i < limit) {
      let purchase = sorted[i];
      let supplierName = switch (getSupplier(state, purchase.supplierId)) {
        case null "Unknown";
        case (?s) s.name;
      };
      result.add({ purchase; supplierName });
      i += 1;
    };
    result.toArray();
  };
};
