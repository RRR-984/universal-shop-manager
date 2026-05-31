import { Button } from "@/components/ui/button";
import {
  Check,
  FileDown,
  Link,
  Mail,
  MessageCircle,
  Printer,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "../lib/currency";
import { DateFormat, NumberFormat, ShopType } from "../types";
import type { Bill, EngineFields, ShopConfig } from "../types";
import { BillPrintDialog } from "./BillPrintDialog";
import { EmailShareModal } from "./EmailShareModal";

type Props = {
  bill: Bill;
  shopConfig: ShopConfig | null;
  isReminder?: boolean;
};

type ShareBtn = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  success?: boolean;
  color?: string;
};

export function buildReminderWhatsAppText(
  bill: Bill,
  shopName: string,
  currency: string,
): string {
  const fmt = (n: number) => formatCurrency(n, currency);
  return [
    `Assalamualaikum ${bill.customerName || "Customer"}! 🙏`,
    `Yaad dihani: Bill #${String(bill.billNumber)} - ${shopName}`,
    `Total: ${fmt(bill.grandTotal)}`,
    `Jama Karaya: ${fmt(bill.amountPaid)}`,
    `*Baaki: ${fmt(bill.amountPending)}*`,
    "",
    "Kripya baaki raqam jald ada karein.",
    "Shukriya! \ud83d\ude4f",
  ].join("\n");
}

function buildWhatsAppBillText(
  bill: Bill,
  shopConfig: ShopConfig | null,
): string {
  const currency = shopConfig?.currency ?? "USD";
  const fmt = (n: number) => formatCurrency(n, currency);
  const shopName = shopConfig?.shopName ?? "Shop";
  const lines = [
    `*${shopName}*`,
    `Bill #${String(bill.billNumber)}`,
    bill.customerName ? `Customer: ${bill.customerName}` : "",
    "",
    "*Items:*",
    ...bill.items.map((i) => `• ${i.name} × ${i.qty} = ${fmt(i.lineTotal)}`),
    "",
    `*Total: ${fmt(bill.grandTotal)}*`,
    "",
    "Thank you for your purchase! 🙏",
  ];
  return lines
    .filter((l, i) => l !== "" || (i > 0 && lines[i - 1] !== ""))
    .join("\n");
}

