import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Principal } from "@dfinity/principal";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Building2,
  ChevronDown,
  DollarSign,
  Edit2,
  Globe,
  Info,
  LogOut,
  Package,
  Plus,
  Receipt,
  Save,
  Search,
  Store,
  Trash2,
  Truck,
  UserPlus,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ShopRole } from "../backend";
import type { SmartDefaultCharges, Supplier } from "../backend.d";
import { useApi } from "../lib/api";
import { getAllCurrencies } from "../lib/currency";
import { applyRTL, isRTL, setLanguage } from "../lib/i18n";
import { useStore } from "../lib/store";
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
import type { StaffMember } from "../types";

// ─── Currency region groupings ──────────────────────────────────────────────
const CURRENCY_REGIONS: Record<string, string[]> = {
  Asia: [
    "INR",
    "BDT",
    "PKR",
    "IDR",
    "MYR",
    "PHP",
    "THB",
    "VND",
    "CNY",
    "JPY",
    "KRW",
    "SGD",
    "HKD",
    "TWD",
    "NPR",
    "LKR",
    "MMK",
  ],
  "Middle East": [
    "AED",
    "SAR",
    "KWD",
    "QAR",
    "BHD",
    "OMR",
    "IQD",
    "JOD",
    "EGP",
  ],
  Europe: [
    "EUR",
    "GBP",
    "CHF",
    "SEK",
    "NOK",
    "DKK",
    "PLN",
    "CZK",
    "HUF",
    "RON",
    "TRY",
    "UAH",
    "RUB",
    "BYN",
  ],
  Americas: ["USD", "CAD", "BRL", "MXN", "ARS", "COP", "CLP", "PEN", "CRC"],
  Africa: [
    "NGN",
    "KES",
    "ZAR",
    "GHS",
    "TZS",
    "UGX",
    "ETB",
    "XOF",
    "MAD",
    "DZD",
    "ZMW",
  ],
  Oceania: ["AUD", "NZD"],
};

// ─── Shop type metadata ──────────────────────────────────────────────────────
const SHOP_TYPE_META: Record<
  ShopType | typeof BUILDING_MATERIAL_SHOP_TYPE,
  { icon: string; label: string; desc: string }
> = {
  [ShopType.Mobile]: {
    icon: "📱",
    label: "Mobile Shop",
    desc: "IMEI-based tracking",
  },
  [ShopType.Electronics]: {
    icon: "💻",
    label: "Electronics",
    desc: "Serial number engine",
  },
  [ShopType.Medical]: {
    icon: "💊",
    label: "Medical / Pharmacy",
    desc: "Batch + expiry engine",
  },
  [ShopType.Clothing]: {
    icon: "👕",
    label: "Clothing / Fashion",
    desc: "Size variant engine",
  },
  [ShopType.Footwear]: {
    icon: "👟",
    label: "Footwear",
    desc: "Size + pair engine",
  },
  [ShopType.Grocery]: { icon: "🛒", label: "Grocery", desc: "Weight engine" },
  [ShopType.Stationery]: {
    icon: "✏️",
    label: "Stationery",
    desc: "Type-based engine",
  },
  [ShopType.Restaurant]: {
    icon: "🍽️",
    label: "Restaurant",
    desc: "Menu + KOT engine",
  },
  [ShopType.AutoParts]: {
    icon: "🔧",
    label: "Auto Parts",
    desc: "Vehicle mapping engine",
  },
  [ShopType.Hardware]: {
    icon: "🔨",
    label: "Hardware Store",
    desc: "SKU engine",
  },
  [ShopType.Jewelry]: {
    icon: "💍",
    label: "Jewelry",
    desc: "Weight + purity engine",
  },
  [ShopType.Salon]: {
    icon: "✂️",
    label: "Salon / Service",
    desc: "Service + duration engine",
  },
  [ShopType.General]: {
    icon: "🏪",
    label: "General Store",
    desc: "Basic flexible engine",
  },
  [BUILDING_MATERIAL_SHOP_TYPE]: {
    icon: "🏗️",
    label: "Building Material",
    desc: "Cement, bricks, steel, tiles, paint, pipes, wood & all construction materials",
  },
  [ShopType.AgroProducts]: {
    icon: "🌾",
    label: "Agro Products",
    desc: "Seeds, fertilizer, pesticide, farming tools, animal feed",
  },
  [ShopType.FruitsVegetables]: {
    icon: "🍎",
    label: "Fruits & Vegetables",
    desc: "Fresh fruits, vegetables, herbs, dry fruits, seasonal produce",
  },
  [ShopType.Electrical]: {
    icon: "⚡",
    label: "Electrical Shop",
    desc: "Switchboards, wiring, cables, AMP-rated items for retail & wholesale",
  },
};

// ─── Tax system metadata ────────────────────────────────────────────────────
const TAX_SYSTEM_INFO: Record<
  TaxSystem,
  { label: string; desc: string; country: string }
> = {
  [TaxSystem.GST]: {
    label: "GST (India)",
    desc: "CGST + SGST / IGST split. Rates: 0%, 5%, 12%, 18%, 28%",
    country: "🇮🇳 India",
  },
  [TaxSystem.VAT]: {
    label: "VAT",
    desc: "Value Added Tax — used in Europe, Middle East, Africa",
    country: "🌍 Europe / ME / Africa",
  },
  [TaxSystem.SalesTax]: {
    label: "Sales Tax (USA)",
    desc: "State-wise percentage, added at point of sale",
    country: "🇺🇸 USA",
  },
  [TaxSystem.Generic]: {
    label: "Generic Tax %",
    desc: "Any percentage tax — works worldwide",
    country: "🌐 Universal",
  },
};

const GST_RATES = [0, 5, 12, 18, 28];

