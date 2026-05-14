module {
  // ── Role types ───────────────────────────────────────────────────────────────
  public type ShopRole = {
    #owner;
    #staff;
  };

  public type StaffMember = {
    principal : Principal;
    role      : ShopRole;
    addedAt   : Int;
  };

  // ── Customer types ───────────────────────────────────────────────────────────
  public type CustomerId = Nat;

  public type Customer = {
    id               : CustomerId;
    shopId           : Text;
    name             : Text;
    phone            : Text;
    totalBills       : Nat;
    totalSpent       : Float;
    lastPurchaseDate : ?Int;
    createdAt        : Int;
  };

  // CustomerView is the read-safe API boundary type (no mutable fields)
  public type CustomerView = {
    id               : CustomerId;
    shopId           : Text;
    name             : Text;
    phone            : Text;
    totalBills       : Nat;
    totalSpent       : Float;
    lastPurchaseDate : ?Int;
    createdAt        : Int;
  };
};