function buildPrintHtml(bill: Bill, shopConfig: ShopConfig | null): string {
  const currency = shopConfig?.currency ?? "USD";
  const fmt = (n: number) => formatCurrency(n, currency);
  const shopName = shopConfig?.shopName ?? "Shop";
  const shopAddress = shopConfig?.shopAddress ?? "";
  const shopPhone = shopConfig?.shopPhone ?? "";

  const itemsHtml = bill.items
    .map(
      (item) => `<tr>
        <td style="padding:3px 4px">${item.name}</td>
        <td style="padding:3px 4px;text-align:right">${item.qty} ${item.unit}</td>
        <td style="padding:3px 4px;text-align:right">${fmt(item.rate)}</td>
        <td style="padding:3px 4px;text-align:right">${fmt(item.lineTotal)}</td>
      </tr>`,
    )
    .join("");

  const taxHtml =
    bill.taxBreakdown.cgst > 0
      ? `<tr><td>CGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.cgst)}</td></tr>
         <tr><td>SGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.sgst)}</td></tr>`
      : bill.taxBreakdown.igst > 0
        ? `<tr><td>IGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.igst)}</td></tr>`
        : "";

  const extraHtml = bill.extraCharges
    .filter((c) => c.amount > 0)
    .map(
      (c) =>
        `<tr><td>${c.description}</td><td style="text-align:right">${fmt(c.amount)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><head><title>Bill #${bill.billNumber} – ${shopName}</title>
  <style>
    body{font-family:monospace;font-size:12px;max-width:400px;margin:0 auto;padding:20px;color:#000;background:#fff}
    h2{text-align:center;font-size:16px;margin:4px 0}
    p{margin:2px 0;text-align:center;font-size:11px}
    table{width:100%;border-collapse:collapse;margin:8px 0}
    td,th{padding:3px 4px;font-size:11px}
    hr{border:none;border-top:1px dashed #000;margin:8px 0}
    .total{font-weight:bold;font-size:13px}
    @media print{body{-webkit-print-color-adjust:exact}}
  </style></head><body>
  <h2>${shopName}</h2>
  ${shopAddress ? `<p>${shopAddress}</p>` : ""}
  ${shopPhone ? `<p>${shopPhone}</p>` : ""}${shopConfig?.gstinNumber?.trim() && shopConfig.taxSystem === "GST" ? `<p style="font-size:11px">GSTIN: ${shopConfig.gstinNumber}</p>` : ""}${shopConfig?.vatNumber?.trim() && shopConfig.taxSystem === "VAT" ? `<p style="font-size:11px">VAT No: ${shopConfig.vatNumber}</p>` : ""}
  <hr/>
  <p>Bill: #${String(bill.billNumber).padStart(4, "0")}</p>
  ${bill.customerName ? `<p>Customer: ${bill.customerName}</p>` : ""}
  ${bill.customerPhone ? `<p>Phone: ${bill.customerPhone}</p>` : ""}
  <hr/>
  <table><thead><tr>
    <th style="text-align:left">Item</th><th style="text-align:right">Qty</th>
    <th style="text-align:right">Rate</th><th style="text-align:right">Total</th>
  </tr></thead><tbody>${itemsHtml}</tbody></table>
  <hr/>
  <table>
    <tr><td>Subtotal</td><td style="text-align:right">${fmt(bill.subtotal)}</td></tr>
    ${taxHtml}${extraHtml}
    ${bill.totalDiscount > 0 ? `<tr><td>Discount</td><td style="text-align:right">-${fmt(bill.totalDiscount)}</td></tr>` : ""}
    <tr class="total"><td>TOTAL</td><td style="text-align:right">${fmt(bill.grandTotal)}</td></tr>
  </table>
  <hr/>
  <p>Thank you for your purchase! 🙏</p>
  </body></html>`;
}

export function BillShareCard({ bill, shopConfig, isReminder = false }: Props) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const currency = shopConfig?.currency ?? "USD";
  const useIndianFormat = shopConfig?.numberFormat === NumberFormat.Indian;
  const fmt = (n: number) => formatCurrency(n, currency, useIndianFormat);

  const handleWhatsApp = () => {
    // Use customer phone if available, fall back to shop phone for sharing
    const phoneRaw = bill.customerPhone || shopConfig?.shopPhone || "";
    const phone = phoneRaw.replace(/\D/g, "");
    const text = isReminder
      ? buildReminderWhatsAppText(
          bill,
          shopConfig?.shopName ?? "Shop",
          currency,
        )
      : buildWhatsAppBillText(bill, shopConfig);
    if (phone) {
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank",
      );
    } else {
      // No phone at all — open WhatsApp with just the text
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const handlePdfDownload = () => {
    const html = buildPrintHtml(bill, shopConfig);
    const win = window.open("", "_blank");
    if (!win) {
      toast.error("Popup blocked — allow popups to download PDF");
      return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 400);
  };

  const handleLinkShare = async () => {
    setIsGeneratingLink(true);
    try {
      // Build a simple shareable link using bill id + fallback token
      const billId = String(bill.id);
      const shareUrl = `${window.location.origin}/bill/${billId}`;
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const buttons: ShareBtn[] = [
    {
      id: "whatsapp",
      icon: <MessageCircle className="w-6 h-6" />,
      label: isReminder ? "Send Reminder" : "WhatsApp",
      onClick: handleWhatsApp,
      disabled: false,
      color: "text-emerald-600",
    },
    {
      id: "pdf",
      icon: <FileDown className="w-6 h-6" />,
      label: "Save as PDF",
      onClick: handlePdfDownload,
    },
    {
      id: "email",
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      onClick: () => setShowEmail(true),
    },
    {
      id: "print",
      icon: <Printer className="w-6 h-6" />,
      label: "Print",
      onClick: () => setShowPrint(true),
    },
    {
      id: "link",
      icon: linkCopied ? (
        <Check className="w-6 h-6 text-emerald-500" />
      ) : (
        <Link className="w-6 h-6" />
      ),
      label: linkCopied
        ? "Copied!"
        : isGeneratingLink
          ? "Getting link..."
          : "Link Share",
      onClick: handleLinkShare,
      disabled: isGeneratingLink,
      success: linkCopied,
    },
  ];

  // Fake DraftItem/DraftExtraCharge adapters for BillPrintDialog
  const draftItems = bill.items.map((i) => ({
    product: {
      id: i.productId,
      shopId: "",
      name: i.name,
      unit: i.unit,
      category: "",
      retailPrice: i.rate,
      wholesalePrice: i.rate,
      costPrice: 0,
      stock: 0,
      minStock: 0,
      isActive: true,
      shopType: ShopType.General,
      createdAt: BigInt(0),
      updatedAt: BigInt(0),
      engineFields: {
        __kind__: "General" as const,
        General: {},
      } as EngineFields,
    },
    qty: i.qty,
    rate: i.rate,
    discount: 0,
    discountMode: "fixed" as const,
  }));

  const draftExtraCharges = bill.extraCharges.map((c, idx) => ({
    id: `ec-${idx}`,
    description: c.description,
    amount: c.amount,
  }));

  const taxCalc = {
    taxType: bill.taxSystem,
    subtotal: bill.subtotal,
    taxAmount:
      bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst,
    total: bill.grandTotal,
    breakdown: {
      cgst: bill.taxBreakdown.cgst,
      sgst: bill.taxBreakdown.sgst,
      igst: bill.taxBreakdown.igst,
    },
  };

  return (
    <>
      <div
        className="bg-card border border-border rounded-xl p-4"
        data-ocid="bill_share.card"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Bill Sharing Options
        </p>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={btn.disabled ? undefined : btn.onClick}
              disabled={btn.disabled}
              data-ocid={`bill_share.${btn.id}_button`}
              aria-label={btn.label}
              className={[
                "flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border transition-all duration-150 min-h-[60px] sm:min-h-[72px]",
                btn.disabled
                  ? "opacity-40 cursor-not-allowed border-border bg-muted/30"
                  : btn.success
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "border-primary bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
              ].join(" ")}
            >
              {btn.icon}
              <span className="text-[10px] sm:text-xs font-medium leading-tight text-center">
                {btn.label}
              </span>
            </button>
          ))}
        </div>
        {!bill.customerPhone && !shopConfig?.shopPhone && (
          <p className="text-xs text-muted-foreground mt-2">
            💡 Add customer or shop phone in Settings for direct WhatsApp
            sharing
          </p>
        )}
      </div>

      {showPrint && (
        <BillPrintDialog
          shopConfig={shopConfig}
          customerName={bill.customerName || "Anonymous"}
          customerPhone={bill.customerPhone}
          priceType={bill.priceType}
          items={draftItems}
          extraCharges={draftExtraCharges}
          taxSystem={bill.taxSystem}
          taxRate={bill.taxRate}
          taxCalc={taxCalc}
          subtotal={bill.subtotal}
          totalDiscount={bill.totalDiscount}
          taxAmount={taxCalc.taxAmount}
          grandTotal={bill.grandTotal}
          billNumber={bill.billNumber}
          fmt={fmt}
          lineTotal={(item) => item.qty * item.rate}
          dateFormat={shopConfig?.dateFormat ?? DateFormat.DDMMYYYY}
          onClose={() => setShowPrint(false)}
        />
      )}

      {showEmail && (
        <EmailShareModal
          bill={bill}
          shopConfig={shopConfig}
          onClose={() => setShowEmail(false)}
        />
      )}
    </>
  );
}
