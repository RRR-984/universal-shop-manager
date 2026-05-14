import { a5 as useParams, u as useSearch, c as useApi, r as reactExports, j as jsxRuntimeExports, f as Button } from "./index-CzjOXAKV.js";
import { S as Skeleton } from "./skeleton-Ck67DCC2.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { T as TriangleAlert } from "./triangle-alert-DdsXN04H.js";
import { P as Printer } from "./printer-X2hl96qU.js";
import { S as Store } from "./store-BURSvrZW.js";
function PublicBillPage() {
  const { billId } = useParams({ from: "/bill/$billId" });
  const search = useSearch({ from: "/bill/$billId" });
  const token = search.token ?? "";
  const api = useApi();
  const [state, setState] = reactExports.useState("loading");
  const [bill, setBill] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const id = BigInt(billId);
        let found = null;
        const a = api;
        if (typeof a.getPublicBill === "function") {
          found = await a.getPublicBill(id, token);
        } else {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
    ] }) });
  }
  if (state === "not_found" || state === "error" || !bill) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Bill Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This bill link may have expired or the bill doesn't exist. Please ask the shop owner to share a new link." })
    ] }) });
  }
  const currency = (() => {
    try {
      return new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "USD"
      }).resolvedOptions().currency ?? "USD";
    } catch {
      return "USD";
    }
  })();
  const fmt = (n) => formatCurrency(n, currency);
  const taxTotal = bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "public_bill.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-4 no-print", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handlePrint,
          className: "gap-2",
          "data-ocid": "public_bill.print_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
            "Print"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-lg text-primary-foreground leading-tight", children: [
              "Bill #",
              String(bill.billNumber).padStart(4, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs", children: new Date(Number(bill.createdAt)).toLocaleDateString() })
          ] })
        ] }) }),
        (bill.customerName || bill.customerPhone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border bg-muted/30", children: [
          bill.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: bill.customerName }),
          bill.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: bill.customerPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "public_bill.items_table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Qty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Total" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bill.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50",
              "data-ocid": `public_bill.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.unit })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right px-4 py-3 text-sm", children: item.qty }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right px-4 py-3 text-sm", children: fmt(item.rate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right px-6 py-3 text-sm font-semibold", children: fmt(item.lineTotal) })
              ]
            },
            `${item.productId}-${i}`
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 space-y-2 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(bill.subtotal) })
          ] }),
          bill.totalDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "-",
              fmt(bill.totalDiscount)
            ] })
          ] }),
          bill.taxBreakdown.cgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "CGST (",
                bill.taxRate / 2,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(bill.taxBreakdown.cgst) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "SGST (",
                bill.taxRate / 2,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(bill.taxBreakdown.sgst) })
            ] })
          ] }),
          bill.taxBreakdown.igst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "IGST (",
              bill.taxRate,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(bill.taxBreakdown.igst) })
          ] }),
          taxTotal === 0 && bill.taxRate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Tax (",
              bill.taxRate,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(
              (bill.subtotal - bill.totalDiscount) * (bill.taxRate / 100)
            ) })
          ] }),
          bill.extraCharges.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: c.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(c.amount) })
          ] }, c.description))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 bg-primary/5 border-t-2 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: "Grand Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display font-bold text-2xl text-primary",
              "data-ocid": "public_bill.grand_total",
              children: fmt(bill.grandTotal)
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 text-center border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Thank you for your purchase! 🙏" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Please visit again" })
        ] })
      ] })
    ] })
  ] });
}
export {
  PublicBillPage
};
