import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { useApi } from "./lib/api";
import { setLanguage } from "./lib/i18n";
import { useStore } from "./lib/store";

// Lazy page imports
import { Suspense, lazy } from "react";
import { InstallPromptPopup } from "./components/InstallPromptPopup";
import { SuperAdminProvider } from "./context/SuperAdminContext";

const SetupPage = lazy(() =>
  import("./pages/SetupPage").then((m) => ({ default: m.SetupPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ProductsPage = lazy(() =>
  import("./pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const BulkEntryPage = lazy(() =>
  import("./pages/BulkEntryPage").then((m) => ({ default: m.BulkEntryPage })),
);
const BulkSellPage = lazy(() =>
  import("./pages/BulkSellPage").then((m) => ({ default: m.BulkSellPage })),
);
const BillingPage = lazy(() =>
  import("./pages/BillingPage").then((m) => ({ default: m.BillingPage })),
);
const HistoryPage = lazy(() =>
  import("./pages/HistoryPage").then((m) => ({ default: m.HistoryPage })),
);
const SettingsPage = lazy(() =>
  import("./pages/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);
const AdminPanelPageLazy = lazy(() =>
  import("./pages/AdminPanelPage").then((m) => ({ default: m.AdminPanelPage })),
);
const PublicBillPage = lazy(() =>
  import("./pages/PublicBillPage").then((m) => ({ default: m.PublicBillPage })),
);
const CustomersPage = lazy(() =>
  import("./pages/CustomersPage").then((m) => ({ default: m.CustomersPage })),
);

const PageSpinner = () => (
  <div className="flex-1 flex items-center justify-center min-h-[200px]">
    <Loader2 className="w-6 h-6 animate-spin text-primary" />
  </div>
);
// Root layout component
function RootLayout() {
  const {
    getShopConfig,
    isSetupComplete: checkSetupComplete,
    recordUserLogin,
    checkIfBlocked,
    initAdmin,
    getMyRole,
    ready,
  } = useApi();
  const {
    syncActiveShopFromBackend,
    setIsSetupComplete,
    setIsLoading,
    setUserRole,
  } = useStore();
  const isSetupComplete = useStore((s) => s.isSetupComplete);
  const isLoading = useStore((s) => s.isLoading);
  const { identity, isAuthenticated, loginStatus } = useInternetIdentity();

  // ── SINGLE SOURCE OF TRUTH: localStorage marker ───────────────────────────
  const principalText = identity?.getPrincipal().toText() ?? null;

  // Synchronous check — localStorage is always reliable and immediate.
  // MUST be evaluated on every render so fresh navigations pick up new markers.
  const isRegisteredLocally =
    (principalText !== null &&
      localStorage.getItem(`usm-reg-${principalText}`) === "true") ||
    localStorage.getItem("usm-setup-done") === "true";

  // setupAlreadyDone: ANY of the three reliable signals is sufficient.
  // localStorage is checked FIRST — it's synchronous and never lies.
  const setupAlreadyDone = isRegisteredLocally || isSetupComplete === true;

  // ── AUTH CHECKING: block all routing until II loginStatus resolves ─────────
  const [authChecking, setAuthChecking] = useState(
    loginStatus === "initializing",
  );
  const [isUserBlocked, setIsUserBlocked] = useState(false);

  // FIX: Handle the usm-nav-to-dashboard flag set by SetupPage.
  // This flag is written synchronously before navigate, so it's always
  // present when App first mounts after setup. Remove it immediately and
  // redirect to avoid any auth-state race condition.
  useEffect(() => {
    if (localStorage.getItem("usm-nav-to-dashboard") === "true") {
      localStorage.removeItem("usm-nav-to-dashboard");
      window.location.replace("/dashboard");
    }
  }, []);

  // Safety timeout — if II never resolves, unblock routing after 30s.
  // Do NOT show the setup wizard on timeout — only unblock the spinner.
  useEffect(() => {
    if (loginStatus !== "initializing") return;
    const timer = setTimeout(() => {
      setAuthChecking(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, [loginStatus]);

  // Safety timeout for isLoading — if backend init hangs, returning users
  // (setupAlreadyDone=true) should not see a perpetual spinner.
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIsLoading = useStore.getState().isLoading;
      if (currentIsLoading) {
        setIsLoading(false);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    if (loginStatus !== "initializing") {
      setAuthChecking(false);
    }
  }, [loginStatus]);

  // ── Background sync: load backend config for freshness ───────────────────
  useEffect(() => {
    if (!ready) return;
    const init = async () => {
      try {
        const [config, setupDone] = await Promise.all([
          getShopConfig(),
          checkSetupComplete(),
        ]);
        if (config) {
          syncActiveShopFromBackend(config);
          setLanguage(config.language);
          void recordUserLogin(config.shopName, config.shopType);
          // Check if user has been blocked by admin
          const blocked = await checkIfBlocked();
          if (blocked) {
            setIsUserBlocked(true);
            setIsLoading(false);
            return;
          }
          try {
            const role = await getMyRole(config.shopName);
            setUserRole(role);
          } catch {
            // default: treat as owner on error
          }
          if (setupDone && principalText) {
            localStorage.setItem(`usm-reg-${principalText}`, "true");
          }
        }
        void initAdmin();
        if (setupDone || isRegisteredLocally) {
          setIsSetupComplete(true);
        }
      } finally {
        setIsLoading(false);
        // Clear the fresh-setup nav flag now that backend init is done
        localStorage.removeItem("usm-setup-complete-nav");
      }
    };
    void init();
  }, [
    ready,
    principalText,
    isRegisteredLocally,
    getShopConfig,
    checkSetupComplete,
    recordUserLogin,
    initAdmin,
    getMyRole,
    syncActiveShopFromBackend,
    setIsSetupComplete,
    setIsLoading,
    setUserRole,
    checkIfBlocked,
  ]);

  // Blocked user screen — shown before any routing
  if (isUserBlocked) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⛔</div>
        <h2
          style={{
            color: "#dc2626",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Account Blocked
        </h2>
        <p style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
          Aapka account block kar diya gaya hai.
        </p>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Your account has been blocked. Please contact support.
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.clear();
            window.location.replace("/");
          }}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // While II is still initialising, show full-screen loading spinner.
  // NEVER redirect to login or show SetupPage during auth loading.
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // localStorage is synchronous — if the marker is there, the user HAS
  // completed setup. Don't let async identity=null override this fact.
  if (setupAlreadyDone) {
    // Show loading spinner for RETURNING users on cold boot only.
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-sm font-medium">
              Loading Universal Shop System...
            </p>
          </div>
        </div>
      );
    }

    return <Outlet />;
  }

  // Only redirect to login/setup when ALL conditions are truly met:
  // authChecking===false, loginStatus has fully resolved, identity===null,
  // setupAlreadyDone===false.
  const isLoggedOut =
    !isAuthenticated &&
    !identity &&
    loginStatus !== "initializing" &&
    authChecking === false;

  if (isLoggedOut) {
    return (
      <Suspense fallback={<PageSpinner />}>
        <SetupPage />
      </Suspense>
    );
  }

  // Authenticated but setup not done
  if (!setupAlreadyDone) {
    return (
      <Suspense fallback={<PageSpinner />}>
        <SetupPage />
      </Suspense>
    );
  }

  return <Outlet />;
}

// Route tree
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setup",
  component: () => (
    <Suspense fallback={<PageSpinner />}>
      <SetupPage />
    </Suspense>
  ),
});

function AppShell({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <DashboardPage />
      </Suspense>
    </AppShell>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <ProductsPage />
      </Suspense>
    </AppShell>
  ),
});

const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/billing",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <BillingPage />
      </Suspense>
    </AppShell>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <HistoryPage />
      </Suspense>
    </AppShell>
  ),
});

const bulkEntryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bulk-entry",
  beforeLoad: () => {
    const role = useStore.getState().userRole;
    if (role === "staff") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <BulkEntryPage />
      </Suspense>
    </AppShell>
  ),
});

const bulkSellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bulk-sell",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <BulkSellPage />
      </Suspense>
    </AppShell>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  beforeLoad: () => {
    const role = useStore.getState().userRole;
    if (role === "staff") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <SettingsPage />
      </Suspense>
    </AppShell>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    const isAdmin = localStorage.getItem("usm-super-admin-v1") === "1";
    if (!isAdmin) throw redirect({ to: "/dashboard" });
    const role = useStore.getState().userRole;
    if (role === "staff") {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => (
    <Suspense fallback={<PageSpinner />}>
      <AdminPanelPageLazy />
    </Suspense>
  ),
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: () => (
    <AppShell>
      <Suspense fallback={<PageSpinner />}>
        <CustomersPage />
      </Suspense>
    </AppShell>
  ),
});

// Public bill route — no auth required
const publicBillRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bill/$billId",
  component: () => (
    <Suspense fallback={<PageSpinner />}>
      <PublicBillPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  setupRoute,
  dashboardRoute,
  productsRoute,
  bulkEntryRoute,
  bulkSellRoute,
  billingRoute,
  historyRoute,
  settingsRoute,
  adminRoute,
  customersRoute,
  publicBillRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Inner component that reads setupAlreadyDone so InstallPromptPopup is
// only shown after the wizard has been completed — never during setup.
function AppWithInstallPrompt() {
  const isSetupComplete = useStore((s) => s.isSetupComplete);
  const { identity } = useInternetIdentity();
  const principalText = identity?.getPrincipal().toText() ?? null;
  const isRegisteredLocally =
    (principalText !== null &&
      localStorage.getItem(`usm-reg-${principalText}`) === "true") ||
    localStorage.getItem("usm-setup-done") === "true";
  const setupAlreadyDone = isRegisteredLocally || isSetupComplete === true;

  return (
    <>
      {setupAlreadyDone && <InstallPromptPopup />}
      <RouterProvider router={router} />
    </>
  );
}

export default function App() {
  return (
    <SuperAdminProvider>
      <AppWithInstallPrompt />
    </SuperAdminProvider>
  );
}
