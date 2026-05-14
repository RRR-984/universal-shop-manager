import Types       "../types/common";
import BillLib     "../lib/bill";
import ProdLib     "../lib/product";
import Runtime     "mo:core/Runtime";
import BillSharingTypes "../types/bill-sharing";
import Time "mo:core/Time";
import RolesLib "../lib/roles";

mixin (billState : BillLib.State, prodState : ProdLib.State, settingsState : { var config : ?Types.ShopConfig }, rolesState : RolesLib.State) {
  // ── Bill CRUD ─────────────────────────────────────────────────────────────
  public shared func createBill(input : Types.CreateBillInput) : async Types.Bill {
    let shopConfig = switch (settingsState.config) {
      case null Runtime.trap("Shop not configured. Please complete setup first.");
      case (?cfg) cfg;
    };

    // Pre-compute enriched items (with tax) to calculate profit and deduct stock
    let enriched = BillLib.enrichItems(input.items, shopConfig.taxRate, shopConfig.taxSystem);

    // Calculate profit using product cost prices
    var profit : Float = 0.0;
    enriched.forEach(func(item : Types.BillItem) {
      let costPrice = switch (ProdLib.getProduct(prodState, item.productId)) {
        case null 0.0;
        case (?pv) pv.costPrice;
      };
      let itemProfit = (item.rate - costPrice) * item.qty - item.discount;
      if (itemProfit > 0.0) { profit += itemProfit };
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

    BillLib.createBill(billState, input, shopConfig, profit);
  };

  // ── Bill sharing ───────────────────────────────────────────────────────────
  public shared func generateBillShareToken(billId : Types.BillId) : async ?Text {
    BillLib.generateShareToken(billState, billId);
  };

  public query func getPublicBill(billId : Types.BillId, shareToken : Text) : async ?BillSharingTypes.PublicBillView {
    BillLib.getPublicBill(billState, billId, shareToken);
  };

  public query func getBill(id : Types.BillId) : async ?Types.Bill {
    BillLib.getBill(billState, id);
  };

  public query func listBills(filter : Types.BillFilter) : async [Types.Bill] {
    BillLib.listBills(billState, filter);
  };

  public shared func cancelBill(id : Types.BillId) : async Bool {
    BillLib.cancelBill(billState, id);
  };

  // ── Payment management ───────────────────────────────────────────────────
  /// Returns all bills with partial payment and pending amount > 0. Owner-only.
  public shared ({ caller }) func getPendingPaymentBills(shopId : Text) : async [Types.Bill] {
    if (not RolesLib.isShopOwner(rolesState, shopId, caller)) {
      Runtime.trap("Access denied: owner only");
    };
    BillLib.getPendingPaymentBills(billState);
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

  // ── Analytics ─────────────────────────────────────────────────────────────
  public query func getSalesSummary(period : Types.AnalyticsPeriod) : async Types.SalesSummary {
    BillLib.getSalesSummary(billState, period);
  };

  public query func getTopProducts(period : Types.AnalyticsPeriod, limit : Nat) : async [Types.TopProduct] {
    BillLib.getTopProducts(billState, period, limit);
  };
};
