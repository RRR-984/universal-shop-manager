module {
  // ── Supplier ──────────────────────────────────────────────────────────────
  public type SupplierId = Text;  // UUID-like Text generated on create

  public type Supplier = {
    id             : SupplierId;
    shopId         : Text;
    name           : Text;
    businessType   : Text;   // "Wholesaler" | "Distributor" | "Manufacturer"
    phone          : Text;
    email          : ?Text;
    address        : ?Text;
    city           : ?Text;
    defaultTransportCharge : ?Text;  // stored as Text to support currency strings
  };

  // ── SupplierPurchase ──────────────────────────────────────────────────────
  public type SupplierPurchaseId = Text;

  public type SupplierPurchase = {
    id            : SupplierPurchaseId;
    shopId        : Text;
    supplierId    : SupplierId;
    productId     : Nat;    // Types.ProductId is Nat
    purchaseDate  : Int;    // Timestamp nanoseconds
    quantity      : Float;
    purchasePrice : Text;   // stored as Text for currency flexibility
    transportCharge : Text;
    notes         : ?Text;
  };

  // ── Price comparison view (last N purchases with supplier name) ─────────
  public type SupplierPurchaseWithName = {
    purchase     : SupplierPurchase;
    supplierName : Text;
  };
};
