import Types "common";

module {
  // ── Identifiers ──────────────────────────────────────────────────────────────
  public type ReturnBillId = Nat;
  public type CreditTransactionId = Nat;

  // ── Return status ────────────────────────────────────────────────────────────
  public type ReturnStatus = { #Pending; #Approved; #Rejected };

  // ── Credit transaction type ───────────────────────────────────────────────────
  public type CreditTransactionType = { #Earned; #Used };

  // ── Return item (one line within a return request) ────────────────────────────
  public type ReturnItem = {
    productId  : Types.ProductId;
    name       : Text;
    returnQty  : Float;
    originalRate : Float;    // rate from the original bill line
    lineTotal  : Float;      // returnQty * originalRate
    reason     : ?Text;      // optional reason selected by user (e.g. "Damaged", "Wrong Item")
  };

  // ── Return bill (the return request record) ───────────────────────────────────
  public type ReturnBill = {
    id                : ReturnBillId;
    originalBillId    : Types.BillId;
    shopId            : Text;
    customerName      : Text;
    customerPhone     : Text;
    returnItems       : [ReturnItem];
    totalRefundAmount : Float;
    status            : ReturnStatus;
    rejectionReason   : ?Text;       // set only when status = #Rejected
    createdAt         : Types.Timestamp;
    approvedAt        : ?Types.Timestamp; // set only when status = #Approved
  };

  // ── Credit transaction (one entry in a customer's credit ledger) ──────────────
  public type CreditTransaction = {
    id           : CreditTransactionId;
    date         : Types.Timestamp;
    amount       : Float;
    txType       : CreditTransactionType;
    billId       : ?Types.BillId;    // bill that consumed the credit
    returnBillId : ?ReturnBillId;    // return that earned the credit
    note         : Text;
  };

  // ── Customer credit balance + history ────────────────────────────────────────
  public type CustomerCredit = {
    customerId   : Text;             // customer phone number (unique per shop)
    shopId       : Text;
    balance      : Float;
    transactions : [CreditTransaction];
  };

  // ── Input types for API calls ─────────────────────────────────────────────────
  public type CreateReturnInput = {
    originalBillId : Types.BillId;
    returnItems    : [ReturnItem];
    customerName   : Text;
    customerPhone  : Text;
  };

  public type RejectReturnInput = {
    returnBillId : ReturnBillId;
    reason       : Text;
  };

  public type ApplyStoreCreditInput = {
    customerPhone : Text;       // identifies the customer within the shop
    billId        : Types.BillId;
    amount        : Float;      // amount to deduct from customer's credit balance
  };

  public type ReturnFilter = {
    status    : ?ReturnStatus;
    fromDate  : ?Types.Timestamp;
    toDate    : ?Types.Timestamp;
  };
};
