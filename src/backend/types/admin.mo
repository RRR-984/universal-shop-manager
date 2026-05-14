module {
  // ── Admin types ───────────────────────────────────────────────────────────
  public type UserRecord = {
    principal  : Text;
    shopName   : Text;
    shopType   : Text;
    firstSeen  : Int;
    var lastSeen   : Int;
    var loginCount : Nat;
    var isActive   : Bool;
    var isBlocked  : Bool;
  };

  // Shared (immutable) view for API boundary
  public type UserView = {
    principal  : Text;
    shopName   : Text;
    shopType   : Text;
    firstSeen  : Int;
    lastSeen   : Int;
    loginCount : Nat;
    isActive   : Bool;
    isBlocked  : Bool;
  };

  public type AdminNote = {
    noteId          : Nat;
    targetPrincipal : Text;
    content         : Text;
    createdAt       : Int;
    var updatedAt   : ?Int;
    var isDeleted   : Bool;
  };

  // Shared (immutable) view for API boundary
  public type AdminNoteView = {
    noteId          : Nat;
    targetPrincipal : Text;
    content         : Text;
    createdAt       : Int;
    updatedAt       : ?Int;
    isDeleted       : Bool;
  };

  public type ShopAdminView = {
    principal  : Text;
    shopName   : Text;
    shopType   : Text;
    currency   : Text;
    taxSystem  : Text;
    language   : Text;
    isDisabled : Bool;
  };
};
