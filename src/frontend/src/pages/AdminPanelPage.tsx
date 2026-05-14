import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Loader2,
  LogOut,
  MessageCircle,
  RotateCcw,
  Search,
  Shield,
  Trash2,
  UserX,
  Users,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { AdminNoteView, ShopAdminView, UserView } from "../backend.d";
import type { ReturnBill, ReturnFilter, backendInterface } from "../backend.d";
import { ReturnStatus } from "../backend.d";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useSuperAdmin } from "../context/SuperAdminContext";
import { useApi } from "../lib/api";
import { formatCurrency } from "../lib/currency";
import { useStore } from "../lib/store";

// --- Helpers ---
function truncatePrincipal(p: string) {
  if (p.length <= 20) return p;
  return `${p.slice(0, 10)}...${p.slice(-5)}`;
}

function formatDate(ts: bigint | number) {
  const ms = typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts;
  if (!ms) return "\u2014";
  return new Date(ms).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTs(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// --- Sub-components ---

function ShopTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
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
    General: "bg-muted text-muted-foreground",
  };
  const cls = colors[type] ?? colors.General;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {type}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy to clipboard"
      data-ocid="admin.copy_button"
    >
      <ClipboardCopy className="w-3.5 h-3.5" />
      {copied && <span className="sr-only">Copied!</span>}
    </button>
  );
}

// --- Confirm Dialog ---
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmVariant?: "destructive" | "default";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "destructive",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent data-ocid="admin.confirm.dialog">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            data-ocid="admin.confirm.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={loading}
            data-ocid="admin.confirm.confirm_button"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Reject Return Dialog ---
