import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DateFormat,
  Language,
  NumberFormat,
  ShopType,
  TaxSystem,
} from "../types";
import type { Bill, ProductView, ShopConfig, UserRole } from "../types";
import type { ShopWithId } from "../types";
import { setLanguage } from "./i18n";

// Generate a simple unique id
function generateId(): string {
  return `shop_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

type StoreState = {
  shopConfig: ShopConfig | null;
  activeShopId: string | null; // single source of truth for which shop is "active"
  isSetupComplete: boolean;
  isLoading: boolean;
  language: Language;
  products: ProductView[];
  bills: Bill[];
  shops: ShopWithId[];
  selectedShopIds: string[];
  userRole: UserRole | null;
};

type StoreActions = {
  setShopConfig: (config: ShopConfig) => void;
  setIsSetupComplete: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  setLanguage: (lang: Language) => void;
  setProducts: (products: ProductView[]) => void;
  setBills: (bills: Bill[]) => void;
  setUserRole: (role: UserRole) => void;
  isOwner: () => boolean;
  reset: () => void;
  // Multi-shop actions
  addShop: (config: ShopConfig) => void;
  removeShop: (id: string) => void;
  updateShop: (id: string, config: Partial<ShopConfig>) => void;
  selectShops: (ids: string[]) => void;
  toggleShopSelection: (id: string) => void;
  setActiveShop: (id: string) => void;
  /** Sync shopConfig from backend into the matching shops[] entry by ID, then activate it */
  syncActiveShopFromBackend: (config: ShopConfig) => void;
};

const _defaultShopConfig: ShopConfig = {
  isSetupComplete: false,
  shopName: "",
  shopAddress: "",
  shopPhone: "",
  shopEmail: "",
  country: "IN",
  currency: "INR",
  language: Language.English,
  taxSystem: TaxSystem.GST,
  taxRate: 18,
  shopType: ShopType.General,
  dateFormat: DateFormat.DDMMYYYY,
  numberFormat: NumberFormat.Indian,
  expiryAlertThresholdDays: BigInt(90),
  minStockAlertEnabled: true,
  deadStockAlertDays: BigInt(180),
};

const initialState: StoreState = {
  shopConfig: null,
  activeShopId: null,
  isSetupComplete: false,
  isLoading: true,
  language: Language.English,
  products: [],
  bills: [],
  shops: [],
  selectedShopIds: [],
  userRole: null,
};

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setShopConfig: (config) => {
        setLanguage(config.language);
        set((state) => {
          // Auto-migrate: if shops array is empty but config exists, add it
          let shops = state.shops;
          let selectedShopIds = state.selectedShopIds;
          let activeShopId = state.activeShopId;

          if (shops.length === 0 && config.isSetupComplete) {
            const newShop: ShopWithId = { ...config, id: generateId() };
            shops = [newShop];
            selectedShopIds = [newShop.id];
            activeShopId = newShop.id;
          }

          return {
            shopConfig: config,
            activeShopId,
            isSetupComplete: config.isSetupComplete,
            language: config.language,
            shops,
            selectedShopIds,
          };
        });
      },

      setIsSetupComplete: (val) => {
        console.log("[AUTH] setIsSetupComplete called with:", val);
        set({ isSetupComplete: val });
      },
      setIsLoading: (val) => set({ isLoading: val }),

      setLanguage: (lang) => {
        setLanguage(lang);
        set({ language: lang });
      },

      setProducts: (products) => set({ products }),
      setBills: (bills) => set({ bills }),
      setUserRole: (role) => set({ userRole: role }),
      isOwner: () => {
        const { userRole } = get();
        // null = not yet loaded → default to owner so existing owners see full app
        return userRole === null || userRole === "owner";
      },

      reset: () =>
        set({
          ...initialState,
          // Preserve registration state across logout so that the
          // localStorage marker (usm-reg-<principal>) check in App.tsx
          // still correctly skips the setup wizard for returning users.
          isSetupComplete: get().isSetupComplete,
          shopConfig: get().shopConfig,
          activeShopId: get().activeShopId,
          shops: get().shops,
          selectedShopIds: get().selectedShopIds,
          // Only reset transient/session state
          userRole: null,
          // CRITICAL: After logout isLoading must be FALSE. If it stayed true
          // and the returning user's principal has the localStorage marker,
          // setupAlreadyDone would be true so the loading spinner is skipped
          // anyway — but setting false is the explicit, unambiguous signal
          // that init has not yet started for the NEW session.
          isLoading: false,
        }),

      // ── Multi-shop actions ──────────────────────────────────────────

      addShop: (config) => {
        const newShop: ShopWithId = { ...config, id: generateId() };
        set((state) => ({
          shops: [...state.shops, newShop],
          selectedShopIds: [...state.selectedShopIds, newShop.id],
          // New shop becomes active immediately
          shopConfig: newShop,
          activeShopId: newShop.id,
          language: newShop.language,
        }));
      },

      removeShop: (id) => {
        set((state) => {
          const shops = state.shops.filter((s) => s.id !== id);
          const selectedShopIds = state.selectedShopIds.filter(
            (sid) => sid !== id,
          );
          // If removed shop was active, switch to first available
          const removedIsActive = state.activeShopId === id;
          const nextShop =
            removedIsActive && shops.length > 0 ? shops[0] : null;
          if (nextShop) setLanguage(nextShop.language);
          return {
            shops,
            selectedShopIds,
            shopConfig: nextShop ?? state.shopConfig,
            activeShopId: removedIsActive
              ? shops.length > 0
                ? shops[0].id
                : null
              : state.activeShopId,
          };
        });
      },

      updateShop: (id, patch) => {
        set((state) => ({
          shops: state.shops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }));
      },

      selectShops: (ids) => set({ selectedShopIds: ids }),

      toggleShopSelection: (id) => {
        set((state) => {
          const already = state.selectedShopIds.includes(id);
          const selectedShopIds = already
            ? state.selectedShopIds.filter((sid) => sid !== id)
            : [...state.selectedShopIds, id];
          return { selectedShopIds };
        });
      },

      setActiveShop: (id) => {
        const { shops } = get();
        const shop = shops.find((s) => s.id === id);
        if (!shop) {
          console.warn(`[store] setActiveShop: shop id "${id}" not found`);
          return;
        }
        setLanguage(shop.language);
        set({
          shopConfig: shop,
          activeShopId: id,
          language: shop.language,
        });
      },

      syncActiveShopFromBackend: (config) => {
        // Called after backend returns fresh config — update the matching shop
        // entry (by activeShopId) so the shops[] array stays fresh, then
        // re-activate so header/dropdown show the correct category.
        setLanguage(config.language);
        set((state) => {
          const targetId = state.activeShopId;
          let shops = state.shops;
          let activeShopId = targetId;

          if (targetId) {
            // Patch the matching shop in-place
            const idx = shops.findIndex((s) => s.id === targetId);
            if (idx !== -1) {
              shops = shops.map((s) =>
                s.id === targetId ? { ...s, ...config } : s,
              );
            } else {
              // ID not found — fall back to name match, log warning
              console.warn(
                `[store] syncActiveShopFromBackend: activeShopId "${targetId}" not in shops array, falling back to name match`,
              );
              const fallbackIdx = shops.findIndex(
                (s) =>
                  s.shopName === config.shopName &&
                  s.country === config.country,
              );
              if (fallbackIdx !== -1) {
                activeShopId = shops[fallbackIdx].id;
                shops = shops.map((s) =>
                  s.id === activeShopId ? { ...s, ...config } : s,
                );
              }
            }
          } else if (shops.length === 0 && config.isSetupComplete) {
            // First ever load — bootstrap
            const newShop: ShopWithId = { ...config, id: generateId() };
            shops = [newShop];
            activeShopId = newShop.id;
          } else if (shops.length > 0 && !targetId) {
            // activeShopId not yet set — activate first shop whose name matches
            const match = shops.find(
              (s) =>
                s.shopName === config.shopName && s.country === config.country,
            );
            if (match) {
              activeShopId = match.id;
              shops = shops.map((s) =>
                s.id === activeShopId ? { ...s, ...config } : s,
              );
            }
          }

          const activeShop = activeShopId
            ? shops.find((s) => s.id === activeShopId)
            : undefined;

          return {
            shops,
            shopConfig: activeShop ?? config,
            activeShopId: activeShopId ?? state.activeShopId,
            // NEVER downgrade isSetupComplete from true→false via backend sync.
            // Backend isSetupComplete() is canister-global (not per-principal),
            // so it can return false for a registered user. The localStorage
            // marker is the single source of truth — only allow true→true.
            isSetupComplete: state.isSetupComplete || config.isSetupComplete,
            language: config.language,
            selectedShopIds:
              state.selectedShopIds.length > 0
                ? state.selectedShopIds
                : activeShopId
                  ? [activeShopId]
                  : state.selectedShopIds,
          };
        });
      },
    }),
    {
      name: "usm-store",
      partialize: (state) => ({
        shopConfig: state.shopConfig,
        activeShopId: state.activeShopId,
        isSetupComplete: state.isSetupComplete,
        language: state.language,
        shops: state.shops,
        selectedShopIds: state.selectedShopIds,
      }),
    },
  ),
);
