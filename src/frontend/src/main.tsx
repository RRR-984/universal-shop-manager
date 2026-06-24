import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

// Cache-busting: clear stale app state on new deployment
const BUILD_VERSION = import.meta.env.VITE_BUILD_VERSION as string;
const STORED_VERSION_KEY = "app_version";
const storedVersion = localStorage.getItem(STORED_VERSION_KEY);
if (storedVersion !== BUILD_VERSION) {
  // Clear stale app state — but PRESERVE critical permanent markers:
  //   usm-reg-*          : registration markers (one per principal, NEVER clear)
  //   usm-admin-*        : legacy admin markers (keep for safety)
  //   usm-store          : Zustand persisted shop config / setup state
  //   usm-setup-done     : CRITICAL setup-done flag
  // Clearing these forces users through setup wizard or breaks admin detection.
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      key !== STORED_VERSION_KEY &&
      !key.startsWith("ic-") &&
      !key.startsWith("identity") &&
      !key.startsWith("delegation") &&
      !key.startsWith("IDENTITY") &&
      !key.startsWith("auth") &&
      !key.startsWith("usm-reg-") && // CRITICAL: registration markers
      !key.startsWith("usm-admin-") && // legacy admin markers
      !key.startsWith("usm-store") && // Zustand shop config / setup state
      key !== "usm-setup-done" // CRITICAL: setup-done flag
    ) {
      keysToRemove.push(key);
    }
  }
  for (const k of keysToRemove) localStorage.removeItem(k);
  localStorage.setItem(STORED_VERSION_KEY, BUILD_VERSION);
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);

// Register service worker for PWA install eligibility.
// Must happen after render so it doesn't block initial paint.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // SW registration failure is non-critical — app still works
    });
  });
}
