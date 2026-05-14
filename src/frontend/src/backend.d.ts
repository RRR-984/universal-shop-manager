import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ApplyStoreCreditInput {
    customerPhone: string;
    amount: number;
    billId: BillId;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface UserView {
    firstSeen: bigint;
    principal: string;
    isBlocked: boolean;
    isActive: boolean;
    loginCount: bigint;
    shopName: string;
    shopType: string;
    lastSeen: bigint;
}
export interface SalesSummary {
    totalProfit: number;
    totalSales: number;
    billCount: bigint;
}
export interface CreateReturnInput {
    customerName: string;
    originalBillId: BillId;
    customerPhone: string;
    returnItems: Array<ReturnItem>;
}
export interface BillFilter {
    status?: BillStatus;
    searchCustomer?: string;
    toDate?: Timestamp;
    fromDate?: Timestamp;
}
export type BillId = bigint;
export type SupplierPurchaseId = string;
export interface GeneralFields {
    expiryDate?: string;
}
export interface TopProduct {
    revenue: number;
    name: string;
    productId: ProductId;
    totalQty: number;
    profit: number;
}
export interface AutoPartsFields {
    vehicleBrand: string;
    expiryDate?: string;
    partName: string;
    vehicleModel: string;
    partNo: string;
}
export type SupplierId = string;
export interface FruitsVegetablesFields {
    unit: string;
    freshnessDate?: string;
    originSource: string;
    productType: string;
    seasonalTag: string;
    batchNumber?: string;
    variety: string;
}
export interface CreateBillInput {
    customerName: string;
    customerPhone: string;
    amountPaid: number;
    billDiscount: number;
    paymentType: PaymentType;
    extraCharges: Array<ExtraCharge>;
    items: Array<BillItem>;
    priceType: PriceType;
    staffCreatedBy?: Principal;
}
export interface SmartDefaultCharges {
    defaultOtherCharge?: string;
    defaultLabourCharge?: string;
    defaultTransportCharge?: string;
}
export interface MedicalFields {
    packType: PackType;
    expiryDate: string;
    company: string;
    batchNo: string;
    composition: string;
    isControlled: boolean;
}
export type ReturnBillId = bigint;
export interface TaxBreakdown {
    cgst: number;
    igst: number;
    sgst: number;
}
export interface ReturnFilter {
    status?: ReturnStatus;
    toDate?: Timestamp;
    fromDate?: Timestamp;
}
export interface PublicBillView {
    id: BillId;
    customerName: string;
    status: BillStatus;
    customerPhone: string;
    createdAt: Timestamp;
    grandTotal: number;
    billNumber: bigint;
    taxBreakdown: TaxBreakdown;
    extraCharges: Array<ExtraCharge>;
    items: Array<BillItem>;
    priceType: PriceType;
    totalDiscount: number;
    taxSystem: TaxSystem;
    taxRate: number;
    subtotal: number;
}
export interface CreateProductInput {
    retailPrice: number;
    shopId: string;
    name: string;
    wholesalePrice: number;
    unit: string;
    isActive: boolean;
    minStock: number;
    stock: number;
    labourCost?: number;
    barcode?: string;
    shopType: ShopType;
    category: string;
    transportCost?: number;
    costPrice: number;
    engineFields: EngineFields;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface StaffMember {
    principal: Principal;
    role: ShopRole;
    addedAt: bigint;
}
export interface DeadStockProduct {
    name: string;
    lastSaleTime?: Timestamp;
    productId: ProductId;
    daysInactive: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface RejectReturnInput {
    returnBillId: ReturnBillId;
    reason: string;
}
export type CustomerId = bigint;
export interface Bill {
    id: BillId;
    customerName: string;
    status: BillStatus;
    customerPhone: string;
    createdAt: Timestamp;
    shareToken?: string;
    amountPaid: number;
    grandTotal: number;
    billNumber: bigint;
    taxBreakdown: TaxBreakdown;
    paymentType: PaymentType;
    extraCharges: Array<ExtraCharge>;
    profit: number;
    amountPending: number;
    items: Array<BillItem>;
    priceType: PriceType;
    staffCreatedBy?: Principal;
    totalDiscount: number;
    lastReminderSent?: Timestamp;
    taxSystem: TaxSystem;
    taxRate: number;
    subtotal: number;
}
export interface Supplier {
    id: SupplierId;
    shopId: string;
    city?: string;
    name: string;
    businessType: string;
    email?: string;
    address?: string;
    phone: string;
    defaultTransportCharge?: string;
}
export interface JewelryFields {
    metal: Metal;
    expiryDate?: string;
    metalRate: number;
    purity: string;
    makingCharges: number;
    weightGrams: number;
}
export interface ReturnBill {
    id: ReturnBillId;
    customerName: string;
    status: ReturnStatus;
    originalBillId: BillId;
    shopId: string;
    customerPhone: string;
    totalRefundAmount: number;
    approvedAt?: Timestamp;
    createdAt: Timestamp;
    rejectionReason?: string;
    returnItems: Array<ReturnItem>;
}
export type Timestamp = bigint;
export interface ElectricalFields {
    model: string;
    isiCertified: boolean;
    lengthUnit: string;
    wattage: string;
    expiryDate?: string;
    color: string;
    voltageRating: string;
    wireGauge: string;
    itemCategory: string;
    batchNumber: string;
    brand: string;
    ampereRating: string;
}
export type CreditTransactionId = bigint;
export interface GroceryFields {
    expiryDate?: string;
    decimalQtyEnabled: boolean;
}
export interface UpdateProductInput {
    id: ProductId;
    retailPrice: number;
    name: string;
    wholesalePrice: number;
    unit: string;
    isActive: boolean;
    minStock: number;
    stock: number;
    labourCost?: number;
    barcode?: string;
    category: string;
    transportCost?: number;
    costPrice: number;
    engineFields: EngineFields;
}
export interface MobileFields {
    ram: string;
    mobileCategory: string;
    model: string;
    displaySize: string;
    expiryDate?: string;
    storage: string;
    imei: string;
    color: string;
    compatibility: string;
    accessoryType: string;
    serialNumber: string;
    warrantyMonths: bigint;
    brand: string;
    processor: string;
}
export interface CustomerCredit {
    balance: number;
    shopId: string;
    customerId: string;
    transactions: Array<CreditTransaction>;
}
export interface ShopConfig {
    isSetupComplete: boolean;
    numberFormat: NumberFormat;
    country: string;
    shopPhone: string;
    expiryAlertThresholdDays: bigint;
    minStockAlertEnabled: boolean;
    language: Language;
    dateFormat: DateFormat;
    vatNumber?: string;
    deadStockAlertDays: bigint;
    currency: string;
    shopName: string;
    shopType: ShopType;
    shopEmail: string;
    taxSystem: TaxSystem;
    shopAddress: string;
    taxRate: number;
    gstinNumber?: string;
    defaultCharges?: SmartDefaultCharges;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface SalonFields {
    duration: bigint;
    staffName: string;
    expiryDate?: string;
}
export interface ElectronicsFields {
    model: string;
    expiryDate?: string;
    serialNo: string;
    warrantyMonths: bigint;
    brand: string;
}
export interface BillItem {
    qty: number;
    name: string;
    rate: number;
    unit: string;
    lineTotal: number;
    productId: ProductId;
    taxAmt: number;
    discount: number;
}
export interface StationeryFields {
    bookSubject: string;
    subType: StationerySubType;
    bookClass: string;
    expiryDate?: string;
    penColor: string;
    notebookPages: bigint;
    bookMedium: string;
    notebookSize: string;
    penBrand: string;
}
export interface AgroProductsFields {
    weight: number;
    expiryDate?: string;
    weightUnit: string;
    productType: string;
    batchNumber?: string;
    brand: string;
    cropType: string;
}
export interface SupplierPurchase {
    id: SupplierPurchaseId;
    purchasePrice: string;
    shopId: string;
    purchaseDate: bigint;
    productId: bigint;
    transportCharge: string;
    notes?: string;
    quantity: number;
    supplierId: SupplierId;
}
export interface AdminNoteView {
    isDeleted: boolean;
    content: string;
    noteId: bigint;
    createdAt: bigint;
    targetPrincipal: string;
    updatedAt?: bigint;
}
export interface NearExpiryProduct {
    expiryDate: string;
    name: string;
    productId: ProductId;
    daysLeft: bigint;
}
export interface ExtraCharge {
    description: string;
    amount: number;
}
export interface ProductFilter {
    shopId?: string;
    isActive?: boolean;
    searchName?: string;
    shopType?: ShopType;
    category?: string;
}
export interface ReturnItem {
    returnQty: number;
    originalRate: number;
    name: string;
    lineTotal: number;
    productId: ProductId;
    reason?: string;
}
export interface LowStockProduct {
    name: string;
    productId: ProductId;
    minStock: number;
    stock: number;
}
export interface ShopAdminView {
    principal: string;
    language: string;
    currency: string;
    shopName: string;
    shopType: string;
    taxSystem: string;
    isDisabled: boolean;
}
export interface RestaurantFields {
    expiryDate?: string;
    category: RestaurantCategory;
}
export interface ProductView {
    id: ProductId;
    retailPrice: number;
    shopId: string;
    name: string;
    wholesalePrice: number;
    createdAt: Timestamp;
    unit: string;
    lastSaleTime?: Timestamp;
    isActive: boolean;
    minStock: number;
    updatedAt: Timestamp;
    stock: number;
    labourCost?: number;
    barcode?: string;
    shopType: ShopType;
    category: string;
    transportCost?: number;
    costPrice: number;
    engineFields: EngineFields;
}
export interface SupplierPurchaseWithName {
    supplierName: string;
    purchase: SupplierPurchase;
}
export type EngineFields = {
    __kind__: "Salon";
    Salon: SalonFields;
} | {
    __kind__: "Footwear";
    Footwear: FootwearFields;
} | {
    __kind__: "Jewelry";
    Jewelry: JewelryFields;
} | {
    __kind__: "AutoParts";
    AutoParts: AutoPartsFields;
} | {
    __kind__: "Grocery";
    Grocery: GroceryFields;
} | {
    __kind__: "AgroProducts";
    AgroProducts: AgroProductsFields;
} | {
    __kind__: "Hardware";
    Hardware: HardwareFields;
} | {
    __kind__: "General";
    General: GeneralFields;
} | {
    __kind__: "BuildingMaterial";
    BuildingMaterial: BuildingMaterialFields;
} | {
    __kind__: "Stationery";
    Stationery: StationeryFields;
} | {
    __kind__: "Medical";
    Medical: MedicalFields;
} | {
    __kind__: "Electrical";
    Electrical: ElectricalFields;
} | {
    __kind__: "Restaurant";
    Restaurant: RestaurantFields;
} | {
    __kind__: "FruitsVegetables";
    FruitsVegetables: FruitsVegetablesFields;
} | {
    __kind__: "Electronics";
    Electronics: ElectronicsFields;
} | {
    __kind__: "Mobile";
    Mobile: MobileFields;
} | {
    __kind__: "Clothing";
    Clothing: ClothingFields;
};
export interface BuildingMaterialFields {
    weight: string;
    material_type: string;
    expiryDate?: string;
    color: string;
    grade: string;
    size_dimensions: string;
    brand: string;
}
export interface MetalRates {
    isStale: boolean;
    lastUpdated: bigint;
    available: boolean;
    gold22k: number;
    gold24k: number;
    silver: number;
}
export interface HardwareFields {
    sku: string;
    expiryDate?: string;
}
export type ProductId = bigint;
export interface CustomerView {
    id: CustomerId;
    shopId: string;
    name: string;
    createdAt: bigint;
    lastPurchaseDate?: bigint;
    totalSpent: number;
    totalBills: bigint;
    phone: string;
}
export interface CreditTransaction {
    id: CreditTransactionId;
    returnBillId?: ReturnBillId;
    date: Timestamp;
    note: string;
    txType: CreditTransactionType;
    amount: number;
    billId?: BillId;
}
export interface FootwearFields {
    model: string;
    expiryDate?: string;
    color: string;
    size: string;
    sizeSystem: SizeSystem;
    brand: string;
}
export interface ClothingFields {
    expiryDate?: string;
    color: string;
    size: string;
    itemName: string;
    brand: string;
}
export enum AnalyticsPeriod {
    Week = "Week",
    Month = "Month",
    Today = "Today"
}
export enum BillStatus {
    Saved = "Saved",
    Draft = "Draft",
    Cancelled = "Cancelled"
}
export enum CreditTransactionType {
    Used = "Used",
    Earned = "Earned"
}
export enum DateFormat {
    MMDDYYYY = "MMDDYYYY",
    DDMMYYYY = "DDMMYYYY"
}
export enum Language {
    BahasaIndonesia = "BahasaIndonesia",
    Swahili = "Swahili",
    Urdu = "Urdu",
    Portuguese = "Portuguese",
    Spanish = "Spanish",
    Bengali = "Bengali",
    Hindi = "Hindi",
    English = "English",
    Arabic = "Arabic",
    French = "French"
}
export enum Metal {
    Gold = "Gold",
    Platinum = "Platinum",
    Other = "Other",
    Silver = "Silver"
}
export enum NumberFormat {
    Indian = "Indian",
    International = "International"
}
export enum PackType {
    Strip = "Strip",
    Bottle = "Bottle",
    Tablet = "Tablet",
    Other = "Other"
}
export enum PaymentType {
    full = "full",
    partial = "partial"
}
export enum PriceType {
    Retail = "Retail",
    Custom = "Custom",
    Wholesale = "Wholesale"
}
export enum RestaurantCategory {
    Veg = "Veg",
    NonVeg = "NonVeg",
    Vegan = "Vegan"
}
export enum ReturnStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum ShopRole {
    owner = "owner",
    staff = "staff"
}
export enum ShopType {
    Salon = "Salon",
    Footwear = "Footwear",
    Jewelry = "Jewelry",
    AutoParts = "AutoParts",
    Grocery = "Grocery",
    AgroProducts = "AgroProducts",
    Hardware = "Hardware",
    General = "General",
    BuildingMaterial = "BuildingMaterial",
    Stationery = "Stationery",
    Medical = "Medical",
    Electrical = "Electrical",
    Restaurant = "Restaurant",
    FruitsVegetables = "FruitsVegetables",
    Electronics = "Electronics",
    Mobile = "Mobile",
    Clothing = "Clothing"
}
export enum SizeSystem {
    EU = "EU",
    UK = "UK",
    US = "US"
}
export enum StationerySubType {
    Pen = "Pen",
    Book = "Book",
    File = "File",
    Notebook = "Notebook",
    Other = "Other"
}
export enum TaxSystem {
    GST = "GST",
    VAT = "VAT",
    Generic = "Generic",
    SalesTax = "SalesTax"
}
export interface backendInterface {
    addAdminNote(targetPrincipal: string, content: string): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addStaff(shopId: string, staffPrincipal: Principal): Promise<Result>;
    adminBlockUser(userPrincipal: string, blocked: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteShop(shopId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteUser(userPrincipal: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    applyStoreCredit(shopId: string, input: ApplyStoreCreditInput): Promise<CustomerCredit>;
    approveReturn(shopId: string, returnBillId: ReturnBillId): Promise<ReturnBill>;
    cancelBill(id: BillId): Promise<boolean>;
    createBill(input: CreateBillInput): Promise<Bill>;
    createOrUpdateCustomer(shopId: string, name: string, phone: string): Promise<CustomerId>;
    createProduct(input: CreateProductInput): Promise<ProductView>;
    createReturn(shopId: string, input: CreateReturnInput): Promise<ReturnBill>;
    createSupplier(shopId: string, name: string, businessType: string, phone: string, email: string | null, address: string | null, city: string | null, defaultTransportCharge: string | null): Promise<Supplier>;
    createSupplierPurchase(shopId: string, supplierId: SupplierId, productId: bigint, quantity: number, purchasePrice: string, transportCharge: string, notes: string | null): Promise<SupplierPurchase>;
    deleteAdminNote(noteId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProduct(id: ProductId): Promise<boolean>;
    deleteSupplier(supplierId: SupplierId): Promise<boolean>;
    generateBillShareToken(billId: BillId): Promise<string | null>;
    getAdminNotes(targetPrincipal: string): Promise<{
        __kind__: "ok";
        ok: Array<AdminNoteView>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllShops(): Promise<{
        __kind__: "ok";
        ok: Array<ShopAdminView>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllUsers(): Promise<{
        __kind__: "ok";
        ok: Array<UserView>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBill(id: BillId): Promise<Bill | null>;
    getCustomerBills(shopId: string, customerId: CustomerId): Promise<Array<Bill>>;
    getCustomerCredit(shopId: string, customerPhone: string): Promise<CustomerCredit>;
    getDeadStockProducts(shopId: string, inactiveDays: bigint): Promise<Array<DeadStockProduct>>;
    getDefaultCharges(): Promise<SmartDefaultCharges | null>;
    getLastNPurchasesForProduct(shopId: string, productId: bigint, n: bigint): Promise<Array<SupplierPurchaseWithName>>;
    getLowStockProducts(shopId: string): Promise<Array<LowStockProduct>>;
    getMetalRates(): Promise<MetalRates>;
    getMyRole(shopId: string): Promise<ShopRole>;
    getNearExpiryProducts(shopId: string): Promise<Array<NearExpiryProduct>>;
    getNearExpiryProductsByDays(shopId: string, withinDays: bigint): Promise<Array<NearExpiryProduct>>;
    getPendingPaymentBills(shopId: string): Promise<Array<Bill>>;
    getProduct(id: ProductId): Promise<ProductView | null>;
    getProductByBarcode(shopId: string, barcode: string): Promise<ProductView | null>;
    getPublicBill(billId: BillId, shareToken: string): Promise<PublicBillView | null>;
    getReturnsByBill(shopId: string, billId: BillId): Promise<Array<ReturnBill>>;
    getSalesSummary(period: AnalyticsPeriod): Promise<SalesSummary>;
    getShopConfig(): Promise<ShopConfig | null>;
    getShopCustomers(shopId: string): Promise<Array<CustomerView>>;
    getShopStaff(shopId: string): Promise<Array<StaffMember>>;
    getSupplier(supplierId: SupplierId): Promise<Supplier | null>;
    getTopProducts(period: AnalyticsPeriod, limit: bigint): Promise<Array<TopProduct>>;
    getUserDetails(principal: string): Promise<{
        __kind__: "ok";
        ok: UserView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    initAdmin(): Promise<boolean>;
    isAdminCaller(): Promise<boolean>;
    isSetupComplete(): Promise<boolean>;
    listBills(filter: BillFilter): Promise<Array<Bill>>;
    listProducts(filter: ProductFilter): Promise<Array<ProductView>>;
    listPurchasesByProduct(shopId: string, productId: bigint): Promise<Array<SupplierPurchase>>;
    listPurchasesBySupplier(shopId: string, supplierId: SupplierId): Promise<Array<SupplierPurchase>>;
    listReturns(shopId: string, filter: ReturnFilter): Promise<Array<ReturnBill>>;
    listSuppliersByShop(shopId: string): Promise<Array<Supplier>>;
    recordPayment(shopId: string, billId: BillId, additionalAmount: number): Promise<Bill>;
    recordReminderSent(shopId: string, billId: BillId): Promise<void>;
    recordUserLogin(shopName: string, shopType: string): Promise<void>;
    refreshMetalRates(): Promise<void>;
    rejectReturn(shopId: string, input: RejectReturnInput): Promise<ReturnBill>;
    removeStaff(shopId: string, staffPrincipal: Principal): Promise<Result>;
    saveShopConfig(config: ShopConfig): Promise<ShopConfig>;
    searchCustomers(shopId: string, searchQuery: string): Promise<Array<CustomerView>>;
    searchProducts(shopId: string, searchTerm: string): Promise<Array<ProductView>>;
    setDefaultCharges(charges: SmartDefaultCharges): Promise<ShopConfig | null>;
    setMetalRatesManual(gold24kPerGram: number, silverPerGram: number): Promise<void>;
    setShopDisabled(principal: string, disabled: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transformRatesResponse(input: TransformationInput): Promise<TransformationOutput>;
    updateProduct(input: UpdateProductInput): Promise<ProductView | null>;
    updateShopConfig(config: ShopConfig): Promise<ShopConfig | null>;
    updateSupplier(supplierId: SupplierId, name: string, businessType: string, phone: string, email: string | null, address: string | null, city: string | null, defaultTransportCharge: string | null): Promise<Supplier | null>;
}
