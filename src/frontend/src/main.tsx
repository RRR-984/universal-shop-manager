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
  //   usm-reg-* : registration markers (one per principal, written once, must NEVER be cleared)
  //   usm-admin-*: admin principal markers (not used anymore but keep for safety)
  // These markers tell the app "this user has already completed setup" and
  // "this principal is the super admin". Clearing them forces users through
  // the setup wizard again and breaks admin detection after deployment.
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
      !key.startsWith("usm-reg-") && // CRITICAL: registration markers must survive cache clear
      !key.startsWith("usm-admin-") && // preserve any existing admin markers
      !key.startsWith("usm-store") && // preserve Zustand shop config / setup state
      key !== "usm-setup-done" // CRITICAL: setup-done flag must survive cache clear
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
