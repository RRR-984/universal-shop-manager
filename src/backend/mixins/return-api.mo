import Types       "../types/common";
import ReturnTypes "../types/return";
import ReturnLib   "../lib/return";
import ProdLib     "../lib/product";
import BillLib     "../lib/bill";
import RolesLib    "../lib/roles";
import Runtime     "mo:core/Runtime";
import Time        "mo:core/Time";

mixin (
  returnState  : ReturnLib.State,
  billState    : BillLib.State,
  prodState    : ProdLib.State,
  rolesState   : RolesLib.State,
  settingsState : { var config : ?Types.ShopConfig },
) {
  // ── Create a return request (owner-only) ─────────────────────────────────────
  /// Validates items exist in original bill, creates a ReturnBill with #Pending status.
  public shared ({ caller }) func createReturn(
    shopId : Text,
    input  : ReturnTypes.CreateReturnInput,
  ) : async ReturnTypes.ReturnBill {
    // Owner and staff can initiate returns on behalf of customers
    let originalBill = switch (BillLib.getBill(billState, input.originalBillId)) {
      case null { Runtime.trap("Original bill not found") };
      case (?b) b;
    };
    if (originalBill.status != #Saved) {
      Runtime.trap("Can only return items from a saved bill");
    };
    let now = Time.now();
    returnState.createReturn(shopId, input, originalBill, now);
  };

  // ── Approve a return (owner-only) ─────────────────────────────────────────────
  /// Sets status to #Approved, awards store credit, re-adds stock for returned items.
  public shared ({ caller }) func approveReturn(
    shopId       : Text,
    returnBillId : ReturnTypes.ReturnBillId,
  ) : async ReturnTypes.ReturnBill {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    let now = Time.now();
    let approved = switch (returnState.approveReturn(returnBillId, now)) {
      case null { Runtime.trap("Return bill not found") };
      case (?rb) rb;
    };
    // Re-add stock for each returned item
    let adjustments = ReturnLib.returnedStockAdjustments(approved);
    for ((productId, qty) in adjustments.values()) {
      ignore ProdLib.adjustStock(prodState, productId, qty);
    };
    approved;
  };

  // ── Reject a return (owner-only) ──────────────────────────────────────────────
  public shared ({ caller }) func rejectReturn(
    shopId : Text,
    input  : ReturnTypes.RejectReturnInput,
  ) : async ReturnTypes.ReturnBill {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    switch (returnState.rejectReturn(input)) {
      case null { Runtime.trap("Return bill not found") };
      case (?rb) rb;
    };
  };

  // ── List returns for active shop (owner-only) ─────────────────────────────────
  public shared ({ caller }) func listReturns(
    shopId : Text,
    filter : ReturnTypes.ReturnFilter,
  ) : async [ReturnTypes.ReturnBill] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    returnState.listReturns(shopId, filter);
  };

  // ── Get all returns tied to a specific bill ────────────────────────────────────
  public query func getReturnsByBill(
    shopId : Text,
    billId : Types.BillId,
  ) : async [ReturnTypes.ReturnBill] {
    returnState.getReturnsByBill(shopId, billId);
  };

  // ── Get customer credit balance + history (owner-only) ───────────────────────
  public shared ({ caller }) func getCustomerCredit(
    shopId        : Text,
    customerPhone : Text,
  ) : async ReturnTypes.CustomerCredit {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    returnState.getCustomerCredit(shopId, customerPhone);
  };

  // ── Apply store credit when creating / updating a bill (owner-only) ───────────
  /// Deducts `amount` from customer's credit balance; amount must not exceed balance.
  public shared ({ caller }) func applyStoreCredit(
    shopId : Text,
    input  : ReturnTypes.ApplyStoreCreditInput,
  ) : async ReturnTypes.CustomerCredit {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    let now = Time.now();
    switch (returnState.applyStoreCredit(shopId, input, now)) {
      case (#ok credit) credit;
      case (#err msg) { Runtime.trap(msg) };
    };
  };
};
