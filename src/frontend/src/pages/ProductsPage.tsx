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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Barcode,
  Camera,
  ChevronDown,
  ClipboardList,
  Edit2,
  GitCompare,
  Minus,
  MoreVertical,
  Package,
  Plus,
  RefreshCw,
  ScanLine,
  Search,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Supplier, SupplierPurchaseWithName } from "../backend.d";
import { RestaurantQuickMenuModal } from "../components/RestaurantQuickMenuModal";
import { useApi } from "../lib/api";
import { formatCurrency, getCurrencyConfig } from "../lib/currency";
import { useStore } from "../lib/store";
import {
  BUILDING_MATERIAL_SHOP_TYPE,
  type ElectricalFields,
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
  ElectronicsFields,
  EngineFields,
  FootwearFields,
  FruitsVegetablesFields,
  GeneralFields,
  GroceryFields,
  HardwareFields,
  JewelryFields,
  MedicalFields,
  MetalRates,
  MobileFields,
  ProductView,
  RestaurantFields,
  SalonFields,
  StationeryFields,
  UpdateProductInput,
} from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = "name" | "stock" | "price";
type SortDir = "asc" | "desc";

type FormErrors = Record<string, string>;

type ProductFormState = {
  name: string;
  barcode: string; // permanent barcode — scan or manual
  supplierId: string; // selected supplier for this stock entry
  category: string;
  unit: string;
  retailPrice: string;
  wholesalePrice: string;
  costPrice: string; // purchasePrice — what you paid for the product
  transportCost: string; // transport/freight cost
  labourCost: string; // labour/installation cost
  stock: string;
  minStock: string;
  // Engine-specific — Mobile
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
  elecBrand: string;
  elecModel: string;
  elecSerial: string;
  elecWarranty: string;
  medName: string;
  medCompany: string;
  medBatch: string;
  medExpiry: string;
  medComposition: string;
  medPackType: PackType;
  medControlled: boolean;
  clothBrand: string;
  clothItem: string;
  clothSize: string;
  clothColor: string;
  clothGender: string; // Under Garment gender: "Man" | "Woman" | "Children" | ""
  footBrand: string;
  footModel: string;
  footSize: string;
  footSizeSystem: SizeSystem;
  footGender: string; // Footwear gender: "Man" | "Woman" | "Children" | ""
  footColor: string;
  grocUnit: string;
  grocDecimal: boolean;
  statSubType: StationerySubType;
  statBookClass: string;
  statBookSubject: string;
  statBookMedium: string;
  statNbSize: string;
  statNbPages: string;
  statPenBrand: string;
  statPenColor: string;
  statOtherName: string;
  statOtherDesc: string;
  restName: string;
  restCategory: RestaurantCategory;
  restUnit: string;
  autoVehicleBrand: string;
  autoVehicleModel: string;
  autoPartName: string;
  autoPartNo: string;
  hwSku: string;
  hwCategory: string;
  jwMetal: Metal;
  jwWeightGrams: string;
  jwPurity: string;
  jwMakingCharges: string;
  jwMetalRate: string;
  salonServiceName: string;
  salonDuration: string;
  salonStaff: string;
  genName: string;
  genCategory: string;
  genUnit: string;
  // Building Material fields
  bldMaterialType: string;
  bldBrand: string;
  bldGrade: string;
  bldSizeDimensions: string;
  bldWeight: string;
  bldColor: string;
  // Agro Products fields
  agroProductType: string;
  agroBrand: string;
  agroCropType: string;
  agroWeight: string;
  agroWeightUnit: string;
  agroBatchNumber: string;
  // Fruits & Vegetables fields
  fvProductType: string; // Fruit | Vegetable | Herb | Dry Fruit | Other
  fvVariety: string;
  fvUnit: string;
  fvSeasonalTag: string;
  fvOriginSource: string;
  fvFreshnessDate: string;
  fvBatchNumber: string;
  // Shared optional expiry date (all shop types except Medical use this)
  expiryDate: string;
  // Electrical shop fields
  elecItemCategory: string;
  elecBrandName: string;
  elecAmpRating: string;
  elecAmpCustom: string;
  elecVoltage: string;
  elecVoltageCustom: string;
  elecWattage: string;
  elecWattageCustom: string;
  elecWireGauge: string;
  elecWireGaugeCustom: string;
  elecUnit: string;
  elecColor: string;
  elecIsiCertified: boolean;
  elecPartModel: string;
  elecBatchNumber: string;
};

// ─── Auto-unit defaults ────────────────────────────────────────────────────────

function defaultUnit(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
): string {
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) return "PCS";
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) return "kg";
  const map: Partial<Record<ShopType, string>> = {
    [ShopType.Mobile]: "NOS",
    [ShopType.Electronics]: "NOS",
    [ShopType.Electrical]: "Piece",
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
  };
  return map[shopType as ShopType] ?? "PCS";
}

// ─── Auto-name generator ──────────────────────────────────────────────────────

function generateAutoName(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  form: ProductFormState,
): string {
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    return [form.fvVariety, form.fvProductType, form.fvUnit, form.fvSeasonalTag]
      .filter(Boolean)
      .join(" ");
  }
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    return [
      form.bldBrand,
      form.bldMaterialType,
      form.bldGrade,
      form.bldSizeDimensions,
    ]
      .filter(Boolean)
      .join(" ");
  }
  switch (shopType) {
    case ShopType.Mobile: {
      const mc = form.mobileCategory || "Mobile";
      if (mc === "Laptop") {
        return [
          form.mobileBrand,
          form.mobileModel,
          form.mobileProcessor,
          form.mobileRam,
          form.mobileStorage,
          form.mobileDisplaySize,
        ]
          .filter(Boolean)
          .join(" ");
      }
      if (mc === "Tablet") {
        return [
          form.mobileBrand,
          form.mobileModel,
          form.mobileStorage,
          form.mobileDisplaySize,
        ]
          .filter(Boolean)
          .join(" ");
      }
      if (mc === "Accessories") {
        return [
          form.mobileBrand,
          form.mobileAccessoryType,
          form.mobileCompatibility,
          form.mobileColor,
        ]
          .filter(Boolean)
          .join(" ");
      }
      // Default: Mobile (phone)
      return [
        form.mobileBrand,
        form.mobileModel,
        form.mobileStorage,
        form.mobileRam,
        form.mobileColor,
      ]
        .filter(Boolean)
        .join(" ");
    }
    case ShopType.Electronics:
      return [form.elecBrand, form.elecModel].filter(Boolean).join(" ");
    case ShopType.Clothing:
      return [form.clothBrand, form.clothItem, form.clothColor, form.clothSize]
        .filter(Boolean)
        .join(" ");
    case ShopType.Footwear:
      return [
        form.footBrand,
        form.footModel,
        form.footSize ? `${form.footSize} (${form.footSizeSystem})` : "",
      ]
        .filter(Boolean)
        .join(" ");
    case ShopType.Stationery:
      switch (form.statSubType) {
        case StationerySubType.Book:
          return [
            "Book",
            form.statBookClass && `Class ${form.statBookClass}`,
            form.statBookSubject,
          ]
            .filter(Boolean)
            .join(" – ");
        case StationerySubType.Notebook:
          return [
            "Notebook",
            form.statNbSize,
            form.statNbPages && `${form.statNbPages} Pages`,
          ]
            .filter(Boolean)
            .join(" – ");
        case StationerySubType.Pen:
          return [form.statPenBrand, form.statPenColor, "Pen"]
            .filter(Boolean)
            .join(" ");
        default:
          return form.statOtherName;
      }
    case ShopType.AutoParts:
      return [form.autoVehicleBrand, form.autoPartName]
        .filter(Boolean)
        .join(" – ");
    case ShopType.Medical:
      return [form.medName, form.medCompany].filter(Boolean).join(" - ");
    case ShopType.Grocery:
      return form.name;
    case ShopType.Restaurant:
      return form.restName ? `${form.restName} (${form.restCategory})` : "";
    case ShopType.Hardware:
      return form.hwSku ? `${form.name} [${form.hwSku}]` : form.name;
    case ShopType.Jewelry:
      // Only generate auto-name when weight is entered.
      // If weight is empty/zero, return "" so the name field stays blank and
      // the useEffect guard (!computedAutoName) prevents overwriting user input.
      // Do NOT include form.name — circular dependency causes React error #185.
      return form.jwWeightGrams && Number(form.jwWeightGrams) > 0
        ? [form.jwMetal, `${form.jwWeightGrams}g`].filter(Boolean).join(" ")
        : "";
    case ShopType.Salon:
      return form.salonServiceName
        ? `${form.salonServiceName} (${form.salonDuration}min)`
        : "";
    case ShopType.General:
      return form.genName || form.name;
    case ShopType.AgroProducts:
      return [
        form.agroCropType,
        form.agroProductType,
        form.agroBrand,
        form.agroWeight ? `${form.agroWeight}${form.agroWeightUnit}` : "",
      ]
        .filter(Boolean)
        .join(" ");
    case ShopType.Electrical: {
      const amp =
        form.elecAmpRating === "Custom"
          ? form.elecAmpCustom
          : form.elecAmpRating !== "N/A"
            ? form.elecAmpRating
            : "";
      const watt =
        form.elecWattage === "Custom"
          ? form.elecWattageCustom
          : form.elecWattage !== "N/A"
            ? form.elecWattage
            : "";
      const gauge =
        form.elecWireGauge === "Custom"
          ? form.elecWireGaugeCustom
          : form.elecWireGauge !== "N/A"
            ? form.elecWireGauge
            : "";
      const color = form.elecColor !== "N/A" ? form.elecColor : "";
      return [
        form.elecBrandName,
        amp || watt,
        form.elecItemCategory,
        gauge,
        color,
        form.elecUnit !== "Piece" ? form.elecUnit : "",
      ]
        .filter(Boolean)
        .join(" ");
    }
    default:
      return "";
  }
}

// ─── Build EngineFields ───────────────────────────────────────────────────────

