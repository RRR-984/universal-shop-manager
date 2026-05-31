import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Info,
  Loader2,
  Search,
  Store,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useApi } from "../lib/api";
import { applyRTL, isRTL, setLanguage, t } from "../lib/i18n";
import { useStore } from "../lib/store";
import { cn } from "../lib/utils";
import {
  BUILDING_MATERIAL_SHOP_TYPE,
  FRUITS_VEGETABLES_SHOP_TYPE,
} from "../types";
import {
  DateFormat,
  Language,
  NumberFormat,
  ShopType,
  TaxSystem,
} from "../types";
import type { ShopConfig } from "../types";

// ─── Top suggested countries (shown prominently at top) ──────────────────────

const SUGGESTED_COUNTRY_CODES = ["PK", "IN", "US", "GB", "AE", "SA", "BD"];

// ─── Country Data ────────────────────────────────────────────────────────────

type CountryData = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  taxSystem: TaxSystem;
  taxRate: number;
  dateFormat: DateFormat;
  numberFormat: NumberFormat;
  language: Language;
};

const COUNTRIES: CountryData[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    taxSystem: TaxSystem.GST,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.Indian,
    language: Language.Hindi,
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    taxSystem: TaxSystem.SalesTax,
    taxRate: 8,
    dateFormat: DateFormat.MMDDYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    taxSystem: TaxSystem.VAT,
    taxRate: 20,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    currency: "AED",
    taxSystem: TaxSystem.VAT,
    taxRate: 5,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    taxSystem: TaxSystem.VAT,
    taxRate: 7.5,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    currency: "BRL",
    taxSystem: TaxSystem.Generic,
    taxRate: 12,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Portuguese,
  },
  {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    currency: "IDR",
    taxSystem: TaxSystem.VAT,
    taxRate: 11,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.BahasaIndonesia,
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    currency: "ZAR",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    currency: "KES",
    taxSystem: TaxSystem.VAT,
    taxRate: 16,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Swahili,
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 19,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 20,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    taxSystem: TaxSystem.Generic,
    taxRate: 17,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Urdu,
  },
  {
    code: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    currency: "BDT",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Bengali,
  },
  {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    taxSystem: TaxSystem.VAT,
    taxRate: 12,
    dateFormat: DateFormat.MMDDYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    currency: "MYR",
    taxSystem: TaxSystem.Generic,
    taxRate: 6,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.BahasaIndonesia,
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    currency: "GHS",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    currency: "ETB",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "TZ",
    name: "Tanzania",
    flag: "🇹🇿",
    currency: "TZS",
    taxSystem: TaxSystem.VAT,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Swahili,
  },
  {
    code: "UG",
    name: "Uganda",
    flag: "🇺🇬",
    currency: "UGX",
    taxSystem: TaxSystem.VAT,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    currency: "EGP",
    taxSystem: TaxSystem.VAT,
    taxRate: 14,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "TR",
    name: "Turkey",
    flag: "🇹🇷",
    currency: "TRY",
    taxSystem: TaxSystem.VAT,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    currency: "MXN",
    taxSystem: TaxSystem.VAT,
    taxRate: 16,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Spanish,
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    currency: "ARS",
    taxSystem: TaxSystem.VAT,
    taxRate: 21,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Spanish,
  },
  {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    currency: "COP",
    taxSystem: TaxSystem.VAT,
    taxRate: 19,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Spanish,
  },
  {
    code: "ES",
    name: "Spain",
    flag: "🇪🇸",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 21,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Spanish,
  },
  {
    code: "IT",
    name: "Italy",
    flag: "🇮🇹",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 22,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 21,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    currency: "EUR",
    taxSystem: TaxSystem.VAT,
    taxRate: 21,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "PL",
    name: "Poland",
    flag: "🇵🇱",
    currency: "PLN",
    taxSystem: TaxSystem.VAT,
    taxRate: 23,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "SE",
    name: "Sweden",
    flag: "🇸🇪",
    currency: "SEK",
    taxSystem: TaxSystem.VAT,
    taxRate: 25,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "NO",
    name: "Norway",
    flag: "🇳🇴",
    currency: "NOK",
    taxSystem: TaxSystem.VAT,
    taxRate: 25,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    taxSystem: TaxSystem.Generic,
    taxRate: 10,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    currency: "NZD",
    taxSystem: TaxSystem.Generic,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    taxSystem: TaxSystem.SalesTax,
    taxRate: 13,
    dateFormat: DateFormat.MMDDYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    currency: "JPY",
    taxSystem: TaxSystem.Generic,
    taxRate: 10,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    currency: "KRW",
    taxSystem: TaxSystem.VAT,
    taxRate: 10,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    taxSystem: TaxSystem.Generic,
    taxRate: 9,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    currency: "THB",
    taxSystem: TaxSystem.VAT,
    taxRate: 7,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    currency: "VND",
    taxSystem: TaxSystem.VAT,
    taxRate: 10,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "CM",
    name: "Cameroon",
    flag: "🇨🇲",
    currency: "XAF",
    taxSystem: TaxSystem.VAT,
    taxRate: 19.25,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "SN",
    name: "Senegal",
    flag: "🇸🇳",
    currency: "XOF",
    taxSystem: TaxSystem.VAT,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    currency: "XOF",
    taxSystem: TaxSystem.VAT,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.French,
  },
  {
    code: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    currency: "MAD",
    taxSystem: TaxSystem.VAT,
    taxRate: 20,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "DZ",
    name: "Algeria",
    flag: "🇩🇿",
    currency: "DZD",
    taxSystem: TaxSystem.VAT,
    taxRate: 19,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "IQ",
    name: "Iraq",
    flag: "🇮🇶",
    currency: "IQD",
    taxSystem: TaxSystem.Generic,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "QA",
    name: "Qatar",
    flag: "🇶🇦",
    currency: "QAR",
    taxSystem: TaxSystem.Generic,
    taxRate: 5,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    currency: "KWD",
    taxSystem: TaxSystem.Generic,
    taxRate: 0,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.Arabic,
  },
  {
    code: "LK",
    name: "Sri Lanka",
    flag: "🇱🇰",
    currency: "LKR",
    taxSystem: TaxSystem.VAT,
    taxRate: 15,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
  {
    code: "NP",
    name: "Nepal",
    flag: "🇳🇵",
    currency: "NPR",
    taxSystem: TaxSystem.VAT,
    taxRate: 13,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.Indian,
    language: Language.Hindi,
  },
  {
    code: "OTHER",
    name: "Other Country",
    flag: "🌍",
    currency: "USD",
    taxSystem: TaxSystem.Generic,
    taxRate: 10,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.International,
    language: Language.English,
  },
];

