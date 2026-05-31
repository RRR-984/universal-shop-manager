import { m as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as Button, X, T as TaxSystem, N as NumberFormat, k as LoaderCircle, C as Check, S as ShopType, D as DateFormat } from "./index-T7Sl8NUk.js";
import { u as ue } from "./index-BGtHL4Us.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { a as formatDateTime } from "./date-DenVRcOM.js";
import { P as Printer } from "./printer-D0lQ6_un.js";
import { k as Dialog, l as DialogContent, m as DialogHeader, n as DialogTitle } from "./dialog-BrfMriH9.js";
import { I as Input } from "./input-BdvWVqhx.js";
import { L as Label } from "./label-iEAq-4xT.js";
import { M as MessageCircle } from "./message-circle-BXa6t2c4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
const FileDown = createLucideIcon("file-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function BillPrintDialog({
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
  onClose
}) {
  const [printFormat, setPrintFormat] = reactExports.useState("a4");
  const printRef = reactExports.useRef(null);
  const taxLabel = taxCalc.taxType;
  const shopName = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop";
  const shopAddress = (shopConfig == null ? void 0 : shopConfig.shopAddress) ?? "";
  const shopPhone = (shopConfig == null ? void 0 : shopConfig.shopPhone) ?? "";
  const now = /* @__PURE__ */ new Date();
  const widthMap = {
    thermal58: "max-w-[220px]",
    thermal80: "max-w-[300px]",
    a4: "max-w-[595px]"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
      "data-ocid": "billing.print_dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Print Bill" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              "data-ocid": "billing.print_close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground mr-1", children: "Format:" }),
          ["thermal58", "thermal80", "a4"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPrintFormat(f),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${printFormat === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`,
              "data-ocid": `billing.print_format.${f}`,
              children: f === "thermal58" ? "Thermal 58mm" : f === "thermal80" ? "Thermal 80mm" : "A4 Paper"
            },
            f
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-5 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mx-auto bg-background shadow-md rounded p-4 ${widthMap[printFormat]}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base", children: shopName }),
                shopAddress && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70 mt-0.5", children: shopAddress }),
                shopPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: shopPhone }),
                (shopConfig == null ? void 0 : shopConfig.gstinNumber) && shopConfig.gstinNumber.trim() !== "" && shopConfig.taxSystem === "GST" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-foreground/70", children: `GSTIN: ${shopConfig.gstinNumber}` }),
                (shopConfig == null ? void 0 : shopConfig.vatNumber) && shopConfig.vatNumber.trim() !== "" && shopConfig.taxSystem === "VAT" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-foreground/70", children: `VAT No: ${shopConfig.vatNumber}` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dashed border-border my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs mb-2 space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Bill #" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: billNumber ? String(billNumber) : "Draft" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDateTime(now, dateFormat) })
                ] }),
                customerName && customerName !== "Anonymous" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: customerName })
                ] }),
                customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: customerPhone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: priceType })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dashed border-border my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-foreground/60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-1", children: "Item" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1", children: "Qty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1", children: "Rate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-1", children: "Total" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-t border-border/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 text-left", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1 text-right", children: [
                        item.qty,
                        " ",
                        item.product.unit
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 text-right", children: fmt(item.rate) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 text-right font-medium", children: fmt(lineTotal(item)) })
                    ]
                  },
                  String(item.product.id)
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dashed border-border my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(subtotal) })
                ] }),
                totalDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: "Discount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "−",
                    fmt(totalDiscount)
                  ] })
                ] }),
                taxRate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  taxSystem === TaxSystem.GST && taxCalc.breakdown.cgst !== void 0 && taxCalc.breakdown.cgst > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60", children: [
                        "CGST (",
                        taxRate / 2,
                        "%)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.cgst) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60", children: [
                        "SGST (",
                        taxRate / 2,
                        "%)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxCalc.breakdown.sgst ?? 0) })
                    ] })
                  ] }),
                  taxSystem !== TaxSystem.GST && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60", children: [
                      taxLabel,
                      " (",
                      taxRate,
                      "%)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(taxAmount) })
                  ] })
                ] }),
                extraCharges.filter((c) => c.amount > 0).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: c.description || "Extra" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(c.amount) })
                ] }, c.id))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t-2 border-foreground/80 my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(grandTotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dashed border-border my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-foreground/60", children: "Thank you for your purchase!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-foreground/50 mt-0.5", children: "Please visit again 🙏" })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              "data-ocid": "billing.print_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: handlePrint,
              className: "gap-2 bg-primary text-primary-foreground",
              "data-ocid": "billing.print_confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                "Print Now"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function EmailShareModal({ bill, shopConfig, onClose }) {
  const shopName = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop";
  const [email, setEmail] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const subject = `Bill #${String(bill.billNumber).padStart(4, "0")} from ${shopName}`;
  const useIndianFormat = (shopConfig == null ? void 0 : shopConfig.numberFormat) === NumberFormat.Indian;
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const fmt = (n) => formatCurrency(n, currency, useIndianFormat);
  const validate = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };
  const handleSend = async () => {
    if (!validate()) {
      ue.error("Please enter a valid email address");
      return;
    }
    setStatus("sending");
    try {
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
        "Thank you for your purchase!"
      ].filter((l, i, arr) => l !== "" || i > 0 && arr[i - 1] !== "").join("\n");
      const mailtoUrl = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, "_blank");
      setStatus("success");
      ue.success(
        "Email client opened! Review and send from your email app."
      );
      setTimeout(() => onClose(), 1800);
    } catch {
      setStatus("error");
      ue.error("Failed to open email client");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "email_share.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-primary" }),
      "Share Bill via Email"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: subject })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email-share-input", children: "Customer Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "email-share-input",
            type: "email",
            placeholder: "customer@example.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSend(),
            autoFocus: true,
            className: "h-10",
            "data-ocid": "email_share.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 space-y-1", children: [
        bill.items.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate flex-1 min-w-0 mr-2", children: [
                item.name,
                " × ",
                item.qty
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium shrink-0", children: fmt(item.lineTotal) })
            ]
          },
          item.name + item.rate
        )),
        bill.items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "+ ",
          bill.items.length - 3,
          " more items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold border-t border-border pt-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: fmt(bill.grandTotal) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "email_share.cancel_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
              "Cancel"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "flex-1 gap-2 bg-primary text-primary-foreground",
            onClick: handleSend,
            disabled: status === "sending" || status === "success",
            "data-ocid": "email_share.send_button",
            children: [
              status === "sending" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
              status === "sending" ? "Opening..." : status === "success" ? "Opened!" : "Send Email"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function buildReminderWhatsAppText(bill, shopName, currency) {
  const fmt = (n) => formatCurrency(n, currency);
  return [
    `Assalamualaikum ${bill.customerName || "Customer"}! 🙏`,
    `Yaad dihani: Bill #${String(bill.billNumber)} - ${shopName}`,
    `Total: ${fmt(bill.grandTotal)}`,
    `Jama Karaya: ${fmt(bill.amountPaid)}`,
    `*Baaki: ${fmt(bill.amountPending)}*`,
    "",
    "Kripya baaki raqam jald ada karein.",
    "Shukriya! 🙏"
  ].join("\n");
}
function buildWhatsAppBillText(bill, shopConfig) {
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const fmt = (n) => formatCurrency(n, currency);
  const shopName = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop";
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
    "Thank you for your purchase! 🙏"
  ];
  return lines.filter((l, i) => l !== "" || i > 0 && lines[i - 1] !== "").join("\n");
}
function buildPrintHtml(bill, shopConfig) {
  var _a, _b;
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const fmt = (n) => formatCurrency(n, currency);
  const shopName = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop";
  const shopAddress = (shopConfig == null ? void 0 : shopConfig.shopAddress) ?? "";
  const shopPhone = (shopConfig == null ? void 0 : shopConfig.shopPhone) ?? "";
  const itemsHtml = bill.items.map(
    (item) => `<tr>
        <td style="padding:3px 4px">${item.name}</td>
        <td style="padding:3px 4px;text-align:right">${item.qty} ${item.unit}</td>
        <td style="padding:3px 4px;text-align:right">${fmt(item.rate)}</td>
        <td style="padding:3px 4px;text-align:right">${fmt(item.lineTotal)}</td>
      </tr>`
  ).join("");
  const taxHtml = bill.taxBreakdown.cgst > 0 ? `<tr><td>CGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.cgst)}</td></tr>
         <tr><td>SGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.sgst)}</td></tr>` : bill.taxBreakdown.igst > 0 ? `<tr><td>IGST</td><td style="text-align:right">${fmt(bill.taxBreakdown.igst)}</td></tr>` : "";
  const extraHtml = bill.extraCharges.filter((c) => c.amount > 0).map(
    (c) => `<tr><td>${c.description}</td><td style="text-align:right">${fmt(c.amount)}</td></tr>`
  ).join("");
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
  ${shopPhone ? `<p>${shopPhone}</p>` : ""}${((_a = shopConfig == null ? void 0 : shopConfig.gstinNumber) == null ? void 0 : _a.trim()) && shopConfig.taxSystem === "GST" ? `<p style="font-size:11px">GSTIN: ${shopConfig.gstinNumber}</p>` : ""}${((_b = shopConfig == null ? void 0 : shopConfig.vatNumber) == null ? void 0 : _b.trim()) && shopConfig.taxSystem === "VAT" ? `<p style="font-size:11px">VAT No: ${shopConfig.vatNumber}</p>` : ""}
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
function BillShareCard({ bill, shopConfig, isReminder = false }) {
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const [showPrint, setShowPrint] = reactExports.useState(false);
  const [showEmail, setShowEmail] = reactExports.useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = reactExports.useState(false);
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "USD";
  const useIndianFormat = (shopConfig == null ? void 0 : shopConfig.numberFormat) === NumberFormat.Indian;
  const fmt = (n) => formatCurrency(n, currency, useIndianFormat);
  const handleWhatsApp = () => {
    const phoneRaw = bill.customerPhone || (shopConfig == null ? void 0 : shopConfig.shopPhone) || "";
    const phone = phoneRaw.replace(/\D/g, "");
    const text = isReminder ? buildReminderWhatsAppText(
      bill,
      (shopConfig == null ? void 0 : shopConfig.shopName) ?? "Shop",
      currency
    ) : buildWhatsAppBillText(bill, shopConfig);
    if (phone) {
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };
  const handlePdfDownload = () => {
    const html = buildPrintHtml(bill, shopConfig);
    const win = window.open("", "_blank");
    if (!win) {
      ue.error("Popup blocked — allow popups to download PDF");
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
      const billId = String(bill.id);
      const shareUrl = `${window.location.origin}/bill/${billId}`;
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2e3);
    } catch {
      ue.error("Failed to copy link");
    } finally {
      setIsGeneratingLink(false);
    }
  };
  const buttons = [
    {
      id: "whatsapp",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6" }),
      label: isReminder ? "Send Reminder" : "WhatsApp",
      onClick: handleWhatsApp,
      disabled: false,
      color: "text-emerald-600"
    },
    {
      id: "pdf",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "w-6 h-6" }),
      label: "Save as PDF",
      onClick: handlePdfDownload
    },
    {
      id: "email",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-6 h-6" }),
      label: "Email",
      onClick: () => setShowEmail(true)
    },
    {
      id: "print",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-6 h-6" }),
      label: "Print",
      onClick: () => setShowPrint(true)
    },
    {
      id: "link",
      icon: linkCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-6 h-6 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-6 h-6" }),
      label: linkCopied ? "Copied!" : isGeneratingLink ? "Getting link..." : "Link Share",
      onClick: handleLinkShare,
      disabled: isGeneratingLink,
      success: linkCopied
    }
  ];
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
        __kind__: "General",
        General: {}
      }
    },
    qty: i.qty,
    rate: i.rate,
    discount: 0,
    discountMode: "fixed"
  }));
  const draftExtraCharges = bill.extraCharges.map((c, idx) => ({
    id: `ec-${idx}`,
    description: c.description,
    amount: c.amount
  }));
  const taxCalc = {
    taxType: bill.taxSystem,
    subtotal: bill.subtotal,
    taxAmount: bill.taxBreakdown.cgst + bill.taxBreakdown.sgst + bill.taxBreakdown.igst,
    total: bill.grandTotal,
    breakdown: {
      cgst: bill.taxBreakdown.cgst,
      sgst: bill.taxBreakdown.sgst,
      igst: bill.taxBreakdown.igst
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4",
        "data-ocid": "bill_share.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3", children: "Bill Sharing Options" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 sm:gap-3", children: buttons.map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: btn.disabled ? void 0 : btn.onClick,
              disabled: btn.disabled,
              "data-ocid": `bill_share.${btn.id}_button`,
              "aria-label": btn.label,
              className: [
                "flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border transition-all duration-150 min-h-[60px] sm:min-h-[72px]",
                btn.disabled ? "opacity-40 cursor-not-allowed border-border bg-muted/30" : btn.success ? "border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border-primary bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
              ].join(" "),
              children: [
                btn.icon,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] sm:text-xs font-medium leading-tight text-center", children: btn.label })
              ]
            },
            btn.id
          )) }),
          !bill.customerPhone && !(shopConfig == null ? void 0 : shopConfig.shopPhone) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "💡 Add customer or shop phone in Settings for direct WhatsApp sharing" })
        ]
      }
    ),
    showPrint && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillPrintDialog,
      {
        shopConfig,
        customerName: bill.customerName || "Anonymous",
        customerPhone: bill.customerPhone,
        priceType: bill.priceType,
        items: draftItems,
        extraCharges: draftExtraCharges,
        taxSystem: bill.taxSystem,
        taxRate: bill.taxRate,
        taxCalc,
        subtotal: bill.subtotal,
        totalDiscount: bill.totalDiscount,
        taxAmount: taxCalc.taxAmount,
        grandTotal: bill.grandTotal,
        billNumber: bill.billNumber,
        fmt,
        lineTotal: (item) => item.qty * item.rate,
        dateFormat: (shopConfig == null ? void 0 : shopConfig.dateFormat) ?? DateFormat.DDMMYYYY,
        onClose: () => setShowPrint(false)
      }
    ),
    showEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmailShareModal,
      {
        bill,
        shopConfig,
        onClose: () => setShowEmail(false)
      }
    )
  ] });
}
export {
  BillShareCard as B,
  BillPrintDialog as a,
  buildReminderWhatsAppText as b
};
