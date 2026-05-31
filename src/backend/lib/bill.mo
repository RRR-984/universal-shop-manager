import BillSharingTypes "../types/bill-sharing";
import Types    "../types/common";
import List     "mo:core/List";
import Array    "mo:core/Array";
import Map      "mo:core/Map";
import Time     "mo:core/Time";
import Nat      "mo:core/Nat";
import Text     "mo:core/Text";
import Int      "mo:core/Int";
import Order    "mo:core/Order";
import Float "mo:core/Float";

module {
  // ── State types ──────────────────────────────────────────────────────────────
  public type State = {
    bills              : List.List<Types.Bill>;
    var nextId         : Nat;
    var nextBillNumber : Nat;
  };

  public func newState() : State {
    { bills = List.empty<Types.Bill>(); var nextId = 1; var nextBillNumber = 1 };
  };

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  // profit is computed externally (by mixin) and passed in
  public func createBill(
    state      : State,
    input      : Types.CreateBillInput,
    shopConfig : Types.ShopConfig,
    profit     : Float,
  ) : Types.Bill {
    let now        = Time.now();
    let id         = state.nextId;
    let billNumber = state.nextBillNumber;
    state.nextId         += 1;
    state.nextBillNumber += 1;

    let taxSystem = shopConfig.taxSystem;
    let taxRate   = shopConfig.taxRate;

    // Enrich items with computed tax amounts and line totals
    let enrichedItems = enrichItems(input.items, taxRate, taxSystem);

    let subtotal = enrichedItems.foldLeft(
      0.0 : Float,
      func(acc : Float, item : Types.BillItem) : Float { acc + (item.qty * item.rate - item.discount) },
    );
    let totalItemDiscount = enrichedItems.foldLeft(
      0.0 : Float,
      func(acc : Float, item : Types.BillItem) : Float { acc + item.discount },
    );
    let totalTax = enrichedItems.foldLeft(
      0.0 : Float,
      func(acc : Float, item : Types.BillItem) : Float { acc + item.taxAmt },
    );
    let extraChargesTotal = input.extraCharges.foldLeft(
      0.0 : Float,
      func(acc : Float, ec : Types.ExtraCharge) : Float { acc + ec.amount },
    );
    let grandTotal = subtotal + totalTax + extraChargesTotal - input.billDiscount;

    let taxBreakdown = calcTaxBreakdown(taxSystem, taxRate, subtotal);

    let amountPending = if (input.paymentType == #full) 0.0 else {
      let pending = grandTotal - input.amountPaid;
      if (pending > 0.0) pending else 0.0;
    };

    let bill : Types.Bill = {
      id            = id;
      shopId        = input.shopId;
      billNumber    = billNumber;
      customerName  = input.customerName;
      customerPhone = input.customerPhone;
      items         = enrichedItems.toArray();
      subtotal      = subtotal;
      totalDiscount = totalItemDiscount + input.billDiscount;
      taxSystem     = taxSystem;
      taxRate       = taxRate;
      taxBreakdown  = taxBreakdown;
      extraCharges  = input.extraCharges;
      grandTotal    = grandTotal;
      profit        = profit;
      priceType     = input.priceType;
      status        = #Saved;
      shareToken    = null;  // generated on demand via generateBillShareToken
      createdAt     = now;
      staffCreatedBy   = input.staffCreatedBy;
      paymentType      = input.paymentType;
      amountPaid       = input.amountPaid;
      amountPending    = amountPending;
      lastReminderSent = null;
    };
    state.bills.add(bill);
    bill;
  };

  // ── Share token ──────────────────────────────────────────────────────────────
  public func generateShareToken(state : State, billId : Types.BillId) : ?Text {
    switch (state.bills.find(func(b : Types.Bill) : Bool { b.id == billId })) {
      case null null;
      case (?bill) {
        // Return existing token if already generated
        switch (bill.shareToken) {
          case (?existing) ?existing;
          case null {
            // Deterministic pseudo-random 16-char alphanumeric token from billId + timestamp
            let seed : Nat = billId * 1_000_000_007 + (Int.abs(Time.now()) % 1_000_000_000);
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let charArray = chars.toArray();
            let len = charArray.size();
            var token = "";
            var s = seed;
            var i = 0;
            while (i < 16) {
              let idx = s % len;
              token := token # Text.fromChar(charArray[idx]);
              s := (s * 1_664_525 + 1_013_904_223) % 4_294_967_296;
              i += 1;
            };
            let updated = { bill with shareToken = ?token };
            state.bills.mapInPlace(func(b : Types.Bill) : Types.Bill {
              if (b.id == billId) updated else b;
            });
            ?token;
          };
        };
      };
    };
  };

  public func getPublicBill(state : State, billId : Types.BillId, shareToken : Text) : ?BillSharingTypes.PublicBillView {
    switch (state.bills.find(func(b : Types.Bill) : Bool { b.id == billId })) {
      case null null;
      case (?bill) {
        switch (bill.shareToken) {
          case null null;
          case (?token) {
            if (token != shareToken) null
            else {
              ?{
                id            = bill.id;
                billNumber    = bill.billNumber;
                customerName  = bill.customerName;
                customerPhone = bill.customerPhone;
                items         = bill.items;
                subtotal      = bill.subtotal;
                totalDiscount = bill.totalDiscount;
                taxSystem     = bill.taxSystem;
                taxRate       = bill.taxRate;
                taxBreakdown  = bill.taxBreakdown;
                extraCharges  = bill.extraCharges;
                grandTotal    = bill.grandTotal;
                priceType     = bill.priceType;
                status        = bill.status;
                createdAt     = bill.createdAt;
              };
            };
          };
        };
      };
    };
  };

  public func getBill(state : State, id : Types.BillId) : ?Types.Bill {
    state.bills.find(func(b : Types.Bill) : Bool { b.id == id });
  };

  public func listBills(state : State, filter : Types.BillFilter) : [Types.Bill] {
    // Guard: shopId is mandatory — no cross-shop bill leaks
    let shopIdToMatch : Text = switch (filter.shopId) {
      case null return [];
      case (?sid) {
        if (sid.size() == 0) return [];
        sid;
      };
    };
    state.bills.filter(func(b : Types.Bill) : Bool {
      let matchShop = b.shopId == shopIdToMatch;
      let matchFrom = switch (filter.fromDate) {
        case null true;
        case (?fd) b.createdAt >= fd;
      };
      let matchTo = switch (filter.toDate) {
        case null true;
        case (?td) b.createdAt <= td;
      };
      let matchCustomer = switch (filter.searchCustomer) {
        case null true;
        case (?sc) {
          let lower = b.customerName.toLower();
          let term  = sc.toLower();
          lower.contains(#text term);
        };
      };
      let matchStatus = switch (filter.status) {
        case null true;
        case (?st) b.status == st;
      };
      matchShop and matchFrom and matchTo and matchCustomer and matchStatus;
    }).toArray();
  };

  public func cancelBill(state : State, id : Types.BillId) : Bool {
    var found = false;
    state.bills.mapInPlace(func(b : Types.Bill) : Types.Bill {
      if (b.id == id and b.status == #Saved) {
        found := true;
        { b with status = #Cancelled };
      } else b;
    });
    found;
  };

  // ── Payment management ────────────────────────────────────────────────────
  /// Returns all bills with paymentType=#partial AND amountPending > 0
  public func getPendingPaymentBills(state : State, shopId : Text) : [Types.Bill] {
    // Guard: empty shopId is not allowed — would return all shops' pending bills
    if (shopId.size() == 0) return [];
    state.bills.filter(func(b : Types.Bill) : Bool {
      b.shopId == shopId and b.status == #Saved and b.paymentType == #partial and b.amountPending > 0.0;
    }).toArray();
  };

  /// Adds additionalAmount to amountPaid, recalculates amountPending.
  /// If amountPending reaches 0, sets paymentType to #full.
  public func recordPayment(state : State, billId : Types.BillId, additionalAmount : Float) : { #ok : Types.Bill; #err : Text } {
    switch (state.bills.find(func(b : Types.Bill) : Bool { b.id == billId })) {
      case null { #err "Bill not found" };
      case (?bill) {
        if (bill.status == #Cancelled) return #err "Cannot record payment on a cancelled bill";
        let newAmountPaid = bill.amountPaid + additionalAmount;
        let rawPending = bill.grandTotal - newAmountPaid;
        let newAmountPending = if (rawPending > 0.0) rawPending else 0.0;
        let newPaymentType : Types.PaymentType = if (newAmountPending == 0.0) #full else #partial;
        let updated : Types.Bill = {
          bill with
          paymentType   = newPaymentType;
          amountPaid    = newAmountPaid;
          amountPending = newAmountPending;
        };
        state.bills.mapInPlace(func(b : Types.Bill) : Types.Bill {
          if (b.id == billId) updated else b;
        });
        #ok updated;
      };
    };
  };

  /// Records the timestamp of the most recent WhatsApp reminder sent for this bill.
  public func recordReminderSent(state : State, billId : Types.BillId) : { #ok; #err : Text } {
    switch (state.bills.find(func(b : Types.Bill) : Bool { b.id == billId })) {
      case null { #err "Bill not found" };
      case (?bill) {
        let updated : Types.Bill = { bill with lastReminderSent = ?Time.now() };
        state.bills.mapInPlace(func(b : Types.Bill) : Types.Bill {
          if (b.id == billId) updated else b;
        });
        #ok;
      };
    };
  };

  // ── Analytics ────────────────────────────────────────────────────────────────
  public func getSalesSummary(state : State, shopId : Text, period : Types.AnalyticsPeriod) : Types.SalesSummary {
    let periodStart = periodStartTime(period);
    let now         = Time.now();

    var totalSales  : Float = 0.0;
    var totalProfit : Float = 0.0;
    var billCount   : Nat   = 0;

    state.bills.forEach(func(b : Types.Bill) {
      if (b.shopId == shopId and b.status == #Saved and b.createdAt >= periodStart and b.createdAt <= now) {
        totalSales  += b.grandTotal;
        totalProfit += b.profit;
        billCount   += 1;
      };
    });

    { totalSales; totalProfit; billCount };
  };

  public func getTopProducts(state : State, shopId : Text, period : Types.AnalyticsPeriod, limit : Nat) : [Types.TopProduct] {
    let periodStart = periodStartTime(period);
    let now         = Time.now();

    let qtyMap  = Map.empty<Types.ProductId, Float>();
    let revMap  = Map.empty<Types.ProductId, Float>();
    let profMap = Map.empty<Types.ProductId, Float>();
    let nameMap = Map.empty<Types.ProductId, Text>();

    state.bills.forEach(func(b : Types.Bill) {
      if (b.shopId == shopId and b.status == #Saved and b.createdAt >= periodStart and b.createdAt <= now) {
        for (item in b.items.values()) {
          let pid     = item.productId;
          let prevQty = switch (qtyMap.get(pid))  { case null 0.0; case (?v) v };
          let prevRev = switch (revMap.get(pid))  { case null 0.0; case (?v) v };
          let prevPrf = switch (profMap.get(pid)) { case null 0.0; case (?v) v };
          qtyMap.add(pid, prevQty + item.qty);
          revMap.add(pid, prevRev + item.lineTotal);
          // Proportional profit share based on lineTotal vs grandTotal
          let itemProfit = if (b.grandTotal > 0.0) {
            item.lineTotal / b.grandTotal * b.profit;
          } else 0.0;
          profMap.add(pid, prevPrf + itemProfit);
          nameMap.add(pid, item.name);
        };
      };
    });

    let topList = List.empty<Types.TopProduct>();
    for ((pid, qty) in qtyMap.entries()) {
      let rev = switch (revMap.get(pid))  { case null 0.0; case (?v) v };
      let prf = switch (profMap.get(pid)) { case null 0.0; case (?v) v };
      let nm  = switch (nameMap.get(pid)) { case null "";  case (?v) v };
      topList.add({ productId = pid; name = nm; totalQty = qty; revenue = rev; profit = prf });
    };

    // Sort descending by revenue
    let sorted = topList.sort(func(a : Types.TopProduct, b : Types.TopProduct) : Order.Order {
      if (a.revenue > b.revenue) #less
      else if (a.revenue < b.revenue) #greater
      else #equal;
    });

    let takeN : Int = Nat.min(limit, sorted.size()).toInt();
    sorted.sliceToArray(0, takeN);
  };

  // ── Stock value ───────────────────────────────────────────────────────────────
  /// Total stock value = sum of (stock * costPerUnit) for all active products in shop.
  /// costPerUnit = (costPrice + transportCost + labourCost) / stock
  /// If stock == 0, that product contributes 0.
  public func getStockValue(prodState : { products : List.List<Types.Product> }, shopId : Text) : Float {
    if (shopId.size() == 0) return 0.0;
    var total : Float = 0.0;
    prodState.products.forEach(func(p : Types.Product) {
      if (p.isActive and p.shopId == shopId and p.stock > 0.0) {
        let transport = switch (p.transportCost) { case null 0.0; case (?v) v };
        let labour    = switch (p.labourCost)    { case null 0.0; case (?v) v };
        let totalCost = p.costPrice + transport + labour;
        let costPerUnit = totalCost / p.stock;
        total += p.stock * costPerUnit;
      };
    });
    total;
  };

  // ── Fast / Slow moving products ───────────────────────────────────────────────
  /// Fast moving = top N products by totalQty sold in the last 30 days (Month period).
  public func getFastMovingProducts(
    state    : State,
    shopId   : Text,
    limit    : Nat,
  ) : [Types.TopProduct] {
    let all = getTopProducts(state, shopId, #Month, 0);
    // Sort descending by totalQty
    let sorted = List.fromArray<Types.TopProduct>(all);
    let sortedArr = sorted.sort(func(a : Types.TopProduct, b : Types.TopProduct) : Order.Order {
      if (a.totalQty > b.totalQty) #less
      else if (a.totalQty < b.totalQty) #greater
      else #equal;
    });
    let takeN : Int = Nat.min(limit, sortedArr.size()).toInt();
    sortedArr.sliceToArray(0, takeN);
  };

  /// Slow moving = active products with stock > 0 that have low/zero qty sold in the last 90 days.
  /// Uses Month period (30 days) for recent sales; products with totalQty == 0 or not in top list
  /// within 90-day window are considered slow moving. Sorted by lastSaleTime ascending (oldest first).
  public func getSlowMovingProducts(
    state     : State,
    prodState : { products : List.List<Types.Product> },
    shopId    : Text,
    limit     : Nat,
  ) : [Types.TopProduct] {
    if (shopId.size() == 0) return [];
    // Use a 90-day window via a custom period
    let now         : Int = Time.now();
    let nanosPerDay : Int = 86_400_000_000_000;
    let periodStart90 : Int = now - 90 * nanosPerDay;

    // Build a map of productId → totalQty sold in last 90 days
    let qtyMap90 = Map.empty<Types.ProductId, Float>();
    state.bills.forEach(func(b : Types.Bill) {
      if (b.shopId == shopId and b.status == #Saved and b.createdAt >= periodStart90 and b.createdAt <= now) {
        for (item in b.items.values()) {
          let prev = switch (qtyMap90.get(item.productId)) { case null 0.0; case (?v) v };
          qtyMap90.add(item.productId, prev + item.qty);
        };
      };
    });

    // Collect all active products with stock > 0 for this shop
    let result = List.empty<Types.TopProduct>();
    prodState.products.forEach(func(p : Types.Product) {
      if (p.isActive and p.shopId == shopId and p.stock > 0.0) {
        let qtySold = switch (qtyMap90.get(p.id)) { case null 0.0; case (?v) v };
        // Slow moving: sold 0 units or sold less than 1 unit in 90 days
        if (qtySold < 1.0) {
          result.add({ productId = p.id; name = p.name; totalQty = qtySold; revenue = 0.0; profit = 0.0 });
        };
      };
    });

    // Sort by lastSaleTime ascending (oldest first) — products without recent sales first
    // We re-scan product state to get lastSaleTime for sorting
    let withLastSale = result.sort(func(a : Types.TopProduct, b : Types.TopProduct) : Order.Order {
      let lstA = switch (prodState.products.find(func(p : Types.Product) : Bool { p.id == a.productId })) {
        case null 0;
        case (?p) switch (p.lastSaleTime) { case null 0; case (?t) t };
      };
      let lstB = switch (prodState.products.find(func(p : Types.Product) : Bool { p.id == b.productId })) {
        case null 0;
        case (?p) switch (p.lastSaleTime) { case null 0; case (?t) t };
      };
      Int.compare(lstA, lstB);
    });

    let takeN : Int = Nat.min(limit, withLastSale.size()).toInt();
    withLastSale.sliceToArray(0, takeN);
  };

  // ── Shop data cleanup ─────────────────────────────────────────────────────────
  /// Removes all bills belonging to a given shop — called by adminDeleteShop cascade.
  public func deleteShopBills(state : State, shopId : Text) {
    let remaining = state.bills.filter(func(b : Types.Bill) : Bool { b.shopId != shopId });
    state.bills.clear();
    state.bills.append(remaining);
  };

  // ── Calculation helpers ───────────────────────────────────────────────────────
  public func calcTaxBreakdown(
    taxSystem  : Types.TaxSystem,
    taxRate    : Float,
    taxableAmt : Float,
  ) : Types.TaxBreakdown {
    switch (taxSystem) {
      case (#GST) {
        // India: CGST = SGST = taxRate/2 applied to taxable amount
        let halfRate = taxRate / 2.0 / 100.0;
        { cgst = taxableAmt * halfRate; sgst = taxableAmt * halfRate; igst = 0.0 };
      };
      case _ {
        { cgst = 0.0; sgst = 0.0; igst = 0.0 };
      };
    };
  };

  public func calcLineTotal(
    qty      : Float,
    rate     : Float,
    discount : Float,
    taxAmt   : Float,
  ) : Float {
    let base = qty * rate;
    let afterDiscount = if (base > discount) base - discount else 0.0;
    afterDiscount + taxAmt;
  };

  public func calcBillProfit(items : [Types.BillItem]) : Float {
    items.foldLeft(0.0 : Float, func(acc : Float, _item : Types.BillItem) : Float { acc });
  };

  // ── Item enrichment (tax calculation) ────────────────────────────────────────
  public func enrichItems(
    items     : [Types.BillItem],
    taxRate   : Float,
    _taxSystem : Types.TaxSystem,
  ) : List.List<Types.BillItem> {
    let result = List.empty<Types.BillItem>();
    for (item in items.values()) {
      let lineBase  = item.qty * item.rate - item.discount;
      let safeBase  = if (lineBase > 0.0) lineBase else 0.0;
      // When taxRate is 0 the shop has GST/tax turned OFF — apply no tax at all
      let taxAmt    = if (taxRate == 0.0) 0.0 else safeBase * (taxRate / 100.0);
      let lineTotal = safeBase + taxAmt;
      result.add({ item with taxAmt = taxAmt; lineTotal = lineTotal });
    };
    result;
  };

  // ── Private helpers ───────────────────────────────────────────────────────────
  func periodStartTime(period : Types.AnalyticsPeriod) : Types.Timestamp {
    let now         : Int = Time.now();
    let nanosPerDay : Int = 86_400_000_000_000;
    switch (period) {
      case (#Today) { now - (now % nanosPerDay) };
      case (#Week)  { now - 7  * nanosPerDay };
      case (#Month) { now - 30 * nanosPerDay };
    };
  };
};