// ─── Language Data ────────────────────────────────────────────────────────────

type LangEntry = {
  value: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  rtl: boolean;
};

const LANGUAGES: LangEntry[] = [
  {
    value: Language.English,
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    rtl: false,
  },
  {
    value: Language.Hindi,
    label: "Hindi",
    nativeLabel: "हिंदी",
    flag: "🇮🇳",
    rtl: false,
  },
  {
    value: Language.Arabic,
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇸🇦",
    rtl: true,
  },
  {
    value: Language.French,
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    rtl: false,
  },
  {
    value: Language.Spanish,
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
    rtl: false,
  },
  {
    value: Language.Portuguese,
    label: "Portuguese",
    nativeLabel: "Português",
    flag: "🇧🇷",
    rtl: false,
  },
  {
    value: Language.Swahili,
    label: "Swahili",
    nativeLabel: "Kiswahili",
    flag: "🇰🇪",
    rtl: false,
  },
  {
    value: Language.BahasaIndonesia,
    label: "Bahasa Indonesia",
    nativeLabel: "Bahasa Indonesia",
    flag: "🇮🇩",
    rtl: false,
  },
  {
    value: Language.Bengali,
    label: "Bengali",
    nativeLabel: "বাংলা",
    flag: "🇧🇩",
    rtl: false,
  },
  {
    value: Language.Urdu,
    label: "Urdu",
    nativeLabel: "اردو",
    flag: "🇵🇰",
    rtl: true,
  },
];

