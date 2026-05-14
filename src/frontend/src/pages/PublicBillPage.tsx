import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useSearch } from "@tanstack/react-router";
import { AlertTriangle, Printer, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "../lib/api";
import { formatCurrency } from "../lib/currency";
import type { Bill } from "../types";

type PageState = "loading" | "found" | "not_found" | "error";

export function PublicBillPage() {
  const { billId } = useParams({ from: "/bill/$billId" });
  const search = useSearch({ from: "/bill/$billId" });
  const token = (search as Record<string, string>).token ?? "";
  const api = useApi();

  const [state, setState] = useState<PageState>("loading");
  const [bill, setBill] = useState<Bill | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const id = BigInt(billId);
        let found: Bill | null = null;
        // Try getPublicBill if available (no-auth query)
        const a = api as typeof api & {
          getPublicBill?: (id: bigint, token: string) => Promise<Bill | null>;
        };
        if (typeof a.getPublicBill === "function") {
          found = await a.getPublicBill(id, token);
        } else {
          // Fallback: attempt getBill if actor is ready
          found = await api.getBill(id);
        }
        if (!cancelled) {
          if (found) {
            setBill(found);
            setState("found");
          } else {
            setState("not_found");
          }
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [billId, token, api]);

  const handlePrint = () => {
    window.print();
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (state === "not_found" || state === "error" || !bill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground mb-2">
            Bill Not Found
          </h1>
          <p className="text-muted-foreground text-sm">
            This bill link may have expired or the bill doesn't exist. Please
            ask the shop owner to share a new link.
          </p>
        </div>
      </div>
    );
  }

  // Bill type doesn't embed currency; derive locale from browser for number
  // formatting but keep a safe fallback. Shop owners typically use their
  // local currency which is already encoded in the formatted amounts stored
  // on the bill — use navigator locale to pick the right symbol heuristic.
  const currency = (() => {
    try {
      return (
        new Intl.NumberFormat(navigator.language, {
          style: "currency",
          currency: "USD",
        }).resolvedOptions().currency ?? "USD"
      );
    } catch {
      return "USD";
    }
  })();
  const fmt = (n: number) => formatCurrency(n, currency);
  const taxTotal =
    bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst;

  return (
    <div className="min-h-screen bg-background" data-ocid="public_bill.page">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      <div className="max-w-lg mx-auto p-4 sm:p-6">
        {/* Print button */}
        <div className="flex justify-end mb-4 no-print">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2"
            data-ocid="public_bill.print_button"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>

        {/* Bill card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Shop header */}
          <div className="bg-primary px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-primary-foreground leading-tight">
                  Bill #{String(bill.billNumber).padStart(4, "0")}
                </h1>
                <p className="text-primary-foreground/70 text-xs">
                  {new Date(Number(bill.createdAt)).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Customer info */}
          {(bill.customerName || bill.customerPhone) && (
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              {bill.customerName && (
                <p className="font-semibold text-foreground">
                  {bill.customerName}
                </p>
              )}
              {bill.customerPhone && (
                <p className="text-sm text-muted-foreground">
                  {bill.customerPhone}
                </p>
              )}
            </div>
          )}

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="w-full" data-ocid="public_bill.items_table">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Item
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Qty
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Rate
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, i) => (
                  <tr
                    key={`${item.productId}-${i}`}
                    className="border-b border-border/50"
                    data-ocid={`public_bill.item.${i + 1}`}
                  >
                    <td className="px-6 py-3">
                      <p className="font-medium text-sm text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.unit}
                      </p>
                    </td>
                    <td className="text-right px-4 py-3 text-sm">{item.qty}</td>
                    <td className="text-right px-4 py-3 text-sm">
                      {fmt(item.rate)}
                    </td>
                    <td className="text-right px-6 py-3 text-sm font-semibold">
                      {fmt(item.lineTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-6 py-4 space-y-2 bg-muted/20">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{fmt(bill.subtotal)}</span>
            </div>
            {bill.totalDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount</span>
                <span>-{fmt(bill.totalDiscount)}</span>
              </div>
            )}
            {bill.taxBreakdown.cgst > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    CGST ({bill.taxRate / 2}%)
                  </span>
                  <span>{fmt(bill.taxBreakdown.cgst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    SGST ({bill.taxRate / 2}%)
                  </span>
                  <span>{fmt(bill.taxBreakdown.sgst)}</span>
                </div>
              </>
            )}
            {bill.taxBreakdown.igst > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  IGST ({bill.taxRate}%)
                </span>
                <span>{fmt(bill.taxBreakdown.igst)}</span>
              </div>
            )}
            {taxTotal === 0 && bill.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tax ({bill.taxRate}%)
                </span>
                <span>
                  {fmt(
                    (bill.subtotal - bill.totalDiscount) * (bill.taxRate / 100),
                  )}
                </span>
              </div>
            )}
            {bill.extraCharges.map((c) => (
              <div key={c.description} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{c.description}</span>
                <span>{fmt(c.amount)}</span>
              </div>
            ))}
          </div>

          {/* Grand total */}
          <div className="px-6 py-4 bg-primary/5 border-t-2 border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-base text-foreground">
                Grand Total
              </span>
              <span
                className="font-display font-bold text-2xl text-primary"
                data-ocid="public_bill.grand_total"
              >
                {fmt(bill.grandTotal)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">
              Thank you for your purchase! 🙏
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Please visit again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
