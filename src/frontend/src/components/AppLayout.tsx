import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plus,
  Receipt,
  Settings,
  Shield,
  Trash2,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  resetSuperAdminCache,
  useSuperAdmin,
} from "../context/SuperAdminContext";
import { isRTL, t } from "../lib/i18n";
import { useStore } from "../lib/store";
import { cn } from "../lib/utils";
import Logo from "./Logo";

// ── Shop Type Label Map ──────────────────────────────────────────────────────

const SHOP_TYPE_LABELS: Record<string, string> = {
  Mobile: "Mobile Shop",
  Electronics: "Electronics Store",
  Medical: "Pharmacy / Medical",
  Clothing: "Clothing / Fashion",
  Footwear: "Footwear / Shoes",
  Grocery: "Grocery / Supermarket",
  Stationery: "Stationery / Office",
  Restaurant: "Restaurant / Cafe",
  AutoParts: "Auto Parts",
  Hardware: "Hardware Store",
  Jewelry: "Jewelry Store",
  Salon: "Salon / Beauty",
  General: "General Store",
  BuildingMaterial: "Building Material",
  Electrical: "Electrical Shop",
  AgroProducts: "Agro Products",
  FruitsVegetables: "Fruits & Vegetables",
};

function getShopTypeLabel(shopType?: string): string {
  if (!shopType) return "";
  return SHOP_TYPE_LABELS[shopType] ?? shopType;
}

type NavItem = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  route: string;
};

// Nav items with ownerOnly flag
type NavItemWithRole = NavItem & { ownerOnly?: boolean };

const ADMIN_NAV_ITEM_BASE: NavItemWithRole = {
  id: "admin",
  label: "admin" as Parameters<typeof t>[0],
  icon: Shield,
  route: "/admin",
  ownerOnly: true,
};

