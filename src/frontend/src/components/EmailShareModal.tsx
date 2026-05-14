import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Mail, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "../lib/currency";
import { NumberFormat } from "../types";
import type { Bill, ShopConfig } from "../types";

type Props = {
  bill: Bill;
  shopConfig: ShopConfig | null;
  onClose: () => void;
};

type Status = "idle" | "sending" | "success" | "error";

function _buildEmailHtml(bill: Bill, shopConfig: ShopConfig | null): string {
  const currency = shopConfig?.currency ?? "USD";
  const fmt = (n: number) => formatCurrency(n, currency);
  const shopName = shopConfig?.shopName ?? "Shop";
  const shopAddress = shopConfig?.shopAddress ?? "";
  const shopPhone = shopConfig?.shopPhone ?? "";
  const shopEmail = shopConfig?.shopEmail ?? "";

  const itemsHtml = bill.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${item.qty} ${item.unit}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${fmt(item.rate)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600">${fmt(item.lineTotal)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
  <html><head><meta charset="UTF-8"></head>
  <body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
    <div style="background:#1e40af;padding:24px 32px;border-radius:8px 8px 0 0">
      <h1 style="color:#fff;margin:0;font-size:22px">${shopName}</h1>
      ${shopAddress ? `<p style="color:#bfdbfe;margin:4px 0 0">${shopAddress}</p>` : ""}
      ${shopPhone ? `<p style="color:#bfdbfe;margin:2px 0 0">${shopPhone}</p>` : ""}${shopConfig?.gstinNumber?.trim() && shopConfig.taxSystem === "GST" ? `<p style="margin:2px 0;font-size:12px;color:#bfdbfe">GSTIN: ${shopConfig.gstinNumber}</p>` : ""}${shopConfig?.vatNumber?.trim() && shopConfig.taxSystem === "VAT" ? `<p style="margin:2px 0;font-size:12px;color:#bfdbfe">VAT No: ${shopConfig.vatNumber}</p>` : ""}
    </div>
    <div style="background:#f8fafc;padding:20px 32px;border:1px solid #e2e8f0;border-top:none">
      <h2 style="margin:0 0 4px;font-size:18px">Bill #${String(bill.billNumber).padStart(4, "0")}</h2>
      ${bill.customerName ? `<p style="margin:4px 0;color:#64748b">Customer: <strong>${bill.customerName}</strong></p>` : ""}
      ${bill.customerPhone ? `<p style="margin:4px 0;color:#64748b">Phone: ${bill.customerPhone}</p>` : ""}
    </div>
    <div style="padding:0 0;border:1px solid #e2e8f0;border-top:none">
      <table style="width:100%;border-collapse:collapse">
        <thead style="background:#f1f5f9">
          <tr>
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#475569">ITEM</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#475569">QTY</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#475569">RATE</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#475569">TOTAL</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
    </div>
    <div style="padding:16px 32px;border:1px solid #e2e8f0;border-top:none">
      <table style="width:100%;max-width:280px;margin-left:auto">
        <tr><td style="color:#64748b;padding:3px 0">Subtotal</td><td style="text-align:right;padding:3px 0">${fmt(bill.subtotal)}</td></tr>
        ${bill.totalDiscount > 0 ? `<tr><td style="color:#dc2626;padding:3px 0">Discount</td><td style="text-align:right;color:#dc2626;padding:3px 0">-${fmt(bill.totalDiscount)}</td></tr>` : ""}
        ${bill.taxBreakdown.cgst > 0 ? `<tr><td style="color:#64748b;padding:3px 0">CGST</td><td style="text-align:right;padding:3px 0">${fmt(bill.taxBreakdown.cgst)}</td></tr><tr><td style="color:#64748b;padding:3px 0">SGST</td><td style="text-align:right;padding:3px 0">${fmt(bill.taxBreakdown.sgst)}</td></tr>` : ""}
        ${bill.taxBreakdown.igst > 0 ? `<tr><td style="color:#64748b;padding:3px 0">IGST</td><td style="text-align:right;padding:3px 0">${fmt(bill.taxBreakdown.igst)}</td></tr>` : ""}
        <tr style="border-top:2px solid #1e40af">
          <td style="font-weight:700;padding:8px 0;font-size:16px">TOTAL</td>
          <td style="text-align:right;font-weight:700;font-size:16px;color:#1e40af;padding:8px 0">${fmt(bill.grandTotal)}</td>
        </tr>
      </table>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;text-align:center">
      <p style="color:#64748b;font-size:13px;margin:0">Thank you for your purchase! 🙏</p>
      ${shopEmail ? `<p style="color:#94a3b8;font-size:11px;margin:4px 0 0">${shopEmail}</p>` : ""}
    </div>
  </body></html>`;
}

export function EmailShareModal({ bill, shopConfig, onClose }: Props) {
  const shopName = shopConfig?.shopName ?? "Shop";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const subject = `Bill #${String(bill.billNumber).padStart(4, "0")} from ${shopName}`;
  const useIndianFormat = shopConfig?.numberFormat === NumberFormat.Indian;
  const currency = shopConfig?.currency ?? "USD";
  const fmt = (n: number) => formatCurrency(n, currency, useIndianFormat);

  const validate = (): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleSend = async () => {
    if (!validate()) {
      toast.error("Please enter a valid email address");
      return;
    }
    setStatus("sending");
    try {
      // Build mailto link as fallback (email extension not directly callable from FE)
      const body = [
        `Bill #${String(bill.billNumber).padStart(4, "0")}`,
        `Shop: ${shopName}`,
        bill.customerName ? `Customer: ${bill.customerName}` : "",
        "",
        ...bill.items.map((i) => `${i.name} × ${i.qty} = ${fmt(i.lineTotal)}`),
        "",
        `Subtotal: ${fmt(bill.subtotal)}`,
        bill.totalDiscount > 0 ? `Discount: -${fmt(bill.totalDiscount)}` : "",
        `TOTAL: ${fmt(bill.grandTotal)}`,
        "",
        "Thank you for your purchase!",
      ]
        .filter((l, i, arr) => l !== "" || (i > 0 && arr[i - 1] !== ""))
        .join("\n");

      // Open mailto link — works on all devices without requiring backend email service
      const mailtoUrl = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
      toast.success(
        "Email client opened! Review and send from your email app.",
      );
      setTimeout(() => onClose(), 1800);
    } catch {
      setStatus("error");
      toast.error("Failed to open email client");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="email_share.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Mail className="w-5 h-5 text-primary" />
            Share Bill via Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Subject preview */}
          <div className="bg-muted/40 rounded-lg px-3 py-2">
            <p className="text-xs text-muted-foreground mb-0.5">Subject</p>
            <p className="text-sm font-medium text-foreground">{subject}</p>
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <Label htmlFor="email-share-input">Customer Email Address</Label>
            <Input
              id="email-share-input"
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoFocus
              className="h-10"
              data-ocid="email_share.input"
            />
          </div>

          {/* Bill preview snippet */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            {bill.items.slice(0, 3).map((item) => (
              <div
                key={item.name + item.rate}
                className="flex justify-between text-xs"
              >
                <span className="text-muted-foreground truncate flex-1 min-w-0 mr-2">
                  {item.name} × {item.qty}
                </span>
                <span className="font-medium shrink-0">
                  {fmt(item.lineTotal)}
                </span>
              </div>
            ))}
            {bill.items.length > 3 && (
              <p className="text-xs text-muted-foreground">
                + {bill.items.length - 3} more items
              </p>
            )}
            <div className="flex justify-between text-sm font-bold border-t border-border pt-2 mt-1">
              <span>Total</span>
              <span className="text-primary">{fmt(bill.grandTotal)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="email_share.cancel_button"
            >
              <X className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 gap-2 bg-primary text-primary-foreground"
              onClick={handleSend}
              disabled={status === "sending" || status === "success"}
              data-ocid="email_share.send_button"
            >
              {status === "sending" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              {status === "sending"
                ? "Opening..."
                : status === "success"
                  ? "Opened!"
                  : "Send Email"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
