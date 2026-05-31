module {
  // ── Identifiers ──────────────────────────────────────────────────────────────
  public type ProductId = Nat;
  public type BillId    = Nat;
  public type Timestamp = Int; // nanoseconds from Time.now()

  // ── Shop configuration enums ─────────────────────────────────────────────────
  public type ShopType = {
    #Mobile;
    #Electronics;
    #Medical;
    #Clothing;
    #Footwear;
    #Grocery;
    #Stationery;
    #Restaurant;
    #AutoParts;
    #Hardware;
    #Jewelry;
    #Salon;
    #General;
    #BuildingMaterial;
    #AgroProducts;
    #FruitsVegetables;
    #Electrical;
  };

  public type TaxSystem = {
    #GST;        // India — CGST/SGST/IGST
    #VAT;        // Europe / Middle East / Africa
    #SalesTax;   // USA
    #Generic;    // any custom %
  };

  public type Language = {
    #English;
    #Hindi;
    #Arabic;
    #French;
    #Spanish;
    #Portuguese;
    #Swahili;
    #BahasaIndonesia;
    #Bengali;
    #Urdu;
  };

  public type DateFormat  = { #DDMMYYYY; #MMDDYYYY };
  public type NumberFormat = { #Indian; #International };
  public type PriceType    = { #Retail; #Wholesale; #Custom };
  public type BillStatus   = { #Draft; #Saved; #Cancelled };
  public type SizeSystem   = { #UK; #EU; #US };
  public type StationerySubType = { #Book; #Notebook; #Pen; #File; #Other };
  public type RestaurantCategory = { #Veg; #NonVeg; #Vegan };
  public type Metal = { #Gold; #Silver; #Platinum; #Other };
  public type PackType = { #Strip; #Bottle; #Tablet; #Other };

  // ── Alert threshold options (days) ───────────────────────────────────────────
  // 90 = 3 months, 180 = 6 months, 365 = 12 months
  public type ExpiryAlertThreshold = { #Days90; #Days180; #Days365 };

  // ── Shop configuration ───────────────────────────────────────────────────────
  public type ShopConfig = {
    shopName      : Text;
    shopAddress   : Text;
    shopPhone     : Text;
    shopEmail     : Text;
    shopType      : ShopType;
    country       : Text;
    currency      : Text;   // ISO 4217 code e.g. "INR", "USD"
    language      : Language;
    taxSystem     : TaxSystem;
    taxRate       : Float;  // percentage
    dateFormat    : DateFormat;
    numberFormat  : NumberFormat;
    isSetupComplete : Bool;
    expiryAlertThresholdDays : Nat;  // 90 | 180 | 365; default 90
    deadStockAlertDays        : Nat;  // days since last sale to flag dead stock; default 180
    minStockAlertEnabled      : Bool; // whether low-stock alerts are shown; default true
    defaultCharges            : ?SmartDefaultCharges; // smart default charges; null = not set
    gstinNumber               : ?Text;  // GSTIN (India GST registration number); null = not set
    vatNumber                 : ?Text;  // VAT registration number; null = not set
  };

  // ── Engine-specific extra fields (stored per product) ────────────────────────
  public type MobileFields = {
    mobileCategory  : Text;   // "Mobile" | "Laptop" | "Tablet" | "Accessories"
    brand           : Text;
    model           : Text;
    imei            : Text;   // required/validated only when mobileCategory == "Mobile"
    color           : Text;
    storage         : Text;   // e.g. "128GB", "256GB", "512GB", "1TB"
    ram             : Text;   // optional — "4GB", "8GB", "16GB", "32GB"
    processor       : Text;   // optional — mainly for Laptop: "Intel i5", "M1", "Snapdragon" …
    displaySize     : Text;   // optional — for Laptop/Tablet: "13 inch", "14 inch" …
    accessoryType   : Text;   // optional — for Accessories: "Charger", "Headphone", "Power Bank" …
    compatibility   : Text;   // optional — for accessories: compatible device
    warrantyMonths  : Nat;    // warranty period in months
    serialNumber    : Text;   // optional — for Laptop/Tablet serial
    expiryDate      : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type ElectricalFields = {
    itemCategory  : Text;   // "Switch" | "Wire/Cable" | "MCB/Fuse/RCCB" | "LED/CFL/Bulb" | "Fan" | … | "Other"
    brand         : Text;
    model         : Text;   // optional
    ampereRating  : Text;   // AMP — e.g. "6A", "16A", "32A", "63A", "100A", "Custom"
    voltageRating : Text;   // e.g. "230V", "415V", "12V", "24V", "Custom"
    wattage       : Text;   // optional — for bulbs/fans: "9W", "18W", "60W"
    wireGauge     : Text;   // optional — for wire/cable: "1mm", "1.5mm", "2.5mm", "4mm"
    lengthUnit    : Text;   // "Piece" | "Meter" | "Roll" | "Box" | "Set" | "Bundle" | "Pair"
    color         : Text;   // optional — for wires: "Red", "Black", "Yellow", "Green", "Blue"
    isiCertified  : Bool;   // ISI/CE/UL certification mark — default false
    batchNumber   : Text;   // optional
    expiryDate    : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type ElectronicsFields = {
    brand          : Text;
    model          : Text;
    serialNo       : Text;
    warrantyMonths : Nat;
    expiryDate     : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  // Medical keeps expiryDate: Text (required) for backward compatibility
  public type MedicalFields = {
    company      : Text;
    batchNo      : Text;
    expiryDate   : Text;  // ISO date string "YYYY-MM-DD" — required
    composition  : Text;
    packType     : PackType;
    isControlled : Bool;
  };

  public type ClothingFields = {
    brand      : Text;
    itemName   : Text;
    size       : Text;
    color      : Text;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type FootwearFields = {
    brand      : Text;
    model      : Text;
    size       : Text;
    sizeSystem : SizeSystem;
    color      : Text;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type GroceryFields = {
    decimalQtyEnabled : Bool;
    expiryDate        : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type StationeryFields = {
    subType  : StationerySubType;
    // book
    bookClass   : Text;
    bookSubject : Text;
    bookMedium  : Text;
    // notebook
    notebookSize  : Text;
    notebookPages : Nat;
    // pen
    penBrand   : Text;
    penColor   : Text;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type RestaurantFields = {
    category   : RestaurantCategory;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type AutoPartsFields = {
    vehicleBrand : Text;
    vehicleModel : Text;
    partName     : Text;
    partNo       : Text;
    expiryDate   : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type HardwareFields = {
    sku        : Text;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type BuildingMaterialFields = {
    brand           : Text;
    material_type   : Text;
    grade           : Text;
    size_dimensions : Text;
    weight          : Text;
    color           : Text;
    expiryDate      : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type JewelryFields = {
    metal         : Metal;
    weightGrams   : Float;
    purity        : Text;   // e.g. "22K" or "92.5%"
    makingCharges : Float;
    metalRate     : Float;  // per gram, updated daily
    expiryDate    : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type SalonFields = {
    duration   : Nat;   // minutes
    staffName  : Text;
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type GeneralFields = {
    expiryDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
  };

  public type FruitsVegetablesFields = {
    productType   : Text;   // Fruit | Vegetable | Herb
    variety       : Text;   // e.g. Mango | Tomato | Spinach
    unit          : Text;   // kg | dozen | piece | bundle | gram
    seasonalTag   : Text;   // Summer | Winter | All-Season | Monsoon
    originSource  : Text;   // farm/supplier name or city
    freshnessDate : ?Text;  // ISO date string "YYYY-MM-DD", optional
    batchNumber   : ?Text;  // optional batch/lot number
  };

  public type AgroProductsFields = {
    productType  : Text;   // Seeds | Fertilizer | Pesticide | Farming Tools | Animal Feed | Crop Protection
    brand        : Text;
    cropType     : Text;
    weight       : Float;
    weightUnit   : Text;   // kg | g | L | mL | bag | sack
    expiryDate   : ?Text;  // ISO date string "YYYY-MM-DD", optional (user-set)
    batchNumber  : ?Text;  // optional
  };

  public type EngineFields = {
    #Mobile          : MobileFields;
    #Electronics     : ElectronicsFields;
    #Medical         : MedicalFields;
    #Clothing        : ClothingFields;
    #Footwear        : FootwearFields;
    #Grocery         : GroceryFields;
    #Stationery      : StationeryFields;
    #Restaurant      : RestaurantFields;
    #AutoParts       : AutoPartsFields;
    #Hardware        : HardwareFields;
    #Jewelry         : JewelryFields;
    #Salon           : SalonFields;
    #General         : GeneralFields;
    #BuildingMaterial : BuildingMaterialFields;
    #AgroProducts       : AgroProductsFields;
    #FruitsVegetables   : FruitsVegetablesFields;
    #Electrical         : ElectricalFields;
  };

  // ── Smart default charges (per-shop, saved in ShopConfig) ────────────────────
  public type SmartDefaultCharges = {
    defaultTransportCharge : ?Text;  // stored as Text for currency flexibility
    defaultLabourCharge    : ?Text;
    defaultOtherCharge     : ?Text;
  };

  // ── Product ──────────────────────────────────────────────────────────────────
  public type Product = {
    id             : ProductId;
    shopId         : Text;      // shop identifier — matches ShopConfig.shopName used in roles
    name           : Text;
    shopType       : ShopType;
    category       : Text;
    unit           : Text;
    costPrice      : Float;
    retailPrice    : Float;
    wholesalePrice : Float;
    transportCost  : ?Float;   // optional transport cost per unit
    labourCost     : ?Float;   // optional labour cost per unit
    barcode        : ?Text;    // optional barcode — scan or manual, stored and searchable
    var stock      : Float;
    minStock       : Float;
    isActive       : Bool;
    engineFields   : EngineFields;
    createdAt      : Timestamp;
    updatedAt      : Timestamp;
    var lastSaleTime : ?Timestamp; // set when a bill is saved containing this product
  };

  // Shared (non-mutable) version for API boundary
  public type ProductView = {
    id             : ProductId;
    shopId         : Text;      // shop identifier — matches ShopConfig.shopName used in roles
    name           : Text;
    shopType       : ShopType;
    category       : Text;
    unit           : Text;
    costPrice      : Float;
    retailPrice    : Float;
    wholesalePrice : Float;
    transportCost  : ?Float;   // optional transport cost per unit
    labourCost     : ?Float;   // optional labour cost per unit
    barcode        : ?Text;    // optional barcode — scan or manual, stored and searchable
    stock          : Float;
    minStock       : Float;
    isActive       : Bool;
    engineFields   : EngineFields;
    createdAt      : Timestamp;
    updatedAt      : Timestamp;
    lastSaleTime   : ?Timestamp; // set when a bill is saved containing this product
  };

  public type CreateProductInput = {
    shopId         : Text;      // shop identifier — must be set by frontend from active shop
    name           : Text;
    shopType       : ShopType;
    category       : Text;
    unit           : Text;
    costPrice      : Float;
    retailPrice    : Float;
    wholesalePrice : Float;
    transportCost  : ?Float;   // optional transport cost per unit
    labourCost     : ?Float;   // optional labour cost per unit
    barcode        : ?Text;    // optional barcode
    stock          : Float;
    minStock       : Float;
    isActive       : Bool;
    engineFields   : EngineFields;
  };

  public type UpdateProductInput = {
    id             : ProductId;
    shopId         : Text;      // shop identifier — required for ownership validation
    name           : Text;
    category       : Text;
    unit           : Text;
    costPrice      : Float;
    retailPrice    : Float;
    wholesalePrice : Float;
    transportCost  : ?Float;   // optional transport cost per unit
    labourCost     : ?Float;   // optional labour cost per unit
    barcode        : ?Text;    // optional barcode
    stock          : Float;
    minStock       : Float;
    isActive       : Bool;
    engineFields   : EngineFields;
  };

  public type ProductFilter = {
    shopId     : ?Text;     // filter by shop; null = no filter (admin/internal use)
    shopType   : ?ShopType;
    category   : ?Text;
    isActive   : ?Bool;
    searchName : ?Text;
  };

  // ── Bill / Invoice ───────────────────────────────────────────────────────────
  public type TaxBreakdown = {
    cgst : Float;  // Central GST (India)
    sgst : Float;  // State GST (India)
    igst : Float;  // Integrated GST (India)
  };

  public type BillItem = {
    productId  : ProductId;
    name       : Text;
    qty        : Float;
    unit       : Text;
    rate       : Float;
    discount   : Float;  // amount
    taxAmt     : Float;
    lineTotal  : Float;
  };

  public type ExtraCharge = {
    description : Text;
    amount      : Float;
  };

  public type PaymentType = { #full; #partial };

  public type Bill = {
    id               : BillId;
    shopId           : Text;        // shop identifier — isolates bills per shop
    billNumber       : Nat;
    customerName     : Text;
    customerPhone    : Text;
    items            : [BillItem];
    subtotal         : Float;
    totalDiscount    : Float;
    taxSystem        : TaxSystem;
    taxRate          : Float;
    taxBreakdown     : TaxBreakdown;
    extraCharges     : [ExtraCharge];
    grandTotal       : Float;
    profit           : Float;
    priceType        : PriceType;
    status           : BillStatus;
    shareToken       : ?Text;       // optional random token for public bill sharing
    staffCreatedBy   : ?Principal;  // set when a staff member creates the bill
    createdAt        : Timestamp;
    paymentType      : PaymentType; // #full | #partial
    amountPaid       : Float;       // for partial: amount paid so far; for full: == grandTotal
    amountPending    : Float;       // grandTotal - amountPaid; 0.0 for full
    lastReminderSent : ?Timestamp;  // timestamp of last WhatsApp reminder, null if not sent
  };

  // Read-safe alias for API boundary (Bill has no mutable fields, so same shape)
  public type BillView = Bill;

  public type CreateBillInput = {
    shopId         : Text;           // shop identifier — must be set by frontend from active shop
    customerName   : Text;
    customerPhone  : Text;
    items          : [BillItem];
    extraCharges   : [ExtraCharge];
    priceType      : PriceType;
    billDiscount   : Float;          // bill-level discount amount
    staffCreatedBy : ?Principal;     // set by mixin when caller is staff
    paymentType    : PaymentType;    // #full | #partial
    amountPaid     : Float;          // for full: set equal to grandTotal; for partial: actual amount received
  };

  public type BillFilter = {
    shopId         : ?Text;       // filter by shop; null = no filter (admin/internal use)
    fromDate       : ?Timestamp;
    toDate         : ?Timestamp;
    searchCustomer : ?Text;
    status         : ?BillStatus;
  };

  // ── Analytics ────────────────────────────────────────────────────────────────
  public type SalesSummary = {
    totalSales  : Float;
    totalProfit : Float;
    billCount   : Nat;
  };

  public type TopProduct = {
    productId : ProductId;
    name      : Text;
    totalQty  : Float;
    revenue   : Float;
    profit    : Float;
  };

  public type LowStockProduct = {
    productId : ProductId;
    name      : Text;
    stock     : Float;
    minStock  : Float;
  };

  public type NearExpiryProduct = {
    productId  : ProductId;
    name       : Text;
    expiryDate : Text;
    daysLeft   : Int;
  };

  public type DeadStockProduct = {
    productId    : ProductId;
    name         : Text;
    lastSaleTime : ?Timestamp; // null = never sold
    daysInactive : Nat;        // days since last sale (or since creation if never sold)
  };

  public type AnalyticsPeriod = { #Today; #Week; #Month };
};
