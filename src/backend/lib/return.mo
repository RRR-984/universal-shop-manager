import Types      "../types/common";
import ReturnTypes "../types/return";
import Map        "mo:core/Map";
import List       "mo:core/List";
import Array "mo:core/Array";

module {
  // ── State ─────────────────────────────────────────────────────────────────────
  public type State = {
    returns        : Map.Map<ReturnTypes.ReturnBillId, ReturnTypes.ReturnBill>;
    credits        : Map.Map<Text, ReturnTypes.CustomerCredit>; // key = shopId # ":" # customerPhone
    state          : { var nextReturnId : Nat; var nextTxId : Nat };
  };

  public func newState() : State {
    {
      returns = Map.empty<ReturnTypes.ReturnBillId, ReturnTypes.ReturnBill>();
      credits = Map.empty<Text, ReturnTypes.CustomerCredit>();
      state   = { var nextReturnId = 1; var nextTxId = 1 };
    };
  };

  // ── Create a new return request (status = #Pending) ───────────────────────────
  public func createReturn(
    self       : State,
    shopId     : Text,
    input      : ReturnTypes.CreateReturnInput,
    originalBill : Types.Bill,
    now        : Types.Timestamp,
  ) : ReturnTypes.ReturnBill {
    // Compute return items with validation and totals
    let returnItems = List.empty<ReturnTypes.ReturnItem>();
    for (ri in input.returnItems.values()) {
      // Validate returnQty <= original qty for this item
      let origItem = originalBill.items.find(func(bi : Types.BillItem) : Bool {
        bi.productId == ri.productId
      });
      switch (origItem) {
        case null {}; // unknown product ids are silently skipped
        case (?oi) {
          let safeQty = if (ri.returnQty > oi.qty) oi.qty else ri.returnQty;
          let lineTotal = safeQty * oi.rate;
          returnItems.add({
            productId    = ri.productId;
            name         = oi.name;
            returnQty    = safeQty;
            originalRate = oi.rate;
            lineTotal    = lineTotal;
            reason       = ri.reason;
          });
        };
      };
    };
    let totalRefundAmount = returnItems.foldLeft(
      0.0 : Float,
      func(acc : Float, ri : ReturnTypes.ReturnItem) : Float { acc + ri.lineTotal },
    );
    let id = self.state.nextReturnId;
    self.state.nextReturnId += 1;
    let rb : ReturnTypes.ReturnBill = {
      id                = id;
      originalBillId    = originalBill.id;
      shopId            = shopId;
      customerName      = input.customerName;
      customerPhone     = input.customerPhone;
      returnItems       = returnItems.toArray();
      totalRefundAmount = totalRefundAmount;
      status            = #Pending;
      rejectionReason   = null;
      createdAt         = now;
      approvedAt        = null;
    };
    self.returns.add(id, rb);
    rb;
  };

  // ── Approve a return — awards store credit, returns stock ─────────────────────
  public func approveReturn(
    self         : State,
    returnBillId : ReturnTypes.ReturnBillId,
    now          : Types.Timestamp,
  ) : ?ReturnTypes.ReturnBill {
    switch (self.returns.get(returnBillId)) {
      case null null;
      case (?rb) {
        if (rb.status != #Pending) return ?rb; // already processed
        let approved : ReturnTypes.ReturnBill = {
          rb with
          status     = #Approved;
          approvedAt = ?now;
        };
        self.returns.add(returnBillId, approved);
        // Award store credit
        let creditKey = rb.shopId # ":" # rb.customerPhone;
        let existing = switch (self.credits.get(creditKey)) {
          case null {
            {
              customerId   = rb.customerPhone;
              shopId       = rb.shopId;
              balance      = 0.0;
              transactions = [];
            } : ReturnTypes.CustomerCredit;
          };
          case (?c) c;
        };
        let txId = self.state.nextTxId;
        self.state.nextTxId += 1;
        let tx : ReturnTypes.CreditTransaction = {
          id           = txId;
          date         = now;
          amount       = rb.totalRefundAmount;
          txType       = #Earned;
          billId       = null;
          returnBillId = ?returnBillId;
          note         = "Refund for return #" # debug_show(returnBillId);
        };
        let newTxs = existing.transactions.concat([tx]);
        let updated : ReturnTypes.CustomerCredit = {
          existing with
          balance      = existing.balance + rb.totalRefundAmount;
          transactions = newTxs;
        };
        self.credits.add(creditKey, updated);
        ?approved;
      };
    };
  };

  // ── Reject a return ───────────────────────────────────────────────────────────
  public func rejectReturn(
    self  : State,
    input : ReturnTypes.RejectReturnInput,
  ) : ?ReturnTypes.ReturnBill {
    switch (self.returns.get(input.returnBillId)) {
      case null null;
      case (?rb) {
        if (rb.status != #Pending) return ?rb; // already processed
        let rejected : ReturnTypes.ReturnBill = {
          rb with
          status          = #Rejected;
          rejectionReason = ?input.reason;
        };
        self.returns.add(input.returnBillId, rejected);
        ?rejected;
      };
    };
  };

  // ── List returns for a shop, with optional status and date filters ─────────────
  public func listReturns(
    self   : State,
    shopId : Text,
    filter : ReturnTypes.ReturnFilter,
  ) : [ReturnTypes.ReturnBill] {
    let result = List.empty<ReturnTypes.ReturnBill>();
    for ((_, rb) in self.returns.entries()) {
      if (rb.shopId == shopId) {
        let matchStatus = switch (filter.status) {
          case null true;
          case (?st) rb.status == st;
        };
        let matchFrom = switch (filter.fromDate) {
          case null true;
          case (?fd) rb.createdAt >= fd;
        };
        let matchTo = switch (filter.toDate) {
          case null true;
          case (?td) rb.createdAt <= td;
        };
        if (matchStatus and matchFrom and matchTo) {
          result.add(rb);
        };
      };
    };
    result.toArray();
  };

  // ── Get all returns for a specific bill ───────────────────────────────────────
  public func getReturnsByBill(
    self   : State,
    shopId : Text,
    billId : Types.BillId,
  ) : [ReturnTypes.ReturnBill] {
    let result = List.empty<ReturnTypes.ReturnBill>();
    for ((_, rb) in self.returns.entries()) {
      if (rb.shopId == shopId and rb.originalBillId == billId) {
        result.add(rb);
      };
    };
    result.toArray();
  };

  // ── Get customer credit balance and transaction history ───────────────────────
  public func getCustomerCredit(
    self          : State,
    shopId        : Text,
    customerPhone : Text,
  ) : ReturnTypes.CustomerCredit {
    let key = shopId # ":" # customerPhone;
    switch (self.credits.get(key)) {
      case (?c) c;
      case null {
        {
          customerId   = customerPhone;
          shopId       = shopId;
          balance      = 0.0;
          transactions = [];
        };
      };
    };
  };

  // ── Apply store credit to a bill — deducts from balance ──────────────────────
  public func applyStoreCredit(
    self  : State,
    shopId : Text,
    input : ReturnTypes.ApplyStoreCreditInput,
    now   : Types.Timestamp,
  ) : { #ok : ReturnTypes.CustomerCredit; #err : Text } {
    let key = shopId # ":" # input.customerPhone;
    let existing = switch (self.credits.get(key)) {
      case null {
        {
          customerId   = input.customerPhone;
          shopId       = shopId;
          balance      = 0.0;
          transactions = [];
        } : ReturnTypes.CustomerCredit;
      };
      case (?c) c;
    };
    if (input.amount <= 0.0) return #err "Amount must be positive";
    if (existing.balance < input.amount) return #err "Insufficient store credit balance";
    let txId = self.state.nextTxId;
    self.state.nextTxId += 1;
    let tx : ReturnTypes.CreditTransaction = {
      id           = txId;
      date         = now;
      amount       = input.amount;
      txType       = #Used;
      billId       = ?input.billId;
      returnBillId = null;
      note         = "Applied to bill #" # debug_show(input.billId);
    };
    let newTxs = existing.transactions.concat([tx]);
    let updated : ReturnTypes.CustomerCredit = {
      existing with
      balance      = existing.balance - input.amount;
      transactions = newTxs;
    };
    self.credits.add(key, updated);
    #ok updated;
  };

  // ── Reverse stock for returned items (called by approveReturn path) ───────────
  // Returns list of (productId, qty) pairs for the product lib to re-add stock
  public func returnedStockAdjustments(
    returnBill : ReturnTypes.ReturnBill,
  ) : [(Types.ProductId, Float)] {
    returnBill.returnItems.map<ReturnTypes.ReturnItem, (Types.ProductId, Float)>(
      func(ri) { (ri.productId, ri.returnQty) }
    );
  };
};
