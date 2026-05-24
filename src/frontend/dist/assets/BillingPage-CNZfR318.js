import { m as createLucideIcon, T as TaxSystem, O as useTranslation, d as useStore, c as useApi, D as DateFormat, N as NumberFormat, r as reactExports, Q as PriceType, j as jsxRuntimeExports, f as Button, x as Plus, X, U as PaymentType, G as Trash2, B as Badge } from "./index-B4wG-Osg.js";
import { I as Input } from "./input-C3hfLS_6.js";
import { u as ue } from "./dialog-D8c-E91l.js";
import { B as BillShareCard, a as BillPrintDialog } from "./BillShareCard-BLh1gDad.js";
import { f as formatCurrency, g as getCurrencyConfig } from "./currency-KTzMGZJt.js";
import { a as formatDateTime } from "./date-BsAh7d1A.js";
import { R as RotateCcw } from "./rotate-ccw-jUXTdmd2.js";
import { S as Save } from "./save-nzCPvIbG.js";
import { P as Printer } from "./printer--QIgwFLu.js";
import { S as Search } from "./search-C8DgYnmU.js";
import { S as ScanLine, C as Camera } from "./scan-line-Cg8znW18.js";
import "./label-D63JudhP.js";
import "./message-circle-Dy1gVgMK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function calculateTax(amount, taxSystem, taxRate, inclusive = false) {
  const rate = taxRate / 100;
  let subtotal;
  let taxAmount;
  if (inclusive) {
    subtotal = amount / (1 + rate);
    taxAmount = amount - subtotal;
  } else {
    subtotal = amount;
    taxAmount = amount * rate;
  }
  const total = subtotal + taxAmount;
  switch (taxSystem) {
    case TaxSystem.GST: {
      const half = taxAmount / 2;
      return {
        taxType: "GST",
        subtotal,
        taxAmount,
        total,
        breakdown: {
          cgst: half,
          sgst: half,
          igst: 0
        }
      };
    }
    case TaxSystem.VAT:
      return {
        taxType: "VAT",
        subtotal,
        taxAmount,
        total,
        breakdown: { vat: taxAmount }
      };
    case TaxSystem.SalesTax:
      return {
        taxType: "Sales Tax",
        subtotal,
        taxAmount,
        total,
        breakdown: { salesTax: taxAmount }
      };
    case TaxSystem.Generic: {
      return {
        taxType: "Tax",
        subtotal,
        taxAmount,
        total,
        breakdown: { generic: taxAmount }
      };
    }
  }
}
function getPrice(product, priceType) {
  if (priceType === PriceType.Retail) return product.retailPrice;
  if (priceType === PriceType.Wholesale) return product.wholesalePrice;
  return product.retailPrice;
}
function isDecimalQtyAllowed(product) {
  const k = product.engineFields.__kind__;
  return k === "Grocery" || k === "Jewelry";
}
function BillingPage() {
  const { t } = useTranslation();
  const { shopConfig } = useStore();
  const userRole = useStore((s) => s.userRole);
  const isOwner = userRole !== "staff";
  const api = useApi();
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const taxSystem = (shopConfig == null ? void 0 : shopConfig.taxSystem) ?? TaxSystem.Generic;
  const taxRate = (shopConfig == null ? void 0 : shopConfig.taxRate) ?? 0;
  const dateFormat = (shopConfig == null ? void 0 : shopConfig.dateFormat) ?? DateFormat.DDMMYYYY;
  const useIndianFormat = (shopConfig == null ? void 0 : shopConfig.numberFormat) === NumberFormat.Indian;
  const currencyConfig = getCurrencyConfig(currency);
  const [customerName, setCustomerName] = reactExports.useState("");
  const [customerPhone, setCustomerPhone] = reactExports.useState("");
  const [priceType, setPriceType] = reactExports.useState(PriceType.Retail);
  const [items, setItems] = reactExports.useState([]);
  const [extraCharges, setExtraCharges] = reactExports.useState([]);
  const [billDiscount, setBillDiscount] = reactExports.useState(0);
  const [taxInclusive, setTaxInclusive] = reactExports.useState(false);
  const [paymentMode, setPaymentMode] = reactExports.useState("full");
  const [amountReceived, setAmountReceived] = reactExports.useState("");
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [showPrint, setShowPrint] = reactExports.useState(false);
  const [savedBillNumber, setSavedBillNumber] = reactExports.useState(null);
  const [savedBill, setSavedBill] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [showDropdown, setShowDropdown] = reactExports.useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  const searchInputRef = reactExports.useRef(null);
  const searchTimerRef = reactExports.useRef(null);
  const searchProductsRef = reactExports.useRef(api.searchProducts);
  const getProductByBarcodeRef = reactExports.useRef(api.getProductByBarcode);
  reactExports.useEffect(() => {
    searchProductsRef.current = api.searchProducts;
  }, [api.searchProducts]);
  reactExports.useEffect(() => {
    getProductByBarcodeRef.current = api.getProductByBarcode;
  }, [api.getProductByBarcode]);
  const [customerSuggestions, setCustomerSuggestions] = reactExports.useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = reactExports.useState(false);
  const [isSearchingCustomers, setIsSearchingCustomers] = reactExports.useState(false);
  const [storeCreditBalance, setStoreCreditBalance] = reactExports.useState(
    null
  );
  const [appliedCredit, setAppliedCredit] = reactExports.useState(0);
  const [applyingCredit, setApplyingCredit] = reactExports.useState(false);
  const activeShopId = useStore((s) => s.activeShopId);
  const shopId = activeShopId ?? (shopConfig == null ? void 0 : shopConfig.shopName) ?? "default";
  const creditFetchTimerRef = reactExports.useRef(
    null
  );
  reactExports.useEffect(() => {
    setStoreCreditBalance(null);
    setAppliedCredit(0);
    if (!customerPhone.trim() || customerPhone.trim().length < 6) return;
    if (creditFetchTimerRef.current) clearTimeout(creditFetchTimerRef.current);
    creditFetchTimerRef.current = setTimeout(async () => {
      try {
        const credit = await api.getCustomerCredit(
          shopId,
          customerPhone.trim()
        );
        if (credit.balance > 0) setStoreCreditBalance(credit.balance);
      } catch {
      }
    }, 400);
    return () => {
      if (creditFetchTimerRef.current)
        clearTimeout(creditFetchTimerRef.current);
    };
  }, [customerPhone, shopId, api]);
  const customerSearchTimerRef = reactExports.useRef(
    null
  );
  const customerNameRef = reactExports.useRef(null);
  const customerPhoneRef = reactExports.useRef(null);
  const customerDropdownRef = reactExports.useRef(null);
  const searchCustomersRef = reactExports.useRef(api.searchCustomers);
  reactExports.useEffect(() => {
    searchCustomersRef.current = api.searchCustomers;
  }, [api.searchCustomers]);
  reactExports.useEffect(() => {
    function handler(e) {
      if (customerDropdownRef.current && !customerDropdownRef.current.contains(e.target)) {
        setShowCustomerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const handleCustomerSearch = reactExports.useCallback(
    (query, field) => {
      if (field === "name") setCustomerName(query);
      else setCustomerPhone(query);
      if (customerSearchTimerRef.current)
        clearTimeout(customerSearchTimerRef.current);
      if (query.trim().length < 2) {
        setCustomerSuggestions([]);
        setShowCustomerDropdown(false);
        return;
      }
      customerSearchTimerRef.current = setTimeout(async () => {
        setIsSearchingCustomers(true);
        try {
          const results = await searchCustomersRef.current(shopId, query);
          setCustomerSuggestions(results);
          setShowCustomerDropdown(results.length > 0);
        } finally {
          setIsSearchingCustomers(false);
        }
      }, 250);
    },
    [shopId]
  );
  const selectCustomer = reactExports.useCallback(
    (customer) => {
      setCustomerName(customer.name);
      setCustomerPhone(customer.phone);
      setCustomerSuggestions([]);
      setShowCustomerDropdown(false);
    },
    []
  );
  reactExports.useEffect(() => {
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const handleSearch = reactExports.useCallback(
    (q) => {
      setSearchQuery(q);
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      if (!q.trim()) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }
      searchTimerRef.current = setTimeout(async () => {
        setIsSearching(true);
        try {
          const [nameResults, barcodeResult] = await Promise.all([
            searchProductsRef.current(shopId, q),
            getProductByBarcodeRef.current(shopId, q.trim())
          ]);
          const nameFiltered = nameResults.filter((p) => p.isActive);
          if (barcodeResult == null ? void 0 : barcodeResult.isActive) {
            const deduped = nameFiltered.filter(
              (p) => p.id !== barcodeResult.id
            );
            setSearchResults([barcodeResult, ...deduped]);
          } else {
            setSearchResults(nameFiltered);
          }
          setShowDropdown(true);
        } finally {
          setIsSearching(false);
        }
      }, 200);
    },
    [shopId]
  );
  const addProduct = reactExports.useCallback(
    (product) => {
      var _a;
      setItems((prev) => {
        const existing = prev.findIndex((i) => i.product.id === product.id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = {
            ...updated[existing],
            qty: updated[existing].qty + 1
          };
          return updated;
        }
        return [
          ...prev,
          {
            product,
            qty: 1,
            rate: getPrice(product, priceType),
            discount: 0,
            discountMode: "percent"
          }
        ];
      });
      setSearchQuery("");
      setSearchResults([]);
      setShowDropdown(false);
      (_a = searchInputRef.current) == null ? void 0 : _a.focus();
    },
    [priceType]
  );
  const handleBarcodeScanned = reactExports.useCallback(
    async (barcode) => {
      setShowBarcodeScanner(false);
      const product = await getProductByBarcodeRef.current(shopId, barcode);
      if (!product || !product.isActive) {
        ue.error(`No product found for barcode: ${barcode}`);
        return;
      }
      addProduct(product);
      ue.success(`Added: ${product.name}`);
    },
    [shopId, addProduct]
  );
  const handlePriceTypeChange = reactExports.useCallback((pt) => {
    setPriceType(pt);
    if (pt !== PriceType.Custom) {
      setItems(
        (prev) => prev.map((i) => ({ ...i, rate: getPrice(i.product, pt) }))
      );
    }
  }, []);
  const lineTotal = (item) => {
    const base = item.qty * item.rate;
    const disc = item.discountMode === "percent" ? base * (item.discount / 100) : Math.min(item.discount, base);
    return Math.max(0, base - disc);
  };
  const subtotal = items.reduce((acc, i) => acc + lineTotal(i), 0);
  const totalItemDiscount = items.reduce((acc, i) => {
    const base = i.qty * i.rate;
    return acc + (i.discountMode === "percent" ? base * (i.discount / 100) : Math.min(i.discount, base));
  }, 0) + billDiscount;
  const discountedSubtotal = Math.max(0, subtotal - billDiscount);
  const extraTotal = extraCharges.reduce((acc, c) => acc + (c.amount || 0), 0);
  const taxCalc = calculateTax(
    discountedSubtotal,
    taxSystem,
    taxRate,
    taxInclusive
  );
  const taxAmount = taxCalc.taxAmount;
  const taxableBase = taxInclusive ? taxCalc.subtotal : discountedSubtotal;
  const grandTotal = taxableBase + taxAmount + extraTotal;
  const handleApplyCredit = async () => {
    if (!storeCreditBalance || storeCreditBalance <= 0) return;
    setApplyingCredit(true);
    try {
      const creditToApply = Math.min(storeCreditBalance, grandTotal);
      setAppliedCredit(creditToApply);
      ue.success(`₹${creditToApply.toFixed(2)} store credit applied`);
    } catch {
      ue.error("Failed to apply store credit");
    } finally {
      setApplyingCredit(false);
    }
  };
  const handleRemoveCredit = () => {
    setAppliedCredit(0);
  };
  const effectiveGrandTotal = Math.max(0, grandTotal - appliedCredit);
  const totalCost = items.reduce(
    (acc, i) => acc + i.product.costPrice * i.qty,
    0
  );
  const profit = grandTotal - totalCost;
  const buildBillItems = () => items.map((i) => ({
    productId: i.product.id,
    name: i.product.name,
    qty: i.qty,
    rate: i.rate,
    unit: i.product.unit,
    discount: i.discountMode === "percent" ? i.qty * i.rate * (i.discount / 100) : i.discount,
    taxAmt: taxRate > 0 && subtotal > 0 ? lineTotal(i) / subtotal * taxAmount : 0,
    lineTotal: lineTotal(i)
  }));
  const validate = () => {
    if (items.length === 0) {
      ue.error("Add at least one product to the bill");
      return false;
    }
    for (const item of items) {
      if (item.qty <= 0) {
        ue.error(`Qty must be > 0 for ${item.product.name}`);
        return false;
      }
    }
    return true;
  };
  const handleSave = async (andPrint = false) => {
    if (!validate()) return;
    setIsSaving(true);
    const amountPaid = paymentMode === "full" ? effectiveGrandTotal : Math.min(
      effectiveGrandTotal,
      Math.max(0, Number(amountReceived) || 0)
    );
    try {
      const bill = await api.createBill(shopId, {
        shopId,
        customerName: customerName.trim() || "Anonymous",
        customerPhone: customerPhone.trim(),
        priceType,
        billDiscount,
        paymentType: paymentMode === "full" ? PaymentType.full : PaymentType.partial,
        amountPaid,
        items: buildBillItems(),
        extraCharges: extraCharges.map(
          ({ description, amount }) => ({ description, amount })
        )
      });
      setSavedBillNumber(bill.billNumber);
      setSavedBill(bill);
      ue.success(`Bill #${bill.billNumber} saved successfully!`);
      if (andPrint) setShowPrint(true);
      if (appliedCredit > 0 && customerPhone.trim()) {
        api.applyStoreCredit(shopId, {
          customerPhone: customerPhone.trim(),
          billId: bill.id,
          amount: appliedCredit
        }).catch(() => {
        });
      }
      if (customerName.trim() || customerPhone.trim()) {
        api.createOrUpdateCustomer(
          shopId,
          customerName.trim() || "Anonymous",
          customerPhone.trim()
        ).catch(() => {
        });
      }
    } catch {
      ue.error("Failed to save bill. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const resetBill = () => {
    setCustomerName("");
    setCustomerPhone("");
    setPriceType(PriceType.Retail);
    setItems([]);
    setExtraCharges([]);
    setBillDiscount(0);
    setTaxInclusive(false);
    setPaymentMode("full");
    setAmountReceived("");
    setSavedBillNumber(null);
    setSavedBill(null);
  };
  const fmt = (n) => formatCurrency(n, currency, useIndianFormat);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col min-h-0 bg-background",
      "data-ocid": "billing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-10 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground leading-tight", children: "New Bill" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDateTime(/* @__PURE__ */ new Date(), dateFormat) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: resetBill,
                className: "gap-1.5 text-muted-foreground",
                "data-ocid": "billing.reset_button",
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
                variant: "outline",
                size: "sm",
                onClick: () => handleSave(false),
                disabled: isSaving || items.length === 0,
                className: "gap-1.5",
                "data-ocid": "billing.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Save" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                onClick: () => handleSave(true),
                disabled: isSaving || items.length === 0,
                className: "gap-1.5 bg-primary text-primary-foreground",
                "data-ocid": "billing.save_print_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Save & Print" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Print" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 lg:border-r", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                ref: customerDropdownRef,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: [
                      t("customerName"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal normal-case text-muted-foreground/70", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: customerNameRef,
                          id: "billing-customer-name",
                          placeholder: "Anonymous",
                          value: customerName,
                          onChange: (e) => handleCustomerSearch(e.target.value, "name"),
                          className: "h-10",
                          autoComplete: "off",
                          "data-ocid": "billing.customer_name_input"
                        }
                      ),
                      isSearchingCustomers && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" })
                    ] }),
                    showCustomerDropdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-30 top-full mt-1 w-full bg-card border rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto", children: [
                      customerSuggestions.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => selectCustomer(c),
                          className: "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors text-left border-b last:border-b-0",
                          "data-ocid": `billing.customer_suggestion.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary", children: c.name.charAt(0).toUpperCase() }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: c.name }),
                              c.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.phone })
                            ] })
                          ]
                        },
                        String(c.id)
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowCustomerDropdown(false),
                          className: "w-full flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground hover:bg-muted transition-colors border-t",
                          "data-ocid": "billing.new_customer_option",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                            "New Customer"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: [
                      t("customerPhone"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal normal-case text-muted-foreground/70", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        ref: customerPhoneRef,
                        id: "billing-customer-phone",
                        placeholder: "+1 000 000 0000",
                        value: customerPhone,
                        onChange: (e) => handleCustomerSearch(e.target.value, "phone"),
                        className: "h-10",
                        autoComplete: "off",
                        "data-ocid": "billing.customer_phone_input"
                      }
                    )
                  ] })
                ]
              }
            ),
            storeCreditBalance !== null && storeCreditBalance > 0 && appliedCredit === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5",
                "data-ocid": "billing.store_credit_banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-medium text-sm", children: [
                    "Customer has ",
                    fmt(storeCreditBalance),
                    " store credit"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "h-8 bg-emerald-600 text-white hover:bg-emerald-700 shrink-0",
                      onClick: () => void handleApplyCredit(),
                      disabled: applyingCredit,
                      "data-ocid": "billing.apply_credit_button",
                      children: "Apply"
                    }
                  )
                ]
              }
            ),
            appliedCredit > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5",
                "data-ocid": "billing.credit_applied_banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-700 text-sm font-medium", children: [
                    "Store Credit Applied: -",
                    fmt(appliedCredit)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      onClick: handleRemoveCredit,
                      className: "h-7 text-xs text-muted-foreground",
                      "data-ocid": "billing.remove_credit_button",
                      children: "Remove"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: t("priceType") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-1 p-1 bg-muted rounded-lg w-fit",
                  "data-ocid": "billing.price_type_tab",
                  children: [
                    PriceType.Retail,
                    PriceType.Wholesale,
                    PriceType.Custom
                  ].map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handlePriceTypeChange(pt),
                      className: `px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 min-h-[36px] ${priceType === pt ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": `billing.price_type.${pt.toLowerCase()}`,
                      children: pt === PriceType.Retail ? "Retail (B2C)" : pt === PriceType.Wholesale ? "Wholesale (B2B)" : t("custom")
                    },
                    pt
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: t("addProduct") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-2", ref: searchRef, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      ref: searchInputRef,
                      id: "billing-product-search",
                      placeholder: "Search by name or scan barcode...",
                      value: searchQuery,
                      onChange: (e) => handleSearch(e.target.value),
                      onFocus: () => searchResults.length > 0 && setShowDropdown(true),
                      className: "pl-9 h-11 text-base",
                      "data-ocid": "billing.product_search_input"
                    }
                  ),
                  isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "icon",
                    onClick: () => setShowBarcodeScanner(true),
                    className: "h-11 w-11 shrink-0 border-primary/40 text-primary hover:bg-primary/10",
                    "aria-label": "Scan barcode",
                    title: "Scan product barcode",
                    "data-ocid": "billing.barcode_scan_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-5 h-5" })
                  }
                ),
                showDropdown && searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-20 top-full mt-1 left-0 right-12 bg-card border rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto", children: searchResults.map((p, idx) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => addProduct(p),
                      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b last:border-b-0",
                      "data-ocid": `billing.search_result.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: p.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            p.unit,
                            " · Stock: ",
                            String(p.stock),
                            p.barcode && idx === 0 && ((_a = searchResults[0]) == null ? void 0 : _a.barcode) === p.barcode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 inline-flex items-center gap-0.5 text-primary font-medium", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-3 h-3" }),
                              " Barcode"
                            ] }),
                            p.stock <= p.minStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-destructive font-medium", children: "Low" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary", children: fmt(getPrice(p, priceType)) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.category })
                        ] })
                      ]
                    },
                    String(p.id)
                  );
                }) }),
                showDropdown && searchResults.length === 0 && searchQuery.trim() && !isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-20 top-full mt-1 left-0 right-12 bg-card border rounded-xl shadow-xl px-4 py-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  'No products found for "',
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: searchQuery }),
                  '"'
                ] }) })
              ] })
            ] }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: [
                "Items (",
                items.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border rounded-xl overflow-hidden",
                  "data-ocid": "billing.items_list",
                  children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    BillItemRow,
                    {
                      item,
                      index: idx + 1,
                      priceType,
                      currency,
                      useIndianFormat,
                      onQtyChange: (qty) => setItems(
                        (prev) => prev.map((it, i) => i === idx ? { ...it, qty } : it)
                      ),
                      onRateChange: (rate) => setItems(
                        (prev) => prev.map((it, i) => i === idx ? { ...it, rate } : it)
                      ),
                      onDiscountChange: (discount) => setItems(
                        (prev) => prev.map(
                          (it, i) => i === idx ? { ...it, discount } : it
                        )
                      ),
                      onDiscountModeChange: (discountMode) => setItems(
                        (prev) => prev.map(
                          (it, i) => i === idx ? { ...it, discountMode } : it
                        )
                      ),
                      onRemove: () => setItems((prev) => prev.filter((_, i) => i !== idx)),
                      lineTotalValue: lineTotal(item)
                    },
                    String(item.product.id)
                  ))
                }
              )
            ] }),
            items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-2 text-center",
                "data-ocid": "billing.items_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Search and add products above" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Products will appear here" })
                ]
              }
            ),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap", children: [
                "Bill Discount (",
                currencyConfig.symbol,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "billing-bill-discount",
                  type: "number",
                  min: "0",
                  value: billDiscount || "",
                  onChange: (e) => setBillDiscount(
                    Math.max(0, Number.parseFloat(e.target.value) || 0)
                  ),
                  placeholder: "0",
                  className: "h-9 w-32 text-right",
                  "data-ocid": "billing.bill_discount_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: t("extraCharges") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => setExtraCharges((prev) => [
                      ...prev,
                      { id: crypto.randomUUID(), description: "", amount: 0 }
                    ]),
                    className: "gap-1 h-7 text-xs text-primary",
                    "data-ocid": "billing.add_charge_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                      " ",
                      t("addCharge")
                    ]
                  }
                )
              ] }),
              extraCharges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: extraCharges.map((charge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-2 items-center",
                  "data-ocid": `billing.extra_charge.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: `extra-charge-desc-${idx}`,
                        placeholder: "e.g. Delivery, Packing",
                        value: charge.description,
                        onChange: (e) => setExtraCharges(
                          (prev) => prev.map(
                            (c, i) => i === idx ? { ...c, description: e.target.value } : c
                          )
                        ),
                        className: "flex-1 h-9 text-sm",
                        "data-ocid": `billing.extra_charge_desc.${idx + 1}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: `extra-charge-amount-${idx}`,
                        type: "number",
                        min: "0",
                        value: charge.amount || "",
                        onChange: (e) => setExtraCharges(
                          (prev) => prev.map(
                            (c, i) => i === idx ? {
                              ...c,
                              amount: Number.parseFloat(e.target.value) || 0
                            } : c
                          )
                        ),
                        placeholder: "0",
                        className: "w-28 h-9 text-right text-sm",
                        "data-ocid": `billing.extra_charge_amount.${idx + 1}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        onClick: () => setExtraCharges(
                          (prev) => prev.filter((_, i) => i !== idx)
                        ),
                        className: "h-9 w-9 text-destructive hover:text-destructive",
                        "data-ocid": `billing.extra_charge_delete.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ]
                },
                charge.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TaxSection,
              {
                taxSystem,
                taxRate,
                taxCalc,
                taxInclusive,
                onTaxInclusiveChange: setTaxInclusive,
                fmt
              }
            ),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/40 rounded-xl p-3 space-y-2.5",
                "data-ocid": "billing.payment_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Payment Mode" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPaymentMode("full"),
                        "data-ocid": "billing.payment_full_toggle",
                        className: `flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${paymentMode === "full" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`,
                        children: "Full Payment"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPaymentMode("partial"),
                        "data-ocid": "billing.payment_partial_toggle",
                        className: `flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${paymentMode === "partial" ? "bg-amber-500 text-white border-amber-500" : "bg-background text-muted-foreground border-border hover:border-amber-400/50"}`,
                        children: "Part Payment"
                      }
                    )
                  ] }),
                  paymentMode === "partial" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "billing-amount-received",
                          className: "text-xs text-muted-foreground whitespace-nowrap",
                          children: [
                            "Amount Received (",
                            currencyConfig.symbol,
                            ")"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "billing-amount-received",
                          type: "number",
                          min: "0",
                          step: "0.01",
                          value: amountReceived,
                          onChange: (e) => setAmountReceived(e.target.value),
                          placeholder: String(grandTotal.toFixed(2)),
                          className: "flex-1 h-9 px-3 text-right text-sm border border-input rounded-lg bg-background outline-none focus:ring-2 focus:ring-ring",
                          "data-ocid": "billing.amount_received_input"
                        }
                      )
                    ] }),
                    grandTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-semibold", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pending Amount" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600", children: fmt(
                        Math.max(
                          0,
                          grandTotal - (Number(amountReceived) || 0)
                        )
                      ) })
                    ] })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-80 xl:w-96 shrink-0 bg-card border-t lg:border-t-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            BillSummaryPanel,
            {
              shopConfig,
              customerName,
              customerPhone,
              priceType,
              items,
              extraCharges,
              taxSystem,
              taxRate,
              taxCalc,
              taxInclusive,
              subtotal,
              totalItemDiscount,
              taxAmount,
              extraTotal,
              grandTotal,
              profit,
              isOwner,
              fmt,
              lineTotal,
              onSave: () => handleSave(false),
              onSavePrint: () => handleSave(true),
              onReset: resetBill,
              isSaving,
              billNumber: savedBillNumber,
              dateFormat,
              onShareWhatsApp: () => {
                const text = buildWhatsAppText({
                  shopName: (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop",
                  customerName: customerName || "Anonymous",
                  items,
                  grandTotal,
                  currency,
                  useIndianFormat,
                  lineTotal
                });
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(text)}`,
                  "_blank"
                );
              }
            }
          ) })
        ] }),
        savedBill && !showPrint && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/95 backdrop-blur-sm border-t shadow-lg lg:relative lg:border-t-0 lg:shadow-none lg:bg-transparent lg:p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BillShareCard, { bill: savedBill, shopConfig }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-2 lg:mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: resetBill,
              className: "gap-1.5 text-muted-foreground",
              "data-ocid": "billing.new_bill_button",
              children: "+ New Bill"
            }
          ) })
        ] }),
        showPrint && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BillPrintDialog,
          {
            shopConfig,
            customerName: customerName || "Anonymous",
            customerPhone,
            priceType,
            items,
            extraCharges,
            taxSystem,
            taxRate,
            taxCalc,
            subtotal,
            totalDiscount: totalItemDiscount,
            taxAmount,
            grandTotal,
            billNumber: savedBillNumber,
            fmt,
            lineTotal,
            dateFormat,
            onClose: () => {
              setShowPrint(false);
              resetBill();
            }
          }
        ),
        showBarcodeScanner && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BarcodeScanModal,
          {
            onScanned: handleBarcodeScanned,
            onClose: () => setShowBarcodeScanner(false)
          }
        )
      ]
    }
  );
}
function BarcodeScanModal({ onScanned, onClose }) {
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const [error, setError] = reactExports.useState(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [manualBarcode, setManualBarcode] = reactExports.useState("");
  const detectorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
            "itf"
          ]
        });
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
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
      }
      if (!cancelled) {
        rafRef.current = requestAnimationFrame(scanLoop);
      }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
      "data-ocid": "billing.barcode_scanner_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Scan Barcode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Point camera at product barcode" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              className: "h-8 w-8",
              "aria-label": "Close scanner",
              "data-ocid": "billing.barcode_scanner_modal.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
          error === "camera_unsupported" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Camera scanner not supported" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your browser doesn't support the Barcode Detection API. Use manual entry below." })
          ] }) : error === "camera_denied" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Camera access denied" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allow camera permission in your browser settings, then try again." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-black aspect-[4/3]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                className: "w-full h-full object-cover",
                playsInline: true,
                muted: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 h-28 border-2 border-primary/80 rounded-lg relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -left-0.5 w-5 h-5 border-t-4 border-l-4 border-primary rounded-tl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 w-5 h-5 border-t-4 border-r-4 border-primary rounded-tr" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-4 border-l-4 border-primary rounded-bl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-4 border-r-4 border-primary rounded-br" }),
              scanning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-0.5 bg-primary animate-scan-line" })
            ] }) }),
            !scanning && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Or enter barcode manually" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "manual-barcode-input",
                  placeholder: "e.g. 8901234567890",
                  value: manualBarcode,
                  onChange: (e) => setManualBarcode(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && manualBarcode.trim()) {
                      onScanned(manualBarcode.trim());
                    }
                  },
                  className: "flex-1 h-10 text-sm font-mono",
                  autoComplete: "off",
                  "data-ocid": "billing.barcode_manual_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => manualBarcode.trim() && onScanned(manualBarcode.trim()),
                  disabled: !manualBarcode.trim(),
                  className: "h-10 px-4 gap-1.5",
                  "data-ocid": "billing.barcode_manual_submit",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                    "Find"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function BillItemRow({
  item,
  index,
  priceType,
  useIndianFormat,
  currency,
  onQtyChange,
  onRateChange,
  onDiscountChange,
  onDiscountModeChange,
  onRemove,
  lineTotalValue
}) {
  const fmt = (n) => formatCurrency(n, currency, useIndianFormat);
  const decimalAllowed = isDecimalQtyAllowed(item.product);
  const isCustom = priceType === PriceType.Custom;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-3 border-b last:border-b-0 bg-background hover:bg-muted/30 transition-colors",
      "data-ocid": `billing.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: item.product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              item.product.category,
              " · ",
              item.product.unit
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: onRemove,
              className: "h-7 w-7 text-destructive hover:text-destructive shrink-0 -mt-0.5",
              "data-ocid": `billing.item_remove.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border rounded-lg overflow-hidden h-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onQtyChange(
                  Math.max(
                    decimalAllowed ? 0.1 : 1,
                    Number.parseFloat(
                      (item.qty - (decimalAllowed ? 0.1 : 1)).toFixed(2)
                    )
                  )
                ),
                className: "px-2 h-full text-muted-foreground hover:bg-muted transition-colors text-lg leading-none",
                "aria-label": "Decrease quantity",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: `item-qty-${index}`,
                type: "number",
                min: decimalAllowed ? "0.01" : "1",
                step: decimalAllowed ? "0.01" : "1",
                value: item.qty,
                onChange: (e) => onQtyChange(
                  Math.max(0.01, Number.parseFloat(e.target.value) || 0)
                ),
                className: "w-14 text-center text-sm font-bold bg-transparent border-x outline-none h-full",
                "data-ocid": `billing.item_qty.${index}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onQtyChange(
                  Number.parseFloat(
                    (item.qty + (decimalAllowed ? 0.1 : 1)).toFixed(2)
                  )
                ),
                className: "px-2 h-full text-muted-foreground hover:bg-muted transition-colors text-lg leading-none",
                "aria-label": "Increase quantity",
                children: "+"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "@" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: `item-rate-${index}`,
                type: "number",
                min: "0",
                step: "0.01",
                value: item.rate,
                onChange: (e) => isCustom && onRateChange(Number.parseFloat(e.target.value) || 0),
                readOnly: !isCustom,
                className: `w-24 h-9 px-2 text-right text-sm border rounded-lg outline-none ${isCustom ? "bg-background focus:ring-1 focus:ring-primary" : "bg-muted text-muted-foreground cursor-default"}`,
                "data-ocid": `billing.item_rate.${index}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border rounded-lg overflow-hidden h-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDiscountModeChange(
                  item.discountMode === "percent" ? "fixed" : "percent"
                ),
                className: "px-2 h-full text-xs font-bold text-muted-foreground bg-muted hover:bg-muted/80 transition-colors border-r min-w-[28px]",
                "data-ocid": `billing.item_discount_mode.${index}`,
                "aria-label": "Toggle discount mode",
                children: item.discountMode === "percent" ? "%" : "f"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: `item-discount-${index}`,
                type: "number",
                min: "0",
                max: item.discountMode === "percent" ? "100" : void 0,
                step: "0.01",
                value: item.discount || "",
                onChange: (e) => onDiscountChange(Number.parseFloat(e.target.value) || 0),
                placeholder: "0",
                className: "w-16 text-right text-sm bg-transparent outline-none px-2 h-full",
                "data-ocid": `billing.item_discount.${index}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: fmt(lineTotalValue) }) })
        ] })
      ]
    }
  );
}
function TaxSection({
  taxSystem,
  taxRate,
  taxCalc,
  taxInclusive,
  onTaxInclusiveChange,
  fmt
}) {
  if (taxRate === 0) return null;
  const label = taxCalc.taxType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
        label,
        " (",
        taxRate,
        "%)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "tax-inclusive-toggle",
          className: "flex items-center gap-1.5 cursor-pointer select-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tax Inclusive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "tax-inclusive-toggle",
                type: "button",
                role: "switch",
                "aria-checked": taxInclusive,
                onClick: () => onTaxInclusiveChange(!taxInclusive),
                className: `relative w-8 rounded-full transition-colors ${taxInclusive ? "bg-primary" : "bg-muted-foreground/30"}`,
                style: { height: "18px" },
                "data-ocid": "billing.tax_inclusive_toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${taxInclusive ? "translate-x-3.5" : "translate-x-0"}`
                  }
                )
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      taxSystem === TaxSystem.GST && taxCalc.breakdown.cgst !== void 0 && taxCalc.breakdown.cgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "CGST (",
            taxRate / 2,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.cgst) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "SGST (",
            taxRate / 2,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.sgst ?? 0) })
        ] })
      ] }),
      taxCalc.breakdown.igst !== void 0 && taxCalc.breakdown.igst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "IGST (",
          taxRate,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.igst) })
      ] }),
      taxCalc.breakdown.vat !== void 0 && taxCalc.breakdown.vat > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "VAT (",
          taxRate,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.vat) })
      ] }),
      taxCalc.breakdown.salesTax !== void 0 && taxCalc.breakdown.salesTax > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "Sales Tax (",
          taxRate,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.salesTax) })
      ] }),
      taxCalc.breakdown.generic !== void 0 && taxCalc.breakdown.generic > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "Tax (",
          taxRate,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.generic) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-semibold pt-1 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Total ",
          label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.taxAmount) })
      ] })
    ] })
  ] });
}
function BillSummaryPanel({
  customerName,
  customerPhone,
  priceType,
  items,
  extraCharges,
  taxSystem,
  taxRate,
  taxCalc,
  taxInclusive,
  subtotal,
  totalItemDiscount,
  taxAmount,
  grandTotal,
  profit,
  isOwner,
  fmt,
  lineTotal,
  onSave,
  onSavePrint,
  onReset,
  isSaving,
  billNumber,
  onShareWhatsApp
}) {
  const taxLabel = taxCalc.taxType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Bill Summary" }),
      billNumber !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Bill #",
        String(billNumber)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      (customerName || customerPhone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: customerName || "Anonymous" }),
        customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: customerPhone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-primary text-primary",
            children: priceType
          }
        ),
        taxInclusive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Tax Inclusive" })
      ] }),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "data-ocid": "billing.summary_items", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex justify-between text-sm",
          "data-ocid": `billing.summary_item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate flex-1 min-w-0 mr-2", children: [
              item.product.name,
              " × ",
              item.qty
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium shrink-0", children: fmt(lineTotal(item)) })
          ]
        },
        String(item.product.id)
      )) }),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(subtotal) })
        ] }),
        totalItemDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "−",
            fmt(totalItemDiscount)
          ] })
        ] }),
        taxRate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          taxSystem === TaxSystem.GST && taxCalc.breakdown.cgst !== void 0 && taxCalc.breakdown.cgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "CGST (",
                taxRate / 2,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.cgst) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "SGST (",
                taxRate / 2,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.sgst ?? 0) })
            ] })
          ] }),
          taxSystem !== TaxSystem.GST && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              taxLabel,
              " (",
              taxRate,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxAmount) })
          ] })
        ] }),
        extraCharges.filter((c) => c.amount > 0).map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            "data-ocid": `billing.summary_charge.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: c.description || "Extra Charge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(c.amount) })
            ]
          },
          c.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t-2 border-primary/20 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: "Grand Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-display font-bold text-xl text-primary",
            "data-ocid": "billing.grand_total",
            children: fmt(grandTotal)
          }
        )
      ] }) }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-emerald-50 border border-emerald-200 rounded-xl p-3",
          "data-ocid": "billing.profit_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-700 uppercase tracking-wide", children: "Your Profit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600/70 mt-0.5", children: "Hidden from printed bill" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-display font-bold text-lg ${profit >= 0 ? "text-emerald-700" : "text-destructive"}`,
                  children: fmt(profit)
                }
              )
            ] }),
            grandTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-emerald-600/70", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Margin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  (profit / grandTotal * 100).toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-emerald-200 rounded-full mt-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-emerald-500 rounded-full transition-all",
                  style: {
                    width: `${Math.min(100, Math.max(0, profit / grandTotal * 100))}%`
                  }
                }
              ) })
            ] })
          ]
        }
      ),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: onShareWhatsApp,
          className: "flex-1 gap-1.5 text-xs h-9",
          "data-ocid": "billing.share_whatsapp_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
            "WhatsApp"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t bg-card space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "w-full h-11 gap-2 font-semibold text-base bg-primary text-primary-foreground",
          onClick: onSavePrint,
          disabled: isSaving || items.length === 0,
          "data-ocid": "billing.summary_save_print_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
            "Save & Print"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1 h-10 gap-1.5",
            onClick: onSave,
            disabled: isSaving || items.length === 0,
            "data-ocid": "billing.summary_save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              "Save Only"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            className: "h-10 px-3 text-muted-foreground",
            onClick: onReset,
            "data-ocid": "billing.summary_reset_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" })
          }
        )
      ] })
    ] })
  ] });
}
function buildWhatsAppText({
  shopName,
  customerName,
  items,
  grandTotal,
  currency,
  useIndianFormat,
  lineTotal
}) {
  const fmt = (n) => formatCurrency(n, currency, useIndianFormat);
  return [
    `*${shopName}*`,
    `Customer: ${customerName}`,
    "",
    "*Items:*",
    ...items.map(
      (i) => `• ${i.product.name} × ${i.qty} = ${fmt(lineTotal(i))}`
    ),
    "",
    `*Total: ${fmt(grandTotal)}*`,
    "",
    "Thank you for your purchase! 🙏"
  ].join("\n");
}
export {
  BillingPage
};
