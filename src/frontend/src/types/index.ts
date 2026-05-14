// Re-export all backend types
export type {
  AgroProductsFields,
  ApplyStoreCreditInput,
  Bill,
  BillItem,
  BillFilter,
  BillId,
  ClothingFields,
  CreateBillInput,
  CreateProductInput,
  CreateReturnInput,
  CreditTransaction,
  CustomerCredit,
  DeadStockProduct,
  ElectricalFields,
  ElectronicsFields,
  EngineFields,
  ExtraCharge,
  FootwearFields,
  GeneralFields,
  GroceryFields,
  HardwareFields,
  JewelryFields,
  LowStockProduct,
  MedicalFields,
  MobileFields,
  NearExpiryProduct,
  ProductFilter,
  ProductId,
  ProductView,
  RejectReturnInput,
  RestaurantFields,
  ReturnBill,
  ReturnBillId,
  ReturnFilter,
  ReturnItem,
  SalonFields,
  SalesSummary,
  ShopConfig,
  StationeryFields,
  AutoPartsFields,
  SmartDefaultCharges,
  Supplier,
  TaxBreakdown,
  Timestamp,
  TopProduct,
  UpdateProductInput,
} from "../backend.d";

// ─── Extended MetalRates with 22K/24K dual-carat + stale support ─────────────
// The backend returns {gold24k, gold22k, silver, lastUpdated, available, isStale}.
export interface MetalRates {
  /** 24-karat gold rate per gram (INR) */
  gold24k: number;
  /** 22-karat gold rate per gram (INR) — gold24k × 22/24 */
  gold22k: number;
  silver: number;
  lastUpdated: bigint;
  available: boolean;
  /** True when the cached rate is old and may not reflect current market */
  isStale: boolean;
}

export {
  AnalyticsPeriod,
  BillStatus,
  CreditTransactionType,
  DateFormat,
  Language,
  Metal,
  NumberFormat,
  PackType,
  PaymentType,
  PriceType,
  RestaurantCategory,
  ReturnStatus,
  ShopType,
  SizeSystem,
  StationerySubType,
  TaxSystem,
} from "../backend.d";

// ─── Frontend-only: Building Material shop type extension ─────────────────────

/** Frontend-only constant for the Building Material shop type.
 *  Maps to ShopType.Hardware on the backend (closest match). */
export const BUILDING_MATERIAL_SHOP_TYPE = "BuildingMaterial" as const;
export type BuildingMaterialShopType = typeof BUILDING_MATERIAL_SHOP_TYPE;

// ─── Frontend-only: Fruits & Vegetables shop type extension ──────────────────

/** Frontend-only constant for the Fruits & Vegetables shop type.
 *  Maps to ShopType.AgroProducts on the backend (closest match). */
export const FRUITS_VEGETABLES_SHOP_TYPE = "FruitsVegetables" as const;
export type FruitsVegetablesShopType = typeof FRUITS_VEGETABLES_SHOP_TYPE;

/** Fields specific to fruits & vegetables products (frontend-only). */
export interface FruitsVegetablesFields {
  productType: string; // Fruit | Vegetable | Herb | Dry Fruit | Other
  variety: string; // e.g. Mango, Tomato, Spinach
  unit: string; // kg | gram | dozen | piece | bundle | box | tray
  seasonalTag: string; // Summer | Winter | Monsoon | All-Season
  originSource: string; // farm/supplier/city
  freshnessDate?: string; // Best Before / Freshness Date (optional)
  batchNumber?: string; // optional batch/lot number
}

/** Fields specific to building material products (frontend-only). */
export interface BuildingMaterialFields {
  brand: string;
  material_type: string;
  grade: string;
  size_dimensions: string;
  weight: string;
  color: string;
}

// Frontend-only types
export type NavItem = {
  id: string;
  label: string;
  icon: string;
  route: string;
  staffVisible: boolean;
};

export type UserRole = "owner" | "staff";

// Re-export Principal, CustomerView and StaffMember from backend types
export type { Principal } from "@icp-sdk/core/principal";
export type { CustomerView, StaffMember } from "../backend.d";

export type CurrencyConfig = {
  code: string;
  symbol: string;
  name: string;
  decimalPlaces: number;
  indianFormat: boolean;
};

export type TaxCalculationResult = {
  taxType: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  breakdown: {
    cgst?: number;
    sgst?: number;
    igst?: number;
    vat?: number;
    salesTax?: number;
    generic?: number;
  };
};

/** Frontend-only: ShopConfig extended with a local unique id */
export type ShopWithId = import("../backend.d").ShopConfig & { id: string };

export type AppStore = {
  shopConfig: import("../backend.d").ShopConfig | null;
  isSetupComplete: boolean;
  isLoading: boolean;
  language: import("../backend.d").Language;
  products: import("../backend.d").ProductView[];
  bills: import("../backend.d").Bill[];
  // Multi-shop state
  shops: ShopWithId[];
  selectedShopIds: string[];
  setShopConfig: (config: import("../backend.d").ShopConfig) => void;
  setIsSetupComplete: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  setLanguage: (lang: import("../backend.d").Language) => void;
  setProducts: (products: import("../backend.d").ProductView[]) => void;
  setBills: (bills: import("../backend.d").Bill[]) => void;
  // Multi-shop actions
  addShop: (config: import("../backend.d").ShopConfig) => void;
  removeShop: (id: string) => void;
  updateShop: (
    id: string,
    config: Partial<import("../backend.d").ShopConfig>,
  ) => void;
  selectShops: (ids: string[]) => void;
  toggleShopSelection: (id: string) => void;
  setActiveShop: (id: string) => void;
};
