import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Loader2,
  Package,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useApi } from "../lib/api";
import { getCurrencyConfig } from "../lib/currency";
import { useStore } from "../lib/store";
import {
  BUILDING_MATERIAL_SHOP_TYPE,
  FRUITS_VEGETABLES_SHOP_TYPE,
  Metal,
  PackType,
  RestaurantCategory,
  ShopType,
  SizeSystem,
  StationerySubType,
} from "../types";
import type {
  AgroProductsFields,
  AutoPartsFields,
  BuildingMaterialFields,
  ClothingFields,
  CreateProductInput,
  ElectricalFields,
  ElectronicsFields,
  EngineFields,
  FootwearFields,
  FruitsVegetablesFields,
  GeneralFields,
  GroceryFields,
  HardwareFields,
  JewelryFields,
  MedicalFields,
  MobileFields,
  RestaurantFields,
  SalonFields,
  StationeryFields,
} from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type BulkRow = {
  id: string;
  name: string;
  barcode: string; // barcode — scan or manual
  autoNameLocked: boolean;
  category: string;
  unit: string;
  purchasePrice: string;
  transportCost: string;
  labourCost: string;
  otherCost: string;
  retailPrice: string;
  wholesalePrice: string;
  stock: string;
  minStock: string;
  expiryDate: string;
  // Mobile
  mobileCategory: string; // Mobile | Laptop | Tablet | Accessories
  mobileImei: string;
  mobileBrand: string;
  mobileModel: string;
  mobileColor: string;
  mobileStorage: string;
  mobileRam: string;
  mobileProcessor: string;
  mobileDisplaySize: string;
  mobileAccessoryType: string;
  mobileCompatibility: string;
  mobileWarrantyMonths: string;
  mobileSerialNumber: string;
  // Electronics
  elecBrand: string;
  elecModel: string;
  // Clothing
  clothItem: string;
  clothSize: string;
  clothColor: string;
  clothGender: string;
  clothBrand: string;
  // Footwear
  footBrand: string;
  footModel: string;
  footSize: string;
  footGender: string;
  // Jewelry
  jwMetal: Metal;
  jwWeightGrams: string;
  jwPurity: string;
  jwMakingCharges: string;
  // Medical
  medCompany: string;
  medBatch: string;
  medExpiry: string;
  medComposition: string;
  medPackType: PackType;
  // Building Material
  bldMaterialType: string;
  bldBrand: string;
  bldGrade: string;
  bldSizeDimensions: string;
  bldWeight: string;
  bldColor: string;
  // AutoParts
  autoVehicleBrand: string;
  autoPartName: string;
  autoPartNo: string;
  // Hardware
  hwSku: string;
  // Restaurant
  restCategory: RestaurantCategory;
  // Salon
  salonServiceName: string;
  salonDuration: string;
  // Stationery
  statSubType: StationerySubType;
  statBookClass: string;
  statBookSubject: string;
  statPenBrand: string;
  statPenColor: string;
  // Agro Products
  agroProductType: string;
  agroBrand: string;
  agroCropType: string;
  agroWeight: string;
  agroWeightUnit: string;
  agroBatchNumber: string;
  // Fruits & Vegetables
  fvProductType: string;
  fvVariety: string;
  fvUnit: string;
  fvSeasonalTag: string;
  fvOriginSource: string;
  fvFreshnessDate: string;
  fvBatchNumber: string;
  // Electrical
  elecItemCategory: string;
  elecBrandElec: string;
  elecModel2: string;
  elecAmpere: string;
  elecWattage: string;
  elecVoltage: string;
  elecWireGauge: string;
  elecColorElec: string;
  elecLengthUnit: string;
  elecBatchNumber: string;
  elecIsiCertified: boolean;
};

type RowErrors = Record<string, string>;
type SaveStatus = "idle" | "saving" | "done";
type RowSaveResult = { rowIdx: number; success: boolean; error?: string };

// ─── Size arrays (duplicated from ProductsPage for isolation) ─────────────────

const UNDER_GARMENT_SIZES: Record<string, string[]> = {
  Man: ["S", "M", "L", "XL", "XXL"],
  Woman: [
    "28A",
    "30A",
    "32A",
    "32B",
    "34A",
    "34B",
    "34C",
    "36A",
    "36B",
    "36C",
    "36D",
    "38C",
    "38D",
    "38E",
    "40C",
    "40D",
    "40E",
  ],
  Children: [
    "0-3M",
    "3-6M",
    "6-12M",
    "1Y",
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
    "15Y",
    "16Y",
  ],
};

const BOTTOM_WEAR_KEYWORDS = [
  "jeans",
  "trouser",
  "trousers",
  "pant",
  "pants",
  "shorts",
  "legging",
  "leggings",
  "skirt",
  "palazzo",
  "chino",
  "chinos",
  "jogger",
  "joggers",
  "capri",
  "denim",
];
const BOTTOM_WEAR_SIZES = [
  "24",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "44",
  "46",
  "48",
  "50",
  "52",
];
const ALPHA_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const FOOTWEAR_SIZES: Record<string, string[]> = {
  Man: [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
  ],
  Woman: [
    "3",
    "3.5",
    "4",
    "4.5",
    "5",
    "5.5",
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
  ],
  Children: [
    "0-3M",
    "3-6M",
    "6-12M",
    "1Y",
    "2Y",
    "3Y",
    "4Y",
    "5Y",
    "6Y",
    "7Y",
    "8Y",
    "9Y",
    "10Y",
    "11Y",
    "12Y",
    "13Y",
    "14Y",
    "15Y",
    "16Y",
  ],
};

const CLOTHING_ITEMS = [
  "T-Shirt",
  "Shirt",
  "Kurti",
  "Jeans",
  "Trousers",
  "Shorts",
  "Skirt",
  "Dress",
  "Box Dress",
  "Jacket",
  "Under Garment",
];

