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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/lib/api";
import { formatCurrency } from "@/lib/currency";
import { formatDateTime } from "@/lib/date";
import { useStore } from "@/lib/store";
import {
  BillStatus,
  CreditTransactionType,
  DateFormat,
  PaymentType,
  ReturnStatus,
} from "@/types";
import type {
  Bill,
  BillFilter,
  BillId,
  ReturnBill,
  ReturnItem,
  ShopConfig,
} from "@/types";
import {
  AlertTriangle,
  Ban,
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageCircle,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  BillShareCard,
  buildReminderWhatsAppText,
} from "../components/BillShareCard";

// ─── helpers ────────────────────────────────────────────────────────────────

type QuickFilter = "all" | "today" | "week" | "month";

function todayRange(): { from: bigint; to: bigint } {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}

function weekRange(): { from: bigint; to: bigint } {
  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}

function monthRange(): { from: bigint; to: bigint } {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { from: BigInt(start.getTime()), to: BigInt(end.getTime()) };
}

function billNumberLabel(n: bigint): string {
  return `#${String(n).padStart(4, "0")}`;
}

function matchesSearch(bill: Bill, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase().trim();
  if (bill.customerName.toLowerCase().includes(q)) return true;
  if (bill.customerPhone.toLowerCase().includes(q)) return true;
  const label = billNumberLabel(bill.billNumber).toLowerCase();
  if (label.includes(q)) return true;
  if (String(bill.billNumber).includes(q)) return true;
  return false;
}

const RETURN_REASONS = [
  "Damaged",
  "Defective",
  "Wrong Item",
  "Changed Mind",
  "Size Wrong",
  "Quality Issue",
  "Expired",
  "Other",
];

// ─── print helpers ──────────────────────────────────────────────────────────

type PrintSize = "58mm" | "80mm" | "a4";

