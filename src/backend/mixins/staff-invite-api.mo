import Types        "../types/staff-invite";
import StaffInviteLib "../lib/staff-invite";
import RolesLib       "../lib/roles";

mixin (staffInviteState : StaffInviteLib.State, rolesState : RolesLib.State) {
  public shared ({ caller }) func generateStaffInvite(shopId : Text) : async Types.StaffInviteView {
    let invite = StaffInviteLib.generateInvite(staffInviteState, shopId, caller, rolesState);
    {
      token     = invite.token;
      shopId    = invite.shopId;
      createdAt = invite.createdAt;
      expiresAt = invite.expiresAt;
      used      = invite.used;
      usedBy    = invite.usedBy;
    };
  };

  public shared ({ caller }) func acceptStaffInvite(token : Text) : async StaffInviteLib.Result<(), Text> {
    StaffInviteLib.acceptInvite(staffInviteState, token, caller, rolesState);
  };

  public shared ({ caller }) func getStaffInvites(shopId : Text) : async [Types.StaffInviteView] {
    StaffInviteLib.getInvitesForShop(staffInviteState, shopId, caller, rolesState);
  };

  public shared ({ caller }) func revokeStaffInvite(token : Text) : async StaffInviteLib.Result<(), Text> {
    StaffInviteLib.revokeInvite(staffInviteState, token, caller, rolesState);
  };
};
