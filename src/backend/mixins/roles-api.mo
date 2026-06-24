import Types     "../types/roles";
import RolesLib  "../lib/roles";

mixin (rolesState : RolesLib.State) {
  // ── Role queries ──────────────────────────────────────────────────────────
  /// Returns the caller's role in the given shop.
  /// Defaults to #owner if the caller is registered as owner; #staff otherwise.
  public shared ({ caller }) func getMyRole(shopId : Text) : async Types.ShopRole {
    RolesLib.getMyRole(rolesState, shopId, caller);
  };

  // ── Staff management (owner only) ─────────────────────────────────────────
  /// Returns all staff members for the given shop. Caller must be owner.
  public shared ({ caller = _ }) func getShopStaff(shopId : Text) : async [Types.StaffMember] {
    RolesLib.getShopStaff(rolesState, shopId);
  };

  /// Adds a staff member to the given shop. Caller must be owner.
  public shared ({ caller }) func addStaff(shopId : Text, staffPrincipal : Principal) : async RolesLib.Result<(), Text> {
    RolesLib.addStaff(rolesState, shopId, caller, staffPrincipal);
  };

  /// Removes a staff member from the given shop. Caller must be owner.
  public shared ({ caller }) func removeStaff(shopId : Text, staffPrincipal : Principal) : async RolesLib.Result<(), Text> {
    RolesLib.removeStaff(rolesState, shopId, caller, staffPrincipal);
  };
};
