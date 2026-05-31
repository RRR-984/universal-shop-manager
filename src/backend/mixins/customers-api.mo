import Types      "../types/roles";
import CommonTypes "../types/common";
import RolesLib   "../lib/roles";
import BillLib "../lib/bill";
import Text "mo:core/Text";

mixin (rolesState : RolesLib.State, billState : BillLib.State) {
  // ── Customer management ───────────────────────────────────────────────────
  /// Creates a new customer or updates an existing one (matched by phone in shop).
  /// Returns the customer's id.
  public shared func createOrUpdateCustomer(shopId : Text, name : Text, phone : Text) : async Types.CustomerId {
    if (shopId.size() == 0) return 0;
    RolesLib.createOrUpdateCustomer(rolesState, shopId, name, phone);
  };

  /// Returns all customers for the given shop.
  public query func getShopCustomers(shopId : Text) : async [Types.CustomerView] {
    if (shopId.size() == 0) return [];
    RolesLib.getShopCustomers(rolesState, shopId);
  };

  /// Returns all bills created for a specific customer in a shop.
  public query func getCustomerBills(shopId : Text, customerId : Types.CustomerId) : async [CommonTypes.Bill] {
    if (shopId.size() == 0) return [];
    RolesLib.getCustomerBills(billState.bills, shopId, customerId, rolesState.customers);
  };

  /// Returns customers whose name or phone matches the search query.
  public query func searchCustomers(shopId : Text, searchQuery : Text) : async [Types.CustomerView] {
    if (shopId.size() == 0) return [];
    RolesLib.searchCustomers(rolesState, shopId, searchQuery);
  };
};
