import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Plus,
  Printer,
  RotateCcw,
  Save,
  ScanLine,
  Search,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BillPrintDialog } from "../components/BillPrintDialog";
import { BillShareCard } from "../components/BillShareCard";
import { useApi } from "../lib/api";
import { formatCurrency, getCurrencyConfig } from "../lib/currency";
import { formatDateTime } from "../lib/date";
import { useTranslation } from "../lib/i18n";
import { useStore } from "../lib/store";
import { calculateTax } from "../lib/tax";
import {
  DateFormat,
  NumberFormat,
  PaymentType,
  PriceType,
  TaxSystem,
} from "../types";
import type { Bill, BillItem, ExtraCharge, ProductView } from "../types";

type DiscountMode = "percent" | "fixed";

type DraftItem = {
  product: ProductView;
  qty: number;
  rate: number;
  discount: number;
  discountMode: DiscountMode;
};

type DraftExtraCharge = {
  id: string;
  description: string;
  amount: number;
};

function getPrice(product: ProductView, priceType: PriceType): number {
  if (priceType === PriceType.Retail) return product.retailPrice;
  if (priceType === PriceType.Wholesale) return product.wholesalePrice;
  return product.retailPrice;
}

function isDecimalQtyAllowed(product: ProductView): boolean {
  const k = product.engineFields.__kind__;
  return k === "Grocery" || k === "Jewelry";
}

