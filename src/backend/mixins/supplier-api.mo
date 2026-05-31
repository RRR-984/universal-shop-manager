import SupplierLib  "../lib/supplier";
import SupplierTypes "../types/supplier";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import AdminLib "../lib/admin";

mixin (state : SupplierLib.State, adminState : AdminLib.State) {
  // ── Supplier CRUD ─────────────────────────────────────────────────────────

  public shared ({ caller }) func createSupplier(
    shopId                 : Text,
    name                   : Text,
    businessType           : Text,
    phone                  : Text,
    email                  : ?Text,
    address                : ?Text,
    city                   : ?Text,
    defaultTransportCharge : ?Text,
  ) : async SupplierTypes.Supplier {
    if (AdminLib.isBlocked(adminState, caller.toText())) { Runtime.trap("Account blocked. Contact support.") };
    if (shopId.size() == 0) Runtime.trap("shopId must not be empty");
    SupplierLib.createSupplier(state, shopId, name, businessType, phone, email, address, city, defaultTransportCharge);
  };

  public query func getSupplier(supplierId : SupplierTypes.SupplierId) : async ?SupplierTypes.Supplier {
    SupplierLib.getSupplier(state, supplierId);
  };

  public query func listSuppliersByShop(shopId : Text) : async [SupplierTypes.Supplier] {
    if (shopId.size() == 0) return [];
    SupplierLib.listSuppliersByShop(state, shopId);
  };

  public shared ({ caller }) func updateSupplier(
    supplierId             : SupplierTypes.SupplierId,
    name                   : Text,
    businessType           : Text,
    phone                  : Text,
    email                  : ?Text,
    address                : ?Text,
    city                   : ?Text,
    defaultTransportCharge : ?Text,
  ) : async ?SupplierTypes.Supplier {
    if (AdminLib.isBlocked(adminState, caller.toText())) { Runtime.trap("Account blocked. Contact support.") };
    SupplierLib.updateSupplier(state, supplierId, name, businessType, phone, email, address, city, defaultTransportCharge);
  };

  public shared ({ caller }) func deleteSupplier(supplierId : SupplierTypes.SupplierId) : async Bool {
    if (AdminLib.isBlocked(adminState, caller.toText())) { Runtime.trap("Account blocked. Contact support.") };
    SupplierLib.deleteSupplier(state, supplierId);
  };

  // ── SupplierPurchase CRUD ─────────────────────────────────────────────────

  public shared ({ caller }) func createSupplierPurchase(
    shopId          : Text,
    supplierId      : SupplierTypes.SupplierId,
    productId       : Nat,
    quantity        : Float,
    purchasePrice   : Text,
    transportCharge : Text,
    notes           : ?Text,
  ) : async SupplierTypes.SupplierPurchase {
    if (AdminLib.isBlocked(adminState, caller.toText())) { Runtime.trap("Account blocked. Contact support.") };
    SupplierLib.createSupplierPurchase(state, shopId, supplierId, productId, quantity, purchasePrice, transportCharge, notes);
  };

  public query func listPurchasesBySupplier(shopId : Text, supplierId : SupplierTypes.SupplierId) : async [SupplierTypes.SupplierPurchase] {
    if (shopId.size() == 0) return [];
    SupplierLib.listPurchasesBySupplier(state, shopId, supplierId);
  };

  public query func listPurchasesByProduct(shopId : Text, productId : Nat) : async [SupplierTypes.SupplierPurchase] {
    if (shopId.size() == 0) return [];
    SupplierLib.listPurchasesByProduct(state, shopId, productId);
  };

  // Returns last N purchases for a product with supplier names — for price comparison modal.
  public query func getLastNPurchasesForProduct(shopId : Text, productId : Nat, n : Nat) : async [SupplierTypes.SupplierPurchaseWithName] {
    if (shopId.size() == 0) return [];
    SupplierLib.getLastNPurchasesForProduct(state, shopId, productId, n);
  };
};