function printBill(bill: Bill, shopConfig: ShopConfig | null, size: PrintSize) {
  const currency = shopConfig?.currency ?? "USD";
  const dateFormat = shopConfig?.dateFormat ?? DateFormat.DDMMYYYY;
  const shopName = shopConfig?.shopName ?? "Shop";
  const shopAddress = shopConfig?.shopAddress ?? "";
  const shopPhone = shopConfig?.shopPhone ?? "";

  const width = size === "58mm" ? "58mm" : size === "80mm" ? "80mm" : "210mm";
  const itemsHtml = bill.items
    .map(
      (item) => `
      <tr>
        <td style="padding:2px 4px">${item.name}</td>
        <td style="padding:2px 4px;text-align:right">${item.qty} ${item.unit}</td>
        <td style="padding:2px 4px;text-align:right">${formatCurrency(item.rate, currency)}</td>
        ${item.discount > 0 ? `<td style="padding:2px 4px;text-align:right">-${formatCurrency(item.discount, currency)}</td>` : ""}
        <td style="padding:2px 4px;text-align:right">${formatCurrency(item.lineTotal, currency)}</td>
      </tr>`,
    )
    .join("");

  const taxHtml =
    bill.taxBreakdown.cgst > 0
      ? `<tr><td>CGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.cgst, currency)}</td></tr>
         <tr><td>SGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.sgst, currency)}</td></tr>`
      : bill.taxBreakdown.igst > 0
        ? `<tr><td>IGST</td><td style="text-align:right">${formatCurrency(bill.taxBreakdown.igst, currency)}</td></tr>`
        : "";

  const extraHtml = bill.extraCharges
    .map(
      (c) =>
        `<tr><td>${c.description}</td><td style="text-align:right">${formatCurrency(c.amount, currency)}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html><html><head><style>
    body{font-family:monospace;font-size:${size === "a4" ? "14px" : "11px"};width:${width};margin:0 auto;padding:8px}
    h2{text-align:center;margin:4px 0;font-size:${size === "a4" ? "18px" : "13px"}}
    p{margin:2px 0;text-align:center}
    table{width:100%;border-collapse:collapse;margin:6px 0}
    hr{border:none;border-top:1px dashed #000;margin:6px 0}
    .total{font-weight:bold;font-size:${size === "a4" ? "16px" : "13px"}}
  </style></head><body>
    <h2>${shopName}</h2>
    <p>${shopAddress}</p>
    <p>${shopPhone}</p>
    <hr/>
    <p>Bill: ${billNumberLabel(bill.billNumber)}</p>
    <p>Date: ${formatDateTime(bill.createdAt, dateFormat)}</p>
    ${bill.customerName ? `<p>Customer: ${bill.customerName}</p>` : ""}
    ${bill.customerPhone ? `<p>Phone: ${bill.customerPhone}</p>` : ""}
    <hr/>
    <table>${itemsHtml}</table>
    <hr/>
    <table>
      <tr><td>Subtotal</td><td style="text-align:right">${formatCurrency(bill.subtotal, currency)}</td></tr>
      ${taxHtml}
      ${extraHtml}
      ${bill.totalDiscount > 0 ? `<tr><td>Discount</td><td style="text-align:right">-${formatCurrency(bill.totalDiscount, currency)}</td></tr>` : ""}
      <tr class="total"><td>TOTAL</td><td style="text-align:right">${formatCurrency(bill.grandTotal, currency)}</td></tr>
    </table>
    <hr/>
    <p style="font-size:10px">Thank you for your purchase!</p>
  </body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
}

// ─── return status badge ─────────────────────────────────────────────────────

function ReturnStatusBadge({ status }: { status: ReturnStatus }) {
  if (status === ReturnStatus.Approved) {
    return (
      <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200 gap-1">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </Badge>
    );
  }
  if (status === ReturnStatus.Rejected) {
    return (
      <Badge variant="destructive" className="text-xs gap-1">
        <XCircle className="w-3 h-3" /> Rejected
      </Badge>
    );
  }
  return (
    <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200 gap-1">
      <RotateCcw className="w-3 h-3" /> Pending Approval
    </Badge>
  );
}

// ─── return request modal ────────────────────────────────────────────────────

type ReturnItemDraft = {
  productId: bigint;
  name: string;
  originalRate: number;
  maxQty: number;
  returnQty: number;
  reason: string;
  notes: string;
};

function ReturnRequestModal({
  bill,
  currency,
  shopId,
  onClose,
  onSuccess,
}: {
  bill: Bill;
  currency: string;
  shopId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const api = useApi();
  const [items, setItems] = useState<ReturnItemDraft[]>(
    bill.items.map((it) => ({
      productId: it.productId,
      name: it.name,
      originalRate: it.rate,
      maxQty: it.qty,
      returnQty: 0,
      reason: RETURN_REASONS[0],
      notes: "",
    })),
  );
  const [saving, setSaving] = useState(false);

  const selectedCount = items.filter((i) => i.returnQty > 0).length;
  const totalRefund = items.reduce(
    (sum, i) => sum + i.returnQty * i.originalRate,
    0,
  );

  const handleSubmit = async () => {
    const returnItems = items
      .filter((i) => i.returnQty > 0)
      .map((i) => ({
        productId: i.productId,
        name: i.name,
        returnQty: i.returnQty,
        originalRate: i.originalRate,
        lineTotal: i.returnQty * i.originalRate,
        reason: i.reason ? i.reason : undefined,
      })) as ReturnItem[];
    if (returnItems.length === 0) {
      toast.error("Select at least one item to return");
      return;
    }
    setSaving(true);
    try {
      const result = await api.createReturn(shopId, {
        originalBillId: bill.id,
        returnItems,
        customerName: bill.customerName || "Anonymous",
        customerPhone: bill.customerPhone,
      });
      toast.success(`Return #${result.id} submitted — Pending Owner Approval`);
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to submit return request");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
        data-ocid="return_request.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            Return Items — {billNumberLabel(bill.billNumber)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={String(item.productId)}
              className={`border rounded-xl p-3 space-y-2 transition-colors ${
                item.returnQty > 0
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-muted/20"
              }`}
              data-ocid={`return_request.item.${idx + 1}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm text-foreground truncate flex-1">
                  {item.name}
                </p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatCurrency(item.originalRate, currency)} × max{" "}
                  {item.maxQty}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg overflow-hidden h-8">
                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === idx
                            ? {
                                ...it,
                                returnQty: Math.max(0, it.returnQty - 1),
                              }
                            : it,
                        ),
                      )
                    }
                    className="px-2 h-full text-muted-foreground hover:bg-muted transition-colors"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-bold">
                    {item.returnQty}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === idx
                            ? {
                                ...it,
                                returnQty: Math.min(
                                  it.maxQty,
                                  it.returnQty + 1,
                                ),
                              }
                            : it,
                        ),
                      )
                    }
                    className="px-2 h-full text-muted-foreground hover:bg-muted transition-colors"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                {item.returnQty > 0 && (
                  <Select
                    value={item.reason}
                    onValueChange={(v) =>
                      setItems((prev) =>
                        prev.map((it, i) =>
                          i === idx ? { ...it, reason: v } : it,
                        ),
                      )
                    }
                  >
                    <SelectTrigger
                      className="flex-1 h-8 text-xs"
                      data-ocid={`return_request.reason.${idx + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RETURN_REASONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCount > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm">
            <div className="flex justify-between font-semibold">
              <span>
                {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
              </span>
              <span className="text-primary">
                Refund: {formatCurrency(totalRefund, currency)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Store credit will be awarded upon owner approval
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            className="flex-1"
            disabled={saving || selectedCount === 0}
            onClick={handleSubmit}
            data-ocid="return_request.submit_button"
          >
            {saving ? "Submitting…" : "Submit Return Request"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="return_request.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── returns section ─────────────────────────────────────────────────────────

function ReturnsSectionInDetail({
  bill,
  currency,
  shopId,
  dateFormat,
}: {
  bill: Bill;
  currency: string;
  shopId: string;
  dateFormat: DateFormat;
}) {
  const api = useApi();
  const [returns, setReturns] = useState<ReturnBill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .getReturnsByBill(shopId, bill.id)
      .then((data) => {
        if (!cancelled) setReturns(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [api, shopId, bill.id]);

  if (loading)
    return (
      <div className="space-y-1" data-ocid="bill_detail.returns.loading_state">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  if (returns.length === 0) return null;

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <h4 className="font-display font-semibold text-sm text-foreground">
        Returns ({returns.length})
      </h4>
      {returns.map((ret) => (
        <div
          key={String(ret.id)}
          className="bg-muted/30 border border-border rounded-lg p-3 space-y-1.5"
          data-ocid={`bill_detail.return.${String(ret.id)}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Return #{String(ret.id)} ·{" "}
              {formatDateTime(ret.createdAt, dateFormat)}
            </span>
            <ReturnStatusBadge status={ret.status} />
          </div>
          <div className="space-y-0.5">
            {ret.returnItems.map((ri, i) => (
              <div
                key={`${String(ri.productId)}-${i}`}
                className="flex justify-between text-xs text-foreground"
              >
                <span className="truncate">
                  {ri.name} × {ri.returnQty}
                </span>
                <span className="shrink-0 ml-2">
                  {formatCurrency(ri.lineTotal, currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Total Refund</span>
            <span className="text-primary">
              {formatCurrency(ret.totalRefundAmount, currency)}
            </span>
          </div>
          {ret.status === ReturnStatus.Approved && (
            <p className="text-xs text-emerald-600">✓ Store credit awarded</p>
          )}
          {ret.status === ReturnStatus.Rejected && ret.rejectionReason && (
            <p className="text-xs text-destructive">
              Rejected: {ret.rejectionReason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── subcomponents ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "default" | "green" | "blue";
}) {
  const colorClass =
    color === "green"
      ? "text-emerald-600"
      : color === "blue"
        ? "text-primary"
        : "text-foreground";
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col gap-0.5 min-w-0">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
        {label}
      </span>
      <span className={`font-display text-lg font-bold truncate ${colorClass}`}>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: BillStatus }) {
  if (status === BillStatus.Cancelled) {
    return (
      <Badge variant="destructive" className="text-xs">
        Cancelled
      </Badge>
    );
  }
  if (status === BillStatus.Draft) {
    return (
      <Badge variant="secondary" className="text-xs">
        Draft
      </Badge>
    );
  }
  return (
    <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
      Active
    </Badge>
  );
}

function BillDetailModal({
  bill,
  currency,
  dateFormat,
  shopConfig,
  shopId,
  onClose,
  onReprint,
  onCancel,
  isOwner,
}: {
  bill: Bill;
  currency: string;
  dateFormat: DateFormat;
  shopConfig: ShopConfig | null;
  shopId: string;
  onClose: () => void;
  onReprint: (bill: Bill, size: PrintSize) => void;
  onCancel: (id: BillId) => void;
  isOwner: boolean;
}) {
  const [printSize, setPrintSize] = useState<PrintSize>("80mm");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const taxTotal =
    bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst;
  const extraTotal = bill.extraCharges.reduce((s, c) => s + c.amount, 0);

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          data-ocid="bill_detail.dialog"
        >
          <DialogHeader>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <DialogTitle className="font-display text-xl">
                {billNumberLabel(bill.billNumber)}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <StatusBadge status={bill.status} />
                <span className="text-sm text-muted-foreground">
                  {formatDateTime(bill.createdAt, dateFormat)}
                </span>
              </div>
            </div>
          </DialogHeader>

          {/* Customer info */}
          <div className="grid grid-cols-2 gap-3 bg-muted/40 rounded-lg p-3 text-sm">
            <div>
              <span className="text-muted-foreground">Customer</span>
              <p className="font-medium text-foreground">
                {bill.customerName || "Walk-in"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone</span>
              <p className="font-medium text-foreground">
                {bill.customerPhone || "—"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Price Type</span>
              <p className="font-medium text-foreground">{bill.priceType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tax System</span>
              <p className="font-medium text-foreground">{bill.taxSystem}</p>
            </div>
          </div>

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-1 text-muted-foreground font-medium">
                    Product
                  </th>
                  <th className="text-right py-2 px-1 text-muted-foreground font-medium">
                    Qty
                  </th>
                  <th className="text-right py-2 px-1 text-muted-foreground font-medium">
                    Rate
                  </th>
                  <th className="text-right py-2 px-1 text-muted-foreground font-medium">
                    Disc
                  </th>
                  <th className="text-right py-2 px-1 text-muted-foreground font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr
                    key={`${item.productId}-${i}`}
                    className="border-b border-border/50"
                    data-ocid={`bill_detail.item.${i + 1}`}
                  >
                    <td className="py-2 px-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground text-xs ml-1">
                        {item.unit}
                      </span>
                    </td>
                    <td className="text-right py-2 px-1">{item.qty}</td>
                    <td className="text-right py-2 px-1">
                      {formatCurrency(item.rate, currency)}
                    </td>
                    <td className="text-right py-2 px-1 text-muted-foreground">
                      {item.discount > 0
                        ? `-${formatCurrency(item.discount, currency)}`
                        : "—"}
                    </td>
                    <td className="text-right py-2 px-1 font-medium">
                      {formatCurrency(item.lineTotal, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-sm border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(bill.subtotal, currency)}</span>
            </div>
            {bill.totalDiscount > 0 && (
              <div className="flex justify-between text-destructive">
                <span>Discount</span>
                <span>-{formatCurrency(bill.totalDiscount, currency)}</span>
              </div>
            )}
            {taxTotal > 0 && (
              <>
                {bill.taxBreakdown.cgst > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>CGST ({bill.taxRate / 2}%)</span>
                    <span>
                      {formatCurrency(bill.taxBreakdown.cgst, currency)}
                    </span>
                  </div>
                )}
                {bill.taxBreakdown.sgst > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>SGST ({bill.taxRate / 2}%)</span>
                    <span>
                      {formatCurrency(bill.taxBreakdown.sgst, currency)}
                    </span>
                  </div>
                )}
                {bill.taxBreakdown.igst > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>IGST ({bill.taxRate}%)</span>
                    <span>
                      {formatCurrency(bill.taxBreakdown.igst, currency)}
                    </span>
                  </div>
                )}
                {bill.taxBreakdown.cgst === 0 &&
                  bill.taxBreakdown.sgst === 0 &&
                  bill.taxBreakdown.igst === 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax ({bill.taxRate}%)</span>
                      <span>{formatCurrency(taxTotal, currency)}</span>
                    </div>
                  )}
              </>
            )}
            {bill.extraCharges.map((c) => (
              <div
                key={c.description}
                className="flex justify-between text-muted-foreground"
              >
                <span>{c.description}</span>
                <span>{formatCurrency(c.amount, currency)}</span>
              </div>
            ))}
            {extraTotal > 0 && (
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Extra charges</span>
                <span>{formatCurrency(extraTotal, currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-display font-bold text-base border-t border-border pt-2 mt-2">
              <span>Grand Total</span>
              <span className="text-primary">
                {formatCurrency(bill.grandTotal, currency)}
              </span>
            </div>
            {isOwner && (
              <div className="flex justify-between text-sm text-emerald-600 font-medium">
                <span>Profit (Owner)</span>
                <span>{formatCurrency(bill.profit, currency)}</span>
              </div>
            )}
          </div>

          {/* Returns for this bill */}
          <ReturnsSectionInDetail
            bill={bill}
            currency={currency}
            shopId={shopId}
            dateFormat={dateFormat}
          />

          {/* Share Card */}
          {bill.status !== BillStatus.Cancelled && (
            <div data-ocid="bill_detail.share_card">
              <BillShareCard bill={bill} shopConfig={shopConfig} />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 flex-1">
              <Select
                value={printSize}
                onValueChange={(v) => setPrintSize(v as PrintSize)}
              >
                <SelectTrigger
                  className="w-28 h-9"
                  data-ocid="bill_detail.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="58mm">58mm</SelectItem>
                  <SelectItem value="80mm">80mm</SelectItem>
                  <SelectItem value="a4">A4</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onReprint(bill, printSize)}
                data-ocid="bill_detail.reprint_button"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                Reprint
              </Button>
            </div>
            {/* Return Items button — only for saved (non-cancelled) bills */}
            {bill.status === BillStatus.Saved && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowReturnModal(true)}
                className="gap-1.5 border-amber-400 text-amber-700 hover:bg-amber-50"
                data-ocid="bill_detail.return_button"
              >
                <RotateCcw className="w-4 h-4" />
                Return Items
              </Button>
            )}
            {bill.status !== BillStatus.Cancelled && isOwner && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setShowCancelConfirm(true)}
                data-ocid="bill_detail.cancel_button"
              >
                <Ban className="w-4 h-4 mr-1.5" />
                Cancel Bill
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-ocid="bill_detail.close_button"
            >
              <X className="w-4 h-4 mr-1.5" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <AlertDialogContent data-ocid="cancel_bill.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Cancel Bill {billNumberLabel(bill.billNumber)}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the bill and restore stock for all items. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="cancel_bill.cancel_button">
              Keep Bill
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onCancel(bill.id);
                setShowCancelConfirm(false);
                onClose();
              }}
              data-ocid="cancel_bill.confirm_button"
            >
              Yes, Cancel Bill
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showReturnModal && (
        <ReturnRequestModal
          bill={bill}
          currency={currency}
          shopId={shopId}
          onClose={() => setShowReturnModal(false)}
          onSuccess={() => {}}
        />
      )}
    </>
  );
}

// ─── bill row ────────────────────────────────────────────────────────────────

function PaymentBadge({
  bill,
  currency,
}: {
  bill: Bill;
  currency: string;
}) {
  if (bill.paymentType === PaymentType.partial && bill.amountPending > 0) {
    return (
      <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
        Partial · {formatCurrency(bill.amountPending, currency)} pending
      </Badge>
    );
  }
  return (
    <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
      Paid
    </Badge>
  );
}

function RecordPaymentInline({
  bill,
  currency,
  shopId,
  onSuccess,
}: {
  bill: Bill;
  currency: string;
  shopId: string;
  onSuccess: () => void;
}) {
  const api = useApi();
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (markFull: boolean) => {
    setSaving(true);
    try {
      const additional = markFull
        ? bill.amountPending
        : Math.min(bill.amountPending, Math.max(0, Number(amount) || 0));
      await api.recordPayment(shopId, bill.id, additional);
      toast.success(markFull ? "Bill marked as paid" : "Payment recorded");
      onSuccess();
    } catch {
      toast.error("Failed to record payment");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg"
      data-ocid="history.record_payment.panel"
    >
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max={bill.amountPending}
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Max: ${formatCurrency(bill.amountPending, currency)}`}
          className="flex-1 h-8 px-2.5 text-sm border border-amber-300 rounded-md bg-white outline-none focus:ring-1 focus:ring-amber-400"
          data-ocid="history.record_payment_amount_input"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={saving || !amount}
          onClick={() => handleSave(false)}
          className="h-8 text-xs border-amber-400 text-amber-700 hover:bg-amber-100"
          data-ocid="history.record_payment_save_button"
        >
          Save
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={saving}
          onClick={() => handleSave(true)}
          className="h-8 text-xs bg-emerald-600 text-white hover:bg-emerald-700"
          data-ocid="history.mark_paid_button"
        >
          Mark Paid
        </Button>
      </div>
    </div>
  );
}

function BillRow({
  bill,
  currency,
  dateFormat,
  isOwner,
  shopId,
  onExpand,
  onRefresh,
}: {
  bill: Bill;
  currency: string;
  dateFormat: DateFormat;
  isOwner: boolean;
  shopId: string;
  onExpand: (bill: Bill) => void;
  onRefresh: () => void;
}) {
  const api = useApi();
  const itemCount = bill.items.length;
  const isPartial =
    bill.paymentType === PaymentType.partial && bill.amountPending > 0;
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  const lastReminderDays = bill.lastReminderSent
    ? Math.floor(
        (Date.now() - Number(bill.lastReminderSent)) / (1000 * 60 * 60 * 24),
      )
    : null;

  const handleSendReminder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bill.customerPhone) {
      toast.error("No phone number — add customer phone to send reminder");
      return;
    }
    const phone = bill.customerPhone.replace(/\D/g, "");
    const text = buildReminderWhatsAppText(bill, shopId, currency);
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    try {
      await api.recordReminderSent(shopId, bill.id);
      toast.success("Reminder sent");
      onRefresh();
    } catch {
      /* silent */
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-200"
      data-ocid={`history.bill.${String(bill.billNumber)}`}
    >
      <button
        type="button"
        className="w-full text-left px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => onExpand(bill)}
      >
        <div className="flex items-start justify-between gap-2 min-w-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-bold text-sm text-foreground">
                  {billNumberLabel(bill.billNumber)}
                </span>
                <StatusBadge status={bill.status} />
                {bill.status !== BillStatus.Cancelled && (
                  <PaymentBadge bill={bill} currency={currency} />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {bill.customerName || "Walk-in"} ·{" "}
                {itemCount === 1 ? "1 item" : `${itemCount} items`} ·{" "}
                {formatDateTime(bill.createdAt, dateFormat)}
              </p>
              {isPartial && lastReminderDays !== null && (
                <p className="text-xs text-amber-600 mt-0.5">
                  Last reminder:{" "}
                  {lastReminderDays === 0
                    ? "Today"
                    : `${lastReminderDays}d ago`}
                </p>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-base text-foreground">
              {formatCurrency(bill.grandTotal, currency)}
            </p>
            {isOwner && (
              <p className="text-xs text-emerald-600 font-medium">
                +{formatCurrency(bill.profit, currency)}
              </p>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground self-center shrink-0" />
        </div>
      </button>

      {/* Partial payment actions */}
      {isPartial && bill.status !== BillStatus.Cancelled && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation container only
        <div
          className="px-4 pb-3 flex flex-wrap gap-2"
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        >
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSendReminder}
            className="h-8 text-xs gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-50"
            disabled={!bill.customerPhone}
            data-ocid={`history.send_reminder.${String(bill.billNumber)}`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Send Reminder
          </Button>
          {isOwner && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setShowRecordPayment((v) => !v);
              }}
              className="h-8 text-xs gap-1.5 border-primary/40 text-primary hover:bg-primary/5"
              data-ocid={`history.record_payment_button.${String(bill.billNumber)}`}
            >
              Record Payment
            </Button>
          )}
          {showRecordPayment && isOwner && (
            <div className="w-full">
              <RecordPaymentInline
                bill={bill}
                currency={currency}
                shopId={shopId}
                onSuccess={() => {
                  setShowRecordPayment(false);
                  onRefresh();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── skeleton ────────────────────────────────────────────────────────────────

function BillSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
      <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

// ─── empty state ─────────────────────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="history.empty_state"
    >
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-foreground text-lg">
          {filtered ? "No bills found" : "No bills yet"}
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          {filtered
            ? "Try adjusting your search or date range"
            : "Create your first bill from the New Bill tab"}
        </p>
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export function HistoryPage() {
  const { listBills, cancelBill } = useApi();
  const shopConfig = useStore((s) => s.shopConfig);

  const userRole = useStore((s) => s.userRole);
  const currency = shopConfig?.currency ?? "USD";
  const dateFormat = shopConfig?.dateFormat ?? DateFormat.DDMMYYYY;
  const shopId = shopConfig?.shopName ?? "default";
  const isOwner = userRole !== "staff";

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchBills = useCallback(async () => {
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 5000);
    try {
      const filter: BillFilter = {};
      if (quickFilter === "today") {
        const r = todayRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (quickFilter === "week") {
        const r = weekRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (quickFilter === "month") {
        const r = monthRange();
        filter.fromDate = r.from;
        filter.toDate = r.to;
      } else if (fromDate && toDate) {
        filter.fromDate = BigInt(new Date(fromDate).setHours(0, 0, 0, 0));
        filter.toDate = BigInt(new Date(toDate).setHours(23, 59, 59, 999));
      }
      const data = await listBills(filter);
      if (!cancelled) {
        const sorted = [...data].sort(
          (a, b) => Number(b.createdAt) - Number(a.createdAt),
        );
        setBills(sorted);
      }
    } catch {
      if (!cancelled) toast.error("Failed to load bill history");
    } finally {
      clearTimeout(timeout);
      if (!cancelled) setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [listBills, quickFilter, fromDate, toDate]);

  useEffect(() => {
    void fetchBills();
  }, [fetchBills]);

  const filtered = useMemo(
    () => bills.filter((b) => matchesSearch(b, searchQuery)),
    [bills, searchQuery],
  );

  const paginated = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page],
  );

  const hasMore = filtered.length > page * PAGE_SIZE;

  const stats = useMemo(() => {
    const active = filtered.filter((b) => b.status !== BillStatus.Cancelled);
    return {
      totalBills: filtered.length,
      totalRevenue: active.reduce((s, b) => s + b.grandTotal, 0),
      totalProfit: active.reduce((s, b) => s + b.profit, 0),
    };
  }, [filtered]);

  const handleCancel = useCallback(
    async (id: BillId) => {
      try {
        const ok = await cancelBill(id);
        if (ok) {
          toast.success("Bill cancelled and stock restored");
          await fetchBills();
        } else {
          toast.error("Failed to cancel bill");
        }
      } catch {
        toast.error("Failed to cancel bill");
      }
    },
    [cancelBill, fetchBills],
  );

  const handleQuickFilter = (f: QuickFilter) => {
    setQuickFilter(f);
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  const handleCustomDateChange = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    if (from || to) setQuickFilter("all");
    setPage(1);
  };

  const quickFilters: { key: QuickFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24" data-ocid="history.page">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Bill History
            </h1>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={searchRef}
              placeholder="Search by bill #, customer name or phone…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-9 h-10"
              data-ocid="history.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
                data-ocid="history.search_clear_button"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {quickFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => handleQuickFilter(f.key)}
                data-ocid={`history.filter.${f.key}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 min-h-[36px] ${
                  quickFilter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => handleCustomDateChange(e.target.value, toDate)}
                className="text-xs border border-input bg-background rounded-md px-2 py-1.5 text-foreground min-h-[36px] focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="history.from_date_input"
              />
              <span className="text-muted-foreground text-xs">–</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  handleCustomDateChange(fromDate, e.target.value)
                }
                className="text-xs border border-input bg-background rounded-md px-2 py-1.5 text-foreground min-h-[36px] focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="history.to_date_input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-4">
        {/* Stats bar */}
        {!loading && (
          <div
            className={`grid ${isOwner ? "grid-cols-3" : "grid-cols-2"} gap-2`}
            data-ocid="history.stats.section"
          >
            <StatCard
              label="Bills"
              value={String(stats.totalBills)}
              color="default"
            />
            <StatCard
              label="Revenue"
              value={formatCurrency(stats.totalRevenue, currency)}
              color="blue"
            />
            {isOwner && (
              <StatCard
                label="Profit"
                value={formatCurrency(stats.totalProfit, currency)}
                color="green"
              />
            )}
          </div>
        )}

        {/* Bills list */}
        {loading ? (
          <div className="space-y-2" data-ocid="history.loading_state">
            {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
              <BillSkeleton key={k} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState filtered={bills.length > 0 || !!searchQuery} />
        ) : (
          <>
            <div className="space-y-2" data-ocid="history.bill.list">
              {paginated.map((bill, i) => (
                <BillRow
                  key={String(bill.id)}
                  bill={bill}
                  currency={currency}
                  dateFormat={dateFormat}
                  isOwner={isOwner}
                  shopId={shopId}
                  onExpand={setSelectedBill}
                  onRefresh={fetchBills}
                  data-ocid={`history.bill.item.${i + 1}`}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  className="min-h-[44px] px-6"
                  data-ocid="history.load_more_button"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Load more ({filtered.length - page * PAGE_SIZE} remaining)
                </Button>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground pb-2">
              Showing {Math.min(paginated.length, filtered.length)} of{" "}
              {filtered.length} bills
            </p>
          </>
        )}

        {/* Profit info banner (owner) */}
        {isOwner && !loading && stats.totalBills > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-emerald-800 font-medium">
              Profit margin:{" "}
              {stats.totalRevenue > 0
                ? `${((stats.totalProfit / stats.totalRevenue) * 100).toFixed(1)}%`
                : "N/A"}
            </span>
          </div>
        )}
      </div>

      {/* Bill detail modal */}
      {selectedBill && (
        <BillDetailModal
          bill={selectedBill}
          currency={currency}
          dateFormat={dateFormat}
          shopConfig={shopConfig}
          shopId={shopId}
          onClose={() => setSelectedBill(null)}
          onReprint={(bill, size) => {
            printBill(bill, shopConfig, size);
          }}
          onCancel={handleCancel}
          isOwner={isOwner}
        />
      )}
    </div>
  );
}
