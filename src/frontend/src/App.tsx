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

  // FIX: track whether we just came from a fresh setup (no loading spinner needed)
  // When usm-setup-complete-nav is set, setup just finished — skip isLoading spinner.
  const justCompletedSetup =
    localStorage.getItem("usm-setup-complete-nav") === "1";

  // Safety timeout — if II never resolves, unblock routing after 5s
  useEffect(() => {
    if (loginStatus !== "initializing") return;
    const timer = setTimeout(() => {
      console.log(
        "[Auth] Safety timeout fired — II still initializing after 5s, forcing authChecking=false",
      );
      setAuthChecking(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [loginStatus]);

  // Safety timeout for isLoading — if backend init hangs, returning users
  // (setupAlreadyDone=true) should not see a perpetual spinner.
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIsLoading = useStore.getState().isLoading;
      if (currentIsLoading) {
        console.log(
          "[Auth] isLoading safety timeout fired — backend init hung after 8s, forcing isLoading=false",
        );
        setIsLoading(false);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    console.log("[Auth] loginStatus changed:", loginStatus);
    console.log(
      "[Auth] identity:",
      identity ? identity.getPrincipal().toText() : "null",
    );
    if (loginStatus !== "initializing") {
      setAuthChecking(false);
      console.log("[Auth] authChecking: false (loginStatus resolved)");
    }
  }, [loginStatus, identity]);

  // Debug log
  console.log("[Auth] RootLayout state:", {
    loginStatus,
    isAuthenticated: !!identity,
    principalText,
    isRegisteredLocally,
    isSetupComplete,
    setupAlreadyDone,
    authChecking,
    justCompletedSetup,
  });

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
  ]);

  // While II is still initialising, show full-screen loading spinner.
  // NEVER redirect to login or show SetupPage during auth loading.
  if (authChecking) {
    console.log("[Route] Decision: showing loading because authChecking=true");
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
    console.log(
      "[Route] Decision: showing dashboard/outlet because setupAlreadyDone=true",
    );

    // Show loading spinner for RETURNING users on cold boot only.
    // If justCompletedSetup=true, skip the spinner — setup just finished
    // and the user is being navigated in; showing a spinner here causes
    // the login-loop (spinner → identity not yet confirmed → redirect to setup).
    if (isLoading && !justCompletedSetup) {
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
    console.log("[Route] Decision: showing SetupPage because isLoggedOut=true");
    return (
      <Suspense fallback={<PageSpinner />}>
        <SetupPage />
      </Suspense>
    );
  }

  // Authenticated but setup not done
  if (!setupAlreadyDone) {
    console.log(
      "[Route] Decision: showing SetupPage because !setupAlreadyDone",
    );
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