function getSizeOptions(item: string, gender?: string): string[] {
  const lower = item.trim().toLowerCase();
  if (lower.startsWith("under garment")) {
    return gender ? (UNDER_GARMENT_SIZES[gender] ?? []) : [];
  }
  if (BOTTOM_WEAR_KEYWORDS.some((kw) => lower.includes(kw)))
    return BOTTOM_WEAR_SIZES;
  return ALPHA_SIZES;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeRowId() {
  return `row_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function defaultRow(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
): BulkRow {
  const unitMap: Partial<Record<ShopType, string>> = {
    [ShopType.Mobile]: "NOS",
    [ShopType.Electronics]: "NOS",
    [ShopType.Grocery]: "KG",
    [ShopType.Clothing]: "PCS",
    [ShopType.Footwear]: "Pair",
    [ShopType.Medical]: "Strip",
    [ShopType.Stationery]: "PCS",
    [ShopType.AutoParts]: "PCS",
    [ShopType.Hardware]: "PCS",
    [ShopType.Jewelry]: "Gram",
    [ShopType.Restaurant]: "Plate",
    [ShopType.Salon]: "Session",
    [ShopType.General]: "PCS",
    [ShopType.AgroProducts]: "KG",
    [ShopType.Electrical]: "Piece",
  };
  const unit =
    shopType === BUILDING_MATERIAL_SHOP_TYPE
      ? "PCS"
      : shopType === FRUITS_VEGETABLES_SHOP_TYPE
        ? "kg"
        : (unitMap[shopType as ShopType] ?? "PCS");
  return {
    id: makeRowId(),
    name: "",
    barcode: "",
    autoNameLocked: false,
    category: "",
    unit,
    purchasePrice: "",
    transportCost: "0",
    labourCost: "0",
    otherCost: "0",
    retailPrice: "",
    wholesalePrice: "",
    stock: "0",
    minStock: "5",
    expiryDate: "",
    mobileCategory: "Mobile",
    mobileImei: "",
    mobileBrand: "",
    mobileModel: "",
    mobileColor: "",
    mobileStorage: "",
    mobileRam: "",
    mobileProcessor: "",
    mobileDisplaySize: "",
    mobileAccessoryType: "",
    mobileCompatibility: "",
    mobileWarrantyMonths: "12",
    mobileSerialNumber: "",
    elecBrand: "",
    elecModel: "",
    clothItem: "",
    clothSize: "",
    clothColor: "",
    clothGender: "",
    clothBrand: "",
    footBrand: "",
    footModel: "",
    footSize: "",
    footGender: "",
    jwMetal: Metal.Gold,
    jwWeightGrams: "",
    jwPurity: "22K",
    jwMakingCharges: "",
    medCompany: "",
    medBatch: "",
    medExpiry: "",
    medComposition: "",
    medPackType: PackType.Strip,
    bldMaterialType: "",
    bldBrand: "",
    bldGrade: "",
    bldSizeDimensions: "",
    bldWeight: "",
    bldColor: "",
    autoVehicleBrand: "",
    autoPartName: "",
    autoPartNo: "",
    hwSku: "",
    restCategory: RestaurantCategory.Veg,
    salonServiceName: "",
    salonDuration: "30",
    statSubType: StationerySubType.Other,
    statBookClass: "",
    statBookSubject: "",
    statPenBrand: "",
    statPenColor: "",
    agroProductType: "Seeds",
    agroBrand: "",
    agroCropType: "",
    agroWeight: "",
    agroWeightUnit: "kg",
    agroBatchNumber: "",
    fvProductType: "Fruit",
    fvVariety: "",
    fvUnit: "kg",
    fvSeasonalTag: "All-Season",
    fvOriginSource: "",
    fvFreshnessDate: "",
    fvBatchNumber: "",
    elecItemCategory: "",
    elecBrandElec: "",
    elecModel2: "",
    elecAmpere: "",
    elecWattage: "",
    elecVoltage: "",
    elecWireGauge: "",
    elecColorElec: "",
    elecLengthUnit: "meter",
    elecBatchNumber: "",
    elecIsiCertified: false,
  };
}

function calcCostPrice(row: BulkRow): string {
  const p = Number.parseFloat(row.purchasePrice) || 0;
  const t = Number.parseFloat(row.transportCost) || 0;
  const l = Number.parseFloat(row.labourCost) || 0;
  const o = Number.parseFloat(row.otherCost) || 0;
  const total = p + t + l + o;
  return total > 0 ? String(total) : "";
}

function autoName(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  row: BulkRow,
): string {
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    return [row.fvVariety, row.fvProductType, row.fvUnit, row.fvSeasonalTag]
      .filter(Boolean)
      .join(" ");
  }
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    return [
      row.bldBrand,
      row.bldMaterialType,
      row.bldGrade,
      row.bldSizeDimensions,
    ]
      .filter(Boolean)
      .join(" ");
  }
  switch (shopType) {
    case ShopType.Mobile: {
      const mc = row.mobileCategory || "Mobile";
      if (mc === "Laptop") {
        return [
          row.mobileBrand,
          row.mobileModel,
          row.mobileProcessor,
          row.mobileRam,
          row.mobileStorage,
          row.mobileDisplaySize,
        ]
          .filter(Boolean)
          .join(" ");
      }
      if (mc === "Accessories") {
        return [
          row.mobileBrand,
          row.mobileAccessoryType,
          row.mobileCompatibility,
          row.mobileColor,
        ]
          .filter(Boolean)
          .join(" ");
      }
      if (mc === "Tablet") {
        return [
          row.mobileBrand,
          row.mobileModel,
          row.mobileStorage,
          row.mobileDisplaySize,
        ]
          .filter(Boolean)
          .join(" ");
      }
      return [
        row.mobileBrand,
        row.mobileModel,
        row.mobileStorage,
        row.mobileRam,
        row.mobileColor,
      ]
        .filter(Boolean)
        .join(" ");
    }
    case ShopType.Electronics:
      return [row.elecBrand, row.elecModel].filter(Boolean).join(" ");
    case ShopType.Clothing:
      return [row.clothBrand, row.clothItem, row.clothColor, row.clothSize]
        .filter(Boolean)
        .join(" ");
    case ShopType.Footwear:
      return [row.footBrand, row.footModel, row.footSize]
        .filter(Boolean)
        .join(" ");
    case ShopType.Medical:
      return [row.name, row.medCompany].filter(Boolean).join(" - ");
    case ShopType.Jewelry:
      // Only generate auto-name when weight is a positive number.
      // Metal alone (e.g. "Gold") is not descriptive enough — returning "" lets
      // the user type freely; autoNameLocked gate in computedName preserves it.
      return row.jwWeightGrams && Number(row.jwWeightGrams) > 0
        ? [row.jwMetal, `${row.jwWeightGrams}g`].filter(Boolean).join(" ")
        : "";
    case ShopType.AgroProducts:
      return [
        row.agroCropType,
        row.agroProductType,
        row.agroBrand,
        row.agroWeight ? `${row.agroWeight}${row.agroWeightUnit}` : "",
      ]
        .filter(Boolean)
        .join(" ");
    default:
      return row.name;
  }
}

function validateRow(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  row: BulkRow,
  allRows: BulkRow[],
): RowErrors {
  const errs: RowErrors = {};
  if (!row.retailPrice || Number(row.retailPrice) < 0)
    errs.retailPrice = "Required";
  if (Number(row.stock) < 0) errs.stock = "≥ 0";
  if (shopType === ShopType.Mobile) {
    // IMEI only required for Mobile (phone) category
    if (row.mobileCategory === "Mobile" || !row.mobileCategory) {
      if (!row.mobileImei) errs.mobileImei = "Required";
      else if (!/^\d{15}$/.test(row.mobileImei)) errs.mobileImei = "15 digits";
      else {
        const dup = allRows.filter(
          (r) => r.id !== row.id && r.mobileImei === row.mobileImei,
        );
        if (dup.length > 0) errs.mobileImei = "Duplicate IMEI";
      }
    }
  }
  if (shopType === ShopType.Medical) {
    if (!row.medExpiry) errs.medExpiry = "Required";
  }
  if (shopType === ShopType.Clothing) {
    if (!row.clothSize) errs.clothSize = "Required";
  }
  if (shopType === ShopType.Footwear) {
    if (!row.footGender) errs.footGender = "Select type";
    else if (!row.footSize) errs.footSize = "Required";
  }
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    if (!row.bldMaterialType) errs.bldMaterialType = "Required";
  }
  if (shopType === ShopType.AgroProducts) {
    if (!row.agroProductType) errs.agroProductType = "Required";
    if (!row.agroBrand) errs.agroBrand = "Required";
    if (!row.agroCropType) errs.agroCropType = "Required";
    if (!row.agroWeight || Number(row.agroWeight) <= 0)
      errs.agroWeight = "Required";
  }
  if (
    (shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE ||
    (shopType as string) === (ShopType.FruitsVegetables as string)
  ) {
    if (!row.fvVariety) errs.fvVariety = "Required";
    if (!row.fvUnit) errs.fvUnit = "Required";
  }
  return errs;
}

function buildEngineFields(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  row: BulkRow,
): EngineFields {
  const optExpiry = (d: string): [] | [string] => (d ? [d] : []);

  // FruitsVegetables: matches either frontend constant OR enum value (same string)
  if (
    (shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE ||
    (shopType as string) === (ShopType.FruitsVegetables as string)
  ) {
    const f: FruitsVegetablesFields = {
      productType: row.fvProductType || "Fruit",
      variety: row.fvVariety,
      unit: row.fvUnit || "kg",
      seasonalTag: row.fvSeasonalTag || "All-Season",
      originSource: row.fvOriginSource,
      freshnessDate: row.fvFreshnessDate || undefined,
      batchNumber: row.fvBatchNumber || undefined,
    };
    return {
      __kind__: "FruitsVegetables",
      FruitsVegetables: f,
    } as unknown as EngineFields;
  }

  // BuildingMaterial: matches either frontend constant OR enum value (same string)
  if (
    shopType === BUILDING_MATERIAL_SHOP_TYPE ||
    (shopType as string) === (ShopType.BuildingMaterial as string)
  ) {
    const f = {
      brand: row.bldBrand,
      material_type: row.bldMaterialType,
      grade: row.bldGrade,
      size_dimensions: row.bldSizeDimensions,
      weight: row.bldWeight,
      color: row.bldColor,
      expiryDate: optExpiry(row.expiryDate),
    } as unknown as BuildingMaterialFields;
    return {
      __kind__: "BuildingMaterial",
      BuildingMaterial: f,
    } as unknown as EngineFields;
  }

  switch (shopType) {
    case ShopType.Mobile: {
      const f = {
        mobileCategory: row.mobileCategory || "Mobile",
        brand: row.mobileBrand,
        model: row.mobileModel,
        imei:
          row.mobileCategory === "Mobile" || !row.mobileCategory
            ? row.mobileImei
            : "",
        color: row.mobileColor,
        storage: row.mobileStorage,
        ram: row.mobileRam,
        processor: row.mobileProcessor,
        displaySize: row.mobileDisplaySize,
        accessoryType: row.mobileAccessoryType,
        compatibility: row.mobileCompatibility,
        warrantyMonths: BigInt(Number(row.mobileWarrantyMonths) || 0),
        serialNumber: row.mobileSerialNumber,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as MobileFields;
      return { __kind__: "Mobile", Mobile: f } as unknown as EngineFields;
    }
    case ShopType.Electronics: {
      const f = {
        brand: row.elecBrand,
        model: row.elecModel,
        serialNo: "",
        warrantyMonths: BigInt(0),
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as ElectronicsFields;
      return {
        __kind__: "Electronics",
        Electronics: f,
      } as unknown as EngineFields;
    }
    case ShopType.Medical: {
      const f: MedicalFields = {
        company: row.medCompany,
        batchNo: row.medBatch,
        expiryDate: row.medExpiry,
        composition: row.medComposition,
        packType: row.medPackType,
        isControlled: false,
      };
      return { __kind__: "Medical", Medical: f } as unknown as EngineFields;
    }
    case ShopType.Clothing: {
      const f = {
        brand: row.clothBrand,
        itemName: row.clothItem,
        size: row.clothSize,
        color: row.clothColor,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as ClothingFields;
      return { __kind__: "Clothing", Clothing: f } as unknown as EngineFields;
    }
    case ShopType.Footwear: {
      const f = {
        brand: row.footBrand,
        model: row.footModel,
        size: row.footSize,
        sizeSystem: SizeSystem.UK,
        color: "",
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as FootwearFields;
      return { __kind__: "Footwear", Footwear: f } as unknown as EngineFields;
    }
    case ShopType.Grocery: {
      const f = {
        decimalQtyEnabled: true,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as GroceryFields;
      return { __kind__: "Grocery", Grocery: f } as unknown as EngineFields;
    }
    case ShopType.AutoParts: {
      const f = {
        vehicleBrand: row.autoVehicleBrand,
        vehicleModel: "",
        partName: row.autoPartName,
        partNo: row.autoPartNo,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as AutoPartsFields;
      return {
        __kind__: "AutoParts",
        AutoParts: f,
      } as unknown as EngineFields;
    }
    case ShopType.Hardware: {
      const f = {
        sku: row.hwSku,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as HardwareFields;
      return { __kind__: "Hardware", Hardware: f } as unknown as EngineFields;
    }
    case ShopType.Jewelry: {
      const f: JewelryFields = {
        metal: row.jwMetal ?? Metal.Gold,
        weightGrams: Number.parseFloat(row.jwWeightGrams) || 0,
        purity: (row.jwPurity ?? "22K").trim() || "22K",
        makingCharges: Number.parseFloat(row.jwMakingCharges) || 0,
        metalRate: 0,
        expiryDate: row.expiryDate || undefined,
      };
      return { __kind__: "Jewelry", Jewelry: f } as unknown as EngineFields;
    }
    case ShopType.Salon: {
      const f = {
        duration: BigInt(Number(row.salonDuration) || 0),
        staffName: "",
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as SalonFields;
      return { __kind__: "Salon", Salon: f } as unknown as EngineFields;
    }
    case ShopType.Stationery: {
      const f = {
        subType: row.statSubType ?? StationerySubType.Other,
        bookClass: row.statBookClass,
        bookSubject: row.statBookSubject,
        penBrand: row.statPenBrand,
        penColor: row.statPenColor,
        notebookPages: BigInt(0),
        notebookSize: "",
        bookMedium: "",
        expiryDate: row.expiryDate || undefined,
      } as unknown as StationeryFields;
      return {
        __kind__: "Stationery",
        Stationery: f,
      } as unknown as EngineFields;
    }
    case ShopType.Restaurant: {
      const f = {
        category: row.restCategory,
        expiryDate: optExpiry(row.expiryDate),
      } as unknown as RestaurantFields;
      return {
        __kind__: "Restaurant",
        Restaurant: f,
      } as unknown as EngineFields;
    }
    case ShopType.AgroProducts: {
      const f: AgroProductsFields = {
        productType: row.agroProductType || "Seeds",
        brand: row.agroBrand,
        cropType: row.agroCropType,
        weight: Number.parseFloat(row.agroWeight) || 0,
        weightUnit: row.agroWeightUnit || "kg",
        expiryDate: row.expiryDate || undefined,
        batchNumber: row.agroBatchNumber || undefined,
      };
      return {
        __kind__: "AgroProducts",
        AgroProducts: f,
      } as unknown as EngineFields;
    }
    case ShopType.Electrical: {
      const f: ElectricalFields = {
        itemCategory: row.elecItemCategory,
        brand: row.elecBrandElec,
        model: row.elecModel2,
        ampereRating: row.elecAmpere,
        wattage: row.elecWattage,
        voltageRating: row.elecVoltage,
        wireGauge: row.elecWireGauge,
        color: row.elecColorElec,
        lengthUnit: row.elecLengthUnit || "meter",
        batchNumber: row.elecBatchNumber,
        isiCertified: row.elecIsiCertified,
        expiryDate: row.expiryDate || undefined,
      };
      return {
        __kind__: "Electrical",
        Electrical: f,
      } as unknown as EngineFields;
    }
    default:
      return {
        __kind__: "General",
        General: {
          expiryDate: optExpiry(row.expiryDate),
        } as unknown as GeneralFields,
      } as unknown as EngineFields;
  }
}

function buildCreateInput(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  row: BulkRow,
  activeShopType: ShopType,
  shopId: string,
): CreateProductInput {
  const costPrice = Number.parseFloat(calcCostPrice(row)) || 0;
  const effectiveName =
    autoName(shopType, row) || row.name || `Product ${row.id.slice(-4)}`;
  return {
    shopId,
    name: effectiveName,
    category: row.category || "General",
    unit: row.unit,
    retailPrice: Number.parseFloat(row.retailPrice) || 0,
    wholesalePrice: Number.parseFloat(row.wholesalePrice) || 0,
    costPrice,
    transportCost: Number.parseFloat(row.transportCost) || 0,
    labourCost: Number.parseFloat(row.labourCost) || 0,
    stock: Number.parseFloat(row.stock) || 0,
    minStock: Number.parseFloat(row.minStock) || 5,
    isActive: true,
    barcode: row.barcode.trim() || undefined,
    shopType: activeShopType,
    engineFields: buildEngineFields(shopType, row),
  };
}

// ─── Size Modal ───────────────────────────────────────────────────────────────

function SizeModal({
  open,
  onClose,
  shopType,
  row,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE;
  row: BulkRow;
  onSelect: (size: string, gender?: string) => void;
}) {
  const [localGender, setLocalGender] = useState(
    shopType === ShopType.Clothing ? row.clothGender : row.footGender,
  );
  const [customSize, setCustomSize] = useState("");

  const isClothing = shopType === ShopType.Clothing;
  const isFootwear = shopType === ShopType.Footwear;

  const sizeOptions = useMemo(() => {
    if (isClothing) return getSizeOptions(row.clothItem, localGender);
    if (isFootwear)
      return localGender ? (FOOTWEAR_SIZES[localGender] ?? []) : [];
    return [];
  }, [isClothing, isFootwear, row.clothItem, localGender]);

  const needsGender = isClothing || isFootwear;

  const GENDERS = [
    { label: "👨 MAN", value: "Man" },
    { label: "👩 WOMAN", value: "Woman" },
    { label: "👦 CHILDREN", value: "Children" },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="size_modal.dialog">
        <DialogHeader>
          <DialogTitle>Select Size</DialogTitle>
        </DialogHeader>

        {needsGender && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              Select Type
            </p>
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  data-ocid={`size_modal.gender.${g.value.toLowerCase()}`}
                  onClick={() => setLocalGender(g.value)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                    localGender === g.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizeOptions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Sizes</p>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  data-ocid="size_modal.size_option"
                  onClick={() => {
                    onSelect(s, localGender || undefined);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom size — always visible */}
        <div className="space-y-2 border-t border-border pt-3">
          <p className="text-xs font-semibold text-foreground">Custom Size:</p>
          <div className="flex gap-2">
            <Input
              data-ocid="size_modal.custom_input"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder="Enter custom size..."
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && customSize.trim()) {
                  onSelect(customSize.trim(), localGender || undefined);
                  onClose();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              data-ocid="size_modal.confirm_button"
              disabled={!customSize.trim()}
              onClick={() => {
                onSelect(customSize.trim(), localGender || undefined);
                onClose();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Cell component ───────────────────────────────────────────────────────────

function Cell({
  children,
  className = "",
  error,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  error?: string;
  style?: React.CSSProperties;
}) {
  return (
    <td
      className={`px-2 py-1.5 align-top ${className}`}
      style={{ minWidth: 110, ...style }}
    >
      <div className="relative">
        {children}
        {error && (
          <p className="text-[10px] text-destructive mt-0.5 flex items-center gap-0.5">
            <AlertCircle className="w-2.5 h-2.5 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    </td>
  );
}

function SmallInput({
  value,
  onChange,
  placeholder,
  type = "text",
  "data-ocid": ocid,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  "data-ocid"?: string;
  hasError?: boolean;
}) {
  return (
    <Input
      data-ocid={ocid}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-8 text-xs px-2 ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
    />
  );
}

function SmallSelect({
  value,
  onChange,
  options,
  "data-ocid": ocid,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  "data-ocid"?: string;
  hasError?: boolean;
}) {
  return (
    <select
      data-ocid={ocid}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-8 text-xs px-2 rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
        hasError ? "border-destructive" : "border-input"
      }`}
    >
      <option value="">—</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ─── Row component ─────────────────────────────────────────────────────────────

function BulkRow({
  row,
  idx,
  shopType,
  errors,
  onChange,
  onRemove,
  onCopy,
  saveResult,
  onOpenSizeModal,
}: {
  row: BulkRow;
  idx: number;
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE;
  errors: RowErrors;
  onChange: (patch: Partial<BulkRow>) => void;
  onRemove: () => void;
  onCopy: () => void;
  saveResult?: RowSaveResult;
  onOpenSizeModal: () => void;
}) {
  const costPrice = calcCostPrice(row);
  // Only auto-fill name when user has NOT manually locked it AND the computed
  // auto-name is non-empty. If autoNameLocked is true, always show row.name.
  const computedName = !row.autoNameLocked
    ? autoName(shopType, row) || row.name || ""
    : row.name;

  const isSuccess = saveResult?.success === true;
  const isFailed = saveResult?.success === false;

  return (
    <>
      <tr
        data-ocid={`bulk_entry.item.${idx + 1}`}
        className={`border-b border-border transition-colors ${
          isSuccess
            ? "bg-green-500/5"
            : isFailed
              ? "bg-destructive/5"
              : "hover:bg-muted/30"
        }`}
      >
        {/* Row # + status */}
        <td className="px-2 py-1.5 align-top" style={{ minWidth: 52 }}>
          <div className="flex flex-col items-center gap-1 pt-1">
            <span className="text-xs text-muted-foreground font-medium">
              {idx + 1}
            </span>
            {isSuccess && (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            )}
            {isFailed && (
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            )}
          </div>
        </td>

        {/* Name */}
        <Cell style={{ minWidth: 160 }} error={errors.name}>
          <SmallInput
            data-ocid={`bulk_entry.name.${idx + 1}`}
            value={computedName}
            onChange={(v) => onChange({ name: v, autoNameLocked: true })}
            placeholder="Auto-filled"
          />
        </Cell>

        {/* Barcode */}
        <Cell style={{ minWidth: 130 }}>
          <SmallInput
            data-ocid={`bulk_entry.barcode.${idx + 1}`}
            value={row.barcode}
            onChange={(v) => onChange({ barcode: v })}
            placeholder="Scan or type..."
          />
        </Cell>

        {/* Category */}
        <Cell error={errors.category}>
          <SmallInput
            data-ocid={`bulk_entry.category.${idx + 1}`}
            value={row.category}
            onChange={(v) => onChange({ category: v })}
            placeholder="Category"
          />
        </Cell>

        {/* Unit */}
        <Cell style={{ minWidth: 80 }}>
          <SmallInput
            data-ocid={`bulk_entry.unit.${idx + 1}`}
            value={row.unit}
            onChange={(v) => onChange({ unit: v })}
            placeholder="PCS"
          />
        </Cell>

        {/* Purchase Price */}
        <Cell error={errors.purchasePrice}>
          <SmallInput
            data-ocid={`bulk_entry.purchase_price.${idx + 1}`}
            type="number"
            value={row.purchasePrice}
            onChange={(v) => {
              onChange({ purchasePrice: v });
            }}
            placeholder="0"
          />
        </Cell>

        {/* Transport */}
        <Cell>
          <SmallInput
            data-ocid={`bulk_entry.transport.${idx + 1}`}
            type="number"
            value={row.transportCost}
            onChange={(v) => onChange({ transportCost: v })}
            placeholder="0"
          />
        </Cell>

        {/* Labour */}
        <Cell>
          <SmallInput
            data-ocid={`bulk_entry.labour.${idx + 1}`}
            type="number"
            value={row.labourCost}
            onChange={(v) => onChange({ labourCost: v })}
            placeholder="0"
          />
        </Cell>

        {/* Other Charge */}
        <Cell>
          <SmallInput
            data-ocid={`bulk_entry.other_cost.${idx + 1}`}
            type="number"
            value={row.otherCost}
            onChange={(v) => onChange({ otherCost: v })}
            placeholder="0"
          />
        </Cell>

        {/* Cost Price (auto-calc, read-only) */}
        <Cell>
          <div
            data-ocid={`bulk_entry.cost_price.${idx + 1}`}
            className="h-8 flex items-center px-2 text-xs rounded-md bg-muted/50 text-muted-foreground border border-border font-mono"
          >
            {costPrice || "—"}
          </div>
        </Cell>

        {/* Retail Price */}
        <Cell error={errors.retailPrice}>
          <SmallInput
            data-ocid={`bulk_entry.retail_price.${idx + 1}`}
            type="number"
            value={row.retailPrice}
            onChange={(v) => onChange({ retailPrice: v })}
            placeholder="0"
            hasError={!!errors.retailPrice}
          />
        </Cell>

        {/* Wholesale Price */}
        <Cell>
          <SmallInput
            data-ocid={`bulk_entry.wholesale_price.${idx + 1}`}
            type="number"
            value={row.wholesalePrice}
            onChange={(v) => onChange({ wholesalePrice: v })}
            placeholder="0"
          />
        </Cell>

        {/* Stock */}
        <Cell error={errors.stock}>
          <SmallInput
            data-ocid={`bulk_entry.stock.${idx + 1}`}
            type="number"
            value={row.stock}
            onChange={(v) => onChange({ stock: v })}
            placeholder="0"
            hasError={!!errors.stock}
          />
        </Cell>

        {/* Min Stock */}
        <Cell>
          <SmallInput
            data-ocid={`bulk_entry.min_stock.${idx + 1}`}
            type="number"
            value={row.minStock}
            onChange={(v) => onChange({ minStock: v })}
            placeholder="5"
          />
        </Cell>

        {/* Expiry */}
        <Cell error={errors.medExpiry || errors.expiryDate}>
          <SmallInput
            data-ocid={`bulk_entry.expiry.${idx + 1}`}
            type="date"
            value={
              shopType === ShopType.Medical ? row.medExpiry : row.expiryDate
            }
            onChange={(v) =>
              shopType === ShopType.Medical
                ? onChange({ medExpiry: v })
                : onChange({ expiryDate: v })
            }
            hasError={!!(errors.medExpiry || errors.expiryDate)}
          />
        </Cell>

        {/* ── Shop-type-specific columns ── */}

        {shopType === ShopType.Mobile && (
          <>
            {/* Sub-Type selector */}
            <Cell style={{ minWidth: 130 }}>
              <SmallSelect
                data-ocid={`bulk_entry.mobile_category.${idx + 1}`}
                value={row.mobileCategory || "Mobile"}
                onChange={(v) =>
                  onChange({
                    mobileCategory: v,
                    mobileImei: "",
                    mobileProcessor: "",
                    mobileDisplaySize: "",
                    mobileAccessoryType: "",
                    mobileCompatibility: "",
                    mobileSerialNumber: "",
                  })
                }
                options={[
                  { label: "📱 Mobile", value: "Mobile" },
                  { label: "💻 Laptop", value: "Laptop" },
                  { label: "📟 Tablet", value: "Tablet" },
                  { label: "🎧 Accessories", value: "Accessories" },
                ]}
              />
            </Cell>
            {/* IMEI (phone only) / Serial */}
            <Cell error={errors.mobileImei} style={{ minWidth: 130 }}>
              {row.mobileCategory === "Mobile" || !row.mobileCategory ? (
                <SmallInput
                  data-ocid={`bulk_entry.imei.${idx + 1}`}
                  value={row.mobileImei}
                  onChange={(v) => onChange({ mobileImei: v })}
                  placeholder="IMEI (15 digits)"
                  hasError={!!errors.mobileImei}
                />
              ) : (
                <SmallInput
                  data-ocid={`bulk_entry.serial.${idx + 1}`}
                  value={row.mobileSerialNumber}
                  onChange={(v) => onChange({ mobileSerialNumber: v })}
                  placeholder="Serial No (opt)"
                />
              )}
            </Cell>
            {/* Brand */}
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.brand.${idx + 1}`}
                value={row.mobileBrand}
                onChange={(v) => onChange({ mobileBrand: v })}
                placeholder="Brand"
              />
            </Cell>
            {/* Model */}
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.model.${idx + 1}`}
                value={row.mobileModel}
                onChange={(v) => onChange({ mobileModel: v })}
                placeholder="Model"
              />
            </Cell>
            {/* Storage */}
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.storage.${idx + 1}`}
                value={row.mobileStorage}
                onChange={(v) => onChange({ mobileStorage: v })}
                placeholder="e.g. 128GB"
              />
            </Cell>
            {/* RAM — hidden for Accessories */}
            <Cell>
              {row.mobileCategory !== "Accessories" ? (
                <SmallInput
                  data-ocid={`bulk_entry.ram.${idx + 1}`}
                  value={row.mobileRam}
                  onChange={(v) => onChange({ mobileRam: v })}
                  placeholder="e.g. 8GB"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-2">—</span>
              )}
            </Cell>
            {/* Processor — Laptop only */}
            <Cell>
              {row.mobileCategory === "Laptop" ? (
                <SmallInput
                  data-ocid={`bulk_entry.processor.${idx + 1}`}
                  value={row.mobileProcessor}
                  onChange={(v) => onChange({ mobileProcessor: v })}
                  placeholder="e.g. i5"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-2">—</span>
              )}
            </Cell>
            {/* Display — Laptop/Tablet only */}
            <Cell>
              {row.mobileCategory === "Laptop" ||
              row.mobileCategory === "Tablet" ? (
                <SmallInput
                  data-ocid={`bulk_entry.display.${idx + 1}`}
                  value={row.mobileDisplaySize}
                  onChange={(v) => onChange({ mobileDisplaySize: v })}
                  placeholder="e.g. 14 inch"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-2">—</span>
              )}
            </Cell>
            {/* Accessory Type — Accessories only */}
            <Cell>
              {row.mobileCategory === "Accessories" ? (
                <SmallInput
                  data-ocid={`bulk_entry.accessory_type.${idx + 1}`}
                  value={row.mobileAccessoryType}
                  onChange={(v) => onChange({ mobileAccessoryType: v })}
                  placeholder="e.g. Earbuds"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-2">—</span>
              )}
            </Cell>
            {/* Compatibility — Accessories only */}
            <Cell>
              {row.mobileCategory === "Accessories" ? (
                <SmallInput
                  data-ocid={`bulk_entry.compatibility.${idx + 1}`}
                  value={row.mobileCompatibility}
                  onChange={(v) => onChange({ mobileCompatibility: v })}
                  placeholder="e.g. Type-C"
                />
              ) : (
                <span className="text-xs text-muted-foreground px-2">—</span>
              )}
            </Cell>
            {/* Color */}
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.color.${idx + 1}`}
                value={row.mobileColor}
                onChange={(v) => onChange({ mobileColor: v })}
                placeholder="Color"
              />
            </Cell>
            {/* Warranty */}
            <Cell style={{ minWidth: 80 }}>
              <SmallInput
                data-ocid={`bulk_entry.warranty.${idx + 1}`}
                type="number"
                value={row.mobileWarrantyMonths}
                onChange={(v) => onChange({ mobileWarrantyMonths: v })}
                placeholder="12"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Electronics && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.brand.${idx + 1}`}
                value={row.elecBrand}
                onChange={(v) => onChange({ elecBrand: v })}
                placeholder="Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.model.${idx + 1}`}
                value={row.elecModel}
                onChange={(v) => onChange({ elecModel: v })}
                placeholder="Model"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Clothing && (
          <>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.cloth_item.${idx + 1}`}
                value={row.clothItem}
                onChange={(v) =>
                  onChange({ clothItem: v, clothSize: "", clothGender: "" })
                }
                options={CLOTHING_ITEMS.map((i) => ({ label: i, value: i }))}
              />
            </Cell>
            <Cell error={errors.clothSize}>
              <button
                type="button"
                data-ocid={`bulk_entry.cloth_size.${idx + 1}`}
                onClick={onOpenSizeModal}
                className={`w-full h-8 text-xs px-2 rounded-md border text-left transition-colors hover:bg-secondary ${
                  errors.clothSize
                    ? "border-destructive text-destructive"
                    : "border-input text-foreground"
                } ${!row.clothSize ? "text-muted-foreground" : ""}`}
              >
                {row.clothSize || "Size…"}
                {row.clothGender && ` (${row.clothGender})`}
              </button>
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.cloth_color.${idx + 1}`}
                value={row.clothColor}
                onChange={(v) => onChange({ clothColor: v })}
                placeholder="Color"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.cloth_brand.${idx + 1}`}
                value={row.clothBrand}
                onChange={(v) => onChange({ clothBrand: v })}
                placeholder="Brand"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Footwear && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.foot_brand.${idx + 1}`}
                value={row.footBrand}
                onChange={(v) => onChange({ footBrand: v })}
                placeholder="Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.foot_model.${idx + 1}`}
                value={row.footModel}
                onChange={(v) => onChange({ footModel: v })}
                placeholder="Model"
              />
            </Cell>
            <Cell error={errors.footSize || errors.footGender}>
              <button
                type="button"
                data-ocid={`bulk_entry.foot_size.${idx + 1}`}
                onClick={onOpenSizeModal}
                className={`w-full h-8 text-xs px-2 rounded-md border text-left transition-colors hover:bg-secondary ${
                  errors.footSize || errors.footGender
                    ? "border-destructive text-destructive"
                    : "border-input text-foreground"
                } ${!row.footSize ? "text-muted-foreground" : ""}`}
              >
                {row.footSize
                  ? `${row.footSize} (${row.footGender})`
                  : row.footGender
                    ? `${row.footGender} — pick size`
                    : "Size…"}
              </button>
            </Cell>
          </>
        )}

        {shopType === ShopType.Jewelry && (
          <>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.jw_metal.${idx + 1}`}
                value={row.jwMetal}
                onChange={(v) => onChange({ jwMetal: v as Metal })}
                options={[
                  { label: "Gold", value: Metal.Gold },
                  { label: "Silver", value: Metal.Silver },
                  { label: "Platinum", value: Metal.Platinum },
                  { label: "Other", value: Metal.Other },
                ]}
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.jw_weight.${idx + 1}`}
                type="number"
                value={row.jwWeightGrams}
                onChange={(v) => onChange({ jwWeightGrams: v })}
                placeholder="g"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.jw_purity.${idx + 1}`}
                value={row.jwPurity}
                onChange={(v) => onChange({ jwPurity: v })}
                placeholder="22K"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.jw_making.${idx + 1}`}
                type="number"
                value={row.jwMakingCharges}
                onChange={(v) => onChange({ jwMakingCharges: v })}
                placeholder="0"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Medical && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.med_company.${idx + 1}`}
                value={row.medCompany}
                onChange={(v) => onChange({ medCompany: v })}
                placeholder="Company"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.med_batch.${idx + 1}`}
                value={row.medBatch}
                onChange={(v) => onChange({ medBatch: v })}
                placeholder="Batch No"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.med_composition.${idx + 1}`}
                value={row.medComposition}
                onChange={(v) => onChange({ medComposition: v })}
                placeholder="Composition"
              />
            </Cell>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.med_pack_type.${idx + 1}`}
                value={row.medPackType}
                onChange={(v) => onChange({ medPackType: v as PackType })}
                options={Object.values(PackType).map((p) => ({
                  label: p,
                  value: p,
                }))}
              />
            </Cell>
          </>
        )}

        {shopType === BUILDING_MATERIAL_SHOP_TYPE && (
          <>
            <Cell error={errors.bldMaterialType}>
              <SmallInput
                data-ocid={`bulk_entry.bld_material_type.${idx + 1}`}
                value={row.bldMaterialType}
                onChange={(v) => onChange({ bldMaterialType: v })}
                placeholder="Steel / Cement…"
                hasError={!!errors.bldMaterialType}
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.bld_brand.${idx + 1}`}
                value={row.bldBrand}
                onChange={(v) => onChange({ bldBrand: v })}
                placeholder="Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.bld_grade.${idx + 1}`}
                value={row.bldGrade}
                onChange={(v) => onChange({ bldGrade: v })}
                placeholder="Grade"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.bld_size.${idx + 1}`}
                value={row.bldSizeDimensions}
                onChange={(v) => onChange({ bldSizeDimensions: v })}
                placeholder="Size/Dim"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.AutoParts && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.auto_brand.${idx + 1}`}
                value={row.autoVehicleBrand}
                onChange={(v) => onChange({ autoVehicleBrand: v })}
                placeholder="Vehicle Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.auto_part.${idx + 1}`}
                value={row.autoPartName}
                onChange={(v) => onChange({ autoPartName: v })}
                placeholder="Part Name"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.auto_part_no.${idx + 1}`}
                value={row.autoPartNo}
                onChange={(v) => onChange({ autoPartNo: v })}
                placeholder="Part No"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Hardware && (
          <Cell>
            <SmallInput
              data-ocid={`bulk_entry.hw_sku.${idx + 1}`}
              value={row.hwSku}
              onChange={(v) => onChange({ hwSku: v })}
              placeholder="SKU"
            />
          </Cell>
        )}

        {shopType === ShopType.Restaurant && (
          <Cell>
            <SmallSelect
              data-ocid={`bulk_entry.rest_category.${idx + 1}`}
              value={row.restCategory}
              onChange={(v) =>
                onChange({ restCategory: v as RestaurantCategory })
              }
              options={Object.values(RestaurantCategory).map((c) => ({
                label: c,
                value: c,
              }))}
            />
          </Cell>
        )}

        {shopType === ShopType.Salon && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.salon_service.${idx + 1}`}
                value={row.salonServiceName}
                onChange={(v) => onChange({ salonServiceName: v })}
                placeholder="Service"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.salon_duration.${idx + 1}`}
                type="number"
                value={row.salonDuration}
                onChange={(v) => onChange({ salonDuration: v })}
                placeholder="min"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Stationery && (
          <>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.stat_sub_type.${idx + 1}`}
                value={row.statSubType}
                onChange={(v) =>
                  onChange({ statSubType: v as StationerySubType })
                }
                options={Object.values(StationerySubType).map((t) => ({
                  label: t,
                  value: t,
                }))}
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.stat_book_class.${idx + 1}`}
                value={row.statBookClass}
                onChange={(v) => onChange({ statBookClass: v })}
                placeholder="Class (e.g. 5)"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.stat_book_subject.${idx + 1}`}
                value={row.statBookSubject}
                onChange={(v) => onChange({ statBookSubject: v })}
                placeholder="Subject"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.stat_pen_brand.${idx + 1}`}
                value={row.statPenBrand}
                onChange={(v) => onChange({ statPenBrand: v })}
                placeholder="Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.stat_pen_color.${idx + 1}`}
                value={row.statPenColor}
                onChange={(v) => onChange({ statPenColor: v })}
                placeholder="Color"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.AgroProducts && (
          <>
            <Cell error={errors.agroProductType}>
              <SmallSelect
                data-ocid={`bulk_entry.agro_product_type.${idx + 1}`}
                value={row.agroProductType}
                onChange={(v) => onChange({ agroProductType: v })}
                options={[
                  "Seeds",
                  "Fertilizer",
                  "Pesticide",
                  "Farming Tools",
                  "Animal Feed",
                  "Crop Protection",
                ].map((t) => ({ label: t, value: t }))}
                hasError={!!errors.agroProductType}
              />
            </Cell>
            <Cell error={errors.agroBrand}>
              <SmallInput
                data-ocid={`bulk_entry.agro_brand.${idx + 1}`}
                value={row.agroBrand}
                onChange={(v) => onChange({ agroBrand: v })}
                placeholder="Brand"
                hasError={!!errors.agroBrand}
              />
            </Cell>
            <Cell error={errors.agroCropType}>
              <SmallInput
                data-ocid={`bulk_entry.agro_crop_type.${idx + 1}`}
                value={row.agroCropType}
                onChange={(v) => onChange({ agroCropType: v })}
                placeholder="e.g. Wheat"
                hasError={!!errors.agroCropType}
              />
            </Cell>
            <Cell error={errors.agroWeight}>
              <SmallInput
                data-ocid={`bulk_entry.agro_weight.${idx + 1}`}
                type="number"
                value={row.agroWeight}
                onChange={(v) => onChange({ agroWeight: v })}
                placeholder="e.g. 10"
                hasError={!!errors.agroWeight}
              />
            </Cell>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.agro_unit.${idx + 1}`}
                value={row.agroWeightUnit}
                onChange={(v) => onChange({ agroWeightUnit: v, unit: v })}
                options={["kg", "grams", "liters", "pieces", "bags"].map(
                  (u) => ({ label: u, value: u }),
                )}
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.agro_batch.${idx + 1}`}
                value={row.agroBatchNumber}
                onChange={(v) => onChange({ agroBatchNumber: v })}
                placeholder="Batch No"
              />
            </Cell>
          </>
        )}

        {shopType === ShopType.Electrical && (
          <>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_category.${idx + 1}`}
                value={row.elecItemCategory}
                onChange={(v) => onChange({ elecItemCategory: v })}
                placeholder="Switch / Cable…"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_brand.${idx + 1}`}
                value={row.elecBrandElec}
                onChange={(v) => onChange({ elecBrandElec: v })}
                placeholder="Brand"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_model.${idx + 1}`}
                value={row.elecModel2}
                onChange={(v) => onChange({ elecModel2: v })}
                placeholder="Model"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_ampere.${idx + 1}`}
                value={row.elecAmpere}
                onChange={(v) => onChange({ elecAmpere: v })}
                placeholder="e.g. 6A"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_wattage.${idx + 1}`}
                value={row.elecWattage}
                onChange={(v) => onChange({ elecWattage: v })}
                placeholder="e.g. 60W"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.elec_voltage.${idx + 1}`}
                value={row.elecVoltage}
                onChange={(v) => onChange({ elecVoltage: v })}
                placeholder="e.g. 230V"
              />
            </Cell>
          </>
        )}

        {((shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE ||
          (shopType as string) === (ShopType.FruitsVegetables as string)) && (
          <>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.fv_product_type.${idx + 1}`}
                value={row.fvProductType}
                onChange={(v) => onChange({ fvProductType: v })}
                options={[
                  "Fruit",
                  "Vegetable",
                  "Herb",
                  "Dry Fruit",
                  "Other",
                ].map((t) => ({ label: t, value: t }))}
              />
            </Cell>
            <Cell error={errors.fvVariety}>
              <SmallInput
                data-ocid={`bulk_entry.fv_variety.${idx + 1}`}
                value={row.fvVariety}
                onChange={(v) => onChange({ fvVariety: v })}
                placeholder="e.g. Mango, Tomato"
                hasError={!!errors.fvVariety}
              />
            </Cell>
            <Cell error={errors.fvUnit}>
              <SmallSelect
                data-ocid={`bulk_entry.fv_unit.${idx + 1}`}
                value={row.fvUnit}
                onChange={(v) => onChange({ fvUnit: v, unit: v })}
                options={[
                  "kg",
                  "gram",
                  "dozen",
                  "piece",
                  "bundle",
                  "box",
                  "tray",
                ].map((u) => ({ label: u, value: u }))}
                hasError={!!errors.fvUnit}
              />
            </Cell>
            <Cell>
              <SmallSelect
                data-ocid={`bulk_entry.fv_season.${idx + 1}`}
                value={row.fvSeasonalTag}
                onChange={(v) => onChange({ fvSeasonalTag: v })}
                options={["All-Season", "Summer", "Winter", "Monsoon"].map(
                  (s) => ({ label: s, value: s }),
                )}
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.fv_origin.${idx + 1}`}
                value={row.fvOriginSource}
                onChange={(v) => onChange({ fvOriginSource: v })}
                placeholder="Origin/Source"
              />
            </Cell>
            <Cell>
              <SmallInput
                data-ocid={`bulk_entry.fv_freshness.${idx + 1}`}
                type="date"
                value={row.fvFreshnessDate}
                onChange={(v) => onChange({ fvFreshnessDate: v })}
              />
            </Cell>
          </>
        )}

        {/* Actions */}
        <td className="px-2 py-1.5 align-top" style={{ minWidth: 80 }}>
          <div className="flex items-center gap-1 pt-0.5">
            <button
              type="button"
              data-ocid={`bulk_entry.copy_button.${idx + 1}`}
              onClick={onCopy}
              title="Copy row"
              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              data-ocid={`bulk_entry.delete_button.${idx + 1}`}
              onClick={onRemove}
              title="Remove row"
              className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Error summary for this row */}
      {isFailed && saveResult?.error && (
        <tr>
          <td colSpan={99} className="px-4 py-1 bg-destructive/5">
            <p className="text-xs text-destructive">
              Row {idx + 1}: {saveResult.error}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Extra-column headers by shop type ────────────────────────────────────────

function getExtraHeaders(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
): string[] {
  // Cast to string so switch works for both enum values and frontend-only constants
  // (BuildingMaterial and FruitsVegetables are now identical strings in both)
  const st = shopType as string;
  switch (st) {
    case ShopType.Mobile:
      return [
        "Sub-Type",
        "IMEI/Serial",
        "Brand",
        "Model",
        "Storage",
        "RAM",
        "Processor",
        "Display",
        "Accessory",
        "Compatibility",
        "Color",
        "Warranty",
      ];
    case ShopType.Electronics:
      return ["Brand", "Model"];
    case ShopType.Clothing:
      return ["Item", "Size", "Color", "Brand"];
    case ShopType.Footwear:
      return ["Brand", "Model", "Size"];
    case ShopType.Jewelry:
      return ["Metal", "Weight(g)", "Purity", "Making Charges"];
    case ShopType.Medical:
      return ["Company", "Batch No", "Composition", "Pack Type"];
    case BUILDING_MATERIAL_SHOP_TYPE: // "BuildingMaterial" - same as ShopType.BuildingMaterial
      return ["Material Type", "Brand", "Grade", "Size/Dim"];
    case ShopType.AutoParts:
      return ["Vehicle Brand", "Part Name", "Part No"];
    case ShopType.Hardware:
      return ["SKU"];
    case ShopType.Restaurant:
      return ["Category"];
    case ShopType.Salon:
      return ["Service", "Duration(min)"];
    case ShopType.Stationery:
      return [
        "Sub Type",
        "Book Class",
        "Book Subject",
        "Pen Brand",
        "Pen Color",
      ];
    case ShopType.AgroProducts:
      return [
        "Product Type",
        "Brand",
        "Crop Type",
        "Weight",
        "Unit",
        "Batch No",
      ];
    case FRUITS_VEGETABLES_SHOP_TYPE: // "FruitsVegetables" - same as ShopType.FruitsVegetables
      return [
        "Product Type",
        "Variety",
        "Unit",
        "Season",
        "Origin",
        "Best Before",
      ];
    case ShopType.Electrical:
      return ["Category", "Brand", "Model", "Ampere", "Wattage", "Voltage"];
    default:
      return [];
  }
}

// ─── Main BulkEntryPage ───────────────────────────────────────────────────────

export function BulkEntryPage() {
  const navigate = useNavigate();
  const { createProduct, getDefaultCharges, ready } = useApi();
  const shopConfig = useStore((s) => s.shopConfig);

  const shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE = useMemo(() => {
    const raw = (shopConfig?.shopType ?? ShopType.General) as string;
    // Build a set of all recognised shop-type strings. BuildingMaterial and
    // FruitsVegetables appear both as frontend constants and as ShopType enum
    // values — they are the same string so Set deduplication is fine.
    const knownValues = new Set<string>([
      ...Object.values(ShopType),
      BUILDING_MATERIAL_SHOP_TYPE,
      FRUITS_VEGETABLES_SHOP_TYPE,
    ]);
    if (!knownValues.has(raw)) {
      return ShopType.General;
    }
    return raw as
      | ShopType
      | typeof BUILDING_MATERIAL_SHOP_TYPE
      | typeof FRUITS_VEGETABLES_SHOP_TYPE;
  }, [shopConfig]);

  // For backend calls, BuildingMaterial maps to Hardware; FruitsVegetables maps to AgroProducts
  const backendShopType: ShopType = useMemo(() => {
    if (shopType === BUILDING_MATERIAL_SHOP_TYPE) return ShopType.Hardware;
    if ((shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE)
      return ShopType.AgroProducts;
    return shopType as ShopType;
  }, [shopType]);

  const defaultChargesLoaded = useRef(false);
  const [defaultTransport, setDefaultTransport] = useState("0");
  const [defaultLabour, setDefaultLabour] = useState("0");

  useEffect(() => {
    if (defaultChargesLoaded.current || !ready) return;
    defaultChargesLoaded.current = true;
    void getDefaultCharges().then((defaults) => {
      if (defaults) {
        const t = defaults.defaultTransportCharge ?? "0";
        const l = defaults.defaultLabourCharge ?? "0";
        setDefaultTransport(t);
        setDefaultLabour(l);
        setRows((prev) =>
          prev.map((r) => ({
            ...r,
            transportCost: t,
            labourCost: l,
          })),
        );
      }
    });
  }, [ready, getDefaultCharges]);

  const [rows, setRows] = useState<BulkRow[]>(() =>
    Array.from({ length: 5 }, () => defaultRow(shopType)),
  );
  const [rowErrors, setRowErrors] = useState<Record<string, RowErrors>>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveProgress, setSaveProgress] = useState(0);
  const [saveResults, setSaveResults] = useState<RowSaveResult[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showSuccessPanel, setShowSuccessPanel] = useState(false);
  const [sizeModalRowId, setSizeModalRowId] = useState<string | null>(null);

  const sizeModalRow = useMemo(
    () => rows.find((r) => r.id === sizeModalRowId) ?? null,
    [rows, sizeModalRowId],
  );

  const isSaving = saveStatus === "saving";

  const updateRow = useCallback((id: string, patch: Partial<BulkRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    // Clear errors for changed fields
    setRowErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev[id] };
      for (const k of Object.keys(patch)) delete next[k];
      return { ...prev, [id]: next };
    });
  }, []);

  const addRow = useCallback(() => {
    if (rows.length >= 20) {
      toast.warning("Maximum 20 rows allowed");
      return;
    }
    setRows((prev) => [
      ...prev,
      {
        ...defaultRow(shopType),
        transportCost: defaultTransport,
        labourCost: defaultLabour,
      },
    ]);
  }, [rows.length, shopType, defaultTransport, defaultLabour]);

  const removeRow = useCallback((id: string) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((r) => r.id !== id);
    });
    setRowErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const copyRow = useCallback(
    (id: string) => {
      if (rows.length >= 20) {
        toast.warning("Maximum 20 rows allowed");
        return;
      }
      setRows((prev) => {
        const idx = prev.findIndex((r) => r.id === id);
        if (idx < 0) return prev;
        const clone: BulkRow = { ...prev[idx], id: makeRowId() };
        const next = [...prev];
        next.splice(idx + 1, 0, clone);
        return next;
      });
    },
    [rows.length],
  );

  const clearAll = useCallback(() => {
    setRows(
      Array.from({ length: 5 }, () => ({
        ...defaultRow(shopType),
        transportCost: defaultTransport,
        labourCost: defaultLabour,
      })),
    );
    setRowErrors({});
    setSaveResults([]);
    setShowSuccessPanel(false);
    setSaveStatus("idle");
    setSaveProgress(0);
  }, [shopType, defaultTransport, defaultLabour]);

  const handleSaveAll = useCallback(async () => {
    if (!ready) {
      toast.error("Not connected. Please wait.");
      return;
    }

    // Validate all rows
    const newErrors: Record<string, RowErrors> = {};
    let hasErrors = false;
    for (const row of rows) {
      const errs = validateRow(shopType, row, rows);
      if (Object.keys(errs).length > 0) {
        newErrors[row.id] = errs;
        hasErrors = true;
      }
    }
    setRowErrors(newErrors);

    if (hasErrors) {
      toast.error("Please fix the errors in highlighted rows");
      return;
    }

    setSaveStatus("saving");
    setSaveProgress(0);
    setSaveResults([]);

    const results: RowSaveResult[] = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      setSaveProgress(i + 1);
      toast.loading(`Saving ${i + 1} of ${rows.length}…`, { id: "bulk-save" });
      try {
        const input = buildCreateInput(
          shopType,
          row,
          backendShopType,
          shopConfig?.shopName ?? "",
        );
        await createProduct(input);
        results.push({ rowIdx: i, success: true });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        results.push({ rowIdx: i, success: false, error: msg });
      }
    }

    toast.dismiss("bulk-save");
    setSaveResults(results);
    setSaveStatus("done");

    const succeeded = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    if (failed === 0) {
      toast.success(`${succeeded} product${succeeded !== 1 ? "s" : ""} saved!`);
      setShowSuccessPanel(true);
    } else {
      toast.warning(`${succeeded} saved, ${failed} failed — check rows below`);
    }
  }, [rows, shopType, backendShopType, ready, createProduct, shopConfig]);

  const extraHeaders = getExtraHeaders(shopType);

  const successCount = saveResults.filter((r) => r.success).length;
  const failCount = saveResults.filter((r) => !r.success).length;

  const shopTypeName = shopConfig?.shopName ?? "Shop";
  const currencySymbol = getCurrencyConfig(
    shopConfig?.currency ?? "INR",
  ).symbol;

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4 flex items-center gap-4 flex-wrap">
        <button
          type="button"
          data-ocid="bulk_entry.back_button"
          onClick={() => navigate({ to: "/products" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Products</span>
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Package className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Bulk Entry
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {shopTypeName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {rows.length} / 20 rows
          </Badge>

          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="bulk_entry.clear_all_button"
            onClick={() => setShowClearDialog(true)}
            disabled={isSaving}
            className="h-8 gap-1.5 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="bulk_entry.add_row_button"
            onClick={addRow}
            disabled={isSaving || rows.length >= 20}
            className="h-8 gap-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Row
          </Button>

          <Button
            type="button"
            size="sm"
            data-ocid="bulk_entry.save_all_button"
            onClick={() => void handleSaveAll()}
            disabled={isSaving || !ready}
            className="h-8 gap-1.5 text-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving {saveProgress}/{rows.length}…
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save All
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Panel */}
      {showSuccessPanel && saveStatus === "done" && (
        <div
          data-ocid="bulk_entry.success_state"
          className="mx-4 md:mx-6 mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 flex-wrap"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-foreground flex-1">
            {successCount} product{successCount !== 1 ? "s" : ""} saved
            successfully!
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-ocid="bulk_entry.clear_after_save_button"
              onClick={clearAll}
              className="h-7 text-xs"
            >
              Add More
            </Button>
            <Button
              type="button"
              size="sm"
              data-ocid="bulk_entry.go_to_products_button"
              onClick={() => navigate({ to: "/products" })}
              className="h-7 text-xs"
            >
              View Products
            </Button>
          </div>
        </div>
      )}

      {/* Partial failure summary */}
      {saveStatus === "done" && failCount > 0 && (
        <div
          data-ocid="bulk_entry.error_state"
          className="mx-4 md:mx-6 mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20"
        >
          <p className="text-sm text-destructive font-medium">
            {failCount} row{failCount !== 1 ? "s" : ""} failed to save. Edit and
            retry.
          </p>
        </div>
      )}

      {/* Tips bar */}
      <div className="mx-4 md:mx-6 mt-4 p-3 rounded-lg bg-muted/40 border border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Tip:</strong> Fill rows below — Cost Price is auto-calculated
          (Purchase + Transport + Labour + Other). Click <strong>Size</strong>{" "}
          cell to pick from size options. Use <strong>Copy</strong> (⧉) to
          duplicate a row.
        </p>
      </div>

      {/* Table */}
      <div className="mx-4 md:mx-6 mt-4 mb-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table
          className="w-full text-sm border-collapse"
          style={{ minWidth: 900 }}
        >
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground w-12">
                #
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 160 }}
              >
                Name
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 130 }}
              >
                Barcode
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 110 }}
              >
                Category
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 80 }}
              >
                Unit
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 110 }}
              >
                Purchase {currencySymbol}
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 90 }}
              >
                Transport
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 90 }}
              >
                Labour
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 90 }}
              >
                Other
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground bg-muted/50"
                style={{ minWidth: 90 }}
              >
                Cost {currencySymbol}
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 100 }}
              >
                Retail {currencySymbol} *
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 100 }}
              >
                Wholesale {currencySymbol}
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 80 }}
              >
                Stock
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 80 }}
              >
                Min Stock
              </th>
              <th
                className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                style={{ minWidth: 120 }}
              >
                {shopType === ShopType.Medical ? "Expiry *" : "Expiry"}
              </th>
              {extraHeaders.map((h) => (
                <th
                  key={h}
                  className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground"
                  style={{ minWidth: 110 }}
                >
                  {h}
                </th>
              ))}
              <th className="px-2 py-2.5 text-left text-xs font-semibold text-muted-foreground w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <BulkRow
                key={row.id}
                row={row}
                idx={idx}
                shopType={shopType}
                errors={rowErrors[row.id] ?? {}}
                onChange={(patch) => updateRow(row.id, patch)}
                onRemove={() => removeRow(row.id)}
                onCopy={() => copyRow(row.id)}
                saveResult={saveResults.find((r) => r.rowIdx === idx)}
                onOpenSizeModal={() => setSizeModalRowId(row.id)}
              />
            ))}
          </tbody>
        </table>

        {/* Add row inline */}
        <div className="px-4 py-3 border-t border-border bg-muted/10">
          <button
            type="button"
            data-ocid="bulk_entry.add_row_inline_button"
            onClick={addRow}
            disabled={isSaving || rows.length >= 20}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            Add row ({rows.length}/20)
          </button>
        </div>
      </div>

      {/* Clear All Confirmation */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent data-ocid="bulk_entry.clear_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all rows?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset the form to 5 blank rows. Any unsaved data will be
              lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="bulk_entry.clear_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="bulk_entry.clear_confirm_button"
              onClick={() => {
                clearAll();
                setShowClearDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Page-level Size Modal — rendered outside table to avoid invalid DOM nesting */}
      {sizeModalRow && (
        <SizeModal
          open={sizeModalRowId !== null}
          onClose={() => setSizeModalRowId(null)}
          shopType={shopType}
          row={sizeModalRow}
          onSelect={(size, gender) => {
            if (shopType === ShopType.Clothing) {
              updateRow(sizeModalRow.id, {
                clothSize: size,
                ...(gender ? { clothGender: gender } : {}),
              });
            } else {
              updateRow(sizeModalRow.id, {
                footSize: size,
                ...(gender ? { footGender: gender } : {}),
              });
            }
            setSizeModalRowId(null);
          }}
        />
      )}
    </div>
  );
}