export function BillingPage() {
  const { t } = useTranslation();
  const { shopConfig } = useStore();
  const userRole = useStore((s) => s.userRole);
  const isOwner = userRole !== "staff";
  const api = useApi();

  const currency = shopConfig?.currency ?? "USD";
  const taxSystem = shopConfig?.taxSystem ?? TaxSystem.Generic;
  const taxRate = shopConfig?.taxRate ?? 0;
  const dateFormat = shopConfig?.dateFormat ?? DateFormat.DDMMYYYY;
  const useIndianFormat = shopConfig?.numberFormat === NumberFormat.Indian;
  const currencyConfig = getCurrencyConfig(currency);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [priceType, setPriceType] = useState<PriceType>(PriceType.Retail);
  const [items, setItems] = useState<DraftItem[]>([]);
  const [extraCharges, setExtraCharges] = useState<DraftExtraCharge[]>([]);
  const [billDiscount, setBillDiscount] = useState(0);
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"full" | "partial">("full");
  const [amountReceived, setAmountReceived] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [savedBillNumber, setSavedBillNumber] = useState<bigint | null>(null);
  const [savedBill, setSavedBill] = useState<Bill | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductView[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Stable ref to latest searchProducts — avoids recreating handleSearch on every api change
  const searchProductsRef = useRef(api.searchProducts);
  const getProductByBarcodeRef = useRef(api.getProductByBarcode);
  useEffect(() => {
    searchProductsRef.current = api.searchProducts;
  }, [api.searchProducts]);
  useEffect(() => {
    getProductByBarcodeRef.current = api.getProductByBarcode;
  }, [api.getProductByBarcode]);

  // Customer autocomplete state
  const [customerSuggestions, setCustomerSuggestions] = useState<
    import("../types").CustomerView[]
  >([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [isSearchingCustomers, setIsSearchingCustomers] = useState(false);
  const [storeCreditBalance, setStoreCreditBalance] = useState<number | null>(
    null,
  );
  const [appliedCredit, setAppliedCredit] = useState<number>(0);
  const [applyingCredit, setApplyingCredit] = useState(false);

  const activeShopId = useStore((s) => s.activeShopId);
  const shopId = activeShopId ?? shopConfig?.shopName ?? "default";

  // Fetch store credit when customer phone changes
  const creditFetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  useEffect(() => {
    setStoreCreditBalance(null);
    setAppliedCredit(0);
    if (!customerPhone.trim() || customerPhone.trim().length < 6) return;
    if (creditFetchTimerRef.current) clearTimeout(creditFetchTimerRef.current);
    creditFetchTimerRef.current = setTimeout(async () => {
      try {
        const credit = await api.getCustomerCredit(
          shopId,
          customerPhone.trim(),
        );
        if (credit.balance > 0) setStoreCreditBalance(credit.balance);
      } catch {
        /* silent */
      }
    }, 400);
    return () => {
      if (creditFetchTimerRef.current)
        clearTimeout(creditFetchTimerRef.current);
    };
  }, [customerPhone, shopId, api]);

  const customerSearchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const customerNameRef = useRef<HTMLInputElement>(null);
  const customerPhoneRef = useRef<HTMLInputElement>(null);
  const customerDropdownRef = useRef<HTMLDivElement>(null);
  const searchCustomersRef = useRef(api.searchCustomers);
  useEffect(() => {
    searchCustomersRef.current = api.searchCustomers;
  }, [api.searchCustomers]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        customerDropdownRef.current &&
        !customerDropdownRef.current.contains(e.target as Node)
      ) {
        setShowCustomerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCustomerSearch = useCallback(
    (query: string, field: "name" | "phone") => {
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
    [shopId],
  );

  const selectCustomer = useCallback(
    (customer: import("../types").CustomerView) => {
      setCustomerName(customer.name);
      setCustomerPhone(customer.phone);
      setCustomerSuggestions([]);
      setShowCustomerDropdown(false);
    },
    [],
  );

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = useCallback(
    (q: string) => {
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
            getProductByBarcodeRef.current(shopId, q.trim()),
          ]);
          const nameFiltered = nameResults.filter((p) => p.isActive);
          // Barcode exact match floated to top, deduped
          if (barcodeResult?.isActive) {
            const deduped = nameFiltered.filter(
              (p) => p.id !== barcodeResult.id,
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
    [shopId],
  );

  const addProduct = useCallback(
    (product: ProductView) => {
      setItems((prev) => {
        const existing = prev.findIndex((i) => i.product.id === product.id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = {
            ...updated[existing],
            qty: updated[existing].qty + 1,
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
            discountMode: "percent",
          },
        ];
      });
      setSearchQuery("");
      setSearchResults([]);
      setShowDropdown(false);
      searchInputRef.current?.focus();
    },
    [priceType],
  );

  const handleBarcodeScanned = useCallback(
    async (barcode: string) => {
      setShowBarcodeScanner(false);
      const product = await getProductByBarcodeRef.current(shopId, barcode);
      if (!product || !product.isActive) {
        toast.error(`No product found for barcode: ${barcode}`);
        return;
      }
      addProduct(product);
      toast.success(`Added: ${product.name}`);
    },
    [shopId, addProduct],
  );

  const handlePriceTypeChange = useCallback((pt: PriceType) => {
    setPriceType(pt);
    if (pt !== PriceType.Custom) {
      setItems((prev) =>
        prev.map((i) => ({ ...i, rate: getPrice(i.product, pt) })),
      );
    }
  }, []);

  const lineTotal = (item: DraftItem) => {
    const base = item.qty * item.rate;
    const disc =
      item.discountMode === "percent"
        ? base * (item.discount / 100)
        : Math.min(item.discount, base);
    return Math.max(0, base - disc);
  };

  const subtotal = items.reduce((acc, i) => acc + lineTotal(i), 0);
  const totalItemDiscount =
    items.reduce((acc, i) => {
      const base = i.qty * i.rate;
      return (
        acc +
        (i.discountMode === "percent"
          ? base * (i.discount / 100)
          : Math.min(i.discount, base))
      );
    }, 0) + billDiscount;
  const discountedSubtotal = Math.max(0, subtotal - billDiscount);
  const extraTotal = extraCharges.reduce((acc, c) => acc + (c.amount || 0), 0);
  const taxCalc = calculateTax(
    discountedSubtotal,
    taxSystem,
    taxRate,
    taxInclusive,
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
      toast.success(`\u20b9${creditToApply.toFixed(2)} store credit applied`);
    } catch {
      toast.error("Failed to apply store credit");
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
    0,
  );
  const profit = grandTotal - totalCost;

  const buildBillItems = (): BillItem[] =>
    items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      qty: i.qty,
      rate: i.rate,
      unit: i.product.unit,
      discount:
        i.discountMode === "percent"
          ? i.qty * i.rate * (i.discount / 100)
          : i.discount,
      taxAmt:
        taxRate > 0 && subtotal > 0 ? (lineTotal(i) / subtotal) * taxAmount : 0,
      lineTotal: lineTotal(i),
    }));

  const validate = (): boolean => {
    if (items.length === 0) {
      toast.error("Add at least one product to the bill");
      return false;
    }
    for (const item of items) {
      if (item.qty <= 0) {
        toast.error(`Qty must be > 0 for ${item.product.name}`);
        return false;
      }
    }
    return true;
  };

  const handleSave = async (andPrint = false) => {
    if (!validate()) return;
    setIsSaving(true);
    const amountPaid =
      paymentMode === "full"
        ? effectiveGrandTotal
        : Math.min(
            effectiveGrandTotal,
            Math.max(0, Number(amountReceived) || 0),
          );
    try {
      const bill = await api.createBill(shopId, {
        shopId,
        customerName: customerName.trim() || "Anonymous",
        customerPhone: customerPhone.trim(),
        priceType,
        billDiscount,
        paymentType:
          paymentMode === "full" ? PaymentType.full : PaymentType.partial,
        amountPaid,
        items: buildBillItems(),
        extraCharges: extraCharges.map(
          ({ description, amount }): ExtraCharge => ({ description, amount }),
        ),
      });
      setSavedBillNumber(bill.billNumber);
      setSavedBill(bill);
      toast.success(`Bill #${bill.billNumber} saved successfully!`);
      if (andPrint) setShowPrint(true);
      // Deduct applied store credit from customer balance
      if (appliedCredit > 0 && customerPhone.trim()) {
        api
          .applyStoreCredit(shopId, {
            customerPhone: customerPhone.trim(),
            billId: bill.id,
            amount: appliedCredit,
          })
          .catch(() => {
            /* silent — non-critical */
          });
      }
      // Auto-save customer profile if name or phone provided
      if (customerName.trim() || customerPhone.trim()) {
        api
          .createOrUpdateCustomer(
            shopId,
            customerName.trim() || "Anonymous",
            customerPhone.trim(),
          )
          .catch(() => {
            /* silent — non-critical */
          });
      }
    } catch {
      toast.error("Failed to save bill. Please try again.");
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

  const fmt = (n: number) => formatCurrency(n, currency, useIndianFormat);

  return (
    <div
      className="flex-1 flex flex-col min-h-0 bg-background"
      data-ocid="billing.page"
    >
      {/* Header */}
      <div className="bg-card border-b px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground leading-tight">
            New Bill
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDateTime(new Date(), dateFormat)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetBill}
            className="gap-1.5 text-muted-foreground"
            data-ocid="billing.reset_button"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
            disabled={isSaving || items.length === 0}
            className="gap-1.5"
            data-ocid="billing.save_button"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => handleSave(true)}
            disabled={isSaving || items.length === 0}
            className="gap-1.5 bg-primary text-primary-foreground"
            data-ocid="billing.save_print_button"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save & Print</span>
            <span className="sm:hidden">Print</span>
          </Button>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* LEFT: Bill Builder */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 lg:border-r">
          {/* Customer */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            ref={customerDropdownRef}
          >
            {/* Customer Name with autocomplete */}
            <div className="relative">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                {t("customerName")}{" "}
                <span className="font-normal normal-case text-muted-foreground/70">
                  (optional)
                </span>
              </p>
              <div className="relative">
                <Input
                  ref={customerNameRef}
                  id="billing-customer-name"
                  placeholder="Anonymous"
                  value={customerName}
                  onChange={(e) => handleCustomerSearch(e.target.value, "name")}
                  className="h-10"
                  autoComplete="off"
                  data-ocid="billing.customer_name_input"
                />
                {isSearchingCustomers && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              {showCustomerDropdown && (
                <div className="absolute z-30 top-full mt-1 w-full bg-card border rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto">
                  {customerSuggestions.map((c, idx) => (
                    <button
                      type="button"
                      key={String(c.id)}
                      onClick={() => selectCustomer(c)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors text-left border-b last:border-b-0"
                      data-ocid={`billing.customer_suggestion.${idx + 1}`}
                    >
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {c.name}
                        </p>
                        {c.phone && (
                          <p className="text-xs text-muted-foreground">
                            {c.phone}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowCustomerDropdown(false)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground hover:bg-muted transition-colors border-t"
                    data-ocid="billing.new_customer_option"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Customer
                  </button>
                </div>
              )}
            </div>
            {/* Customer Phone with autocomplete */}
            <div className="relative">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                {t("customerPhone")}{" "}
                <span className="font-normal normal-case text-muted-foreground/70">
                  (optional)
                </span>
              </p>
              <Input
                ref={customerPhoneRef}
                id="billing-customer-phone"
                placeholder="+1 000 000 0000"
                value={customerPhone}
                onChange={(e) => handleCustomerSearch(e.target.value, "phone")}
                className="h-10"
                autoComplete="off"
                data-ocid="billing.customer_phone_input"
              />
            </div>
          </div>

          {/* Store Credit Banner */}
          {storeCreditBalance !== null &&
            storeCreditBalance > 0 &&
            appliedCredit === 0 && (
              <div
                className="flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5"
                data-ocid="billing.store_credit_banner"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-emerald-600 font-medium text-sm">
                    Customer has {fmt(storeCreditBalance)} store credit
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 bg-emerald-600 text-white hover:bg-emerald-700 shrink-0"
                  onClick={() => void handleApplyCredit()}
                  disabled={applyingCredit}
                  data-ocid="billing.apply_credit_button"
                >
                  Apply
                </Button>
              </div>
            )}
          {appliedCredit > 0 && (
            <div
              className="flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5"
              data-ocid="billing.credit_applied_banner"
            >
              <span className="text-emerald-700 text-sm font-medium">
                Store Credit Applied: -{fmt(appliedCredit)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveCredit}
                className="h-7 text-xs text-muted-foreground"
                data-ocid="billing.remove_credit_button"
              >
                Remove
              </Button>
            </div>
          )}

          {/* Price Type Selector */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              {t("priceType")}
            </p>
            <div
              className="flex gap-1 p-1 bg-muted rounded-lg w-fit"
              data-ocid="billing.price_type_tab"
            >
              {(
                [
                  PriceType.Retail,
                  PriceType.Wholesale,
                  PriceType.Custom,
                ] as PriceType[]
              ).map((pt) => (
                <button
                  type="button"
                  key={pt}
                  onClick={() => handlePriceTypeChange(pt)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 min-h-[36px] ${
                    priceType === pt
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`billing.price_type.${pt.toLowerCase()}`}
                >
                  {pt === PriceType.Retail
                    ? "Retail (B2C)"
                    : pt === PriceType.Wholesale
                      ? "Wholesale (B2B)"
                      : t("custom")}
                </button>
              ))}
            </div>
          </div>

          {/* Product Search */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              {t("addProduct")}
            </p>
            <div className="relative flex gap-2" ref={searchRef}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={searchInputRef}
                  id="billing-product-search"
                  placeholder="Search by name or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() =>
                    searchResults.length > 0 && setShowDropdown(true)
                  }
                  className="pl-9 h-11 text-base"
                  data-ocid="billing.product_search_input"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowBarcodeScanner(true)}
                className="h-11 w-11 shrink-0 border-primary/40 text-primary hover:bg-primary/10"
                aria-label="Scan barcode"
                title="Scan product barcode"
                data-ocid="billing.barcode_scan_button"
              >
                <ScanLine className="w-5 h-5" />
              </Button>
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute z-20 top-full mt-1 left-0 right-12 bg-card border rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto">
                  {searchResults.map((p, idx) => (
                    <button
                      type="button"
                      key={String(p.id)}
                      onClick={() => addProduct(p)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b last:border-b-0"
                      data-ocid={`billing.search_result.item.${idx + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.unit} · Stock: {String(p.stock)}
                          {p.barcode &&
                            idx === 0 &&
                            searchResults[0]?.barcode === p.barcode && (
                              <span className="ml-1.5 inline-flex items-center gap-0.5 text-primary font-medium">
                                <ScanLine className="w-3 h-3" /> Barcode
                              </span>
                            )}
                          {p.stock <= p.minStock && (
                            <span className="ml-1.5 text-destructive font-medium">
                              Low
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-primary">
                          {fmt(getPrice(p, priceType))}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {showDropdown &&
                searchResults.length === 0 &&
                searchQuery.trim() &&
                !isSearching && (
                  <div className="absolute z-20 top-full mt-1 left-0 right-12 bg-card border rounded-xl shadow-xl px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      No products found for "<strong>{searchQuery}</strong>"
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Bill Items */}
          {items.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Items ({items.length})
              </p>
              <div
                className="border rounded-xl overflow-hidden"
                data-ocid="billing.items_list"
              >
                {items.map((item, idx) => (
                  <BillItemRow
                    key={String(item.product.id)}
                    item={item}
                    index={idx + 1}
                    priceType={priceType}
                    currency={currency}
                    useIndianFormat={useIndianFormat}
                    onQtyChange={(qty) =>
                      setItems((prev) =>
                        prev.map((it, i) => (i === idx ? { ...it, qty } : it)),
                      )
                    }
                    onRateChange={(rate) =>
                      setItems((prev) =>
                        prev.map((it, i) => (i === idx ? { ...it, rate } : it)),
                      )
                    }
                    onDiscountChange={(discount) =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === idx ? { ...it, discount } : it,
                        ),
                      )
                    }
                    onDiscountModeChange={(discountMode) =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === idx ? { ...it, discountMode } : it,
                        ),
                      )
                    }
                    onRemove={() =>
                      setItems((prev) => prev.filter((_, i) => i !== idx))
                    }
                    lineTotalValue={lineTotal(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {items.length === 0 && (
            <div
              className="border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-2 text-center"
              data-ocid="billing.items_empty_state"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Search and add products above
              </p>
              <p className="text-xs text-muted-foreground/70">
                Products will appear here
              </p>
            </div>
          )}

          {/* Bill-level discount */}
          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                Bill Discount ({currencyConfig.symbol})
              </p>
              <Input
                id="billing-bill-discount"
                type="number"
                min="0"
                value={billDiscount || ""}
                onChange={(e) =>
                  setBillDiscount(
                    Math.max(0, Number.parseFloat(e.target.value) || 0),
                  )
                }
                placeholder="0"
                className="h-9 w-32 text-right"
                data-ocid="billing.bill_discount_input"
              />
            </div>
          )}

          {/* Extra Charges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {t("extraCharges")}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setExtraCharges((prev) => [
                    ...prev,
                    { id: crypto.randomUUID(), description: "", amount: 0 },
                  ])
                }
                className="gap-1 h-7 text-xs text-primary"
                data-ocid="billing.add_charge_button"
              >
                <Plus className="w-3 h-3" /> {t("addCharge")}
              </Button>
            </div>
            {extraCharges.length > 0 && (
              <div className="space-y-2">
                {extraCharges.map((charge, idx) => (
                  <div
                    key={charge.id}
                    className="flex gap-2 items-center"
                    data-ocid={`billing.extra_charge.item.${idx + 1}`}
                  >
                    <Input
                      id={`extra-charge-desc-${idx}`}
                      placeholder="e.g. Delivery, Packing"
                      value={charge.description}
                      onChange={(e) =>
                        setExtraCharges((prev) =>
                          prev.map((c, i) =>
                            i === idx
                              ? { ...c, description: e.target.value }
                              : c,
                          ),
                        )
                      }
                      className="flex-1 h-9 text-sm"
                      data-ocid={`billing.extra_charge_desc.${idx + 1}`}
                    />
                    <Input
                      id={`extra-charge-amount-${idx}`}
                      type="number"
                      min="0"
                      value={charge.amount || ""}
                      onChange={(e) =>
                        setExtraCharges((prev) =>
                          prev.map((c, i) =>
                            i === idx
                              ? {
                                  ...c,
                                  amount:
                                    Number.parseFloat(e.target.value) || 0,
                                }
                              : c,
                          ),
                        )
                      }
                      placeholder="0"
                      className="w-28 h-9 text-right text-sm"
                      data-ocid={`billing.extra_charge_amount.${idx + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setExtraCharges((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                      className="h-9 w-9 text-destructive hover:text-destructive"
                      data-ocid={`billing.extra_charge_delete.${idx + 1}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tax Section */}
          <TaxSection
            taxSystem={taxSystem}
            taxRate={taxRate}
            taxCalc={taxCalc}
            taxInclusive={taxInclusive}
            onTaxInclusiveChange={setTaxInclusive}
            fmt={fmt}
          />

          {/* Payment Mode */}
          {items.length > 0 && (
            <div
              className="bg-muted/40 rounded-xl p-3 space-y-2.5"
              data-ocid="billing.payment_section"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Payment Mode
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode("full")}
                  data-ocid="billing.payment_full_toggle"
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${paymentMode === "full" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}
                >
                  Full Payment
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("partial")}
                  data-ocid="billing.payment_partial_toggle"
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${paymentMode === "partial" ? "bg-amber-500 text-white border-amber-500" : "bg-background text-muted-foreground border-border hover:border-amber-400/50"}`}
                >
                  Part Payment
                </button>
              </div>
              {paymentMode === "partial" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="billing-amount-received"
                      className="text-xs text-muted-foreground whitespace-nowrap"
                    >
                      Amount Received ({currencyConfig.symbol})
                    </label>
                    <input
                      id="billing-amount-received"
                      type="number"
                      min="0"
                      step="0.01"
                      value={amountReceived}
                      onChange={(e) => setAmountReceived(e.target.value)}
                      placeholder={String(grandTotal.toFixed(2))}
                      className="flex-1 h-9 px-3 text-right text-sm border border-input rounded-lg bg-background outline-none focus:ring-2 focus:ring-ring"
                      data-ocid="billing.amount_received_input"
                    />
                  </div>
                  {grandTotal > 0 && (
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-muted-foreground">
                        Pending Amount
                      </span>
                      <span className="text-amber-600">
                        {fmt(
                          Math.max(
                            0,
                            grandTotal - (Number(amountReceived) || 0),
                          ),
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Bill Summary */}
        <div className="lg:w-80 xl:w-96 shrink-0 bg-card border-t lg:border-t-0">
          <BillSummaryPanel
            shopConfig={shopConfig}
            customerName={customerName}
            customerPhone={customerPhone}
            priceType={priceType}
            items={items}
            extraCharges={extraCharges}
            taxSystem={taxSystem}
            taxRate={taxRate}
            taxCalc={taxCalc}
            taxInclusive={taxInclusive}
            subtotal={subtotal}
            totalItemDiscount={totalItemDiscount}
            taxAmount={taxAmount}
            extraTotal={extraTotal}
            grandTotal={grandTotal}
            profit={profit}
            isOwner={isOwner}
            fmt={fmt}
            lineTotal={lineTotal}
            onSave={() => handleSave(false)}
            onSavePrint={() => handleSave(true)}
            onReset={resetBill}
            isSaving={isSaving}
            billNumber={savedBillNumber}
            dateFormat={dateFormat}
            onShareWhatsApp={() => {
              const text = buildWhatsAppText({
                shopName: shopConfig?.shopName ?? "Shop",
                customerName: customerName || "Anonymous",
                items,
                grandTotal,
                currency,
                useIndianFormat,
                lineTotal,
              });
              window.open(
                `https://wa.me/?text=${encodeURIComponent(text)}`,
                "_blank",
              );
            }}
          />
        </div>
      </div>

      {/* Bill Share Card — shown after save */}
      {savedBill && !showPrint && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/95 backdrop-blur-sm border-t shadow-lg lg:relative lg:border-t-0 lg:shadow-none lg:bg-transparent lg:p-0">
          <div className="max-w-md mx-auto">
            <BillShareCard bill={savedBill} shopConfig={shopConfig} />
          </div>
          <div className="flex justify-center mt-2 lg:mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetBill}
              className="gap-1.5 text-muted-foreground"
              data-ocid="billing.new_bill_button"
            >
              + New Bill
            </Button>
          </div>
        </div>
      )}

      {/* Print Dialog */}
      {showPrint && (
        <BillPrintDialog
          shopConfig={shopConfig}
          customerName={customerName || "Anonymous"}
          customerPhone={customerPhone}
          priceType={priceType}
          items={items}
          extraCharges={extraCharges}
          taxSystem={taxSystem}
          taxRate={taxRate}
          taxCalc={taxCalc}
          subtotal={subtotal}
          totalDiscount={totalItemDiscount}
          taxAmount={taxAmount}
          grandTotal={grandTotal}
          billNumber={savedBillNumber}
          fmt={fmt}
          lineTotal={lineTotal}
          dateFormat={dateFormat}
          onClose={() => {
            setShowPrint(false);
            resetBill();
          }}
        />
      )}

      {/* Barcode Scanner Modal */}
      {showBarcodeScanner && (
        <BarcodeScanModal
          onScanned={handleBarcodeScanned}
          onClose={() => setShowBarcodeScanner(false)}
        />
      )}
    </div>
  );
}

// ─── Barcode Scanner Modal ────────────────────────────────────────────────────

type BarcodeScanModalProps = {
  onScanned: (barcode: string) => void;
  onClose: () => void;
};

// BarcodeDetector type for environments without lib.dom types for it
declare global {
  interface Window {
    BarcodeDetector?: new (options?: {
      formats?: string[];
    }) => {
      detect: (
        source: ImageBitmapSource,
      ) => Promise<Array<{ rawValue: string; format: string }>>;
    };
  }
}

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
      // Check BarcodeDetector support
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      data-ocid="billing.barcode_scanner_modal"
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
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
            data-ocid="billing.barcode_scanner_modal.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Camera view or fallback */}
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
                Your browser doesn't support the Barcode Detection API. Use
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
              {/* Scanning overlay */}
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

          {/* Manual barcode entry — always visible */}
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
                  if (e.key === "Enter" && manualBarcode.trim()) {
                    onScanned(manualBarcode.trim());
                  }
                }}
                className="flex-1 h-10 text-sm font-mono"
                autoComplete="off"
                data-ocid="billing.barcode_manual_input"
              />
              <Button
                type="button"
                onClick={() =>
                  manualBarcode.trim() && onScanned(manualBarcode.trim())
                }
                disabled={!manualBarcode.trim()}
                className="h-10 px-4 gap-1.5"
                data-ocid="billing.barcode_manual_submit"
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

// ─── Bill Item Row ────────────────────────────────────────────────────────────

type BillItemRowProps = {
  item: DraftItem;
  index: number;
  priceType: PriceType;
  currency: string;
  useIndianFormat: boolean;
  onQtyChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onDiscountChange: (v: number) => void;
  onDiscountModeChange: (v: DiscountMode) => void;
  onRemove: () => void;
  lineTotalValue: number;
};

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
  lineTotalValue,
}: BillItemRowProps) {
  const fmt = (n: number) => formatCurrency(n, currency, useIndianFormat);
  const decimalAllowed = isDecimalQtyAllowed(item.product);
  const isCustom = priceType === PriceType.Custom;

  return (
    <div
      className="p-3 border-b last:border-b-0 bg-background hover:bg-muted/30 transition-colors"
      data-ocid={`billing.item.${index}`}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {item.product.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {item.product.category} · {item.product.unit}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-7 w-7 text-destructive hover:text-destructive shrink-0 -mt-0.5"
          data-ocid={`billing.item_remove.${index}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Qty stepper */}
        <div className="flex items-center border rounded-lg overflow-hidden h-9">
          <button
            type="button"
            onClick={() =>
              onQtyChange(
                Math.max(
                  decimalAllowed ? 0.1 : 1,
                  Number.parseFloat(
                    (item.qty - (decimalAllowed ? 0.1 : 1)).toFixed(2),
                  ),
                ),
              )
            }
            className="px-2 h-full text-muted-foreground hover:bg-muted transition-colors text-lg leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id={`item-qty-${index}`}
            type="number"
            min={decimalAllowed ? "0.01" : "1"}
            step={decimalAllowed ? "0.01" : "1"}
            value={item.qty}
            onChange={(e) =>
              onQtyChange(
                Math.max(0.01, Number.parseFloat(e.target.value) || 0),
              )
            }
            className="w-14 text-center text-sm font-bold bg-transparent border-x outline-none h-full"
            data-ocid={`billing.item_qty.${index}`}
          />
          <button
            type="button"
            onClick={() =>
              onQtyChange(
                Number.parseFloat(
                  (item.qty + (decimalAllowed ? 0.1 : 1)).toFixed(2),
                ),
              )
            }
            className="px-2 h-full text-muted-foreground hover:bg-muted transition-colors text-lg leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Rate */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">@</span>
          <input
            id={`item-rate-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={item.rate}
            onChange={(e) =>
              isCustom && onRateChange(Number.parseFloat(e.target.value) || 0)
            }
            readOnly={!isCustom}
            className={`w-24 h-9 px-2 text-right text-sm border rounded-lg outline-none ${isCustom ? "bg-background focus:ring-1 focus:ring-primary" : "bg-muted text-muted-foreground cursor-default"}`}
            data-ocid={`billing.item_rate.${index}`}
          />
        </div>

        {/* Discount mode + value */}
        <div className="flex items-center border rounded-lg overflow-hidden h-9">
          <button
            type="button"
            onClick={() =>
              onDiscountModeChange(
                item.discountMode === "percent" ? "fixed" : "percent",
              )
            }
            className="px-2 h-full text-xs font-bold text-muted-foreground bg-muted hover:bg-muted/80 transition-colors border-r min-w-[28px]"
            data-ocid={`billing.item_discount_mode.${index}`}
            aria-label="Toggle discount mode"
          >
            {item.discountMode === "percent" ? "%" : "f"}
          </button>
          <input
            id={`item-discount-${index}`}
            type="number"
            min="0"
            max={item.discountMode === "percent" ? "100" : undefined}
            step="0.01"
            value={item.discount || ""}
            onChange={(e) =>
              onDiscountChange(Number.parseFloat(e.target.value) || 0)
            }
            placeholder="0"
            className="w-16 text-right text-sm bg-transparent outline-none px-2 h-full"
            data-ocid={`billing.item_discount.${index}`}
          />
        </div>

        {/* Line total */}
        <div className="ml-auto text-right">
          <p className="font-bold text-sm text-foreground">
            {fmt(lineTotalValue)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tax Section ──────────────────────────────────────────────────────────────

type TaxSectionProps = {
  taxSystem: TaxSystem;
  taxRate: number;
  taxCalc: ReturnType<typeof calculateTax>;
  taxInclusive: boolean;
  onTaxInclusiveChange: (v: boolean) => void;
  fmt: (n: number) => string;
};

function TaxSection({
  taxSystem,
  taxRate,
  taxCalc,
  taxInclusive,
  onTaxInclusiveChange,
  fmt,
}: TaxSectionProps) {
  if (taxRate === 0) return null;
  const label = taxCalc.taxType;

  return (
    <div className="bg-muted/40 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label} ({taxRate}%)
        </span>
        <label
          htmlFor="tax-inclusive-toggle"
          className="flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className="text-xs text-muted-foreground">Tax Inclusive</span>
          <button
            id="tax-inclusive-toggle"
            type="button"
            role="switch"
            aria-checked={taxInclusive}
            onClick={() => onTaxInclusiveChange(!taxInclusive)}
            className={`relative w-8 rounded-full transition-colors ${taxInclusive ? "bg-primary" : "bg-muted-foreground/30"}`}
            style={{ height: "18px" }}
            data-ocid="billing.tax_inclusive_toggle"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${taxInclusive ? "translate-x-3.5" : "translate-x-0"}`}
            />
          </button>
        </label>
      </div>
      <div className="space-y-1">
        {taxSystem === TaxSystem.GST &&
          taxCalc.breakdown.cgst !== undefined &&
          taxCalc.breakdown.cgst > 0 && (
            <>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  CGST ({taxRate / 2}%)
                </span>
                <span>{fmt(taxCalc.breakdown.cgst)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  SGST ({taxRate / 2}%)
                </span>
                <span>{fmt(taxCalc.breakdown.sgst ?? 0)}</span>
              </div>
            </>
          )}
        {taxCalc.breakdown.igst !== undefined && taxCalc.breakdown.igst > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">IGST ({taxRate}%)</span>
            <span>{fmt(taxCalc.breakdown.igst)}</span>
          </div>
        )}
        {taxCalc.breakdown.vat !== undefined && taxCalc.breakdown.vat > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">VAT ({taxRate}%)</span>
            <span>{fmt(taxCalc.breakdown.vat)}</span>
          </div>
        )}
        {taxCalc.breakdown.salesTax !== undefined &&
          taxCalc.breakdown.salesTax > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                Sales Tax ({taxRate}%)
              </span>
              <span>{fmt(taxCalc.breakdown.salesTax)}</span>
            </div>
          )}
        {taxCalc.breakdown.generic !== undefined &&
          taxCalc.breakdown.generic > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tax ({taxRate}%)</span>
              <span>{fmt(taxCalc.breakdown.generic)}</span>
            </div>
          )}
        <div className="flex justify-between text-xs font-semibold pt-1 border-t">
          <span>Total {label}</span>
          <span>{fmt(taxCalc.taxAmount)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bill Summary Panel ───────────────────────────────────────────────────────

type BillSummaryPanelProps = {
  shopConfig: import("../types").ShopConfig | null;
  customerName: string;
  customerPhone: string;
  priceType: PriceType;
  items: DraftItem[];
  extraCharges: DraftExtraCharge[];
  taxSystem: TaxSystem;
  taxRate: number;
  taxCalc: ReturnType<typeof calculateTax>;
  taxInclusive: boolean;
  subtotal: number;
  totalItemDiscount: number;
  taxAmount: number;
  extraTotal: number;
  grandTotal: number;
  profit: number;
  isOwner: boolean;
  fmt: (n: number) => string;
  lineTotal: (item: DraftItem) => number;
  onSave: () => void;
  onSavePrint: () => void;
  onReset: () => void;
  isSaving: boolean;
  billNumber: bigint | null;
  dateFormat: DateFormat;
  onShareWhatsApp: () => void;
};

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
  onShareWhatsApp,
}: BillSummaryPanelProps) {
  const taxLabel = taxCalc.taxType;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b bg-card">
        <h2 className="font-display font-bold text-base text-foreground">
          Bill Summary
        </h2>
        {billNumber !== null && (
          <p className="text-xs text-muted-foreground">
            Bill #{String(billNumber)}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {(customerName || customerPhone) && (
          <div className="bg-muted/40 rounded-lg px-3 py-2">
            <p className="text-sm font-medium text-foreground">
              {customerName || "Anonymous"}
            </p>
            {customerPhone && (
              <p className="text-xs text-muted-foreground">{customerPhone}</p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs border-primary text-primary"
          >
            {priceType}
          </Badge>
          {taxInclusive && (
            <Badge variant="outline" className="text-xs">
              Tax Inclusive
            </Badge>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-1" data-ocid="billing.summary_items">
            {items.map((item, idx) => (
              <div
                key={String(item.product.id)}
                className="flex justify-between text-sm"
                data-ocid={`billing.summary_item.${idx + 1}`}
              >
                <span className="text-muted-foreground truncate flex-1 min-w-0 mr-2">
                  {item.product.name} × {item.qty}
                </span>
                <span className="font-medium shrink-0">
                  {fmt(lineTotal(item))}
                </span>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && <div className="border-t" />}

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {totalItemDiscount > 0 && (
            <div className="flex justify-between text-sm text-destructive">
              <span>Discount</span>
              <span>−{fmt(totalItemDiscount)}</span>
            </div>
          )}
          {taxRate > 0 && (
            <>
              {taxSystem === TaxSystem.GST &&
                taxCalc.breakdown.cgst !== undefined &&
                taxCalc.breakdown.cgst > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        CGST ({taxRate / 2}%)
                      </span>
                      <span>{fmt(taxCalc.breakdown.cgst)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        SGST ({taxRate / 2}%)
                      </span>
                      <span>{fmt(taxCalc.breakdown.sgst ?? 0)}</span>
                    </div>
                  </>
                )}
              {taxSystem !== TaxSystem.GST && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {taxLabel} ({taxRate}%)
                  </span>
                  <span>{fmt(taxAmount)}</span>
                </div>
              )}
            </>
          )}
          {extraCharges
            .filter((c) => c.amount > 0)
            .map((c, idx) => (
              <div
                key={c.id}
                className="flex justify-between text-sm"
                data-ocid={`billing.summary_charge.${idx + 1}`}
              >
                <span className="text-muted-foreground">
                  {c.description || "Extra Charge"}
                </span>
                <span>{fmt(c.amount)}</span>
              </div>
            ))}
        </div>

        <div className="border-t-2 border-primary/20 pt-2">
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-base text-foreground">
              Grand Total
            </span>
            <span
              className="font-display font-bold text-xl text-primary"
              data-ocid="billing.grand_total"
            >
              {fmt(grandTotal)}
            </span>
          </div>
        </div>

        {/* Profit panel — owner only, never printed */}
        {isOwner && (
          <div
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"
            data-ocid="billing.profit_panel"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  Your Profit
                </p>
                <p className="text-xs text-emerald-600/70 mt-0.5">
                  Hidden from printed bill
                </p>
              </div>
              <span
                className={`font-display font-bold text-lg ${profit >= 0 ? "text-emerald-700" : "text-destructive"}`}
              >
                {fmt(profit)}
              </span>
            </div>
            {grandTotal > 0 && (
              <div className="mt-1.5">
                <div className="flex justify-between text-xs text-emerald-600/70">
                  <span>Margin</span>
                  <span>{((profit / grandTotal) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, (profit / grandTotal) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onShareWhatsApp}
              className="flex-1 gap-1.5 text-xs h-9"
              data-ocid="billing.share_whatsapp_button"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-card space-y-2">
        <Button
          type="button"
          className="w-full h-11 gap-2 font-semibold text-base bg-primary text-primary-foreground"
          onClick={onSavePrint}
          disabled={isSaving || items.length === 0}
          data-ocid="billing.summary_save_print_button"
        >
          <Printer className="w-4 h-4" />
          Save & Print
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-10 gap-1.5"
            onClick={onSave}
            disabled={isSaving || items.length === 0}
            data-ocid="billing.summary_save_button"
          >
            <Save className="w-4 h-4" />
            Save Only
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-10 px-3 text-muted-foreground"
            onClick={onReset}
            data-ocid="billing.summary_reset_button"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp text builder ────────────────────────────────────────────────────

function buildWhatsAppText({
  shopName,
  customerName,
  items,
  grandTotal,
  currency,
  useIndianFormat,
  lineTotal,
}: {
  shopName: string;
  customerName: string;
  items: DraftItem[];
  grandTotal: number;
  currency: string;
  useIndianFormat: boolean;
  lineTotal: (item: DraftItem) => number;
}): string {
  const fmt = (n: number) => formatCurrency(n, currency, useIndianFormat);
  return [
    `*${shopName}*`,
    `Customer: ${customerName}`,
    "",
    "*Items:*",
    ...items.map(
      (i) => `• ${i.product.name} × ${i.qty} = ${fmt(lineTotal(i))}`,
    ),
    "",
    `*Total: ${fmt(grandTotal)}*`,
    "",
    "Thank you for your purchase! 🙏",
  ].join("\n");
}
