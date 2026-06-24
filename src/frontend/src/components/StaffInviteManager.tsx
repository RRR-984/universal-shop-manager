import { Clock, Copy, Link, MessageCircle, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { StaffInviteView } from "../backend";
import { useApi } from "../lib/api";

interface StaffInviteManagerProps {
  shopId: string;
}

export default function StaffInviteManager({
  shopId,
}: StaffInviteManagerProps) {
  const { generateStaffInvite, getStaffInvites, revokeStaffInvite } = useApi();

  const [invites, setInvites] = useState<StaffInviteView[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedInvite, setGeneratedInvite] =
    useState<StaffInviteView | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInvites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffInvites(shopId);
      setInvites(data);
    } catch (_err) {
      setError("Invites load nahi ho sake. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  }, [shopId, getStaffInvites]);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError(null);
    try {
      const invite = await generateStaffInvite(shopId);
      setGeneratedInvite(invite);
      await loadInvites();
    } catch (_err) {
      setError("Invite link generate nahi ho saka. Dobara try karein.");
    } finally {
      setGenerating(false);
    }
  }, [shopId, generateStaffInvite, loadInvites]);

  const handleRevoke = useCallback(
    async (token: string) => {
      setError(null);
      try {
        await revokeStaffInvite(token);
        await loadInvites();
      } catch (_err) {
        setError("Invite revoke nahi ho saka. Dobara try karein.");
      }
    },
    [revokeStaffInvite, loadInvites],
  );

  useEffect(() => {
    loadInvites();
  }, [loadInvites]);

  function getInviteUrl(token: string): string {
    return `${window.location.origin}/join/${token}`;
  }

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Link copy nahi ho saka.");
    }
  }

  function shareOnWhatsApp(url: string) {
    const text = `Aapko staff invite mila hai! Link se join karein: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function formatExpiry(expiresAt: bigint): string {
    const now = BigInt(Date.now()) * 1000000n; // nanoseconds
    const diffNanos = expiresAt - now;
    if (diffNanos <= 0n) return "Expired";

    const diffMs = Number(diffNanos / 1000000n);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const remainingHours = diffHours % 24;

    if (diffDays > 0) {
      return `Bacha hua waqt: ${diffDays} din ${remainingHours} ghante`;
    }
    return `Bacha hua waqt: ${diffHours} ghante`;
  }

  function getStatusBadge(used: boolean, expiresAt: bigint) {
    const now = BigInt(Date.now()) * 1000000n;
    const isExpired = expiresAt <= now;
    if (used) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          Accepted
        </span>
      );
    }
    if (isExpired) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
          Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
        Pending
      </span>
    );
  }

  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4"
      data-ocid="staff-invite-manager"
    >
      <div className="flex items-center gap-2 mb-1">
        <Link className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Staff Invite Links
        </h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Naye staff ke liye invite link banayein. Link 7 din valid rahega.
      </p>

      {error && (
        <div
          className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700"
          data-ocid="staff-invite-error"
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={generating}
        data-ocid="generate-staff-invite-btn"
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Link ban raha hai...
          </>
        ) : (
          <>Naya Staff Invite Link Banaye</>
        )}
      </button>

      {generatedInvite && (
        <div
          className="mt-4 rounded-md bg-green-50 p-3"
          data-ocid="generated-invite-panel"
        >
          <p className="text-sm font-medium text-green-800 mb-2">
            Link ban gaya!
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={getInviteUrl(generatedInvite.token)}
              className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
              data-ocid="invite-link-input"
            />
            <button
              type="button"
              onClick={() =>
                copyToClipboard(getInviteUrl(generatedInvite.token))
              }
              data-ocid="copy-invite-link-btn"
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
            <button
              type="button"
              onClick={() =>
                shareOnWhatsApp(getInviteUrl(generatedInvite.token))
              }
              data-ocid="whatsapp-share-invite-btn"
              className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
          {copied && (
            <p
              className="mt-2 text-sm font-medium text-green-700"
              data-ocid="copy-success-message"
            >
              Link copy ho gaya!
            </p>
          )}
        </div>
      )}

      <hr className="my-4 border-gray-200" />

      <h3 className="text-base font-semibold text-gray-900 mb-3">
        Aapke Invite Links
      </h3>

      {loading ? (
        <div
          className="flex items-center gap-2 text-sm text-gray-600"
          data-ocid="invites-loading-state"
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          Loading invites...
        </div>
      ) : invites.length === 0 ? (
        <p className="text-sm text-gray-500" data-ocid="invites-empty-state">
          Koi invite link nahi hai. Naya link banaye!
        </p>
      ) : (
        <div className="space-y-0" data-ocid="invites-list">
          {invites.map((invite, index) => (
            <div
              key={invite.token}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
              data-ocid={`invite-item.${index + 1}`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-gray-700">
                    {invite.token.slice(0, 8)}...
                  </span>
                  {getStatusBadge(invite.used, invite.expiresAt)}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatExpiry(invite.expiresAt)}
                </div>
                {invite.used && invite.usedBy && (
                  <p className="text-xs text-gray-600">
                    Accepted by: {invite.usedBy.toString().slice(0, 12)}...
                  </p>
                )}
              </div>
              {invite.used === false && (
                <button
                  type="button"
                  onClick={() => handleRevoke(invite.token)}
                  data-ocid="revoke-invite-btn"
                  className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-3 w-3" />
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
