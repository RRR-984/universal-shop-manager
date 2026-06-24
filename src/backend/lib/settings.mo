import Types "../types/common";
import Map "mo:core/Map";

module {
  // ── State ─────────────────────────────────────────────────────────────────────
  public type State = {
    var config : ?Types.ShopConfig;
    shopsByPrincipal : Map.Map<Text, Nat>;
  };

  public func newState() : State {
    { var config = null; shopsByPrincipal = Map.empty<Text, Nat>() };
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────────
  public func getConfig(state : State) : ?Types.ShopConfig {
    state.config;
  };

  public func saveConfig(state : State, config : Types.ShopConfig, principal : Text) : Types.ShopConfig {
    state.config := ?config;
    incrementShopCount(state, principal);
    config;
  };

  public func updateConfig(state : State, config : Types.ShopConfig, principal : Text) : ?Types.ShopConfig {
    switch (state.config) {
      case null null;
      case (?_) {
        state.config := ?config;
        incrementShopCount(state, principal);
        ?config;
      };
    };
  };

  public func isSetupComplete(state : State) : Bool {
    switch (state.config) {
      case null false;
      case (?cfg) cfg.isSetupComplete;
    };
  };

  // Returns the configured expiry alert threshold in days.
  // If no config is saved yet, defaults to 90 days.
  public func getExpiryAlertThresholdDays(state : State) : Nat {
    switch (state.config) {
      case null 90;
      case (?cfg) cfg.expiryAlertThresholdDays;
    };
  };

  // Returns the configured dead stock alert threshold in days.
  // If no config is saved yet, defaults to 180 days (6 months).
  public func getDeadStockAlertDays(state : State) : Nat {
    switch (state.config) {
      case null 180;
      case (?cfg) cfg.deadStockAlertDays;
    };
  };

  // Returns how many shops the given principal has saved.
  public func countShopsForPrincipal(state : State, principal : Text) : Nat {
    switch (state.shopsByPrincipal.get(principal)) {
      case null 0;
      case (?c) c;
    };
  };

  // Increment shop count for a principal (called when a new shop is saved).
  func incrementShopCount(state : State, principal : Text) {
    let current = countShopsForPrincipal(state, principal);
    state.shopsByPrincipal.add(principal, current + 1);
  };

  // Returns whether min-stock (low stock) alerts are enabled.
  // Defaults to true.
  public func isMinStockAlertEnabled(state : State) : Bool {
    switch (state.config) {
      case null true;
      case (?cfg) cfg.minStockAlertEnabled;
    };
  };
};
