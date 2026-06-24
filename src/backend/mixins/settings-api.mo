import Types        "../types/common";
import SettingsLib  "../lib/settings";
import RolesLib     "../lib/roles";
import Runtime      "mo:core/Runtime";

mixin (state : SettingsLib.State, rolesState : RolesLib.State) {
  // ── Setup / Config ─────────────────────────────────────────────────────
  public query func getShopConfig() : async ?Types.ShopConfig {
    SettingsLib.getConfig(state);
  };

  public shared ({ caller }) func saveShopConfig(config : Types.ShopConfig) : async Types.ShopConfig {
    let callerText = caller.toText();
    // 5-shop limit: count how many shops this principal already owns
    if (SettingsLib.countShopsForPrincipal(state, callerText) >= 5) {
      Runtime.trap("Shop limit reached. Maximum 5 shops per account.");
    };
    RolesLib.registerShopOwner(rolesState, config.shopName, caller);
    SettingsLib.saveConfig(state, config, callerText);
  };

  public shared ({ caller }) func updateShopConfig(config : Types.ShopConfig) : async ?Types.ShopConfig {
    let callerText = caller.toText();
    RolesLib.registerShopOwner(rolesState, config.shopName, caller);
    SettingsLib.updateConfig(state, config, callerText);
  };

  public query func isSetupComplete() : async Bool {
    SettingsLib.isSetupComplete(state);
  };

  // ── Smart default charges ───────────────────────────────────────────────────
  // Returns the current default charges config for the active shop (null if not set).
  public query func getDefaultCharges() : async ?Types.SmartDefaultCharges {
    switch (SettingsLib.getConfig(state)) {
      case null null;
      case (?cfg) cfg.defaultCharges;
    };
  };

  // Saves default charges into ShopConfig. No-op if shop config not yet set.
  public shared ({ caller }) func setDefaultCharges(charges : Types.SmartDefaultCharges) : async ?Types.ShopConfig {
    switch (SettingsLib.getConfig(state)) {
      case null null;
      case (?cfg) {
        SettingsLib.updateConfig(state, { cfg with defaultCharges = ?charges }, caller.toText());
      };
    };
  };
};
