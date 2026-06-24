import { c as useApi, d as useStore, r as reactExports, Q as PriceType, j as jsxRuntimeExports, U as Link, f as Button, k as LoaderCircle, B as Badge, H as Trash2, y as Plus, X, V as PaymentType } from "./index-CNXs12t8.js";
import { I as Input } from "./input-DeXUznaN.js";
import { u as ue } from "./index-CkUuusRi.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { A as ArrowLeft } from "./arrow-left-CM3E2oU4.js";
import { R as RotateCcw } from "./rotate-ccw-La8wxNyv.js";
import { S as Save } from "./save-DAH5D5pw.js";
import { S as Search } from "./search-Q1tperYz.js";
function makeRow() {
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
    balance: null
  };
}
function makeCharge() {
  return {
    id: Math.random().toString(36).slice(2),
    description: "",
    amount: ""
  };
}
const DEFAULT_ROWS = 5;
function BulkSellPage() {
  const api = useApi();
  const { shopConfig } = useStore();
  const activeShopId = useStore((s) => s.activeShopId);
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const shopIdRef = reactExports.useRef("");
  const resolveShopId = reactExports.useCallback(() => {
    var _a;
    if (activeShopId) return activeShopId;
    const keys = ["activeShopId", "currentShopId", "shopId", "selectedShopId"];
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v == null ? void 0 : v.trim()) return v.trim();
    }
    for (const storeKey of [
      "usm-store",
      "shop-storage",
      "universal-shop-storage",
      "shop-store"
    ]) {
      try {
        const raw = localStorage.getItem(storeKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if ((_a = parsed == null ? void 0 : parsed.state) == null ? void 0 : _a.activeShopId) return parsed.state.activeShopId;
        }
      } catch {
      }
    }
    return null;
  }, [activeShopId]);
  reactExports.useEffect(() => {
    const sid = resolveShopId();
    if (sid) shopIdRef.current = sid;
  });
  if (!shopIdRef.current) {
    shopIdRef.current = resolveShopId() ?? shopIdRef.current;
  }
  const [rows, setRows] = reactExports.useState(
    () => Array.from({ length: DEFAULT_ROWS }, makeRow)
  );
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerPhone, setCustomerPhone] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [priceType, setPriceType] = reactExports.useState(PriceType.Retail);
  const [taxPercent, setTaxPercent] = reactExports.useState(0);
  const taxSyncedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (shopConfig && !taxSyncedRef.current) {
      taxSyncedRef.current = true;
      setTaxPercent(shopConfig.taxRate ?? 0);
    }
  }, [shopConfig]);
  const [extraCharges, setExtraCharges] = reactExports.useState([]);
  const searchTimersRef = reactExports.useRef(
    {}
  );
  const searchProductsRef = reactExports.useRef(api.searchProducts);
  const listProductsRef = reactExports.useRef(api.listProducts);
  reactExports.useEffect(() => {
    searchProductsRef.current = api.searchProducts;
  }, [api.searchProducts]);
  reactExports.useEffect(() => {
    listProductsRef.current = api.listProducts;
  }, [api.listProducts]);
  reactExports.useEffect(() => {
    function handler(e) {
      const target = e.target;
      if (!target.closest("[data-bulk-sell-row]")) {
        setRows((prev) => prev.map((r) => ({ ...r, showDropdown: false })));
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const loadAllProducts = reactExports.useCallback(
    async (sid) => {
      try {
        const all = await listProductsRef.current({
          shopId: sid,
          isActive: true
        });
        return all.filter((p) => p.isActive);
      } catch {
        return [];
      }
    },
    []
  );
  const handleSearch = reactExports.useCallback(
    (rowId, q) => {
      setRows(
        (prev) => prev.map(
          (r) => r.id === rowId ? {
            ...r,
            searchQuery: q,
            product: q ? r.product : null,
            unit: q ? r.unit : "",
            rate: q ? r.rate : "",
            balance: q ? r.balance : null
          } : r
        )
      );
      if (searchTimersRef.current[rowId])
        clearTimeout(searchTimersRef.current[rowId]);
      const sid = shopIdRef.current || resolveShopId();
      if (!sid) {
        searchTimersRef.current[rowId] = setTimeout(
          () => handleSearch(rowId, q),
          500
        );
        return;
      }
      shopIdRef.current = sid;
      if (!q.trim()) {
        searchTimersRef.current[rowId] = setTimeout(async () => {
          const results = await loadAllProducts(sid);
          setRows(
            (prev) => prev.map(
              (r) => r.id === rowId ? {
                ...r,
                searchResults: results,
                showDropdown: results.length > 0
              } : r
            )
          );
        }, 100);
        return;
      }
      searchTimersRef.current[rowId] = setTimeout(async () => {
        try {
          let results = await searchProductsRef.current(sid, q);
          results = results.filter((p) => p.isActive);
          if (results.length === 0) {
            const fallback = await listProductsRef.current({
              shopId: sid,
              isActive: true,
              searchName: q
            });
            results = fallback.filter((p) => p.isActive);
          }
          if (results.length === 0) {
            const all = await loadAllProducts(sid);
            const lower = q.toLowerCase();
            results = all.filter(
              (p) => p.name.toLowerCase().includes(lower) || p.barcode && String(p.barcode).toLowerCase().includes(lower)
            );
          }
          setRows(
            (prev) => prev.map(
              (r) => r.id === rowId ? {
                ...r,
                searchResults: results,
                showDropdown: results.length > 0
              } : r
            )
          );
        } catch {
          ue.error("Could not load products. Please try again.");
        }
      }, 200);
    },
    [resolveShopId, loadAllProducts]
  );
  const handleFocus = reactExports.useCallback(
    (rowId, currentQuery, hasResults) => {
      if (!currentQuery.trim()) {
        handleSearch(rowId, "");
      } else if (hasResults) {
        setRows(
          (prev) => prev.map((r) => r.id === rowId ? { ...r, showDropdown: true } : r)
        );
      }
    },
    [handleSearch]
  );
  const selectProduct = reactExports.useCallback(
    (rowId, product) => {
      const rate = priceType === PriceType.Wholesale ? product.wholesalePrice : product.retailPrice;
      setRows(
        (prev) => prev.map(
          (r) => r.id === rowId ? {
            ...r,
            product,
            searchQuery: product.name,
            unit: product.unit,
            rate: String(rate),
            balance: Number(product.stock),
            searchResults: [],
            showDropdown: false
          } : r
        )
      );
    },
    [priceType]
  );
  const updateField = (rowId, field, value) => {
    setRows(
      (prev) => prev.map((r) => r.id === rowId ? { ...r, [field]: value } : r)
    );
  };
  const removeRow = (rowId) => {
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
  const updateCharge = (chargeId, field, value) => {
    setExtraCharges(
      (prev) => prev.map((c) => c.id === chargeId ? { ...c, [field]: value } : c)
    );
  };
  const removeCharge = (chargeId) => {
    setExtraCharges((prev) => prev.filter((c) => c.id !== chargeId));
  };
  reactExports.useEffect(() => {
    setRows(
      (prev) => prev.map((r) => {
        if (!r.product) return r;
        const rate = priceType === PriceType.Wholesale ? r.product.wholesalePrice : r.product.retailPrice;
        return { ...r, rate: String(rate) };
      })
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
    0
  );
  const taxAmount = subtotal * (taxPercent / 100);
  const grandTotal = subtotal + taxAmount + extraChargesTotal;
  const fmt = (n) => formatCurrency(n, currency, false);
  const handleSave = async () => {
    var _a, _b;
    if (filledRows.length === 0) {
      ue.error("Add at least one product to sell");
      return;
    }
    const resolvedShopId = resolveShopId();
    if (!resolvedShopId) {
      ue.error(
        "No active shop selected. Please select a shop and try again."
      );
      return;
    }
    for (const r of filledRows) {
      if (!r.qty || Number(r.qty) <= 0) {
        ue.error(`Qty must be > 0 for ${(_a = r.product) == null ? void 0 : _a.name}`);
        return;
      }
      if (!r.rate || Number(r.rate) < 0) {
        ue.error(`Rate missing for ${(_b = r.product) == null ? void 0 : _b.name}`);
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
        extraCharges: extraCharges.filter((c) => c.description.trim() && Number(c.amount) > 0).map((c) => ({
          description: c.description.trim(),
          amount: Number(c.amount)
        })),
        items: filledRows.map((r) => {
          const qty = Number(r.qty);
          const rate = Number(r.rate);
          const disc = r.discount ?? 0;
          const discAmt = rate * qty * disc / 100;
          return {
            productId: r.product.id,
            name: r.product.name,
            qty,
            rate,
            unit: r.unit || r.product.unit,
            discount: disc,
            taxAmt: 0,
            lineTotal: rate * qty - discAmt
          };
        })
      });
      ue.success(
        `Bill #${bill.billNumber} saved — ${filledRows.length} items`
      );
      clearAll();
    } catch {
      ue.error("Failed to save bill. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col min-h-0 bg-background",
      "data-ocid": "bulk_sell.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-10 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/billing",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Back to billing",
                "data-ocid": "bulk_sell.back_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground leading-tight", children: "Bulk Sell" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                filledRows.length,
                " item",
                filledRows.length !== 1 ? "s" : "",
                " ·",
                " ",
                fmt(subtotal)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "hidden sm:flex gap-0.5 p-0.5 bg-muted rounded-lg",
                "data-ocid": "bulk_sell.price_type_tab",
                children: [PriceType.Retail, PriceType.Wholesale].map(
                  (pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPriceType(pt),
                      "data-ocid": `bulk_sell.price_type.${pt.toLowerCase()}`,
                      className: `px-3 py-1 rounded-md text-xs font-medium transition-all ${priceType === pt ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                      children: pt === PriceType.Retail ? "Retail" : "Wholesale"
                    },
                    pt
                  )
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: clearAll,
                className: "gap-1.5 text-muted-foreground",
                "data-ocid": "bulk_sell.clear_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Clear" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                onClick: handleSave,
                disabled: isSaving || filledRows.length === 0,
                className: "gap-1.5",
                "data-ocid": "bulk_sell.save_button",
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Save Bill" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Save" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b px-4 py-3 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: [
              "Customer Name",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal normal-case", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Anonymous",
                value: customerName,
                onChange: (e) => setCustomerName(e.target.value),
                className: "h-9",
                "data-ocid": "bulk_sell.customer_name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: [
              "Phone ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal normal-case", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "+91 00000 00000",
                value: customerPhone,
                onChange: (e) => setCustomerPhone(e.target.value),
                className: "h-9",
                "data-ocid": "bulk_sell.customer_phone_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "sm:hidden flex gap-0.5 p-0.5 bg-muted rounded-lg w-fit self-end",
              "data-ocid": "bulk_sell.price_type_tab_mobile",
              children: [PriceType.Retail, PriceType.Wholesale].map(
                (pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPriceType(pt),
                    className: `px-3 py-1 rounded-md text-xs font-medium transition-all ${priceType === pt ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                    children: pt === PriceType.Retail ? "Retail" : "Wholesale"
                  },
                  pt
                )
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-auto p-4 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-xl overflow-hidden bg-card shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2fr_0.75fr_0.65fr_0.75fr_1fr_0.6fr_1fr_auto] gap-0 bg-muted/50 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5", children: "Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 text-right", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 text-center", children: "Bal." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5", children: "Unit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 text-right", children: "Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 text-right", children: "Disc%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 text-right", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 w-10" })
            ] }),
            rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-bulk-sell-row": true,
                "data-ocid": `bulk_sell.item.${idx + 1}`,
                className: "grid grid-cols-[2fr_0.75fr_0.65fr_0.75fr_1fr_0.6fr_1fr_auto] gap-0 border-b last:border-b-0 relative group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1.5 border-r relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: `Item ${idx + 1}`,
                          value: row.searchQuery,
                          onChange: (e) => handleSearch(row.id, e.target.value),
                          onFocus: () => handleFocus(
                            row.id,
                            row.searchQuery,
                            row.searchResults.length > 0
                          ),
                          className: "w-full pl-7 pr-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors placeholder:text-muted-foreground/50",
                          "data-ocid": `bulk_sell.product_search.${idx + 1}`
                        }
                      ),
                      row.product && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "absolute right-1 top-1/2 -translate-y-1/2 text-[9px] h-4 px-1 bg-primary/10 text-primary border-primary/20",
                          children: "✓"
                        }
                      )
                    ] }),
                    row.showDropdown && row.searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-30 top-full left-0 right-0 bg-card border rounded-xl shadow-xl overflow-hidden max-h-52 overflow-y-auto", children: row.searchResults.map((p, pIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onMouseDown: (e) => {
                          e.preventDefault();
                          selectProduct(row.id, p);
                        },
                        className: "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left border-b last:border-b-0",
                        "data-ocid": `bulk_sell.search_result.${idx + 1}.${pIdx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: p.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                              p.unit,
                              " · Stock: ",
                              String(p.stock)
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary shrink-0", children: fmt(
                            priceType === PriceType.Wholesale ? p.wholesalePrice : p.retailPrice
                          ) })
                        ]
                      },
                      String(p.id)
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 border-r", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      step: "1",
                      value: row.qty,
                      onChange: (e) => updateField(row.id, "qty", e.target.value),
                      placeholder: "1",
                      className: "w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right",
                      "data-ocid": `bulk_sell.qty.${idx + 1}`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-1 py-1.5 border-r flex items-center justify-center", children: row.balance !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${row.balance <= 0 ? "bg-destructive/10 text-destructive" : row.balance <= 5 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "text-muted-foreground"}`,
                      "data-ocid": `bulk_sell.balance.${idx + 1}`,
                      children: row.balance
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 text-xs", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 border-r", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: row.unit,
                      onChange: (e) => updateField(row.id, "unit", e.target.value),
                      placeholder: "pcs",
                      className: "w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors",
                      "data-ocid": `bulk_sell.unit.${idx + 1}`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 border-r", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      step: "0.01",
                      value: row.rate,
                      onChange: (e) => updateField(row.id, "rate", e.target.value),
                      placeholder: "0.00",
                      className: "w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right",
                      "data-ocid": `bulk_sell.rate.${idx + 1}`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 border-r", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      max: "100",
                      step: "0.5",
                      value: row.discount === 0 ? "" : String(row.discount),
                      onChange: (e) => setRows(
                        (prev) => prev.map(
                          (r) => r.id === row.id ? { ...r, discount: Number(e.target.value) || 0 } : r
                        )
                      ),
                      placeholder: "0",
                      className: "w-full px-2 py-1.5 text-sm bg-transparent border-0 outline-none focus:bg-primary/5 rounded transition-colors text-right",
                      "data-ocid": `bulk_sell.discount.${idx + 1}`
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 border-r flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: row.product && Number(row.qty) > 0 && Number(row.rate) > 0 ? (Number(row.qty) * Number(row.rate) * (1 - (row.discount ?? 0) / 100)).toFixed(2) : "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeRow(row.id),
                      disabled: rows.length <= 1,
                      "aria-label": "Remove row",
                      className: "w-7 h-7 rounded flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all disabled:pointer-events-none",
                      "data-ocid": `bulk_sell.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  ) })
                ]
              },
              row.id
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: addRow,
              className: "mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors px-1",
              "data-ocid": "bulk_sell.add_row_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Row"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-5 border rounded-xl bg-card shadow-sm overflow-hidden",
              "data-ocid": "bulk_sell.extra_charges_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 bg-muted/40 border-b flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Extra Charges" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: addCharge,
                      className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors",
                      "data-ocid": "bulk_sell.add_charge_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                        "Add Charge"
                      ]
                    }
                  )
                ] }),
                extraCharges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-xs text-muted-foreground/60 italic", children: 'Transport, Labour, Packing, etc. — click "Add Charge" to add' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: extraCharges.map((charge, cIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 px-3 py-2.5",
                    "data-ocid": `bulk_sell.charge_row.${cIdx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Description (e.g. Transport, Labour)",
                          value: charge.description,
                          onChange: (e) => updateCharge(charge.id, "description", e.target.value),
                          className: "flex-1 min-w-0 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50",
                          "data-ocid": `bulk_sell.charge_desc.${cIdx + 1}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "Amount",
                          value: charge.amount,
                          onChange: (e) => updateCharge(charge.id, "amount", e.target.value),
                          className: "w-28 shrink-0 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg outline-none focus:ring-1 focus:ring-primary text-right",
                          "data-ocid": `bulk_sell.charge_amount.${cIdx + 1}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeCharge(charge.id),
                          "aria-label": "Remove charge",
                          className: "w-7 h-7 shrink-0 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all",
                          "data-ocid": `bulk_sell.remove_charge_button.${cIdx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  },
                  charge.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 border rounded-xl bg-card shadow-sm overflow-hidden",
              "data-ocid": "bulk_sell.tax_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 bg-muted/40 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "GST / Tax" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-wrap items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "bulk-sell-tax",
                        className: "text-sm text-muted-foreground whitespace-nowrap",
                        children: "Tax %"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "bulk-sell-tax",
                        type: "number",
                        min: "0",
                        max: "100",
                        step: "0.5",
                        value: taxPercent === 0 ? "" : String(taxPercent),
                        onChange: (e) => setTaxPercent(
                          Math.min(100, Math.max(0, Number(e.target.value) || 0))
                        ),
                        placeholder: "0",
                        className: "w-20 px-3 py-1.5 text-sm bg-muted/30 border border-input rounded-lg text-right outline-none focus:ring-1 focus:ring-primary",
                        "data-ocid": "bulk_sell.tax_percent_input"
                      }
                    )
                  ] }),
                  taxPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "Tax on subtotal",
                    " (",
                    fmt(subtotal),
                    "): ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: fmt(taxAmount) })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-t px-4 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filledRows.length }),
            " ",
            "item",
            filledRows.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-end sm:items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 min-w-[240px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: fmt(subtotal) })
              ] }),
              extraChargesTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Extra Charges" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
                  "+ ",
                  fmt(extraChargesTotal)
                ] })
              ] }),
              taxPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "GST/Tax (",
                  taxPercent,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
                  "+ ",
                  fmt(taxAmount)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xl font-bold text-primary font-display",
                    "data-ocid": "bulk_sell.grand_total",
                    children: fmt(grandTotal)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleSave,
                disabled: isSaving || filledRows.length === 0,
                size: "lg",
                className: "gap-2 self-end",
                "data-ocid": "bulk_sell.footer_save_button",
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save Bill"
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  BulkSellPage
};