function buildEngineFields(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  form: ProductFormState,
): EngineFields {
  // Helper: convert optional expiry date to Motoko optional format
  const optExpiry = (date: string): [] | [string] => (date ? [date] : []);

  // FruitsVegetables — frontend-only type, sends FruitsVegetables EngineFields variant
  if (shopType === FRUITS_VEGETABLES_SHOP_TYPE) {
    const f: FruitsVegetablesFields = {
      productType: form.fvProductType || "Fruit",
      variety: form.fvVariety,
      unit: form.fvUnit || "kg",
      seasonalTag: form.fvSeasonalTag || "All-Season",
      originSource: form.fvOriginSource,
      freshnessDate: form.fvFreshnessDate,
      batchNumber: form.fvBatchNumber,
    };
    return {
      __kind__: "FruitsVegetables",
      FruitsVegetables: f,
    } as unknown as EngineFields;
  }

  // BuildingMaterial — dedicated backend variant with all 6 required fields
  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    const f = {
      brand: form.bldBrand,
      material_type: form.bldMaterialType,
      grade: form.bldGrade,
      size_dimensions: form.bldSizeDimensions,
      weight: form.bldWeight,
      color: form.bldColor,
      expiryDate: optExpiry(form.expiryDate),
    } as unknown as BuildingMaterialFields;
    return {
      __kind__: "BuildingMaterial",
      BuildingMaterial: f,
    } as unknown as EngineFields;
  }
  switch (shopType) {
    case ShopType.Mobile: {
      const f = {
        mobileCategory: form.mobileCategory || "Mobile",
        brand: form.mobileBrand,
        model: form.mobileModel,
        imei: form.mobileCategory === "Mobile" ? form.mobileImei : "",
        color: form.mobileColor,
        storage: form.mobileStorage,
        ram: form.mobileRam,
        processor: form.mobileProcessor,
        displaySize: form.mobileDisplaySize,
        accessoryType: form.mobileAccessoryType,
        compatibility: form.mobileCompatibility,
        warrantyMonths: BigInt(Number(form.mobileWarrantyMonths) || 0),
        serialNumber: form.mobileSerialNumber,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as MobileFields;
      return { __kind__: "Mobile", Mobile: f } as unknown as EngineFields;
    }
    case ShopType.Electronics: {
      const f = {
        brand: form.elecBrand,
        model: form.elecModel,
        serialNo: form.elecSerial,
        warrantyMonths: BigInt(Number(form.elecWarranty) || 0),
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as ElectronicsFields;
      return {
        __kind__: "Electronics",
        Electronics: f,
      } as unknown as EngineFields;
    }
    case ShopType.Medical: {
      const f: MedicalFields = {
        company: form.medCompany,
        batchNo: form.medBatch,
        expiryDate: form.medExpiry,
        composition: form.medComposition,
        packType: form.medPackType,
        isControlled: form.medControlled,
      };
      return { __kind__: "Medical", Medical: f } as unknown as EngineFields;
    }
    case ShopType.Clothing: {
      const f = {
        brand: form.clothBrand,
        itemName: form.clothItem,
        size: form.clothSize,
        color: form.clothColor,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as ClothingFields;
      return { __kind__: "Clothing", Clothing: f } as unknown as EngineFields;
    }
    case ShopType.Footwear: {
      const f = {
        brand: form.footBrand,
        model: form.footModel,
        size: form.footSize,
        sizeSystem: form.footSizeSystem,
        color: form.footColor,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as FootwearFields;
      return { __kind__: "Footwear", Footwear: f } as unknown as EngineFields;
    }
    case ShopType.Grocery: {
      const f = {
        decimalQtyEnabled: form.grocDecimal,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as GroceryFields;
      return { __kind__: "Grocery", Grocery: f } as unknown as EngineFields;
    }
    case ShopType.Stationery: {
      const f = {
        subType: form.statSubType,
        bookClass: form.statBookClass,
        bookSubject: form.statBookSubject,
        bookMedium: form.statBookMedium,
        notebookSize: form.statNbSize,
        notebookPages: BigInt(Number(form.statNbPages) || 0),
        penBrand: form.statPenBrand,
        penColor: form.statPenColor,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as StationeryFields;
      return {
        __kind__: "Stationery",
        Stationery: f,
      } as unknown as EngineFields;
    }
    case ShopType.Restaurant: {
      const f = {
        category: form.restCategory,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as RestaurantFields;
      return {
        __kind__: "Restaurant",
        Restaurant: f,
      } as unknown as EngineFields;
    }
    case ShopType.AutoParts: {
      const f = {
        vehicleBrand: form.autoVehicleBrand,
        vehicleModel: form.autoVehicleModel,
        partName: form.autoPartName,
        partNo: form.autoPartNo,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as AutoPartsFields;
      return { __kind__: "AutoParts", AutoParts: f } as unknown as EngineFields;
    }
    case ShopType.Hardware: {
      const f = {
        sku: form.hwSku,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as HardwareFields;
      return { __kind__: "Hardware", Hardware: f } as unknown as EngineFields;
    }
    case ShopType.Jewelry: {
      const weightGrams = Number.parseFloat(form.jwWeightGrams) || 0;
      const makingCharges = Number.parseFloat(form.jwMakingCharges) || 0;
      const metalRate = Number.parseFloat(form.jwMetalRate) || 0;
      // Fix 5: always coerce purity to string with fallback to prevent undefined
      const purity = (form.jwPurity ?? "").trim() || "22K";
      const f: JewelryFields = {
        metal: form.jwMetal ?? Metal.Gold,
        weightGrams,
        purity,
        makingCharges,
        metalRate,
        // expiryDate is optional string; use undefined (not null/empty) when absent
        expiryDate: form.expiryDate ? form.expiryDate : undefined,
      };
      return { __kind__: "Jewelry", Jewelry: f } as unknown as EngineFields;
    }
    case ShopType.Salon: {
      const f = {
        duration: BigInt(Number(form.salonDuration) || 0),
        staffName: form.salonStaff,
        expiryDate: optExpiry(form.expiryDate),
      } as unknown as SalonFields;
      return { __kind__: "Salon", Salon: f } as unknown as EngineFields;
    }
    case ShopType.Electrical: {
      const ampValue =
        form.elecAmpRating === "Custom"
          ? form.elecAmpCustom
          : form.elecAmpRating;
      const voltValue =
        form.elecVoltage === "Custom"
          ? form.elecVoltageCustom
          : form.elecVoltage;
      const wattValue =
        form.elecWattage === "Custom"
          ? form.elecWattageCustom
          : form.elecWattage;
      const gaugeValue =
        form.elecWireGauge === "Custom"
          ? form.elecWireGaugeCustom
          : form.elecWireGauge;
      const f: ElectricalFields = {
        itemCategory: form.elecItemCategory,
        brand: form.elecBrandName,
        model: form.elecPartModel,
        ampereRating: ampValue,
        voltageRating: voltValue,
        wattage: wattValue,
        wireGauge: gaugeValue,
        lengthUnit: form.elecUnit,
        color: form.elecColor,
        isiCertified: form.elecIsiCertified,
        batchNumber: form.elecBatchNumber,
        expiryDate: form.expiryDate || undefined,
      };
      return {
        __kind__: "Electrical",
        Electrical: f,
      } as unknown as EngineFields;
    }
    case ShopType.AgroProducts: {
      const f: AgroProductsFields = {
        productType: form.agroProductType,
        brand: form.agroBrand,
        cropType: form.agroCropType,
        weight: Number(form.agroWeight) || 0,
        weightUnit: form.agroWeightUnit || "kg",
        expiryDate: form.expiryDate || undefined,
        batchNumber: form.agroBatchNumber || undefined,
      };
      return {
        __kind__: "AgroProducts",
        AgroProducts: f,
      } as unknown as EngineFields;
    }
    default:
      return {
        __kind__: "General",
        General: {
          expiryDate: optExpiry(form.expiryDate),
        } as unknown as GeneralFields,
      } as unknown as EngineFields;
  }
}

// ─── Extract form state from existing product ─────────────────────────────────

function extractFormFromProduct(
  product: ProductView,
): Partial<ProductFormState> {
  const base: Partial<ProductFormState> = {
    name: product.name,
    barcode: (product as ProductView & { barcode?: string }).barcode ?? "",
    supplierId: "",
    category: product.category,
    unit: product.unit,
    retailPrice: String(product.retailPrice),
    wholesalePrice: String(product.wholesalePrice),
    costPrice: String(product.costPrice),
    transportCost:
      product.transportCost != null ? String(product.transportCost) : "0",
    labourCost: product.labourCost != null ? String(product.labourCost) : "0",
    stock: String(product.stock),
    minStock: String(product.minStock),
    expiryDate: "",
  };

  // Helper: read optional expiry from engine fields ([] | [string] pattern)
  function readOptExpiry(val: unknown): string {
    if (Array.isArray(val) && val.length > 0) return val[0] as string;
    return "";
  }

  const ef = product.engineFields;
  if (ef.__kind__ === "Mobile") {
    const m = ef.Mobile as MobileFields & { expiryDate?: [] | [string] };
    Object.assign(base, {
      mobileCategory:
        (m as unknown as Record<string, string>).mobileCategory || "Mobile",
      mobileImei: m.imei,
      mobileBrand: m.brand,
      mobileModel: m.model,
      mobileColor: m.color,
      mobileStorage: m.storage,
      mobileRam: (m as unknown as Record<string, string>).ram || "",
      mobileProcessor: (m as unknown as Record<string, string>).processor || "",
      mobileDisplaySize:
        (m as unknown as Record<string, string>).displaySize || "",
      mobileAccessoryType:
        (m as unknown as Record<string, string>).accessoryType || "",
      mobileCompatibility:
        (m as unknown as Record<string, string>).compatibility || "",
      mobileWarrantyMonths:
        m.warrantyMonths != null ? String(m.warrantyMonths) : "12",
      mobileSerialNumber:
        (m as unknown as Record<string, string>).serialNumber || "",
      expiryDate: readOptExpiry(m.expiryDate),
    });
  } else if (ef.__kind__ === "Electronics") {
    const e = ef.Electronics as ElectronicsFields & {
      expiryDate?: [] | [string];
    };
    Object.assign(base, {
      elecBrand: e.brand,
      elecModel: e.model,
      elecSerial: e.serialNo,
      elecWarranty: String(e.warrantyMonths),
      expiryDate: readOptExpiry(e.expiryDate),
    });
  } else if (ef.__kind__ === "Medical") {
    const m = ef.Medical;
    Object.assign(base, {
      medName: product.name,
      medCompany: m.company,
      medBatch: m.batchNo,
      medExpiry: m.expiryDate,
      medComposition: m.composition,
      medPackType: m.packType,
      medControlled: m.isControlled,
    });
  } else if (ef.__kind__ === "Clothing") {
    const c = ef.Clothing as ClothingFields & { expiryDate?: [] | [string] };
    // Detect stored gender from itemName like "Under Garment - Woman"
    const extractedGender = (() => {
      const lower = (c.itemName ?? "").toLowerCase();
      if (lower.startsWith("under garment - man")) return "Man";
      if (lower.startsWith("under garment - woman")) return "Woman";
      if (lower.startsWith("under garment - children")) return "Children";
      return "";
    })();
    Object.assign(base, {
      clothBrand: c.brand,
      clothItem: c.itemName,
      clothSize: c.size,
      clothColor: c.color,
      clothGender: extractedGender,
      expiryDate: readOptExpiry(c.expiryDate),
    });
  } else if (ef.__kind__ === "Footwear") {
    const f = ef.Footwear as FootwearFields & { expiryDate?: [] | [string] };
    // Auto-detect gender from stored size by matching against known size arrays
    const detectedFootGender = (() => {
      const s = f.size ?? "";
      if (FOOTWEAR_SIZES.Man.includes(s)) return "Man";
      if (FOOTWEAR_SIZES.Woman.includes(s)) return "Woman";
      if (FOOTWEAR_SIZES.Children.includes(s)) return "Children";
      return "";
    })();
    Object.assign(base, {
      footBrand: f.brand,
      footModel: f.model,
      footSize: f.size,
      footSizeSystem: f.sizeSystem,
      footColor: f.color,
      footGender: detectedFootGender,
      expiryDate: readOptExpiry(f.expiryDate),
    });
  } else if (ef.__kind__ === "Grocery") {
    const g = ef.Grocery as GroceryFields & { expiryDate?: [] | [string] };
    Object.assign(base, {
      grocDecimal: g.decimalQtyEnabled,
      expiryDate: readOptExpiry(g.expiryDate),
    });
  } else if (ef.__kind__ === "Stationery") {
    const s = ef.Stationery as StationeryFields & {
      expiryDate?: [] | [string];
    };
    Object.assign(base, {
      statSubType: s.subType,
      statBookClass: s.bookClass,
      statBookSubject: s.bookSubject,
      statBookMedium: s.bookMedium,
      statNbSize: s.notebookSize,
      statNbPages: String(s.notebookPages),
      statPenBrand: s.penBrand,
      statPenColor: s.penColor,
      expiryDate: readOptExpiry(s.expiryDate),
    });
  } else if (ef.__kind__ === "Restaurant") {
    const r = ef.Restaurant as RestaurantFields & {
      expiryDate?: [] | [string];
    };
    Object.assign(base, {
      restName: product.name,
      restCategory: r.category,
      expiryDate: readOptExpiry(r.expiryDate),
    });
  } else if (ef.__kind__ === "AutoParts") {
    const a = ef.AutoParts as AutoPartsFields & { expiryDate?: [] | [string] };
    Object.assign(base, {
      autoVehicleBrand: a.vehicleBrand,
      autoVehicleModel: a.vehicleModel,
      autoPartName: a.partName,
      autoPartNo: a.partNo,
      expiryDate: readOptExpiry(a.expiryDate),
    });
  } else if (ef.__kind__ === "Hardware") {
    const h = ef.Hardware as HardwareFields & { expiryDate?: [] | [string] };
    Object.assign(base, {
      hwSku: h.sku,
      expiryDate: readOptExpiry(h.expiryDate),
    });
  } else if (ef.__kind__ === "Jewelry") {
    const j = ef.Jewelry as JewelryFields;
    // Fix 1: always ensure expiryDate is a string (never undefined/null)
    // Fix 2: always store numeric jewelry fields as strings via String() to
    //   prevent number-vs-string coercion mismatch that triggers re-renders
    Object.assign(base, {
      jwMetal: j.metal ?? Metal.Gold,
      jwWeightGrams: j.weightGrams != null ? String(j.weightGrams) : "",
      jwPurity: j.purity != null ? String(j.purity) : "22K",
      jwMakingCharges: j.makingCharges != null ? String(j.makingCharges) : "",
      jwMetalRate: j.metalRate != null ? String(j.metalRate) : "",
      expiryDate: j.expiryDate != null ? String(j.expiryDate) : "",
    });
  } else if (ef.__kind__ === "Salon") {
    const s = ef.Salon as SalonFields & { expiryDate?: [] | [string] };
    Object.assign(base, {
      salonServiceName: product.name,
      salonDuration: String(s.duration),
      salonStaff: s.staffName,
      expiryDate: readOptExpiry(s.expiryDate),
    });
  } else if (ef.__kind__ === "General") {
    const g = ef.General as { expiryDate?: [] | [string] } | null;
    Object.assign(base, {
      expiryDate: readOptExpiry(g?.expiryDate),
    });
  } else if (ef.__kind__ === "AgroProducts") {
    const a = ef.AgroProducts as AgroProductsFields;
    Object.assign(base, {
      agroProductType: a.productType,
      agroBrand: a.brand,
      agroCropType: a.cropType,
      agroWeight: a.weight != null ? String(a.weight) : "",
      agroWeightUnit: a.weightUnit || "kg",
      agroBatchNumber: a.batchNumber ?? "",
      expiryDate: a.expiryDate ?? "",
    });
  } else if (ef.__kind__ === "Electrical") {
    const e = ef.Electrical as ElectricalFields;
    Object.assign(base, {
      elecItemCategory: e.itemCategory || "",
      elecBrandName: e.brand || "",
      elecAmpRating: e.ampereRating || "N/A",
      elecAmpCustom: "",
      elecVoltage: e.voltageRating || "230V",
      elecVoltageCustom: "",
      elecWattage: e.wattage || "N/A",
      elecWattageCustom: "",
      elecWireGauge: e.wireGauge || "N/A",
      elecWireGaugeCustom: "",
      elecUnit: e.lengthUnit || "Piece",
      elecColor: e.color || "N/A",
      elecIsiCertified: e.isiCertified || false,
      elecPartModel: e.model || "",
      elecBatchNumber: e.batchNumber || "",
      expiryDate: e.expiryDate || "",
    });
  } else if (ef.__kind__ === "BuildingMaterial") {
    const b = ef.BuildingMaterial as typeof ef.BuildingMaterial & {
      expiryDate?: [] | [string];
    };
    Object.assign(base, {
      bldBrand: b.brand,
      bldMaterialType: b.material_type,
      bldGrade: b.grade,
      bldSizeDimensions: b.size_dimensions,
      bldWeight: b.weight,
      bldColor: b.color,
      expiryDate: readOptExpiry(b.expiryDate),
    });
  } else if (
    (ef as unknown as { __kind__: string }).__kind__ === "FruitsVegetables"
  ) {
    const fv = (ef as unknown as { FruitsVegetables: FruitsVegetablesFields })
      .FruitsVegetables;
    Object.assign(base, {
      fvProductType: fv.productType,
      fvVariety: fv.variety,
      fvUnit: fv.unit,
      fvSeasonalTag: fv.seasonalTag,
      fvOriginSource: fv.originSource,
      fvFreshnessDate: fv.freshnessDate ?? "",
      fvBatchNumber: fv.batchNumber ?? "",
    });
  }
  return base;
}

// ─── Initial form state ────────────────────────────────────────────────────────

function initialForm(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
): ProductFormState {
  return {
    name: "",
    barcode: "",
    supplierId: "",
    category: "",
    unit: defaultUnit(shopType),
    retailPrice: "",
    wholesalePrice: "",
    costPrice: "",
    transportCost: "0",
    labourCost: "0",
    stock: "0",
    minStock: "5",
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
    elecSerial: "",
    elecWarranty: "12",
    medName: "",
    medCompany: "",
    medBatch: "",
    medExpiry: "",
    medComposition: "",
    medPackType: PackType.Strip,
    medControlled: false,
    clothBrand: "",
    clothItem: "",
    clothSize: "M",
    clothColor: "",
    clothGender: "",
    footBrand: "",
    footModel: "",
    footSize: "",
    footSizeSystem: SizeSystem.UK,
    footGender: "",
    footColor: "",
    grocUnit: "KG",
    grocDecimal: true,
    statSubType: StationerySubType.Book,
    statBookClass: "",
    statBookSubject: "",
    statBookMedium: "",
    statNbSize: "A4",
    statNbPages: "",
    statPenBrand: "",
    statPenColor: "",
    statOtherName: "",
    statOtherDesc: "",
    restName: "",
    restCategory: RestaurantCategory.Veg,
    restUnit: "Plate",
    autoVehicleBrand: "",
    autoVehicleModel: "",
    autoPartName: "",
    autoPartNo: "",
    hwSku: "",
    hwCategory: "",
    jwMetal: Metal.Gold,
    jwWeightGrams: "",
    jwPurity: "22K",
    jwMakingCharges: "",
    jwMetalRate: "",
    salonServiceName: "",
    salonDuration: "30",
    salonStaff: "",
    genName: "",
    genCategory: "",
    genUnit: defaultUnit(shopType),
    bldMaterialType: "",
    bldBrand: "",
    bldGrade: "",
    bldSizeDimensions: "",
    bldWeight: "",
    bldColor: "",
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
    expiryDate: "",
    elecItemCategory: "",
    elecBrandName: "",
    elecAmpRating: "N/A",
    elecAmpCustom: "",
    elecVoltage: "230V",
    elecVoltageCustom: "",
    elecWattage: "N/A",
    elecWattageCustom: "",
    elecWireGauge: "N/A",
    elecWireGaugeCustom: "",
    elecUnit: "Piece",
    elecColor: "N/A",
    elecIsiCertified: false,
    elecPartModel: "",
    elecBatchNumber: "",
  };
}

// ─── Field validators ─────────────────────────────────────────────────────────

function validateForm(
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE,
  form: ProductFormState,
): FormErrors {
  const errs: FormErrors = {};
  if (!form.retailPrice || Number(form.retailPrice) < 0)
    errs.retailPrice = "Retail price is required";
  if (Number(form.costPrice) < 0)
    errs.costPrice = "Cost price cannot be negative";
  if (Number(form.stock) < 0) errs.stock = "Stock cannot be negative";
  if (Number(form.minStock) < 0) errs.minStock = "Min stock cannot be negative";

  if (shopType === BUILDING_MATERIAL_SHOP_TYPE) {
    if (!form.bldMaterialType)
      errs.bldMaterialType = "Material type is required";
  }
  if (shopType === ShopType.Mobile) {
    // IMEI validation only for Mobile (phone) category
    if (form.mobileCategory === "Mobile" || !form.mobileCategory) {
      if (!form.mobileImei) errs.mobileImei = "IMEI is required";
      else if (!/^\d{15}$/.test(form.mobileImei))
        errs.mobileImei = "IMEI must be exactly 15 digits";
    }
  }
  if (shopType === ShopType.Medical) {
    if (!form.medExpiry)
      errs.medExpiry = "Expiry date is required for medicines";
  }
  if (shopType === ShopType.Clothing) {
    if (!form.clothGender)
      errs.clothGender = "Please select a type (Man/Woman/Children)";
    else if (!form.clothSize) errs.clothSize = "Size is required";
  }
  if (shopType === ShopType.Footwear) {
    if (!form.footGender)
      errs.footGender = "Please select a type (Man/Woman/Children)";
    else if (!form.footSize) errs.footSize = "Size is required";
  }
  if (shopType === ShopType.Jewelry) {
    if (form.jwWeightGrams && Number(form.jwWeightGrams) <= 0)
      errs.jwWeightGrams = "Weight must be a positive number";
  }
  if (shopType === ShopType.AgroProducts) {
    if (!form.agroProductType)
      errs.agroProductType = "Product type is required";
    if (!form.agroBrand) errs.agroBrand = "Brand is required";
    if (!form.agroCropType) errs.agroCropType = "Crop type is required";
    if (!form.agroWeight || Number(form.agroWeight) <= 0)
      errs.agroWeight = "Weight is required";
  }
  if ((shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE) {
    if (!form.fvVariety) errs.fvVariety = "Variety is required";
    if (!form.fvUnit) errs.fvUnit = "Unit is required";
  }
  if (shopType === ShopType.Electrical) {
    if (!form.elecItemCategory)
      errs.elecItemCategory = "Item category is required";
    if (!form.elecBrandName) errs.elecBrandName = "Brand is required";
  }
  return errs;
}

// ─── Near-expiry check ────────────────────────────────────────────────────────

function isNearExpiry(expiryDate: string, thresholdDays = 90): boolean {
  if (!expiryDate) return false;
  const exp = new Date(expiryDate);
  const now = new Date();
  const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= thresholdDays;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fieldRow({
  label,
  error,
  children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared Optional Expiry Date Field ───────────────────────────────────────

function OptionalExpiryField({
  value,
  onChange,
  thresholdDays,
}: {
  value: string;
  onChange: (v: string) => void;
  thresholdDays?: number;
}) {
  const threshold = thresholdDays ?? 90;
  const nearExpiry = value ? isNearExpiry(value, threshold) : false;
  const urgencyColor = (() => {
    if (!value) return "";
    const diff =
      (new Date(value).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (diff <= 7) return "border-red-400";
    if (diff <= 30) return "border-orange-400";
    return "border-yellow-400";
  })();

  return fieldRow({
    label: "Expiry Date (Optional)",
    children: (
      <div className="space-y-1">
        <Input
          data-ocid="product.expiry_date.input"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={nearExpiry ? urgencyColor : ""}
        />
        {nearExpiry && (
          <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
            ⚠ Near Expiry
          </Badge>
        )}
      </div>
    ),
  });
}

// ─── Engine Form Sections ─────────────────────────────────────────────────────

function MobileEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  const category = form.mobileCategory || "Mobile";

  const MOBILE_BRANDS = [
    "Samsung",
    "Apple",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "OnePlus",
    "Nokia",
    "Motorola",
    "Huawei",
    "Tecno",
    "Itel",
    "Other",
  ];
  const LAPTOP_BRANDS = [
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "MSI",
    "Samsung",
    "Toshiba",
    "Other",
  ];
  const TABLET_BRANDS = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Lenovo",
    "Huawei",
    "Amazon",
    "Other",
  ];
  const STORAGE_PHONE = [
    "16GB",
    "32GB",
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
    "Other",
  ];
  const STORAGE_LAPTOP = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "1TB HDD",
    "2TB HDD",
    "256GB+1TB",
    "Other",
  ];
  const STORAGE_TABLET = ["32GB", "64GB", "128GB", "256GB", "512GB", "Other"];
  const RAM_PHONE = [
    "2GB",
    "3GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "Other",
  ];
  const RAM_LAPTOP = ["4GB", "8GB", "16GB", "32GB", "64GB", "Other"];
  const RAM_TABLET = ["2GB", "3GB", "4GB", "6GB", "8GB", "Other"];
  const PROCESSORS = [
    "Intel i3",
    "Intel i5",
    "Intel i7",
    "Intel i9",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "Apple M1",
    "Apple M2",
    "Apple M3",
    "Celeron",
    "Pentium",
    "Other",
  ];
  const DISPLAY_LAPTOP = [
    "11 inch",
    "12 inch",
    "13 inch",
    "13.3 inch",
    "14 inch",
    "15.6 inch",
    "16 inch",
    "17 inch",
    "Other",
  ];
  const DISPLAY_TABLET = [
    "7 inch",
    "8 inch",
    "10 inch",
    "10.5 inch",
    "11 inch",
    "12.9 inch",
    "Other",
  ];
  const WARRANTY_OPTIONS = ["0", "3", "6", "12", "18", "24"];
  const ACCESSORY_TYPES = [
    "Charger",
    "Data Cable",
    "Headphone",
    "Earphone",
    "Earbuds",
    "Laptop Charger",
    "Power Bank",
    "Phone Cover/Case",
    "Screen Guard/Protector",
    "Smartwatch",
    "Keyboard",
    "Mouse",
    "USB Hub",
    "OTG Adapter",
    "Card Reader",
    "Webcam",
    "Speaker",
    "Selfie Stick",
    "Tripod",
    "Other",
  ];

  const brands =
    category === "Laptop"
      ? LAPTOP_BRANDS
      : category === "Tablet"
        ? TABLET_BRANDS
        : MOBILE_BRANDS;
  const storageOptions =
    category === "Laptop"
      ? STORAGE_LAPTOP
      : category === "Tablet"
        ? STORAGE_TABLET
        : STORAGE_PHONE;
  const ramOptions =
    category === "Laptop"
      ? RAM_LAPTOP
      : category === "Tablet"
        ? RAM_TABLET
        : RAM_PHONE;
  const displayOptions =
    category === "Laptop" ? DISPLAY_LAPTOP : DISPLAY_TABLET;

  const CATEGORIES = [
    { label: "📱 Mobile", value: "Mobile" },
    { label: "💻 Laptop", value: "Laptop" },
    { label: "📟 Tablet", value: "Tablet" },
    { label: "🎧 Accessories", value: "Accessories" },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Mobile Shop — Product Details
      </div>

      {/* Category Selector */}
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground font-medium">
          Category *
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.value}
              data-ocid={`product.mobile_category.${cat.value.toLowerCase()}`}
              onClick={() =>
                setForm({
                  mobileCategory: cat.value,
                  mobileImei: "",
                  mobileModel: "",
                  mobileStorage: "",
                  mobileRam: "",
                  mobileProcessor: "",
                  mobileDisplaySize: "",
                  mobileAccessoryType: "",
                  mobileCompatibility: "",
                  mobileSerialNumber: "",
                })
              }
              className={`py-2 text-xs font-semibold rounded-lg border-2 transition-all ${
                category === cat.value
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MOBILE (Phone) fields ── */}
      {category === "Mobile" && (
        <>
          {fieldRow({
            label: "IMEI (15 digits) *",
            error: errors.mobileImei,
            children: (
              <Input
                data-ocid="product.mobile_imei.input"
                maxLength={15}
                pattern="\d{15}"
                value={form.mobileImei}
                onChange={(e) =>
                  setForm({ mobileImei: e.target.value.replace(/\D/g, "") })
                }
                placeholder="e.g. 354879101234567"
                className={errors.mobileImei ? "border-destructive" : ""}
              />
            ),
          })}
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Brand",
              children: (
                <select
                  data-ocid="product.mobile_brand.select"
                  value={form.mobileBrand}
                  onChange={(e) => setForm({ mobileBrand: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Model *",
              children: (
                <Input
                  data-ocid="product.mobile_model.input"
                  value={form.mobileModel}
                  onChange={(e) => setForm({ mobileModel: e.target.value })}
                  placeholder="Galaxy S24"
                />
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Storage",
              children: (
                <select
                  data-ocid="product.mobile_storage.select"
                  value={form.mobileStorage}
                  onChange={(e) => setForm({ mobileStorage: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {storageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "RAM",
              children: (
                <select
                  data-ocid="product.mobile_ram.select"
                  value={form.mobileRam}
                  onChange={(e) => setForm({ mobileRam: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {ramOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Color",
              children: (
                <Input
                  data-ocid="product.mobile_color.input"
                  value={form.mobileColor}
                  onChange={(e) => setForm({ mobileColor: e.target.value })}
                  placeholder="Phantom Black"
                />
              ),
            })}
            {fieldRow({
              label: "Warranty (months)",
              children: (
                <div className="flex flex-wrap gap-1.5">
                  {WARRANTY_OPTIONS.map((w) => (
                    <button
                      type="button"
                      key={w}
                      data-ocid={`product.mobile_warranty.${w}`}
                      onClick={() => setForm({ mobileWarrantyMonths: w })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.mobileWarrantyMonths === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
              ),
            })}
          </div>
        </>
      )}

      {/* ── LAPTOP fields ── */}
      {category === "Laptop" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Brand",
              children: (
                <select
                  data-ocid="product.mobile_brand.select"
                  value={form.mobileBrand}
                  onChange={(e) => setForm({ mobileBrand: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Model *",
              children: (
                <Input
                  data-ocid="product.mobile_model.input"
                  value={form.mobileModel}
                  onChange={(e) => setForm({ mobileModel: e.target.value })}
                  placeholder="Pavilion 15"
                />
              ),
            })}
          </div>
          {fieldRow({
            label: "Processor",
            children: (
              <select
                data-ocid="product.mobile_processor.select"
                value={form.mobileProcessor}
                onChange={(e) => setForm({ mobileProcessor: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Processor</option>
                {PROCESSORS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            ),
          })}
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "RAM",
              children: (
                <select
                  data-ocid="product.mobile_ram.select"
                  value={form.mobileRam}
                  onChange={(e) => setForm({ mobileRam: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {ramOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Storage",
              children: (
                <select
                  data-ocid="product.mobile_storage.select"
                  value={form.mobileStorage}
                  onChange={(e) => setForm({ mobileStorage: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {storageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Display Size",
              children: (
                <select
                  data-ocid="product.mobile_display.select"
                  value={form.mobileDisplaySize}
                  onChange={(e) =>
                    setForm({ mobileDisplaySize: e.target.value })
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {displayOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Color",
              children: (
                <Input
                  data-ocid="product.mobile_color.input"
                  value={form.mobileColor}
                  onChange={(e) => setForm({ mobileColor: e.target.value })}
                  placeholder="Silver"
                />
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Serial Number (optional)",
              children: (
                <Input
                  data-ocid="product.mobile_serial.input"
                  value={form.mobileSerialNumber}
                  onChange={(e) =>
                    setForm({ mobileSerialNumber: e.target.value })
                  }
                  placeholder="SN-XXXXXXX"
                />
              ),
            })}
            {fieldRow({
              label: "Warranty (months)",
              children: (
                <div className="flex flex-wrap gap-1.5">
                  {WARRANTY_OPTIONS.map((w) => (
                    <button
                      type="button"
                      key={w}
                      data-ocid={`product.mobile_warranty.${w}`}
                      onClick={() => setForm({ mobileWarrantyMonths: w })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.mobileWarrantyMonths === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
              ),
            })}
          </div>
        </>
      )}

      {/* ── TABLET fields ── */}
      {category === "Tablet" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Brand",
              children: (
                <select
                  data-ocid="product.mobile_brand.select"
                  value={form.mobileBrand}
                  onChange={(e) => setForm({ mobileBrand: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Model *",
              children: (
                <Input
                  data-ocid="product.mobile_model.input"
                  value={form.mobileModel}
                  onChange={(e) => setForm({ mobileModel: e.target.value })}
                  placeholder="Tab A9"
                />
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Storage",
              children: (
                <select
                  data-ocid="product.mobile_storage.select"
                  value={form.mobileStorage}
                  onChange={(e) => setForm({ mobileStorage: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {storageOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "RAM",
              children: (
                <select
                  data-ocid="product.mobile_ram.select"
                  value={form.mobileRam}
                  onChange={(e) => setForm({ mobileRam: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {ramOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Display Size",
              children: (
                <select
                  data-ocid="product.mobile_display.select"
                  value={form.mobileDisplaySize}
                  onChange={(e) =>
                    setForm({ mobileDisplaySize: e.target.value })
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  {displayOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ),
            })}
            {fieldRow({
              label: "Color",
              children: (
                <Input
                  data-ocid="product.mobile_color.input"
                  value={form.mobileColor}
                  onChange={(e) => setForm({ mobileColor: e.target.value })}
                  placeholder="Gray"
                />
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Serial Number (optional)",
              children: (
                <Input
                  data-ocid="product.mobile_serial.input"
                  value={form.mobileSerialNumber}
                  onChange={(e) =>
                    setForm({ mobileSerialNumber: e.target.value })
                  }
                  placeholder="SN-XXXXXXX"
                />
              ),
            })}
            {fieldRow({
              label: "Warranty (months)",
              children: (
                <div className="flex flex-wrap gap-1.5">
                  {WARRANTY_OPTIONS.map((w) => (
                    <button
                      type="button"
                      key={w}
                      data-ocid={`product.mobile_warranty.${w}`}
                      onClick={() => setForm({ mobileWarrantyMonths: w })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.mobileWarrantyMonths === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
              ),
            })}
          </div>
        </>
      )}

      {/* ── ACCESSORIES fields ── */}
      {category === "Accessories" && (
        <>
          {fieldRow({
            label: "Accessory Type *",
            children: (
              <select
                data-ocid="product.mobile_accessory_type.select"
                value={form.mobileAccessoryType}
                onChange={(e) =>
                  setForm({ mobileAccessoryType: e.target.value })
                }
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Accessory Type</option>
                {ACCESSORY_TYPES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            ),
          })}
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Brand",
              children: (
                <Input
                  data-ocid="product.mobile_brand.input"
                  value={form.mobileBrand}
                  onChange={(e) => setForm({ mobileBrand: e.target.value })}
                  placeholder="BoAt, Anker, etc."
                />
              ),
            })}
            {fieldRow({
              label: "Compatibility",
              children: (
                <Input
                  data-ocid="product.mobile_compatibility.input"
                  value={form.mobileCompatibility}
                  onChange={(e) =>
                    setForm({ mobileCompatibility: e.target.value })
                  }
                  placeholder="e.g. Type-C, iPhone 14, Universal"
                />
              ),
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fieldRow({
              label: "Color (optional)",
              children: (
                <Input
                  data-ocid="product.mobile_color.input"
                  value={form.mobileColor}
                  onChange={(e) => setForm({ mobileColor: e.target.value })}
                  placeholder="Black"
                />
              ),
            })}
            {fieldRow({
              label: "Warranty (months)",
              children: (
                <div className="flex flex-wrap gap-1.5">
                  {["0", "3", "6", "12"].map((w) => (
                    <button
                      type="button"
                      key={w}
                      data-ocid={`product.mobile_warranty.${w}`}
                      onClick={() => setForm({ mobileWarrantyMonths: w })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.mobileWarrantyMonths === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
              ),
            })}
          </div>
        </>
      )}

      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function ElectronicsEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Electronics Details
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand",
          children: (
            <Input
              data-ocid="product.elec_brand.input"
              value={form.elecBrand}
              onChange={(e) => setForm({ elecBrand: e.target.value })}
              placeholder="Sony"
            />
          ),
        })}
        {fieldRow({
          label: "Model",
          children: (
            <Input
              data-ocid="product.elec_model.input"
              value={form.elecModel}
              onChange={(e) => setForm({ elecModel: e.target.value })}
              placeholder="WH-1000XM5"
            />
          ),
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Serial No (optional)",
          children: (
            <Input
              data-ocid="product.elec_serial.input"
              value={form.elecSerial}
              onChange={(e) => setForm({ elecSerial: e.target.value })}
              placeholder="SN-XXXXXX"
            />
          ),
        })}
        {fieldRow({
          label: "Warranty (months)",
          children: (
            <Input
              data-ocid="product.elec_warranty.input"
              type="number"
              min="0"
              value={form.elecWarranty}
              onChange={(e) => setForm({ elecWarranty: e.target.value })}
              placeholder="12"
            />
          ),
        })}
      </div>
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function MedicalEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  const nearExpiry = form.medExpiry ? isNearExpiry(form.medExpiry, 90) : false;
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Medicine Details
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Company / Manufacturer",
          children: (
            <Input
              data-ocid="product.med_company.input"
              value={form.medCompany}
              onChange={(e) => setForm({ medCompany: e.target.value })}
              placeholder="Cipla"
            />
          ),
        })}
        {fieldRow({
          label: "Batch No",
          children: (
            <Input
              data-ocid="product.med_batch.input"
              value={form.medBatch}
              onChange={(e) => setForm({ medBatch: e.target.value })}
              placeholder="BT-2024-001"
            />
          ),
        })}
      </div>
      <div>
        {fieldRow({
          label: "Expiry Date *",
          error: errors.medExpiry,
          children: (
            <div className="space-y-1">
              <Input
                data-ocid="product.med_expiry.input"
                type="date"
                value={form.medExpiry}
                onChange={(e) => setForm({ medExpiry: e.target.value })}
                className={
                  errors.medExpiry
                    ? "border-destructive"
                    : nearExpiry
                      ? "border-orange-400"
                      : ""
                }
              />
              {nearExpiry && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                  ⚠ Near Expiry — within 30 days
                </Badge>
              )}
            </div>
          ),
        })}
      </div>
      {fieldRow({
        label: "Composition",
        children: (
          <Input
            data-ocid="product.med_composition.input"
            value={form.medComposition}
            onChange={(e) => setForm({ medComposition: e.target.value })}
            placeholder="Paracetamol 500mg"
          />
        ),
      })}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Pack Type",
          children: (
            <select
              data-ocid="product.med_packtype.select"
              value={form.medPackType}
              onChange={(e) =>
                setForm({ medPackType: e.target.value as PackType })
              }
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {Object.values(PackType).map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          ),
        })}
        <div className="flex items-center gap-2 pt-6">
          <input
            data-ocid="product.med_controlled.checkbox"
            type="checkbox"
            id="medControlled"
            checked={form.medControlled}
            onChange={(e) => setForm({ medControlled: e.target.checked })}
            className="w-4 h-4 rounded border-input accent-primary"
          />
          <label htmlFor="medControlled" className="text-sm font-medium">
            Controlled Medicine
          </label>
        </div>
      </div>
    </div>
  );
}

// ── Clothing size logic ────────────────────────────────────────────────────────

// Sizes for Under Garment by gender
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

// Bottom-wear keywords → numeric waist sizes
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

// Returns size options based on clothing item type and gender
function getSizeOptionsForClothingItem(
  itemName: string,
  gender?: string,
): string[] {
  const lower = itemName.trim().toLowerCase();

  // Under Garment — gender-driven sizes
  if (lower.startsWith("under garment")) {
    if (gender && UNDER_GARMENT_SIZES[gender]) {
      return UNDER_GARMENT_SIZES[gender];
    }
    return []; // gender not selected yet
  }

  // Bottom-wear (Jeans/Trousers/Pants etc) — gender-driven waist/age sizes
  if (BOTTOM_WEAR_KEYWORDS.some((kw) => lower.includes(kw))) {
    if (gender === "Children") {
      return [
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
        "14Y",
        "16Y",
      ];
    }
    if (gender === "Woman") {
      return ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44"];
    }
    // Man or no gender yet — full waist range
    return BOTTOM_WEAR_SIZES;
  }

  // All other tops/apparel — alpha sizes driven by gender
  if (gender === "Children") {
    return [
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
      "14Y",
      "16Y",
    ];
  }
  // Man / Woman / no gender — alpha sizes
  return ALPHA_SIZES;
}

// Quick-select clothing item categories shown as chips in the form
const CLOTHING_ITEM_CATEGORIES = [
  { label: "T-Shirt", value: "T-Shirt" },
  { label: "Shirt", value: "Shirt" },
  { label: "Kurti", value: "Kurti" },
  { label: "Jeans", value: "Jeans" },
  { label: "Trousers", value: "Trousers" },
  { label: "Shorts", value: "Shorts" },
  { label: "Skirt", value: "Skirt" },
  { label: "Dress", value: "Dress" },
  { label: "Box Dress", value: "Box Dress" },
  { label: "Jacket", value: "Jacket" },
  { label: "Under Garment", value: "Under Garment" },
];

const CLOTHING_GENDERS = [
  { label: "\u{1F468} MAN", value: "Man" },
  { label: "\u{1F469} WOMAN", value: "Woman" },
  { label: "\u{1F466} CHILDREN", value: "Children" },
] as const;

function ClothingEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  const isUnderGarment = form.clothItem
    .toLowerCase()
    .startsWith("under garment");
  const isBottomWear = BOTTOM_WEAR_KEYWORDS.some((kw) =>
    form.clothItem.toLowerCase().includes(kw),
  );
  const gender = form.clothGender;

  // Size options always driven by item + gender
  const sizes = useMemo(
    () => getSizeOptionsForClothingItem(form.clothItem, gender),
    [form.clothItem, gender],
  );

  // When item changes, reset size (and gender only if switching away from Under Garment)
  const prevItemRef = useRef(form.clothItem);
  useEffect(() => {
    if (prevItemRef.current === form.clothItem) return;
    prevItemRef.current = form.clothItem;
    const patch: Partial<ProductFormState> = { clothSize: "" };
    // Reset gender when switching away from Under Garment
    if (!form.clothItem.toLowerCase().startsWith("under garment")) {
      patch.clothGender = "";
    }
    setForm(patch);
  }, [form.clothItem, setForm]);

  // When gender changes, reset size if no longer valid
  const prevGenderRef = useRef(gender);
  useEffect(() => {
    if (prevGenderRef.current === gender) return;
    prevGenderRef.current = gender;
    if (!gender) return;
    const newSizes = getSizeOptionsForClothingItem(form.clothItem, gender);
    if (form.clothSize && !newSizes.includes(form.clothSize)) {
      setForm({ clothSize: "" });
    }
  }, [gender, form.clothItem, form.clothSize, setForm]);

  // When user selects a quick-category chip
  const handleCategorySelect = (value: string) => {
    setForm({ clothItem: value, clothGender: "", clothSize: "" });
  };

  // Gender selection handler — for Under Garment encode gender into clothItem
  const handleGenderSelect = (g: string) => {
    if (isUnderGarment) {
      setForm({
        clothGender: g,
        clothItem: `Under Garment - ${g}`,
        clothSize: "",
      });
    } else {
      setForm({ clothGender: g, clothSize: "" });
    }
  };

  // Size label based on category + gender
  const sizeLabel = (() => {
    if (isUnderGarment) {
      if (gender === "Woman") return "Bra Size *";
      if (gender === "Children") return "Age / Year Size *";
      return "Size *";
    }
    if (isBottomWear) {
      if (gender === "Children") return "Age / Year Size *";
      return "Waist Size *";
    }
    if (gender === "Children") return "Age / Year Size *";
    return "Size *";
  })();

  const showSizes = gender !== "" && sizes.length > 0;

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Clothing Details
      </div>
      <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
        Each size+color combination is tracked separately as its own stock
      </p>

      {/* Brand */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand",
          children: (
            <Input
              data-ocid="product.cloth_brand.input"
              value={form.clothBrand}
              onChange={(e) => setForm({ clothBrand: e.target.value })}
              placeholder="Levi's"
            />
          ),
        })}
        {/* Item Name — free input */}
        {fieldRow({
          label: "Item Name",
          children: (
            <Input
              data-ocid="product.cloth_item.input"
              value={isUnderGarment ? "Under Garment" : form.clothItem}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ clothItem: val, clothGender: "", clothSize: "" });
              }}
              placeholder="e.g. Jeans, T-Shirt, Shirt, Kurti"
            />
          ),
        })}
      </div>

      {/* Quick-select category chips */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">
          Quick Select Category
        </Label>
        <div className="flex flex-wrap gap-1.5">
          {CLOTHING_ITEM_CATEGORIES.map((cat) => {
            const isActive = isUnderGarment
              ? cat.value === "Under Garment"
              : form.clothItem === cat.value;
            return (
              <button
                type="button"
                key={cat.value}
                data-ocid={`product.cloth_category.${cat.value.toLowerCase().replace(/\s+/g, "_")}`}
                onClick={() => handleCategorySelect(cat.value)}
                className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                  isActive
                    ? cat.value === "Under Garment"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAN / WOMAN / CHILDREN selector — shown for ALL categories */}
      <div
        className={`space-y-2 rounded-xl p-3 border ${
          isUnderGarment
            ? "bg-purple-50/60 border-purple-200"
            : "bg-indigo-50/60 border-indigo-200"
        }`}
      >
        <div
          className={`text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 ${
            isUnderGarment ? "text-purple-800" : "text-indigo-800"
          }`}
        >
          <span>{isUnderGarment ? "\uD83D\uDC55" : "\uD83D\uDC57"}</span>
          {isUnderGarment
            ? "Under Garment — Select Type"
            : "Clothing — Select Type"}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CLOTHING_GENDERS.map(({ label, value }) => (
            <button
              type="button"
              key={value}
              data-ocid={`product.cloth_gender.${value.toLowerCase()}`}
              onClick={() => handleGenderSelect(value)}
              className={`py-2.5 text-sm font-semibold rounded-lg border-2 transition-all ${
                gender === value
                  ? isUnderGarment
                    ? "bg-purple-600 text-white border-purple-600 shadow-md scale-[1.03]"
                    : "bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.03]"
                  : isUnderGarment
                    ? "border-purple-300 bg-white text-purple-800 hover:bg-purple-100"
                    : "border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {!gender && (
          <p
            className={`text-xs flex items-center gap-1 mt-1 ${
              isUnderGarment ? "text-purple-600" : "text-indigo-600"
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            Please select a type to see available sizes
          </p>
        )}
      </div>

      {/* Size Selector — shown after gender selected */}
      {showSizes && (
        <div className="grid grid-cols-2 gap-3">
          {fieldRow({
            label: sizeLabel,
            error: errors.clothSize,
            children: (
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      data-ocid={`product.cloth_size.${s.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                      onClick={() => setForm({ clothSize: s })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.clothSize === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-2 space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Custom Size:
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      data-ocid="product.cloth_size_custom.input"
                      value={
                        sizes.includes(form.clothSize) ? "" : form.clothSize
                      }
                      onChange={(e) => setForm({ clothSize: e.target.value })}
                      placeholder="Enter custom size..."
                      className="text-xs"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                    />
                    <button
                      type="button"
                      data-ocid="product.cloth_size_custom_add.button"
                      disabled={
                        !!(sizes.includes(form.clothSize)
                          ? ""
                          : form.clothSize) === false
                      }
                      onClick={() => {
                        const val = (
                          sizes.includes(form.clothSize) ? "" : form.clothSize
                        ).trim();
                        if (val) setForm({ clothSize: val });
                      }}
                      className="px-3 py-1 text-xs rounded-md border font-medium border-primary text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ),
          })}
          {fieldRow({
            label: "Color",
            children: (
              <Input
                data-ocid="product.cloth_color.input"
                value={form.clothColor}
                onChange={(e) => setForm({ clothColor: e.target.value })}
                placeholder="Blue"
              />
            ),
          })}
        </div>
      )}

      {/* Color standalone when gender not selected yet */}
      {!gender && (
        <div>
          {fieldRow({
            label: "Color",
            children: (
              <Input
                data-ocid="product.cloth_color.input"
                value={form.clothColor}
                onChange={(e) => setForm({ clothColor: e.target.value })}
                placeholder="Blue"
              />
            ),
          })}
        </div>
      )}

      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

// ── Footwear size logic ────────────────────────────────────────────────────────

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

const FOOTWEAR_GENDERS = [
  { label: "👨 MAN", value: "Man" },
  { label: "👩 WOMAN", value: "Woman" },
  { label: "👦 CHILDREN", value: "Children" },
] as const;

function getSizeOptionsForFootwear(gender: string): string[] {
  if (gender && FOOTWEAR_SIZES[gender]) return FOOTWEAR_SIZES[gender];
  return [];
}

function FootwearEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  const gender = form.footGender;
  const sizes = useMemo(() => getSizeOptionsForFootwear(gender), [gender]);

  // Reset size when gender changes and old size is no longer valid
  const prevGenderRef = useRef(gender);
  useEffect(() => {
    if (prevGenderRef.current === gender) return;
    prevGenderRef.current = gender;
    if (!gender) return;
    const newSizes = FOOTWEAR_SIZES[gender] ?? [];
    if (form.footSize && !newSizes.includes(form.footSize)) {
      setForm({ footSize: "" });
    }
  }, [gender, form.footSize, setForm]);

  const handleGenderSelect = (g: string) => {
    setForm({ footGender: g, footSize: "" });
  };

  const showSizes = !!gender && sizes.length > 0;

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Footwear Details
      </div>

      {/* Brand & Model */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand",
          children: (
            <Input
              data-ocid="product.foot_brand.input"
              value={form.footBrand}
              onChange={(e) => setForm({ footBrand: e.target.value })}
              placeholder="Nike"
            />
          ),
        })}
        {fieldRow({
          label: "Model",
          children: (
            <Input
              data-ocid="product.foot_model.input"
              value={form.footModel}
              onChange={(e) => setForm({ footModel: e.target.value })}
              placeholder="Air Max 90"
            />
          ),
        })}
      </div>

      {/* Gender Selector */}
      <div className="space-y-2 bg-indigo-50/60 border border-indigo-200 rounded-xl p-3">
        <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wide flex items-center gap-1.5">
          <span>👟</span> Footwear — Select Type
        </div>
        <div className="grid grid-cols-3 gap-2">
          {FOOTWEAR_GENDERS.map(({ label, value }) => (
            <button
              type="button"
              key={value}
              data-ocid={`product.foot_gender.${value.toLowerCase()}`}
              onClick={() => handleGenderSelect(value)}
              className={`py-2.5 text-sm font-semibold rounded-lg border-2 transition-all ${
                gender === value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.03]"
                  : "border-indigo-300 bg-white text-indigo-800 hover:bg-indigo-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {!gender && (
          <p className="text-xs text-indigo-600 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            Please select a type to see available sizes
          </p>
        )}
        {errors.footGender && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.footGender}
          </p>
        )}
      </div>

      {/* Size Selector — shown after gender selected */}
      {showSizes && (
        <div className="space-y-3">
          {fieldRow({
            label: gender === "Children" ? "Age / Year Size *" : "UK Size *",
            error: errors.footSize,
            children: (
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      data-ocid={`product.foot_size.${s.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`}
                      onClick={() => setForm({ footSize: s })}
                      className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                        form.footSize === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input bg-background hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Input
                  data-ocid="product.foot_size_custom.input"
                  value={sizes.includes(form.footSize) ? "" : form.footSize}
                  onChange={(e) => setForm({ footSize: e.target.value })}
                  placeholder="Custom size..."
                />
              </div>
            ),
          })}
        </div>
      )}

      {/* Size System + Color — shown after gender */}
      {gender && (
        <div className="grid grid-cols-2 gap-3">
          {fieldRow({
            label: "Size System",
            children: (
              <div className="flex gap-1 mt-1">
                {Object.values(SizeSystem).map((ss) => (
                  <button
                    type="button"
                    key={ss}
                    data-ocid={`product.foot_sizesystem.${ss.toLowerCase()}`}
                    onClick={() => setForm({ footSizeSystem: ss })}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.footSizeSystem === ss ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`}
                  >
                    {ss}
                  </button>
                ))}
              </div>
            ),
          })}
          {fieldRow({
            label: "Color",
            children: (
              <Input
                data-ocid="product.foot_color.input"
                value={form.footColor}
                onChange={(e) => setForm({ footColor: e.target.value })}
                placeholder="White"
              />
            ),
          })}
        </div>
      )}

      {/* Color standalone when gender not selected yet */}
      {!gender && (
        <div>
          {fieldRow({
            label: "Color",
            children: (
              <Input
                data-ocid="product.foot_color.input"
                value={form.footColor}
                onChange={(e) => setForm({ footColor: e.target.value })}
                placeholder="White"
              />
            ),
          })}
        </div>
      )}

      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function GroceryEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  const units = ["KG", "GM", "Litre", "ML", "PCS", "Dozen"];
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Grocery Details
      </div>
      {fieldRow({
        label: "Default Unit",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {units.map((u) => (
              <button
                type="button"
                key={u}
                data-ocid={`product.groc_unit.${u.toLowerCase()}`}
                onClick={() => setForm({ grocUnit: u, unit: u })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.grocUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`}
              >
                {u}
              </button>
            ))}
          </div>
        ),
      })}
      <div className="flex items-center gap-2">
        <input
          data-ocid="product.groc_decimal.checkbox"
          type="checkbox"
          id="grocDecimal"
          checked={form.grocDecimal}
          onChange={(e) => setForm({ grocDecimal: e.target.checked })}
          className="w-4 h-4 rounded border-input accent-primary"
        />
        <label htmlFor="grocDecimal" className="text-sm text-muted-foreground">
          Allow decimal quantities (e.g. 0.5 KG)
        </label>
      </div>
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function StationeryEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Stationery Details
      </div>
      {fieldRow({
        label: "Sub Type",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {Object.values(StationerySubType).map((st) => (
              <button
                type="button"
                key={st}
                data-ocid={`product.stat_subtype.${st.toLowerCase()}`}
                onClick={() => setForm({ statSubType: st })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.statSubType === st ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`}
              >
                {st}
              </button>
            ))}
          </div>
        ),
      })}
      {form.statSubType === StationerySubType.Book && (
        <div className="grid grid-cols-3 gap-3">
          {fieldRow({
            label: "Class",
            children: (
              <Input
                data-ocid="product.stat_class.input"
                value={form.statBookClass}
                onChange={(e) => setForm({ statBookClass: e.target.value })}
                placeholder="6"
              />
            ),
          })}
          {fieldRow({
            label: "Subject",
            children: (
              <Input
                data-ocid="product.stat_subject.input"
                value={form.statBookSubject}
                onChange={(e) => setForm({ statBookSubject: e.target.value })}
                placeholder="English"
              />
            ),
          })}
          {fieldRow({
            label: "Medium",
            children: (
              <Input
                data-ocid="product.stat_medium.input"
                value={form.statBookMedium}
                onChange={(e) => setForm({ statBookMedium: e.target.value })}
                placeholder="Hindi"
              />
            ),
          })}
        </div>
      )}
      {form.statSubType === StationerySubType.Notebook && (
        <div className="grid grid-cols-2 gap-3">
          {fieldRow({
            label: "Size",
            children: (
              <Input
                data-ocid="product.stat_nbsize.input"
                value={form.statNbSize}
                onChange={(e) => setForm({ statNbSize: e.target.value })}
                placeholder="A4"
              />
            ),
          })}
          {fieldRow({
            label: "Pages",
            children: (
              <Input
                data-ocid="product.stat_nbpages.input"
                type="number"
                min="0"
                value={form.statNbPages}
                onChange={(e) => setForm({ statNbPages: e.target.value })}
                placeholder="200"
              />
            ),
          })}
        </div>
      )}
      {form.statSubType === StationerySubType.Pen && (
        <div className="grid grid-cols-2 gap-3">
          {fieldRow({
            label: "Brand",
            children: (
              <Input
                data-ocid="product.stat_penbrand.input"
                value={form.statPenBrand}
                onChange={(e) => setForm({ statPenBrand: e.target.value })}
                placeholder="Cello"
              />
            ),
          })}
          {fieldRow({
            label: "Color",
            children: (
              <Input
                data-ocid="product.stat_pencolor.input"
                value={form.statPenColor}
                onChange={(e) => setForm({ statPenColor: e.target.value })}
                placeholder="Blue"
              />
            ),
          })}
        </div>
      )}
      {(form.statSubType === StationerySubType.File ||
        form.statSubType === StationerySubType.Other) && (
        <div className="space-y-3">
          {fieldRow({
            label: "Item Name",
            children: (
              <Input
                data-ocid="product.stat_othername.input"
                value={form.statOtherName}
                onChange={(e) => setForm({ statOtherName: e.target.value })}
                placeholder="A4 Document File"
              />
            ),
          })}
          {fieldRow({
            label: "Description",
            children: (
              <Input
                data-ocid="product.stat_otherdesc.input"
                value={form.statOtherDesc}
                onChange={(e) => setForm({ statOtherDesc: e.target.value })}
                placeholder="Optional description"
              />
            ),
          })}
        </div>
      )}
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function RestaurantEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  const units = ["Plate", "Bowl", "Glass", "Half", "Full", "PCS"];
  const catStyles: Record<RestaurantCategory, string> = {
    [RestaurantCategory.Veg]: "bg-green-100 text-green-800 border-green-300",
    [RestaurantCategory.NonVeg]: "bg-red-100 text-red-800 border-red-300",
    [RestaurantCategory.Vegan]:
      "bg-yellow-100 text-yellow-800 border-yellow-300",
  };
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Menu Details
      </div>
      {fieldRow({
        label: "Category",
        children: (
          <div className="flex gap-2">
            {Object.values(RestaurantCategory).map((rc) => (
              <button
                type="button"
                key={rc}
                data-ocid={`product.rest_category.${rc.toLowerCase()}`}
                onClick={() => setForm({ restCategory: rc })}
                className={`flex-1 py-2 text-xs font-semibold rounded-md border transition-colors ${form.restCategory === rc ? catStyles[rc] : "border-input bg-background hover:bg-muted"}`}
              >
                {rc === RestaurantCategory.NonVeg ? "Non-Veg" : rc}
              </button>
            ))}
          </div>
        ),
      })}
      {fieldRow({
        label: "Serving Unit",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {units.map((u) => (
              <button
                type="button"
                key={u}
                data-ocid={`product.rest_unit.${u.toLowerCase()}`}
                onClick={() => setForm({ restUnit: u, unit: u })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${form.restUnit === u ? "bg-primary text-primary-foreground border-primary" : "border-input bg-background hover:bg-muted"}`}
              >
                {u}
              </button>
            ))}
          </div>
        ),
      })}
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function AutoPartsEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Auto Parts Details
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Vehicle Brand",
          children: (
            <Input
              data-ocid="product.auto_vbrand.input"
              value={form.autoVehicleBrand}
              onChange={(e) => setForm({ autoVehicleBrand: e.target.value })}
              placeholder="Hero"
            />
          ),
        })}
        {fieldRow({
          label: "Vehicle Model",
          children: (
            <Input
              data-ocid="product.auto_vmodel.input"
              value={form.autoVehicleModel}
              onChange={(e) => setForm({ autoVehicleModel: e.target.value })}
              placeholder="Splendor"
            />
          ),
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Part Name",
          children: (
            <Input
              data-ocid="product.auto_partname.input"
              value={form.autoPartName}
              onChange={(e) => setForm({ autoPartName: e.target.value })}
              placeholder="Brake Shoe"
            />
          ),
        })}
        {fieldRow({
          label: "Part No (optional)",
          children: (
            <Input
              data-ocid="product.auto_partno.input"
              value={form.autoPartNo}
              onChange={(e) => setForm({ autoPartNo: e.target.value })}
              placeholder="HS-BRK-001"
            />
          ),
        })}
      </div>
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function HardwareEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Hardware Details
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "SKU",
          children: (
            <Input
              data-ocid="product.hw_sku.input"
              value={form.hwSku}
              onChange={(e) => setForm({ hwSku: e.target.value })}
              placeholder="HW-001"
            />
          ),
        })}
        {fieldRow({
          label: "Category",
          children: (
            <Input
              data-ocid="product.hw_category.input"
              value={form.hwCategory}
              onChange={(e) => setForm({ hwCategory: e.target.value })}
              placeholder="Fasteners"
            />
          ),
        })}
      </div>
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function JewelryEngineForm({
  form,
  setForm,
  errors,
  currencySymbol,
  metalRates,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
  currencySymbol: string;
  metalRates: MetalRates | null;
}) {
  const weightNum = Number(form.jwWeightGrams) || 0;
  const rateNum = Number(form.jwMetalRate) || 0;
  const makingNum = Number(form.jwMakingCharges) || 0;
  const autoPrice = (weightNum * rateNum + makingNum).toFixed(2);
  const hasAutoPrice = weightNum > 0 && rateNum > 0;

  // KEY FIX: store metalRates in a ref so handleMetalSelect never needs it
  // in its dependency array — prevents infinite re-render loop (React #185)
  const metalRatesRef = useRef<MetalRates | null>(metalRates);
  useEffect(() => {
    metalRatesRef.current = metalRates;
  }, [metalRates]);

  // No metalRates in deps — reads from ref instead, breaking the loop
  const handleMetalSelect = useCallback(
    (m: Metal) => {
      const rates = metalRatesRef.current;
      const patch: Partial<ProductFormState> = { jwMetal: m };
      if (rates?.available) {
        if (m === Metal.Gold) {
          // Default to 22K when switching to Gold
          const g22 = rates.gold22k;
          patch.jwMetalRate = String(Math.round(g22));
          patch.jwPurity = "22K";
        } else if (m === Metal.Silver) {
          patch.jwMetalRate = String(Math.round(rates.silver));
          patch.jwPurity = "99.9%";
        }
      }
      setForm(patch);
    },
    [setForm],
  );

  // Carat selector: Gold only — toggle 22K / 24K and auto-fill rate from live rates
  const handleCaratSelect = useCallback(
    (carat: "22K" | "24K") => {
      const rates = metalRatesRef.current;
      const patch: Partial<ProductFormState> = { jwPurity: carat };
      if (rates?.available) {
        if (carat === "24K") {
          const g24 = rates.gold24k;
          patch.jwMetalRate = String(Math.round(g24));
        } else {
          const g22 = rates.gold22k;
          patch.jwMetalRate = String(Math.round(g22));
        }
      }
      setForm(patch);
    },
    [setForm],
  );

  const metalRateLabel = metalRates?.available
    ? `Metal Rate (${currencySymbol}/gram) — auto-filled`
    : `Metal Rate (${currencySymbol}/gram)`;
  const metalRatePlaceholder = metalRates?.available
    ? "Auto-filled on metal/carat select"
    : "Enter rate per gram";

  const currentMetal = form.jwMetal ?? Metal.Gold;
  const currentCarat = (form.jwPurity ?? "22K") === "24K" ? "24K" : "22K";

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Jewelry Details
      </div>

      {fieldRow({
        label: "Metal",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {Object.values(Metal).map((m) => (
              <button
                type="button"
                key={m}
                data-ocid={`product.jw_metal.${m.toLowerCase()}`}
                onClick={() => handleMetalSelect(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  currentMetal === m
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        ),
      })}

      {/* Carat selector — Gold only */}
      {currentMetal === Metal.Gold && (
        <div className="space-y-1">
          <Label className="text-sm font-medium text-foreground">
            Carat (Purity)
          </Label>
          <div className="flex gap-2">
            {(["22K", "24K"] as const).map((carat) => (
              <button
                type="button"
                key={carat}
                data-ocid={`product.jw_carat.${carat.toLowerCase()}`}
                onClick={() => handleCaratSelect(carat)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                  currentCarat === carat
                    ? "bg-amber-500 text-white border-amber-600 shadow-md"
                    : "border-border bg-background text-muted-foreground hover:bg-amber-50 hover:border-amber-300"
                }`}
              >
                {carat}
                {metalRates?.available && (
                  <span className="block text-xs font-normal opacity-80">
                    {currencySymbol}
                    {carat === "24K"
                      ? Math.round(metalRates.gold24k).toLocaleString()
                      : Math.round(metalRates.gold22k).toLocaleString()}
                    /g
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Silver purity label (read-only) */}
      {currentMetal === Metal.Silver && (
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <span className="text-xs text-slate-600 font-medium">Purity:</span>
          <span className="text-sm font-semibold text-slate-800">
            99.9% (Fine Silver)
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Weight (grams)",
          error: errors.jwWeightGrams,
          children: (
            <Input
              data-ocid="product.jw_weight.input"
              type="number"
              min="0"
              step="0.01"
              value={form.jwWeightGrams}
              onChange={(e) => setForm({ jwWeightGrams: e.target.value })}
              placeholder="10.5"
            />
          ),
        })}
        {/* Platinum / Other: manual purity; Gold/Silver: rate field instead */}
        {currentMetal !== Metal.Gold && currentMetal !== Metal.Silver
          ? fieldRow({
              label: "Purity",
              children: (
                <Input
                  data-ocid="product.jw_purity.input"
                  value={form.jwPurity ?? "950"}
                  onChange={(e) => setForm({ jwPurity: e.target.value })}
                  placeholder="950 or 95%"
                />
              ),
            })
          : fieldRow({
              label: metalRateLabel,
              children: (
                <Input
                  data-ocid="product.jw_metalrate.input"
                  type="number"
                  min="0"
                  value={form.jwMetalRate}
                  onChange={(e) => setForm({ jwMetalRate: e.target.value })}
                  placeholder={metalRatePlaceholder}
                />
              ),
            })}
      </div>

      {/* Metal rate row for Platinum / Other */}
      {currentMetal !== Metal.Gold &&
        currentMetal !== Metal.Silver &&
        fieldRow({
          label: metalRateLabel,
          children: (
            <Input
              data-ocid="product.jw_metalrate.input"
              type="number"
              min="0"
              value={form.jwMetalRate}
              onChange={(e) => setForm({ jwMetalRate: e.target.value })}
              placeholder="Enter rate per gram"
            />
          ),
        })}

      {fieldRow({
        label: "Making Charges",
        children: (
          <Input
            data-ocid="product.jw_making.input"
            type="number"
            min="0"
            value={form.jwMakingCharges}
            onChange={(e) => setForm({ jwMakingCharges: e.target.value })}
            placeholder="500"
          />
        ),
      })}

      {hasAutoPrice && (
        <div className="bg-accent/10 border border-accent/30 rounded-md px-3 py-2 text-sm">
          <span className="text-muted-foreground">Auto Price: </span>
          <span className="font-bold text-accent-foreground">
            {currencySymbol}
            {autoPrice}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            ({form.jwWeightGrams}g × {form.jwMetalRate} +{" "}
            {form.jwMakingCharges || 0} making)
          </span>
        </div>
      )}
      <OptionalExpiryField
        value={form.expiryDate ?? ""}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function SalonEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Service Details
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Duration (minutes)",
          children: (
            <Input
              data-ocid="product.salon_duration.input"
              type="number"
              min="1"
              value={form.salonDuration}
              onChange={(e) => setForm({ salonDuration: e.target.value })}
              placeholder="30"
            />
          ),
        })}
        {fieldRow({
          label: "Staff Name (optional)",
          children: (
            <Input
              data-ocid="product.salon_staff.input"
              value={form.salonStaff}
              onChange={(e) => setForm({ salonStaff: e.target.value })}
              placeholder="Rahul"
            />
          ),
        })}
      </div>
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

function GeneralEngineForm({
  form,
  setForm,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        Product Details
      </div>
      {fieldRow({
        label: "Category",
        children: (
          <Input
            data-ocid="product.gen_category.input"
            value={form.genCategory}
            onChange={(e) =>
              setForm({ genCategory: e.target.value, category: e.target.value })
            }
            placeholder="Electronics, Food, etc."
          />
        ),
      })}
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

// ─── Building Material Engine Form ────────────────────────────────────────────

const BUILDING_MATERIAL_TYPES = [
  "Cement",
  "Brick",
  "Sand",
  "Steel/Rod",
  "Pipe",
  "Tile",
  "Paint",
  "Wood/Timber",
  "Electrical",
  "Plumbing",
  "Hardware Fitting",
  "Glass",
  "Stone",
  "Waterproofing",
  "Other",
] as const;

const BUILDING_MATERIAL_UNITS = [
  "Bag",
  "Ton",
  "PCS",
  "SqFt",
  "Meter",
  "Bundle",
  "Roll",
  "KG",
];

function BuildingMaterialEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        🏗️ Building Material Details
      </div>
      {fieldRow({
        label: "Material Type / Category *",
        error: errors.bldMaterialType,
        children: (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {BUILDING_MATERIAL_TYPES.slice(0, 8).map((mt) => (
                <button
                  type="button"
                  key={mt}
                  data-ocid={`product.bld_material_type.${mt.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  onClick={() =>
                    setForm({
                      bldMaterialType: mt,
                      category: mt,
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.bldMaterialType === mt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {mt}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BUILDING_MATERIAL_TYPES.slice(8).map((mt) => (
                <button
                  type="button"
                  key={mt}
                  data-ocid={`product.bld_material_type.${mt.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  onClick={() =>
                    setForm({
                      bldMaterialType: mt,
                      category: mt,
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.bldMaterialType === mt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {mt}
                </button>
              ))}
            </div>
            <Input
              data-ocid="product.bld_material_type_custom.input"
              value={
                (BUILDING_MATERIAL_TYPES as readonly string[]).includes(
                  form.bldMaterialType,
                )
                  ? ""
                  : form.bldMaterialType
              }
              onChange={(e) =>
                setForm({
                  bldMaterialType: e.target.value,
                  category: e.target.value,
                })
              }
              placeholder="Or enter custom type..."
              className={errors.bldMaterialType ? "border-destructive" : ""}
            />
          </div>
        ),
      })}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand",
          children: (
            <Input
              data-ocid="product.bld_brand.input"
              value={form.bldBrand}
              onChange={(e) => setForm({ bldBrand: e.target.value })}
              placeholder="e.g. Ultratech, JSW, Asian"
            />
          ),
        })}
        {fieldRow({
          label: "Grade / Quality",
          children: (
            <Input
              data-ocid="product.bld_grade.input"
              value={form.bldGrade}
              onChange={(e) => setForm({ bldGrade: e.target.value })}
              placeholder="e.g. 53-Grade, TMT Fe500, First Class"
            />
          ),
        })}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Size / Dimensions",
          children: (
            <Input
              data-ocid="product.bld_size.input"
              value={form.bldSizeDimensions}
              onChange={(e) => setForm({ bldSizeDimensions: e.target.value })}
              placeholder="e.g. 50kg, 9x4.5x3 inch, 10mm x 12m"
            />
          ),
        })}
        {fieldRow({
          label: "Weight",
          children: (
            <Input
              data-ocid="product.bld_weight.input"
              value={form.bldWeight}
              onChange={(e) => setForm({ bldWeight: e.target.value })}
              placeholder="e.g. 50 kg, 1 Ton"
            />
          ),
        })}
      </div>
      {fieldRow({
        label: "Color (for tiles, paint, glass)",
        children: (
          <Input
            data-ocid="product.bld_color.input"
            value={form.bldColor}
            onChange={(e) => setForm({ bldColor: e.target.value })}
            placeholder="e.g. Ivory White, Terracotta Red"
          />
        ),
      })}
      {fieldRow({
        label: "Unit",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {BUILDING_MATERIAL_UNITS.map((u) => (
              <button
                type="button"
                key={u}
                data-ocid={`product.bld_unit.${u.toLowerCase()}`}
                onClick={() => setForm({ unit: u })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  form.unit === u
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        ),
      })}
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

// ─── Electrical Engine Form ──────────────────────────────────────────────────

const ELEC_ITEM_CATEGORIES = [
  "Switch",
  "Switchboard/DB Box",
  "Wire/Cable",
  "MCB/Fuse/RCCB",
  "Conduit/Pipe",
  "Socket/Plug/Outlet",
  "LED/CFL/Bulb",
  "Fan",
  "Junction Box",
  "Earthing Material",
  "Tape/Accessories",
  "Electrical Tools",
  "Transformer/Inverter",
  "Capacitor/Motor",
  "Other",
] as const;

const ELEC_BRANDS = [
  "Havells",
  "Anchor",
  "Schneider",
  "Legrand",
  "Polycab",
  "Finolex",
  "Orient",
  "Crompton",
  "Siemens",
  "ABB",
];

const ELEC_AMP_OPTIONS = [
  "1A",
  "2A",
  "4A",
  "6A",
  "10A",
  "13A",
  "16A",
  "20A",
  "25A",
  "32A",
  "40A",
  "50A",
  "63A",
  "80A",
  "100A",
  "N/A",
  "Custom",
];
const ELEC_VOLTAGE_OPTIONS = [
  "12V",
  "24V",
  "48V",
  "110V",
  "230V",
  "415V",
  "N/A",
  "Custom",
];
const ELEC_WATTAGE_OPTIONS = [
  "3W",
  "5W",
  "7W",
  "9W",
  "12W",
  "15W",
  "18W",
  "20W",
  "25W",
  "36W",
  "40W",
  "60W",
  "100W",
  "N/A",
  "Custom",
];
const ELEC_WIRE_GAUGE_OPTIONS = [
  "0.5mm",
  "0.75mm",
  "1mm",
  "1.5mm",
  "2.5mm",
  "4mm",
  "6mm",
  "10mm",
  "16mm",
  "25mm",
  "N/A",
  "Custom",
];
const ELEC_UNIT_OPTIONS = [
  "Piece",
  "Meter",
  "Roll (100m)",
  "Roll (200m)",
  "Box",
  "Set",
  "Bundle",
  "Pair",
  "Pack",
];
const ELEC_COLOR_OPTIONS = [
  "Red",
  "Black",
  "Yellow/Earth",
  "Green",
  "Blue",
  "White",
  "Orange",
  "Multi-core",
  "N/A",
];

function ElecDropdownCustom({
  label,
  options,
  value,
  customValue,
  ocidPrefix,
  onSelect,
  onCustomChange,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  customValue: string;
  ocidPrefix: string;
  onSelect: (v: string) => void;
  onCustomChange: (v: string) => void;
  error?: string;
}) {
  return fieldRow({
    label,
    error,
    children: (
      <div className="space-y-1.5">
        <div className="flex flex-wrap gap-1.5">
          {options.map((o) => (
            <button
              type="button"
              key={o}
              data-ocid={`${ocidPrefix}.${o.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              onClick={() => onSelect(o)}
              className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                value === o
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input bg-background hover:bg-muted"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        {value === "Custom" && (
          <Input
            data-ocid={`${ocidPrefix}.custom_input`}
            value={customValue}
            onChange={(e) => onCustomChange(e.target.value)}
            placeholder="Enter custom value..."
            className="text-xs"
          />
        )}
      </div>
    ),
  });
}

function ElectricalEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  const isWireCategory = form.elecItemCategory === "Wire/Cable";
  const isLightOrFan =
    form.elecItemCategory === "LED/CFL/Bulb" || form.elecItemCategory === "Fan";

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        ⚡ Electrical Details
      </div>

      {/* Item Category */}
      {fieldRow({
        label: "Item Category *",
        error: errors.elecItemCategory,
        children: (
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1.5">
              {ELEC_ITEM_CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid={`product.elec_category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  onClick={() =>
                    setForm({ elecItemCategory: cat, category: cat })
                  }
                  className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                    form.elecItemCategory === cat
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ELEC_ITEM_CATEGORIES.slice(8).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid={`product.elec_category.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  onClick={() =>
                    setForm({ elecItemCategory: cat, category: cat })
                  }
                  className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                    form.elecItemCategory === cat
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.elecItemCategory && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.elecItemCategory}
              </p>
            )}
          </div>
        ),
      })}

      {/* Brand + AMP Rating — prominently at top */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand *",
          error: errors.elecBrandName,
          children: (
            <div className="space-y-1">
              <Input
                data-ocid="product.elec_brand.input"
                value={form.elecBrandName}
                onChange={(e) => setForm({ elecBrandName: e.target.value })}
                placeholder="Havells, Anchor, Polycab..."
                list="elec-brand-suggestions"
                className={errors.elecBrandName ? "border-destructive" : ""}
              />
              <datalist id="elec-brand-suggestions">
                {ELEC_BRANDS.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>
          ),
        })}
        {fieldRow({
          label: "Model / Part No (optional)",
          children: (
            <Input
              data-ocid="product.elec_partmodel.input"
              value={form.elecPartModel}
              onChange={(e) => setForm({ elecPartModel: e.target.value })}
            />
          ),
        })}
      </div>

      {/* AMP Rating — very important for electrical */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 space-y-2">
        <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
          ⚡ AMP Rating (Critical for Electrical Items)
        </div>
        {ElecDropdownCustom({
          label: "AMP Rating",
          options: ELEC_AMP_OPTIONS,
          value: form.elecAmpRating,
          customValue: form.elecAmpCustom,
          ocidPrefix: "product.elec_amp",
          onSelect: (v) => setForm({ elecAmpRating: v }),
          onCustomChange: (v) => setForm({ elecAmpCustom: v }),
        })}
      </div>

      {/* Voltage */}
      {ElecDropdownCustom({
        label: "Voltage Rating",
        options: ELEC_VOLTAGE_OPTIONS,
        value: form.elecVoltage,
        customValue: form.elecVoltageCustom,
        ocidPrefix: "product.elec_voltage",
        onSelect: (v) => setForm({ elecVoltage: v }),
        onCustomChange: (v) => setForm({ elecVoltageCustom: v }),
      })}

      {/* Wattage — only for LED/Fan */}
      {isLightOrFan &&
        ElecDropdownCustom({
          label: "Wattage (for Bulbs/Fans)",
          options: ELEC_WATTAGE_OPTIONS,
          value: form.elecWattage,
          customValue: form.elecWattageCustom,
          ocidPrefix: "product.elec_wattage",
          onSelect: (v) => setForm({ elecWattage: v }),
          onCustomChange: (v) => setForm({ elecWattageCustom: v }),
        })}

      {/* Wire Gauge — only for Wire/Cable */}
      {isWireCategory &&
        ElecDropdownCustom({
          label: "Wire Gauge (for Wire/Cable)",
          options: ELEC_WIRE_GAUGE_OPTIONS,
          value: form.elecWireGauge,
          customValue: form.elecWireGaugeCustom,
          ocidPrefix: "product.elec_gauge",
          onSelect: (v) => setForm({ elecWireGauge: v }),
          onCustomChange: (v) => setForm({ elecWireGaugeCustom: v }),
        })}

      {/* Unit */}
      {fieldRow({
        label: "Unit / Length",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {ELEC_UNIT_OPTIONS.map((u) => (
              <button
                type="button"
                key={u}
                data-ocid={`product.elec_unit.${u.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                onClick={() => setForm({ elecUnit: u, unit: u })}
                className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                  form.elecUnit === u
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        ),
      })}

      {/* Color — for wires especially */}
      {fieldRow({
        label: "Color (for wire/cable)",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {ELEC_COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                data-ocid={`product.elec_color.${c.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                onClick={() => setForm({ elecColor: c })}
                className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-colors ${
                  form.elecColor === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        ),
      })}

      {/* ISI/CE Certified + Batch Number */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 pt-5">
          <input
            data-ocid="product.elec_isi_certified.checkbox"
            type="checkbox"
            id="elecIsiCertified"
            checked={form.elecIsiCertified}
            onChange={(e) => setForm({ elecIsiCertified: e.target.checked })}
            className="w-4 h-4 rounded border-input accent-primary"
          />
          <label htmlFor="elecIsiCertified" className="text-sm font-medium">
            ISI/CE Certified
          </label>
        </div>
        {fieldRow({
          label: "Batch Number (optional)",
          children: (
            <Input
              data-ocid="product.elec_batch.input"
              value={form.elecBatchNumber}
              onChange={(e) => setForm({ elecBatchNumber: e.target.value })}
              placeholder="BT-2024-001"
            />
          ),
        })}
      </div>

      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

// ─── Agro Products Engine Form ───────────────────────────────────────────────

const AGRO_PRODUCT_TYPES = [
  "Seeds",
  "Fertilizer",
  "Pesticide",
  "Farming Tools",
  "Animal Feed",
  "Crop Protection",
] as const;

const AGRO_CROP_SUGGESTIONS = [
  "Wheat",
  "Rice",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Vegetables",
  "Fruits",
  "Pulses",
  "Oilseeds",
  "General",
];

const AGRO_WEIGHT_UNITS = ["kg", "grams", "liters", "pieces", "bags"];

// ─── Fruits & Vegetables Engine Form ─────────────────────────────────────────

const FV_PRODUCT_TYPES = [
  "Fruit",
  "Vegetable",
  "Herb",
  "Dry Fruit",
  "Other",
] as const;
const FV_UNITS = [
  "kg",
  "gram",
  "dozen",
  "piece",
  "bundle",
  "box",
  "tray",
] as const;
const FV_SEASONAL_TAGS = ["All-Season", "Summer", "Winter", "Monsoon"] as const;
const FV_VARIETY_SUGGESTIONS = [
  "Mango",
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Guava",
  "Papaya",
  "Tomato",
  "Potato",
  "Onion",
  "Carrot",
  "Spinach",
  "Cabbage",
  "Cauliflower",
  "Peas",
  "Garlic",
  "Ginger",
  "Coriander",
  "Mint",
  "Other",
];

function FruitsVegetablesEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        🍎 Fruits & Vegetables Details
      </div>

      {/* Product Type */}
      {fieldRow({
        label: "Product Type",
        children: (
          <div className="flex flex-wrap gap-1.5">
            {FV_PRODUCT_TYPES.map((pt) => (
              <button
                type="button"
                key={pt}
                data-ocid={`product.fv_product_type.${pt.toLowerCase().replace(/\s+/g, "_")}`}
                onClick={() => setForm({ fvProductType: pt })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  form.fvProductType === pt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        ),
      })}

      {/* Variety */}
      {fieldRow({
        label: "Variety / Name *",
        error: errors.fvVariety,
        children: (
          <div className="space-y-1">
            <Input
              data-ocid="product.fv_variety.input"
              value={form.fvVariety}
              onChange={(e) => setForm({ fvVariety: e.target.value })}
              placeholder="e.g. Mango, Tomato, Spinach"
              list="fv-variety-suggestions"
              className={errors.fvVariety ? "border-destructive" : ""}
            />
            <datalist id="fv-variety-suggestions">
              {FV_VARIETY_SUGGESTIONS.map((v) => (
                <option key={v} value={v} />
              ))}
            </datalist>
          </div>
        ),
      })}

      {/* Unit + Seasonal Tag */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Unit *",
          error: errors.fvUnit,
          children: (
            <div className="flex flex-wrap gap-1.5">
              {FV_UNITS.map((u) => (
                <button
                  type="button"
                  key={u}
                  data-ocid={`product.fv_unit.${u}`}
                  onClick={() => setForm({ fvUnit: u, unit: u })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.fvUnit === u
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          ),
        })}
        {fieldRow({
          label: "Season",
          children: (
            <div className="flex flex-wrap gap-1.5">
              {FV_SEASONAL_TAGS.map((s) => (
                <button
                  type="button"
                  key={s}
                  data-ocid={`product.fv_season.${s.toLowerCase().replace(/-/g, "_")}`}
                  onClick={() => setForm({ fvSeasonalTag: s })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.fvSeasonalTag === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          ),
        })}
      </div>

      {/* Origin Source */}
      {fieldRow({
        label: "Origin / Source (Optional)",
        children: (
          <Input
            data-ocid="product.fv_origin.input"
            value={form.fvOriginSource}
            onChange={(e) => setForm({ fvOriginSource: e.target.value })}
            placeholder="e.g. Punjab Farm, Local Market"
          />
        ),
      })}

      {/* Freshness Date + Batch Number */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Best Before / Freshness Date (Optional)",
          children: (
            <Input
              data-ocid="product.fv_freshness_date.input"
              type="date"
              value={form.fvFreshnessDate}
              onChange={(e) => setForm({ fvFreshnessDate: e.target.value })}
            />
          ),
        })}
        {fieldRow({
          label: "Batch Number (Optional)",
          children: (
            <Input
              data-ocid="product.fv_batch.input"
              value={form.fvBatchNumber}
              onChange={(e) => setForm({ fvBatchNumber: e.target.value })}
              placeholder="e.g. BT-2024-001"
            />
          ),
        })}
      </div>
    </div>
  );
}

// ─── Agro Products Engine Form ───────────────────────────────────────────────

function AgroProductsEngineForm({
  form,
  setForm,
  errors,
}: {
  form: ProductFormState;
  setForm: (f: Partial<ProductFormState>) => void;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-primary uppercase tracking-wide border-b border-border pb-1">
        🌾 Agro Product Details
      </div>

      {/* Product Type */}
      {fieldRow({
        label: "Product Type *",
        error: errors.agroProductType,
        children: (
          <div className="flex flex-wrap gap-1.5">
            {AGRO_PRODUCT_TYPES.map((pt) => (
              <button
                type="button"
                key={pt}
                data-ocid={`product.agro_product_type.${pt.toLowerCase().replace(/\s+/g, "_")}`}
                onClick={() => setForm({ agroProductType: pt })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  form.agroProductType === pt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        ),
      })}

      {/* Brand + Crop Type */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Brand *",
          error: errors.agroBrand,
          children: (
            <Input
              data-ocid="product.agro_brand.input"
              value={form.agroBrand}
              onChange={(e) => setForm({ agroBrand: e.target.value })}
              placeholder="e.g. Monsanto, Bayer, FCI"
              className={errors.agroBrand ? "border-destructive" : ""}
            />
          ),
        })}
        {fieldRow({
          label: "Crop Type *",
          error: errors.agroCropType,
          children: (
            <div className="space-y-1">
              <Input
                data-ocid="product.agro_crop_type.input"
                value={form.agroCropType}
                onChange={(e) => setForm({ agroCropType: e.target.value })}
                placeholder="e.g. Wheat, Rice, Cotton"
                list="agro-crop-suggestions"
                className={errors.agroCropType ? "border-destructive" : ""}
              />
              <datalist id="agro-crop-suggestions">
                {AGRO_CROP_SUGGESTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          ),
        })}
      </div>

      {/* Weight + Unit */}
      <div className="grid grid-cols-2 gap-3">
        {fieldRow({
          label: "Weight / Quantity *",
          error: errors.agroWeight,
          children: (
            <Input
              data-ocid="product.agro_weight.input"
              type="number"
              min="0"
              step="0.01"
              value={form.agroWeight}
              onChange={(e) => setForm({ agroWeight: e.target.value })}
              placeholder="e.g. 10"
              className={errors.agroWeight ? "border-destructive" : ""}
            />
          ),
        })}
        {fieldRow({
          label: "Unit",
          children: (
            <div className="flex flex-wrap gap-1.5">
              {AGRO_WEIGHT_UNITS.map((u) => (
                <button
                  type="button"
                  key={u}
                  data-ocid={`product.agro_unit.${u}`}
                  onClick={() => setForm({ agroWeightUnit: u, unit: u })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    form.agroWeightUnit === u
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input bg-background hover:bg-muted"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          ),
        })}
      </div>

      {/* Batch Number */}
      {fieldRow({
        label: "Batch Number (Optional)",
        children: (
          <Input
            data-ocid="product.agro_batch.input"
            value={form.agroBatchNumber}
            onChange={(e) => setForm({ agroBatchNumber: e.target.value })}
            placeholder="e.g. BT-2024-001"
          />
        ),
      })}

      {/* Expiry Date — optional, user sets manually */}
      <OptionalExpiryField
        value={form.expiryDate}
        onChange={(v) => setForm({ expiryDate: v })}
      />
    </div>
  );
}

// ─── Stock Adjust Dialog ──────────────────────────────────────────────────────

function StockAdjustDialog({
  product,
  onClose,
  onAdjust,
}: {
  product: ProductView;
  onClose: () => void;
  onAdjust: (id: bigint, newStock: number, note: string) => Promise<void>;
}) {
  const [delta, setDelta] = useState("0");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const current = product.stock;
  const newStock = Math.max(0, current + Number(delta));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAdjust(product.id, newStock, note);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm" data-ocid="stock_adjust.dialog">
        <DialogHeader>
          <DialogTitle>Adjust Stock — {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <span className="text-sm text-muted-foreground">Current Stock</span>
            <span className="font-bold text-lg text-foreground">
              {current} {product.unit}
            </span>
          </div>
          <div className="space-y-2">
            <Label>Adjustment (+/-)</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                data-ocid="stock_adjust.minus_button"
                onClick={() => setDelta((d) => String(Number(d) - 1))}
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                data-ocid="stock_adjust.delta.input"
                type="number"
                value={delta}
                onChange={(e) => setDelta(e.target.value)}
                className="text-center font-bold text-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                data-ocid="stock_adjust.plus_button"
                onClick={() => setDelta((d) => String(Number(d) + 1))}
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-3">
            <span className="text-sm text-muted-foreground">New Stock</span>
            <span className="font-bold text-lg text-primary">
              {newStock} {product.unit}
            </span>
          </div>
          {fieldRow({
            label: "Note (optional)",
            children: (
              <Input
                data-ocid="stock_adjust.note.input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Received new stock, damaged goods, etc."
              />
            ),
          })}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="stock_adjust.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1"
              data-ocid="stock_adjust.confirm_button"
            >
              {loading ? "Saving..." : "Save Adjustment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Product Detail View Modal ────────────────────────────────────────────────

function ProductDetailModal({
  product,
  currency,
  onClose,
  onEdit,
}: {
  product: ProductView;
  currency: string;
  onClose: () => void;
  onEdit: () => void;
}) {
  const currencySymbol = (() => {
    const map: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      PKR: "₨",
    };
    return map[currency] ?? currency;
  })();

  const expiryDate = getProductExpiryDate(product);
  const isLow = product.stock <= product.minStock;
  const isExpiring = expiryDate ? isNearExpiry(expiryDate, 90) : false;
  const profit = product.retailPrice - product.costPrice;
  const marginPct =
    product.costPrice > 0
      ? ((profit / product.costPrice) * 100).toFixed(1)
      : "—";

  // Build engine detail rows
  const engineDetails: { label: string; value: string }[] = [];
  const ef = product.engineFields;
  if (ef.__kind__ === "Mobile") {
    const m = ef.Mobile as MobileFields;
    if (m.brand) engineDetails.push({ label: "Brand", value: m.brand });
    if (m.model) engineDetails.push({ label: "Model", value: m.model });
    if (m.imei) engineDetails.push({ label: "IMEI", value: m.imei });
    if (m.storage) engineDetails.push({ label: "Storage", value: m.storage });
    if (m.color) engineDetails.push({ label: "Color", value: m.color });
  } else if (ef.__kind__ === "Electronics") {
    const e = ef.Electronics as ElectronicsFields;
    if (e.brand) engineDetails.push({ label: "Brand", value: e.brand });
    if (e.model) engineDetails.push({ label: "Model", value: e.model });
    if (e.serialNo)
      engineDetails.push({ label: "Serial No", value: e.serialNo });
    if (e.warrantyMonths)
      engineDetails.push({
        label: "Warranty",
        value: `${e.warrantyMonths} months`,
      });
  } else if (ef.__kind__ === "Medical") {
    const m = ef.Medical;
    if (m.company) engineDetails.push({ label: "Company", value: m.company });
    if (m.batchNo) engineDetails.push({ label: "Batch No", value: m.batchNo });
    if (m.expiryDate)
      engineDetails.push({ label: "Expiry", value: m.expiryDate });
    if (m.composition)
      engineDetails.push({ label: "Composition", value: m.composition });
    engineDetails.push({ label: "Pack Type", value: m.packType });
    if (m.isControlled)
      engineDetails.push({ label: "Controlled", value: "Yes" });
  } else if (ef.__kind__ === "Clothing") {
    const c = ef.Clothing as ClothingFields;
    if (c.brand) engineDetails.push({ label: "Brand", value: c.brand });
    if (c.itemName) engineDetails.push({ label: "Item", value: c.itemName });
    if (c.size) engineDetails.push({ label: "Size", value: c.size });
    if (c.color) engineDetails.push({ label: "Color", value: c.color });
  } else if (ef.__kind__ === "Footwear") {
    const f = ef.Footwear as FootwearFields;
    if (f.brand) engineDetails.push({ label: "Brand", value: f.brand });
    if (f.model) engineDetails.push({ label: "Model", value: f.model });
    if (f.size)
      engineDetails.push({
        label: "Size",
        value: `${f.size} (${f.sizeSystem})`,
      });
    if (f.color) engineDetails.push({ label: "Color", value: f.color });
  } else if (ef.__kind__ === "AutoParts") {
    const a = ef.AutoParts as AutoPartsFields;
    if (a.vehicleBrand)
      engineDetails.push({ label: "Vehicle Brand", value: a.vehicleBrand });
    if (a.vehicleModel)
      engineDetails.push({ label: "Vehicle Model", value: a.vehicleModel });
    if (a.partName)
      engineDetails.push({ label: "Part Name", value: a.partName });
    if (a.partNo) engineDetails.push({ label: "Part No", value: a.partNo });
  } else if (ef.__kind__ === "Jewelry") {
    const j = ef.Jewelry as JewelryFields;
    engineDetails.push({ label: "Metal", value: j.metal });
    if (j.weightGrams)
      engineDetails.push({ label: "Weight", value: `${j.weightGrams}g` });
    if (j.purity) engineDetails.push({ label: "Purity", value: j.purity });
    if (j.metalRate)
      engineDetails.push({
        label: "Metal Rate",
        value: `${currencySymbol}${j.metalRate}/g`,
      });
    if (j.makingCharges)
      engineDetails.push({
        label: "Making Charges",
        value: `${currencySymbol}${j.makingCharges}`,
      });
  } else if (ef.__kind__ === "BuildingMaterial") {
    const b = ef.BuildingMaterial as BuildingMaterialFields;
    if (b.material_type)
      engineDetails.push({ label: "Material Type", value: b.material_type });
    if (b.brand) engineDetails.push({ label: "Brand", value: b.brand });
    if (b.grade) engineDetails.push({ label: "Grade", value: b.grade });
    if (b.size_dimensions)
      engineDetails.push({
        label: "Size/Dimensions",
        value: b.size_dimensions,
      });
    if (b.weight) engineDetails.push({ label: "Weight", value: b.weight });
    if (b.color) engineDetails.push({ label: "Color", value: b.color });
  } else if (ef.__kind__ === "AgroProducts") {
    const a = ef.AgroProducts as AgroProductsFields;
    if (a.productType)
      engineDetails.push({ label: "Product Type", value: a.productType });
    if (a.brand) engineDetails.push({ label: "Brand", value: a.brand });
    if (a.cropType)
      engineDetails.push({ label: "Crop Type", value: a.cropType });
    if (a.weight)
      engineDetails.push({
        label: "Weight",
        value: `${a.weight} ${a.weightUnit}`,
      });
    if (a.batchNumber)
      engineDetails.push({ label: "Batch No", value: a.batchNumber });
    if (a.expiryDate)
      engineDetails.push({ label: "Expiry", value: a.expiryDate });
  } else if (ef.__kind__ === "Electrical") {
    const e = ef.Electrical as ElectricalFields;
    if (e.itemCategory)
      engineDetails.push({ label: "Category", value: e.itemCategory });
    if (e.brand) engineDetails.push({ label: "Brand", value: e.brand });
    if (e.ampereRating && e.ampereRating !== "N/A")
      engineDetails.push({ label: "AMP Rating", value: e.ampereRating });
    if (e.voltageRating && e.voltageRating !== "N/A")
      engineDetails.push({ label: "Voltage", value: e.voltageRating });
    if (e.wattage && e.wattage !== "N/A")
      engineDetails.push({ label: "Wattage", value: e.wattage });
    if (e.wireGauge && e.wireGauge !== "N/A")
      engineDetails.push({ label: "Wire Gauge", value: e.wireGauge });
    if (e.color && e.color !== "N/A")
      engineDetails.push({ label: "Color", value: e.color });
    if (e.model) engineDetails.push({ label: "Model/Part No", value: e.model });
    if (e.isiCertified)
      engineDetails.push({ label: "ISI/CE Certified", value: "Yes ✓" });
    if (e.batchNumber)
      engineDetails.push({ label: "Batch No", value: e.batchNumber });
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="product_detail.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl pr-8">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {product.category || ef.__kind__}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.unit}
            </Badge>
            {isLow && (
              <Badge variant="destructive" className="text-xs">
                Low Stock
              </Badge>
            )}
            {isExpiring && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                Near Expiry
              </Badge>
            )}
            {!product.isActive && (
              <Badge variant="secondary" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-muted/40 rounded-xl p-4 space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Pricing & Profit
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Retail</p>
                <p className="text-base font-bold text-foreground">
                  {formatCurrency(product.retailPrice, currency)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Wholesale</p>
                <p className="text-base font-bold text-foreground">
                  {formatCurrency(product.wholesalePrice, currency)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Cost</p>
                <p className="text-base font-bold text-foreground">
                  {formatCurrency(product.costPrice, currency)}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Profit Margin
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-sm ${profit >= 0 ? "text-green-600" : "text-destructive"}`}
                >
                  {currencySymbol}
                  {profit.toFixed(2)}
                </span>
                <Badge
                  className={`text-xs ${profit >= 0 ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}`}
                >
                  {marginPct}%
                </Badge>
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Current Stock
              </p>
              <p
                className={`text-2xl font-bold ${isLow ? "text-destructive" : "text-foreground"}`}
              >
                {product.stock}
              </p>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Min Stock</p>
              <p className="text-2xl font-bold text-foreground">
                {product.minStock}
              </p>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
            </div>
          </div>

          {/* Engine-specific details */}
          {engineDetails.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {ef.__kind__} Details
              </div>
              <div className="bg-muted/30 rounded-xl divide-y divide-border">
                {engineDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2.5"
                  >
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-foreground max-w-[60%] text-right break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expiry date */}
          {expiryDate && (
            <div
              className={`flex items-center justify-between rounded-lg px-4 py-3 border ${isExpiring ? "bg-orange-50 border-orange-200" : "bg-muted/30 border-border"}`}
            >
              <span className="text-sm text-muted-foreground">Expiry Date</span>
              <span
                className={`text-sm font-semibold ${isExpiring ? "text-orange-700" : "text-foreground"}`}
              >
                {expiryDate}
                {isExpiring && " ⚠️"}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="product_detail.close_button"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={onEdit}
              className="flex-1 gap-2"
              data-ocid="product_detail.edit_button"
            >
              <Edit2 className="w-4 h-4" />
              Edit Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Product Form Modal ──────────────────────────────────────────────────

function ProductModal({
  shopType,
  editProduct,
  currency,
  metalRates,
  shopId,
  suppliers,
  products,
  onClose,
  onSave,
}: {
  shopType:
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE;
  editProduct: ProductView | null;
  currency: string;
  metalRates: MetalRates | null;
  shopId: string;
  suppliers: Supplier[];
  products: ProductView[];
  onClose: () => void;
  onSave: (
    input: CreateProductInput | UpdateProductInput,
    isEdit: boolean,
    supplierId: string,
  ) => Promise<void>;
}) {
  const isEdit = !!editProduct;
  const _shopConfig = useStore((s) => s.shopConfig);
  const api = useApi();
  const [form, setFormState] = useState<ProductFormState>(() => {
    const base = initialForm(shopType);
    if (editProduct) {
      const extracted = extractFormFromProduct(editProduct);
      return { ...base, ...extracted };
    }
    return base;
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [autoNameLocked, setAutoNameLocked] = useState(false);
  const [showPriceCompare, setShowPriceCompare] = useState(false);
  const [priceComparePurchases, setPriceComparePurchases] = useState<
    SupplierPurchaseWithName[]
  >([]);
  const [priceCompareLoading, setPriceCompareLoading] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const handleBarcodeScanned = (barcode: string) => {
    setFormState((prev) => ({ ...prev, barcode }));
    setShowBarcodeScanner(false);
  };

  // Auto-fill default charges on mount when adding a new product
  // Use a ref so we only fire once per mount, regardless of re-renders
  const defaultChargesLoaded = useRef(false);
  useEffect(() => {
    if (isEdit || defaultChargesLoaded.current || !api.ready) return;
    defaultChargesLoaded.current = true;
    void api.getDefaultCharges().then((defaults) => {
      if (defaults) {
        setFormState((prev) => ({
          ...prev,
          transportCost: defaults.defaultTransportCharge ?? prev.transportCost,
          labourCost: defaults.defaultLabourCharge ?? prev.labourCost,
        }));
      }
    });
  }, [api.ready, api.getDefaultCharges, isEdit]);

  const setForm = useCallback((patch: Partial<ProductFormState>) => {
    setFormState((prev) => ({ ...prev, ...patch }));
  }, []);

  // Compute the auto-generated name from only the fields that affect it.
  const computedAutoName = useMemo(() => {
    const snap = {
      name: form.name,
      mobileBrand: form.mobileBrand,
      mobileModel: form.mobileModel,
      mobileStorage: form.mobileStorage,
      mobileColor: form.mobileColor,
      mobileCategory: form.mobileCategory,
      mobileAccessoryType: form.mobileAccessoryType,
      mobileCompatibility: form.mobileCompatibility,
      mobileRam: form.mobileRam,
      mobileProcessor: form.mobileProcessor,
      mobileDisplaySize: form.mobileDisplaySize,
      elecBrand: form.elecBrand,
      elecModel: form.elecModel,
      medName: form.medName,
      medCompany: form.medCompany,
      clothBrand: form.clothBrand,
      clothItem: form.clothItem,
      clothColor: form.clothColor,
      clothSize: form.clothSize,
      footBrand: form.footBrand,
      footModel: form.footModel,
      footSize: form.footSize,
      footSizeSystem: form.footSizeSystem,
      statSubType: form.statSubType,
      statBookClass: form.statBookClass,
      statBookSubject: form.statBookSubject,
      statNbSize: form.statNbSize,
      statNbPages: form.statNbPages,
      statPenBrand: form.statPenBrand,
      statPenColor: form.statPenColor,
      statOtherName: form.statOtherName,
      autoVehicleBrand: form.autoVehicleBrand,
      autoPartName: form.autoPartName,
      restName: form.restName,
      restCategory: form.restCategory,
      hwSku: form.hwSku,
      jwMetal: form.jwMetal,
      jwWeightGrams: form.jwWeightGrams,
      salonServiceName: form.salonServiceName,
      salonDuration: form.salonDuration,
      genName: form.genName,
      bldBrand: form.bldBrand,
      bldMaterialType: form.bldMaterialType,
      bldGrade: form.bldGrade,
      bldSizeDimensions: form.bldSizeDimensions,
      agroProductType: form.agroProductType,
      agroBrand: form.agroBrand,
      agroCropType: form.agroCropType,
      agroWeight: form.agroWeight,
      agroWeightUnit: form.agroWeightUnit,
      fvProductType: form.fvProductType,
      fvVariety: form.fvVariety,
      fvUnit: form.fvUnit,
      fvSeasonalTag: form.fvSeasonalTag,
      elecBrandName: form.elecBrandName,
      elecAmpRating: form.elecAmpRating,
      elecAmpCustom: form.elecAmpCustom,
      elecWattage: form.elecWattage,
      elecWattageCustom: form.elecWattageCustom,
      elecItemCategory: form.elecItemCategory,
      elecWireGauge: form.elecWireGauge,
      elecWireGaugeCustom: form.elecWireGaugeCustom,
      elecColor: form.elecColor,
      elecUnit: form.elecUnit,
    } as ProductFormState;
    return generateAutoName(shopType, snap);
  }, [
    shopType,
    form.name,
    form.mobileBrand,
    form.mobileModel,
    form.mobileStorage,
    form.mobileColor,
    form.mobileCategory,
    form.mobileAccessoryType,
    form.mobileCompatibility,
    form.mobileRam,
    form.mobileProcessor,
    form.mobileDisplaySize,
    form.elecBrand,
    form.elecModel,
    form.medName,
    form.medCompany,
    form.clothBrand,
    form.clothItem,
    form.clothColor,
    form.clothSize,
    form.footBrand,
    form.footModel,
    form.footSize,
    form.footSizeSystem,
    form.statSubType,
    form.statBookClass,
    form.statBookSubject,
    form.statNbSize,
    form.statNbPages,
    form.statPenBrand,
    form.statPenColor,
    form.statOtherName,
    form.autoVehicleBrand,
    form.autoPartName,
    form.restName,
    form.restCategory,
    form.hwSku,
    form.jwMetal,
    form.jwWeightGrams,
    form.salonServiceName,
    form.salonDuration,
    form.genName,
    form.bldBrand,
    form.bldMaterialType,
    form.bldGrade,
    form.bldSizeDimensions,
    form.agroProductType,
    form.agroBrand,
    form.agroCropType,
    form.agroWeight,
    form.agroWeightUnit,
    form.fvProductType,
    form.fvVariety,
    form.fvUnit,
    form.fvSeasonalTag,
    form.elecBrandName,
    form.elecAmpRating,
    form.elecAmpCustom,
    form.elecWattage,
    form.elecWattageCustom,
    form.elecItemCategory,
    form.elecWireGauge,
    form.elecWireGaugeCustom,
    form.elecColor,
    form.elecUnit,
  ]);

  useEffect(() => {
    if (autoNameLocked || !computedAutoName) return;
    setFormState((prev) => {
      if (prev.name === computedAutoName) return prev;
      return { ...prev, name: computedAutoName };
    });
  }, [computedAutoName, autoNameLocked]);

  const currencySymbol = (() => {
    const map: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
    };
    return map[currency] ?? currency;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(shopType, form);
    // Barcode uniqueness check during UPDATE — block submission if another product uses the same barcode
    if (isEdit && editProduct && form.barcode.trim()) {
      const barcodeConflict = products.find(
        (p) =>
          (p as ProductView & { barcode?: string }).barcode ===
            form.barcode.trim() && p.id !== editProduct.id,
      );
      if (barcodeConflict) {
        errs.barcode = "This barcode is already used by another product.";
      }
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const engineFields = buildEngineFields(shopType, form);
      const productName = form.name || form.genName || "Unnamed Product";
      const totalCostPrice =
        (Number(form.costPrice) || 0) +
        (Number(form.transportCost) || 0) +
        (Number(form.labourCost) || 0);
      const barcodeVal = form.barcode.trim() || undefined;
      if (isEdit && editProduct) {
        const input: UpdateProductInput = {
          id: editProduct.id,
          shopId: shopId,
          name: productName,
          category: form.category,
          unit: form.unit,
          retailPrice: Number(form.retailPrice) || 0,
          wholesalePrice: Number(form.wholesalePrice) || 0,
          costPrice: totalCostPrice,
          transportCost: form.transportCost
            ? Number(form.transportCost)
            : undefined,
          labourCost: form.labourCost ? Number(form.labourCost) : undefined,
          stock: Number(form.stock) || 0,
          minStock: Number(form.minStock) || 0,
          isActive: true,
          barcode: barcodeVal,
          engineFields,
        };
        await onSave(input, true, form.supplierId);
      } else {
        const input: CreateProductInput = {
          shopId: shopId,
          name: productName,
          category: form.category,
          unit: form.unit,
          retailPrice: Number(form.retailPrice) || 0,
          wholesalePrice: Number(form.wholesalePrice) || 0,
          costPrice: totalCostPrice,
          transportCost: form.transportCost
            ? Number(form.transportCost)
            : undefined,
          labourCost: form.labourCost ? Number(form.labourCost) : undefined,
          stock: Number(form.stock) || 0,
          minStock: Number(form.minStock) || 0,
          isActive: true,
          barcode: barcodeVal,
          shopType:
            shopType === BUILDING_MATERIAL_SHOP_TYPE
              ? ShopType.Hardware
              : shopType === FRUITS_VEGETABLES_SHOP_TYPE
                ? ShopType.AgroProducts
                : (shopType as ShopType),
          engineFields,
        };
        await onSave(input, false, form.supplierId);
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrors({ submit: `Failed to save product: ${errMsg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="product_modal.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {isEdit ? "Edit Product" : "Add Product"}
              <span className="ml-2 text-sm font-normal text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded">
                {shopType}
              </span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            {/* Engine-specific fields */}
            {shopType === ShopType.Mobile && (
              <MobileEngineForm form={form} setForm={setForm} errors={errors} />
            )}
            {shopType === ShopType.Electronics && (
              <ElectronicsEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.Medical && (
              <MedicalEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {shopType === ShopType.Clothing && (
              <ClothingEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {shopType === ShopType.Footwear && (
              <FootwearEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {shopType === ShopType.Grocery && (
              <GroceryEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.Stationery && (
              <StationeryEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.Restaurant && (
              <RestaurantEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.AutoParts && (
              <AutoPartsEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.Hardware && (
              <HardwareEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.Jewelry && (
              <JewelryEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
                currencySymbol={currencySymbol}
                metalRates={metalRates}
              />
            )}
            {shopType === ShopType.Salon && (
              <SalonEngineForm form={form} setForm={setForm} />
            )}
            {shopType === ShopType.General && (
              <GeneralEngineForm form={form} setForm={setForm} />
            )}
            {shopType === BUILDING_MATERIAL_SHOP_TYPE && (
              <BuildingMaterialEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {shopType === ShopType.AgroProducts && (
              <AgroProductsEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {shopType === ShopType.Electrical && (
              <ElectricalEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}
            {(shopType as string) === FRUITS_VEGETABLES_SHOP_TYPE && (
              <FruitsVegetablesEngineForm
                form={form}
                setForm={setForm}
                errors={errors}
              />
            )}

            {/* Product Name */}
            <div className="border-t border-border pt-4 space-y-1">
              <Label className="text-sm font-medium flex items-center justify-between">
                Product Name
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => setAutoNameLocked((l) => !l)}
                >
                  {autoNameLocked ? "🔒 Manual" : "✨ Auto-generating"}
                </button>
              </Label>
              <Input
                data-ocid="product.name.input"
                value={form.name}
                onChange={(e) => {
                  setAutoNameLocked(true);
                  setForm({ name: e.target.value });
                }}
                placeholder="Product name (auto-generated from fields above)"
                className="font-medium"
              />
            </div>

            {/* Barcode field */}
            <div className="space-y-1">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <Barcode className="w-4 h-4 text-muted-foreground" />
                Barcode (Optional)
              </Label>
              <div className="flex gap-2">
                <Input
                  data-ocid="product.barcode.input"
                  value={form.barcode}
                  onChange={(e) => setForm({ barcode: e.target.value })}
                  placeholder="Scan or type barcode..."
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  data-ocid="product.barcode_scan.button"
                  title="Scan barcode with camera"
                  className="shrink-0 h-10 w-10"
                  onClick={() => setShowBarcodeScanner(true)}
                >
                  <ScanLine className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Common fields */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide pb-1">
                Pricing &amp; Stock
              </div>
              <div className="grid grid-cols-3 gap-3">
                {fieldRow({
                  label: `Retail Price (${currencySymbol}) *`,
                  error: errors.retailPrice,
                  children: (
                    <Input
                      data-ocid="product.retail_price.input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.retailPrice}
                      onChange={(e) => setForm({ retailPrice: e.target.value })}
                      placeholder="0.00"
                      className={errors.retailPrice ? "border-destructive" : ""}
                    />
                  ),
                })}
                {fieldRow({
                  label: `Wholesale Price (${currencySymbol})`,
                  children: (
                    <Input
                      data-ocid="product.wholesale_price.input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.wholesalePrice}
                      onChange={(e) =>
                        setForm({ wholesalePrice: e.target.value })
                      }
                      placeholder="0.00"
                    />
                  ),
                })}
              </div>

              {/* Auto-costing section */}
              <div className="bg-muted/40 border border-border rounded-lg p-3 space-y-2.5">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Stock Info &amp; Cost Breakdown
                </div>

                {/* Supplier Dropdown + Price Compare */}
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Supplier (Optional)
                  </Label>
                  <div className="flex gap-2">
                    <select
                      data-ocid="product.supplier.select"
                      value={form.supplierId}
                      onChange={(e) => {
                        const sid = e.target.value;
                        const sup = suppliers.find((s) => s.id === sid);
                        const patch: Partial<ProductFormState> = {
                          supplierId: sid,
                        };
                        if (sup?.defaultTransportCharge) {
                          patch.transportCost = sup.defaultTransportCharge;
                        }
                        setForm(patch);
                      }}
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">-- No Supplier --</option>
                      {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.businessType})
                          {s.defaultTransportCharge
                            ? ` — Transport: ${s.defaultTransportCharge}`
                            : ""}
                        </option>
                      ))}
                    </select>
                    {isEdit && editProduct && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        data-ocid="product.price_compare.button"
                        className="shrink-0 gap-1.5 h-10 text-xs whitespace-nowrap"
                        onClick={async () => {
                          setPriceCompareLoading(true);
                          setShowPriceCompare(true);
                          try {
                            const purchases =
                              await api.getLastNPurchasesForProduct(
                                shopId,
                                editProduct.id,
                                BigInt(3),
                              );
                            setPriceComparePurchases(purchases);
                          } finally {
                            setPriceCompareLoading(false);
                          }
                        }}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                        Compare
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {fieldRow({
                    label: `Purchase Price (${currencySymbol})`,
                    error: errors.costPrice,
                    children: (
                      <Input
                        data-ocid="product.purchase_price.input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.costPrice}
                        onChange={(e) => setForm({ costPrice: e.target.value })}
                        placeholder="0.00"
                        className={errors.costPrice ? "border-destructive" : ""}
                      />
                    ),
                  })}
                  {fieldRow({
                    label: `Transport Cost (${currencySymbol})`,
                    children: (
                      <Input
                        data-ocid="product.transport_cost.input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.transportCost}
                        onChange={(e) =>
                          setForm({ transportCost: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    ),
                  })}
                  {fieldRow({
                    label: `Labour Cost (${currencySymbol})`,
                    children: (
                      <Input
                        data-ocid="product.labour_cost.input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.labourCost}
                        onChange={(e) =>
                          setForm({ labourCost: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    ),
                  })}
                </div>
                <div className="flex items-center justify-between bg-card border border-primary/30 rounded-md px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    Total Cost Price (auto)
                  </span>
                  <span
                    className="text-base font-bold text-primary"
                    data-ocid="product.total_cost_price.display"
                  >
                    {currencySymbol}
                    {(
                      (Number(form.costPrice) || 0) +
                      (Number(form.transportCost) || 0) +
                      (Number(form.labourCost) || 0)
                    ).toFixed(2)}
                  </span>
                </div>
                {/* Cost Per Unit — auto = totalCost / stock */}
                <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-md px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    Cost Per Unit (auto)
                  </span>
                  <span
                    className="text-base font-bold text-primary/80"
                    data-ocid="product.cost_per_unit.display"
                  >
                    {(() => {
                      const totalCost =
                        (Number(form.costPrice) || 0) +
                        (Number(form.transportCost) || 0) +
                        (Number(form.labourCost) || 0);
                      const qty = Number(form.stock) || 0;
                      if (qty <= 0 || totalCost <= 0) return "—";
                      return `${currencySymbol}${(totalCost / qty).toFixed(2)}`;
                    })()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {fieldRow({
                  label: "Stock Quantity",
                  error: errors.stock,
                  children: (
                    <Input
                      data-ocid="product.stock.input"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={(e) => setForm({ stock: e.target.value })}
                      placeholder="0"
                    />
                  ),
                })}
                {fieldRow({
                  label: "Min Stock Level",
                  children: (
                    <Input
                      data-ocid="product.min_stock.input"
                      type="number"
                      min="0"
                      value={form.minStock}
                      onChange={(e) => setForm({ minStock: e.target.value })}
                      placeholder="5"
                    />
                  ),
                })}
                {fieldRow({
                  label: "Unit",
                  children: (
                    <Input
                      data-ocid="product.unit.input"
                      value={form.unit}
                      onChange={(e) => setForm({ unit: e.target.value })}
                      placeholder="PCS"
                    />
                  ),
                })}
              </div>
              {fieldRow({
                label: "Category",
                children: (
                  <Input
                    data-ocid="product.category.input"
                    value={form.category}
                    onChange={(e) => setForm({ category: e.target.value })}
                    placeholder="e.g. Smartphones, Medicines, etc."
                  />
                ),
              })}
            </div>

            {/* Profit Preview — uses costPerUnit (totalCost / stock) as base */}
            {(() => {
              const totalCost =
                (Number(form.costPrice) || 0) +
                (Number(form.transportCost) || 0) +
                (Number(form.labourCost) || 0);
              const qty = Number(form.stock) || 0;
              const costPerUnit =
                qty > 0 && totalCost > 0 ? totalCost / qty : totalCost;
              const retail = Number(form.retailPrice) || 0;
              if (!retail || costPerUnit <= 0) return null;
              const margin = retail - costPerUnit;
              const marginPct = (margin / retail) * 100;
              return (
                <div className="flex gap-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
                  <div>
                    <span className="text-muted-foreground">Margin/Unit: </span>
                    <span
                      className={`font-semibold ${margin >= 0 ? "text-green-700" : "text-red-600"}`}
                    >
                      {currencySymbol}
                      {margin.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margin %: </span>
                    <span
                      className={`font-semibold ${marginPct >= 0 ? "text-green-700" : "text-red-600"}`}
                    >
                      {marginPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })()}

            <div className="flex gap-3 pt-1 border-t border-border">
              {errors.submit && (
                <div
                  className="w-full flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2 mb-1"
                  data-ocid="product_modal.error_state"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errors.submit}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                data-ocid="product_modal.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                data-ocid="product_modal.submit_button"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Save Changes"
                    : "Add Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Price Comparison Modal */}
      {showPriceCompare && (
        <Dialog open onOpenChange={() => setShowPriceCompare(false)}>
          <DialogContent className="max-w-lg" data-ocid="price_compare.dialog">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-primary" />
                Price Comparison — Last 3 Purchases
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              {priceCompareLoading ? (
                <div
                  className="space-y-2"
                  data-ocid="price_compare.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-muted/40 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : priceComparePurchases.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="price_compare.empty_state"
                >
                  <GitCompare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    No purchase history yet for this product.
                  </p>
                  <p className="text-xs mt-1 opacity-70">
                    Add supplier purchases to enable price comparison.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(() => {
                    const cheapestIdx = priceComparePurchases.reduce(
                      (minI, p, i) =>
                        Number(p.purchase.purchasePrice) +
                          Number(p.purchase.transportCharge) <
                        Number(
                          priceComparePurchases[minI].purchase.purchasePrice,
                        ) +
                          Number(
                            priceComparePurchases[minI].purchase
                              .transportCharge,
                          )
                          ? i
                          : minI,
                      0,
                    );
                    return priceComparePurchases.map((item, idx) => {
                      const purchaseDate = new Date(
                        Number(item.purchase.purchaseDate) / 1_000_000,
                      ).toLocaleDateString();
                      const totalCost =
                        (Number(item.purchase.purchasePrice) || 0) +
                        (Number(item.purchase.transportCharge) || 0);
                      const isCheapest = idx === cheapestIdx;
                      return (
                        <div
                          key={item.purchase.id}
                          data-ocid={`price_compare.item.${idx + 1}`}
                          className={`border rounded-xl p-3 space-y-2 ${
                            isCheapest
                              ? "border-green-400 bg-green-50/60"
                              : "border-border bg-card"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                {item.supplierName}
                              </span>
                              {isCheapest && (
                                <span className="text-xs bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded-full">
                                  💰 Cheapest
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {purchaseDate}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-muted/40 rounded-lg p-2">
                              <p className="text-xs text-muted-foreground">
                                Purchase
                              </p>
                              <p className="font-bold text-sm">
                                {item.purchase.purchasePrice}
                              </p>
                            </div>
                            <div className="bg-muted/40 rounded-lg p-2">
                              <p className="text-xs text-muted-foreground">
                                Transport
                              </p>
                              <p className="font-bold text-sm">
                                {item.purchase.transportCharge || "0"}
                              </p>
                            </div>
                            <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
                              <p className="text-xs text-muted-foreground">
                                Total
                              </p>
                              <p className="font-bold text-sm text-primary">
                                {totalCost.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Qty: {item.purchase.quantity}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant={isCheapest ? "default" : "outline"}
                              data-ocid={`price_compare.select.${idx + 1}`}
                              className="h-8 text-xs"
                              onClick={() => {
                                setForm({
                                  supplierId: item.purchase.supplierId,
                                  costPrice: item.purchase.purchasePrice,
                                  transportCost:
                                    item.purchase.transportCharge || "0",
                                });
                                toast.success(
                                  `Filled from ${item.supplierName}`,
                                );
                                setShowPriceCompare(false);
                              }}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPriceCompare(false)}
                className="w-full"
                data-ocid="price_compare.close_button"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {showBarcodeScanner && (
        <BarcodeScanModal
          onScanned={handleBarcodeScanned}
          onClose={() => setShowBarcodeScanner(false)}
        />
      )}
    </>
  );
}

// ─── Barcode Scan Modal ───────────────────────────────────────────────────────

type BarcodeScanModalProps = {
  onScanned: (barcode: string) => void;
  onClose: () => void;
};

function BarcodeScanModal({ onScanned, onClose }: BarcodeScanModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const detectorRef = useRef<InstanceType<
    NonNullable<Window["BarcodeDetector"]>
  > | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      if (!window.BarcodeDetector) {
        setError("camera_unsupported");
        return;
      }
      try {
        detectorRef.current = new window.BarcodeDetector({
          formats: [
            "ean_13",
            "ean_8",
            "code_128",
            "code_39",
            "qr_code",
            "upc_a",
            "upc_e",
            "itf",
          ],
        });
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (cancelled) {
          for (const track of stream.getTracks()) track.stop();
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setScanning(true);
        scanLoop();
      } catch {
        if (!cancelled) setError("camera_denied");
      }
    }

    async function scanLoop() {
      if (cancelled || !detectorRef.current || !videoRef.current) return;
      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length > 0 && !cancelled) {
          cleanup();
          onScanned(codes[0].rawValue);
          return;
        }
      } catch {
        // continue scanning
      }
      if (!cancelled) rafRef.current = requestAnimationFrame(scanLoop);
    }

    function cleanup() {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current)
        for (const track of streamRef.current.getTracks()) track.stop();
    }

    startCamera();
    return cleanup;
  }, [onScanned]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      data-ocid="product.barcode_scanner_modal"
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                Scan Barcode
              </p>
              <p className="text-xs text-muted-foreground">
                Point camera at product barcode
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
            aria-label="Close scanner"
            data-ocid="product.barcode_scanner_modal.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4 space-y-4">
          {error === "camera_unsupported" ? (
            <div className="text-center py-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Camera scanner not supported
              </p>
              <p className="text-xs text-muted-foreground">
                Your browser doesn&apos;t support the Barcode Detection API. Use
                manual entry below.
              </p>
            </div>
          ) : error === "camera_denied" ? (
            <div className="text-center py-4 space-y-2">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Camera access denied
              </p>
              <p className="text-xs text-muted-foreground">
                Allow camera permission in your browser settings, then try
                again.
              </p>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-28 border-2 border-primary/80 rounded-lg relative">
                  <span className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl" />
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr" />
                  <span className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-4 border-r-4 border-primary rounded-br" />
                  {scanning && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-primary animate-scan-line" />
                  )}
                </div>
              </div>
              {!scanning && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Or enter barcode manually
            </p>
            <div className="flex gap-2">
              <Input
                id="manual-barcode-input"
                placeholder="e.g. 8901234567890"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && manualBarcode.trim())
                    onScanned(manualBarcode.trim());
                }}
                className="flex-1 h-10 text-sm font-mono"
                autoComplete="off"
                data-ocid="product.barcode_manual_input"
              />
              <Button
                type="button"
                onClick={() =>
                  manualBarcode.trim() && onScanned(manualBarcode.trim())
                }
                disabled={!manualBarcode.trim()}
                className="h-10 px-4 gap-1.5"
                data-ocid="product.barcode_manual_submit"
              >
                <Search className="w-4 h-4" />
                Find
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Get expiry date from any product type ────────────────────────────────────

function getProductExpiryDate(product: ProductView): string {
  const ef = product.engineFields;
  if (ef.__kind__ === "Medical") return ef.Medical.expiryDate;
  // AgroProducts uses plain string expiry (not [] | [string])
  if (ef.__kind__ === "AgroProducts") return ef.AgroProducts.expiryDate ?? "";
  // For all other types, expiryDate is optional ([] | [string])
  const fields = (ef as { [K in string]: unknown })[ef.__kind__] as {
    expiryDate?: [] | [string];
  } | null;
  if (!fields) return "";
  const opt = fields.expiryDate;
  if (Array.isArray(opt) && opt.length > 0) return opt[0] as string;
  return "";
}

// ─── Product Row (desktop) ────────────────────────────────────────────────────

function ProductRow({
  product,
  idx,
  currency,
  expiryThresholdDays,
  onEdit,
  onDelete,
  onQuickStock,
  onAdjustStock,
  onView,
}: {
  product: ProductView;
  idx: number;
  currency: string;
  expiryThresholdDays: number;
  onEdit: (p: ProductView) => void;
  onDelete: (p: ProductView) => void;
  onQuickStock: (p: ProductView, delta: number) => void;
  onAdjustStock: (p: ProductView) => void;
  onView: (p: ProductView) => void;
}) {
  const isLow = product.stock <= product.minStock;
  // Check expiry for all types
  const expiryDate = getProductExpiryDate(product);
  const isExpiring = expiryDate
    ? isNearExpiry(expiryDate, expiryThresholdDays)
    : false;

  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors"
      data-ocid={`product.item.${idx}`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="min-w-0">
            <button
              type="button"
              className="font-medium text-foreground text-sm truncate max-w-[200px] hover:text-primary hover:underline text-left"
              onClick={() => onView(product)}
              data-ocid={`product.view_button.${idx}`}
            >
              {product.name}
            </button>
            <p className="text-xs text-muted-foreground truncate">
              {product.category || "—"}
            </p>
          </div>
          {isLow && (
            <Badge variant="destructive" className="text-xs shrink-0">
              Low Stock
            </Badge>
          )}
          {isExpiring && (
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs shrink-0">
              Near Expiry
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
        {product.unit}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-foreground">
        {formatCurrency(product.retailPrice, currency)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-ocid={`product.stock_minus.${idx}`}
            onClick={() => onQuickStock(product, -1)}
            className="w-7 h-7 rounded border border-input flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span
            className={`text-sm font-bold min-w-[2.5rem] text-center ${isLow ? "text-destructive" : "text-foreground"}`}
          >
            {product.stock}
          </span>
          <button
            type="button"
            data-ocid={`product.stock_plus.${idx}`}
            onClick={() => onQuickStock(product, 1)}
            className="w-7 h-7 rounded border border-input flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onEdit(product)}
            data-ocid={`product.edit_button.${idx}`}
            className="h-8 w-8"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-ocid={`product.more_button.${idx}`}
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-ocid={`product.dropdown_menu.${idx}`}
            >
              <DropdownMenuItem
                onClick={() => onView(product)}
                data-ocid={`product.view_details.${idx}`}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAdjustStock(product)}
                data-ocid={`product.adjust_stock.${idx}`}
              >
                Adjust Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(product)}
                className="text-destructive"
                data-ocid={`product.delete_button.${idx}`}
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

// ─── Product Card (mobile) ────────────────────────────────────────────────────

function ProductCard({
  product,
  idx,
  currency,
  expiryThresholdDays,
  onEdit,
  onDelete,
  onQuickStock,
  onAdjustStock,
  onView,
}: {
  product: ProductView;
  idx: number;
  currency: string;
  expiryThresholdDays: number;
  onEdit: (p: ProductView) => void;
  onDelete: (p: ProductView) => void;
  onQuickStock: (p: ProductView, delta: number) => void;
  onAdjustStock: (p: ProductView) => void;
  onView: (p: ProductView) => void;
}) {
  const isLow = product.stock <= product.minStock;
  const expiryDate = getProductExpiryDate(product);
  const isExpiring = expiryDate
    ? isNearExpiry(expiryDate, expiryThresholdDays)
    : false;

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 space-y-3"
      data-ocid={`product.card.${idx}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="font-semibold text-foreground truncate block w-full text-left hover:text-primary"
            onClick={() => onView(product)}
            data-ocid={`product.card_view.${idx}`}
          >
            {product.name}
          </button>
          <p className="text-xs text-muted-foreground">
            {product.category || product.unit}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isLow && (
            <Badge variant="destructive" className="text-xs">
              Low
            </Badge>
          )}
          {isExpiring && (
            <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
              Expiring
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-ocid={`product.card_more.${idx}`}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onView(product)}
                data-ocid={`product.card_view.${idx}`}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(product)}
                data-ocid={`product.card_edit.${idx}`}
              >
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAdjustStock(product)}
                data-ocid={`product.card_adjust.${idx}`}
              >
                Adjust Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(product)}
                className="text-destructive"
                data-ocid={`product.card_delete.${idx}`}
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-foreground text-lg">
          {formatCurrency(product.retailPrice, currency)}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-ocid={`product.card_minus.${idx}`}
            onClick={() => onQuickStock(product, -1)}
            className="w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors active:scale-95"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span
            className={`text-base font-bold min-w-[2.5rem] text-center ${isLow ? "text-destructive" : "text-foreground"}`}
          >
            {product.stock}
          </span>
          <button
            type="button"
            data-ocid={`product.card_plus.${idx}`}
            onClick={() => onQuickStock(product, 1)}
            className="w-8 h-8 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ProductsPage ─────────────────────────────────────────────────────────

export function ProductsPage() {
  const api = useApi();
  const navigate = useNavigate();
  const shopConfig = useStore((s) => s.shopConfig);
  const activeShopId = useStore((s) => s.activeShopId);
  // Cast shopType to allow frontend-only BuildingMaterial and FruitsVegetables values
  const shopType = (shopConfig?.shopType ?? ShopType.General) as
    | ShopType
    | typeof BUILDING_MATERIAL_SHOP_TYPE
    | typeof FRUITS_VEGETABLES_SHOP_TYPE;
  const currency = shopConfig?.currency ?? "INR";
  const expiryThresholdDays = Number(
    (shopConfig as { expiryAlertThresholdDays?: bigint })
      ?.expiryAlertThresholdDays ?? BigInt(90),
  );

  const [products, setProducts] = useState<ProductView[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showModal, setShowModal] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductView | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductView | null>(null);
  const [stockAdjustTarget, setStockAdjustTarget] =
    useState<ProductView | null>(null);
  const [viewProduct, setViewProduct] = useState<ProductView | null>(null);
  // Metal rates state (only used for Jewelry shops)
  const [metalRates, setMetalRates] = useState<MetalRates | null>(null);
  const [metalRatesLoading, setMetalRatesLoading] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const loadProducts = useCallback(async () => {
    if (!api.ready) return;
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5000);
    try {
      const [data, supplierList] = await Promise.all([
        api.listProducts({ isActive: true }),
        api.listSuppliersByShop(activeShopId ?? shopConfig?.shopName ?? ""),
      ]);
      if (!cancelled) {
        setProducts(data);
        setSuppliers(supplierList);
      }
    } finally {
      clearTimeout(timeout);
      if (!cancelled) setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [api, activeShopId, shopConfig?.shopName]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  // ── Metal Rates (Jewelry shop only) ──────────────────────────────────────
  // Fallback approximate rates shown when API is unavailable (PKR market)
  const FALLBACK_RATES = { gold24k: 6200, gold22k: 5683, silver: 75 } as const;

  // retryTimerRef: track the retry setTimeout so we can cancel on unmount
  const metalRateRetryTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // loadMetalRates: stable callback that only depends on api.
  // Retry logic uses a ref-captured version of itself to avoid stale closures.
  const loadMetalRatesRef = useRef<(retryCount?: number) => Promise<void>>(
    async () => {},
  );

  const loadMetalRates = useCallback(
    async (retryCount = 0): Promise<void> => {
      if (!api.ready) return;
      if (retryCount === 0) setMetalRatesLoading(true);
      try {
        // Try cached rates first
        const rates = await api.getMetalRates();
        if (rates.available) {
          setMetalRates(rates);
          setMetalRatesLoading(false);
          return;
        }
        // Trigger a backend refresh then re-fetch
        try {
          await api.refreshMetalRates();
        } catch {
          // ignore refresh failure
        }
        const freshRates = await api.getMetalRates();
        if (freshRates.available) {
          setMetalRates(freshRates);
          setMetalRatesLoading(false);
          return;
        }
        // Retry up to 3 times with 3-second delays using the ref version
        if (retryCount < 3) {
          setMetalRates(freshRates); // show unavailable with fallback UI
          if (metalRateRetryTimer.current)
            clearTimeout(metalRateRetryTimer.current);
          metalRateRetryTimer.current = setTimeout(
            () => void loadMetalRatesRef.current(retryCount + 1),
            3000,
          );
          return;
        }
        // All retries exhausted — show unavailable (fallback rates shown in UI)
        setMetalRates(freshRates);
      } catch {
        setMetalRates({
          gold24k: 0,
          gold22k: 0,
          silver: 0,
          lastUpdated: BigInt(0),
          available: false,
          isStale: false,
        });
        if (retryCount < 3) {
          if (metalRateRetryTimer.current)
            clearTimeout(metalRateRetryTimer.current);
          metalRateRetryTimer.current = setTimeout(
            () => void loadMetalRatesRef.current(retryCount + 1),
            3000,
          );
        }
      } finally {
        if (retryCount >= 3) setMetalRatesLoading(false);
      }
    },
    [api],
  );

  // Keep the ref in sync so retry closures always call the latest version
  useEffect(() => {
    loadMetalRatesRef.current = loadMetalRates;
  }, [loadMetalRates]);

  // Cleanup retry timer on unmount
  useEffect(() => {
    return () => {
      if (metalRateRetryTimer.current)
        clearTimeout(metalRateRetryTimer.current);
    };
  }, []);

  const handleRefreshRates = async () => {
    if (!api.ready) return;
    setMetalRatesLoading(true);
    try {
      await api.refreshMetalRates();
      const rates = await api.getMetalRates();
      setMetalRates(rates);
      if (rates.available) {
        toast.success("Metal rates updated successfully");
      } else {
        toast.info(
          "Live rates unavailable — using fallback rates. Enter manually if needed.",
        );
      }
    } catch {
      toast.error("Could not refresh rates. Enter rates manually.");
    } finally {
      setMetalRatesLoading(false);
    }
  };

  // Trigger metal rates load when shopType changes to Jewelry OR when api becomes ready
  useEffect(() => {
    if (shopType === ShopType.Jewelry && api.ready) {
      void loadMetalRates(0);
    }
  }, [shopType, api.ready, loadMetalRates]);

  // Debounced search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (!searchTerm.trim()) {
      void loadProducts();
      return;
    }
    let cancelled = false;
    searchTimer.current = setTimeout(async () => {
      setLoading(true);
      // 5-second safety timeout for search
      const timeout = setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, 5000);
      try {
        const results = await api.searchProducts(
          activeShopId ?? shopConfig?.shopName ?? "",
          searchTerm,
        );
        if (!cancelled) setProducts(results);
      } finally {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [searchTerm, api, loadProducts, shopConfig, activeShopId]);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  const filteredSorted = useMemo(() => {
    let list = [...products];
    if (filterCategory)
      list = list.filter((p) => p.category === filterCategory);
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "stock") cmp = a.stock - b.stock;
      else if (sortField === "price") cmp = a.retailPrice - b.retailPrice;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [products, filterCategory, sortField, sortDir]);

  const handleSave = async (
    input: CreateProductInput | UpdateProductInput,
    isEdit: boolean,
    supplierId: string,
  ) => {
    // Barcode duplicate detection (non-blocking warning toast)
    const barcodeVal = (input as CreateProductInput & { barcode?: string })
      .barcode;
    if (barcodeVal) {
      const existing = products.find(
        (p) =>
          (p as ProductView & { barcode?: string }).barcode === barcodeVal &&
          (!isEdit || p.id !== (input as UpdateProductInput).id),
      );
      if (existing) {
        toast.warning(
          `⚠️ Barcode already used by "${existing.name}" — saved anyway.`,
          {
            duration: 6000,
          },
        );
      }
    }
    if (!activeShopId) {
      toast.error("Shop not loaded. Please wait.");
      return;
    }
    try {
      if (isEdit) {
        await api.updateProduct(input as UpdateProductInput);
        if (supplierId) {
          try {
            const upd = input as UpdateProductInput;
            await api.createSupplierPurchase(
              activeShopId ?? shopConfig?.shopName ?? "",
              supplierId,
              upd.id,
              upd.stock ?? 0,
              String(upd.costPrice ?? 0),
              upd.transportCost ? String(upd.transportCost) : "0",
              null,
            );
          } catch {
            console.warn("Could not record supplier purchase on update");
          }
        }
        toast.success("Product updated successfully");
      } else {
        const created = await api.createProduct(input as CreateProductInput);
        if (supplierId && created) {
          try {
            const inp = input as CreateProductInput;
            await api.createSupplierPurchase(
              inp.shopId,
              supplierId,
              created.id,
              inp.stock,
              String(inp.costPrice),
              inp.transportCost ? String(inp.transportCost) : "0",
              null,
            );
          } catch {
            console.warn("Could not record supplier purchase");
          }
        }
        toast.success("Product added successfully");
      }
      setShowModal(false);
      setEditProduct(null);
      void loadProducts();
    } catch (err) {
      console.error("handleSave error:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      toast.error(`Failed to save product: ${errMsg}`);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await api.deleteProduct(deleteTarget.id);
    toast.success(`"${deleteTarget.name}" deleted`);
    setDeleteTarget(null);
    void loadProducts();
  };

  const handleQuickStock = async (product: ProductView, delta: number) => {
    if (!activeShopId) {
      toast.error("Shop not loaded. Please wait.");
      return;
    }
    const newStock = Math.max(0, product.stock + delta);
    const input: UpdateProductInput = {
      id: product.id,
      shopId: activeShopId,
      name: product.name,
      category: product.category,
      unit: product.unit,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      costPrice: product.costPrice,
      stock: newStock,
      minStock: product.minStock,
      isActive: product.isActive,
      engineFields: product.engineFields,
    };
    await api.updateProduct(input);
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p)),
    );
  };

  const handleStockAdjust = async (
    id: bigint,
    newStock: number,
    _note: string,
  ) => {
    if (!activeShopId) {
      toast.error("Shop not loaded. Please wait.");
      return;
    }
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const input: UpdateProductInput = {
      id: product.id,
      shopId: activeShopId,
      name: product.name,
      category: product.category,
      unit: product.unit,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      costPrice: product.costPrice,
      stock: newStock,
      minStock: product.minStock,
      isActive: product.isActive,
      engineFields: product.engineFields,
    };
    await api.updateProduct(input);
    toast.success("Stock adjusted");
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)),
    );
  };

  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Products
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {products.length} items · {shopType}
              {lowStockCount > 0 && (
                <span className="ml-2 text-destructive font-medium">
                  {lowStockCount} low stock
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void navigate({ to: "/bulk-entry" })}
              className="gap-2 shrink-0 flex"
              data-ocid="product.bulk_entry_button"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Bulk Entry</span>
            </Button>
            {shopType === ShopType.Restaurant && (
              <button
                type="button"
                onClick={() => setShowQuickMenu(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Quick Menu
              </button>
            )}
            <Button
              type="button"
              onClick={() => {
                if (!activeShopId) return;
                setEditProduct(null);
                setShowModal(true);
              }}
              disabled={!activeShopId}
              className="gap-2 shrink-0"
              data-ocid="product.add_button"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border px-4 py-3 md:px-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="product.search_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-9 h-10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {categories.length > 0 && (
            <div className="relative">
              <select
                data-ocid="product.filter_category.select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none min-w-[140px]"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          )}
          <div className="relative">
            <select
              data-ocid="product.sort.select"
              value={`${sortField}-${sortDir}`}
              onChange={(e) => {
                const [f, d] = e.target.value.split("-");
                setSortField(f as SortField);
                setSortDir(d as SortDir);
              }}
              className="h-10 pl-3 pr-8 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none min-w-[140px]"
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="stock-asc">Stock: Low–High</option>
              <option value="stock-desc">Stock: High–Low</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 space-y-4">
        {/* Live Metal Rates Card — Jewelry shops only */}
        {shopType === ShopType.Jewelry && (
          <div
            className="bg-card border border-border rounded-xl p-4"
            data-ocid="jewelry.metal_rates.card"
          >
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">
                  Live Metal Rates
                </h3>
                {/* Stale warning badge */}
                {(metalRates?.isStale ||
                  (!metalRates?.available &&
                    metalRates?.lastUpdated &&
                    metalRates.lastUpdated > BigInt(0))) && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-300"
                    data-ocid="jewelry.rates.stale_badge"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {metalRates?.lastUpdated &&
                    metalRates.lastUpdated > BigInt(0)
                      ? `Stale — Last: ${new Date(Number(metalRates.lastUpdated) / 1_000_000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Purani Rate"}
                  </span>
                )}
                {/* Fresh last-updated time (not stale) */}
                {metalRates?.lastUpdated &&
                  metalRates.lastUpdated > BigInt(0) &&
                  !metalRates?.isStale &&
                  metalRates.available && (
                    <span className="text-xs text-muted-foreground">
                      · Updated{" "}
                      {new Date(
                        Number(metalRates.lastUpdated) / 1_000_000,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRefreshRates}
                disabled={metalRatesLoading}
                data-ocid="jewelry.refresh_rates.button"
                className="gap-1.5 h-8 text-xs"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    metalRatesLoading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
            </div>

            {metalRatesLoading && !metalRates ? (
              <div
                className="flex gap-4"
                data-ocid="jewelry.rates.loading_state"
              >
                <div className="h-16 flex-1 bg-muted/40 rounded-lg animate-pulse" />
                <div className="h-16 flex-1 bg-muted/40 rounded-lg animate-pulse" />
              </div>
            ) : metalRates?.available ? (
              <div className="grid grid-cols-2 gap-3">
                {/* Gold card — dual 22K / 24K rows */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 space-y-1.5">
                  <p className="text-xs text-amber-700 font-medium uppercase tracking-wide">
                    Gold / gram
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-amber-600 font-semibold">
                      24K Pure
                    </span>
                    <span className="text-lg font-bold text-amber-800">
                      {getCurrencyConfig(currency).symbol}
                      {Math.round(metalRates.gold24k).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-amber-200 pt-1">
                    <span className="text-xs text-amber-600 font-semibold">
                      22K
                    </span>
                    <span className="text-base font-bold text-amber-700">
                      {getCurrencyConfig(currency).symbol}
                      {Math.round(metalRates.gold22k).toLocaleString()}
                    </span>
                  </div>
                </div>
                {/* Silver card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                  <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-0.5">
                    Silver / gram
                  </p>
                  <p className="text-xl font-bold text-slate-700">
                    {getCurrencyConfig(currency).symbol}
                    {metalRates.silver.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">99.9% Fine</p>
                </div>
              </div>
            ) : (
              <div data-ocid="jewelry.rates.error_state" className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 opacity-70 space-y-1.5">
                    <p className="text-xs text-amber-700 font-medium uppercase tracking-wide">
                      Gold / gram (est.)
                    </p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-amber-600 font-semibold">
                        24K
                      </span>
                      <span className="text-lg font-bold text-amber-800">
                        {getCurrencyConfig(currency).symbol}
                        {FALLBACK_RATES.gold24k.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-amber-200 pt-1">
                      <span className="text-xs text-amber-600 font-semibold">
                        22K
                      </span>
                      <span className="text-base font-bold text-amber-700">
                        {getCurrencyConfig(currency).symbol}
                        {FALLBACK_RATES.gold22k.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 opacity-70">
                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-0.5">
                      Silver / gram (est.)
                    </p>
                    <p className="text-xl font-bold text-slate-700">
                      {getCurrencyConfig(currency).symbol}
                      {FALLBACK_RATES.silver.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">99.9% Fine</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {metalRatesLoading
                    ? "Fetching live rates..."
                    : "Showing approximate rates — click Refresh for live rates or enter manually"}
                </div>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="space-y-3" data-ocid="product.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 bg-muted/40 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredSorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="product.empty_state"
          >
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-1">
              {searchTerm || filterCategory
                ? "No products found"
                : "No products yet"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              {searchTerm || filterCategory
                ? "Try a different search or filter"
                : "Add your first product to get started managing inventory"}
            </p>
            {!searchTerm && !filterCategory && (
              <Button
                type="button"
                onClick={() => {
                  if (!activeShopId) return;
                  setEditProduct(null);
                  setShowModal(true);
                }}
                disabled={!activeShopId}
                data-ocid="product.empty_add_button"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add First Product
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Unit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Retail Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Stock
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSorted.map((p, i) => (
                    <ProductRow
                      key={String(p.id)}
                      product={p}
                      idx={i + 1}
                      currency={currency}
                      expiryThresholdDays={expiryThresholdDays}
                      onEdit={(product) => {
                        setEditProduct(product);
                        setShowModal(true);
                      }}
                      onDelete={setDeleteTarget}
                      onQuickStock={handleQuickStock}
                      onAdjustStock={setStockAdjustTarget}
                      onView={setViewProduct}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filteredSorted.map((p, i) => (
                <ProductCard
                  key={String(p.id)}
                  product={p}
                  idx={i + 1}
                  currency={currency}
                  expiryThresholdDays={expiryThresholdDays}
                  onEdit={(product) => {
                    setEditProduct(product);
                    setShowModal(true);
                  }}
                  onDelete={setDeleteTarget}
                  onQuickStock={handleQuickStock}
                  onAdjustStock={setStockAdjustTarget}
                  onView={setViewProduct}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Detail View Modal */}
      {viewProduct && (
        <ProductDetailModal
          product={viewProduct}
          currency={currency}
          onClose={() => setViewProduct(null)}
          onEdit={() => {
            setEditProduct(viewProduct);
            setShowModal(true);
            setViewProduct(null);
          }}
        />
      )}

      {/* Add/Edit Modal */}
      {showModal && activeShopId && (
        <ProductModal
          shopType={shopType}
          editProduct={editProduct}
          currency={currency}
          metalRates={metalRates}
          shopId={activeShopId}
          suppliers={suppliers}
          products={products}
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          onSave={handleSave}
        />
      )}

      {showQuickMenu && shopConfig && (
        <RestaurantQuickMenuModal
          shopId={shopConfig.shopName}
          shopType={shopConfig.shopType as ShopType}
          onClose={() => setShowQuickMenu(false)}
          onProductsAdded={loadProducts}
          products={products}
          onUpdateProduct={async (input) => {
            await api.updateProduct(input);
            await loadProducts();
          }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="product.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>"{deleteTarget?.name}"</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="product.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="product.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Stock Adjust Dialog */}
      {stockAdjustTarget && (
        <StockAdjustDialog
          product={stockAdjustTarget}
          onClose={() => setStockAdjustTarget(null)}
          onAdjust={handleStockAdjust}
        />
      )}
    </div>
  );
}