// ─── Language metadata ──────────────────────────────────────────────────────
const LANGUAGE_META: {
  lang: Language;
  label: string;
  native: string;
  flag: string;
  rtl?: boolean;
}[] = [
  { lang: Language.English, label: "English", native: "English", flag: "🇬🇧" },
  { lang: Language.Hindi, label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  {
    lang: Language.Arabic,
    label: "Arabic",
    native: "العربية",
    flag: "🇸🇦",
    rtl: true,
  },
  { lang: Language.French, label: "French", native: "Français", flag: "🇫🇷" },
  { lang: Language.Spanish, label: "Spanish", native: "Español", flag: "🇪🇸" },
  {
    lang: Language.Portuguese,
    label: "Portuguese",
    native: "Português",
    flag: "🇧🇷",
  },
  { lang: Language.Swahili, label: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
  {
    lang: Language.BahasaIndonesia,
    label: "Bahasa Indonesia",
    native: "Bahasa",
    flag: "🇮🇩",
  },
  { lang: Language.Bengali, label: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { lang: Language.Urdu, label: "Urdu", native: "اردو", flag: "🇵🇰", rtl: true },
];

// ─── Currency Dropdown Component ─────────────────────────────────────────────
function CurrencyPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const currencies = getAllCurrencies();

  const filtered = search.trim()
    ? currencies.filter(
        (c) =>
          c.code.toLowerCase().includes(search.toLowerCase()) ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase()),
      )
    : currencies;

  const selectedCurrency = currencies.find((c) => c.code === value);

  const grouped: Record<string, typeof currencies> = {};
  if (search.trim()) {
    grouped.Results = filtered;
  } else {
    for (const [region, codes] of Object.entries(CURRENCY_REGIONS)) {
      const regionCurrencies = currencies.filter((c) => codes.includes(c.code));
      if (regionCurrencies.length > 0) grouped[region] = regionCurrencies;
    }
    const allCodes = Object.values(CURRENCY_REGIONS).flat();
    const others = currencies.filter((c) => !allCodes.includes(c.code));
    if (others.length > 0) grouped.Other = others;
  }

  return (
    <div className="relative">
      <button
        type="button"
        data-ocid="settings.currency_select"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 border border-input rounded-lg bg-background hover:bg-muted/50 transition-colors text-sm"
      >
        {selectedCurrency ? (
          <span className="flex items-center gap-2">
            <span className="font-mono font-semibold text-primary">
              {selectedCurrency.symbol}
            </span>
            <span className="font-medium">{selectedCurrency.code}</span>
            <span className="text-muted-foreground">
              — {selectedCurrency.name}
            </span>
          </span>
        ) : (
          <span className="text-muted-foreground">Select currency...</span>
        )}
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-muted/50 rounded-lg">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                data-ocid="settings.currency_search_input"
                type="text"
                placeholder="Search currency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(grouped).map(([region, items]) => (
              <div key={region}>
                <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 sticky top-0">
                  {region}
                </div>
                {items.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/60 transition-colors ${
                      c.code === value
                        ? "bg-primary/10 text-primary"
                        : "text-foreground"
                    }`}
                  >
                    <span className="font-mono font-bold text-primary w-8 shrink-0">
                      {c.symbol}
                    </span>
                    <span className="font-semibold w-12 shrink-0">
                      {c.code}
                    </span>
                    <span className="text-muted-foreground truncate">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function SettingsSection({
  title,
  desc,
  children,
}: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Radio Toggle ─────────────────────────────────────────────────────────────
function RadioToggle<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: { value: T; label: string; desc?: string }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          data-ocid={`settings.${name}.${opt.value.toLowerCase()}`}
          className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl border text-left transition-all ${
            value === opt.value
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/40"
          }`}
        >
          <div className="font-semibold text-sm">{opt.label}</div>
          {opt.desc && (
            <div className="text-xs text-muted-foreground mt-0.5">
              {opt.desc}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Staff Management Section ────────────────────────────────────────────────

function StaffManagementSection({
  shopId,
  ownerPrincipal,
}: {
  shopId: string;
  ownerPrincipal: string;
}) {
  const { getShopStaff, addStaff, removeStaff } = useApi();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [principalInput, setPrincipalInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingPrincipal, setRemovingPrincipal] = useState<string | null>(
    null,
  );
  const [confirmRemove, setConfirmRemove] = useState<StaffMember | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  const loadStaff = useCallback(async () => {
    if (!shopId) return;
    setLoadingStaff(true);
    try {
      const members = await getShopStaff(shopId);
      setStaff(members as unknown as StaffMember[]);
    } catch {
      // silently handle
    } finally {
      setLoadingStaff(false);
    }
  }, [shopId, getShopStaff]);

  useEffect(() => {
    void loadStaff();
  }, [loadStaff]);

  const handleAddStaff = async () => {
    const trimmed = principalInput.trim();
    if (!trimmed) {
      setAddError("Please enter a Principal ID");
      return;
    }
    setAddError(null);
    setAdding(true);
    try {
      const principal = Principal.fromText(trimmed);
      const result = await addStaff(shopId, principal);
      if (result.__kind__ === "ok") {
        toast.success("Staff member added successfully");
        setPrincipalInput("");
        await loadStaff();
      } else if (result.__kind__ === "err") {
        setAddError((result as { __kind__: "err"; err: string }).err);
      }
    } catch {
      setAddError("Invalid Principal ID — please check and try again");
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveStaff = async (member: StaffMember) => {
    setRemovingPrincipal(member.principal.toText());
    try {
      const result = await removeStaff(shopId, member.principal);
      if (result.__kind__ === "ok") {
        toast.success("Staff member removed");
        setStaff((prev) =>
          prev.filter(
            (m) => m.principal.toText() !== member.principal.toText(),
          ),
        );
      } else {
        toast.error(
          (result as { __kind__: "err"; err: string }).err ??
            "Failed to remove",
        );
      }
    } catch {
      toast.error("Failed to remove staff member");
    } finally {
      setRemovingPrincipal(null);
      setConfirmRemove(null);
    }
  };

  const formatDate = (ts: bigint) => {
    const date = new Date(Number(ts / BigInt(1_000_000)));
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalCount = staff.filter((m) => m.role === ShopRole.staff).length;

  return (
    <SettingsSection
      title="Staff Members"
      desc="Add staff who can create bills. Staff cannot view profit or reports."
    >
      {/* Owner row */}
      <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-primary">👑</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {ownerPrincipal.slice(0, 10)}...{ownerPrincipal.slice(-6)}
          </p>
          <p className="text-xs text-muted-foreground">Your account</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0 text-xs">
          Owner
        </Badge>
      </div>

      {/* Add Staff Form */}
      <div className="space-y-2">
        <Label className="font-medium flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add New Staff Member
          <Badge variant="outline" className="ml-auto text-xs">
            {totalCount} staff
          </Badge>
        </Label>
        <div className="flex gap-2">
          <Input
            data-ocid="settings.staff.principal_input"
            placeholder="e.g. aaaaa-aa or full principal ID"
            value={principalInput}
            onChange={(e) => {
              setPrincipalInput(e.target.value);
              setAddError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleAddStaff();
            }}
            className="flex-1"
          />
          <Button
            type="button"
            data-ocid="settings.staff.add_button"
            onClick={() => void handleAddStaff()}
            disabled={adding || !principalInput.trim()}
            className="shrink-0"
          >
            {adding ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-1" /> Add
              </>
            )}
          </Button>
        </div>
        {addError && (
          <p
            data-ocid="settings.staff.add_error"
            className="text-xs text-destructive flex items-center gap-1"
          >
            <span>⚠</span> {addError}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Ask your staff member for their Principal ID — found on their Settings
          page.
        </p>
      </div>

      {/* Staff List */}
      <div className="space-y-2" data-ocid="settings.staff.list">
        {loadingStaff ? (
          <div
            data-ocid="settings.staff.loading_state"
            className="flex items-center gap-2 py-4 text-muted-foreground"
          >
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-sm">Loading staff...</span>
          </div>
        ) : staff.filter((m) => m.role === ShopRole.staff).length === 0 ? (
          <div
            data-ocid="settings.staff.empty_state"
            className="flex flex-col items-center gap-2 py-8 text-center"
          >
            <Users className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No staff members added yet.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Add staff to give them billing access.
            </p>
          </div>
        ) : (
          staff
            .filter((m) => m.role === ShopRole.staff)
            .map((member, idx) => {
              const principalText = member.principal.toText();
              const isRemoving = removingPrincipal === principalText;
              return (
                <div
                  key={principalText}
                  data-ocid={`settings.staff.item.${idx + 1}`}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-border/80 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground font-mono truncate">
                      {principalText.slice(0, 10)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Added {formatDate(member.addedAt)}
                    </p>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 shrink-0 text-xs">
                    Staff
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    data-ocid={`settings.staff.remove_button.${idx + 1}`}
                    onClick={() => setConfirmRemove(member)}
                    disabled={isRemoving}
                    className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive px-2"
                  >
                    {isRemoving ? (
                      <span className="w-4 h-4 border-2 border-destructive/40 border-t-destructive rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              );
            })
        )}
      </div>

      {/* Confirm Remove Dialog */}
      <Dialog
        open={!!confirmRemove}
        onOpenChange={(open) => {
          if (!open) setConfirmRemove(null);
        }}
      >
        <DialogContent
          data-ocid="settings.staff.remove_dialog"
          className="max-w-sm"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Remove Staff Member?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove{" "}
            <span className="font-mono font-medium text-foreground">
              {confirmRemove?.principal.toText().slice(0, 10)}...
            </span>{" "}
            from your shop. They will lose billing access immediately.
          </p>
          <DialogFooter className="gap-2 flex-row justify-end">
            <Button
              type="button"
              variant="outline"
              data-ocid="settings.staff.remove_cancel_button"
              onClick={() => setConfirmRemove(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              data-ocid="settings.staff.remove_confirm_button"
              onClick={() => {
                if (confirmRemove) void handleRemoveStaff(confirmRemove);
              }}
              disabled={!!removingPrincipal}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsSection>
  );
}

// ─── Supplier Form State ─────────────────────────────────────────────────────
type SupplierFormData = {
  name: string;
  businessType: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  defaultTransportCharge: string;
};

const EMPTY_SUPPLIER_FORM: SupplierFormData = {
  name: "",
  businessType: "Wholesaler",
  phone: "",
  email: "",
  address: "",
  city: "",
  defaultTransportCharge: "",
};

const BUSINESS_TYPES = ["Wholesaler", "Distributor", "Manufacturer"];

// ─── Suppliers Section ───────────────────────────────────────────────────────
function SuppliersSection({
  shopId,
  currency,
}: { shopId: string; currency: string }) {
  const {
    listSuppliersByShop,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useApi();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState<SupplierFormData>(EMPTY_SUPPLIER_FORM);
  const [errors, setErrors] = useState<Partial<SupplierFormData>>({});

  const loadSuppliers = useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    try {
      const data = await listSuppliersByShop(shopId);
      setSuppliers(data);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, [shopId, listSuppliersByShop]);

  useEffect(() => {
    void loadSuppliers();
  }, [loadSuppliers]);

  const openAdd = () => {
    setEditingSupplier(null);
    setForm(EMPTY_SUPPLIER_FORM);
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (s: Supplier) => {
    setEditingSupplier(s);
    setForm({
      name: s.name,
      businessType: s.businessType,
      phone: s.phone,
      email: s.email ?? "",
      address: s.address ?? "",
      city: s.city ?? "",
      defaultTransportCharge: s.defaultTransportCharge ?? "",
    });
    setErrors({});
    setDialogOpen(true);
  };

  const validate = (): boolean => {
    const e: Partial<SupplierFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingSupplier) {
        const updated = await updateSupplier(
          editingSupplier.id,
          form.name.trim(),
          form.businessType,
          form.phone.trim(),
          form.email.trim() || null,
          form.address.trim() || null,
          form.city.trim() || null,
          form.defaultTransportCharge.trim() || null,
        );
        if (updated) {
          toast.success("Supplier updated");
          setDialogOpen(false);
          await loadSuppliers();
        } else {
          toast.error("Failed to update supplier");
        }
      } else {
        const created = await createSupplier(
          shopId,
          form.name.trim(),
          form.businessType,
          form.phone.trim(),
          form.email.trim() || null,
          form.address.trim() || null,
          form.city.trim() || null,
          form.defaultTransportCharge.trim() || null,
        );
        if (created) {
          toast.success("Supplier added");
          setDialogOpen(false);
          await loadSuppliers();
        } else {
          toast.error("Failed to add supplier");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setDeleting(true);
    try {
      const ok = await deleteSupplier(confirmDeleteId);
      if (ok) {
        toast.success("Supplier deleted");
        setSuppliers((prev) => prev.filter((s) => s.id !== confirmDeleteId));
      } else {
        toast.error("Failed to delete supplier");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
    }
  };

  const businessTypeBadgeClass = (bt: string) => {
    switch (bt) {
      case "Distributor":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Manufacturer":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    }
  };

  return (
    <SettingsSection
      title="Suppliers"
      desc="Manage your wholesalers, distributors, and manufacturers. Track purchase history and transport charges per supplier."
    >
      <div className="flex justify-end">
        <Button
          type="button"
          data-ocid="settings.suppliers.add_button"
          onClick={openAdd}
          size="sm"
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Supplier
        </Button>
      </div>

      {loading ? (
        <div
          data-ocid="settings.suppliers.loading_state"
          className="flex items-center gap-2 py-8 text-muted-foreground"
        >
          <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-sm">Loading suppliers...</span>
        </div>
      ) : suppliers.length === 0 ? (
        <div
          data-ocid="settings.suppliers.empty_state"
          className="flex flex-col items-center gap-3 py-12 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Truck className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">
            No suppliers added yet.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Add suppliers to track purchase history and compare prices.
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="settings.suppliers.list">
          {suppliers.map((s, idx) => (
            <div
              key={s.id}
              data-ocid={`settings.suppliers.item.${idx + 1}`}
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-border/80 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {s.name}
                  </p>
                  <Badge
                    className={`text-[10px] px-1.5 py-0 h-4 shrink-0 ${businessTypeBadgeClass(s.businessType)}`}
                  >
                    {s.businessType}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {s.phone}
                  {s.city ? ` · ${s.city}` : ""}
                  {s.defaultTransportCharge
                    ? ` · Transport: ${currency} ${s.defaultTransportCharge}`
                    : ""}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  data-ocid={`settings.suppliers.edit_button.${idx + 1}`}
                  onClick={() => openEdit(s)}
                  className="px-2 text-muted-foreground hover:text-foreground"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  data-ocid={`settings.suppliers.delete_button.${idx + 1}`}
                  onClick={() => setConfirmDeleteId(s.id)}
                  className="px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          if (!o) setDialogOpen(false);
        }}
      >
        <DialogContent
          data-ocid="settings.suppliers.dialog"
          className="max-w-md max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingSupplier ? "Edit Supplier" : "Add Supplier"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-1">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="sup-name" className="font-medium">
                Supplier Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sup-name"
                data-ocid="settings.suppliers.name_input"
                placeholder="e.g. Ali Traders, Pak Distributors"
                value={form.name}
                onChange={(e) => {
                  setForm((p) => ({ ...p, name: e.target.value }));
                  setErrors((p) => ({ ...p, name: undefined }));
                }}
              />
              {errors.name && (
                <p
                  data-ocid="settings.suppliers.name_error"
                  className="text-xs text-destructive"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div className="space-y-1.5">
              <Label className="font-medium">Business Type</Label>
              <div className="flex gap-2 flex-wrap">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt}
                    type="button"
                    data-ocid={`settings.suppliers.btype.${bt.toLowerCase()}`}
                    onClick={() => setForm((p) => ({ ...p, businessType: bt }))}
                    className={`flex-1 min-w-[90px] px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      form.businessType === bt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="sup-phone" className="font-medium">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sup-phone"
                data-ocid="settings.suppliers.phone_input"
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={(e) => {
                  setForm((p) => ({ ...p, phone: e.target.value }));
                  setErrors((p) => ({ ...p, phone: undefined }));
                }}
              />
              {errors.phone && (
                <p
                  data-ocid="settings.suppliers.phone_error"
                  className="text-xs text-destructive"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email (optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="sup-email" className="font-medium">
                Email{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="sup-email"
                data-ocid="settings.suppliers.email_input"
                type="email"
                placeholder="supplier@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>

            {/* City + Transport on same row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="sup-city" className="font-medium">
                  City{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="sup-city"
                  data-ocid="settings.suppliers.city_input"
                  placeholder="Karachi"
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sup-transport" className="font-medium">
                  Transport ({currency}){" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="sup-transport"
                  data-ocid="settings.suppliers.transport_input"
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  value={form.defaultTransportCharge}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      defaultTransportCharge: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Address (optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="sup-address" className="font-medium">
                Address{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="sup-address"
                data-ocid="settings.suppliers.address_input"
                placeholder="Street, area, city"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                rows={2}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 flex-row justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="settings.suppliers.cancel_button"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="settings.suppliers.submit_button"
              onClick={() => void handleSave()}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : editingSupplier ? (
                "Save Changes"
              ) : (
                "Add Supplier"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!confirmDeleteId}
        onOpenChange={(o) => {
          if (!o) setConfirmDeleteId(null);
        }}
      >
        <DialogContent
          data-ocid="settings.suppliers.delete_dialog"
          className="max-w-sm"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Delete Supplier?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove the supplier and their records from
            this shop.
          </p>
          <DialogFooter className="gap-2 flex-row justify-end">
            <Button
              type="button"
              variant="outline"
              data-ocid="settings.suppliers.delete_cancel_button"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              data-ocid="settings.suppliers.delete_confirm_button"
              onClick={() => void handleDelete()}
              disabled={deleting}
            >
              {deleting ? (
                <span className="w-4 h-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsSection>
  );
}

// ─── Default Charges Section ─────────────────────────────────────────────────
function DefaultChargesSection({ currency }: { currency: string }) {
  const { getDefaultCharges, setDefaultCharges } = useApi();
  const [transport, setTransport] = useState("");
  const [labour, setLabour] = useState("");
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getDefaultCharges()
      .then((charges) => {
        if (cancelled) return;
        if (charges) {
          setTransport(charges.defaultTransportCharge ?? "");
          setLabour(charges.defaultLabourCharge ?? "");
          setOther(charges.defaultOtherCharge ?? "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [getDefaultCharges]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const charges: SmartDefaultCharges = {
        defaultTransportCharge: transport.trim() || undefined,
        defaultLabourCharge: labour.trim() || undefined,
        defaultOtherCharge: other.trim() || undefined,
      };
      const ok = await setDefaultCharges(charges);
      if (ok) {
        toast.success("Default charges saved successfully");
      } else {
        toast.error("Failed to save default charges");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        data-ocid="settings.default_charges.loading_state"
        className="flex items-center gap-2 py-8 text-muted-foreground"
      >
        <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm">Loading default charges...</span>
      </div>
    );
  }

  return (
    <SettingsSection
      title="Default Charges"
      desc="Set default transport, labour, and other charges. These auto-fill when adding stock — you can still edit per purchase."
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="def-transport"
            className="font-medium flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-muted-foreground" />
            Default Transport Charge ({currency})
          </Label>
          <Input
            id="def-transport"
            data-ocid="settings.default_charges.transport_input"
            type="number"
            min={0}
            step={0.01}
            placeholder="e.g. 200"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Shipping / freight charge per purchase order
          </p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="def-labour"
            className="font-medium flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-muted-foreground" />
            Default Labour Charge ({currency})
          </Label>
          <Input
            id="def-labour"
            data-ocid="settings.default_charges.labour_input"
            type="number"
            min={0}
            step={0.01}
            placeholder="e.g. 100"
            value={labour}
            onChange={(e) => setLabour(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Labour / handling cost per purchase order
          </p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="def-other"
            className="font-medium flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            Default Other Charge ({currency})
          </Label>
          <Input
            id="def-other"
            data-ocid="settings.default_charges.other_input"
            type="number"
            min={0}
            step={0.01}
            placeholder="e.g. 50"
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Any other recurring charge (packaging, inspection, etc.)
          </p>
        </div>

        <div className="flex items-start gap-2 px-3 py-2.5 bg-muted/40 border border-border rounded-lg">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            These values auto-fill when adding new stock. They are included in
            automatic cost calculation:{" "}
            <strong>Cost = Purchase Price + Transport + Labour + Other</strong>
          </p>
        </div>

        <Button
          type="button"
          data-ocid="settings.default_charges.save_button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="w-full"
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Default Charges
            </>
          )}
        </Button>
      </div>
    </SettingsSection>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export function SettingsPage() {
  const { getShopConfig, updateShopConfig, ready } = useApi();
  const { shopConfig, setShopConfig } = useStore();
  const navigate = useNavigate();
  const { clear: logout, identity } = useInternetIdentity();
  const ownerPrincipal = identity?.getPrincipal().toText() ?? "";

  const { reset } = useStore();

  const handleLogout = () => {
    logout();
    reset(); // clear Zustand store so user goes back to setup/welcome
    void navigate({ to: "/setup" });
  };

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [changeShopTypeOpen, setChangeShopTypeOpen] = useState(false);

  // Form state mirrors ShopConfig (extended with expiry threshold and new alert fields)
  const [form, setForm] = useState<ShopConfig>({
    isSetupComplete: true,
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    shopEmail: "",
    country: "IN",
    currency: "INR",
    language: Language.English,
    taxSystem: TaxSystem.GST,
    taxRate: 18,
    shopType: ShopType.General,
    dateFormat: DateFormat.DDMMYYYY,
    numberFormat: NumberFormat.Indian,
    expiryAlertThresholdDays: BigInt(90),
    minStockAlertEnabled: true,
    deadStockAlertDays: BigInt(180),
    gstinNumber: "",
    vatNumber: "",
  });

  const [customGstRate, setCustomGstRate] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.English,
  );

  // Load config from backend or store
  const loadConfig = useCallback(async () => {
    if (!ready) return;
    setLoading(true);
    try {
      const config = shopConfig ?? (await getShopConfig());
      if (config) {
        setForm({
          ...config,
          expiryAlertThresholdDays:
            config.expiryAlertThresholdDays ?? BigInt(90),
          minStockAlertEnabled: config.minStockAlertEnabled ?? true,
          deadStockAlertDays: config.deadStockAlertDays ?? BigInt(180),
          gstinNumber: config.gstinNumber ?? "",
          vatNumber: config.vatNumber ?? "",
        });
        setSelectedLanguage(config.language);
        const isCustomGst =
          config.taxSystem === TaxSystem.GST &&
          !GST_RATES.includes(config.taxRate);
        setCustomGstRate(isCustomGst);
      }
    } finally {
      setLoading(false);
    }
  }, [ready, shopConfig, getShopConfig]);

  useEffect(() => {
    void loadConfig();
  }, [loadConfig]);

  const handleSave = async () => {
    if (!form.shopName.trim()) {
      toast.error("Shop name is required");
      return;
    }
    setSaving(true);
    try {
      const updated = await updateShopConfig({
        ...form,
        language: selectedLanguage,
        isSetupComplete: true,
      });
      if (updated) {
        setShopConfig(updated);
        setLanguage(updated.language);
        applyRTL(updated.language);
        toast.success("Settings saved successfully");
      }
    } catch {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setForm((prev) => ({ ...prev, language: lang }));
    // Preview RTL immediately
    applyRTL(lang);
  };

  const currentShopMeta =
    SHOP_TYPE_META[
      form.shopType as ShopType | typeof BUILDING_MATERIAL_SHOP_TYPE
    ] ?? SHOP_TYPE_META[ShopType.General];
  const isRTLSelected = isRTL(selectedLanguage);

  if (loading) {
    return (
      <div
        data-ocid="settings.loading_state"
        className="flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background pb-32" data-ocid="settings.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure your shop, currency, tax, and display preferences
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="shop-info" data-ocid="settings.tabs">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1 mb-6 bg-muted/60 rounded-xl">
            <TabsTrigger
              value="shop-info"
              data-ocid="settings.tab.shop_info"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shop Info</span>
              <span className="sm:hidden">Shop</span>
            </TabsTrigger>
            <TabsTrigger
              value="currency"
              data-ocid="settings.tab.currency"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Currency</span>
              <span className="sm:hidden">Money</span>
            </TabsTrigger>
            <TabsTrigger
              value="tax"
              data-ocid="settings.tab.tax"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Receipt className="w-3.5 h-3.5" />
              Tax
            </TabsTrigger>
            <TabsTrigger
              value="language"
              data-ocid="settings.tab.language"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Language</span>
              <span className="sm:hidden">Lang</span>
            </TabsTrigger>
            <TabsTrigger
              value="shop-type"
              data-ocid="settings.tab.shop_type"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shop Type</span>
              <span className="sm:hidden">Type</span>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              data-ocid="settings.tab.alerts"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Bell className="w-3.5 h-3.5" />
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              data-ocid="settings.tab.staff"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Users className="w-3.5 h-3.5" />
              Staff
            </TabsTrigger>
            <TabsTrigger
              value="suppliers"
              data-ocid="settings.tab.suppliers"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Suppliers</span>
              <span className="sm:hidden">Supp.</span>
            </TabsTrigger>
            <TabsTrigger
              value="default-charges"
              data-ocid="settings.tab.default_charges"
              className="flex items-center gap-1.5 flex-1 min-w-[100px] data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg"
            >
              <Package className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Charges</span>
              <span className="sm:hidden">Chrg.</span>
            </TabsTrigger>
          </TabsList>

          {/* ── Shop Info Tab ── */}
          <TabsContent value="shop-info" className="space-y-0">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Shop Information"
                desc="Your shop's basic details appear on all bills and invoices"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="shopName" className="font-medium">
                      Shop Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="shopName"
                      data-ocid="settings.shop_name.input"
                      placeholder="e.g. Sharma Electronics, Bright Pharmacy"
                      value={form.shopName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, shopName: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="shopAddress" className="font-medium">
                      Address
                    </Label>
                    <Textarea
                      id="shopAddress"
                      data-ocid="settings.shop_address.textarea"
                      placeholder="Shop address, city, state, country"
                      value={form.shopAddress}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, shopAddress: e.target.value }))
                      }
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="shopPhone" className="font-medium">
                        Phone
                      </Label>
                      <Input
                        id="shopPhone"
                        data-ocid="settings.shop_phone.input"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.shopPhone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, shopPhone: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="shopEmail" className="font-medium">
                        Email
                      </Label>
                      <Input
                        id="shopEmail"
                        data-ocid="settings.shop_email.input"
                        type="email"
                        placeholder="shop@example.com"
                        value={form.shopEmail}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, shopEmail: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Currency & Region Tab ── */}
          <TabsContent value="currency" className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Currency & Region"
                desc="Set your local currency and number formatting preferences"
              >
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label className="font-medium">Currency</Label>
                    <CurrencyPicker
                      value={form.currency}
                      onChange={(code) =>
                        setForm((p) => ({ ...p, currency: code }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Changing currency updates how amounts are displayed
                      throughout the app
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Number Format</Label>
                    <RadioToggle
                      name="number_format"
                      value={form.numberFormat}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, numberFormat: v }))
                      }
                      options={[
                        {
                          value: NumberFormat.Indian,
                          label: "Indian Format",
                          desc: "1,00,000 (lakhs/crores)",
                        },
                        {
                          value: NumberFormat.International,
                          label: "International",
                          desc: "100,000 (thousands)",
                        },
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Date Format</Label>
                    <RadioToggle
                      name="date_format"
                      value={form.dateFormat}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, dateFormat: v }))
                      }
                      options={[
                        {
                          value: DateFormat.DDMMYYYY,
                          label: "DD/MM/YYYY",
                          desc: "31/12/2025 — Asia, Europe",
                        },
                        {
                          value: DateFormat.MMDDYYYY,
                          label: "MM/DD/YYYY",
                          desc: "12/31/2025 — USA",
                        },
                      ]}
                    />
                  </div>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Tax Settings Tab ── */}
          <TabsContent value="tax" className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Tax Settings"
                desc="Configure how taxes are calculated and displayed on bills"
              >
                <div className="space-y-5">
                  {/* Tax system selector */}
                  <div className="space-y-2">
                    <Label className="font-medium">Tax System</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(TAX_SYSTEM_INFO).map(([key, info]) => (
                        <button
                          key={key}
                          type="button"
                          data-ocid={`settings.tax_system.${key.toLowerCase()}`}
                          onClick={() => {
                            const ts = key as TaxSystem;
                            setForm((p) => ({
                              ...p,
                              taxSystem: ts,
                              taxRate:
                                ts === TaxSystem.GST
                                  ? 18
                                  : ts === TaxSystem.VAT
                                    ? 5
                                    : 0,
                            }));
                            setCustomGstRate(false);
                          }}
                          className={`text-left p-3 rounded-xl border transition-all ${
                            form.taxSystem === (key as TaxSystem)
                              ? "border-primary bg-primary/10"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <div className="font-semibold text-sm text-foreground">
                            {info.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {info.desc}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {info.country}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GST rate picker */}
                  {form.taxSystem === TaxSystem.GST && (
                    <div className="space-y-2">
                      <Label className="font-medium">GST Rate</Label>
                      <div className="flex gap-2 flex-wrap">
                        {GST_RATES.map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            data-ocid={`settings.gst_rate.${rate}`}
                            onClick={() => {
                              setForm((p) => ({ ...p, taxRate: rate }));
                              setCustomGstRate(false);
                            }}
                            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                              form.taxRate === rate && !customGstRate
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground hover:border-primary/40"
                            }`}
                          >
                            {rate}%
                          </button>
                        ))}
                        <button
                          type="button"
                          data-ocid="settings.gst_rate.custom"
                          onClick={() => setCustomGstRate(true)}
                          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                            customGstRate
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/40"
                          }`}
                        >
                          Custom
                        </button>
                      </div>
                      {customGstRate && (
                        <div className="flex items-center gap-2">
                          <Input
                            data-ocid="settings.gst_custom_rate.input"
                            type="number"
                            min={0}
                            max={100}
                            step={0.1}
                            className="w-32"
                            value={form.taxRate}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                taxRate: Number(e.target.value),
                              }))
                            }
                          />
                          <span className="text-sm text-muted-foreground">
                            %
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Free-form rate for other systems */}
                  {form.taxSystem !== TaxSystem.GST && (
                    <div className="space-y-1.5">
                      <Label htmlFor="taxRate" className="font-medium">
                        {form.taxSystem === TaxSystem.SalesTax
                          ? "Sales Tax Rate"
                          : "Tax Rate"}{" "}
                        (%)
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="taxRate"
                          data-ocid="settings.tax_rate.input"
                          type="number"
                          min={0}
                          max={100}
                          step={0.01}
                          className="w-32"
                          value={form.taxRate}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              taxRate: Number(e.target.value),
                            }))
                          }
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                        {form.taxSystem === TaxSystem.VAT && (
                          <span className="text-xs text-muted-foreground">
                            Tip: UAE 5%, KSA 15%, EU varies
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {form.taxSystem === TaxSystem.GST && (
                    <div>
                      <label
                        htmlFor="gstin-number"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        GSTIN (GST Registration Number)
                      </label>
                      <input
                        id="gstin-number"
                        type="text"
                        value={form.gstinNumber}
                        onChange={(e) =>
                          setForm((prev: typeof form) => ({
                            ...prev,
                            gstinNumber: e.target.value.toUpperCase(),
                          }))
                        }
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your GST registration number — will appear on bills
                      </p>
                    </div>
                  )}
                  {form.taxSystem === TaxSystem.VAT && (
                    <div>
                      <label
                        htmlFor="vat-number"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        VAT Registration Number
                      </label>
                      <input
                        id="vat-number"
                        type="text"
                        value={form.vatNumber}
                        onChange={(e) =>
                          setForm((prev: typeof form) => ({
                            ...prev,
                            vatNumber: e.target.value,
                          }))
                        }
                        placeholder="Enter your VAT registration number"
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your VAT registration number — will appear on bills
                      </p>
                    </div>
                  )}
                  {/* Tax Inclusive / Exclusive preview */}
                  <div className="p-3 bg-muted/40 rounded-lg flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Tax is applied on top of product prices (tax-exclusive).
                      The breakdown is shown on every bill. India GST shows CGST
                      + SGST split automatically.
                    </p>
                  </div>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Language & Display Tab ── */}
          <TabsContent value="language" className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Language & Display"
                desc="Choose your preferred language. RTL layout applies automatically for Arabic and Urdu."
              >
                <div className="space-y-4">
                  {isRTLSelected && (
                    <div
                      data-ocid="settings.rtl_indicator"
                      className="flex items-center gap-2 px-3 py-2 bg-accent/20 border border-accent/30 rounded-lg"
                    >
                      <span className="text-sm">⇄</span>
                      <span className="text-sm font-medium text-accent-foreground">
                        RTL (Right-to-Left) layout is active
                      </span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        RTL
                      </Badge>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {LANGUAGE_META.map(({ lang, label, native, flag, rtl }) => (
                      <button
                        key={lang}
                        type="button"
                        data-ocid={`settings.language.${lang.toLowerCase()}`}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          selectedLanguage === lang
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background hover:border-primary/30 hover:bg-muted/40"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{flag}</span>
                        <div className="min-w-0">
                          <div
                            className={`font-semibold text-sm text-foreground ${rtl ? "text-right" : ""}`}
                          >
                            {native}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {label}
                            {rtl && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0 h-4 ml-1"
                              >
                                RTL
                              </Badge>
                            )}
                          </div>
                        </div>
                        {selectedLanguage === lang && (
                          <span className="ml-auto text-primary text-base shrink-0">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Shop Type Tab ── */}
          <TabsContent value="shop-type" className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Shop Type"
                desc="Your shop type determines which product fields and engine are used"
              >
                <div className="space-y-4">
                  {/* Current shop type card */}
                  <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <span className="text-4xl">{currentShopMeta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-foreground text-base">
                        {currentShopMeta.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentShopMeta.desc}
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0">
                      Current
                    </Badge>
                  </div>

                  {/* Change warning */}
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Changing shop type affects how{" "}
                      <strong>new products</strong> are added. Existing products
                      and bills remain unchanged.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    data-ocid="settings.change_shop_type.open_modal_button"
                    onClick={() => setChangeShopTypeOpen(true)}
                    className="w-full border-dashed border-2"
                  >
                    <Store className="w-4 h-4 mr-2" />
                    Change Shop Type
                  </Button>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Smart Alerts Tab ── */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SettingsSection
                title="Smart Alerts Settings"
                desc="Configure expiry, low stock, and dead stock alert thresholds for your dashboard."
              >
                <div className="space-y-6">
                  {/* Expiry Alert Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                        <span className="text-sm">🟠</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          Expiry Alert
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Alert days before product expires
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      {(
                        [
                          {
                            days: BigInt(30),
                            label: "30 Days",
                            desc: "1 month",
                            ocid: "settings.expiry_threshold.30",
                          },
                          {
                            days: BigInt(90),
                            label: "3 Months",
                            desc: "90 days",
                            ocid: "settings.expiry_threshold.90",
                          },
                          {
                            days: BigInt(180),
                            label: "6 Months",
                            desc: "180 days",
                            ocid: "settings.expiry_threshold.180",
                          },
                          {
                            days: BigInt(365),
                            label: "12 Months",
                            desc: "365 days",
                            ocid: "settings.expiry_threshold.365",
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={String(opt.days)}
                          type="button"
                          data-ocid={opt.ocid}
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              expiryAlertThresholdDays: opt.days,
                            }))
                          }
                          className={`flex-1 text-left px-3 py-2.5 rounded-xl border transition-all ${
                            form.expiryAlertThresholdDays === opt.days
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div className="font-semibold text-sm">
                            {opt.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {opt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Low Stock Alert Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                          <span className="text-sm">🔴</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Low Stock Alert
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Alert when product stock falls below minimum
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-ocid="settings.min_stock_alert.toggle"
                        role="switch"
                        aria-checked={form.minStockAlertEnabled}
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            minStockAlertEnabled: !p.minStockAlertEnabled,
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                          form.minStockAlertEnabled
                            ? "bg-primary"
                            : "bg-muted-foreground/30"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                            form.minStockAlertEnabled
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                    {!form.minStockAlertEnabled && (
                      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
                        ⚠️ Low stock alerts are disabled. You won't see low stock
                        warnings on the dashboard.
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-border" />

                  {/* Dead Stock Alert Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                        <span className="text-sm">⚫</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          Dead Stock Alert
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Mark product as dead stock after X days without a sale
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      {(
                        [
                          {
                            days: BigInt(90),
                            label: "3 Months",
                            desc: "90 days",
                            ocid: "settings.dead_stock.90",
                          },
                          {
                            days: BigInt(180),
                            label: "6 Months",
                            desc: "180 days (recommended)",
                            ocid: "settings.dead_stock.180",
                          },
                          {
                            days: BigInt(365),
                            label: "1 Year",
                            desc: "365 days",
                            ocid: "settings.dead_stock.365",
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={String(opt.days)}
                          type="button"
                          data-ocid={opt.ocid}
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              deadStockAlertDays: opt.days,
                            }))
                          }
                          className={`flex-1 text-left px-3 py-2.5 rounded-xl border transition-all ${
                            form.deadStockAlertDays === opt.days
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div className="font-semibold text-sm">
                            {opt.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {opt.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info note */}
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-muted/40 border border-border rounded-lg">
                    <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All alerts appear in the <strong>Smart Alerts</strong>{" "}
                      panel on your Dashboard — expiry, low stock, and dead
                      stock in one place. Save your settings to apply changes.
                    </p>
                  </div>
                </div>
              </SettingsSection>
            </div>
          </TabsContent>

          {/* ── Staff Management Tab ── */}
          <TabsContent value="staff" className="space-y-0">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <StaffManagementSection
                shopId={ownerPrincipal}
                ownerPrincipal={ownerPrincipal}
              />
            </div>
          </TabsContent>

          {/* ── Suppliers Tab ── */}
          <TabsContent value="suppliers" className="space-y-0">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <SuppliersSection
                shopId={ownerPrincipal}
                currency={form.currency}
              />
            </div>
          </TabsContent>

          {/* ── Default Charges Tab ── */}
          <TabsContent value="default-charges" className="space-y-0">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <DefaultChargesSection currency={form.currency} />
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Save Changes Button ── */}
        <div className="fixed bottom-16 left-0 right-0 sm:static sm:bottom-auto sm:mt-6 px-4 sm:px-0 z-40">
          <div className="bg-card sm:bg-transparent border-t sm:border-0 border-border shadow-xl sm:shadow-none px-0 pt-3 pb-2 sm:p-0">
            <Button
              type="button"
              data-ocid="settings.save_button"
              onClick={() => void handleSave()}
              disabled={saving || !form.shopName.trim()}
              className="w-full h-12 text-base font-semibold"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ── App Version ── */}
        <div className="mt-12 text-center space-y-1 pb-4">
          <p className="text-xs text-muted-foreground/60">
            Universal Shop Manager
          </p>
          <p className="text-xs text-muted-foreground/40">
            v1.0.0 · Built on Internet Computer
          </p>
        </div>

        {/* ── Logout ── */}
        <div className="mt-4 pb-8">
          <div className="bg-card border border-destructive/20 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <LogOut className="w-4 h-4 text-destructive" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-foreground text-sm">
                  Sign Out
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Log out of your Internet Identity. Your shop data stays safely
                  stored.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              data-ocid="settings.logout_button"
              onClick={handleLogout}
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* ── Change Shop Type Modal ── */}
      <Dialog open={changeShopTypeOpen} onOpenChange={setChangeShopTypeOpen}>
        <DialogContent
          data-ocid="settings.change_shop_type.dialog"
          className="max-w-lg max-h-[85vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              Select New Shop Type
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
            {Object.entries(SHOP_TYPE_META).map(([key, meta]) => {
              const type = key as ShopType | typeof BUILDING_MATERIAL_SHOP_TYPE;
              const isCurrent = (form.shopType as string) === key;
              return (
                <button
                  key={key}
                  type="button"
                  data-ocid={`settings.shop_type_option.${key.toLowerCase()}`}
                  onClick={() => {
                    setForm((p) => ({ ...p, shopType: type as ShopType }));
                    setChangeShopTypeOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/30 hover:bg-muted/40"
                  }`}
                >
                  <span className="text-2xl shrink-0">{meta.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-foreground truncate">
                      {meta.label}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {meta.desc}
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-primary text-sm shrink-0">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              data-ocid="settings.change_shop_type.cancel_button"
              onClick={() => setChangeShopTypeOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
