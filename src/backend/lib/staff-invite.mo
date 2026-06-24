import Types   "../types/staff-invite";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text    "mo:core/Text";
import Int     "mo:core/Int";
import RolesLib "../lib/roles";
import List "mo:core/List";

module {
  public type State = {
    staffInvites : Map.Map<Text, Types.StaffInvite>;
  };

  public func newState() : State {
    {
      staffInvites = Map.empty<Text, Types.StaffInvite>();
    };
  };

  // 7 days in nanoseconds
  func inviteTtlNs() : Int { 7 * 24 * 60 * 60 * 1_000_000_000 };

  public func generateToken(shopId : Text, createdAt : Int, caller : Principal) : Text {
    let timeText = createdAt.toText();
    let callerText = caller.toText();
    let rand = Time.now().toText();
    let hashInput = shopId # "-" # timeText # "-" # callerText # "-" # rand;
    let prefix = shopId # "-";
    prefix # hashInput;
  };

  public func generateInvite(state : State, shopId : Text, caller : Principal, rolesState : RolesLib.State) : Types.StaffInvite {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    let now = Time.now();
    let token = generateToken(shopId, now, caller);
    let invite : Types.StaffInvite = {
      token;
      shopId;
      createdAt = now;
      expiresAt = now + inviteTtlNs();
      used = false;
      usedBy = null;
    };
    state.staffInvites.add(token, invite);
    invite;
  };

  public func acceptInvite(state : State, token : Text, caller : Principal, rolesState : RolesLib.State) : Result<(), Text> {
    switch (state.staffInvites.get(token)) {
      case null { #err("Invalid invite token") };
      case (?invite) {
        if (invite.used) {
          return #err("Invite already used");
        };
        let now = Time.now();
        if (now > invite.expiresAt) {
          return #err("Invite expired");
        };
        // Prevent owner from accepting their own invite
        let ownerOpt = rolesState.shopOwners.get(invite.shopId);
        switch (ownerOpt) {
          case (?owner) {
            if (Principal.equal(owner, caller)) {
              return #err("Shop owner cannot be staff of their own shop");
            };
          };
          case null {};
        };
        // Get the shop owner to authorize adding staff
        let owner = switch (ownerOpt) {
          case null { return #err("Shop owner not found") };
          case (?o) o;
        };
        // Add caller as staff for the invite's shop
        switch (RolesLib.addStaff(rolesState, invite.shopId, owner, caller)) {
          case (#err(msg)) { return #err(msg) };
          case (#ok(())) {
            let updated : Types.StaffInvite = { invite with used = true; usedBy = ?caller };
            state.staffInvites.add(token, updated);
            #ok(());
          };
        };
      };
    };
  };

  public func getInvitesForShop(state : State, shopId : Text, caller : Principal, rolesState : RolesLib.State) : [Types.StaffInviteView] {
    RolesLib.ensureOwner(rolesState, shopId, caller);
    let result = List.empty<Types.StaffInviteView>();
    for ((t, inv) in state.staffInvites.entries()) {
      if (inv.shopId == shopId) {
        result.add({
          token = inv.token;
          shopId = inv.shopId;
          createdAt = inv.createdAt;
          expiresAt = inv.expiresAt;
          used = inv.used;
          usedBy = inv.usedBy;
        });
      };
    };
    result.toArray();
  };

  public func revokeInvite(state : State, token : Text, caller : Principal, rolesState : RolesLib.State) : Result<(), Text> {
    switch (state.staffInvites.get(token)) {
      case null { #err("Invite not found") };
      case (?invite) {
        RolesLib.ensureOwner(rolesState, invite.shopId, caller);
        if (invite.used) {
          return #err("Invite already used and cannot be revoked");
        };
        state.staffInvites.remove(token);
        #ok(());
      };
    };
  };

  public type Result<A, B> = { #ok : A; #err : B };
};
