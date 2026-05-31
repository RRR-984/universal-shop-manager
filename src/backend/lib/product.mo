import Types  "../types/common";
import List   "mo:core/List";
import Time   "mo:core/Time";
import Text   "mo:core/Text";
import Nat    "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

module {
  // ── State types ──────────────────────────────────────────────────────────────
  public type State = {
    products   : List.List<Types.Product>;
    var nextId : Nat;
  };

  public func newState() : State {
    { products = List.empty<Types.Product>(); var nextId = 1 };
  };

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  public func createProduct(state : State, input : Types.CreateProductInput) : Types.ProductView {
    // Guard: empty shopId is not allowed
    if (input.shopId.size() == 0) {
      Runtime.trap("shopId must not be empty");
    };
    // IMEI validation: required only when mobileCategory == "Mobile" and IMEI is provided
    switch (input.engineFields) {
      case (#Mobile mf) {
        if (mf.mobileCategory == "Mobile" and mf.imei != "") {
          if (mf.imei.size() != 15) {
            Runtime.trap("IMEI must be exactly 15 digits for mobile phones");
          };
        };
      };
      case _ {};
    };
    // Duplicate barcode check within the same shop
    switch (input.barcode) {
      case (?bc) {
        if (bc.size() > 0) {
          let existing = state.products.find(func(p : Types.Product) : Bool {
            p.shopId == input.shopId and
            (switch (p.barcode) { case null false; case (?pbc) pbc == bc })
          });
          switch (existing) {
            case (?_) { Runtime.trap("Barcode already exists in this shop") };
            case null {};
          };
        };
      };
      case null {};
    };
    let now = Time.now();
    let id  = state.nextId;
    state.nextId += 1;
    let p : Types.Product = {
      id             = id;
      shopId         = input.shopId;
      name           = input.name;
      shopType       = input.shopType;
      category       = input.category;
      unit           = input.unit;
      costPrice      = input.costPrice;
      retailPrice    = input.retailPrice;
      wholesalePrice = input.wholesalePrice;
      transportCost  = input.transportCost;
      labourCost     = input.labourCost;
      barcode        = input.barcode;
      var stock      = input.stock;
      minStock       = input.minStock;
      isActive       = input.isActive;
      engineFields   = input.engineFields;
      createdAt      = now;
      updatedAt      = now;
      var lastSaleTime = ?now; // set to now so new products are never immediately dead stock
    };
    state.products.add(p);
    toView(p);
  };

  public func getProduct(state : State, id : Types.ProductId) : ?Types.ProductView {
    switch (state.products.find(func(p : Types.Product) : Bool { p.id == id })) {
      case null null;
      case (?p) ?toView(p);
    };
  };

  public func listProducts(state : State, filter : Types.ProductFilter) : [Types.ProductView] {
    // Guard: shopId is mandatory — returning all products across shops is never safe
    let shopIdToMatch : Text = switch (filter.shopId) {
      case null return [];
      case (?sid) {
        if (sid.size() == 0) return [];
        sid;
      };
    };
    let filtered = state.products.filter(func(p : Types.Product) : Bool {
      let matchShopId = p.shopId == shopIdToMatch;
      let matchShopType = switch (filter.shopType) {
        case null true;
        case (?st) p.shopType == st;
      };
      let matchCategory = switch (filter.category) {
        case null true;
        case (?c) p.category == c;
      };
      let matchActive = switch (filter.isActive) {
        case null true;
        case (?a) p.isActive == a;
      };
      let matchName = switch (filter.searchName) {
        case null true;
        case (?n) {
          let lower = p.name.toLower();
          let term  = n.toLower();
          lower.contains(#text term);
        };
      };
      matchShopId and matchShopType and matchCategory and matchActive and matchName;
    });
    filtered.map<Types.Product, Types.ProductView>(func(p) { toView(p) }).toArray();
  };

  public func updateProduct(state : State, shopId : Text, input : Types.UpdateProductInput) : ?Types.ProductView {
    // Guard: empty shopId is not allowed
    if (shopId.size() == 0) {
      Runtime.trap("shopId must not be empty");
    };
    // IMEI validation on update: same rule as on create
    switch (input.engineFields) {
      case (#Mobile mf) {
        if (mf.mobileCategory == "Mobile" and mf.imei != "") {
          if (mf.imei.size() != 15) {
            Runtime.trap("IMEI must be exactly 15 digits for mobile phones");
          };
        };
      };
      case _ {};
    };
    // Duplicate barcode check on update: ensure no other product in same shop has this barcode
    switch (input.barcode) {
      case (?bc) {
        if (bc.size() > 0) {
          let duplicate = state.products.find(func(p : Types.Product) : Bool {
            p.shopId == shopId and p.id != input.id and
            (switch (p.barcode) { case null false; case (?pbc) pbc == bc })
          });
          switch (duplicate) {
            case (?_) { Runtime.trap("Barcode already exists in this shop") };
            case null {};
          };
        };
      };
      case null {};
    };
    var found = false;
    state.products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == input.id) {
        // Ownership check: product must belong to the caller's shop
        if (p.shopId != shopId) {
          Runtime.trap("Product does not belong to this shop");
        };
        found := true;
        {
          p with
          name           = input.name;
          category       = input.category;
          unit           = input.unit;
          costPrice      = input.costPrice;
          retailPrice    = input.retailPrice;
          wholesalePrice = input.wholesalePrice;
          transportCost  = input.transportCost;
          labourCost     = input.labourCost;
          barcode        = input.barcode;
          var stock      = input.stock;
          minStock       = input.minStock;
          isActive       = input.isActive;
          engineFields   = input.engineFields;
          updatedAt      = Time.now();
          var lastSaleTime = p.lastSaleTime;
        };
      } else p;
    });
    if (not found) return null;
    getProduct(state, input.id);
  };

  public func deleteProduct(state : State, id : Types.ProductId) : Bool {
    let sizeBefore = state.products.size();
    let remaining = state.products.filter(func(p : Types.Product) : Bool { p.id != id });
    state.products.clear();
    state.products.append(remaining);
    state.products.size() < sizeBefore;
  };

  public func searchProducts(state : State, shopId : Text, searchTerm : Text) : [Types.ProductView] {
    // Guard: empty shopId would return all shops' data
    if (shopId.size() == 0) return [];
    let term = searchTerm.toLower();
    let matched = state.products.filter(func(p : Types.Product) : Bool {
      let matchShopId = p.shopId == shopId;
      let matchActive = p.isActive;
      if (term == "") {
        // Empty search term: return all active products for this shop
        matchShopId and matchActive;
      } else {
        let matchName   = p.name.toLower().contains(#text term);
        let matchBarcode = switch (p.barcode) {
          case null false;
          case (?bc) bc.toLower().contains(#text term);
        };
        let matchCategory = p.category.toLower().contains(#text term);
        matchShopId and matchActive and (matchName or matchBarcode or matchCategory);
      };
    });
    matched.map<Types.Product, Types.ProductView>(func(p) { toView(p) }).toArray();
  };

  // Exact barcode lookup within a shop — for scanner workflows.
  public func getProductByBarcode(state : State, shopId : Text, barcode : Text) : ?Types.ProductView {
    if (shopId.size() == 0) return null;
    switch (state.products.find(func(p : Types.Product) : Bool {
      p.shopId == shopId and (switch (p.barcode) { case null false; case (?bc) bc == barcode })
    })) {
      case null null;
      case (?p) ?toView(p);
    };
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  public func toView(p : Types.Product) : Types.ProductView {
    {
      id             = p.id;
      shopId         = p.shopId;
      name           = p.name;
      shopType       = p.shopType;
      category       = p.category;
      unit           = p.unit;
      costPrice      = p.costPrice;
      retailPrice    = p.retailPrice;
      wholesalePrice = p.wholesalePrice;
      transportCost  = p.transportCost;
      labourCost     = p.labourCost;
      barcode        = p.barcode;
      stock          = p.stock;
      minStock       = p.minStock;
      isActive       = p.isActive;
      engineFields   = p.engineFields;
      createdAt      = p.createdAt;
      updatedAt      = p.updatedAt;
      lastSaleTime   = p.lastSaleTime;
    };
  };

  // ── Analytics helpers ─────────────────────────────────────────────────────────
  public func getLowStockProducts(state : State, shopId : Text) : [Types.LowStockProduct] {
    if (shopId.size() == 0) return [];
    let low = state.products.filter(func(p : Types.Product) : Bool {
      p.isActive and p.stock <= p.minStock and p.shopId == shopId;
    });
    low.map<Types.Product, Types.LowStockProduct>(func(p) {
      { productId = p.id; name = p.name; stock = p.stock; minStock = p.minStock };
    }).toArray();
  };

  // Parse ISO date string "YYYY-MM-DD" → nanosecond Timestamp (midnight UTC)
  // Returns null if parsing fails.
  public func parseISODate(dateStr : Text) : ?Types.Timestamp {
    let parts = dateStr.split(#char '-');
    let arr = parts.toArray();
    if (arr.size() != 3) return null;
    switch (Nat.fromText(arr[0]), Nat.fromText(arr[1]), Nat.fromText(arr[2])) {
      case (?y, ?m, ?d) {
        let totalDays = daysFromEpoch(y, m, d);
        let nanosPerDay : Int = 86_400_000_000_000;
        ?(totalDays * nanosPerDay);
      };
      case _ null;
    };
  };

  func daysFromEpoch(year : Nat, month : Nat, day : Nat) : Int {
    // Rata Die algorithm adapted to Unix epoch (1970-01-01 = day 0)
    let y : Int = if (month <= 2) year.toInt() - 1 else year.toInt();
    let m : Int = if (month <= 2) month.toInt() + 9 else month.toInt() - 3;
    let d : Int = day.toInt();
    let era : Int = (if (y >= 0) y else y - 399) / 400;
    let yoe : Int = y - era * 400;
    let doy : Int = (153 * m + 2) / 5 + d - 1;
    let doe : Int = yoe * 365 + yoe / 4 - yoe / 100 + doy;
    era * 146097 + doe - 719468;
  };

  // ── Expiry date extraction helper ─────────────────────────────────────────────
  // Returns the expiry date Text from any EngineFields variant that has one.
  // Medical always returns its required expiryDate; all others return ?Text.
  public func getExpiryDateFromFields(fields : Types.EngineFields) : ?Text {
    switch fields {
      case (#Medical f)         ?f.expiryDate;
      case (#Mobile f)          f.expiryDate;
      case (#Electronics f)     f.expiryDate;
      case (#Clothing f)        f.expiryDate;
      case (#Footwear f)        f.expiryDate;
      case (#Grocery f)         f.expiryDate;
      case (#Stationery f)      f.expiryDate;
      case (#Restaurant f)      f.expiryDate;
      case (#AutoParts f)       f.expiryDate;
      case (#Hardware f)        f.expiryDate;
      case (#Jewelry f)         f.expiryDate;
      case (#Salon f)           f.expiryDate;
      case (#General f)         f.expiryDate;
      case (#BuildingMaterial f) f.expiryDate;
      case (#AgroProducts f)     f.expiryDate;
      case (#FruitsVegetables f) f.freshnessDate;
      case (#Electrical f)       f.expiryDate;
    };
  };

  public func getNearExpiryProducts(state : State, shopId : Text, withinDays : Int) : [Types.NearExpiryProduct] {
    if (shopId.size() == 0) return [];
    let now = Time.now();
    let cutoff : Int = now + withinDays * 86_400_000_000_000;
    let result = List.empty<Types.NearExpiryProduct>();
    state.products.forEach(func(p : Types.Product) {
      if (p.isActive and p.shopId == shopId) {
        switch (getExpiryDateFromFields(p.engineFields)) {
          case null {};
          case (?dateStr) {
            switch (parseISODate(dateStr)) {
              case null {};
              case (?expiryTs) {
                if (expiryTs <= cutoff) {
                  let daysLeft : Int = (expiryTs - now) / 86_400_000_000_000;
                  result.add({
                    productId  = p.id;
                    name       = p.name;
                    expiryDate = dateStr;
                    daysLeft   = daysLeft;
                  });
                };
              };
            };
          };
        };
      };
    });
    result.toArray();
  };

  // ── Dead stock detection ──────────────────────────────────────────────────────
  // Returns active products that have had no sale for >= inactiveDays days.
  // Products with lastSaleTime = null (newly created) are NOT flagged as dead stock.
  public func getDeadStockProducts(state : State, shopId : Text, inactiveDays : Nat) : [Types.DeadStockProduct] {
    // Guard: empty shopId would return all shops' data
    if (shopId.size() == 0) return [];
    let now = Time.now();
    let nanosPerDay : Int = 86_400_000_000_000;
    let cutoff : Int = now - inactiveDays.toInt() * nanosPerDay;
    let result = List.empty<Types.DeadStockProduct>();
    state.products.forEach(func(p : Types.Product) {
      if (p.isActive and p.shopId == shopId) {
        switch (p.lastSaleTime) {
          case null {
            // null lastSaleTime: product was just created (we set it to now on create).
            // Treat as not-dead-stock — do NOT flag newly created products.
            ();
          };
          case (?lst) {
            if (lst <= cutoff) {
              let daysInactive : Nat = Int.abs((now - lst) / nanosPerDay);
              result.add({ productId = p.id; name = p.name; lastSaleTime = ?lst; daysInactive });
            };
          };
        };
      };
    });
    result.toArray();
  };

  // Update lastSaleTime for a product to the given timestamp (called when a bill is saved).
  public func updateLastSaleTime(state : State, id : Types.ProductId, ts : Types.Timestamp) {
    state.products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) { p.lastSaleTime := ?ts };
      p;
    });
  };

  public func adjustStock(state : State, id : Types.ProductId, delta : Float) : Bool {
    var found = false;
    state.products.mapInPlace(func(p : Types.Product) : Types.Product {
      if (p.id == id) {
        found := true;
        let newStock = p.stock + delta;
        { p with var stock = if (newStock < 0.0) 0.0 else newStock; var lastSaleTime = p.lastSaleTime };
      } else p;
    });
    found;
  };

  // ── FEFO: find the active medical product with earliest expiry ────────────────
  // Scans ALL active medical products with the same name as the target product,
  // and returns the one with the earliest expiry date (for stock deduction).
  public func fefoProductId(state : State, targetId : Types.ProductId) : ?Types.ProductId {
    let target = state.products.find(func(p : Types.Product) : Bool { p.id == targetId });
    switch (target) {
      case null null;
      case (?tgt) {
        switch (tgt.engineFields) {
          case (#Medical(_)) {
            var earliestId  : ?Types.ProductId = null;
            var earliestTs  : Int = 9_999_999_999_999_999_999;
            state.products.forEach(func(p : Types.Product) {
              if (p.isActive and p.stock > 0.0 and p.name == tgt.name) {
                switch (p.engineFields) {
                  case (#Medical(mf)) {
                    switch (parseISODate(mf.expiryDate)) {
                      case null {};
                      case (?ts) {
                        if (ts < earliestTs) {
                          earliestTs := ts;
                          earliestId := ?p.id;
                        };
                      };
                    };
                  };
                  case _ {};
                };
              };
            });
            switch (earliestId) {
              case null ?targetId;
              case some some;
            };
          };
          case _ ?targetId;
        };
      };
    };
  };
  // ── Shop deletion ─────────────────────────────────────────────────────────────
  // Removes all products belonging to the given shopId from the products list.
  public func removeProductsByShopId(state : State, shopId : Text) {
    let remaining = state.products.filter(func(p : Types.Product) : Bool {
      p.shopId != shopId
    });
    state.products.clear();
    state.products.append(remaining);
  };
};