const NAV_ITEMS: NavItemWithRole[] = [
  {
    id: "dashboard",
    label: "dashboard",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  { id: "products", label: "products", icon: Package, route: "/products" },
  {
    id: "bulkEntry",
    label: "bulkEntry",
    icon: ClipboardList,
    route: "/bulk-entry",
    ownerOnly: true,
  },
  { id: "newBill", label: "newBill", icon: Receipt, route: "/billing" },
  { id: "billHistory", label: "billHistory", icon: History, route: "/history" },
  {
    id: "customers",
    label: "customers" as Parameters<typeof t>[0],
    icon: UserCircle,
    route: "/customers",
  },
  {
    id: "settings",
    label: "settings",
    icon: Settings,
    route: "/settings",
    ownerOnly: true,
  },
];

// ── Shop Selector Dropdown ───────────────────────────────────────────────────

function ShopSelectorDropdown({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const shops = useStore((s) => s.shops);
  const shopConfig = useStore((s) => s.shopConfig);
  const selectedShopIds = useStore((s) => s.selectedShopIds);
  const { setActiveShop, toggleShopSelection, selectShops, removeShop } =
    useStore();

  const MAX_SHOPS = 5;
  const atLimit = shops.length >= MAX_SHOPS;

  const allSelected =
    shops.length > 0 && selectedShopIds.length === shops.length;
  // Use stored activeShopId (single source of truth). Fall back to name+country
  // only as a migration safety net for older persisted state without activeShopId.
  const storedActiveShopId = useStore((s) => s.activeShopId);
  const activeShopId =
    storedActiveShopId ??
    shops.find(
      (s) =>
        s.shopName === shopConfig?.shopName &&
        s.country === shopConfig?.country,
    )?.id;

  const handleSelectAll = () => {
    if (allSelected) {
      selectShops(activeShopId ? [activeShopId] : []);
    } else {
      selectShops(shops.map((s) => s.id));
    }
  };

  const handleShopClick = (id: string) => {
    setActiveShop(id);
    onClose();
  };

  const handleAddShop = async () => {
    if (atLimit) return;
    onClose();
    await navigate({ to: "/setup", search: { mode: "add" } });
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (shops.length === 1) return; // Can't remove last shop
    removeShop(id);
  };

  return (
    <div
      data-ocid="shop_selector.dropdown"
      className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded-xl shadow-elevated z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border flex items-center justify-between bg-muted/30">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Shops ({shops.length}/{MAX_SHOPS})
        </span>
        <div className="flex items-center gap-1.5">
          {shops.length > 1 && (
            <button
              type="button"
              data-ocid="shop_selector.select_all_toggle"
              onClick={handleSelectAll}
              className="text-[10px] font-medium text-primary hover:underline px-1.5 py-0.5 rounded"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
          )}
          {selectedShopIds.length > 0 && (
            <Badge
              variant="secondary"
              className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20"
            >
              {selectedShopIds.length} selected
            </Badge>
          )}
        </div>
      </div>

      {/* Shop List */}
      <div className="max-h-64 overflow-y-auto py-1">
        {shops.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No shops yet
          </div>
        ) : (
          shops.map((shop, i) => {
            const isActive = shop.id === activeShopId;
            const isSelected = selectedShopIds.includes(shop.id);
            return (
              <div
                key={shop.id}
                data-ocid={`shop_selector.item.${i + 1}`}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors group",
                  isActive ? "bg-primary/8" : "hover:bg-secondary",
                )}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  data-ocid={`shop_selector.checkbox.${i + 1}`}
                  aria-label={`${isSelected ? "Deselect" : "Select"} ${shop.shopName}`}
                  onClick={() => toggleShopSelection(shop.id)}
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-border hover:border-primary/60",
                  )}
                >
                  {isSelected && (
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  )}
                </button>

                {/* Shop Info */}
                <button
                  type="button"
                  onClick={() => handleShopClick(shop.id)}
                  className="flex items-center gap-2 flex-1 min-w-0 text-left"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {shop.shopName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-medium truncate leading-tight",
                        isActive ? "text-primary" : "text-foreground",
                      )}
                    >
                      {shop.shopName}
                    </p>
                    {shop.shopType && (
                      <p className="text-[10px] text-primary/70 font-medium truncate leading-none mb-0.5">
                        {getShopTypeLabel(shop.shopType)}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground truncate">
                      {shop.country} &middot; {shop.currency}
                    </p>
                  </div>
                  {isActive && (
                    <Badge
                      variant="secondary"
                      className="text-[9px] h-4 px-1 bg-primary/10 text-primary border-primary/20 flex-shrink-0"
                    >
                      Active
                    </Badge>
                  )}
                </button>

                {/* Remove */}
                {shops.length > 1 && (
                  <button
                    type="button"
                    data-ocid={`shop_selector.delete_button.${i + 1}`}
                    aria-label={`Remove ${shop.shopName}`}
                    onClick={(e) => handleRemove(e, shop.id)}
                    className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-2 space-y-1.5">
        {atLimit ? (
          <div
            data-ocid="shop_selector.limit_message"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
          >
            <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">
              Maximum 5 shops per account reached.
            </span>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="shop_selector.add_shop_button"
            onClick={handleAddShop}
            className="w-full h-8 gap-1.5 text-xs font-medium border-dashed"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Shop
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Shop Selector Trigger ────────────────────────────────────────────────────

function ShopSelectorTrigger({ collapsed }: { collapsed?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shopConfig = useStore((s) => s.shopConfig);
  const shops = useStore((s) => s.shops);
  const selectedShopIds = useStore((s) => s.selectedShopIds);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const multiCount = selectedShopIds.length;

  if (collapsed) {
    return (
      <button
        type="button"
        data-ocid="shop_selector.trigger_button"
        onClick={() => setOpen((p) => !p)}
        className="flex-shrink-0 w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center relative hover:bg-secondary transition-colors"
        aria-label="Shop selector"
        title={shopConfig?.shopName ?? "Universal Shop"}
      >
        <Logo size={24} showText={false} collapsed={true} />
        {shops.length > 1 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground rounded-full text-[9px] font-bold flex items-center justify-center">
            {shops.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        type="button"
        data-ocid="shop_selector.trigger_button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex items-center gap-1 w-full min-w-0 rounded-lg px-1 py-0.5 hover:bg-secondary transition-colors group",
          open && "bg-secondary",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="min-w-0 flex-1 text-left">
          <p className="font-display font-bold text-sm text-foreground truncate leading-tight">
            {shopConfig?.shopName || "Universal Shop"}
          </p>
          <div className="flex items-center gap-1">
            {shopConfig?.shopType && (
              <p className="text-[10px] text-primary/70 font-medium truncate leading-none mb-0.5">
                {getShopTypeLabel(shopConfig.shopType)}
              </p>
            )}
            <p className="text-xs text-muted-foreground truncate">
              {shops.length > 1 ? `${shops.length} shops` : "Manager"}
            </p>
            {multiCount > 1 && (
              <Badge
                variant="secondary"
                className="text-[8px] h-3.5 px-1 bg-primary/10 text-primary border-0"
              >
                {multiCount}
              </Badge>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && <ShopSelectorDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}

// ── AppLayout ────────────────────────────────────────────────────────────────

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const mobileShopRef = useRef<HTMLDivElement>(null);
  const language = useStore((s) => s.language);
  const shopConfig = useStore((s) => s.shopConfig);
  const selectedShopIds = useStore((s) => s.selectedShopIds);
  const userRole = useStore((s) => s.userRole);
  const isOwner = useStore((s) => s.isOwner);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const rtl = isRTL(language);
  const navigate = useNavigate();
  const { clear: logout } = useInternetIdentity();
  const { reset } = useStore();

  // ── Super Admin — belt-and-suspenders: context OR localStorage ───────────
  // Shows immediately from localStorage even before backend check completes.
  // This eliminates the 20+ version bug where the link hid during isChecking.
  const { isSuperAdmin } = useSuperAdmin();
  const showAdminLink =
    isSuperAdmin || localStorage.getItem("usm-super-admin-v1") === "1";

  // Close mobile shop selector on outside click
  useEffect(() => {
    if (!mobileShopOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileShopRef.current &&
        !mobileShopRef.current.contains(e.target as Node)
      ) {
        setMobileShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileShopOpen]);

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ")
      setMobileOpen(false);
  };

  const handleLogout = async () => {
    // 1. Clear module-level super-admin cache so it re-evaluates on next login
    resetSuperAdminCache();
    // 2. Reset Zustand session state BEFORE calling II logout so there is no
    //    window where identity is null but stale shop data is still shown
    reset();
    // 3. Sign out of Internet Identity — this clears the identity object
    logout();
    // 4. Navigate to index. RootLayout now checks identity; without an identity
    //    the app redirects to SetupPage/login. Use replace so pressing Back
    //    doesn't bring them back into the authenticated app.
    await navigate({ to: "/", replace: true });
  };

  return (
    <div
      className={cn("flex h-screen bg-background overflow-hidden")}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-card border-border transition-smooth overflow-hidden flex-shrink-0",
          rtl ? "border-l" : "border-r",
          collapsed ? "w-16" : "w-60",
        )}
      >
        {/* Logo / Brand + Shop Selector */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-4 border-b border-border min-h-[64px]",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? (
            <ShopSelectorTrigger collapsed />
          ) : (
            <>
              <Logo size={36} showText={false} collapsed={true} />
              <ShopSelectorTrigger />
            </>
          )}
        </div>

        {/* Role Badge */}
        {!collapsed && userRole !== null && (
          <div className="px-4 pb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                isOwner()
                  ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400"
                  : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {isOwner() ? "Owner" : "Staff"}
            </span>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {[
            ...NAV_ITEMS.filter((item) => !item.ownerOnly || isOwner()),
            ...(showAdminLink ? [ADMIN_NAV_ITEM_BASE] : []),
          ].map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPath === item.route ||
              (item.route !== "/dashboard" &&
                currentPath.startsWith(item.route));
            return (
              <Link
                key={item.id}
                to={item.route}
                data-ocid={`nav.${item.id}.link`}
                className={cn(
                  "flex items-center gap-3 mx-2 mb-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth min-h-[44px]",
                  collapsed ? "justify-center px-0" : "",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : item.id === "admin"
                      ? "text-violet-500 hover:bg-violet-500/10 hover:text-violet-600 dark:text-violet-400"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                title={
                  collapsed
                    ? item.id === "admin"
                      ? "Super Admin"
                      : item.id === "customers"
                        ? "Customers"
                        : t(item.label as Parameters<typeof t>[0])
                    : undefined
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate">
                    {item.id === "admin"
                      ? "Super Admin"
                      : item.id === "customers"
                        ? "Customers"
                        : t(item.label as Parameters<typeof t>[0])}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          type="button"
          data-ocid="sidebar.collapse_toggle"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center justify-center mx-2 mb-1 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth min-h-[44px]",
            collapsed ? "px-0" : "gap-2",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {rtl ? (
            collapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>

        {/* Logout Button */}
        <button
          type="button"
          data-ocid="sidebar.logout_button"
          onClick={handleLogout}
          className={cn(
            "flex items-center mx-2 mb-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-smooth min-h-[44px]",
            collapsed ? "justify-center px-0" : "gap-3",
          )}
          aria-label="Logout"
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Sidebar Footer */}
        <div
          className={cn(
            "px-3 pb-3 border-t border-border pt-2",
            collapsed && "px-1",
          )}
        >
          {!collapsed ? (
            <div className="text-center space-y-0.5">
              <p className="text-[10px] text-muted-foreground/60 leading-tight">
                © {new Date().getFullYear()} Universal Shop Manager
              </p>
              <span className="text-[10px] text-muted-foreground/40 leading-tight block">
                FIFO BRIDGE
              </span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-6 h-0.5 bg-border rounded-full" />
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden cursor-default"
          onClick={() => setMobileOpen(false)}
          onKeyDown={handleOverlayKeyDown}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 w-72 bg-card border-border z-50 flex flex-col transition-smooth md:hidden",
          rtl ? "right-0 border-l" : "left-0 border-r",
          mobileOpen
            ? "translate-x-0"
            : rtl
              ? "translate-x-full"
              : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border min-h-[64px]">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Logo size={32} showText={true} collapsed={false} />
          </div>
          <button
            type="button"
            data-ocid="mobile_drawer.close_button"
            onClick={() => setMobileOpen(false)}
            className="touch-target flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary ml-2"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Mobile Role Badge */}
        {userRole !== null && (
          <div className="px-4 pb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                isOwner()
                  ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400"
                  : "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {isOwner() ? "Owner" : "Staff"}
            </span>
          </div>
        )}

        <nav className="flex-1 py-3 overflow-y-auto">
          {[
            ...NAV_ITEMS.filter((item) => !item.ownerOnly || isOwner()),
            ...(showAdminLink ? [ADMIN_NAV_ITEM_BASE] : []),
          ].map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPath === item.route ||
              (item.route !== "/dashboard" &&
                currentPath.startsWith(item.route));
            return (
              <Link
                key={item.id}
                to={item.route}
                data-ocid={`mobile_nav.${item.id}.link`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 mx-3 mb-1 px-3 py-3 rounded-lg text-sm font-medium transition-smooth min-h-[44px]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : item.id === "admin"
                      ? "text-primary/70 hover:bg-primary/10 hover:text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>
                  {item.id === "admin"
                    ? "Admin Panel"
                    : item.id === "customers"
                      ? "Customers"
                      : t(item.label as Parameters<typeof t>[0])}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Drawer Logout */}
        <div className="px-3 pb-3 border-t border-border pt-2">
          <button
            type="button"
            data-ocid="mobile_drawer.logout_button"
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-smooth min-h-[44px]"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border min-h-[56px] flex-shrink-0">
          <button
            type="button"
            data-ocid="mobile_header.menu_button"
            onClick={() => setMobileOpen(true)}
            className="touch-target flex items-center justify-center rounded-lg text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Shop Selector */}
          <div
            ref={mobileShopRef}
            className="relative flex items-center gap-1.5"
          >
            <div className="w-7 h-7 bg-card border border-border rounded-md flex items-center justify-center flex-shrink-0">
              <Logo size={20} showText={false} collapsed={true} />
            </div>
            <button
              type="button"
              data-ocid="mobile_shop_selector.trigger_button"
              onClick={() => setMobileShopOpen((p) => !p)}
              className="flex items-center gap-1 rounded-lg px-1 py-0.5 hover:bg-secondary transition-colors"
            >
              <span className="flex flex-col items-start min-w-0">
                <span className="font-display font-bold text-sm text-foreground truncate max-w-[130px] leading-tight">
                  {shopConfig?.shopName || "Universal Shop"}
                </span>
                {shopConfig?.shopType && (
                  <span className="text-[10px] text-primary/70 font-medium truncate max-w-[130px] leading-none">
                    {getShopTypeLabel(shopConfig.shopType)}
                  </span>
                )}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                  mobileShopOpen && "rotate-180",
                )}
              />
              {selectedShopIds.length > 1 && (
                <Badge
                  variant="secondary"
                  className="text-[9px] h-4 px-1 bg-primary/10 text-primary border-0 ml-0.5"
                >
                  {selectedShopIds.length}
                </Badge>
              )}
            </button>

            {mobileShopOpen && (
              <ShopSelectorDropdown onClose={() => setMobileShopOpen(false)} />
            )}
          </div>

          {/* Mobile Header Logout */}
          <button
            type="button"
            data-ocid="mobile_header.logout_button"
            onClick={handleLogout}
            className="touch-target flex items-center justify-center rounded-lg text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-smooth"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>

        {/* Mobile Footer (above bottom nav) */}
        <div className="md:hidden fixed bottom-[56px] left-0 right-0 z-20 pointer-events-none">
          <div className="text-center py-1 pointer-events-auto">
            <span className="text-[10px] text-muted-foreground/30">
              FIFO BRIDGE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