// ─── Shop Type Data ───────────────────────────────────────────────────────────

type ShopTypeEntry = {
  value: ShopType;
  label: string;
  icon: string;
  engine: string;
  description: string;
};

const SHOP_TYPES: ShopTypeEntry[] = [
  {
    value: ShopType.Mobile,
    label: "Mobile Shop",
    icon: "📱",
    engine: "IMEI Engine",
    description: "Track by IMEI, 15-digit unique validation",
  },
  {
    value: ShopType.Electronics,
    label: "Electronics",
    icon: "💻",
    engine: "Serial Engine",
    description: "Serial numbers, warranty tracking",
  },
  {
    value: ShopType.Medical,
    label: "Pharmacy / Medical",
    icon: "💊",
    engine: "Batch + Expiry Engine",
    description: "FEFO, near-expiry alerts, batch tracking",
  },
  {
    value: ShopType.Clothing,
    label: "Clothing / Fashion",
    icon: "👕",
    engine: "Size Variant Engine",
    description: "XS–XXXL size variants, color stock",
  },
  {
    value: ShopType.Footwear,
    label: "Footwear",
    icon: "👟",
    engine: "Size + Pair Engine",
    description: "UK/EU/US size systems, pair stock",
  },
  {
    value: ShopType.Grocery,
    label: "Grocery / Supermarket",
    icon: "🛒",
    engine: "Weight Engine",
    description: "KG/GM/Litre, decimal quantities",
  },
  {
    value: ShopType.Stationery,
    label: "Stationery",
    icon: "📚",
    engine: "Type Based Engine",
    description: "Books, notebooks, pens auto-named",
  },
  {
    value: ShopType.Restaurant,
    label: "Restaurant / Food",
    icon: "🍽️",
    engine: "Menu Engine",
    description: "Veg/Non-Veg categories, KOT support",
  },
  {
    value: ShopType.AutoParts,
    label: "Auto Parts",
    icon: "🔧",
    engine: "Vehicle Mapping Engine",
    description: "Vehicle brand-model compatibility",
  },
  {
    value: ShopType.Hardware,
    label: "Hardware Store",
    icon: "🏗️",
    engine: "SKU Engine",
    description: "Flexible SKU, bulk item tracking",
  },
  {
    value: ShopType.Jewelry,
    label: "Jewelry",
    icon: "💍",
    engine: "Weight + Purity Engine",
    description: "Gold/silver gram + karat, live rates",
  },
  {
    value: ShopType.Salon,
    label: "Salon / Service",
    icon: "✂️",
    engine: "Service + Duration Engine",
    description: "Service history, appointment tracking",
  },
  {
    value: ShopType.General,
    label: "General Store",
    icon: "🏪",
    engine: "Basic Engine",
    description: "Works for any shop type — fully flexible",
  },
  {
    value: BUILDING_MATERIAL_SHOP_TYPE as unknown as ShopType,
    label: "Building Material",
    icon: "🏗️",
    engine: "Material Engine",
    description:
      "Cement, bricks, steel, tiles, paint, pipes, wood & all construction materials",
  },
  {
    value: ShopType.AgroProducts,
    label: "Agro Products",
    icon: "🌾",
    engine: "Agro Engine",
    description: "Seeds, fertilizers, pesticides, crop tools, animal feed",
  },
  {
    value: ShopType.FruitsVegetables,
    label: "Fruits & Vegetables",
    icon: "🍎",
    engine: "Fresh Produce Engine",
    description:
      "Fresh fruits, vegetables, herbs, dry fruits, and seasonal produce",
  },
  {
    value: ShopType.Electrical,
    label: "Electrical Shop",
    icon: "⚡",
    engine: "Electrical Engine",
    description:
      "Switches, boards, wiring, cables, MCB, LED, fans & more — AMP/wattage tracking",
  },
];

