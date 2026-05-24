import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Bell,
  ChevronDown,
  FileText,
  Info,
  MessageCircle,
  Package,
  Plus,
  Receipt,
  ShoppingCart,
  Store,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState as useStateLocal } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { buildReminderWhatsAppText } from "../components/BillShareCard";
import { AnalyticsPeriod, useApi } from "../lib/api";
import { formatCurrency } from "../lib/currency";
import { formatDate } from "../lib/date";
import { t } from "../lib/i18n";
import { useStore } from "../lib/store";
import type {
  Bill,
  DeadStockProduct,
  LowStockProduct,
  NearExpiryProduct,
  SalesSummary,
  TopProduct,
} from "../types";

// ── Metric Card ─────────────────────────────────────────────────────────────

type MetricCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
  accent: "blue" | "green" | "neutral";
  tooltip?: string;
  ocid: string;
};

function MetricCard({
  label,
  value,
  sublabel,
  icon,
  accent,
  tooltip,
  ocid,
}: MetricCardProps) {
  const accentMap = {
    blue: "bg-primary/5 border-primary/20 text-primary",
    green: "bg-profit/10 border-profit/20 text-profit",
    neutral: "bg-card border-border text-muted-foreground",
  };
  const valueMap = {
    blue: "text-primary",
    green: "text-profit",
    neutral: "text-foreground",
  };
  const iconBg = {
    blue: "bg-primary/10 text-primary",
    green: "bg-profit/10 text-profit",
    neutral: "bg-muted text-muted-foreground",
  };

  return (
    <div
      data-ocid={ocid}
      className={`relative rounded-xl border p-4 md:p-5 flex flex-col gap-3 ${accentMap[accent]} transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground leading-tight">
          {label}
        </span>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[accent]}`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          className={`text-2xl md:text-3xl font-display font-bold leading-none tracking-tight ${valueMap[accent]}`}
        >
          {value}
        </p>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
        )}
      </div>
      {tooltip && (
        <div className="absolute top-3 right-12 group">
          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
          <div className="absolute z-10 bottom-full right-0 mb-1 w-48 px-2.5 py-1.5 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Period Toggle ────────────────────────────────────────────────────────────

type PeriodToggleProps = {
  period: AnalyticsPeriod;
  onChange: (p: AnalyticsPeriod) => void;
};

function PeriodToggle({ period, onChange }: PeriodToggleProps) {
  const options: { value: AnalyticsPeriod; label: string }[] = [
    { value: AnalyticsPeriod.Today, label: t("today") },
    { value: AnalyticsPeriod.Week, label: t("thisWeek") },
    { value: AnalyticsPeriod.Month, label: t("thisMonth") },
  ];

  return (
    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-ocid={`dashboard.period.${opt.value.toLowerCase()}`}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
            period === opt.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Skeleton Row ─────────────────────────────────────────────────────────────

function MetricSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

// ── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
  currency,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  currency: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2">
      <p className="text-xs font-medium text-muted-foreground mb-1 truncate max-w-[140px]">
        {label}
      </p>
      <p className="text-sm font-bold text-primary">
        {formatCurrency(payload[0].value, currency)}
      </p>
    </div>
  );
}

// ── Expiry urgency color helper ──────────────────────────────────────────────

function expiryUrgencyClass(daysLeft: number): string {
  if (daysLeft <= 7) return "text-red-600";
  if (daysLeft <= 30) return "text-orange-600";
  if (daysLeft <= 90) return "text-yellow-600";
  return "text-muted-foreground";
}

function expiryBorderClass(daysLeft: number): string {
  if (daysLeft <= 7) return "border-red-300 bg-red-50";
  if (daysLeft <= 30) return "border-orange-300 bg-orange-50";
  if (daysLeft <= 90) return "border-yellow-300 bg-yellow-50";
  return "border-border bg-card";
}

// ── Dashboard Record Payment (inline) ──────────────────────────────────────

function DashboardRecordPayment({
  bill,
  currency,
  shopId,
  recordPayment,
  onSuccess,
}: {
  bill: Bill;
  currency: string;
  shopId: string;
  recordPayment: (
    shopId: string,
    billId: bigint,
    amount: number,
  ) => Promise<Bill>;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useStateLocal(false);
  const [amount, setAmount] = useStateLocal("");
  const [saving, setSaving] = useStateLocal(false);

  const handleSave = async (markFull: boolean) => {
    setSaving(true);
    try {
      const additional = markFull
        ? bill.amountPending
        : Math.min(bill.amountPending, Math.max(0, Number(amount) || 0));
      await recordPayment(shopId, bill.id, additional);
      toast.success(markFull ? "Bill marked as paid" : "Payment recorded");
      setOpen(false);
      onSuccess();
    } catch {
      toast.error("Failed to record payment");
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-7 text-xs border-primary/40 text-primary hover:bg-primary/5"
        data-ocid="dashboard.record_payment_button"
      >
        Record Payment
      </Button>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5"
      data-ocid="dashboard.record_payment_inline"
    >
      <input
        type="number"
        min="0"
        max={bill.amountPending}
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={formatCurrency(bill.amountPending, currency)}
        className="w-28 h-7 px-2 text-sm border border-input rounded-md bg-background outline-none focus:ring-1 focus:ring-primary"
        data-ocid="dashboard.record_payment_amount_input"
      />
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={saving || !amount}
        onClick={() => handleSave(false)}
        className="h-7 text-xs"
        data-ocid="dashboard.record_payment_save_button"
      >
        Save
      </Button>
      <Button
        type="button"
        size="sm"
        disabled={saving}
        onClick={() => handleSave(true)}
        className="h-7 text-xs bg-emerald-600 text-white hover:bg-emerald-700"
        data-ocid="dashboard.mark_paid_button"
      >
        Mark Paid
      </Button>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function DashboardPage() {
  const navigate = useNavigate();
  const {
    getSalesSummary,
    getTopProducts,
    getLowStockProducts,
    getNearExpiryProducts,
    getNearExpiryProductsByDays,
    getDeadStockProducts,
    getPendingPaymentBills,
    recordPayment,
    recordReminderSent,
    ready,
  } = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shops = useStore((s) => s.shops);
  const selectedShopIds = useStore((s) => s.selectedShopIds);
  const userRole = useStore((s) => s.userRole);
  const isOwner = userRole !== "staff";

  const [period, setPeriod] = useState<AnalyticsPeriod>(AnalyticsPeriod.Today);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([]);
  const [nearExpiry, setNearExpiry] = useState<NearExpiryProduct[]>([]);
  const [deadStock, setDeadStock] = useState<DeadStockProduct[]>([]);
  const [pendingBills, setPendingBills] = useState<Bill[]>([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [activeAlertTab, setActiveAlertTab] = useState<
    "expiry" | "lowstock" | "dead" | "pending"
  >("expiry");
  const [alertsPanelCollapsed, setAlertsPanelCollapsed] = useState(false);

  const currency = shopConfig?.currency ?? "USD";
  const shopName = shopConfig?.shopName ?? "Your Shop";
  const dateFormat = shopConfig?.dateFormat;
  const expiryThresholdDays = Number(
    (shopConfig as { expiryAlertThresholdDays?: bigint })
      ?.expiryAlertThresholdDays ?? BigInt(90),
  );
  const deadStockAlertDays = BigInt(
    (shopConfig as { deadStockAlertDays?: bigint })?.deadStockAlertDays ??
      BigInt(180),
  );
  const multiShopCount = selectedShopIds.length;

  // Active shop ID — used for all shop-scoped API calls
  const activeShopId = useStore((s) => s.activeShopId);
  const shopId = activeShopId ?? shopConfig?.shopName ?? "";

  // Load period-dependent data
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5000);
    Promise.all([
      getSalesSummary(shopId, period),
      getTopProducts(shopId, period, 10n),
    ])
      .then(([s, tp]) => {
        if (cancelled) return;
        setSummary(s);
        setTopProducts(tp);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
        clearTimeout(timeout);
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [ready, period, shopId, getSalesSummary, getTopProducts]);

  // Load alerts (not period-dependent) — scoped to active shop only
  useEffect(() => {
    // Guard: skip if no active shop — avoids fetching cross-shop data
    if (!ready || !shopId) return;
    let cancelled = false;
    setAlertsLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setAlertsLoading(false);
    }, 5000);

    const nearExpiryCall = getNearExpiryProductsByDays
      ? getNearExpiryProductsByDays(shopId, BigInt(expiryThresholdDays))
      : getNearExpiryProducts(shopId);

    Promise.all([
      getLowStockProducts(shopId),
      nearExpiryCall,
      getDeadStockProducts(shopId, deadStockAlertDays),
    ])
      .then(([ls, ne, ds]) => {
        if (cancelled) return;
        setLowStock(ls);
        setNearExpiry(
          ne.sort((a, b) => Number(a.daysLeft) - Number(b.daysLeft)),
        );
        setDeadStock(
          ds.sort((a, b) => Number(b.daysInactive) - Number(a.daysInactive)),
        );
      })
      .finally(() => {
        if (!cancelled) setAlertsLoading(false);
        clearTimeout(timeout);
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [
    ready,
    shopId,
    getLowStockProducts,
    getNearExpiryProducts,
    getNearExpiryProductsByDays,
    getDeadStockProducts,
    expiryThresholdDays,
    deadStockAlertDays,
  ]);

  // Load pending payment bills
  const fetchPendingBills = useCallback(async () => {
    if (!ready) return;
    setPendingLoading(true);
    try {
      const bills = await getPendingPaymentBills(shopId);
      setPendingBills(bills);
    } catch {
      /* silent */
    } finally {
      setPendingLoading(false);
    }
  }, [ready, getPendingPaymentBills, shopId]);

  useEffect(() => {
    if (ready) void fetchPendingBills();
  }, [ready, fetchPendingBills]);

  const billCount = summary ? Number(summary.billCount) : 0;
  const avgBill = billCount > 0 && summary ? summary.totalSales / billCount : 0;

  const periodLabel = {
    [AnalyticsPeriod.Today]: t("today"),
    [AnalyticsPeriod.Week]: t("thisWeek"),
    [AnalyticsPeriod.Month]: t("thisMonth"),
  }[period];

  const todayStr = formatDate(new Date(), dateFormat);
  const profitMarginPct =
    summary && summary.totalSales > 0
      ? ((summary.totalProfit / summary.totalSales) * 100).toFixed(1)
      : "0.0";

  // Chart data
  const chartData = topProducts.slice(0, 10).map((p) => ({
    name: p.name.length > 14 ? `${p.name.slice(0, 12)}…` : p.name,
    fullName: p.name,
    revenue: p.revenue,
    profit: p.profit,
    qty: p.totalQty,
  }));

  const totalAlertCount =
    lowStock.length +
    nearExpiry.length +
    deadStock.length +
    pendingBills.length;

  // Auto-select the first non-empty alert tab
  useEffect(() => {
    if (alertsLoading) return;
    if (pendingBills.length > 0) setActiveAlertTab("pending");
    else if (nearExpiry.length > 0) setActiveAlertTab("expiry");
    else if (lowStock.length > 0) setActiveAlertTab("lowstock");
    else if (deadStock.length > 0) setActiveAlertTab("dead");
  }, [
    alertsLoading,
    pendingBills.length,
    nearExpiry.length,
    lowStock.length,
    deadStock.length,
  ]);

  return (
    <div
      data-ocid="dashboard.page"
      className="flex flex-col gap-6 pb-24 md:pb-8"
    >
      {/* ── Multi-shop Banner ────────────────────────────────────────── */}
      {multiShopCount > 1 && (
        <div
          data-ocid="dashboard.multi_shop_banner"
          className="flex items-center gap-2.5 px-3 py-2 bg-primary/8 border border-primary/20 rounded-xl text-sm"
        >
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Store className="w-4 h-4 text-primary" />
            <span className="font-semibold text-primary">
              {multiShopCount} Shops Selected
            </span>
          </div>
          <span className="text-muted-foreground hidden sm:inline">·</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">
            Showing data for:{" "}
            <span className="font-medium text-foreground">
              {shops
                .filter((s) => selectedShopIds.includes(s.id))
                .map((s) => s.shopName)
                .join(", ")}
            </span>
          </span>
          <Badge
            variant="secondary"
            className="ml-auto text-[10px] bg-primary/10 text-primary border-0 flex-shrink-0"
          >
            Active: {shopConfig?.shopName}
          </Badge>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
              Welcome back, <span className="text-primary">{shopName}!</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{todayStr}</p>
          </div>
          {totalAlertCount > 0 && (
            <button
              type="button"
              data-ocid="dashboard.alerts_badge"
              onClick={() => setAlertsPanelCollapsed(false)}
              className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 hover:bg-red-100 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              {totalAlertCount} alert{totalAlertCount !== 1 ? "s" : ""}
            </button>
          )}
        </div>

        {/* Period Toggle */}
        <div className="mt-3">
          <PeriodToggle period={period} onChange={setPeriod} />
        </div>
      </div>

      {/* ── Smart Alerts Panel ───────────────────────────────────────── */}
      {alertsLoading ? (
        <div
          data-ocid="dashboard.alerts.loading_state"
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-12 w-full mb-2 rounded-lg" />
          ))}
        </div>
      ) : totalAlertCount === 0 ? (
        <div
          data-ocid="dashboard.alerts.empty_state"
          className="flex items-center gap-3 px-4 py-3.5 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-base">✅</span>
          </div>
          <div>
            <p className="font-semibold text-green-700 text-sm">
              All good! No alerts today.
            </p>
            <p className="text-xs text-green-600/80">
              Stock, expiry, and dead stock are all clear.
            </p>
          </div>
        </div>
      ) : (
        <div
          data-ocid="dashboard.alerts.section"
          className={`bg-card rounded-xl border-2 overflow-hidden transition-all ${
            nearExpiry.length > 0
              ? "border-orange-200"
              : lowStock.length > 0
                ? "border-red-200"
                : "border-muted"
          }`}
        >
          {/* Panel Header */}
          <div
            className={`px-4 py-3 border-b flex items-center gap-2 ${
              nearExpiry.length > 0
                ? "bg-orange-50 border-orange-200"
                : lowStock.length > 0
                  ? "bg-red-50 border-red-200"
                  : "bg-muted/40 border-border"
            }`}
          >
            <Bell
              className={`w-4 h-4 flex-shrink-0 ${
                nearExpiry.length > 0
                  ? "text-orange-600"
                  : lowStock.length > 0
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            />
            <h2
              className={`font-display font-semibold text-sm flex-1 ${
                nearExpiry.length > 0
                  ? "text-orange-700"
                  : lowStock.length > 0
                    ? "text-red-700"
                    : "text-foreground"
              }`}
            >
              Smart Alerts
            </h2>
            <Badge
              className={`text-xs ${
                nearExpiry.length > 0
                  ? "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100"
                  : lowStock.length > 0
                    ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-100"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {totalAlertCount} total
            </Badge>
            <button
              type="button"
              data-ocid="dashboard.alerts.collapse_toggle"
              onClick={() => setAlertsPanelCollapsed((v) => !v)}
              className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={
                alertsPanelCollapsed ? "Expand alerts" : "Collapse alerts"
              }
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  alertsPanelCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {!alertsPanelCollapsed && (
            <>
              {/* Alert Type Tabs */}
              <div className="flex border-b border-border bg-muted/20">
                {[
                  {
                    id: "pending" as const,
                    label: "Pending",
                    count: pendingBills.length,
                    emoji: "💳",
                    urgent: true,
                  },
                  {
                    id: "expiry" as const,
                    label: "Expiry",
                    count: nearExpiry.length,
                    emoji: "🟠",
                    urgent: false,
                  },
                  {
                    id: "lowstock" as const,
                    label: "Low Stock",
                    count: lowStock.length,
                    emoji: "🔴",
                    urgent: false,
                  },
                  {
                    id: "dead" as const,
                    label: "Dead Stock",
                    count: deadStock.length,
                    emoji: "⚫",
                    urgent: false,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-ocid={`dashboard.alerts.tab.${tab.id}`}
                    onClick={() => setActiveAlertTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                      activeAlertTab === tab.id
                        ? tab.urgent && tab.count > 0
                          ? "border-red-500 text-red-600 bg-red-50"
                          : "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                        tab.count > 0
                          ? activeAlertTab === tab.id
                            ? tab.urgent
                              ? "bg-red-500 text-white"
                              : "bg-primary text-primary-foreground"
                            : tab.urgent
                              ? "bg-red-100 text-red-600"
                              : "bg-muted-foreground/20 text-muted-foreground"
                          : "bg-muted text-muted-foreground/40"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="divide-y divide-border max-h-72 overflow-y-auto">
                {/* Pending Payments */}
                {activeAlertTab === "pending" &&
                  (pendingLoading ? (
                    <div className="px-4 py-4 text-sm text-muted-foreground">
                      Loading pending payments…
                    </div>
                  ) : pendingBills.length === 0 ? (
                    <div
                      className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground"
                      data-ocid="dashboard.alerts.pending_empty_state"
                    >
                      <span>🎉</span> No pending payments 🎉
                    </div>
                  ) : (
                    pendingBills.map((bill, i) => {
                      const lastReminderDays = bill.lastReminderSent
                        ? Math.floor(
                            (Date.now() - Number(bill.lastReminderSent)) /
                              (1000 * 60 * 60 * 24),
                          )
                        : null;
                      return (
                        <div
                          key={String(bill.id)}
                          data-ocid={`dashboard.alerts.pending.item.${i + 1}`}
                          className="flex flex-col gap-2 px-4 py-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Receipt className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">
                                {bill.customerName || "Walk-in"}{" "}
                                {bill.customerPhone && (
                                  <span className="text-muted-foreground font-normal">
                                    · {bill.customerPhone}
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Bill #{String(bill.billNumber)} · Total:{" "}
                                {formatCurrency(bill.grandTotal, currency)} ·
                                Paid:{" "}
                                {formatCurrency(bill.amountPaid, currency)}
                              </p>
                              {lastReminderDays !== null && (
                                <p className="text-xs text-amber-600">
                                  Last reminder:{" "}
                                  {lastReminderDays === 0
                                    ? "Today"
                                    : `${lastReminderDays}d ago`}
                                </p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-bold text-red-600">
                                {formatCurrency(bill.amountPending, currency)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                pending
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 pl-11">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                if (!bill.customerPhone) {
                                  toast.error(
                                    "No phone number to send reminder",
                                  );
                                  return;
                                }
                                const phone = bill.customerPhone.replace(
                                  /\D/g,
                                  "",
                                );
                                const text = buildReminderWhatsAppText(
                                  bill,
                                  shopId,
                                  currency,
                                );
                                window.open(
                                  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
                                  "_blank",
                                );
                                try {
                                  await recordReminderSent(shopId, bill.id);
                                  void fetchPendingBills();
                                } catch {
                                  /* silent */
                                }
                              }}
                              disabled={!bill.customerPhone}
                              className="h-7 text-xs gap-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                              data-ocid={`dashboard.alerts.send_reminder.${i + 1}`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              Send Reminder
                            </Button>
                            {isOwner && (
                              <DashboardRecordPayment
                                bill={bill}
                                currency={currency}
                                shopId={shopId}
                                recordPayment={recordPayment}
                                onSuccess={fetchPendingBills}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ))}

                {/* Expiry Alerts */}
                {activeAlertTab === "expiry" &&
                  (nearExpiry.length === 0 ? (
                    <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
                      <span>✅</span> No expiring products within threshold
                    </div>
                  ) : (
                    nearExpiry.map((p, i) => {
                      const daysLeft = Number(p.daysLeft);
                      const urgencyClass = expiryUrgencyClass(daysLeft);
                      const borderClass = expiryBorderClass(daysLeft);
                      return (
                        <div
                          key={String(p.productId)}
                          data-ocid={`dashboard.alerts.expiry.item.${i + 1}`}
                          className="flex items-center gap-3 px-4 py-3"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${borderClass}`}
                          >
                            <AlertCircle
                              className={`w-4 h-4 ${urgencyClass}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Expires:{" "}
                              <span className="font-medium">
                                {p.expiryDate}
                              </span>
                            </p>
                          </div>
                          <div
                            className={`text-right font-bold text-sm flex-shrink-0 ${urgencyClass}`}
                          >
                            {daysLeft <= 0 ? (
                              <span className="text-red-600">Expired</span>
                            ) : (
                              `${daysLeft}d left`
                            )}
                          </div>
                        </div>
                      );
                    })
                  ))}

                {/* Low Stock Alerts */}
                {activeAlertTab === "lowstock" &&
                  (lowStock.length === 0 ? (
                    <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
                      <span>✅</span> All products are well-stocked
                    </div>
                  ) : (
                    lowStock.map((p, i) => (
                      <div
                        key={String(p.productId)}
                        data-ocid={`dashboard.alerts.low_stock.item.${i + 1}`}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Min:{" "}
                            <span className="font-semibold">{p.minStock}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-bold text-red-600">
                              {p.stock}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              in stock
                            </p>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            data-ocid={`dashboard.alerts.restock_button.${i + 1}`}
                            className="text-xs h-8 border-red-200 text-red-700 hover:bg-red-50 flex-shrink-0"
                            onClick={() => navigate({ to: "/products" })}
                          >
                            Restock
                          </Button>
                        </div>
                      </div>
                    ))
                  ))}

                {/* Dead Stock Alerts */}
                {activeAlertTab === "dead" &&
                  (deadStock.length === 0 ? (
                    <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
                      <span>✅</span> No dead stock detected
                    </div>
                  ) : (
                    deadStock.map((p, i) => {
                      const days = Number(p.daysInactive);
                      const isVeryOld = days > 365;
                      return (
                        <div
                          key={String(p.productId)}
                          data-ocid={`dashboard.alerts.dead_stock.item.${i + 1}`}
                          className="flex items-center gap-3 px-4 py-3"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isVeryOld ? "bg-red-100" : "bg-muted"
                            }`}
                          >
                            <TrendingDown
                              className={`w-4 h-4 ${
                                isVeryOld
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {p.lastSaleTime
                                ? `Last sold ${days}d ago`
                                : "Never sold"}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs flex-shrink-0 ${
                              isVeryOld
                                ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-100"
                                : "bg-muted text-muted-foreground border-border hover:bg-muted"
                            }`}
                          >
                            {days > 365
                              ? `${Math.round(days / 365)}yr+`
                              : `${Math.round(days / 30)}mo`}
                          </Badge>
                        </div>
                      );
                    })
                  ))}
              </div>

              {/* Panel Footer: Action Link */}
              <div
                className={`px-4 py-2.5 border-t flex justify-end ${
                  nearExpiry.length > 0
                    ? "bg-orange-50 border-orange-200"
                    : lowStock.length > 0
                      ? "bg-red-50 border-red-200"
                      : "bg-muted/20 border-border"
                }`}
              >
                <button
                  type="button"
                  data-ocid="dashboard.alerts.view_products_button"
                  onClick={() => navigate({ to: "/products" })}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View all products →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Metrics Row ────────────────────────────────────────────────── */}
      <div
        data-ocid="dashboard.metrics"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {loading ? (
          <>
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              ocid="dashboard.total_sales.card"
              label={t("totalSales")}
              value={
                summary
                  ? formatCurrency(summary.totalSales, currency)
                  : formatCurrency(0, currency)
              }
              sublabel={periodLabel}
              icon={<TrendingUp className="w-4.5 h-4.5" />}
              accent="blue"
            />
            {isOwner ? (
              <MetricCard
                ocid="dashboard.total_profit.card"
                label={t("totalProfit")}
                value={
                  summary
                    ? formatCurrency(summary.totalProfit, currency)
                    : formatCurrency(0, currency)
                }
                sublabel={`${profitMarginPct}% margin`}
                icon={<TrendingDown className="w-4.5 h-4.5" />}
                accent="green"
                tooltip="Selling price minus cost price"
              />
            ) : (
              <MetricCard
                ocid="dashboard.bill_count.card"
                label={t("billCount")}
                value={String(billCount)}
                sublabel={periodLabel}
                icon={<Receipt className="w-4.5 h-4.5" />}
                accent="neutral"
              />
            )}
            {isOwner ? (
              <MetricCard
                ocid="dashboard.bill_count.card"
                label={t("billCount")}
                value={String(billCount)}
                sublabel={periodLabel}
                icon={<Receipt className="w-4.5 h-4.5" />}
                accent="neutral"
              />
            ) : (
              <MetricCard
                ocid="dashboard.avg_bill.card"
                label="Avg Bill Value"
                value={formatCurrency(avgBill, currency)}
                sublabel="per transaction"
                icon={<ShoppingCart className="w-4.5 h-4.5" />}
                accent="neutral"
              />
            )}
          </>
        )}
      </div>

      {/* ── Empty state ────────────────────────────────────────────────── */}
      {!loading && summary && summary.billCount === 0n && (
        <div
          data-ocid="dashboard.empty_state"
          className="flex flex-col items-center justify-center text-center py-10 px-6 bg-muted/40 rounded-xl border border-dashed border-border"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <p className="font-display font-semibold text-foreground text-lg">
            No sales yet for {periodLabel}
          </p>
          <p className="text-muted-foreground text-sm mt-1 max-w-xs">
            Create your first bill to start tracking sales and profit in real
            time.
          </p>
          <Button
            type="button"
            data-ocid="dashboard.create_first_bill.primary_button"
            className="mt-5 gap-2"
            onClick={() => navigate({ to: "/billing" })}
          >
            <Plus className="w-4 h-4" />
            {t("createFirstBill")}
          </Button>
        </div>
      )}

      {/* ── Top Products Chart + List ──────────────────────────────────────────── */}
      {!loading && topProducts.length > 0 && (
        <div
          data-ocid="dashboard.top_products.section"
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="px-4 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-foreground text-base">
                {t("topProducts")}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Top 10 by revenue — {periodLabel}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {topProducts.length} products
            </Badge>
          </div>

          {/* Bar chart */}
          <div className="px-2 pt-4 pb-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => formatCurrency(v, currency)}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip
                  content={<ChartTooltip currency={currency} />}
                  cursor={{ fill: "hsl(var(--muted))", radius: 4 }}
                />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table list */}
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2 pr-3 w-8">
                      #
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2 pr-3">
                      {t("productName")}
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 pr-3">
                      {t("qty")}
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 pr-3">
                      Revenue
                    </th>
                    {isOwner && (
                      <th className="text-right text-xs font-medium text-muted-foreground py-2">
                        {t("profit")}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {topProducts.slice(0, 10).map((p, i) => (
                    <tr
                      key={String(p.productId)}
                      data-ocid={`dashboard.top_products.item.${i + 1}`}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-2.5 pr-3">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                            i === 0
                              ? "bg-amber-100 text-amber-700"
                              : i === 1
                                ? "bg-muted text-muted-foreground"
                                : i === 2
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 font-medium text-foreground truncate max-w-[120px] md:max-w-none">
                        {p.name}
                      </td>
                      <td className="py-2.5 pr-3 text-right text-muted-foreground tabular-nums">
                        {p.totalQty % 1 === 0
                          ? p.totalQty.toFixed(0)
                          : p.totalQty.toFixed(2)}
                      </td>
                      <td className="py-2.5 pr-3 text-right font-semibold text-primary tabular-nums">
                        {formatCurrency(p.revenue, currency)}
                      </td>
                      {isOwner && (
                        <td className="py-2.5 text-right font-semibold text-profit tabular-nums">
                          {formatCurrency(p.profit, currency)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Actions ─────────────────────────────────────────────────── */}
      <div
        data-ocid="dashboard.quick_actions.section"
        className="flex flex-col sm:flex-row gap-3 mt-2"
      >
        <Button
          type="button"
          data-ocid="dashboard.create_bill.primary_button"
          className="flex-1 h-14 text-base font-semibold gap-2 rounded-xl shadow-sm"
          onClick={() => navigate({ to: "/billing" })}
        >
          <FileText className="w-5 h-5" />
          Create New Bill
        </Button>
        <Button
          type="button"
          data-ocid="dashboard.add_product.secondary_button"
          variant="outline"
          className="flex-1 h-14 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 gap-2 rounded-xl"
          onClick={() => navigate({ to: "/products" })}
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
