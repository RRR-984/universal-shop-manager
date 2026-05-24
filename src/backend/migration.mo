// migration.mo — backfills shopId = "" on existing Bill records
// that were created before the billing data isolation fix.
import Types    "./types/common";
import List     "mo:core/List";

module {
  // ── Old type definitions (before shopId was added) ─────────────────────────
  type OldBill = {
    id               : Types.BillId;
    billNumber       : Nat;
    customerName     : Text;
    customerPhone    : Text;
    items            : [Types.BillItem];
    subtotal         : Float;
    totalDiscount    : Float;
    taxSystem        : Types.TaxSystem;
    taxRate          : Float;
    taxBreakdown     : Types.TaxBreakdown;
    extraCharges     : [Types.ExtraCharge];
    grandTotal       : Float;
    profit           : Float;
    priceType        : Types.PriceType;
    status           : Types.BillStatus;
    shareToken       : ?Text;
    staffCreatedBy   : ?Principal;
    createdAt        : Types.Timestamp;
    paymentType      : Types.PaymentType;
    amountPaid       : Float;
    amountPending    : Float;
    lastReminderSent : ?Types.Timestamp;
  };

  type OldBillState = {
    bills              : List.List<OldBill>;
    var nextId         : Nat;
    var nextBillNumber : Nat;
  };

  type NewBillState = {
    bills              : List.List<Types.Bill>;
    var nextId         : Nat;
    var nextBillNumber : Nat;
  };

  // ── Migration input/output types ───────────────────────────────────────────
  // The actor-level field is `billState : BillLib.State`, so the migration
  // domain/codomain must name it as `billState`.
  public type OldActor = {
    billState : OldBillState;
  };

  public type NewActor = {
    billState : NewBillState;
  };

  public func run(old : OldActor) : NewActor {
    let newBills = old.billState.bills.map<OldBill, Types.Bill>(
      func(b : OldBill) : Types.Bill {
        { b with shopId = "" };
      }
    );
    {
      billState = {
        bills              = newBills;
        var nextId         = old.billState.nextId;
        var nextBillNumber = old.billState.nextBillNumber;
      };
    };
  };
};