const TAX_LABEL: Record<TaxSystem, string> = {
  [TaxSystem.GST]: "GST (India)",
  [TaxSystem.SalesTax]: "Sales Tax",
  [TaxSystem.VAT]: "VAT",
  [TaxSystem.Generic]: "Generic Tax",
};

const STEP_TITLES = [
  "Country",
  "Language",
  "Shop Info",
  "Shop Type",
  "Summary",
];

// ─── Auto-detect country from browser ────────────────────────────────────────

function detectCountryFromBrowser(): string {
  const lang = navigator.language || "en-US";
  const parts = lang.split("-");
  if (parts.length >= 2) {
    const regionCode = parts[parts.length - 1].toUpperCase();
    const match = COUNTRIES.find((c) => c.code === regionCode);
    if (match) return match.code;
  }
  return "IN";
}

// ─── Default config ───────────────────────────────────────────────────────────

function buildDefaultConfig(): ShopConfig {
  const code = detectCountryFromBrowser();
  const country = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
  return {
    isSetupComplete: false,
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    shopEmail: "",
    country: country.code,
    currency: country.currency,
    language: country.language,
    taxSystem: country.taxSystem,
    taxRate: country.taxRate,
    shopType: ShopType.General,
    dateFormat: country.dateFormat,
    numberFormat: country.numberFormat,
    expiryAlertThresholdDays: BigInt(90),
    minStockAlertEnabled: true,
    deadStockAlertDays: BigInt(180),
  };
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, config: ShopConfig): boolean {
  if (step === 2) return config.shopName.trim().length >= 2;
  return true;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SetupPage() {
  // Detect add mode via ?mode=add query param
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = useSearch({ strict: false }) as Record<string, unknown>;
  const isAddMode = search?.mode === "add";

  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [config, setConfig] = useState<ShopConfig>(buildDefaultConfig);
  const [countrySearch, setCountrySearch] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const { identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { saveShopConfig } = useApi();
  const { setShopConfig, setIsSetupComplete, addShop } = useStore();

  useEffect(() => {
    if (loginStatus === "initializing") return; // Wait for II to resolve
    if (isAddMode) return; // "Add shop" mode always shows the wizard
    // Check usm-is-registered FIRST (synchronous, always reliable)
    if (localStorage.getItem("usm-is-registered") === "true") {
      void navigate({ to: "/dashboard" });
      return;
    }
    if (!identity) return; // Not logged in yet — wait
    const principal = identity.getPrincipal().toText();
    if (
      localStorage.getItem(`usm-reg-${principal}`) === "true" ||
      localStorage.getItem("usm-setup-done") === "true"
    ) {
      // Already registered — navigate to dashboard
      void navigate({ to: "/dashboard" });
    }
  }, [identity, isAddMode, loginStatus, navigate]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateConfig = (patch: Partial<ShopConfig>) =>
    setConfig((prev) => ({ ...prev, ...patch }));

  const handleCountrySelect = (code: string) => {
    const c = COUNTRIES.find((x) => x.code === code);
    if (!c) return;
    updateConfig({
      country: code,
      currency: c.currency,
      taxSystem: c.taxSystem,
      taxRate: c.taxRate,
      dateFormat: c.dateFormat,
      numberFormat: c.numberFormat,
      language: c.language,
    });
  };

  const handleLanguageSelect = (lang: Language) => {
    updateConfig({ language: lang });
    applyRTL(lang);
    setLanguage(lang);
  };

  const handleShopNameBlur = () => {
    if (
      config.shopName.trim().length > 0 &&
      config.shopName.trim().length < 2
    ) {
      setShopNameError("Shop name must be at least 2 characters");
    } else {
      setShopNameError("");
    }
  };

  const handleFinish = async () => {
    const finalConfig: ShopConfig = { ...config, isSetupComplete: true };

    if (isAddMode) {
      try {
        addShop(finalConfig);
      } catch {
        // addShop failure is non-fatal
      }
      void navigate({ to: "/dashboard" });
      return;
    }

    setIsSaving(true);

    // ── STEP 1: Write THREE localStorage markers SYNCHRONOUSLY (before everything else) ──
    // These are the single source of truth. Written first so they survive any crash.
    const principalText = identity?.getPrincipal().toText();
    if (principalText) {
      localStorage.setItem(`usm-reg-${principalText}`, "true");
    }
    localStorage.setItem("usm-setup-done", "true");
    localStorage.setItem("usm-is-registered", "true");
    // Navigation flag: App.tsx reads this on mount and hard-redirects to /dashboard.
    // This avoids ALL React Router/state race conditions.
    localStorage.setItem("usm-nav-to-dashboard", "true");

    // ── STEP 2: Update Zustand store synchronously ────────────────────────────
    setShopConfig(finalConfig);
    setIsSetupComplete(true);

    // ── STEP 3: Fire backend save in background — do NOT await ────────────────
    // localStorage + Zustand are already committed. Navigation happens immediately.
    void saveShopConfig(finalConfig).catch(() => {
      // Non-fatal — localStorage is already committed
    });

    // ── STEP 4: Hard redirect to /dashboard ──────────────────────────────────
    // Use window.location.href (NOT React Router navigate) to get a clean page
    // reload. App.tsx reads usm-nav-to-dashboard on mount and redirects again
    // synchronously, but having it here too ensures the redirect always fires.
    // The hard reload means React re-mounts with all localStorage flags already set,
    // eliminating every race condition.
    window.location.href = "/dashboard";
  };

  // Focus search when entering step 0
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [step]);

  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q),
    );
  }, [countrySearch]);

  const selectedCountry = COUNTRIES.find((c) => c.code === config.country);
  const selectedLang = LANGUAGES.find((l) => l.value === config.language);
  const selectedShopType = SHOP_TYPES.find((s) => s.value === config.shopType);
  const canProceed = validateStep(step, config);
  const rtlSelected = isRTL(config.language);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top brand bar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 shadow-sm">
        {isAddMode && (
          <button
            type="button"
            data-ocid="setup.back_to_dashboard_button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {!isAddMode && (
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-display text-base font-bold text-foreground leading-tight">
            {isAddMode ? "Add New Shop" : "Universal Shop System"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isAddMode
              ? "Set up a new shop — under 2 minutes"
              : "Quick setup — under 2 minutes"}
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant="secondary" className="text-xs font-medium">
            {t("step")} {step + 1}/{STEP_TITLES.length}
          </Badge>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-lg">
          {/* Progress Bar */}
          <div className="mb-6" data-ocid="setup.step_progress">
            {/* Step pills */}
            <div className="flex items-center gap-1 mb-3">
              {STEP_TITLES.map((label, i) => (
                <div
                  key={label}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                        i < step
                          ? "bg-primary border-primary text-primary-foreground"
                          : i === step
                            ? "bg-primary border-primary text-primary-foreground scale-110 shadow-md"
                            : "bg-background border-border text-muted-foreground",
                      )}
                    >
                      {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-medium hidden sm:block whitespace-nowrap",
                        i === step
                          ? "text-primary font-bold"
                          : i < step
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_TITLES.length - 1 && (
                    <div className="flex-1 h-0.5 mx-1 mt-[-14px] rounded-full transition-all duration-500">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          i < step ? "bg-primary w-full" : "bg-border w-full",
                        )}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Linear progress track */}
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Card */}
          <div className="bg-card border border-border rounded-2xl shadow-sm">
            {/* ── STEP 0: Country ── */}
            {step === 0 && (
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-bold text-foreground">
                    {t("selectCountry")}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Auto-sets currency, tax system &amp; suggested language
                </p>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    ref={searchInputRef}
                    data-ocid="setup.country_search.input"
                    placeholder="Search country or currency..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="pl-9 text-sm"
                  />
                </div>

                {/* Selected country summary */}
                {selectedCountry && (
                  <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 mb-3">
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-primary">
                        {selectedCountry.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {selectedCountry.currency} ·{" "}
                        {TAX_LABEL[selectedCountry.taxSystem]} (
                        {selectedCountry.taxRate}%)
                      </span>
                    </div>
                  </div>
                )}

                {/* Country grid */}
                {filteredCountries.length === 0 ? (
                  <div className="col-span-2 text-center py-6 text-muted-foreground text-sm">
                    No country found for &ldquo;{countrySearch}&rdquo;
                  </div>
                ) : countrySearch.trim() ? (
                  /* Search results — flat list */
                  <div className="grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto pr-0.5 -mr-0.5">
                    {filteredCountries.map((c) => (
                      <CountryButton
                        key={c.code}
                        c={c}
                        selected={config.country === c.code}
                        onSelect={handleCountrySelect}
                      />
                    ))}
                  </div>
                ) : (
                  /* No search — show suggested + all */
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-0.5 -mr-0.5">
                    {/* Suggested */}
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-0.5">
                        Suggested
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SUGGESTED_COUNTRY_CODES.map((code) => {
                          const c = COUNTRIES.find((x) => x.code === code);
                          if (!c) return null;
                          return (
                            <CountryButton
                              key={c.code}
                              c={c}
                              selected={config.country === c.code}
                              onSelect={handleCountrySelect}
                            />
                          );
                        })}
                      </div>
                    </div>
                    {/* All countries */}
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-0.5">
                        All Countries
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {COUNTRIES.filter(
                          (c) => !SUGGESTED_COUNTRY_CODES.includes(c.code),
                        ).map((c) => (
                          <CountryButton
                            key={c.code}
                            c={c}
                            selected={config.country === c.code}
                            onSelect={handleCountrySelect}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 1: Language ── */}
            {step === 1 && (
              <div className="p-5">
                <h2 className="font-display text-lg font-bold text-foreground mb-1">
                  {t("selectLanguage")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  All buttons, labels &amp; messages will translate
                </p>

                {/* Suggested from country */}
                {selectedCountry &&
                  selectedCountry.language !== Language.English && (
                    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 mb-3">
                      <Info className="w-4 h-4 text-accent flex-shrink-0" />
                      <p className="text-xs text-foreground">
                        Suggested for <strong>{selectedCountry.name}</strong>:{" "}
                        <strong>
                          {
                            LANGUAGES.find(
                              (l) => l.value === selectedCountry.language,
                            )?.label
                          }
                        </strong>
                      </p>
                    </div>
                  )}

                {/* RTL hint */}
                {rtlSelected && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      RTL (right-to-left) layout will be applied — text flows
                      right to left
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      type="button"
                      data-ocid={`setup.language.${lang.value.toLowerCase()}`}
                      onClick={() => handleLanguageSelect(lang.value)}
                      className={cn(
                        "flex flex-col items-start gap-1 px-3 py-3 rounded-xl border text-left transition-all duration-200 min-h-[72px]",
                        config.language === lang.value
                          ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-secondary",
                      )}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-xl">{lang.flag}</span>
                        <div className="min-w-0 flex-1">
                          <div
                            className={cn(
                              "text-sm font-semibold leading-tight",
                              config.language === lang.value
                                ? "text-primary"
                                : "text-foreground",
                            )}
                          >
                            {lang.nativeLabel}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {lang.label}
                          </div>
                        </div>
                        {config.language === lang.value && (
                          <Check className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                        )}
                      </div>
                      {lang.rtl && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] h-4 px-1"
                        >
                          RTL
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 2: Shop Info ── */}
            {step === 2 && (
              <div className="p-5">
                <h2 className="font-display text-lg font-bold text-foreground mb-1">
                  {t("shopName")} &amp; Info
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Shown on all bills and invoices
                </p>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="shopName"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("shopName")}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="shopName"
                      data-ocid="setup.shop_name.input"
                      placeholder="e.g. Raj Electronics, Green Pharmacy..."
                      value={config.shopName}
                      onChange={(e) => {
                        updateConfig({ shopName: e.target.value });
                        if (
                          shopNameError &&
                          e.target.value.trim().length >= 2
                        ) {
                          setShopNameError("");
                        }
                      }}
                      onBlur={handleShopNameBlur}
                      className={cn(
                        "mt-1.5",
                        shopNameError
                          ? "border-destructive focus-visible:ring-destructive"
                          : "",
                      )}
                    />
                    {shopNameError && (
                      <p
                        data-ocid="setup.shop_name.field_error"
                        className="text-xs text-destructive mt-1"
                      >
                        {shopNameError}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 2 characters required
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="shopAddress"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("shopAddress")}
                    </Label>
                    <Textarea
                      id="shopAddress"
                      data-ocid="setup.shop_address.input"
                      placeholder="Street, City, State, PIN/ZIP code"
                      value={config.shopAddress}
                      onChange={(e) =>
                        updateConfig({ shopAddress: e.target.value })
                      }
                      className="mt-1.5 resize-none"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="shopPhone"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("shopPhone")}
                    </Label>
                    <Input
                      id="shopPhone"
                      data-ocid="setup.shop_phone.input"
                      type="tel"
                      placeholder={
                        selectedCountry?.code === "IN"
                          ? "+91 98765 43210"
                          : selectedCountry?.code === "US"
                            ? "+1 (555) 000-0000"
                            : "+XX XXXXXXXXXX"
                      }
                      value={config.shopPhone}
                      onChange={(e) =>
                        updateConfig({ shopPhone: e.target.value })
                      }
                      className="mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Include country code for WhatsApp sharing
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="shopEmail"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("shopEmail")}{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="shopEmail"
                      data-ocid="setup.shop_email.input"
                      type="email"
                      placeholder="shop@example.com"
                      value={config.shopEmail}
                      onChange={(e) =>
                        updateConfig({ shopEmail: e.target.value })
                      }
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Shop Type ── */}
            {step === 3 && (
              <div className="p-5">
                <h2 className="font-display text-lg font-bold text-foreground mb-1">
                  {t("selectShopType")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Loads the right inventory engine for your shop
                </p>

                <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-0.5 -mr-0.5">
                  {SHOP_TYPES.map((st) => (
                    <button
                      key={st.value}
                      type="button"
                      data-ocid={`setup.shop_type.${st.value.toLowerCase()}`}
                      onClick={() => updateConfig({ shopType: st.value })}
                      className={cn(
                        "text-left px-3 py-3 rounded-xl border transition-all duration-200 flex flex-col gap-1 min-h-[80px]",
                        config.shopType === st.value
                          ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-secondary",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl flex-shrink-0">{st.icon}</span>
                        <span
                          className={cn(
                            "text-sm font-semibold truncate leading-tight",
                            config.shopType === st.value
                              ? "text-primary"
                              : "text-foreground",
                          )}
                        >
                          {st.label}
                        </span>
                        {config.shopType === st.value && (
                          <Check className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-primary" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                        {st.description}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[9px] h-4 px-1 w-fit border",
                          config.shopType === st.value
                            ? "border-primary/30 text-primary"
                            : "border-border",
                        )}
                      >
                        {st.engine}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 4: Summary ── */}
            {step === 4 && (
              <div className="p-5">
                <div className="text-center mb-5">
                  <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1">
                    Everything looks great!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Review your setup and start using the app
                  </p>
                </div>

                <div className="space-y-2 bg-muted/30 rounded-xl p-4 mb-4">
                  <SummaryRow
                    icon="🏪"
                    label="Shop Name"
                    value={config.shopName || "—"}
                  />
                  {config.shopAddress && (
                    <SummaryRow
                      icon="📍"
                      label="Address"
                      value={config.shopAddress}
                    />
                  )}
                  {config.shopPhone && (
                    <SummaryRow
                      icon="📞"
                      label="Phone"
                      value={config.shopPhone}
                    />
                  )}
                  <SummaryRow
                    icon={selectedCountry?.flag ?? "🌍"}
                    label="Country"
                    value={selectedCountry?.name ?? config.country}
                  />
                  <SummaryRow
                    icon="💰"
                    label="Currency"
                    value={config.currency}
                  />
                  <SummaryRow
                    icon={selectedLang?.flag ?? "🌐"}
                    label="Language"
                    value={
                      selectedLang
                        ? `${selectedLang.nativeLabel} (${selectedLang.label})`
                        : config.language
                    }
                  />
                  <SummaryRow
                    icon="🧾"
                    label="Tax System"
                    value={`${TAX_LABEL[config.taxSystem]} — ${config.taxRate}%`}
                  />
                  <SummaryRow
                    icon={selectedShopType?.icon ?? "🏪"}
                    label="Shop Type"
                    value={selectedShopType?.label ?? config.shopType}
                  />
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  You can change all settings later in the{" "}
                  <span className="text-primary font-medium">Settings</span>{" "}
                  page
                </p>
                <p className="text-center text-xs text-muted-foreground mt-4 font-medium tracking-wide">
                  Powered by{" "}
                  <span className="text-primary font-semibold">
                    FIFO Bridge
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mt-4">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                data-ocid="setup.back_button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 min-h-[44px] px-5"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("back")}
              </Button>
            ) : (
              <div />
            )}

            <div className="flex-1" />

            {step < STEP_TITLES.length - 1 ? (
              <Button
                type="button"
                data-ocid="setup.next_button"
                disabled={!canProceed}
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 min-h-[44px] px-6 font-semibold"
              >
                {t("next")}
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                data-ocid="setup.finish_button"
                onClick={() => {
                  void handleFinish();
                }}
                disabled={isSaving}
                className="flex items-center gap-2 min-h-[44px] px-6 font-semibold bg-primary hover:bg-primary/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    {isAddMode ? "Add Shop" : "Start Using App"}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Disabled next hint */}
          {!canProceed && step === 2 && (
            <p
              className="text-center text-xs text-muted-foreground mt-2"
              data-ocid="setup.validation_hint"
            >
              Enter shop name (min 2 characters) to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Country Button Helper ────────────────────────────────────────────────────

function CountryButton({
  c,
  selected,
  onSelect,
}: {
  c: CountryData;
  selected: boolean;
  onSelect: (code: string) => void;
}) {
  return (
    <button
      key={c.code}
      type="button"
      data-ocid={`setup.country.${c.code.toLowerCase()}`}
      onClick={() => onSelect(c.code)}
      className={cn(
        "text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 min-h-[44px]",
        selected
          ? "border-primary bg-primary/8 text-primary shadow-sm ring-1 ring-primary/20"
          : "border-border hover:border-primary/40 hover:bg-secondary",
      )}
    >
      <span className="text-base flex-shrink-0">{c.flag}</span>
      <div className="min-w-0">
        <div className="truncate font-medium text-xs sm:text-sm">{c.name}</div>
        <div className="text-[10px] text-muted-foreground">{c.currency}</div>
      </div>
      {selected && (
        <Check className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-primary" />
      )}
    </button>
  );
}

// ─── Summary Row Helper ───────────────────────────────────────────────────────

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1.5 border-b border-border/40 last:border-0">
      <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
      <span className="text-sm text-muted-foreground w-24 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground flex-1 min-w-0 break-words">
        {value}
      </span>
    </div>
  );
}
