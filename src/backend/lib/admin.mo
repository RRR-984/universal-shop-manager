import Types    "../types/common";
import ATypes   "../types/admin";
import Map      "mo:core/Map";
import List     "mo:core/List";
import Time     "mo:core/Time";
import Runtime  "mo:core/Runtime";

module {
  // ── State ──────────────────────────────────────────────────────────────────
  public type State = {
    var adminPrincipal : ?Text;
    users              : Map.Map<Text, ATypes.UserRecord>;
    notes              : List.List<ATypes.AdminNote>;
    var nextNoteId     : Nat;
    shopDisabled       : Map.Map<Text, Bool>;
    globalShops        : Map.Map<Text, Types.ShopConfig>;
  };

  public func newState() : State {
    {
      var adminPrincipal = null;
      users              = Map.empty<Text, ATypes.UserRecord>();
      notes              = List.empty<ATypes.AdminNote>();
      var nextNoteId     = 1;
      shopDisabled       = Map.empty<Text, Bool>();
      globalShops        = Map.empty<Text, Types.ShopConfig>();
    };
  };

  // ── Access control ─────────────────────────────────────────────────────────
  // First caller to touch admin state becomes the admin (one-time bootstrap).
  public func ensureAdmin(state : State, caller : Text) {
    switch (state.adminPrincipal) {
      case null {
        // First call — record this principal as the admin
        state.adminPrincipal := ?caller;
      };
      case (?admin) {
        if (admin != caller) {
          Runtime.trap("NotAuthorized");
        };
      };
    };
  };

  public func isAdmin(state : State, caller : Text) : Bool {
    switch (state.adminPrincipal) {
      case null false;
      case (?admin) admin == caller;
    };
  };

  // ── Admin principal persistence helpers ──────────────────────────────────
  // Returns the current admin principal (used by main.mo for stable wiring).
  public func getAdminPrincipal(state : State) : ?Text {
    state.adminPrincipal;
  };

  // Restores the admin principal from stable storage on canister upgrade.
  // Only sets if currently null — preserves an already-claimed admin.
  public func restoreAdminPrincipal(state : State, principal : Text) {
    switch (state.adminPrincipal) {
      case null { state.adminPrincipal := ?principal };
      case (?_) {};
    };
  };

  // ── User tracking ──────────────────────────────────────────────────────────
  public func recordLogin(
    state    : State,
    caller   : Text,
    shopName : Text,
    shopType : Text,
  ) {
    let now = Time.now();
    switch (state.users.get(caller)) {
      case null {
        let record : ATypes.UserRecord = {
          principal      = caller;
          shopName       = shopName;
          shopType       = shopType;
          firstSeen      = now;
          var lastSeen   = now;
          var loginCount = 1;
          var isActive   = true;
          var isBlocked  = false;
        };
        state.users.add(caller, record);
      };
      case (?rec) {
        rec.lastSeen   := now;
        rec.loginCount := rec.loginCount + 1;
      };
    };
  };

  // ── Block check ────────────────────────────────────────────────────────────
  // Returns true if the given principal is blocked. Non-existent principals are not blocked.
  public func isBlocked(state : State, caller : Text) : Bool {
    switch (state.users.get(caller)) {
      case null false;
      case (?rec) rec.isBlocked;
    };
  };

  func toUserView(r : ATypes.UserRecord) : ATypes.UserView {
    {
      principal  = r.principal;
      shopName   = r.shopName;
      shopType   = r.shopType;
      firstSeen  = r.firstSeen;
      lastSeen   = r.lastSeen;
      loginCount = r.loginCount;
      isActive   = r.isActive;
      isBlocked  = r.isBlocked;
    };
  };

  public func getAllUsers(state : State) : [ATypes.UserView] {
    let views = List.empty<ATypes.UserView>();
    for ((_, rec) in state.users.entries()) {
      views.add(toUserView(rec));
    };
    views.toArray();
  };

  public func getUserDetails(state : State, principal : Text) : ?ATypes.UserView {
    switch (state.users.get(principal)) {
      case null null;
      case (?rec) ?toUserView(rec);
    };
  };

  // ── Admin notes ────────────────────────────────────────────────────────────
  public func addNote(
    state           : State,
    targetPrincipal : Text,
    content         : Text,
  ) : Nat {
    if (content.size() > 500) {
      Runtime.trap("NoteContentTooLong");
    };
    let id = state.nextNoteId;
    state.nextNoteId := id + 1;
    let note : ATypes.AdminNote = {
      noteId          = id;
      targetPrincipal = targetPrincipal;
      content         = content;
      createdAt       = Time.now();
      var updatedAt   = null;
      var isDeleted   = false;
    };
    state.notes.add(note);
    id;
  };

  public func getNotes(state : State, targetPrincipal : Text) : [ATypes.AdminNoteView] {
    let active = state.notes.filter(
      func(n : ATypes.AdminNote) : Bool {
        n.targetPrincipal == targetPrincipal and not n.isDeleted
      }
    );
    // Reverse for newest-first
    let arr = active.reverse().toArray();
    arr.map<ATypes.AdminNote, ATypes.AdminNoteView>(
      func(n) {
        {
          noteId          = n.noteId;
          targetPrincipal = n.targetPrincipal;
          content         = n.content;
          createdAt       = n.createdAt;
          updatedAt       = n.updatedAt;
          isDeleted       = n.isDeleted;
        }
      }
    );
  };

  public func deleteNote(state : State, noteId : Nat) : Bool {
    var found = false;
    state.notes.mapInPlace(
      func(n : ATypes.AdminNote) : ATypes.AdminNote {
        if (n.noteId == noteId) {
          n.isDeleted := true;
          n.updatedAt := ?Time.now();
          found := true;
        };
        n;
      }
    );
    found;
  };

  // ── Global shop view ───────────────────────────────────────────────────────
  public func upsertShop(state : State, principal : Text, config : Types.ShopConfig) {
    state.globalShops.add(principal, config);
  };

  func shopTypeToText(st : Types.ShopType) : Text {
    switch (st) {
      case (#Mobile)          "Mobile";
      case (#Electronics)     "Electronics";
      case (#Medical)         "Medical";
      case (#Clothing)        "Clothing";
      case (#Footwear)        "Footwear";
      case (#Grocery)         "Grocery";
      case (#Stationery)      "Stationery";
      case (#Restaurant)      "Restaurant";
      case (#AutoParts)       "Auto Parts";
      case (#Hardware)        "Hardware";
      case (#Jewelry)         "Jewelry";
      case (#Salon)           "Salon";
      case (#General)         "General";
      case (#BuildingMaterial) "Building Material";
      case (#AgroProducts)     "Agro Products";
      case (#FruitsVegetables)  "Fruits & Vegetables";
      case (#Electrical)        "Electrical";
    };
  };

  func taxSystemToText(ts : Types.TaxSystem) : Text {
    switch (ts) {
      case (#GST)      "GST";
      case (#VAT)      "VAT";
      case (#SalesTax) "SalesTax";
      case (#Generic)  "Generic";
    };
  };

  func languageToText(lang : Types.Language) : Text {
    switch (lang) {
      case (#English)         "English";
      case (#Hindi)           "Hindi";
      case (#Arabic)          "Arabic";
      case (#French)          "French";
      case (#Spanish)         "Spanish";
      case (#Portuguese)      "Portuguese";
      case (#Swahili)         "Swahili";
      case (#BahasaIndonesia) "Bahasa Indonesia";
      case (#Bengali)         "Bengali";
      case (#Urdu)            "Urdu";
    };
  };

  public func getAllShops(state : State) : [ATypes.ShopAdminView] {
    let views = List.empty<ATypes.ShopAdminView>();
    for ((principal, cfg) in state.globalShops.entries()) {
      let disabled = switch (state.shopDisabled.get(principal)) {
        case null false;
        case (?v) v;
      };
      views.add({
        principal  = principal;
        shopName   = cfg.shopName;
        shopType   = shopTypeToText(cfg.shopType);
        currency   = cfg.currency;
        taxSystem  = taxSystemToText(cfg.taxSystem);
        language   = languageToText(cfg.language);
        isDisabled = disabled;
      });
    };
    views.toArray();
  };

  public func setShopDisabled(state : State, principal : Text, disabled : Bool) : Bool {
    if (not state.globalShops.containsKey(principal)) {
      return false;
    };
    state.shopDisabled.add(principal, disabled);
    true;
  };

  // ── Shop deletion ─────────────────────────────────────────────────────────
  // Removes shop from globalShops and shopDisabled maps.
  // Also removes the owner's per-principal shop count tracking key.
  // Returns true if the shop existed and was removed, false if not found.
  public func removeShopFromAdmin(state : State, shopId : Text) : Bool {
    if (not state.globalShops.containsKey(shopId)) {
      return false;
    };
    state.globalShops.remove(shopId);
    state.shopDisabled.remove(shopId);
    // Soft-delete all notes targeting this shopId
    state.notes.mapInPlace(func(n : ATypes.AdminNote) : ATypes.AdminNote {
      if (n.targetPrincipal == shopId) {
        n.isDeleted := true;
      };
      n;
    });
    true;
  };

  // ── Shop limit check ───────────────────────────────────────────────────────
  // Returns the number of active shops the given principal currently owns.
  // globalShops is keyed by principal (caller text), not shopId.
  // Counts how many globalShops entries match the given callerPrincipal.
  public func countShopsForPrincipal(state : State, callerPrincipal : Text) : Nat {
    var count : Nat = 0;
    for ((principal, _) in state.globalShops.entries()) {
      if (principal == callerPrincipal) {
        count += 1;
      };
    };
    count;
  };

  // ── User deletion ─────────────────────────────────────────────────────────
  // Removes a user from the users tracking map.
  // Returns true if the user existed and was removed.
  public func removeUser(state : State, principalText : Text) : Bool {
    if (not state.users.containsKey(principalText)) {
      return false;
    };
    state.users.remove(principalText);
    true;
  };

  // ── Block / unblock user ──────────────────────────────────────────────────
  // Sets the isBlocked flag on a UserRecord.
  // Returns #ok if found and updated, #err if not found.
  public func setUserBlocked(state : State, principalText : Text, blocked : Bool) : { #ok; #err : Text } {
    switch (state.users.get(principalText)) {
      case null { #err("UserNotFound") };
      case (?rec) {
        rec.isBlocked := blocked;
        #ok;
      };
    };
  };
};
