import Types      "../types/common";
import ProdLib    "../lib/product";
import SettingsLib "../lib/settings";

mixin (state : ProdLib.State, settingsState : SettingsLib.State) {
  // ── Product CRUD ──────────────────────────────────────────────────────────
  public shared func createProduct(input : Types.CreateProductInput) : async Types.ProductView {
    ProdLib.createProduct(state, input);
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.ProductView {
    ProdLib.getProduct(state, id);
  };

  public query func listProducts(filter : Types.ProductFilter) : async [Types.ProductView] {
    ProdLib.listProducts(state, filter);
  };

  public shared func updateProduct(input : Types.UpdateProductInput) : async ?Types.ProductView {
    ProdLib.updateProduct(state, input);
  };

  public shared func deleteProduct(id : Types.ProductId) : async Bool {
    ProdLib.deleteProduct(state, id);
  };

  public query func searchProducts(shopId : Text, searchTerm : Text) : async [Types.ProductView] {
    ProdLib.searchProducts(state, shopId, searchTerm);
  };

  // Exact barcode lookup — returns the product matching the scanned barcode.
  public query func getProductByBarcode(shopId : Text, barcode : Text) : async ?Types.ProductView {
    ProdLib.getProductByBarcode(state, shopId, barcode);
  };

  // ── Stock alerts ──────────────────────────────────────────────────────────
  // shopId must match the active shop's identifier (same as used in roles/bills).
  public query func getLowStockProducts(shopId : Text) : async [Types.LowStockProduct] {
    ProdLib.getLowStockProducts(state, shopId);
  };

  // Returns products expiring within the configured threshold (90/180/365 days).
  // Uses the global expiryAlertThresholdDays from settings; falls back to 90 days.
  public query func getNearExpiryProducts(shopId : Text) : async [Types.NearExpiryProduct] {
    let threshold = SettingsLib.getExpiryAlertThresholdDays(settingsState);
    ProdLib.getNearExpiryProducts(state, shopId, threshold.toInt());
  };

  // Returns products expiring within a custom number of days (for UI threshold picker).
  public query func getNearExpiryProductsByDays(shopId : Text, withinDays : Nat) : async [Types.NearExpiryProduct] {
    ProdLib.getNearExpiryProducts(state, shopId, withinDays.toInt());
  };

  // Returns products with no sale for >= inactiveDays days (dead stock).
  // Pass 0 to use the settings-configured threshold.
  public query func getDeadStockProducts(shopId : Text, inactiveDays : Nat) : async [Types.DeadStockProduct] {
    let days = if (inactiveDays == 0) SettingsLib.getDeadStockAlertDays(settingsState) else inactiveDays;
    ProdLib.getDeadStockProducts(state, shopId, days);
  };
};
