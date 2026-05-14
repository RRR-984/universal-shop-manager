import SupplierLib  "../lib/supplier";
import SupplierTypes "../types/supplier";

mixin (state : SupplierLib.State) {
  // ── Supplier CRUD ─────────────────────────────────────────────────────────

  public shared func createSupplier(
    shopId                 : Text,
    name                   : Text,
    businessType           : Text,
    phone                  : Text,
    email                  : ?Text,
    address                : ?Text,
    city                   : ?Text,
    defaultTransportCharge : ?Text,
  ) : async SupplierTypes.Supplier {
    SupplierLib.createSupplier(state, shopId, name, businessType, phone, email, address, city, defaultTransportCharge);
  };

  public query func getSupplier(supplierId : SupplierTypes.SupplierId) : async ?SupplierTypes.Supplier {
    SupplierLib.getSupplier(state, supplierId);
  };

  public query func listSuppliersByShop(shopId : Text) : async [SupplierTypes.Supplier] {
    SupplierLib.listSuppliersByShop(state, shopId);
  };

  public shared func updateSupplier(
    supplierId             : SupplierTypes.SupplierId,
    name                   : Text,
    businessType           : Text,
    phone                  : Text,
    email                  : ?Text,
    address                : ?Text,
    city                   : ?Text,
    defaultTransportCharge : ?Text,
  ) : async ?SupplierTypes.Supplier {
    SupplierLib.updateSupplier(state, supplierId, name, businessType, phone, email, address, city, defaultTransportCharge);
  };

  public shared func deleteSupplier(supplierId : SupplierTypes.SupplierId) : async Bool {
    SupplierLib.deleteSupplier(state, supplierId);
  };

  // ── SupplierPurchase CRUD ─────────────────────────────────────────────────

  public shared func createSupplierPurchase(
    shopId          : Text,
    supplierId      : SupplierTypes.SupplierId,
    productId       : Nat,
    quantity        : Float,
    purchasePrice   : Text,
    transportCharge : Text,
    notes           : ?Text,
  ) : async SupplierTypes.SupplierPurchase {
    SupplierLib.createSupplierPurchase(state, shopId, supplierId, productId, quantity, purchasePrice, transportCharge, notes);
  };

  public query func listPurchasesBySupplier(shopId : Text, supplierId : SupplierTypes.SupplierId) : async [SupplierTypes.SupplierPurchase] {
    SupplierLib.listPurchasesBySupplier(state, shopId, supplierId);
  };

  public query func listPurchasesByProduct(shopId : Text, productId : Nat) : async [SupplierTypes.SupplierPurchase] {
    SupplierLib.listPurchasesByProduct(state, shopId, productId);
  };

  // Returns last N purchases for a product with supplier names — for price comparison modal.
  public query func getLastNPurchasesForProduct(shopId : Text, productId : Nat, n : Nat) : async [SupplierTypes.SupplierPurchaseWithName] {
    SupplierLib.getLastNPurchasesForProduct(state, shopId, productId, n);
  };
};
