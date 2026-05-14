import Types "common";

module {
  // Customer-facing bill view — profit and internal fields are excluded
  public type PublicBillView = {
    id            : Types.BillId;
    billNumber    : Nat;
    customerName  : Text;
    customerPhone : Text;
    items         : [Types.BillItem];
    subtotal      : Float;
    totalDiscount : Float;
    taxSystem     : Types.TaxSystem;
    taxRate       : Float;
    taxBreakdown  : Types.TaxBreakdown;
    extraCharges  : [Types.ExtraCharge];
    grandTotal    : Float;
    priceType     : Types.PriceType;
    status        : Types.BillStatus;
    createdAt     : Types.Timestamp;
  };
};
