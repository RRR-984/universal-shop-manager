import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/lib/api";
import {
  CreditTransactionType,
  type CustomerCredit,
  type ReturnBill,
  ReturnStatus,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  CheckCircle2,
  Coins,
  Phone,
  Plus,
  Receipt,
  RefreshCw,
  RotateCcw,
  Search,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { CustomerView } from "../backend.d";
import { formatCurrency } from "../lib/currency";
import { formatDate, formatDateTime } from "../lib/date";
import { useStore } from "../lib/store";
import { DateFormat } from "../types";
import type { Bill } from "../types";

// ─── helpers ────────────────────────────────────────────────────────────────

function relativeDate(ts: bigint | undefined): string {
  if (!ts) return "Never";
  const ms = Number(ts);
  const diffMs = Date.now() - ms;
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function billNumberLabel(n: bigint): string {
  return `#${String(n).padStart(4, "0")}`;
}

// ─── skeletons ───────────────────────────────────────────────────────────────

function CustomerSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="text-right space-y-1">
        <Skeleton className="h-4 w-20 ml-auto" />
        <Skeleton className="h-3 w-14 ml-auto" />
      </div>
    </div>
  );
}

// ─── empty state ─────────────────────────────────────────────────────────────

function EmptyState({
  filtered,
  onAdd,
  isOwner,
}: {
  filtered: boolean;
  onAdd: () => void;
  isOwner: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="customers.empty_state"
    >
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
        <Users className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-foreground text-lg">
          {filtered ? "No customers found" : "No customers yet"}
        </p>
        <p className="text-muted-foreground text-sm mt-1 max-w-xs">
          {filtered
            ? "Try adjusting your search query"
            : "Customer profiles are created automatically when you add a name and phone to a bill."}
        </p>
      </div>
      {!filtered && isOwner && (
        <Button
          type="button"
          className="gap-2"
          onClick={onAdd}
          data-ocid="customers.add_first.primary_button"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      )}
    </div>
  );
}

// ─── stat card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color = "default",
}: {
  label: string;
  value: string;
  color?: "default" | "blue" | "green";
}) {
  const cls =
    color === "blue"
      ? "text-primary"
      : color === "green"
        ? "text-emerald-600"
        : "text-foreground";
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col gap-0.5 min-w-0">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
        {label}
      </span>
      <span className={`font-display text-lg font-bold truncate ${cls}`}>
        {value}
      </span>
    </div>
  );
}

// ─── add/edit customer modal ─────────────────────────────────────────────────

function CustomerFormModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: { name: string; phone: string };
  onSave: (name: string, phone: string) => Promise<void>;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSave(name.trim(), phone.trim());
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm w-full"
        data-ocid="customer_form.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {initial ? "Edit Customer" : "Add Customer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="cust-name">Name *</Label>
            <Input
              id="cust-name"
              placeholder="Customer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              data-ocid="customer_form.name.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cust-phone">Phone</Label>
            <Input
              id="cust-phone"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              data-ocid="customer_form.phone.input"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              className="flex-1"
              disabled={saving || !name.trim()}
              data-ocid="customer_form.submit_button"
            >
              {saving ? "Saving…" : initial ? "Save Changes" : "Add Customer"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="customer_form.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── customer detail modal ───────────────────────────────────────────────────

function CustomerDetailModal({
  customer,
  bills,
  billsLoading,
  currency,
  dateFormat,
  isOwner,
  onEdit,
  onClose,
}: {
  customer: CustomerView;
  bills: Bill[];
  billsLoading: boolean;
  currency: string;
  dateFormat: DateFormat;
  isOwner: boolean;
  onEdit: () => void;
  onClose: () => void;
}) {
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = shopConfig?.shopName ?? "";
  const [credit, setCredit] = useState<CustomerCredit | null>(null);
  const [returns, setReturns] = useState<ReturnBill[]>([]);
  const [activeTab, setActiveTab] = useState<"history" | "returns">("history");

  useEffect(() => {
    if (!customer.phone || !shopId) return;
    api
      .getCustomerCredit(shopId, customer.phone)
      .then(setCredit)
      .catch(() => {});
  }, [api, customer.phone, shopId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — reload when bills arrive
  useEffect(() => {
    if (!shopId || bills.length === 0) return;
    Promise.all(bills.map((b) => api.getReturnsByBill(shopId, b.id)))
      .then((arrays) => setReturns(arrays.flat()))
      .catch(() => {});
  }, [bills, shopId]);

  const firstPurchase = bills.length
    ? bills.reduce(
        (min, b) => (b.createdAt < min ? b.createdAt : min),
        bills[0].createdAt,
      )
    : null;

  const lastPurchase = customer.lastPurchaseDate ?? null;
  const hasCredit =
    credit && (credit.balance > 0 || credit.transactions.length > 0);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        data-ocid="customer_detail.dialog"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl leading-tight">
                  {customer.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                  {customer.phone || "No phone"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {hasCredit && (
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200"
                  data-ocid="customer_detail.store_credit_badge"
                >
                  <Coins className="w-3 h-3" />
                  {formatCurrency(credit.balance, currency)}
                </span>
              )}
              {isOwner && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  data-ocid="customer_detail.edit_button"
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Summary grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <p className="text-2xl font-display font-bold text-primary">
              {String(customer.totalBills)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Bills</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <p className="text-lg font-display font-bold text-foreground truncate">
              {formatCurrency(customer.totalSpent, currency)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Spent</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-foreground">
              {firstPurchase
                ? formatDate(new Date(Number(firstPurchase)), dateFormat)
                : "\u2014"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">First Buy</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-foreground">
              {lastPurchase ? relativeDate(lastPurchase) : "\u2014"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Last Buy</p>
          </div>
        </div>

        {/* Store Credit transaction history */}
        {hasCredit && credit.transactions.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="font-display font-semibold text-sm text-foreground">
              Credit Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 px-1 text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-1.5 px-1 text-muted-foreground">
                      Type
                    </th>
                    <th className="text-right py-1.5 px-1 text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left py-1.5 px-1 text-muted-foreground">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {credit.transactions.map((tx, i) => (
                    <tr
                      key={String(tx.id)}
                      className="border-b border-border/50 last:border-0"
                      data-ocid={`customer_detail.credit_tx.${i + 1}`}
                    >
                      <td className="py-1.5 px-1 text-muted-foreground">
                        {new Date(Number(tx.date)).toLocaleDateString()}
                      </td>
                      <td className="py-1.5 px-1">
                        {tx.txType === CreditTransactionType.Earned ? (
                          <span className="text-emerald-600 font-medium">
                            +Earned
                          </span>
                        ) : (
                          <span className="text-primary font-medium">
                            -Used
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 px-1 text-right font-semibold tabular-nums">
                        {formatCurrency(tx.amount, currency)}
                      </td>
                      <td className="py-1.5 px-1 text-muted-foreground truncate max-w-[100px]">
                        {tx.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="customer_detail.history_tab"
          >
            Purchase History
          </button>
          {returns.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("returns")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "returns"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="customer_detail.returns_tab"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Returns ({returns.length})
            </button>
          )}
        </div>

        {/* Purchase history */}
        {activeTab === "history" && (
          <div>
            {billsLoading ? (
              <div
                className="space-y-2"
                data-ocid="customer_detail.loading_state"
              >
                {([1, 2, 3] as const).map((k) => (
                  <Skeleton key={k} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            ) : bills.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No purchase history available
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-1 text-muted-foreground font-medium text-xs">
                        Bill #
                      </th>
                      <th className="text-left py-2 px-1 text-muted-foreground font-medium text-xs">
                        Date
                      </th>
                      <th className="text-right py-2 px-1 text-muted-foreground font-medium text-xs">
                        Items
                      </th>
                      <th className="text-right py-2 px-1 text-muted-foreground font-medium text-xs">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill, i) => (
                      <tr
                        key={String(bill.id)}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                        data-ocid={`customer_detail.bill.item.${i + 1}`}
                      >
                        <td className="py-2.5 px-1 font-medium text-foreground">
                          {billNumberLabel(bill.billNumber)}
                        </td>
                        <td className="py-2.5 px-1 text-muted-foreground">
                          {formatDateTime(bill.createdAt, dateFormat)}
                        </td>
                        <td className="py-2.5 px-1 text-right text-muted-foreground">
                          {bill.items.length}
                        </td>
                        <td className="py-2.5 px-1 text-right font-semibold text-foreground tabular-nums">
                          {formatCurrency(bill.grandTotal, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Return history tab */}
        {activeTab === "returns" && returns.length > 0 && (
          <div className="space-y-2">
            {returns.map((ret) => (
              <div
                key={String(ret.id)}
                className="flex items-start justify-between gap-2 p-3 bg-muted/30 rounded-lg text-xs border border-border"
                data-ocid={`customer_detail.return.${String(ret.id)}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    Return #{String(ret.id)} \u00b7 Bill #
                    {String(ret.originalBillId).padStart(4, "0")}
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    {ret.returnItems
                      .map((ri) => `${ri.name} \u00d7${ri.returnQty}`)
                      .join(", ")}
                  </p>
                  <p className="font-semibold text-foreground mt-1">
                    {formatCurrency(ret.totalRefundAmount, currency)}
                  </p>
                </div>
                <div className="shrink-0">
                  {ret.status === ReturnStatus.Approved ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : ret.status === ReturnStatus.Rejected ? (
                    <span className="inline-flex items-center gap-1 text-destructive text-xs font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
                      <RotateCcw className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end border-t border-border pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="customer_detail.close_button"
          >
            <X className="w-4 h-4 mr-1.5" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── customer card ────────────────────────────────────────────────────────────

function CustomerCard({
  customer,
  currency,
  index,
  onClick,
}: {
  customer: CustomerView;
  currency: string;
  index: number;
  onClick: () => void;
}) {
  const initials = customer.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <button
      type="button"
      className="w-full text-left bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={onClick}
      data-ocid={`customers.item.${index}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-primary">
            {initials || "?"}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">
            {customer.name}
          </p>
          <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 shrink-0" />
            {customer.phone || "No phone"}
          </p>
        </div>

        {/* Stats */}
        <div className="text-right shrink-0 flex flex-col gap-1">
          <p className="font-display font-bold text-sm text-foreground tabular-nums">
            {formatCurrency(customer.totalSpent, currency)}
          </p>
          <div className="flex items-center gap-1.5 justify-end">
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 gap-0.5"
            >
              <Receipt className="w-2.5 h-2.5" />
              {String(customer.totalBills)}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {relativeDate(customer.lastPurchaseDate)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function CustomersPage() {
  const { actor } = useActor(createActor);
  const shopConfig = useStore((s) => s.shopConfig);

  const currency = shopConfig?.currency ?? "USD";
  const dateFormat = shopConfig?.dateFormat ?? DateFormat.DDMMYYYY;
  const shopId = shopConfig?.shopName ?? "";

  // Role: owner = first user. Staff role only bills access — no profit shown here regardless.
  // This page is safe for staff (no profit data shown).
  const isOwner = useStore((s) => s.isOwner());

  // ── state ──────────────────────────────────────────────────────────────────
  const [customers, setCustomers] = useState<CustomerView[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerView | null>(
    null,
  );
  const [customerBills, setCustomerBills] = useState<Bill[]>([]);
  const [billsLoading, setBillsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerView | null>(
    null,
  );
  const searchRef = useRef<HTMLInputElement>(null);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchCustomers = useCallback(
    async (silent = false) => {
      if (!actor || !shopId) return;
      if (!silent) setLoading(true);
      else setRefreshing(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 8000);
      try {
        const data = await actor.getShopCustomers(shopId);
        const sorted = [...data].sort(
          (a, b) =>
            Number(b.lastPurchaseDate ?? 0n) - Number(a.lastPurchaseDate ?? 0n),
        );
        setCustomers(sorted);
      } catch {
        toast.error("Failed to load customers");
      } finally {
        clearTimeout(timeout);
        setLoading(false);
        setRefreshing(false);
      }
    },
    [actor, shopId],
  );

  useEffect(() => {
    if (actor && shopId) void fetchCustomers();
    else if (!actor) setLoading(true);
  }, [actor, shopId, fetchCustomers]);

  // ── search (local filter; debounce not needed at this scale) ───────────────
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q),
    );
  }, [customers, searchQuery]);

  // ── stats ──────────────────────────────────────────────────────────────────
  const totalSpent = useMemo(
    () => customers.reduce((sum, c) => sum + c.totalSpent, 0),
    [customers],
  );

  // ── open detail ───────────────────────────────────────────────────────────
  const openDetail = useCallback(
    async (customer: CustomerView) => {
      setSelectedCustomer(customer);
      if (!actor || !shopId) return;
      setBillsLoading(true);
      try {
        const bills = await actor.getCustomerBills(shopId, customer.id);
        const sorted = [...bills].sort(
          (a, b) => Number(b.createdAt) - Number(a.createdAt),
        );
        setCustomerBills(sorted);
      } catch {
        toast.error("Failed to load purchase history");
      } finally {
        setBillsLoading(false);
      }
    },
    [actor, shopId],
  );

  // ── save customer ─────────────────────────────────────────────────────────
  const handleSaveCustomer = useCallback(
    async (name: string, phone: string) => {
      if (!actor || !shopId) throw new Error("Not ready");
      await actor.createOrUpdateCustomer(shopId, name, phone);
      toast.success(editingCustomer ? "Customer updated" : "Customer added");
      await fetchCustomers(true);
      // If editing current detail, refresh it
      if (editingCustomer) {
        setSelectedCustomer((prev) => (prev ? { ...prev, name, phone } : prev));
      }
      setEditingCustomer(null);
    },
    [actor, shopId, editingCustomer, fetchCustomers],
  );

  // ── refresh ───────────────────────────────────────────────────────────────
  const handleRefresh = () => {
    void fetchCustomers(true);
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-background pb-24"
      data-ocid="customers.page"
    >
      {/* Sticky header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-foreground">
                  Customers
                </h1>
                {!loading && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    data-ocid="customers.count_badge"
                  >
                    {customers.length}
                  </Badge>
                )}
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-9 h-9"
                onClick={handleRefresh}
                disabled={refreshing}
                aria-label="Refresh customers"
                data-ocid="customers.refresh_button"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </Button>
              {isOwner && (
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5 h-9"
                  onClick={() => setShowAddModal(true)}
                  data-ocid="customers.add_button"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={searchRef}
              placeholder="Search by name or phone…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
              data-ocid="customers.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                data-ocid="customers.search_clear_button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-4">
        {/* Stats */}
        {!loading && customers.length > 0 && (
          <div
            className="grid grid-cols-3 gap-2"
            data-ocid="customers.stats.section"
          >
            <StatCard
              label="Customers"
              value={String(customers.length)}
              color="default"
            />
            <StatCard
              label="Total Spent"
              value={formatCurrency(totalSpent, currency)}
              color="blue"
            />
            <StatCard
              label="Avg Spend"
              value={
                customers.length > 0
                  ? formatCurrency(totalSpent / customers.length, currency)
                  : "—"
              }
              color="green"
            />
          </div>
        )}

        {/* Loading skeletons */}
        {loading ? (
          <div className="space-y-2" data-ocid="customers.loading_state">
            {([1, 2, 3, 4, 5] as const).map((k) => (
              <CustomerSkeleton key={k} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            filtered={customers.length > 0 || !!searchQuery}
            onAdd={() => setShowAddModal(true)}
            isOwner={isOwner}
          />
        ) : (
          <div className="space-y-2" data-ocid="customers.list">
            {filtered.map((customer, i) => (
              <CustomerCard
                key={String(customer.id)}
                customer={customer}
                currency={currency}
                index={i + 1}
                onClick={() => openDetail(customer)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add customer modal */}
      {showAddModal && (
        <CustomerFormModal
          onSave={handleSaveCustomer}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit customer modal (from detail panel) */}
      {editingCustomer && (
        <CustomerFormModal
          initial={{ name: editingCustomer.name, phone: editingCustomer.phone }}
          onSave={handleSaveCustomer}
          onClose={() => setEditingCustomer(null)}
        />
      )}

      {/* Customer detail modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          bills={customerBills}
          billsLoading={billsLoading}
          currency={currency}
          dateFormat={dateFormat}
          isOwner={isOwner}
          onEdit={() => {
            setEditingCustomer(selectedCustomer);
            setSelectedCustomer(null);
          }}
          onClose={() => {
            setSelectedCustomer(null);
            setCustomerBills([]);
          }}
        />
      )}
    </div>
  );
}
