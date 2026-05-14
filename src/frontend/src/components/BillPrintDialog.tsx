import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { useRef, useState } from "react";
import { formatDateTime } from "../lib/date";
import { TaxSystem } from "../types";
import type {
  DateFormat,
  PriceType,
  ProductView,
  ShopConfig,
  TaxCalculationResult,
} from "../types";

type DraftItem = {
  product: ProductView;
  qty: number;
  rate: number;
  discount: number;
  discountMode: "percent" | "fixed";
};

type DraftExtraCharge = {
  id: string;
  description: string;
  amount: number;
};

type PrintFormat = "thermal58" | "thermal80" | "a4";

type Props = {
  shopConfig: ShopConfig | null;
  customerName: string;
  customerPhone: string;
  priceType: PriceType;
  items: DraftItem[];
  extraCharges: DraftExtraCharge[];
  taxSystem: TaxSystem;
  taxRate: number;
  taxCalc: TaxCalculationResult;
  subtotal: number;
  totalDiscount: number;
  taxAmount: number;
  grandTotal: number;
  billNumber: bigint | null;
  fmt: (n: number) => string;
  lineTotal: (item: DraftItem) => number;
  dateFormat: DateFormat;
  onClose: () => void;
};

export function BillPrintDialog({
  shopConfig,
  customerName,
  customerPhone,
  priceType,
  items,
  extraCharges,
  taxSystem,
  taxRate,
  taxCalc,
  subtotal,
  totalDiscount,
  taxAmount,
  grandTotal,
  billNumber,
  fmt,
  lineTotal,
  dateFormat,
  onClose,
}: Props) {
  const [printFormat, setPrintFormat] = useState<PrintFormat>("a4");
  const printRef = useRef<HTMLDivElement>(null);

  const taxLabel = taxCalc.taxType;
  const shopName = shopConfig?.shopName ?? "Shop";
  const shopAddress = shopConfig?.shopAddress ?? "";
  const shopPhone = shopConfig?.shopPhone ?? "";
  const now = new Date();

  const widthMap: Record<PrintFormat, string> = {
    thermal58: "max-w-[220px]",
    thermal80: "max-w-[300px]",
    a4: "max-w-[595px]",
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Bill #${billNumber ? String(billNumber) : "Draft"}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: monospace; font-size: 12px; color: #000; background: #fff; }
            .print-wrap { padding: 16px; }
            table { width: 100%; border-collapse: collapse; }
            td, th { padding: 3px 4px; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .border-top { border-top: 1px dashed #000; margin: 6px 0; }
            .border-bottom { border-bottom: 1px dashed #000; margin: 6px 0; }
            .text-xl { font-size: 16px; }
            .text-lg { font-size: 14px; }
            @media print { body { -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body><div class="print-wrap">${printContent}</div></body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      data-ocid="billing.print_dialog"
    >
      <div className="bg-card border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Dialog header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-display font-bold text-lg text-foreground">
            Print Bill
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-ocid="billing.print_close_button"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Format selector */}
        <div className="px-5 py-3 border-b flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-1">
            Format:
          </span>
          {(["thermal58", "thermal80", "a4"] as PrintFormat[]).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setPrintFormat(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                printFormat === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
              data-ocid={`billing.print_format.${f}`}
            >
              {f === "thermal58"
                ? "Thermal 58mm"
                : f === "thermal80"
                  ? "Thermal 80mm"
                  : "A4 Paper"}
            </button>
          ))}
        </div>

        {/* Bill preview */}
        <div className="flex-1 overflow-y-auto p-5 bg-muted/30">
          <div
            className={`mx-auto bg-background shadow-md rounded p-4 ${widthMap[printFormat]}`}
          >
            <div ref={printRef}>
              {/* Shop header */}
              <div className="text-center mb-3">
                <p className="font-bold text-base">{shopName}</p>
                {shopAddress && (
                  <p className="text-xs text-foreground/70 mt-0.5">
                    {shopAddress}
                  </p>
                )}
                {shopPhone && (
                  <p className="text-xs text-foreground/70">{shopPhone}</p>
                )}
                {shopConfig?.gstinNumber &&
                  shopConfig.gstinNumber.trim() !== "" &&
                  shopConfig.taxSystem === "GST" && (
                    <p className="text-xs text-center text-foreground/70">{`GSTIN: ${shopConfig.gstinNumber}`}</p>
                  )}
                {shopConfig?.vatNumber &&
                  shopConfig.vatNumber.trim() !== "" &&
                  shopConfig.taxSystem === "VAT" && (
                    <p className="text-xs text-center text-foreground/70">{`VAT No: ${shopConfig.vatNumber}`}</p>
                  )}
              </div>
              <div className="border-t border-dashed border-border my-2" />

              {/* Bill meta */}
              <div className="text-xs mb-2 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Bill #</span>
                  <span className="font-bold">
                    {billNumber ? String(billNumber) : "Draft"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Date</span>
                  <span>{formatDateTime(now, dateFormat)}</span>
                </div>
                {customerName && customerName !== "Anonymous" && (
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Customer</span>
                    <span>{customerName}</span>
                  </div>
                )}
                {customerPhone && (
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Phone</span>
                    <span>{customerPhone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-foreground/60">Type</span>
                  <span>{priceType}</span>
                </div>
              </div>
              <div className="border-t border-dashed border-border my-2" />

              {/* Items table */}
              <table className="w-full text-xs mb-2">
                <thead>
                  <tr className="text-foreground/60">
                    <th className="text-left py-1">Item</th>
                    <th className="text-right py-1">Qty</th>
                    <th className="text-right py-1">Rate</th>
                    <th className="text-right py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={String(item.product.id)}
                      className="border-t border-border/30"
                    >
                      <td className="py-1 text-left">{item.product.name}</td>
                      <td className="py-1 text-right">
                        {item.qty} {item.product.unit}
                      </td>
                      <td className="py-1 text-right">{fmt(item.rate)}</td>
                      <td className="py-1 text-right font-medium">
                        {fmt(lineTotal(item))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-dashed border-border my-2" />

              {/* Totals */}
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Discount</span>
                    <span>−{fmt(totalDiscount)}</span>
                  </div>
                )}
                {taxRate > 0 && (
                  <>
                    {taxSystem === TaxSystem.GST &&
                      taxCalc.breakdown.cgst !== undefined &&
                      taxCalc.breakdown.cgst > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">
                              CGST ({taxRate / 2}%)
                            </span>
                            <span>{fmt(taxCalc.breakdown.cgst)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">
                              SGST ({taxRate / 2}%)
                            </span>
                            <span>{fmt(taxCalc.breakdown.sgst ?? 0)}</span>
                          </div>
                        </>
                      )}
                    {taxSystem !== TaxSystem.GST && (
                      <div className="flex justify-between">
                        <span className="text-foreground/60">
                          {taxLabel} ({taxRate}%)
                        </span>
                        <span>{fmt(taxAmount)}</span>
                      </div>
                    )}
                  </>
                )}
                {extraCharges
                  .filter((c) => c.amount > 0)
                  .map((c) => (
                    <div key={c.id} className="flex justify-between">
                      <span className="text-foreground/60">
                        {c.description || "Extra"}
                      </span>
                      <span>{fmt(c.amount)}</span>
                    </div>
                  ))}
              </div>
              <div className="border-t-2 border-foreground/80 my-2" />
              <div className="flex justify-between font-bold text-sm">
                <span>Grand Total</span>
                <span>{fmt(grandTotal)}</span>
              </div>
              <div className="border-t border-dashed border-border my-3" />
              <p className="text-center text-xs text-foreground/60">
                Thank you for your purchase!
              </p>
              <p className="text-center text-xs text-foreground/50 mt-0.5">
                Please visit again 🙏
              </p>
            </div>
          </div>
        </div>

        {/* Print action */}
        <div className="px-5 py-4 border-t flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="billing.print_cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handlePrint}
            className="gap-2 bg-primary text-primary-foreground"
            data-ocid="billing.print_confirm_button"
          >
            <Printer className="w-4 h-4" />
            Print Now
          </Button>
        </div>
      </div>
    </div>
  );
}
