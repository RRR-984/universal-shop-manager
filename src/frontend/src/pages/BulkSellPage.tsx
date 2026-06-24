import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useApi } from "../lib/api";
import { formatCurrency } from "../lib/currency";
import { useStore } from "../lib/store";
import { PaymentType, PriceType } from "../types";
import type { ProductView } from "../types";

type SellRow = {
  id: string;
  product: ProductView | null;
  searchQuery: string;
  searchResults: ProductView[];
  showDropdown: boolean;
  qty: string;
  rate: string;
  unit: string;
  discount: number;
  balance: number | null;
};

type ExtraCharge = {
  id: string;
  description: string;
  amount: string;
};

function makeRow(): SellRow {
  return {
    id: Math.random().toString(36).slice(2),
    product: null,
    searchQuery: "",
    searchResults: [],
    showDropdown: false,
    qty: "1",
    rate: "",
    unit: "",
    discount: 0,
    balance: null,
  };
}

function makeCharge(): ExtraCharge {
  return {
    id: Math.random().toString(36).slice(2),
    description: "",
    amount: "",
  };
}

const DEFAULT_ROWS = 5;

export function BulkSellPage() {
  const api = useApi();
  const { shopConfig } = useStore();
  const activeShopId = useStore((s) => s.activeShopId);
  const currency = shopConfig?.currency ?? "USD";

  // shopIdRef: always-fresh shopId even when Zustand hasn't hydrated yet.
  // Eagerly populated at mount and kept in sync so handleSearch never gets
  // an empty string due to a hydration race condition.
  const shopIdRef = useRef<string>("");

  const resolveShopId = useCallback((): string | null => {
    if (activeShopId) return activeShopId;
    const keys = ["activeShopId", "currentShopId", "shopId", "selectedShopId"];
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v?.trim()) return v.trim();
    }
    // Try Zustand persist keys
    for (const storeKey of [
      "usm-store",
      "shop-storage",
      "universal-shop-storage",
      "shop-store",
    ]) {
      try {
        const raw = localStorage.getItem(storeKey);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            state?: { activeShopId?: string };
          };
          if (parsed?.state?.activeShopId) return parsed.state.activeShopId;
        }
      } catch {
        /* ignore parse errors */
      }
    }
    // Return null — do NOT return empty string (would cause cross-shop data leak)
    return null;
  }, [activeShopId]);

  // Keep ref always fresh — runs after every render
  useEffect(() => {
    const sid = resolveShopId();
    if (sid) shopIdRef.current = sid;
  });

  // Also eagerly set on mount (synchronous, before first render cycle settles)
  if (!shopIdRef.current) {
    shopIdRef.current = resolveShopId() ?? shopIdRef.current;
  }

  // Do NOT fall back to empty string for createBill — guard in handleSave instead

  const [rows, setRows] = useState<SellRow[]>(() =>
    Array.from({ length: DEFAULT_ROWS }, makeRow),
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [priceType, setPriceType] = useState<PriceType>(PriceType.Retail);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  // Sync taxPercent with shopConfig when it loads
  const taxSyncedRef = useRef(false);
  useEffect(() => {
    if (shopConfig && !taxSyncedRef.current) {
      taxSyncedRef.current = true;
      setTaxPercent(shopConfig.taxRate ?? 0);
    }
  }, [shopConfig]);
  const [extraCharges, setExtraCharges] = useState<ExtraCharge[]>([]);

  const searchTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const searchProductsRef = useRef(api.searchProducts);
  const listProductsRef = useRef(api.listProducts);
  useEffect(() => {
    searchProductsRef.current = api.searchProducts;
  }, [api.searchProducts]);
  useEffect(() => {
    listProductsRef.current = api.listProducts;
  }, [api.listProducts]);

  // Click-outside to close dropdowns
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-bulk-sell-row]")) {
        setRows((prev) => prev.map((r) => ({ ...r, showDropdown: false })));
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /** Load all active products for a shop — used for empty-query and last-resort fallback */
  const loadAllProducts = useCallback(
    async (sid: string): Promise<ProductView[]> => {
      try {
        const all = await listProductsRef.current({
          shopId: sid,
          isActive: true,
        });
        return all.filter((p) => p.isActive);
      } catch {
        return [];
      }
    },
    [],
  );

  const handleSearch = useCallback(
    (rowId: string, q: string) => {
      setRows((prev) =>
        prev.map((r) =>
          r.id === rowId
            ? {
                ...r,
                searchQuery: q,
                product: q ? r.product : null,
                unit: q ? r.unit : "",
                rate: q ? r.rate : "",
                balance: q ? r.balance : null,
              }
            : r,
        ),
      );
      if (searchTimersRef.current[rowId])
        clearTimeout(searchTimersRef.current[rowId]);

      // ALWAYS use shopIdRef.current — it's kept fresh via resolveShopId on every render.
      // This is the only reliable way to avoid the Zustand hydration race condition.
      const sid = shopIdRef.current || resolveShopId();

      if (!sid) {
        // Retry once after a short delay to let store hydrate
        searchTimersRef.current[rowId] = setTimeout(
          () => handleSearch(rowId, q),
          500,
        );
        return;
      }

      // Update ref so subsequent calls are instant
      shopIdRef.current = sid;

      // Empty query → show ALL shop products immediately (no filtering)
      if (!q.trim()) {
        searchTimersRef.current[rowId] = setTimeout(async () => {
          const results = await loadAllProducts(sid);
          setRows((prev) =>
            prev.map((r) =>
              r.id === rowId
                ? {
                    ...r,
                    searchResults: results,
                    showDropdown: results.length > 0,
                  }
                : r,
            ),
          );
        }, 100);
        return;
      }

      searchTimersRef.current[rowId] = setTimeout(async () => {
        try {
          let results = await searchProductsRef.current(sid, q);
          results = results.filter((p) => p.isActive);

          // Fallback 1: listProducts with searchName filter
          if (results.length === 0) {
            const fallback = await listProductsRef.current({
              shopId: sid,
              isActive: true,
              searchName: q,
            });
            results = fallback.filter((p) => p.isActive);
          }

          // Fallback 2: load all products and filter client-side
          if (results.length === 0) {
            const all = await loadAllProducts(sid);
            const lower = q.toLowerCase();
            results = all.filter(
              (p) =>
                p.name.toLowerCase().includes(lower) ||
                (p.barcode && String(p.barcode).toLowerCase().includes(lower)),
            );
          }

          setRows((prev) =>
            prev.map((r) =>
              r.id === rowId
                ? {
                    ...r,
                    searchResults: results,
                    showDropdown: results.length > 0,
                  }
                : r,
            ),
          );
        } catch {
          toast.error("Could not load products. Please try again.");
        }
      }, 200);
    },
    [resolveShopId, loadAllProducts],
  );

  /** On input focus: show all products when empty, or re-show existing results */
  const handleFocus = useCallback(
    (rowId: string, currentQuery: string, hasResults: boolean) => {
      if (!currentQuery.trim()) {
        handleSearch(rowId, "");
      } else if (hasResults) {
        setRows((prev) =>
          prev.map((r) => (r.id === rowId ? { ...r, showDropdown: true } : r)),
        );
      }
    },
    [handleSearch],
  );

  const selectProduct = useCallback(
    (rowId: string, product: ProductView) => {
      const rate =
        priceType === PriceType.Wholesale
          ? product.wholesalePrice
          : product.retailPrice;
      setRows((prev) =>
        prev.map((r) =>
          r.id === rowId
            ? {
                ...r,
                product,
                searchQuery: product.name,
                unit: product.unit,
                rate: String(rate),
                balance: Number(product.stock),
                searchResults: [],
                showDropdown: false,
              }
            : r,
        ),
      );
    },
    [priceType],
  );

  const updateField = (
    rowId: string,
    field: "qty" | "rate" | "unit" | "discount",
    value: string,
  ) => {
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)),
    );
  };

  const removeRow = (rowId: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const addRow = () => setRows((prev) => [...prev, makeRow()]);

  const clearAll = () => {
    setRows(Array.from({ length: DEFAULT_ROWS }, makeRow));
    setCustomerName("");
    setCustomerPhone("");
    setExtraCharges([]);
    setTaxPercent(0);
  };

  const addCharge = () => setExtraCharges((prev) => [...prev, makeCharge()]);

  const updateCharge = (
    chargeId: string,
    field: "description" | "amount",
    value: string,
  ) => {
    setExtraCharges((prev) =>
      prev.map((c) => (c.id === chargeId ? { ...c, [field]: value } : c)),
    );
  };

  const removeCharge = (chargeId: string) => {
    setExtraCharges((prev) => prev.filter((c) => c.id !== chargeId));
  };

  // When price type changes, update rates for already-selected products
  useEffect(() => {
    setRows((prev) =>
      prev.map((r) => {
        if (!r.product) return r;
        const rate =
          priceType === PriceType.Wholesale
            ? r.product.wholesalePrice
            : r.product.retailPrice;
        return { ...r, rate: String(rate) };
      }),
    );
  }, [priceType]);

  const filledRows = rows.filter((r) => r.product && Number(r.qty) > 0);

  const subtotal = filledRows.reduce((acc, r) => {
    const qty = Number(r.qty);
    const rate = Number(r.rate);
    const disc = r.discount ?? 0;
    return acc + rate * qty * (1 - disc / 100);
  }, 0);

  const extraChargesTotal = extraCharges.reduce(
    (acc, c) => acc + (Number(c.amount) || 0),
    0,
  );
  const taxAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + taxAmount + extraChargesTotal;

  const fmt = (n: number) => formatCurrency(n, currency, false);

  const handleSave = async () => {
    if (filledRows.length === 0) {
      toast.error("Add at least one product to sell");
      return;
    }
    const resolvedShopId = resolveShopId();
    if (!resolvedShopId) {
      toast.error(
        "No active shop selected. Please select a shop and try again.",
      );
      return;
    }
    for (const r of filledRows) {
      if (!r.qty || Number(r.qty) <= 0) {
        toast.error(`Qty must be > 0 for ${r.product?.name}`);
        return;
      }
      if (!r.rate || Number(r.rate) < 0) {
        toast.error(`Rate missing for ${r.product?.name}`);
        return;
      }
    }
    setIsSaving(true);
    try {
      const bill = await api.createBill(resolvedShopId, {
        shopId: resolvedShopId,
        customerName: customerName.trim() || "Anonymous",
        customerPhone: customerPhone.trim(),
        priceType,
        billDiscount: 0,
        paymentType: PaymentType.full,
        amountPaid: grandTotal,
        extraCharges: extraCharges
          .filter((c) => c.description.trim() && Number(c.amount) > 0)
          .map((c) => ({
            description: c.description.trim(),
            amount: Number(c.amount),
          })),
        items: filledRows.map((r) => {
          const qty = Number(r.qty);
          const rate = Number(r.rate);
          const disc = r.discount ?? 0;
          const discAmt = (rate * qty * disc) / 100;
          return {
            productId: r.product!.id,
            name: r.product!.name,
            qty,
            rate,
            unit: r.unit || r.product!.unit,
            discount: disc,
            taxAmt: 0,
            lineTotal: rate * qty - discAmt,
          };
        }),
      });
      toast.success(
        `Bill #${bill.billNumber} saved — ${filledRows.length} items`,
      );
      clearAll();
    } catch {
      toast.error("Failed to save bill. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col min-h-0 bg-background"
      data-ocid="bulk_sell.page"
    >
      {/* Header */}
      <div className="bg-card border-b px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/billing"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to billing"
            data-ocid="bulk_sell.back_link"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              Bulk Sell
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filledRows.length} item{filledRows.length !== 1 ? "s" : ""} ·{" "}
              {fmt(subtotal)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Price Type */}
          <div
            className="hidden sm:flex gap-0.5 p-0.5 bg-muted rounded-lg"
            data-ocid="bulk_sell.price_type_tab"
          >
            {([PriceType.Retail, PriceType.Wholesale] as PriceType[]).map(
              (pt) => (
                <button
                  key={pt}
                  type="button"
                  onClick={() => setPriceType(pt)}
                  data-ocid={`bulk_sell.price_type.${pt.toLowerCase()}`}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    priceType === pt
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pt === PriceType.Retail ? "Retail" : "Wholesale"}
                </button>
              ),
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="gap-1.5 text-muted-foreground"
            data-ocid="bulk_sell.clear_button"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || filledRows.length === 0}
            className="gap-1.5"
            data-ocid="bulk_sell.save_button"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Save Bill</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </div>

      {/* Customer Row */}
      <div className="bg-card border-b px-4 py-3 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Customer Name{" "}
            <span className="font-normal normal-case">(optional)</span>
          </p>
          <Input
            placeholder="Anonymous"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="h-9"
            data-ocid="bulk_sell.customer_name_input"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Phone <span className="font-normal normal-case">(optional)</span>
          </p>
          <Input
            placeholder="+91 00000 00000"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="h-9"
            data-ocid="bulk_sell.customer_phone_input"
          />
        </div>
        {/* Mobile price type */}
        <div
          className="sm:hidden flex gap-0.5 p-0.5 bg-muted rounded-lg w-fit self-end"
          data-ocid="bulk_sell.price_type_tab_mobile"
        >
          {([PriceType.Retail, PriceType.Wholesale] as PriceType[]).map(
            (pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => setPriceType(pt)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  priceType === pt
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pt === PriceType.Retail ? "Retail" : "Wholesale"}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4 pb-6">
        {/* Spreadsheet Table */}
        <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
          {/* Column Headers: PRODUCT | QTY | BAL. | UNIT | RATE | DISC% | TOTAL | DEL */}
          <div className="grid grid-cols-[2fr_0.75fr_0.65fr_0.75fr_1fr_0.6fr_1fr_auto] gap-0 bg-muted/50 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="px-3 py-2.5">Product</div>
            <div className="px-3 py-2.5 text-right">Qty</div>
            <div className="px-3 py-2.5 text-center">Bal.</div>
            <div className="px-3 py-2.5">Unit</div>
            <div className="px-3 py-2.5 text-right">Rate</div>
            <div className="px-3 py-2.5 text-right">Disc%</div>
            <div className="px-3 py-2.5 text-right">Total</div>
            <div className="px-3 py-2.5 w-10" />
          </div>

          {/* Rows */}
          {rows.map((row, idx) => (
            <div
              key={row.id}
              data-bulk-sell-row
              data-ocid={`bulk_sell.item.${idx + 1}`}
              className="grid grid-cols-[2fr_0.75fr_0.65fr_0.75fr_1fr_0.6fr_1fr_auto] gap-0 border-b last:border-b-0 relative group"
            >
              {/* Product search */}
              <div className="px-2 py-1.5 border-r relative">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder={`Item ${idx + 1}`}
                    value={row.searchQuery}
                    onChange={(e) => handleSearch(row.id, e.target.value)}
                    onFocus={() =>
                      handleFocus(
                        row.id,
                        row.searchQuery,
                        row.searchResults.length > 0,
                      )
                    }
                    className="w-full pl-7 pr-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors placeholder:text-muted-foreground/50"
                    data-ocid={`bulk_sell.product_search.${idx + 1}`}
                  />
                  {row.product && (
                    <Badge
                      variant="secondary"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] h-4 px-1 bg-primary/10 text-primary border-primary/20"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
                {/* Dropdown */}
                {row.showDropdown && row.searchResults.length > 0 && (
                  <div className="absolute z-30 top-full left-0 right-0 bg-card border rounded-xl shadow-xl overflow-hidden max-h-52 overflow-y-auto">
                    {row.searchResults.map((p, pIdx) => (
                      <button
                        key={String(p.id)}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectProduct(row.id, p);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left border-b last:border-b-0"
                        data-ocid={`bulk_sell.search_result.${idx + 1}.${pIdx + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.unit} · Stock: {String(p.stock)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-primary shrink-0">
                          {fmt(
                            priceType === PriceType.Wholesale
                              ? p.wholesalePrice
                              : p.retailPrice,
                          )}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Qty */}
              <div className="px-2 py-1.5 border-r">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={row.qty}
                  onChange={(e) => updateField(row.id, "qty", e.target.value)}
                  placeholder="1"
                  className="w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right"
                  data-ocid={`bulk_sell.qty.${idx + 1}`}
                />
              </div>

              {/* Balance (read-only stock display) */}
              <div className="px-1 py-1.5 border-r flex items-center justify-center">
                {row.balance !== null ? (
                  <span
                    className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${
                      row.balance <= 0
                        ? "bg-destructive/10 text-destructive"
                        : row.balance <= 5
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "text-muted-foreground"
                    }`}
                    data-ocid={`bulk_sell.balance.${idx + 1}`}
                  >
                    {row.balance}
                  </span>
                ) : (
                  <span className="text-muted-foreground/30 text-xs">—</span>
                )}
              </div>

              {/* Unit */}
              <div className="px-2 py-1.5 border-r">
                <input
                  type="text"
                  value={row.unit}
                  onChange={(e) => updateField(row.id, "unit", e.target.value)}
                  placeholder="pcs"
                  className="w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors"
                  data-ocid={`bulk_sell.unit.${idx + 1}`}
                />
              </div>

              {/* Rate */}
              <div className="px-2 py-1.5 border-r">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.rate}
                  onChange={(e) => updateField(row.id, "rate", e.target.value)}
                  placeholder="0.00"
                  className="w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right"
                  data-ocid={`bulk_sell.rate.${idx + 1}`}
                />
              </div>

              {/* Discount % */}
              <div className="px-2 py-1.5 border-r">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={row.discount === 0 ? "" : String(row.discount)}
                  onChange={(e) =>
                    setRows((prev) =>
                      prev.map((r) =>
                        r.id === row.id
                          ? { ...r, discount: Number(e.target.value) || 0 }
                          : r,
                      ),
                    )
                  }
                  placeholder="0"
                  className="w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right"
                  data-ocid={`bulk_sell.discount.${idx + 1}`}
                />
              </div>

              {/* Row Total */}
              <div className="px-2 py-1.5 border-r flex items-center justify-end">
                <span className="text-sm font-semibold text-foreground">
                  {row.product && Number(row.qty) > 0 && Number(row.rate) > 0
                    ? (
                        Number(row.qty) *
                        Number(row.rate) *
                        (1 - (row.discount ?? 0) / 100)
                      ).toFixed(2)
                    : "—"}
                </span>
              </div>

              {/* Remove */}
              <div className="w-10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 1}
                  aria-label="Remove row"
                  className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all disabled:pointer-events-none"
                  data-ocid={`bulk_sell.delete_button.${idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Row */}
        <button
          type="button"
          onClick={addRow}
          className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors px-1"
          data-ocid="bulk_sell.add_row_button"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>

        {/* ── Extra Charges ── */}
        <div
          className="mt-5 border rounded-xl bg-card shadow-sm overflow-hidden"
          data-ocid="bulk_sell.extra_charges_section"
        >
          <div className="px-4 py-2.5 bg-muted/40 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Extra Charges
            </span>
            <button
              type="button"
              onClick={addCharge}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
              data-ocid="bulk_sell.add_charge_button"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Charge
            </button>
          </div>
          {extraCharges.length === 0 ? (
            <div className="px-4 py-3 text-xs text-muted-foreground/60 italic">
              Transport, Labour, Packing, etc. — click "Add Charge" to add
            </div>
          ) : (
            <div className="divide-y divide-border">
              {extraCharges.map((charge, cIdx) => (
                <div
                  key={charge.id}
                  className="flex items-center gap-2 px-3 py-2.5"
                  data-ocid={`bulk_sell.charge_row.${cIdx + 1}`}
                >
                  <input
                    type="text"
                    placeholder="Description (e.g. Transport, Labour)"
                    value={charge.description}
                    onChange={(e) =>
                      updateCharge(charge.id, "description", e.target.value)
                    }
                    className="flex-1 min-w-0 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                    data-ocid={`bulk_sell.charge_desc.${cIdx + 1}`}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Amount"
                    value={charge.amount}
                    onChange={(e) =>
                      updateCharge(charge.id, "amount", e.target.value)
                    }
                    className="w-28 shrink-0 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg outline-none focus:ring-1 focus:ring-primary text-right"
                    data-ocid={`bulk_sell.charge_amount.${cIdx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeCharge(charge.id)}
                    aria-label="Remove charge"
                    className="w-7 h-7 shrink-0 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    data-ocid={`bulk_sell.remove_charge_button.${cIdx + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── GST / Tax ── */}
        <div
          className="mt-3 border rounded-xl bg-card shadow-sm overflow-hidden"
          data-ocid="bulk_sell.tax_section"
        >
          <div className="px-4 py-2.5 bg-muted/40 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              GST / Tax
            </span>
          </div>
          <div className="px-4 py-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="bulk-sell-tax"
                className="text-sm text-muted-foreground whitespace-nowrap"
              >
                Tax %
              </label>
              <input
                id="bulk-sell-tax"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={taxPercent === 0 ? "" : String(taxPercent)}
                onChange={(e) =>
                  setTaxPercent(
                    Math.min(100, Math.max(0, Number(e.target.value) || 0)),
                  )
                }
                placeholder="0"
                className="w-20 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg text-right outline-none focus:ring-1 focus:ring-primary"
                data-ocid="bulk_sell.tax_percent_input"
              />
            </div>
            {taxPercent > 0 && (
              <span className="text-sm text-muted-foreground">
                Tax on subtotal{" ("}
                {fmt(subtotal)}
                {"): "}
                <span className="font-semibold text-foreground">
                  {fmt(taxAmount)}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Summary — always visible, shows totals + Save */}
      <div className="bg-card border-t px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {/* Left: item count */}
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filledRows.length}
            </span>{" "}
            item{filledRows.length !== 1 ? "s" : ""}
          </span>

          {/* Right: summary + action */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
            {/* Summary column */}
            <div className="flex flex-col gap-1.5 min-w-[240px]">
              {/* Subtotal */}
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs text-muted-foreground">Subtotal</span>
                <span className="text-sm font-semibold text-foreground">
                  {fmt(subtotal)}
                </span>
              </div>

              {/* Extra charges total */}
              {extraChargesTotal > 0 && (
                <div className="flex items-center justify-between gap-8">
                  <span className="text-xs text-muted-foreground">
                    Extra Charges
                  </span>
                  <span className="text-sm text-foreground">
                    + {fmt(extraChargesTotal)}
                  </span>
                </div>
              )}

              {/* Tax */}
              {taxPercent > 0 && (
                <div className="flex items-center justify-between gap-8">
                  <span className="text-xs text-muted-foreground">
                    GST/Tax ({taxPercent}%)
                  </span>
                  <span className="text-sm text-foreground">
                    + {fmt(taxAmount)}
                  </span>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-border mt-0.5" />

              {/* Grand Total */}
              <div className="flex items-center justify-between gap-8">
                <span className="text-sm font-bold text-foreground">
                  Grand Total
                </span>
                <span
                  className="text-xl font-bold text-primary font-display"
                  data-ocid="bulk_sell.grand_total"
                >
                  {fmt(grandTotal)}
                </span>
              </div>
            </div>

            {/* Save Button */}
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving || filledRows.length === 0}
              size="lg"
              className="gap-2 self-end"
              data-ocid="bulk_sell.footer_save_button"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Bill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
