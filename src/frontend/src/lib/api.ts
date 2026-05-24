import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useCallback, useMemo } from "react";
import { createActor } from "../backend";
import type { SupplierPurchase, SupplierPurchaseWithName } from "../backend.d";
import type {
  AdminNoteView,
  ApplyStoreCreditInput,
  CustomerCredit,
  CustomerView,
  PublicBillView,
  RejectReturnInput,
  Result,
  ReturnBill,
  ReturnBillId,
  ReturnFilter,
  ShopAdminView,
  SmartDefaultCharges,
  StaffMember,
  Supplier,
  UserView,
  backendInterface,
} from "../backend.d";
import { AnalyticsPeriod } from "../types";
import type {
  Bill,
  BillFilter,
  BillId,
  CreateBillInput,
  CreateProductInput,
  CreateReturnInput,
  DeadStockProduct,
  LowStockProduct,
  MetalRates,
  NearExpiryProduct,
  ProductFilter,
  ProductId,
  ProductView,
  SalesSummary,
  ShopConfig,
  TopProduct,
  UpdateProductInput,
  UserRole,
} from "../types";

export function useApi() {
  const { actor, isFetching } = useActor<backendInterface>(createActor);
  const ready = !!actor && !isFetching;

  // Products

  const createProduct = useCallback(
    async (input: CreateProductInput): Promise<ProductView> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createProduct(input);
    },
    [actor],
  );

  const getProduct = useCallback(
    async (id: ProductId): Promise<ProductView | null> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getProduct(id);
    },
    [actor],
  );

  const listProducts = useCallback(
    async (filter: ProductFilter): Promise<ProductView[]> => {
      if (!actor) return [];
      return actor.listProducts(filter);
    },
    [actor],
  );

  const updateProduct = useCallback(
    async (input: UpdateProductInput): Promise<ProductView | null> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateProduct(input);
    },
    [actor],
  );

  const deleteProduct = useCallback(
    async (id: ProductId): Promise<boolean> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteProduct(id);
    },
    [actor],
  );

  const searchProducts = useCallback(
    async (shopId: string, searchTerm: string): Promise<ProductView[]> => {
      if (!actor) return [];
      return actor.searchProducts(shopId, searchTerm);
    },
    [actor],
  );

  const getProductByBarcode = useCallback(
    async (shopId: string, barcode: string): Promise<ProductView | null> => {
      if (!actor) return null;
      return actor.getProductByBarcode(shopId, barcode);
    },
    [actor],
  );

  const getLowStockProducts = useCallback(
    async (shopId: string): Promise<LowStockProduct[]> => {
      if (!actor) return [];
      return actor.getLowStockProducts(shopId);
    },
    [actor],
  );

  const getNearExpiryProducts = useCallback(
    async (shopId: string): Promise<NearExpiryProduct[]> => {
      if (!actor) return [];
      return actor.getNearExpiryProducts(shopId);
    },
    [actor],
  );

  const getNearExpiryProductsByDays = useCallback(
    async (
      shopId: string,
      withinDays: bigint,
    ): Promise<NearExpiryProduct[]> => {
      if (!actor) return [];
      return actor.getNearExpiryProductsByDays(shopId, withinDays);
    },
    [actor],
  );

  const getDeadStockProducts = useCallback(
    async (
      shopId: string,
      inactiveDays: bigint,
    ): Promise<DeadStockProduct[]> => {
      if (!actor) return [];
      return actor.getDeadStockProducts(shopId, inactiveDays);
    },
    [actor],
  );

  // Bills

  const createBill = useCallback(
    async (shopId: string, input: CreateBillInput): Promise<Bill> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBill(shopId, input);
    },
    [actor],
  );

  const getBill = useCallback(
    async (id: BillId): Promise<Bill | null> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getBill(id);
    },
    [actor],
  );

  const listBills = useCallback(
    async (shopId: string, filter: BillFilter): Promise<Bill[]> => {
      if (!actor) return [];
      return actor.listBills(shopId, filter);
    },
    [actor],
  );

  const cancelBill = useCallback(
    async (id: BillId): Promise<boolean> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.cancelBill(id);
    },
    [actor],
  );

  // Analytics

  const getSalesSummary = useCallback(
    async (shopId: string, period: AnalyticsPeriod): Promise<SalesSummary> => {
      if (!actor) return { totalProfit: 0, totalSales: 0, billCount: 0n };
      return actor.getSalesSummary(shopId, period);
    },
    [actor],
  );

  const getTopProducts = useCallback(
    async (
      shopId: string,
      period: AnalyticsPeriod,
      limit: bigint,
    ): Promise<TopProduct[]> => {
      if (!actor) return [];
      return actor.getTopProducts(shopId, period, limit);
    },
    [actor],
  );

  // Shop Config

  const getShopConfig = useCallback(async (): Promise<ShopConfig | null> => {
    if (!actor) return null;
    return actor.getShopConfig();
  }, [actor]);

  const saveShopConfig = useCallback(
    async (config: ShopConfig): Promise<ShopConfig> => {
      if (!actor) throw new Error("Actor not ready");
      // Use AbortController-style timeout: if the canister call hangs
      // beyond 10 seconds, reject so callers are never left waiting forever.
      return new Promise<ShopConfig>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("saveShopConfig timed out after 10s")),
          10_000,
        );
        actor
          .saveShopConfig(config)
          .then((result) => {
            clearTimeout(timer);
            resolve(result);
          })
          .catch((err: unknown) => {
            clearTimeout(timer);
            // Log but DO NOT rethrow — callers treat undefined/throw as graceful failure.
            console.warn("[api] saveShopConfig failed:", err);
            reject(err);
          });
      });
    },
    [actor],
  );

  const updateShopConfig = useCallback(
    async (config: ShopConfig): Promise<ShopConfig | null> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateShopConfig(config);
    },
    [actor],
  );

  const isSetupComplete = useCallback(async (): Promise<boolean> => {
    if (!actor) return false;
    return actor.isSetupComplete();
  }, [actor]);

  // Metal Rates

  const getMetalRates = useCallback(async (): Promise<MetalRates> => {
    if (!actor)
      return {
        gold24k: 0,
        gold22k: 0,
        silver: 0,
        lastUpdated: BigInt(0),
        available: false,
        isStale: false,
      };
    return actor.getMetalRates();
  }, [actor]);

  const refreshMetalRates = useCallback(async (): Promise<void> => {
    if (!actor) return;
    return actor.refreshMetalRates();
  }, [actor]);

  // Admin

  const recordUserLogin = useCallback(
    async (shopName: string, shopType: string): Promise<void> => {
      if (!actor) return;
      return actor.recordUserLogin(shopName, shopType);
    },
    [actor],
  );

  const initAdmin = useCallback(async (): Promise<boolean> => {
    if (!actor) return false;
    return actor.initAdmin();
  }, [actor]);

  const isAdminCaller = useCallback(async (): Promise<boolean> => {
    if (!actor) return false;
    return actor.isAdminCaller();
  }, [actor]);

  const getAllUsers = useCallback(async (): Promise<UserView[]> => {
    if (!actor) return [];
    const res = await actor.getAllUsers();
    return res.__kind__ === "ok" ? res.ok : [];
  }, [actor]);

  const getAllShops = useCallback(async (): Promise<ShopAdminView[]> => {
    if (!actor) return [];
    const res = await actor.getAllShops();
    return res.__kind__ === "ok" ? res.ok : [];
  }, [actor]);

  const getAdminNotes = useCallback(
    async (targetPrincipal: string): Promise<AdminNoteView[]> => {
      if (!actor) return [];
      const res = await actor.getAdminNotes(targetPrincipal);
      return res.__kind__ === "ok" ? res.ok.filter((n) => !n.isDeleted) : [];
    },
    [actor],
  );

  const addAdminNote = useCallback(
    async (targetPrincipal: string, content: string): Promise<boolean> => {
      if (!actor) return false;
      const res = await actor.addAdminNote(targetPrincipal, content);
      return res.__kind__ === "ok";
    },
    [actor],
  );

  const deleteAdminNote = useCallback(
    async (noteId: bigint): Promise<boolean> => {
      if (!actor) return false;
      const res = await actor.deleteAdminNote(noteId);
      return res.__kind__ === "ok";
    },
    [actor],
  );

  const setShopDisabled = useCallback(
    async (principal: string, disabled: boolean): Promise<boolean> => {
      if (!actor) return false;
      const res = await actor.setShopDisabled(principal, disabled);
      return res.__kind__ === "ok";
    },
    [actor],
  );

  const adminDeleteShop = useCallback(
    async (shopId: string): Promise<{ ok: null } | { err: string }> => {
      if (!actor) return { err: "Actor not ready" };
      const a = actor as typeof actor & {
        adminDeleteShop?: (
          id: string,
        ) => Promise<{ __kind__: "ok" } | { __kind__: "err"; err: string }>;
      };
      if (typeof a.adminDeleteShop !== "function")
        return { err: "Not implemented" };
      const res = await a.adminDeleteShop(shopId);
      return res.__kind__ === "ok" ? { ok: null } : { err: res.err };
    },
    [actor],
  );

  const adminDeleteUser = useCallback(
    async (userPrincipal: string): Promise<{ ok: null } | { err: string }> => {
      if (!actor) return { err: "Actor not ready" };
      const a = actor as typeof actor & {
        adminDeleteUser?: (
          p: string,
        ) => Promise<{ __kind__: "ok" } | { __kind__: "err"; err: string }>;
      };
      if (typeof a.adminDeleteUser !== "function")
        return { err: "Not implemented" };
      const res = await a.adminDeleteUser(userPrincipal);
      return res.__kind__ === "ok" ? { ok: null } : { err: res.err };
    },
    [actor],
  );

  const adminBlockUser = useCallback(
    async (
      userPrincipal: string,
      blocked: boolean,
    ): Promise<{ ok: null } | { err: string }> => {
      if (!actor) return { err: "Actor not ready" };
      const a = actor as typeof actor & {
        adminBlockUser?: (
          p: string,
          b: boolean,
        ) => Promise<{ __kind__: "ok" } | { __kind__: "err"; err: string }>;
      };
      if (typeof a.adminBlockUser !== "function")
        return { err: "Not implemented" };
      const res = await a.adminBlockUser(userPrincipal, blocked);
      return res.__kind__ === "ok" ? { ok: null } : { err: res.err };
    },
    [actor],
  );

  // Staff Management

  const getShopStaff = useCallback(
    async (shopId: string): Promise<StaffMember[]> => {
      if (!actor) return [];
      return actor.getShopStaff(shopId);
    },
    [actor],
  );

  const addStaff = useCallback(
    async (shopId: string, staffPrincipal: Principal): Promise<Result> => {
      if (!actor) return { __kind__: "err", err: "Actor not ready" };
      return actor.addStaff(shopId, staffPrincipal);
    },
    [actor],
  );

  const removeStaff = useCallback(
    async (shopId: string, staffPrincipal: Principal): Promise<Result> => {
      if (!actor) return { __kind__: "err", err: "Actor not ready" };
      return actor.removeStaff(shopId, staffPrincipal);
    },
    [actor],
  );

  // Customers

  const createOrUpdateCustomer = useCallback(
    async (shopId: string, name: string, phone: string): Promise<bigint> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrUpdateCustomer(shopId, name, phone);
    },
    [actor],
  );

  const getShopCustomers = useCallback(
    async (shopId: string): Promise<CustomerView[]> => {
      if (!actor) return [];
      return actor.getShopCustomers(shopId);
    },
    [actor],
  );

  const getCustomerBills = useCallback(
    async (shopId: string, customerId: bigint): Promise<Bill[]> => {
      if (!actor) return [];
      return actor.getCustomerBills(shopId, customerId);
    },
    [actor],
  );

  const searchCustomers = useCallback(
    async (shopId: string, searchQuery: string): Promise<CustomerView[]> => {
      if (!actor) return [];
      return actor.searchCustomers(shopId, searchQuery);
    },
    [actor],
  );

  const getMyRole = useCallback(
    async (shopId: string): Promise<UserRole> => {
      if (!actor) return "owner";
      const role = await actor.getMyRole(shopId);
      return String(role) === "staff" ? "staff" : "owner";
    },
    [actor],
  );

  // Payment Tracking

  const getPendingPaymentBills = useCallback(
    async (shopId: string): Promise<Bill[]> => {
      if (!actor) return [];
      return actor.getPendingPaymentBills(shopId);
    },
    [actor],
  );

  const recordPayment = useCallback(
    async (
      shopId: string,
      billId: BillId,
      additionalAmount: number,
    ): Promise<Bill> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordPayment(shopId, billId, additionalAmount);
    },
    [actor],
  );

  const recordReminderSent = useCallback(
    async (shopId: string, billId: BillId): Promise<void> => {
      if (!actor) return;
      return actor.recordReminderSent(shopId, billId);
    },
    [actor],
  );

  // Suppliers

  const listSuppliersByShop = useCallback(
    async (shopId: string): Promise<Supplier[]> => {
      if (!actor) return [];
      return actor.listSuppliersByShop(shopId);
    },
    [actor],
  );

  const createSupplier = useCallback(
    async (
      shopId: string,
      name: string,
      businessType: string,
      phone: string,
      email: string | null,
      address: string | null,
      city: string | null,
      defaultTransportCharge: string | null,
    ): Promise<Supplier | null> => {
      if (!actor) return null;
      return actor.createSupplier(
        shopId,
        name,
        businessType,
        phone,
        email,
        address,
        city,
        defaultTransportCharge,
      );
    },
    [actor],
  );

  const updateSupplier = useCallback(
    async (
      supplierId: string,
      name: string,
      businessType: string,
      phone: string,
      email: string | null,
      address: string | null,
      city: string | null,
      defaultTransportCharge: string | null,
    ): Promise<Supplier | null> => {
      if (!actor) return null;
      return actor.updateSupplier(
        supplierId,
        name,
        businessType,
        phone,
        email,
        address,
        city,
        defaultTransportCharge,
      );
    },
    [actor],
  );

  const deleteSupplier = useCallback(
    async (supplierId: string): Promise<boolean> => {
      if (!actor) return false;
      return actor.deleteSupplier(supplierId);
    },
    [actor],
  );

  const createSupplierPurchase = useCallback(
    async (
      shopId: string,
      supplierId: string,
      productId: bigint,
      quantity: number,
      purchasePrice: string,
      transportCharge: string,
      notes: string | null,
    ): Promise<SupplierPurchase> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createSupplierPurchase(
        shopId,
        supplierId,
        productId,
        quantity,
        purchasePrice,
        transportCharge,
        notes,
      );
    },
    [actor],
  );

  const listPurchasesByProduct = useCallback(
    async (shopId: string, productId: bigint): Promise<SupplierPurchase[]> => {
      if (!actor) return [];
      return actor.listPurchasesByProduct(shopId, productId);
    },
    [actor],
  );

  const getLastNPurchasesForProduct = useCallback(
    async (
      shopId: string,
      productId: bigint,
      n: bigint,
    ): Promise<SupplierPurchaseWithName[]> => {
      if (!actor) return [];
      return actor.getLastNPurchasesForProduct(shopId, productId, n);
    },
    [actor],
  );

  const getDefaultCharges =
    useCallback(async (): Promise<SmartDefaultCharges | null> => {
      if (!actor) return null;
      return actor.getDefaultCharges();
    }, [actor]);

  const setDefaultCharges = useCallback(
    async (charges: SmartDefaultCharges): Promise<boolean> => {
      if (!actor) return false;
      const result = await actor.setDefaultCharges(charges);
      return result !== null;
    },
    [actor],
  );

  // Returns & Store Credit

  const createReturn = useCallback(
    async (shopId: string, input: CreateReturnInput): Promise<ReturnBill> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createReturn(shopId, input);
    },
    [actor],
  );

  const approveReturn = useCallback(
    async (shopId: string, returnBillId: ReturnBillId): Promise<ReturnBill> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveReturn(shopId, returnBillId);
    },
    [actor],
  );

  const rejectReturn = useCallback(
    async (shopId: string, input: RejectReturnInput): Promise<ReturnBill> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectReturn(shopId, input);
    },
    [actor],
  );

  const listReturns = useCallback(
    async (shopId: string, filter: ReturnFilter): Promise<ReturnBill[]> => {
      if (!actor) return [];
      return actor.listReturns(shopId, filter);
    },
    [actor],
  );

  const getReturnsByBill = useCallback(
    async (shopId: string, billId: BillId): Promise<ReturnBill[]> => {
      if (!actor) return [];
      return actor.getReturnsByBill(shopId, billId);
    },
    [actor],
  );

  const getCustomerCredit = useCallback(
    async (shopId: string, customerPhone: string): Promise<CustomerCredit> => {
      if (!actor)
        return { balance: 0, shopId, customerId: "", transactions: [] };
      return actor.getCustomerCredit(shopId, customerPhone);
    },
    [actor],
  );

  const applyStoreCredit = useCallback(
    async (
      shopId: string,
      input: ApplyStoreCreditInput,
    ): Promise<CustomerCredit> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.applyStoreCredit(shopId, input);
    },
    [actor],
  );

  // Bill Sharing

  const generateBillShareToken = useCallback(
    async (billId: BillId): Promise<string | null> => {
      if (!actor) return null;
      const a = actor as typeof actor & {
        generateBillShareToken?: (id: BillId) => Promise<string | null>;
      };
      if (typeof a.generateBillShareToken === "function") {
        return a.generateBillShareToken(billId);
      }
      return null;
    },
    [actor],
  );

  const getPublicBill = useCallback(
    async (billId: BillId, shareToken: string): Promise<Bill | null> => {
      if (!actor) return null;
      const a = actor as typeof actor & {
        getPublicBill?: (
          id: BillId,
          token: string,
        ) => Promise<PublicBillView | null>;
      };
      if (typeof a.getPublicBill === "function") {
        const view = await a.getPublicBill(billId, shareToken);
        if (!view) return null;
        return { ...view, profit: 0, shareToken: undefined } as Bill;
      }
      return actor.getBill(billId);
    },
    [actor],
  );

  return useMemo(
    () => ({
      ready,
      actor,
      createReturn,
      approveReturn,
      rejectReturn,
      listReturns,
      getReturnsByBill,
      getCustomerCredit,
      applyStoreCredit,
      createProduct,
      getProduct,
      listProducts,
      updateProduct,
      deleteProduct,
      searchProducts,
      getProductByBarcode,
      getLowStockProducts,
      getNearExpiryProducts,
      getNearExpiryProductsByDays,
      getDeadStockProducts,
      createBill,
      getBill,
      listBills,
      cancelBill,
      getSalesSummary,
      getTopProducts,
      getShopConfig,
      saveShopConfig,
      updateShopConfig,
      isSetupComplete,
      getMetalRates,
      refreshMetalRates,
      recordUserLogin,
      initAdmin,
      isAdminCaller,
      getAllUsers,
      getAllShops,
      getAdminNotes,
      addAdminNote,
      deleteAdminNote,
      setShopDisabled,
      adminDeleteShop,
      adminDeleteUser,
      adminBlockUser,
      getShopStaff,
      addStaff,
      removeStaff,
      createOrUpdateCustomer,
      getShopCustomers,
      getCustomerBills,
      searchCustomers,
      getMyRole,
      getPendingPaymentBills,
      recordPayment,
      recordReminderSent,
      generateBillShareToken,
      getPublicBill,
      listSuppliersByShop,
      createSupplier,
      updateSupplier,
      deleteSupplier,
      getDefaultCharges,
      setDefaultCharges,
      createSupplierPurchase,
      listPurchasesByProduct,
      getLastNPurchasesForProduct,
    }),
    [
      ready,
      actor,
      createReturn,
      approveReturn,
      rejectReturn,
      listReturns,
      getReturnsByBill,
      getCustomerCredit,
      applyStoreCredit,
      createProduct,
      getProduct,
      listProducts,
      updateProduct,
      deleteProduct,
      searchProducts,
      getProductByBarcode,
      getLowStockProducts,
      getNearExpiryProducts,
      getNearExpiryProductsByDays,
      getDeadStockProducts,
      createBill,
      getBill,
      listBills,
      cancelBill,
      getSalesSummary,
      getTopProducts,
      getShopConfig,
      saveShopConfig,
      updateShopConfig,
      isSetupComplete,
      getMetalRates,
      refreshMetalRates,
      recordUserLogin,
      initAdmin,
      isAdminCaller,
      getAllUsers,
      getAllShops,
      getAdminNotes,
      addAdminNote,
      deleteAdminNote,
      setShopDisabled,
      adminDeleteShop,
      adminDeleteUser,
      adminBlockUser,
      getShopStaff,
      addStaff,
      removeStaff,
      createOrUpdateCustomer,
      getShopCustomers,
      getCustomerBills,
      searchCustomers,
      getMyRole,
      getPendingPaymentBills,
      recordPayment,
      recordReminderSent,
      generateBillShareToken,
      getPublicBill,
      listSuppliersByShop,
      createSupplier,
      updateSupplier,
      deleteSupplier,
      getDefaultCharges,
      setDefaultCharges,
      createSupplierPurchase,
      listPurchasesByProduct,
      getLastNPurchasesForProduct,
    ],
  );
}

// Convenience re-export for period constant
export { AnalyticsPeriod };