function RejectReturnDialog({
  open,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  loading: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent data-ocid="admin.reject_return.dialog">
        <DialogHeader>
          <DialogTitle>Reject Return Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this return.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Product is not damaged, return policy expired..."
          rows={3}
          className="resize-none"
          data-ocid="admin.reject_return.reason_textarea"
        />
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            data-ocid="admin.reject_return.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onConfirm(reason.trim())}
            disabled={loading || !reason.trim()}
            data-ocid="admin.reject_return.confirm_button"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />}
            Reject Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Returns Tab ---

type ReturnStatusFilter = "all" | "pending" | "approved" | "rejected";

function ReturnCardAdmin({
  ret,
  currency,
  onApprove,
  onReject,
}: {
  ret: ReturnBill;
  currency: string;
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
}) {
  const [approving, setApproving] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = shopConfig?.shopName ?? "";

  const handleApprove = async () => {
    setApproving(true);
    try {
      await api.approveReturn(shopId, ret.id);
      toast.success(`Return #${ret.id} approved — store credit awarded`);
      onApprove(ret.id);
    } catch {
      toast.error("Failed to approve return");
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async (reason: string) => {
    setRejecting(true);
    try {
      await api.rejectReturn(shopId, { returnBillId: ret.id, reason });
      toast.success("Return rejected");
      onReject(ret.id);
    } catch {
      toast.error("Failed to reject return");
    } finally {
      setRejecting(false);
      setShowReject(false);
    }
  };

  const waLink = ret.customerPhone
    ? `https://wa.me/${ret.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Dear ${ret.customerName}, your return request #${ret.id} has been ${ret.status === ReturnStatus.Approved ? "approved" : "rejected"}. Refund amount: ${formatCurrency(ret.totalRefundAmount, currency)}.`,
      )}`
    : null;

  return (
    <>
      <RejectReturnDialog
        open={showReject}
        loading={rejecting}
        onConfirm={handleReject}
        onCancel={() => setShowReject(false)}
      />
      <div
        className="border border-border rounded-xl p-4 space-y-3 bg-card"
        data-ocid={`admin.returns.item.${String(ret.id)}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground">
                {ret.customerName || "Anonymous"}
              </span>
              {ret.customerPhone && (
                <span className="text-xs text-muted-foreground">
                  {ret.customerPhone}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Bill #{String(ret.originalBillId).padStart(4, "0")} · Return #
              {String(ret.id)} · {formatTs(ret.createdAt)}
            </p>
          </div>
          <ReturnStatusChip status={ret.status} />
        </div>

        {/* Items */}
        <div className="space-y-1 bg-muted/30 rounded-lg p-2.5">
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

        {/* Total + rejection reason */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Refund:{" "}
            <span className="text-primary">
              {formatCurrency(ret.totalRefundAmount, currency)}
            </span>
          </span>
          {ret.status === ReturnStatus.Approved && (
            <span className="text-xs text-emerald-600">
              ✓ Store credit awarded
            </span>
          )}
        </div>
        {ret.status === ReturnStatus.Rejected && ret.rejectionReason && (
          <p className="text-xs text-destructive bg-destructive/5 rounded-md px-2 py-1.5">
            Rejected: {ret.rejectionReason}
          </p>
        )}

        {/* Actions */}
        {ret.status === ReturnStatus.Pending && (
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              className="flex-1 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => void handleApprove()}
              disabled={approving}
              data-ocid={`admin.returns.approve_button.${String(ret.id)}`}
            >
              {approving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              Approve
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="flex-1 gap-1.5"
              onClick={() => setShowReject(true)}
              disabled={approving}
              data-ocid={`admin.returns.reject_button.${String(ret.id)}`}
            >
              <XCircle className="w-3.5 h-3.5" />
              Reject
            </Button>
          </div>
        )}

        {/* WhatsApp notification (optional) */}
        {(ret.status === ReturnStatus.Approved ||
          ret.status === ReturnStatus.Rejected) &&
          waLink && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-green-700 border-green-300 hover:bg-green-50"
              onClick={() => window.open(waLink, "_blank")}
              data-ocid={`admin.returns.whatsapp_button.${String(ret.id)}`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Notify Customer via WhatsApp
            </Button>
          )}
      </div>
    </>
  );
}

function ReturnStatusChip({ status }: { status: ReturnStatus }) {
  if (status === ReturnStatus.Approved)
    return (
      <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200 gap-1">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </Badge>
    );
  if (status === ReturnStatus.Rejected)
    return (
      <Badge variant="destructive" className="text-xs gap-1">
        <XCircle className="w-3 h-3" /> Rejected
      </Badge>
    );
  return (
    <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200 gap-1">
      <RotateCcw className="w-3 h-3" /> Pending
    </Badge>
  );
}

function ReturnsTab() {
  const api = useApi();
  const shopConfig = useStore((s) => s.shopConfig);
  const shopId = shopConfig?.shopName ?? "";
  const currency = shopConfig?.currency ?? "INR";

  const [returns, setReturns] = useState<ReturnBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] =
    useState<ReturnStatusFilter>("pending");

  const fetchReturns = useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    try {
      const filter: ReturnFilter = {};
      if (statusFilter === "pending") filter.status = ReturnStatus.Pending;
      else if (statusFilter === "approved")
        filter.status = ReturnStatus.Approved;
      else if (statusFilter === "rejected")
        filter.status = ReturnStatus.Rejected;
      const data = await api.listReturns(shopId, filter);
      const sorted = [...data].sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt),
      );
      setReturns(sorted);
    } catch {
      toast.error("Failed to load returns");
    } finally {
      setLoading(false);
    }
  }, [api, shopId, statusFilter]);

  useEffect(() => {
    void fetchReturns();
  }, [fetchReturns]);

  const handleApprove = (id: bigint) => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: ReturnStatus.Approved } : r,
      ),
    );
    void fetchReturns();
  };

  const handleReject = (id: bigint) => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: ReturnStatus.Rejected } : r,
      ),
    );
    void fetchReturns();
  };

  const filters: { key: ReturnStatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div data-ocid="admin.returns.panel">
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setStatusFilter(f.key)}
            data-ocid={`admin.returns.filter.${f.key}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors min-h-[36px] ${
              statusFilter === f.key
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <ListSkeleton />
      ) : returns.length === 0 ? (
        <EmptyState
          icon={<RotateCcw className="w-8 h-8 text-muted-foreground" />}
          title="No returns found"
          subtitle={`No ${statusFilter === "all" ? "" : statusFilter} return requests yet.`}
          ocid="admin.returns.empty_state"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {returns.map((ret) => (
            <ReturnCardAdmin
              key={String(ret.id)}
              ret={ret}
              currency={currency}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Users Tab ---

type UserSort = "lastSeen" | "shopName" | "loginCount";
type UserViewExtended = UserView & { isBlocked?: boolean };

interface UserRowProps {
  user: UserViewExtended;
  actor: backendInterface | null;
  index: number;
  onDelete: (principal: string) => void;
  onBlock: (principal: string, blocked: boolean) => void;
}

function UserRow({ user, actor, index, onDelete, onBlock }: UserRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState<AdminNoteView[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [blockLoading, setBlockLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { adminDeleteUser, adminBlockUser } = useApi();

  const loadNotes = useCallback(async () => {
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

  const handleDeleteNote = async (noteId: bigint) => {
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
      toast.success(newBlocked ? "User blocked" : "User unblocked");
    } else {
      toast.error(res.err || "Failed to update user");
    }
    setBlockLoading(false);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    const res = await adminDeleteUser(user.principal);
    if ("ok" in res) {
      toast.success("User deleted");
      onDelete(user.principal);
    } else {
      toast.error(res.err || "Failed to delete user");
    }
    setDeleteLoading(false);
    setDeleteConfirm(false);
  };

  return (
    <>
      <ConfirmDialog
        open={deleteConfirm}
        title="Delete User?"
        description={`Delete user ${truncatePrincipal(user.principal)}? This will permanently remove their account and all associated data. This cannot be undone.`}
        confirmLabel="Delete User"
        loading={deleteLoading}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setDeleteConfirm(false)}
      />
      <div
        className="border border-border rounded-lg overflow-hidden mb-2"
        data-ocid={`admin.users.item.${index}`}
      >
        <div className="flex items-stretch">
          <button
            type="button"
            onClick={handleExpand}
            className="flex-1 text-left px-4 py-3 bg-card hover:bg-muted/40 transition-colors flex items-center gap-3"
            data-ocid={`admin.users.row.${index}`}
          >
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3">
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-mono text-xs text-muted-foreground truncate">
                  {truncatePrincipal(user.principal)}
                </span>
                {user.isBlocked && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] h-4 px-1 ml-1 flex-shrink-0"
                  >
                    Blocked
                  </Badge>
                )}
              </div>
              <div className="sm:col-span-1 font-medium text-sm truncate">
                {user.shopName || "\u2014"}
              </div>
              <div>
                <ShopTypeBadge type={user.shopType} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Last seen: {formatDate(user.lastSeen)}</span>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                  {user.loginCount.toString()} logins
                </span>
              </div>
            </div>
            <div className="shrink-0 text-muted-foreground">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>
          <div className="flex items-center gap-1 px-2 bg-card border-l border-border">
            <button
              type="button"
              onClick={() => void handleBlock()}
              disabled={blockLoading}
              title={user.isBlocked ? "Unblock user" : "Block user"}
              aria-label={user.isBlocked ? "Unblock user" : "Block user"}
              className={`w-7 h-7 rounded flex items-center justify-center transition-colors disabled:opacity-50 ${
                user.isBlocked
                  ? "text-green-600 hover:bg-green-500/10"
                  : "text-orange-500 hover:bg-orange-500/10"
              }`}
              data-ocid={`admin.users.block_button.${index}`}
            >
              {blockLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              title="Delete user permanently"
              aria-label="Delete user"
              className="w-7 h-7 rounded flex items-center justify-center text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
              data-ocid={`admin.users.delete_button.${index}`}
            >
              <UserX className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="px-4 py-4 bg-background border-t border-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-wide">
                  Full Principal
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-mono text-xs break-all">
                    {user.principal}
                  </span>
                  <CopyButton text={user.principal} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-wide">
                  First Seen
                </span>
                <p className="mt-1 text-sm">{formatDate(user.firstSeen)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Admin Notes
              </p>
              {notesLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading
                  notes...
                </div>
              ) : (
                <div className="space-y-2 mb-3">
                  {notes.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">
                      No notes yet.
                    </p>
                  )}
                  {notes.map((note) => (
                    <div
                      key={note.noteId.toString()}
                      className="flex items-start gap-2 p-2 rounded-md bg-muted/30 border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {formatDate(note.createdAt)}
                        </p>
                        <p className="text-sm break-words">{note.content}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleDeleteNote(note.noteId)}
                        disabled={deletingId === note.noteId}
                        className="shrink-0 text-destructive/70 hover:text-destructive transition-colors disabled:opacity-50"
                        aria-label="Delete note"
                        data-ocid={`admin.users.delete_note_button.${index}`}
                      >
                        {deletingId === note.noteId ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <div className="relative">
                  <Textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value.slice(0, 500))}
                    placeholder="Add a note in English..."
                    rows={2}
                    className="resize-none pr-16 text-sm"
                    data-ocid={`admin.users.textarea.${index}`}
                  />
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
                    {noteText.length}/500
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => void handleAddNote()}
                  disabled={!noteText.trim() || addingNote}
                  data-ocid={`admin.users.add_note_button.${index}`}
                >
                  {addingNote ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : null}
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// --- Shops Tab ---

type ShopSort = "lastActivity" | "shopName";

interface ShopRowProps {
  shop: ShopAdminView;
  actor: backendInterface | null;
  index: number;
  onToggle: (principal: string, disabled: boolean) => void;
  onDelete: (principal: string) => void;
}

function ShopRow({ shop, actor, index, onToggle, onDelete }: ShopRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
      toast.success(`Shop "${shop.shopName}" deleted`);
      onDelete(shop.principal);
    } else {
      toast.error(res.err || "Failed to delete shop");
    }
    setDeleteLoading(false);
    setDeleteConfirm(false);
  };

  return (
    <>
      <ConfirmDialog
        open={deleteConfirm}
        title={`Delete "${shop.shopName}"?`}
        description="This will permanently delete all products, bills and data for this shop. This cannot be undone."
        confirmLabel="Delete Shop"
        loading={deleteLoading}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setDeleteConfirm(false)}
      />
      <div
        className={`border rounded-lg overflow-hidden mb-2 transition-opacity ${
          shop.isDisabled ? "border-destructive/30 opacity-70" : "border-border"
        }`}
        data-ocid={`admin.shops.item.${index}`}
      >
        <div className="flex items-stretch">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex-1 text-left px-4 py-3 bg-card hover:bg-muted/40 transition-colors flex items-center gap-3"
            data-ocid={`admin.shops.row.${index}`}
          >
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-3 items-center">
              <div className="font-medium text-sm truncate">
                {shop.shopName || "\u2014"}
              </div>
              <div>
                <ShopTypeBadge type={shop.shopType} />
              </div>
              <div className="text-xs text-muted-foreground">
                {shop.currency} &middot; {shop.taxSystem}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {truncatePrincipal(shop.principal)}
                </span>
                {shop.isDisabled ? (
                  <Badge variant="destructive" className="text-xs">
                    Disabled
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs text-accent border-accent/40"
                  >
                    Active
                  </Badge>
                )}
              </div>
            </div>
            <div className="shrink-0 text-muted-foreground">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>
          <div className="flex items-center px-2 bg-card border-l border-border">
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              title="Delete shop permanently"
              aria-label="Delete shop"
              className="w-7 h-7 rounded flex items-center justify-center text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
              data-ocid={`admin.shops.delete_button.${index}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="px-4 py-4 bg-background border-t border-border space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Full Principal
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="font-mono text-xs break-all">
                    {shop.principal}
                  </span>
                  <CopyButton text={shop.principal} />
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Language
                </span>
                <p className="mt-1">{shop.language}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Currency
                </span>
                <p className="mt-1">{shop.currency}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Tax System
                </span>
                <p className="mt-1">{shop.taxSystem}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Shop Type
                </span>
                <p className="mt-1">{shop.shopType}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant={shop.isDisabled ? "default" : "outline"}
                size="sm"
                onClick={() => void handleToggle()}
                disabled={toggling}
                data-ocid={`admin.shops.toggle.${index}`}
              >
                {toggling ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : null}
                {shop.isDisabled ? "Enable Shop" : "Disable Shop"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDeleteConfirm(true)}
                data-ocid={`admin.shops.delete_confirm_button.${index}`}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete Shop
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// --- Main Page ---

export function AdminPanelPage() {
  const { clear: logout } = useInternetIdentity();
  const navigate = useNavigate();
  const { actor } = useActor<backendInterface>(createActor);
  const { shopConfig } = useStore();

  const { isSuperAdmin, isChecking } = useSuperAdmin();

  const [authState, setAuthState] = useState<
    "checking" | "authorized" | "denied"
  >("checking");
  const [activeTab, setActiveTab] = useState<"users" | "shops" | "returns">(
    "users",
  );

  const [users, setUsers] = useState<UserViewExtended[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userSort, setUserSort] = useState<UserSort>("lastSeen");

  const [shops, setShops] = useState<ShopAdminView[]>([]);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [shopSearch, setShopSearch] = useState("");
  const [shopSort, setShopSort] = useState<ShopSort>("lastActivity");

  const initDone = useRef(false);

  useEffect(() => {
    if (isChecking) return;
    setAuthState(isSuperAdmin ? "authorized" : "denied");
  }, [isChecking, isSuperAdmin]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: actor change must reset initDone guard
  useEffect(() => {
    initDone.current = false;
  }, [actor]);

  useEffect(() => {
    if (authState === "denied") {
      void navigate({ to: "/dashboard" });
    }
  }, [authState, navigate]);

  useEffect(() => {
    if (authState !== "authorized" || !actor || activeTab !== "users") return;
    const load = async () => {
      setUsersLoading(true);
      const res = await actor.getAllUsers();
      if (res.__kind__ === "ok") setUsers(res.ok);
      setUsersLoading(false);
    };
    void load();
  }, [authState, actor, activeTab]);

  useEffect(() => {
    if (authState !== "authorized" || !actor || activeTab !== "shops") return;
    const load = async () => {
      setShopsLoading(true);
      const res = await actor.getAllShops();
      if (res.__kind__ === "ok") setShops(res.ok);
      setShopsLoading(false);
    };
    void load();
  }, [authState, actor, activeTab]);

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase();
    const filtered = q
      ? users.filter(
          (u) =>
            u.shopName.toLowerCase().includes(q) ||
            u.principal.toLowerCase().startsWith(q),
        )
      : users;
    return [...filtered].sort((a, b) => {
      if (userSort === "lastSeen") return Number(b.lastSeen - a.lastSeen);
      if (userSort === "shopName") return a.shopName.localeCompare(b.shopName);
      return Number(b.loginCount - a.loginCount);
    });
  }, [users, userSearch, userSort]);

  const filteredShops = useMemo(() => {
    const q = shopSearch.toLowerCase();
    const filtered = q
      ? shops.filter((s) => s.shopName.toLowerCase().includes(q))
      : shops;
    return [...filtered].sort((a, b) => {
      if (shopSort === "shopName") return a.shopName.localeCompare(b.shopName);
      return 0;
    });
  }, [shops, shopSearch, shopSort]);

  const handleShopToggle = (principal: string, disabled: boolean) => {
    setShops((prev) =>
      prev.map((s) =>
        s.principal === principal ? { ...s, isDisabled: disabled } : s,
      ),
    );
  };

  const handleShopDelete = (principal: string) => {
    setShops((prev) => prev.filter((s) => s.principal !== principal));
    if (shopConfig?.shopName) {
      const deletedShop = shops.find((s) => s.principal === principal);
      if (deletedShop && deletedShop.shopName === shopConfig.shopName) {
        toast.info("Active shop deleted — please switch to another shop");
      }
    }
  };

  const handleUserDelete = (principal: string) => {
    setUsers((prev) => prev.filter((u) => u.principal !== principal));
  };

  const handleUserBlock = (principal: string, blocked: boolean) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.principal === principal ? { ...u, isBlocked: blocked } : u,
      ),
    );
  };

  if (authState === "checking" || isChecking) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  if (authState === "denied") return null;

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="admin.page"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-violet-500" />
            </div>
            <h1 className="font-display font-semibold text-lg">
              Super Admin Panel
            </h1>
            <Badge variant="outline" className="text-xs hidden sm:inline-flex">
              univarsalshop.com
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void navigate({ to: "/dashboard" })}
              className="gap-1.5"
              data-ocid="admin.back_button"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                void navigate({ to: "/", replace: true });
              }}
              className="gap-1.5 text-destructive hover:text-destructive"
              data-ocid="admin.logout_button"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex gap-0">
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.users.tab"
          >
            <Users className="w-4 h-4" />
            Users
            {users.length > 0 && (
              <span className="rounded-full bg-primary/10 text-primary text-xs px-1.5 py-0.5 font-semibold">
                {users.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("shops")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "shops"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.shops.tab"
          >
            <Building2 className="w-4 h-4" />
            Shops
            {shops.length > 0 && (
              <span className="rounded-full bg-primary/10 text-primary text-xs px-1.5 py-0.5 font-semibold">
                {shops.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("returns")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "returns"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.returns.tab"
          >
            <RotateCcw className="w-4 h-4" />
            Returns
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* Users Tab */}
        {activeTab === "users" && (
          <div data-ocid="admin.users.panel">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by shop name or principal prefix..."
                  className="pl-9"
                  data-ocid="admin.users.search_input"
                />
              </div>
              <div className="flex gap-1.5">
                <SortButton
                  active={userSort === "lastSeen"}
                  onClick={() => setUserSort("lastSeen")}
                  label="Last Seen"
                  ocid="admin.users.sort_last_seen"
                />
                <SortButton
                  active={userSort === "shopName"}
                  onClick={() => setUserSort("shopName")}
                  label="Name A-Z"
                  ocid="admin.users.sort_name"
                />
                <SortButton
                  active={userSort === "loginCount"}
                  onClick={() => setUserSort("loginCount")}
                  label="Logins"
                  ocid="admin.users.sort_logins"
                />
              </div>
            </div>

            {usersLoading ? (
              <ListSkeleton />
            ) : filteredUsers.length === 0 ? (
              <EmptyState
                icon={<Users className="w-8 h-8 text-muted-foreground" />}
                title="No users found"
                subtitle={
                  userSearch
                    ? "Try a different search term."
                    : "No users have logged in yet."
                }
                ocid="admin.users.empty_state"
              />
            ) : (
              filteredUsers.map((user, i) => (
                <UserRow
                  key={user.principal}
                  user={user}
                  actor={actor}
                  index={i + 1}
                  onDelete={handleUserDelete}
                  onBlock={handleUserBlock}
                />
              ))
            )}
          </div>
        )}

        {/* Shops Tab */}
        {activeTab === "shops" && (
          <div data-ocid="admin.shops.panel">
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={shopSearch}
                  onChange={(e) => setShopSearch(e.target.value)}
                  placeholder="Search by shop name..."
                  className="pl-9"
                  data-ocid="admin.shops.search_input"
                />
              </div>
              <div className="flex gap-1.5">
                <SortButton
                  active={shopSort === "lastActivity"}
                  onClick={() => setShopSort("lastActivity")}
                  label="Last Active"
                  ocid="admin.shops.sort_last_active"
                />
                <SortButton
                  active={shopSort === "shopName"}
                  onClick={() => setShopSort("shopName")}
                  label="Name A-Z"
                  ocid="admin.shops.sort_name"
                />
              </div>
            </div>

            {shopsLoading ? (
              <ListSkeleton />
            ) : filteredShops.length === 0 ? (
              <EmptyState
                icon={<Building2 className="w-8 h-8 text-muted-foreground" />}
                title="No shops found"
                subtitle={
                  shopSearch
                    ? "Try a different search term."
                    : "No shops registered yet."
                }
                ocid="admin.shops.empty_state"
              />
            ) : (
              filteredShops.map((shop, i) => (
                <ShopRow
                  key={shop.principal}
                  shop={shop}
                  actor={actor}
                  index={i + 1}
                  onToggle={handleShopToggle}
                  onDelete={handleShopDelete}
                />
              ))
            )}
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && <ReturnsTab />}
      </main>
    </div>
  );
}

// --- Tiny shared components ---

function SortButton({
  active,
  onClick,
  label,
  ocid,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
      }`}
      data-ocid={ocid}
    >
      {label}
    </button>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-2" data-ocid="admin.loading_state">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-14 rounded-lg bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
  ocid,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  ocid: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 gap-3 text-center"
      data-ocid={ocid}
    >
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        {icon}
      </div>
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}
