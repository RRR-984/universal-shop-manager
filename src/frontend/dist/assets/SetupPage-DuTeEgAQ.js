import { u as useSearch, r as reactExports, a as useInternetIdentity, b as useNavigate, c as useApi, d as useStore, L as Language, N as NumberFormat, D as DateFormat, T as TaxSystem, S as ShopType, i as isRTL, j as jsxRuntimeExports, B as Badge, t, C as Check, e as cn, f as Button, g as ChevronLeft, h as ChevronRight, k as LoaderCircle, l as applyRTL, s as setLanguage } from "./index-CzjOXAKV.js";
import { I as Input } from "./input-BEbbIodm.js";
import { L as Label } from "./label-8vErBWyE.js";
import { T as Textarea } from "./textarea-M4JaZmIi.js";
import { B as BUILDING_MATERIAL_SHOP_TYPE } from "./index-GRrUhcmE.js";
import { A as ArrowLeft } from "./arrow-left-7sMf1dvH.js";
import { S as Store } from "./store-BURSvrZW.js";
import { G as Globe } from "./globe-D6zTc5gW.js";
import { S as Search } from "./search-KhBJ38lW.js";
import { I as Info } from "./info-Cv3kUYeu.js";
const SUGGESTED_COUNTRY_CODES = ["PK", "IN", "US", "GB", "AE", "SA", "BD"];
const COUNTRIES = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    taxSystem: TaxSystem.GST,
    taxRate: 18,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.Indian,
    language: Language.Hindi
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
    language: Language.English
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
    language: Language.English
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
    language: Language.Arabic
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
    language: Language.Arabic
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
    language: Language.English
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
    language: Language.Portuguese
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
    language: Language.BahasaIndonesia
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
    language: Language.English
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
    language: Language.Swahili
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
    language: Language.French
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
    language: Language.French
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
    language: Language.Urdu
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
    language: Language.Bengali
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
    language: Language.English
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
    language: Language.BahasaIndonesia
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
    language: Language.English
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
    language: Language.English
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
    language: Language.Swahili
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
    language: Language.English
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
    language: Language.Arabic
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
    language: Language.English
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
    language: Language.Spanish
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
    language: Language.Spanish
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
    language: Language.Spanish
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
    language: Language.Spanish
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
    language: Language.English
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
    language: Language.English
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
    language: Language.French
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.English
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
    language: Language.French
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
    language: Language.French
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
    language: Language.French
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
    language: Language.Arabic
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
    language: Language.Arabic
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
    language: Language.Arabic
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
    language: Language.Arabic
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
    language: Language.Arabic
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
    language: Language.English
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
    language: Language.Hindi
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
    language: Language.English
  }
];
const LANGUAGES = [
  {
    value: Language.English,
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    rtl: false
  },
  {
    value: Language.Hindi,
    label: "Hindi",
    nativeLabel: "हिंदी",
    flag: "🇮🇳",
    rtl: false
  },
  {
    value: Language.Arabic,
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇸🇦",
    rtl: true
  },
  {
    value: Language.French,
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    rtl: false
  },
  {
    value: Language.Spanish,
    label: "Spanish",
    nativeLabel: "Español",
    flag: "🇪🇸",
    rtl: false
  },
  {
    value: Language.Portuguese,
    label: "Portuguese",
    nativeLabel: "Português",
    flag: "🇧🇷",
    rtl: false
  },
  {
    value: Language.Swahili,
    label: "Swahili",
    nativeLabel: "Kiswahili",
    flag: "🇰🇪",
    rtl: false
  },
  {
    value: Language.BahasaIndonesia,
    label: "Bahasa Indonesia",
    nativeLabel: "Bahasa Indonesia",
    flag: "🇮🇩",
    rtl: false
  },
  {
    value: Language.Bengali,
    label: "Bengali",
    nativeLabel: "বাংলা",
    flag: "🇧🇩",
    rtl: false
  },
  {
    value: Language.Urdu,
    label: "Urdu",
    nativeLabel: "اردو",
    flag: "🇵🇰",
    rtl: true
  }
];
const SHOP_TYPES = [
  {
    value: ShopType.Mobile,
    label: "Mobile Shop",
    icon: "📱",
    engine: "IMEI Engine",
    description: "Track by IMEI, 15-digit unique validation"
  },
  {
    value: ShopType.Electronics,
    label: "Electronics",
    icon: "💻",
    engine: "Serial Engine",
    description: "Serial numbers, warranty tracking"
  },
  {
    value: ShopType.Medical,
    label: "Pharmacy / Medical",
    icon: "💊",
    engine: "Batch + Expiry Engine",
    description: "FEFO, near-expiry alerts, batch tracking"
  },
  {
    value: ShopType.Clothing,
    label: "Clothing / Fashion",
    icon: "👕",
    engine: "Size Variant Engine",
    description: "XS–XXXL size variants, color stock"
  },
  {
    value: ShopType.Footwear,
    label: "Footwear",
    icon: "👟",
    engine: "Size + Pair Engine",
    description: "UK/EU/US size systems, pair stock"
  },
  {
    value: ShopType.Grocery,
    label: "Grocery / Supermarket",
    icon: "🛒",
    engine: "Weight Engine",
    description: "KG/GM/Litre, decimal quantities"
  },
  {
    value: ShopType.Stationery,
    label: "Stationery",
    icon: "📚",
    engine: "Type Based Engine",
    description: "Books, notebooks, pens auto-named"
  },
  {
    value: ShopType.Restaurant,
    label: "Restaurant / Food",
    icon: "🍽️",
    engine: "Menu Engine",
    description: "Veg/Non-Veg categories, KOT support"
  },
  {
    value: ShopType.AutoParts,
    label: "Auto Parts",
    icon: "🔧",
    engine: "Vehicle Mapping Engine",
    description: "Vehicle brand-model compatibility"
  },
  {
    value: ShopType.Hardware,
    label: "Hardware Store",
    icon: "🏗️",
    engine: "SKU Engine",
    description: "Flexible SKU, bulk item tracking"
  },
  {
    value: ShopType.Jewelry,
    label: "Jewelry",
    icon: "💍",
    engine: "Weight + Purity Engine",
    description: "Gold/silver gram + karat, live rates"
  },
  {
    value: ShopType.Salon,
    label: "Salon / Service",
    icon: "✂️",
    engine: "Service + Duration Engine",
    description: "Service history, appointment tracking"
  },
  {
    value: ShopType.General,
    label: "General Store",
    icon: "🏪",
    engine: "Basic Engine",
    description: "Works for any shop type — fully flexible"
  },
  {
    value: BUILDING_MATERIAL_SHOP_TYPE,
    label: "Building Material",
    icon: "🏗️",
    engine: "Material Engine",
    description: "Cement, bricks, steel, tiles, paint, pipes, wood & all construction materials"
  },
  {
    value: ShopType.AgroProducts,
    label: "Agro Products",
    icon: "🌾",
    engine: "Agro Engine",
    description: "Seeds, fertilizers, pesticides, crop tools, animal feed"
  },
  {
    value: ShopType.FruitsVegetables,
    label: "Fruits & Vegetables",
    icon: "🍎",
    engine: "Fresh Produce Engine",
    description: "Fresh fruits, vegetables, herbs, dry fruits, and seasonal produce"
  },
  {
    value: ShopType.Electrical,
    label: "Electrical Shop",
    icon: "⚡",
    engine: "Electrical Engine",
    description: "Switches, boards, wiring, cables, MCB, LED, fans & more — AMP/wattage tracking"
  }
];
const TAX_LABEL = {
  [TaxSystem.GST]: "GST (India)",
  [TaxSystem.SalesTax]: "Sales Tax",
  [TaxSystem.VAT]: "VAT",
  [TaxSystem.Generic]: "Generic Tax"
};
const STEP_TITLES = [
  "Country",
  "Language",
  "Shop Info",
  "Shop Type",
  "Summary"
];
function detectCountryFromBrowser() {
  const lang = navigator.language || "en-US";
  const parts = lang.split("-");
  if (parts.length >= 2) {
    const regionCode = parts[parts.length - 1].toUpperCase();
    const match = COUNTRIES.find((c) => c.code === regionCode);
    if (match) return match.code;
  }
  return "IN";
}
function buildDefaultConfig() {
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
    deadStockAlertDays: BigInt(180)
  };
}
function validateStep(step, config) {
  if (step === 2) return config.shopName.trim().length >= 2;
  return true;
}
function SetupPage() {
  var _a;
  const search = useSearch({ strict: false });
  const isAddMode = (search == null ? void 0 : search.mode) === "add";
  const [step, setStep] = reactExports.useState(0);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [config, setConfig] = reactExports.useState(buildDefaultConfig);
  const [countrySearch, setCountrySearch] = reactExports.useState("");
  const [shopNameError, setShopNameError] = reactExports.useState("");
  const { identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { saveShopConfig } = useApi();
  const { setShopConfig, setIsSetupComplete, addShop } = useStore();
  reactExports.useEffect(() => {
    console.log("[Auth] SetupPage registration guard:", {
      loginStatus,
      principalText: identity == null ? void 0 : identity.getPrincipal().toText(),
      isRegistered: identity ? localStorage.getItem(`usm-reg-${identity.getPrincipal().toText()}`) : null,
      usmSetupDone: localStorage.getItem("usm-setup-done")
    });
    if (loginStatus === "initializing") return;
    if (isAddMode) return;
    if (!identity) return;
    const principal = identity.getPrincipal().toText();
    if (localStorage.getItem(`usm-reg-${principal}`) === "true" || localStorage.getItem("usm-setup-done") === "true") {
      console.log("[Auth] Already registered, redirecting to dashboard");
      window.location.replace("/");
    }
  }, [identity, isAddMode, loginStatus]);
  const searchInputRef = reactExports.useRef(null);
  const updateConfig = (patch) => setConfig((prev) => ({ ...prev, ...patch }));
  const handleCountrySelect = (code) => {
    const c = COUNTRIES.find((x) => x.code === code);
    if (!c) return;
    updateConfig({
      country: code,
      currency: c.currency,
      taxSystem: c.taxSystem,
      taxRate: c.taxRate,
      dateFormat: c.dateFormat,
      numberFormat: c.numberFormat,
      language: c.language
    });
  };
  const handleLanguageSelect = (lang) => {
    updateConfig({ language: lang });
    applyRTL(lang);
    setLanguage(lang);
  };
  const handleShopNameBlur = () => {
    if (config.shopName.trim().length > 0 && config.shopName.trim().length < 2) {
      setShopNameError("Shop name must be at least 2 characters");
    } else {
      setShopNameError("");
    }
  };
  const handleFinish = async () => {
    const finalConfig = { ...config, isSetupComplete: true };
    if (isAddMode) {
      try {
        addShop(finalConfig);
      } catch {
      }
      void navigate({ to: "/dashboard" });
      return;
    }
    console.log("[SetupWizard] handleFinish called");
    setIsSaving(true);
    const principalText = identity == null ? void 0 : identity.getPrincipal().toText();
    if (principalText) {
      localStorage.setItem(`usm-reg-${principalText}`, "true");
    }
    localStorage.setItem("usm-setup-done", "true");
    console.log("[SetupWizard] localStorage markers written:", {
      "usm-reg": principalText ? localStorage.getItem(`usm-reg-${principalText}`) : null,
      "usm-setup-done": localStorage.getItem("usm-setup-done")
    });
    setShopConfig(finalConfig);
    setIsSetupComplete(true);
    console.log("[SetupWizard] Zustand state updated");
    try {
      const savePromise = saveShopConfig(finalConfig);
      const timeoutPromise = new Promise(
        (resolve) => setTimeout(resolve, 15e3)
      );
      await Promise.race([savePromise, timeoutPromise]);
      console.log("[SetupWizard] Backend save complete");
    } catch (err) {
      console.warn("[SetupWizard] Backend save failed (continuing):", err);
    }
    console.log("[SetupWizard] Navigating to dashboard via hard reload");
    window.location.replace("/");
  };
  reactExports.useEffect(() => {
    if (step === 0) {
      setTimeout(() => {
        var _a2;
        return (_a2 = searchInputRef.current) == null ? void 0 : _a2.focus();
      }, 100);
    }
  }, [step]);
  const filteredCountries = reactExports.useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES;
    const q = countrySearch.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.currency.toLowerCase().includes(q)
    );
  }, [countrySearch]);
  const selectedCountry = COUNTRIES.find((c) => c.code === config.country);
  const selectedLang = LANGUAGES.find((l) => l.value === config.language);
  const selectedShopType = SHOP_TYPES.find((s) => s.value === config.shopType);
  const canProceed = validateStep(step, config);
  const rtlSelected = isRTL(config.language);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 py-3 flex items-center gap-3 shadow-sm", children: [
      isAddMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "setup.back_to_dashboard_button",
          onClick: () => navigate({ to: "/dashboard" }),
          className: "w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors flex-shrink-0",
          "aria-label": "Back to dashboard",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      !isAddMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-base font-bold text-foreground leading-tight", children: isAddMode ? "Add New Shop" : "Universal Shop Manager" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isAddMode ? "Set up a new shop — under 2 minutes" : "Quick setup — under 2 minutes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs font-medium", children: [
        t("step"),
        " ",
        step + 1,
        "/",
        STEP_TITLES.length
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "setup.step_progress", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-3", children: STEP_TITLES.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center flex-1 last:flex-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                      i < step ? "bg-primary border-primary text-primary-foreground" : i === step ? "bg-primary border-primary text-primary-foreground scale-110 shadow-md" : "bg-background border-border text-muted-foreground"
                    ),
                    children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : i + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-medium hidden sm:block whitespace-nowrap",
                      i === step ? "text-primary font-bold" : i < step ? "text-foreground" : "text-muted-foreground"
                    ),
                    children: label
                  }
                )
              ] }),
              i < STEP_TITLES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 mx-1 mt-[-14px] rounded-full transition-all duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-full rounded-full transition-all duration-500",
                    i < step ? "bg-primary w-full" : "bg-border w-full"
                  )
                }
              ) })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-500",
            style: { width: `${(step + 1) / STEP_TITLES.length * 100}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-sm", children: [
        step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: t("selectCountry") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Auto-sets currency, tax system & suggested language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                ref: searchInputRef,
                "data-ocid": "setup.country_search.input",
                placeholder: "Search country or currency...",
                value: countrySearch,
                onChange: (e) => setCountrySearch(e.target.value),
                className: "pl-9 text-sm"
              }
            )
          ] }),
          selectedCountry && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: selectedCountry.flag }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: selectedCountry.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
                selectedCountry.currency,
                " ·",
                " ",
                TAX_LABEL[selectedCountry.taxSystem],
                " (",
                selectedCountry.taxRate,
                "%)"
              ] })
            ] })
          ] }),
          filteredCountries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 text-center py-6 text-muted-foreground text-sm", children: [
            "No country found for “",
            countrySearch,
            "”"
          ] }) : countrySearch.trim() ? (
            /* Search results — flat list */
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto pr-0.5 -mr-0.5", children: filteredCountries.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CountryButton,
              {
                c,
                selected: config.country === c.code,
                onSelect: handleCountrySelect
              },
              c.code
            )) })
          ) : (
            /* No search — show suggested + all */
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-h-80 overflow-y-auto pr-0.5 -mr-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-0.5", children: "Suggested" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: SUGGESTED_COUNTRY_CODES.map((code) => {
                  const c = COUNTRIES.find((x) => x.code === code);
                  if (!c) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CountryButton,
                    {
                      c,
                      selected: config.country === c.code,
                      onSelect: handleCountrySelect
                    },
                    c.code
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-0.5", children: "All Countries" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: COUNTRIES.filter(
                  (c) => !SUGGESTED_COUNTRY_CODES.includes(c.code)
                ).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CountryButton,
                  {
                    c,
                    selected: config.country === c.code,
                    onSelect: handleCountrySelect
                  },
                  c.code
                )) })
              ] })
            ] })
          )
        ] }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-1", children: t("selectLanguage") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "All buttons, labels & messages will translate" }),
          selectedCountry && selectedCountry.language !== Language.English && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground", children: [
              "Suggested for ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedCountry.name }),
              ":",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (_a = LANGUAGES.find(
                (l) => l.value === selectedCountry.language
              )) == null ? void 0 : _a.label })
            ] })
          ] }),
          rtlSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-amber-600 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800", children: "RTL (right-to-left) layout will be applied — text flows right to left" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `setup.language.${lang.value.toLowerCase()}`,
              onClick: () => handleLanguageSelect(lang.value),
              className: cn(
                "flex flex-col items-start gap-1 px-3 py-3 rounded-xl border text-left transition-all duration-200 min-h-[72px]",
                config.language === lang.value ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20" : "border-border hover:border-primary/40 hover:bg-secondary"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: lang.flag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: cn(
                          "text-sm font-semibold leading-tight",
                          config.language === lang.value ? "text-primary" : "text-foreground"
                        ),
                        children: lang.nativeLabel
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: lang.label })
                  ] }),
                  config.language === lang.value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 flex-shrink-0 text-primary" })
                ] }),
                lang.rtl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-[9px] h-4 px-1",
                    children: "RTL"
                  }
                )
              ]
            },
            lang.value
          )) })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground mb-1", children: [
            t("shopName"),
            " & Info"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Shown on all bills and invoices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "shopName",
                  className: "text-sm font-semibold text-foreground",
                  children: [
                    t("shopName"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "shopName",
                  "data-ocid": "setup.shop_name.input",
                  placeholder: "e.g. Raj Electronics, Green Pharmacy...",
                  value: config.shopName,
                  onChange: (e) => {
                    updateConfig({ shopName: e.target.value });
                    if (shopNameError && e.target.value.trim().length >= 2) {
                      setShopNameError("");
                    }
                  },
                  onBlur: handleShopNameBlur,
                  className: cn(
                    "mt-1.5",
                    shopNameError ? "border-destructive focus-visible:ring-destructive" : ""
                  )
                }
              ),
              shopNameError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "setup.shop_name.field_error",
                  className: "text-xs text-destructive mt-1",
                  children: shopNameError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Minimum 2 characters required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "shopAddress",
                  className: "text-sm font-semibold text-foreground",
                  children: t("shopAddress")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "shopAddress",
                  "data-ocid": "setup.shop_address.input",
                  placeholder: "Street, City, State, PIN/ZIP code",
                  value: config.shopAddress,
                  onChange: (e) => updateConfig({ shopAddress: e.target.value }),
                  className: "mt-1.5 resize-none",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "shopPhone",
                  className: "text-sm font-semibold text-foreground",
                  children: t("shopPhone")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "shopPhone",
                  "data-ocid": "setup.shop_phone.input",
                  type: "tel",
                  placeholder: (selectedCountry == null ? void 0 : selectedCountry.code) === "IN" ? "+91 98765 43210" : (selectedCountry == null ? void 0 : selectedCountry.code) === "US" ? "+1 (555) 000-0000" : "+XX XXXXXXXXXX",
                  value: config.shopPhone,
                  onChange: (e) => updateConfig({ shopPhone: e.target.value }),
                  className: "mt-1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Include country code for WhatsApp sharing" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "shopEmail",
                  className: "text-sm font-semibold text-foreground",
                  children: [
                    t("shopEmail"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "shopEmail",
                  "data-ocid": "setup.shop_email.input",
                  type: "email",
                  placeholder: "shop@example.com",
                  value: config.shopEmail,
                  onChange: (e) => updateConfig({ shopEmail: e.target.value }),
                  className: "mt-1.5"
                }
              )
            ] })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-1", children: t("selectShopType") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Loads the right inventory engine for your shop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-0.5 -mr-0.5", children: SHOP_TYPES.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `setup.shop_type.${st.value.toLowerCase()}`,
              onClick: () => updateConfig({ shopType: st.value }),
              className: cn(
                "text-left px-3 py-3 rounded-xl border transition-all duration-200 flex flex-col gap-1 min-h-[80px]",
                config.shopType === st.value ? "border-primary bg-primary/8 shadow-sm ring-1 ring-primary/20" : "border-border hover:border-primary/40 hover:bg-secondary"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: st.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-sm font-semibold truncate leading-tight",
                        config.shopType === st.value ? "text-primary" : "text-foreground"
                      ),
                      children: st.label
                    }
                  ),
                  config.shopType === st.value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 ml-auto flex-shrink-0 text-primary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground line-clamp-2 leading-tight", children: st.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "text-[9px] h-4 px-1 w-fit border",
                      config.shopType === st.value ? "border-primary/30 text-primary" : "border-border"
                    ),
                    children: st.engine
                  }
                )
              ]
            },
            st.value
          )) })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-1", children: "Everything looks great!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Review your setup and start using the app" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 bg-muted/30 rounded-xl p-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: "🏪",
                label: "Shop Name",
                value: config.shopName || "—"
              }
            ),
            config.shopAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: "📍",
                label: "Address",
                value: config.shopAddress
              }
            ),
            config.shopPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: "📞",
                label: "Phone",
                value: config.shopPhone
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: (selectedCountry == null ? void 0 : selectedCountry.flag) ?? "🌍",
                label: "Country",
                value: (selectedCountry == null ? void 0 : selectedCountry.name) ?? config.country
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: "💰",
                label: "Currency",
                value: config.currency
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: (selectedLang == null ? void 0 : selectedLang.flag) ?? "🌐",
                label: "Language",
                value: selectedLang ? `${selectedLang.nativeLabel} (${selectedLang.label})` : config.language
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: "🧾",
                label: "Tax System",
                value: `${TAX_LABEL[config.taxSystem]} — ${config.taxRate}%`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SummaryRow,
              {
                icon: (selectedShopType == null ? void 0 : selectedShopType.icon) ?? "🏪",
                label: "Shop Type",
                value: (selectedShopType == null ? void 0 : selectedShopType.label) ?? config.shopType
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
            "You can change all settings later in the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Settings" }),
            " ",
            "page"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4 font-medium tracking-wide", children: [
            "Powered by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "FIFO Bridge" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
        step > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "setup.back_button",
            onClick: () => setStep(step - 1),
            className: "flex items-center gap-2 min-h-[44px] px-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              t("back")
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        step < STEP_TITLES.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "setup.next_button",
            disabled: !canProceed,
            onClick: () => setStep(step + 1),
            className: "flex items-center gap-2 min-h-[44px] px-6 font-semibold",
            children: [
              t("next"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "setup.finish_button",
            onClick: () => {
              void handleFinish();
            },
            disabled: isSaving,
            className: "flex items-center gap-2 min-h-[44px] px-6 font-semibold bg-primary hover:bg-primary/90",
            children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Setting up..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              isAddMode ? "Add Shop" : "Start Using App",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] })
          }
        )
      ] }),
      !canProceed && step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-center text-xs text-muted-foreground mt-2",
          "data-ocid": "setup.validation_hint",
          children: "Enter shop name (min 2 characters) to continue"
        }
      )
    ] }) })
  ] });
}
function CountryButton({
  c,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `setup.country.${c.code.toLowerCase()}`,
      onClick: () => onSelect(c.code),
      className: cn(
        "text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 min-h-[44px]",
        selected ? "border-primary bg-primary/8 text-primary shadow-sm ring-1 ring-primary/20" : "border-border hover:border-primary/40 hover:bg-secondary"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base flex-shrink-0", children: c.flag }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium text-xs sm:text-sm", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: c.currency })
        ] }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 ml-auto flex-shrink-0 text-primary" })
      ]
    },
    c.code
  );
}
function SummaryRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 py-1.5 border-b border-border/40 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base flex-shrink-0 mt-0.5", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground w-24 flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground flex-1 min-w-0 break-words", children: value })
  ] });
}
export {
  SetupPage
};
