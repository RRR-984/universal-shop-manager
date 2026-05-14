import { m as createLucideIcon, a1 as useActor, d as useStore, D as DateFormat, r as reactExports, j as jsxRuntimeExports, B as Badge, f as Button, x as Plus, X, w as Receipt, c as useApi, a6 as CreditTransactionType, Y as ReturnStatus, a4 as createActor } from "./index-CzjOXAKV.js";
import { u as ue, l as Dialog, m as DialogContent, n as DialogHeader, o as DialogTitle } from "./dialog-CJ93aDV1.js";
import { I as Input } from "./input-BEbbIodm.js";
import { L as Label } from "./label-8vErBWyE.js";
import { S as Skeleton } from "./skeleton-Ck67DCC2.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { f as formatDate, a as formatDateTime } from "./date-OVj4unRt.js";
import { U as Users } from "./users-BDYU-gaM.js";
import { R as RefreshCw } from "./refresh-cw-CUd3B_bb.js";
import { S as Search } from "./search-KhBJ38lW.js";
import { R as RotateCcw } from "./rotate-ccw-Bakhr4sH.js";
import { C as CircleCheck } from "./circle-check-bQopuYEd.js";
import { C as CircleX } from "./circle-x-DFtw6u_c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
];
const Coins = createLucideIcon("coins", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function relativeDate(ts) {
  if (!ts) return "Never";
  const ms = Number(ts);
  const diffMs = Date.now() - ms;
  const diffDays = Math.floor(diffMs / 864e5);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
function billNumberLabel(n) {
  return `#${String(n).padStart(4, "0")}`;
}
function CustomerSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-14 ml-auto" })
    ] })
  ] });
}
function EmptyState({
  filtered,
  onAdd,
  isOwner
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-4",
      "data-ocid": "customers.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: filtered ? "No customers found" : "No customers yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 max-w-xs", children: filtered ? "Try adjusting your search query" : "Customer profiles are created automatically when you add a name and phone to a bill." })
        ] }),
        !filtered && isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "gap-2",
            onClick: onAdd,
            "data-ocid": "customers.add_first.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Customer"
            ]
          }
        )
      ]
    }
  );
}
function StatCard({
  label,
  value,
  color = "default"
}) {
  const cls = color === "blue" ? "text-primary" : color === "green" ? "text-emerald-600" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex flex-col gap-0.5 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-lg font-bold truncate ${cls}`, children: value })
  ] });
}
function CustomerFormModal({
  initial,
  onSave,
  onClose
}) {
  const [name, setName] = reactExports.useState((initial == null ? void 0 : initial.name) ?? "");
  const [phone, setPhone] = reactExports.useState((initial == null ? void 0 : initial.phone) ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  const handleSubmit = async (e) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm w-full",
      "data-ocid": "customer_form.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: initial ? "Edit Customer" : "Add Customer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cust-name", children: "Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cust-name",
                placeholder: "Customer name",
                value: name,
                onChange: (e) => setName(e.target.value),
                autoFocus: true,
                "data-ocid": "customer_form.name.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cust-phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cust-phone",
                placeholder: "Phone number",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                type: "tel",
                "data-ocid": "customer_form.phone.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: saving || !name.trim(),
                "data-ocid": "customer_form.submit_button",
                children: saving ? "Saving…" : initial ? "Save Changes" : "Add Customer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "customer_form.cancel_button",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function CustomerDetailModal({
  customer,
  bills,
  billsLoading,
  currency,
  dateFormat,
  isOwner,
  onEdit,
  onClose
}) {
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "";
  const [credit, setCredit] = reactExports.useState(null);
  const [returns, setReturns] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("history");
  reactExports.useEffect(() => {
    if (!customer.phone || !shopId) return;
    api.getCustomerCredit(shopId, customer.phone).then(setCredit).catch(() => {
    });
  }, [api, customer.phone, shopId]);
  reactExports.useEffect(() => {
    if (!shopId || bills.length === 0) return;
    Promise.all(bills.map((b) => api.getReturnsByBill(shopId, b.id))).then((arrays) => setReturns(arrays.flat())).catch(() => {
    });
  }, [bills, shopId]);
  const firstPurchase = bills.length ? bills.reduce(
    (min, b) => b.createdAt < min ? b.createdAt : min,
    bills[0].createdAt
  ) : null;
  const lastPurchase = customer.lastPurchaseDate ?? null;
  const hasCredit = credit && (credit.balance > 0 || credit.transactions.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl w-full max-h-[90vh] overflow-y-auto",
      "data-ocid": "customer_detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl leading-tight", children: customer.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                customer.phone || "No phone"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            hasCredit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200",
                "data-ocid": "customer_detail.store_credit_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3 h-3" }),
                  formatCurrency(credit.balance, currency)
                ]
              }
            ),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: onEdit,
                "data-ocid": "customer_detail.edit_button",
                children: "Edit"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: String(customer.totalBills) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Bills" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground truncate", children: formatCurrency(customer.totalSpent, currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Spent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: firstPurchase ? formatDate(new Date(Number(firstPurchase)), dateFormat) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "First Buy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: lastPurchase ? relativeDate(lastPurchase) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last Buy" })
          ] })
        ] }),
        hasCredit && credit.transactions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Credit Transactions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 px-1 text-muted-foreground", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 px-1 text-muted-foreground", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1.5 px-1 text-muted-foreground", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1.5 px-1 text-muted-foreground", children: "Note" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: credit.transactions.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/50 last:border-0",
                "data-ocid": `customer_detail.credit_tx.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-1 text-muted-foreground", children: new Date(Number(tx.date)).toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-1", children: tx.txType === CreditTransactionType.Earned ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 font-medium", children: "+Earned" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "-Used" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-1 text-right font-semibold tabular-nums", children: formatCurrency(tx.amount, currency) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-1 text-muted-foreground truncate max-w-[100px]", children: tx.note })
                ]
              },
              String(tx.id)
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("history"),
              className: `px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "customer_detail.history_tab",
              children: "Purchase History"
            }
          ),
          returns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("returns"),
              className: `flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "returns" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "customer_detail.returns_tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                "Returns (",
                returns.length,
                ")"
              ]
            }
          )
        ] }),
        activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: billsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "customer_detail.loading_state",
            children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, k))
          }
        ) : bills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm", children: "No purchase history available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-1 text-muted-foreground font-medium text-xs", children: "Bill #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-1 text-muted-foreground font-medium text-xs", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium text-xs", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-1 text-muted-foreground font-medium text-xs", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bills.map((bill, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors",
              "data-ocid": `customer_detail.bill.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-1 font-medium text-foreground", children: billNumberLabel(bill.billNumber) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-1 text-muted-foreground", children: formatDateTime(bill.createdAt, dateFormat) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-1 text-right text-muted-foreground", children: bill.items.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-1 text-right font-semibold text-foreground tabular-nums", children: formatCurrency(bill.grandTotal, currency) })
              ]
            },
            String(bill.id)
          )) })
        ] }) }) }),
        activeTab === "returns" && returns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: returns.map((ret) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start justify-between gap-2 p-3 bg-muted/30 rounded-lg text-xs border border-border",
            "data-ocid": `customer_detail.return.${String(ret.id)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground text-sm", children: [
                  "Return #",
                  String(ret.id),
                  " \\u00b7 Bill #",
                  String(ret.originalBillId).padStart(4, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: ret.returnItems.map((ri) => `${ri.name} ×${ri.returnQty}`).join(", ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-1", children: formatCurrency(ret.totalRefundAmount, currency) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: ret.status === ReturnStatus.Approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-emerald-600 text-xs font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                " Approved"
              ] }) : ret.status === ReturnStatus.Rejected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-destructive text-xs font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                " Rejected"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-amber-600 text-xs font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                " Pending"
              ] }) })
            ]
          },
          String(ret.id)
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end border-t border-border pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: onClose,
            "data-ocid": "customer_detail.close_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
              "Close"
            ]
          }
        ) })
      ]
    }
  ) });
}
function CustomerCard({
  customer,
  currency,
  index,
  onClick
}) {
  const initials = customer.name.split(" ").slice(0, 2).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "w-full text-left bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      onClick,
      "data-ocid": `customers.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: initials || "?" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: customer.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
            customer.phone || "No phone"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground tabular-nums", children: formatCurrency(customer.totalSpent, currency) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1.5 py-0 h-4 gap-0.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-2.5 h-2.5" }),
                  String(customer.totalBills)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: relativeDate(customer.lastPurchaseDate) })
          ] })
        ] })
      ] })
    }
  );
}
function CustomersPage() {
  const { actor } = useActor(createActor);
  const shopConfig = useStore((s) => s.shopConfig);
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const dateFormat = (shopConfig == null ? void 0 : shopConfig.dateFormat) ?? DateFormat.DDMMYYYY;
  const shopId = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "";
  const isOwner = useStore((s) => s.isOwner());
  const [customers, setCustomers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedCustomer, setSelectedCustomer] = reactExports.useState(
    null
  );
  const [customerBills, setCustomerBills] = reactExports.useState([]);
  const [billsLoading, setBillsLoading] = reactExports.useState(false);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(
    null
  );
  const searchRef = reactExports.useRef(null);
  const fetchCustomers = reactExports.useCallback(
    async (silent = false) => {
      if (!actor || !shopId) return;
      if (!silent) setLoading(true);
      else setRefreshing(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 8e3);
      try {
        const data = await actor.getShopCustomers(shopId);
        const sorted = [...data].sort(
          (a, b) => Number(b.lastPurchaseDate ?? 0n) - Number(a.lastPurchaseDate ?? 0n)
        );
        setCustomers(sorted);
      } catch {
        ue.error("Failed to load customers");
      } finally {
        clearTimeout(timeout);
        setLoading(false);
        setRefreshing(false);
      }
    },
    [actor, shopId]
  );
  reactExports.useEffect(() => {
    if (actor && shopId) void fetchCustomers();
    else if (!actor) setLoading(true);
  }, [actor, shopId, fetchCustomers]);
  const filtered = reactExports.useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.phone.toLowerCase().includes(q)
    );
  }, [customers, searchQuery]);
  const totalSpent = reactExports.useMemo(
    () => customers.reduce((sum, c) => sum + c.totalSpent, 0),
    [customers]
  );
  const openDetail = reactExports.useCallback(
    async (customer) => {
      setSelectedCustomer(customer);
      if (!actor || !shopId) return;
      setBillsLoading(true);
      try {
        const bills = await actor.getCustomerBills(shopId, customer.id);
        const sorted = [...bills].sort(
          (a, b) => Number(b.createdAt) - Number(a.createdAt)
        );
        setCustomerBills(sorted);
      } catch {
        ue.error("Failed to load purchase history");
      } finally {
        setBillsLoading(false);
      }
    },
    [actor, shopId]
  );
  const handleSaveCustomer = reactExports.useCallback(
    async (name, phone) => {
      if (!actor || !shopId) throw new Error("Not ready");
      await actor.createOrUpdateCustomer(shopId, name, phone);
      ue.success(editingCustomer ? "Customer updated" : "Customer added");
      await fetchCustomers(true);
      if (editingCustomer) {
        setSelectedCustomer((prev) => prev ? { ...prev, name, phone } : prev);
      }
      setEditingCustomer(null);
    },
    [actor, shopId, editingCustomer, fetchCustomers]
  );
  const handleRefresh = () => {
    void fetchCustomers(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background pb-24",
      "data-ocid": "customers.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Customers" }),
              !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs",
                  "data-ocid": "customers.count_badge",
                  children: customers.length
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "w-9 h-9",
                  onClick: handleRefresh,
                  disabled: refreshing,
                  "aria-label": "Refresh customers",
                  "data-ocid": "customers.refresh_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-4 h-4 ${refreshing ? "animate-spin" : ""}`
                    }
                  )
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "gap-1.5 h-9",
                  onClick: () => setShowAddModal(true),
                  "data-ocid": "customers.add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                ref: searchRef,
                placeholder: "Search by name or phone…",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-9 h-10",
                "data-ocid": "customers.search_input"
              }
            ),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                onClick: () => setSearchQuery(""),
                "aria-label": "Clear search",
                "data-ocid": "customers.search_clear_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 pt-4 space-y-4", children: [
          !loading && customers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-3 gap-2",
              "data-ocid": "customers.stats.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatCard,
                  {
                    label: "Customers",
                    value: String(customers.length),
                    color: "default"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatCard,
                  {
                    label: "Total Spent",
                    value: formatCurrency(totalSpent, currency),
                    color: "blue"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatCard,
                  {
                    label: "Avg Spend",
                    value: customers.length > 0 ? formatCurrency(totalSpent / customers.length, currency) : "—",
                    color: "green"
                  }
                )
              ]
            }
          ),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "customers.loading_state", children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerSkeleton, {}, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              filtered: customers.length > 0 || !!searchQuery,
              onAdd: () => setShowAddModal(true),
              isOwner
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "customers.list", children: filtered.map((customer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CustomerCard,
            {
              customer,
              currency,
              index: i + 1,
              onClick: () => openDetail(customer)
            },
            String(customer.id)
          )) })
        ] }),
        showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomerFormModal,
          {
            onSave: handleSaveCustomer,
            onClose: () => setShowAddModal(false)
          }
        ),
        editingCustomer && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomerFormModal,
          {
            initial: { name: editingCustomer.name, phone: editingCustomer.phone },
            onSave: handleSaveCustomer,
            onClose: () => setEditingCustomer(null)
          }
        ),
        selectedCustomer && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomerDetailModal,
          {
            customer: selectedCustomer,
            bills: customerBills,
            billsLoading,
            currency,
            dateFormat,
            isOwner,
            onEdit: () => {
              setEditingCustomer(selectedCustomer);
              setSelectedCustomer(null);
            },
            onClose: () => {
              setSelectedCustomer(null);
              setCustomerBills([]);
            }
          }
        )
      ]
    }
  );
}
export {
  CustomersPage
};
