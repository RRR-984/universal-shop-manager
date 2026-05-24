import Types       "../types/common";
import ATypes      "../types/admin";
import AdminLib    "../lib/admin";
import RolesLib    "../lib/roles";
import ProdLib     "../lib/product";
import BillLib     "../lib/bill";
import SupplierLib "../lib/supplier";
import ReturnLib   "../lib/return";

mixin (
  adminState    : AdminLib.State,
  rolesState    : RolesLib.State,
  productState  : ProdLib.State,
  billState     : BillLib.State,
  supplierState : SupplierLib.State,
  returnState   : ReturnLib.State,
) {

  // ── Bootstrap: first caller becomes admin ──────────────────────────────────
  // Any admin endpoint call auto-promotes first-ever caller to admin.
  // Exposed explicitly so frontend can trigger it on first load.
  public shared ({ caller }) func initAdmin() : async Bool {
    let p = caller.toText();
    switch (adminState.adminPrincipal) {
      case null {
        adminState.adminPrincipal := ?p;
        true;
      };
      case (?_) false; // already initialised
    };
  };

  // ── Safe admin check — never traps, returns false for non-admins ──────────
  public shared query ({ caller }) func isAdminCaller() : async Bool {
    AdminLib.isAdmin(adminState, caller.toText());
  };

  // ── User tracking (public — called by frontend on every login) ────────────
  public shared ({ caller }) func recordUserLogin(
    shopName : Text,
    shopType : Text,
  ) : async () {
    AdminLib.recordLogin(adminState, caller.toText(), shopName, shopType);
  };

  // ── Admin-only: user queries ───────────────────────────────────────────────
  public shared ({ caller }) func getAllUsers() : async { #ok : [ATypes.UserView]; #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    #ok(AdminLib.getAllUsers(adminState));
  };

  public shared ({ caller }) func getUserDetails(
    principal : Text,
  ) : async { #ok : ATypes.UserView; #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    switch (AdminLib.getUserDetails(adminState, principal)) {
      case null  #err("UserNotFound");
      case (?v)  #ok(v);
    };
  };

  // ── Admin-only: notes ──────────────────────────────────────────────────────
  public shared ({ caller }) func addAdminNote(
    targetPrincipal : Text,
    content         : Text,
  ) : async { #ok : Nat; #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    if (content.size() > 500) {
      return #err("ContentTooLong");
    };
    #ok(AdminLib.addNote(adminState, targetPrincipal, content));
  };

  public shared ({ caller }) func getAdminNotes(
    targetPrincipal : Text,
  ) : async { #ok : [ATypes.AdminNoteView]; #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    #ok(AdminLib.getNotes(adminState, targetPrincipal));
  };

  public shared ({ caller }) func deleteAdminNote(
    noteId : Nat,
  ) : async { #ok : (); #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    if (AdminLib.deleteNote(adminState, noteId)) #ok(())
    else #err("NoteNotFound");
  };

  // ── Admin-only: global shop view ───────────────────────────────────────────
  public shared ({ caller }) func getAllShops() : async { #ok : [ATypes.ShopAdminView]; #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    #ok(AdminLib.getAllShops(adminState));
  };

    // ── Admin-only: shop deletion ─────────────────────────────────────────────────────
  // Permanently deletes a shop and all its associated data across all state slices.
  public shared ({ caller }) func adminDeleteShop(
    shopId : Text,
  ) : async { #ok : (); #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    if (not AdminLib.removeShopFromAdmin(adminState, shopId)) {
      return #err("ShopNotFound");
    };
    RolesLib.removeShopData(rolesState, shopId);
    ProdLib.removeProductsByShopId(productState, shopId);
    BillLib.deleteShopBills(billState, shopId);
    SupplierLib.deleteShopSuppliers(supplierState, shopId);
    returnState.deleteShopReturns(shopId);
    #ok(());
  };

  // ── Admin-only: user deletion ───────────────────────────────────────────────────
  // Removes a user from admin tracking and their shop ownership/staff entries.
  public shared ({ caller }) func adminDeleteUser(
    userPrincipal : Text,
  ) : async { #ok : (); #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    if (not AdminLib.removeUser(adminState, userPrincipal)) {
      return #err("UserNotFound");
    };
    RolesLib.removeUserData(rolesState, userPrincipal);
    #ok(());
  };

  // ── Admin-only: block/unblock user ───────────────────────────────────────────
  // Sets the isBlocked flag on a user. Blocked users are rejected at all write endpoints.
  public shared ({ caller }) func adminBlockUser(
    userPrincipal : Text,
    blocked       : Bool,
  ) : async { #ok : (); #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    AdminLib.setUserBlocked(adminState, userPrincipal, blocked);
  };

public shared ({ caller }) func setShopDisabled(
    principal : Text,
    disabled  : Bool,
  ) : async { #ok : (); #err : Text } {
    AdminLib.ensureAdmin(adminState, caller.toText());
    if (AdminLib.setShopDisabled(adminState, principal, disabled)) #ok(())
    else #err("ShopNotFound");
  };
};
