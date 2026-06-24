import Types       "../types/common";
import BillLib     "../lib/bill";
import ProdLib     "../lib/product";
import Runtime     "mo:core/Runtime";
import BillSharingTypes "../types/bill-sharing";
import Time "mo:core/Time";
import RolesLib "../lib/roles";
import Text "mo:core/Text";

mixin (billState : BillLib.State, prodState : ProdLib.State, settingsState : { var config : ?Types.ShopConfig }, rolesState : RolesLib.State) {
  // ── Bill CRUD ─────────────────────────────────────────────────────────────
  public shared ({ caller }) func createBill(shopId : Text, input : Types.CreateBillInput) : async Types.Bill {
    let shopConfig = switch (settingsState.config) {
      case null Runtime.trap("Shop not configured. Please complete setup first.");
      case (?cfg) cfg;
    };

    // Bind shopId into the input record for bill isolation
    let isolatedInput : Types.CreateBillInput = { input with shopId };

    // Pre-compute enriched items (with tax) to calculate profit and deduct stock
    let enriched = BillLib.enrichItems(isolatedInput.items, shopConfig.taxRate, shopConfig.taxSystem);

    // Calculate profit using product cost prices
    // Formula: sum of [(rate * qty - discount) - (costPrice * qty)] per item
    // Bill-level extraCharges do NOT affect profit — only item-level discount matters.
    var profit : Float = 0.0;
    enriched.forEach(func(item : Types.BillItem) {
      let costPrice = switch (ProdLib.getProduct(prodState, item.productId)) {
        case null 0.0;
        case (?pv) pv.costPrice;
      };
      // Revenue from this item minus its cost basis
      let itemRevenue = item.rate * item.qty - item.discount;
      let itemCost    = costPrice * item.qty;
      let itemProfit  = itemRevenue - itemCost;
      // Include all profit/loss — loss-making items (itemProfit < 0) must reduce total
      profit += itemProfit;
    });

    // Deduct stock using FEFO for medical items and record sale time
    let saleTime = Time.now();
    enriched.forEach(func(item : Types.BillItem) {
      let effectiveId = switch (ProdLib.fefoProductId(prodState, item.productId)) {
        case null item.productId;
        case (?eid) eid;
      };
      ignore ProdLib.adjustStock(prodState, effectiveId, -item.qty);
      ProdLib.updateLastSaleTime(prodState, effectiveId, saleTime);
    });

    BillLib.createBill(billState, isolatedInput, shopConfig, profit);
  };

  // ── Bill sharing ───────────────────────────────────────────────────────────
  public shared ({ caller }) func generateBillShareToken(billId : Types.BillId) : async ?Text {
    BillLib.generateShareToken(billState, billId);
  };

  public query func getPublicBill(billId : Types.BillId, shareToken : Text) : async ?BillSharingTypes.PublicBillView {
    BillLib.getPublicBill(billState, billId, shareToken);
  };

  public query func getBill(id : Types.BillId) : async ?Types.Bill {
    BillLib.getBill(billState, id);
  };

  public shared ({ caller }) func listBills(shopId : Text, filter : Types.BillFilter) : async [Types.Bill] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    let isolatedFilter : Types.BillFilter = { filter with shopId = ?shopId };
    BillLib.listBills(billState, isolatedFilter);
  };

  public shared ({ caller }) func cancelBill(id : Types.BillId) : async Bool {
    BillLib.cancelBill(billState, id);
  };

  // ── Payment management ───────────────────────────────────────────────────
  /// Returns all bills with partial payment and pending amount > 0. Owner-only.
  public shared ({ caller }) func getPendingPaymentBills(shopId : Text) : async [Types.Bill] {
    if (shopId.size() == 0) return [];
    if (not RolesLib.isShopOwner(rolesState, shopId, caller)) {
      Runtime.trap("Access denied: owner only");
    };
    BillLib.getPendingPaymentBills(billState, shopId);
  };

  /// Records an additional payment against a partial bill. Owner-only.
  public shared ({ caller }) func recordPayment(shopId : Text, billId : Types.BillId, additionalAmount : Float) : async Types.Bill {
    if (not RolesLib.isShopOwner(rolesState, shopId, caller)) {
      Runtime.trap("Access denied: owner only");
    };
    switch (BillLib.recordPayment(billState, billId, additionalAmount)) {
      case (#ok bill) bill;
      case (#err msg) Runtime.trap(msg);
    };
  };

  /// Records that a WhatsApp reminder was sent for a bill. Owner or staff.
  public shared ({ caller }) func recordReminderSent(shopId : Text, billId : Types.BillId) : async () {
    let role = RolesLib.getMyRole(rolesState, shopId, caller);
    switch (role) {
      case (#owner) {};
      case (#staff) {};
      case _ { Runtime.trap("Access denied: owner or staff only") };
    };
    switch (BillLib.recordReminderSent(billState, billId)) {
      case (#ok) ();
      case (#err msg) Runtime.trap(msg);
    };
  };

  // ── Stock value & movement analytics ────────────────────────────────────────
  public shared ({ caller }) func getStockValue(shopId : Text) : async Float {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    BillLib.getStockValue(prodState, shopId);
  };

  public shared ({ caller }) func getFastMovingProducts(shopId : Text, limit : Nat) : async [Types.TopProduct] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    BillLib.getFastMovingProducts(billState, shopId, limit);
  };

  public shared ({ caller }) func getSlowMovingProducts(shopId : Text, limit : Nat) : async [Types.TopProduct] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    BillLib.getSlowMovingProducts(billState, prodState, shopId, limit);
  };

  // ── Analytics ─────────────────────────────────────────────────────────────
  public shared ({ caller }) func getSalesSummary(shopId : Text, period : Types.AnalyticsPeriod) : async Types.SalesSummary {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    BillLib.getSalesSummary(billState, shopId, period);
  };

  public shared ({ caller }) func getTopProducts(shopId : Text, period : Types.AnalyticsPeriod, limit : Nat) : async [Types.TopProduct] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    BillLib.getTopProducts(billState, shopId, period, limit);
  };
};
