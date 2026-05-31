import ProdLib      "lib/product";
import BillLib      "lib/bill";
import SettingsLib  "lib/settings";
import RatesLib     "lib/jewelry-rates";
import AdminLib     "lib/admin";
import ProductApi   "mixins/product-api";
import BillApi      "mixins/bill-api";
import SettingsApi  "mixins/settings-api";
import JewelryRatesApi "mixins/jewelry-rates-api";
import AdminApi     "mixins/admin-api";

import RolesLib "lib/roles";
import RolesApi "mixins/roles-api";
import CustomersApi "mixins/customers-api";
import SupplierLib "lib/supplier";
import SupplierApi "mixins/supplier-api";
import ReturnLib "lib/return";
import ReturnApi "mixins/return-api";


























actor {
  // ── State ───────────────────────────────────────────────────────────────────
  let productState   : ProdLib.State      = ProdLib.newState();
  let billState      : BillLib.State      = BillLib.newState();
  let settingsState  : SettingsLib.State  = SettingsLib.newState();
  let ratesState     : RatesLib.State     = RatesLib.newState();
  let adminState     : AdminLib.State     = AdminLib.newState();
  let rolesState     : RolesLib.State     = RolesLib.newState();
  let supplierState  : SupplierLib.State  = SupplierLib.newState();
  let returnState    : ReturnLib.State    = ReturnLib.newState();

  // ── Mixins ───────────────────────────────────────────────────────────────────
  include SettingsApi(settingsState, adminState, rolesState);
  include ProductApi(productState, settingsState, rolesState, adminState);
  include BillApi(billState, productState, settingsState, rolesState, adminState);
  include JewelryRatesApi(ratesState);
  include AdminApi(adminState, rolesState, productState, billState, supplierState, returnState);
  include RolesApi(rolesState);
  include CustomersApi(rolesState, billState);
  include SupplierApi(supplierState, adminState);
  include ReturnApi(returnState, billState, productState, rolesState, settingsState, adminState);
};
