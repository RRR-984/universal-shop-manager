import { useEffect, useState } from "react";

const STORAGE_KEY = "usm-install-dismissed";

type DismissState = "never" | "permanent" | "installed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Globe/orbit SVG matching the app's existing logo style
function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-10 h-10 flex-shrink-0"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ig" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="7.5"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1.6"
        transform="rotate(-22 24 24)"
        opacity=".8"
      />
      <circle cx="24" cy="24" r="13.5" fill="url(#ig)" />
      <ellipse
        cx="24"
        cy="24"
        rx="13.5"
        ry="4.2"
        fill="none"
        stroke="rgba(255,255,255,.22)"
        strokeWidth=".9"
      />
      <path
        d="M24 10.5 C 30 17,30 31,24 37.5 C 18 31,18 17,24 10.5 Z"
        fill="none"
        stroke="rgba(255,255,255,.2)"
        strokeWidth=".9"
      />
    </svg>
  );
}

export function InstallPromptPopup() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Detect platform
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  // Already running as installed standalone app — never show
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true;

  const dismissState = localStorage.getItem(STORAGE_KEY) as DismissState | null;

  // iOS never fires beforeinstallprompt — we still show manual instructions.
  // For Android/Desktop we need the deferred event OR we show manual instructions.
  const shouldShow =
    !isStandalone &&
    dismissState !== "permanent" &&
    dismissState !== "installed" &&
    !sessionDismissed;

  // On mount: read the globally captured beforeinstallprompt event.
  // The index.html inline script captures it before React mounts, storing it
  // on window.deferredInstallPrompt so we never miss it due to timing.
  useEffect(() => {
    const stored = (
      window as { deferredInstallPrompt?: BeforeInstallPromptEvent }
    ).deferredInstallPrompt;
    if (stored) {
      setDeferredPrompt(stored);
    }
    // Also listen in case it fires after mount (some browsers fire it later)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Show popup after 5s delay if conditions are met
  useEffect(() => {
    if (!shouldShow) return;
    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [shouldShow]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(STORAGE_KEY, "installed");
      closePopup();
    }
    setDeferredPrompt(null);
  };

  const handleRemindLater = () => {
    setSessionDismissed(true);
    closePopup();
  };

  const handleDontShow = () => {
    localStorage.setItem(STORAGE_KEY, "permanent");
    closePopup();
  };

  const closePopup = () => {
    setIsAnimating(false);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  // Show install button if native prompt available (Android/Desktop),
  // or manual instructions toggle for all mobile platforms
  const hasNativePrompt = !!deferredPrompt;

  return (
    <dialog
      aria-modal="false"
      aria-label="Install Universal Shop Manager"
      data-ocid="install_prompt.dialog"
      className={[
        "fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[9999]",
        "w-[calc(100vw-2rem)] max-w-sm",
        "rounded-2xl shadow-2xl",
        "bg-slate-900 border border-blue-500/25",
        "transition-all duration-350 ease-out",
        isAnimating
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none",
      ].join(" ")}
      style={{
        transform: `translateX(-50%) translateY(${isAnimating ? "0" : "2rem"})`,
      }}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full" />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <GlobeIcon />
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-white font-semibold text-base leading-tight">
              Install App
            </p>
            <p className="text-slate-400 text-xs leading-snug mt-0.5">
              univarsalshop.com — add to your home screen for instant access
            </p>
          </div>
          <button
            type="button"
            data-ocid="install_prompt.close_button"
            onClick={handleRemindLater}
            aria-label="Dismiss install prompt"
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-700/60 transition-colors mt-0.5"
          >
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 4 L12 12 M12 4 L4 12" />
            </svg>
          </button>
        </div>

        {/* iOS instructions — always shown inline for iOS (no native prompt) */}
        {isIOS && !showInstructions && (
          <div
            data-ocid="install_prompt.instructions_panel"
            className="mb-3 px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20"
          >
            <p className="text-blue-300 text-xs leading-relaxed">
              <span className="font-semibold block mb-1">iPhone / iPad:</span>
              Tap the{" "}
              <span className="font-semibold">
                Share{" "}
                <svg
                  className="inline w-3 h-3 mb-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </span>{" "}
              button in Safari, then tap{" "}
              <span className="font-semibold">
                &ldquo;Add to Home Screen&rdquo;
              </span>
              .
            </p>
          </div>
        )}

        {/* Android manual instructions panel (toggled) */}
        {showInstructions && isAndroid && (
          <div
            data-ocid="install_prompt.instructions_panel"
            className="mb-3 px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20"
          >
            <p className="text-blue-300 text-xs leading-relaxed">
              <span className="font-semibold block mb-1">Android:</span>
              Tap the <span className="font-semibold">⋮ menu</span> in Chrome,
              then tap{" "}
              <span className="font-semibold">
                &ldquo;Add to Home Screen&rdquo;
              </span>{" "}
              or{" "}
              <span className="font-semibold">&ldquo;Install App&rdquo;</span>.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          {/* Native install button — Android/Desktop when prompt is available */}
          {hasNativePrompt && (
            <button
              type="button"
              data-ocid="install_prompt.install_button"
              onClick={handleInstall}
              className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Install Now
            </button>
          )}

          {/* Mobile manual instructions toggle (Android only — iOS shows inline above) */}
          {isMobile && !isIOS && (
            <button
              type="button"
              data-ocid="install_prompt.add_to_homescreen_button"
              onClick={() => setShowInstructions((p) => !p)}
              className="w-full h-10 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-300 text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-blue-500/20"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {showInstructions ? "Hide Instructions" : "Add to Home Screen"}
            </button>
          )}

          {/* Bottom row: Remind Later + Don't Show */}
          <div className="flex items-center justify-between pt-0.5">
            <button
              type="button"
              data-ocid="install_prompt.remind_later_button"
              onClick={handleRemindLater}
              className="text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors px-1 py-1 rounded-lg hover:bg-slate-700/40"
            >
              Remind Later
            </button>
            <button
              type="button"
              data-ocid="install_prompt.dont_show_button"
              onClick={handleDontShow}
              className="text-slate-600 hover:text-slate-400 text-xs transition-colors px-1 py-1 rounded-lg hover:bg-slate-700/40"
            >
              Don&apos;t Show Again
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
