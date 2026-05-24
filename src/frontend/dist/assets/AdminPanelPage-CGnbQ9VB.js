import { m as createLucideIcon, a as useInternetIdentity, b as useNavigate, a1 as useActor, d as useStore, a2 as useSuperAdmin, r as reactExports, j as jsxRuntimeExports, a3 as Shield, B as Badge, f as Button, _ as LogOut, c as useApi, v as ChevronDown, k as LoaderCircle, G as Trash2, Y as ReturnStatus, a4 as createActor } from "./index-B4wG-Osg.js";
import { u as ue, l as Dialog, m as DialogContent, n as DialogHeader, o as DialogTitle, z as DialogDescription, y as DialogFooter } from "./dialog-D8c-E91l.js";
import { I as Input } from "./input-C3hfLS_6.js";
import { T as Textarea } from "./textarea-CV5a--DQ.js";
import { f as formatCurrency } from "./currency-KTzMGZJt.js";
import { A as ArrowLeft } from "./arrow-left-CWX_6cYq.js";
import { U as Users } from "./users-ZGk0ZpKv.js";
import { B as Building2 } from "./building-2-D76uKNn0.js";
import { R as RotateCcw } from "./rotate-ccw-jUXTdmd2.js";
import { S as Search } from "./search-C8DgYnmU.js";
import { C as ChevronUp, B as Ban } from "./chevron-up-B1zbCzB6.js";
import { T as TriangleAlert } from "./triangle-alert-DaZEq12o.js";
import { C as CircleCheck } from "./circle-check-ChJFY0Bf.js";
import { C as CircleX } from "./circle-x-CFasR8mk.js";
import { M as MessageCircle } from "./message-circle-Dy1gVgMK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function truncatePrincipal(p) {
  if (p.length <= 20) return p;
  return `${p.slice(0, 10)}...${p.slice(-5)}`;
}
function formatDate(ts) {
  const ms = typeof ts === "bigint" ? Number(ts) / 1e6 : ts;
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatTs(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function ShopTypeBadge({ type }) {
  const colors = {
    Mobile: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    Electronics: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    Medical: "bg-green-500/15 text-green-700 dark:text-green-400",
    Grocery: "bg-lime-500/15 text-lime-700 dark:text-lime-400",
    Clothing: "bg-pink-500/15 text-pink-700 dark:text-pink-400",
    Footwear: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
    Jewelry: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
    Hardware: "bg-stone-500/15 text-stone-700 dark:text-stone-400",
    BuildingMaterial: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    Stationery: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
    Restaurant: "bg-red-500/15 text-red-700 dark:text-red-400",
    Salon: "bg-purple-500/15 text-purple-700 dark:text-purple-400",
    AutoParts: "bg-teal-500/15 text-teal-700 dark:text-teal-400",
    General: "bg-muted text-muted-foreground"
  };
  const cls = colors[type] ?? colors.General;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`,
      children: type
    }
  );
}
function CopyButton({ text }) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: copy,
      className: "ml-1 text-muted-foreground hover:text-foreground transition-colors",
      "aria-label": "Copy to clipboard",
      "data-ocid": "admin.copy_button",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-3.5 h-3.5" }),
        copied && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Copied!" })
      ]
    }
  );
}
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "destructive",
  loading = false,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.confirm.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-sm text-muted-foreground leading-relaxed", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          disabled: loading,
          "data-ocid": "admin.confirm.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: confirmVariant,
          onClick: onConfirm,
          disabled: loading,
          "data-ocid": "admin.confirm.confirm_button",
          children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1.5" }),
            confirmLabel
          ]
        }
      )
    ] })
  ] }) });
}
function RejectReturnDialog({
  open,
  onConfirm,
  onCancel,
  loading
}) {
  const [reason, setReason] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.reject_return.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject Return Request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Please provide a reason for rejecting this return." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value: reason,
        onChange: (e) => setReason(e.target.value),
        placeholder: "e.g. Product is not damaged, return policy expired...",
        rows: 3,
        className: "resize-none",
        "data-ocid": "admin.reject_return.reason_textarea"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          disabled: loading,
          "data-ocid": "admin.reject_return.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "destructive",
          onClick: () => onConfirm(reason.trim()),
          disabled: loading || !reason.trim(),
          "data-ocid": "admin.reject_return.confirm_button",
          children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1.5" }),
            "Reject Return"
          ]
        }
      )
    ] })
  ] }) });
}
function ReturnCardAdmin({
  ret,
  currency,
  onApprove,
  onReject
}) {
  const [approving, setApproving] = reactExports.useState(false);
  const [showReject, setShowReject] = reactExports.useState(false);
  const [rejecting, setRejecting] = reactExports.useState(false);
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "";
  const handleApprove = async () => {
    setApproving(true);
    try {
      await api.approveReturn(shopId, ret.id);
      ue.success(`Return #${ret.id} approved — store credit awarded`);
      onApprove(ret.id);
    } catch {
      ue.error("Failed to approve return");
    } finally {
      setApproving(false);
    }
  };
  const handleReject = async (reason) => {
    setRejecting(true);
    try {
      await api.rejectReturn(shopId, { returnBillId: ret.id, reason });
      ue.success("Return rejected");
      onReject(ret.id);
    } catch {
      ue.error("Failed to reject return");
    } finally {
      setRejecting(false);
      setShowReject(false);
    }
  };
  const waLink = ret.customerPhone ? `https://wa.me/${ret.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Dear ${ret.customerName}, your return request #${ret.id} has been ${ret.status === ReturnStatus.Approved ? "approved" : "rejected"}. Refund amount: ${formatCurrency(ret.totalRefundAmount, currency)}.`
  )}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RejectReturnDialog,
      {
        open: showReject,
        loading: rejecting,
        onConfirm: handleReject,
        onCancel: () => setShowReject(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded-xl p-4 space-y-3 bg-card",
        "data-ocid": `admin.returns.item.${String(ret.id)}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: ret.customerName || "Anonymous" }),
                ret.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: ret.customerPhone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Bill #",
                String(ret.originalBillId).padStart(4, "0"),
                " · Return #",
                String(ret.id),
                " · ",
                formatTs(ret.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReturnStatusChip, { status: ret.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 bg-muted/30 rounded-lg p-2.5", children: ret.returnItems.map((ri, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between text-xs text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  ri.name,
                  " × ",
                  ri.returnQty
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 ml-2", children: formatCurrency(ri.lineTotal, currency) })
              ]
            },
            `${String(ri.productId)}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              "Refund:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(ret.totalRefundAmount, currency) })
            ] }),
            ret.status === ReturnStatus.Approved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-600", children: "✓ Store credit awarded" })
          ] }),
          ret.status === ReturnStatus.Rejected && ret.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive bg-destructive/5 rounded-md px-2 py-1.5", children: [
            "Rejected: ",
            ret.rejectionReason
          ] }),
          ret.status === ReturnStatus.Pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "flex-1 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white",
                onClick: () => void handleApprove(),
                disabled: approving,
                "data-ocid": `admin.returns.approve_button.${String(ret.id)}`,
                children: [
                  approving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "sm",
                className: "flex-1 gap-1.5",
                onClick: () => setShowReject(true),
                disabled: approving,
                "data-ocid": `admin.returns.reject_button.${String(ret.id)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                  "Reject"
                ]
              }
            )
          ] }),
          (ret.status === ReturnStatus.Approved || ret.status === ReturnStatus.Rejected) && waLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "w-full gap-1.5 text-green-700 border-green-300 hover:bg-green-50",
              onClick: () => window.open(waLink, "_blank"),
              "data-ocid": `admin.returns.whatsapp_button.${String(ret.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                "Notify Customer via WhatsApp"
              ]
            }
          )
        ]
      }
    )
  ] });
}
function ReturnStatusChip({ status }) {
  if (status === ReturnStatus.Approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-emerald-100 text-emerald-700 border-emerald-200 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " Approved"
    ] });
  if (status === ReturnStatus.Rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
      " Rejected"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-amber-100 text-amber-700 border-amber-200 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
    " Pending"
  ] });
}
function ReturnsTab() {
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = (shopConfig == null ? void 0 : shopConfig.shopName) ?? "";
  const currency = (shopConfig == null ? void 0 : shopConfig.currency) ?? "INR";
  const [returns, setReturns] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [statusFilter, setStatusFilter] = reactExports.useState("pending");
  const fetchReturns = reactExports.useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    try {
      const filter = {};
      if (statusFilter === "pending") filter.status = ReturnStatus.Pending;
      else if (statusFilter === "approved")
        filter.status = ReturnStatus.Approved;
      else if (statusFilter === "rejected")
        filter.status = ReturnStatus.Rejected;
      const data = await api.listReturns(shopId, filter);
      const sorted = [...data].sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt)
      );
      setReturns(sorted);
    } catch {
      ue.error("Failed to load returns");
    } finally {
      setLoading(false);
    }
  }, [api, shopId, statusFilter]);
  reactExports.useEffect(() => {
    void fetchReturns();
  }, [fetchReturns]);
  const handleApprove = (id) => {
    setReturns(
      (prev) => prev.map(
        (r) => r.id === id ? { ...r, status: ReturnStatus.Approved } : r
      )
    );
    void fetchReturns();
  };
  const handleReject = (id) => {
    setReturns(
      (prev) => prev.map(
        (r) => r.id === id ? { ...r, status: ReturnStatus.Rejected } : r
      )
    );
    void fetchReturns();
  };
  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.returns.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-5 flex-wrap", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setStatusFilter(f.key),
        "data-ocid": `admin.returns.filter.${f.key}`,
        className: `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors min-h-[36px] ${statusFilter === f.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
        children: f.label
      },
      f.key
    )) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : returns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-8 h-8 text-muted-foreground" }),
        title: "No returns found",
        subtitle: `No ${statusFilter === "all" ? "" : statusFilter} return requests yet.`,
        ocid: "admin.returns.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: returns.map((ret) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReturnCardAdmin,
      {
        ret,
        currency,
        onApprove: handleApprove,
        onReject: handleReject
      },
      String(ret.id)
    )) })
  ] });
}
function UserRow({ user, actor, index, onDelete, onBlock }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [notes, setNotes] = reactExports.useState([]);
  const [notesLoading, setNotesLoading] = reactExports.useState(false);
  const [noteText, setNoteText] = reactExports.useState("");
  const [addingNote, setAddingNote] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [blockLoading, setBlockLoading] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(false);
  const [deleteLoading, setDeleteLoading] = reactExports.useState(false);
  const { adminDeleteUser, adminBlockUser } = useApi();
  const loadNotes = reactExports.useCallback(async () => {
    if (!actor) return;
    setNotesLoading(true);
    const res = await actor.getAdminNotes(user.principal);
    if (res.__kind__ === "ok") {
      setNotes(res.ok.filter((n) => !n.isDeleted));
    }
    setNotesLoading(false);
  }, [actor, user.principal]);
  const handleExpand = () => {
    if (!expanded) void loadNotes();
    setExpanded((v) => !v);
  };
  const handleAddNote = async () => {
    if (!actor || !noteText.trim()) return;
    setAddingNote(true);
    const res = await actor.addAdminNote(user.principal, noteText.trim());
    if (res.__kind__ === "ok") {
      setNoteText("");
      void loadNotes();
    }
    setAddingNote(false);
  };
  const handleDeleteNote = async (noteId) => {
    if (!actor) return;
    setDeletingId(noteId);
    const res = await actor.deleteAdminNote(noteId);
    if (res.__kind__ === "ok") void loadNotes();
    setDeletingId(null);
  };
  const handleBlock = async () => {
    setBlockLoading(true);
    const newBlocked = !user.isBlocked;
    const res = await adminBlockUser(user.principal, newBlocked);
    if ("ok" in res) {
      onBlock(user.principal, newBlocked);
      ue.success(newBlocked ? "User blocked" : "User unblocked");
    } else {
      ue.error(res.err || "Failed to update user");
    }
    setBlockLoading(false);
  };
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    const res = await adminDeleteUser(user.principal);
    if ("ok" in res) {
      ue.success("User deleted");
      onDelete(user.principal);
    } else {
      ue.error(res.err || "Failed to delete user");
    }
    setDeleteLoading(false);
    setDeleteConfirm(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: deleteConfirm,
        title: "Delete User?",
        description: `Delete user ${truncatePrincipal(user.principal)}? This will permanently remove their account and all associated data. This cannot be undone.`,
        confirmLabel: "Delete User",
        loading: deleteLoading,
        onConfirm: () => void handleDeleteConfirm(),
        onCancel: () => setDeleteConfirm(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded-lg overflow-hidden mb-2",
        "data-ocid": `admin.users.item.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleExpand,
                className: "flex-1 text-left px-4 py-3 bg-card hover:bg-muted/40 transition-colors flex items-center gap-3",
                "data-ocid": `admin.users.row.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground truncate", children: truncatePrincipal(user.principal) }),
                      user.isBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "destructive",
                          className: "text-[10px] h-4 px-1 ml-1 flex-shrink-0",
                          children: "Blocked"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-1 font-medium text-sm truncate", children: user.shopName || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShopTypeBadge, { type: user.shopType }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Last seen: ",
                        formatDate(user.lastSeen)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold", children: [
                        user.loginCount.toString(),
                        " logins"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-muted-foreground", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 px-2 bg-card border-l border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => void handleBlock(),
                  disabled: blockLoading,
                  title: user.isBlocked ? "Unblock user" : "Block user",
                  "aria-label": user.isBlocked ? "Unblock user" : "Block user",
                  className: `w-7 h-7 rounded flex items-center justify-center transition-colors disabled:opacity-50 ${user.isBlocked ? "text-green-600 hover:bg-green-500/10" : "text-orange-500 hover:bg-orange-500/10"}`,
                  "data-ocid": `admin.users.block_button.${index}`,
                  children: blockLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDeleteConfirm(true),
                  title: "Delete user permanently",
                  "aria-label": "Delete user",
                  className: "w-7 h-7 rounded flex items-center justify-center text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors",
                  "data-ocid": `admin.users.delete_button.${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 bg-background border-t border-border space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "Full Principal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs break-all", children: user.principal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: user.principal })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide", children: "First Seen" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: formatDate(user.firstSeen) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Admin Notes" }),
              notesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
                " Loading notes..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-3", children: [
                notes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic", children: "No notes yet." }),
                notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-2 p-2 rounded-md bg-muted/30 border border-border",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: formatDate(note.createdAt) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm break-words", children: note.content })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void handleDeleteNote(note.noteId),
                          disabled: deletingId === note.noteId,
                          className: "shrink-0 text-destructive/70 hover:text-destructive transition-colors disabled:opacity-50",
                          "aria-label": "Delete note",
                          "data-ocid": `admin.users.delete_note_button.${index}`,
                          children: deletingId === note.noteId ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  },
                  note.noteId.toString()
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      value: noteText,
                      onChange: (e) => setNoteText(e.target.value.slice(0, 500)),
                      placeholder: "Add a note in English...",
                      rows: 2,
                      className: "resize-none pr-16 text-sm",
                      "data-ocid": `admin.users.textarea.${index}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none", children: [
                    noteText.length,
                    "/500"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: () => void handleAddNote(),
                    disabled: !noteText.trim() || addingNote,
                    "data-ocid": `admin.users.add_note_button.${index}`,
                    children: [
                      addingNote ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin mr-1" }) : null,
                      "Add Note"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function ShopRow({ shop, actor, index, onToggle, onDelete }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [toggling, setToggling] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(false);
  const [deleteLoading, setDeleteLoading] = reactExports.useState(false);
  const { adminDeleteShop } = useApi();
  const handleToggle = async () => {
    if (!actor) return;
    setToggling(true);
    const res = await actor.setShopDisabled(shop.principal, !shop.isDisabled);
    if (res.__kind__ === "ok") onToggle(shop.principal, !shop.isDisabled);
    setToggling(false);
  };
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    const res = await adminDeleteShop(shop.principal);
    if ("ok" in res) {
      ue.success(`Shop "${shop.shopName}" deleted`);
      onDelete(shop.principal);
    } else {
      ue.error(res.err || "Failed to delete shop");
    }
    setDeleteLoading(false);
    setDeleteConfirm(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: deleteConfirm,
        title: `Delete "${shop.shopName}"?`,
        description: "This will permanently delete all products, bills and data for this shop. This cannot be undone.",
        confirmLabel: "Delete Shop",
        loading: deleteLoading,
        onConfirm: () => void handleDeleteConfirm(),
        onCancel: () => setDeleteConfirm(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `border rounded-lg overflow-hidden mb-2 transition-opacity ${shop.isDisabled ? "border-destructive/30 opacity-70" : "border-border"}`,
        "data-ocid": `admin.shops.item.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setExpanded((v) => !v),
                className: "flex-1 text-left px-4 py-3 bg-card hover:bg-muted/40 transition-colors flex items-center gap-3",
                "data-ocid": `admin.shops.row.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3 items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm truncate", children: shop.shopName || "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShopTypeBadge, { type: shop.shopType }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      shop.currency,
                      " · ",
                      shop.taxSystem
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: truncatePrincipal(shop.principal) }),
                      shop.isDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Disabled" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs text-accent border-accent/40",
                          children: "Active"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-muted-foreground", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-2 bg-card border-l border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setDeleteConfirm(true),
                title: "Delete shop permanently",
                "aria-label": "Delete shop",
                className: "w-7 h-7 rounded flex items-center justify-center text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors",
                "data-ocid": `admin.shops.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 bg-background border-t border-border space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Full Principal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs break-all", children: shop.principal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: shop.principal })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Language" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: shop.language })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Currency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: shop.currency })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Tax System" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: shop.taxSystem })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Shop Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: shop.shopType })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: shop.isDisabled ? "default" : "outline",
                  size: "sm",
                  onClick: () => void handleToggle(),
                  disabled: toggling,
                  "data-ocid": `admin.shops.toggle.${index}`,
                  children: [
                    toggling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin mr-1" }) : null,
                    shop.isDisabled ? "Enable Shop" : "Disable Shop"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  onClick: () => setDeleteConfirm(true),
                  "data-ocid": `admin.shops.delete_confirm_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                    "Delete Shop"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
function AdminPanelPage() {
  const { clear: logout } = useInternetIdentity();
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { shopConfig } = useStore();
  const { isSuperAdmin, isChecking } = useSuperAdmin();
  const [authState, setAuthState] = reactExports.useState("checking");
  const [activeTab, setActiveTab] = reactExports.useState(
    "users"
  );
  const [users, setUsers] = reactExports.useState([]);
  const [usersLoading, setUsersLoading] = reactExports.useState(false);
  const [userSearch, setUserSearch] = reactExports.useState("");
  const [userSort, setUserSort] = reactExports.useState("lastSeen");
  const [shops, setShops] = reactExports.useState([]);
  const [shopsLoading, setShopsLoading] = reactExports.useState(false);
  const [shopSearch, setShopSearch] = reactExports.useState("");
  const [shopSort, setShopSort] = reactExports.useState("lastActivity");
  const initDone = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isChecking) return;
    setAuthState(isSuperAdmin ? "authorized" : "denied");
  }, [isChecking, isSuperAdmin]);
  reactExports.useEffect(() => {
    initDone.current = false;
  }, [actor]);
  reactExports.useEffect(() => {
    if (authState === "denied") {
      void navigate({ to: "/dashboard" });
    }
  }, [authState, navigate]);
  reactExports.useEffect(() => {
    if (authState !== "authorized" || !actor || activeTab !== "users") return;
    const load = async () => {
      setUsersLoading(true);
      const res = await actor.getAllUsers();
      if (res.__kind__ === "ok") setUsers(res.ok);
      setUsersLoading(false);
    };
    void load();
  }, [authState, actor, activeTab]);
  reactExports.useEffect(() => {
    if (authState !== "authorized" || !actor || activeTab !== "shops") return;
    const load = async () => {
      setShopsLoading(true);
      const res = await actor.getAllShops();
      if (res.__kind__ === "ok") setShops(res.ok);
      setShopsLoading(false);
    };
    void load();
  }, [authState, actor, activeTab]);
  const filteredUsers = reactExports.useMemo(() => {
    const q = userSearch.toLowerCase();
    const filtered = q ? users.filter(
      (u) => u.shopName.toLowerCase().includes(q) || u.principal.toLowerCase().startsWith(q)
    ) : users;
    return [...filtered].sort((a, b) => {
      if (userSort === "lastSeen") return Number(b.lastSeen - a.lastSeen);
      if (userSort === "shopName") return a.shopName.localeCompare(b.shopName);
      return Number(b.loginCount - a.loginCount);
    });
  }, [users, userSearch, userSort]);
  const filteredShops = reactExports.useMemo(() => {
    const q = shopSearch.toLowerCase();
    const filtered = q ? shops.filter((s) => s.shopName.toLowerCase().includes(q)) : shops;
    return [...filtered].sort((a, b) => {
      if (shopSort === "shopName") return a.shopName.localeCompare(b.shopName);
      return 0;
    });
  }, [shops, shopSearch, shopSort]);
  const handleShopToggle = (principal, disabled) => {
    setShops(
      (prev) => prev.map(
        (s) => s.principal === principal ? { ...s, isDisabled: disabled } : s
      )
    );
  };
  const handleShopDelete = (principal) => {
    setShops((prev) => prev.filter((s) => s.principal !== principal));
    if (shopConfig == null ? void 0 : shopConfig.shopName) {
      const deletedShop = shops.find((s) => s.principal === principal);
      if (deletedShop && deletedShop.shopName === shopConfig.shopName) {
        ue.info("Active shop deleted — please switch to another shop");
      }
    }
  };
  const handleUserDelete = (principal) => {
    setUsers((prev) => prev.filter((u) => u.principal !== principal));
  };
  const handleUserBlock = (principal, blocked) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.principal === principal ? { ...u, isBlocked: blocked } : u
      )
    );
  };
  if (authState === "checking" || isChecking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary animate-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Verifying admin access..." })
    ] }) });
  }
  if (authState === "denied") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-violet-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-lg", children: "Super Admin Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs hidden sm:inline-flex", children: "univarsalshop.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => void navigate({ to: "/dashboard" }),
                className: "gap-1.5",
                "data-ocid": "admin.back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Dashboard" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  logout();
                  void navigate({ to: "/", replace: true });
                },
                className: "gap-1.5 text-destructive hover:text-destructive",
                "data-ocid": "admin.logout_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 flex gap-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("users"),
              className: `flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "users" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "admin.users.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                "Users",
                users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 text-primary text-xs px-1.5 py-0.5 font-semibold", children: users.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("shops"),
              className: `flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "shops" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "admin.shops.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
                "Shops",
                shops.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 text-primary text-xs px-1.5 py-0.5 font-semibold", children: shops.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("returns"),
              className: `flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === "returns" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "admin.returns.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                "Returns"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl mx-auto w-full px-4 py-6", children: [
          activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.users.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: userSearch,
                    onChange: (e) => setUserSearch(e.target.value),
                    placeholder: "Search by shop name or principal prefix...",
                    className: "pl-9",
                    "data-ocid": "admin.users.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortButton,
                  {
                    active: userSort === "lastSeen",
                    onClick: () => setUserSort("lastSeen"),
                    label: "Last Seen",
                    ocid: "admin.users.sort_last_seen"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortButton,
                  {
                    active: userSort === "shopName",
                    onClick: () => setUserSort("shopName"),
                    label: "Name A-Z",
                    ocid: "admin.users.sort_name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortButton,
                  {
                    active: userSort === "loginCount",
                    onClick: () => setUserSort("loginCount"),
                    label: "Logins",
                    ocid: "admin.users.sort_logins"
                  }
                )
              ] })
            ] }),
            usersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-muted-foreground" }),
                title: "No users found",
                subtitle: userSearch ? "Try a different search term." : "No users have logged in yet.",
                ocid: "admin.users.empty_state"
              }
            ) : filteredUsers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserRow,
              {
                user,
                actor,
                index: i + 1,
                onDelete: handleUserDelete,
                onBlock: handleUserBlock
              },
              user.principal
            ))
          ] }),
          activeTab === "shops" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.shops.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: shopSearch,
                    onChange: (e) => setShopSearch(e.target.value),
                    placeholder: "Search by shop name...",
                    className: "pl-9",
                    "data-ocid": "admin.shops.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortButton,
                  {
                    active: shopSort === "lastActivity",
                    onClick: () => setShopSort("lastActivity"),
                    label: "Last Active",
                    ocid: "admin.shops.sort_last_active"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SortButton,
                  {
                    active: shopSort === "shopName",
                    onClick: () => setShopSort("shopName"),
                    label: "Name A-Z",
                    ocid: "admin.shops.sort_name"
                  }
                )
              ] })
            ] }),
            shopsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : filteredShops.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 text-muted-foreground" }),
                title: "No shops found",
                subtitle: shopSearch ? "Try a different search term." : "No shops registered yet.",
                ocid: "admin.shops.empty_state"
              }
            ) : filteredShops.map((shop, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShopRow,
              {
                shop,
                actor,
                index: i + 1,
                onToggle: handleShopToggle,
                onDelete: handleShopDelete
              },
              shop.principal
            ))
          ] }),
          activeTab === "returns" && /* @__PURE__ */ jsxRuntimeExports.jsx(ReturnsTab, {})
        ] })
      ]
    }
  );
}
function SortButton({
  active,
  onClick,
  label,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
      "data-ocid": ocid,
      children: label
    }
  );
}
function ListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 rounded-lg bg-muted/50 animate-pulse" }, i)) });
}
function EmptyState({
  icon,
  title,
  subtitle,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: subtitle })
      ]
    }
  );
}
export {
  AdminPanelPage
};
