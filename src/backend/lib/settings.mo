import Types "../types/common";

module {
  // ── State ─────────────────────────────────────────────────────────────────────
  public type State = {
    var config : ?Types.ShopConfig;
  };

  public func newState() : State {
    { var config = null };
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────────
  public func getConfig(state : State) : ?Types.ShopConfig {
    state.config;
  };

  public func saveConfig(state : State, config : Types.ShopConfig) : Types.ShopConfig {
    state.config := ?config;
    config;
  };

  public func updateConfig(state : State, config : Types.ShopConfig) : ?Types.ShopConfig {
    switch (state.config) {
      case null null;
      case (?_) {
        state.config := ?config;
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

  // Returns whether min-stock (low stock) alerts are enabled.
  // Defaults to true.
  public func isMinStockAlertEnabled(state : State) : Bool {
    switch (state.config) {
      case null true;
      case (?cfg) cfg.minStockAlertEnabled;
    };
  };
};
