import React, { useState } from "react";
import { RestaurantCategory, type ShopType } from "../backend";
import { useApi } from "../lib/api";

interface QuickMenuItem {
  name: string;
  unit: string;
  category: "Veg" | "NonVeg";
}
interface QuickMenuCategoryDef {
  label: string;
  items: QuickMenuItem[];
}

const QUICK_MENU_CATEGORIES: QuickMenuCategoryDef[] = [
  {
    label: "Breads & Sides",
    items: [
      { name: "Roti", unit: "Piece", category: "Veg" },
      { name: "Butter Roti", unit: "Piece", category: "Veg" },
      { name: "Tandoori Roti", unit: "Piece", category: "Veg" },
      { name: "Rayta", unit: "Bowl", category: "Veg" },
      { name: "Green Salad", unit: "Plate", category: "Veg" },
      { name: "Papad", unit: "Piece", category: "Veg" },
    ],
  },
  {
    label: "Beverages",
    items: [
      { name: "Water Bottle", unit: "Bottle", category: "Veg" },
      { name: "Soda Bottle", unit: "Bottle", category: "Veg" },
      { name: "Cold Drink", unit: "Glass", category: "Veg" },
      { name: "Tea", unit: "Glass", category: "Veg" },
      { name: "Coffee", unit: "Glass", category: "Veg" },
      { name: "Lassi", unit: "Glass", category: "Veg" },
      { name: "Fresh Juice", unit: "Glass", category: "Veg" },
      { name: "Beer", unit: "Glass", category: "NonVeg" },
    ],
  },
  {
    label: "Starters",
    items: [
      { name: "Paneer Tikka", unit: "Plate", category: "Veg" },
      { name: "Veg Spring Roll", unit: "Plate", category: "Veg" },
      { name: "Mushroom Tikka", unit: "Plate", category: "Veg" },
      { name: "Aloo Tikki", unit: "Plate", category: "Veg" },
      { name: "Chicken Tikka", unit: "Plate", category: "NonVeg" },
      { name: "Fish Fry", unit: "Plate", category: "NonVeg" },
      { name: "Egg Roll", unit: "Plate", category: "NonVeg" },
    ],
  },
  {
    label: "Main Course",
    items: [
      { name: "Dal Makhani", unit: "Bowl", category: "Veg" },
      { name: "Paneer Butter Masala", unit: "Bowl", category: "Veg" },
      { name: "Veg Biryani", unit: "Plate", category: "Veg" },
      { name: "Shahi Paneer", unit: "Bowl", category: "Veg" },
      { name: "Chole", unit: "Bowl", category: "Veg" },
      { name: "Chicken Curry", unit: "Bowl", category: "NonVeg" },
      { name: "Mutton Biryani", unit: "Plate", category: "NonVeg" },
      { name: "Egg Curry", unit: "Bowl", category: "NonVeg" },
      { name: "Fish Curry", unit: "Bowl", category: "NonVeg" },
    ],
  },
  {
    label: "Rice & Bread",
    items: [
      { name: "Steamed Rice", unit: "Plate", category: "Veg" },
      { name: "Jeera Rice", unit: "Plate", category: "Veg" },
      { name: "Naan", unit: "Piece", category: "Veg" },
      { name: "Paratha", unit: "Piece", category: "Veg" },
      { name: "Chapati", unit: "Piece", category: "Veg" },
      { name: "Poori", unit: "Piece", category: "Veg" },
      { name: "Bhatura", unit: "Piece", category: "Veg" },
    ],
  },
  {
    label: "Desserts",
    items: [
      { name: "Gulab Jamun", unit: "Piece", category: "Veg" },
      { name: "Ice Cream", unit: "Bowl", category: "Veg" },
      { name: "Kheer", unit: "Bowl", category: "Veg" },
      { name: "Rasgulla", unit: "Piece", category: "Veg" },
      { name: "Jalebi", unit: "Plate", category: "Veg" },
      { name: "Halwa", unit: "Bowl", category: "Veg" },
    ],
  },
];

interface SelectedItem extends QuickMenuItem {
  price: string;
  stock: string;
}

export interface RestaurantQuickMenuModalProps {
  shopId: string;
  shopType: ShopType;
  onClose: () => void;
  onProductsAdded: () => void;
}

export function RestaurantQuickMenuModal({
  shopId,
  shopType,
  onClose,
  onProductsAdded,
}: RestaurantQuickMenuModalProps) {
  const { createProduct } = useApi();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedItem>
  >({});
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [priceErrors, setPriceErrors] = useState<Record<string, boolean>>({});
  const [stockErrors, setStockErrors] = useState<Record<string, boolean>>({});

  const currentCategory = QUICK_MENU_CATEGORIES[activeCategory];
  const itemKey = (item: QuickMenuItem) =>
    `${item.name}||${item.unit}||${item.category}`;

  const toggleItem = (item: QuickMenuItem) => {
    const key = itemKey(item);
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = { ...item, price: "", stock: "" };
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      for (const item of currentCategory.items) {
        const key = itemKey(item);
        if (!next[key]) next[key] = { ...item, price: "", stock: "" };
      }
      return next;
    });
  };

  const clearAll = () => setSelectedItems({});

  const updateField = (
    key: string,
    field: "price" | "stock",
    value: string,
  ) => {
    setSelectedItems((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
    if (field === "price")
      setPriceErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    if (field === "stock")
      setStockErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
  };

  const selectedList = Object.entries(selectedItems).map(([key, item]) => ({
    key,
    ...item,
  }));

  const handleSave = async () => {
    if (selectedList.length === 0) return;
    const newPE: Record<string, boolean> = {};
    const newSE: Record<string, boolean> = {};
    for (const item of selectedList) {
      if (
        !item.price ||
        Number.isNaN(Number.parseFloat(item.price)) ||
        Number.parseFloat(item.price) < 0
      )
        newPE[item.key] = true;
      if (
        !item.stock ||
        Number.isNaN(Number.parseInt(item.stock)) ||
        Number.parseInt(item.stock) < 0
      )
        newSE[item.key] = true;
    }
    if (Object.keys(newPE).length > 0 || Object.keys(newSE).length > 0) {
      setPriceErrors(newPE);
      setStockErrors(newSE);
      return;
    }
    setSaving(true);
    let count = 0;
    for (const item of selectedList) {
      try {
        const restCat =
          item.category === "NonVeg"
            ? RestaurantCategory.NonVeg
            : RestaurantCategory.Veg;
        const price = Number.parseFloat(item.price);
        const stock = Number.parseInt(item.stock);
        await createProduct({
          shopId,
          shopType,
          name: item.name,
          retailPrice: price,
          wholesalePrice: price,
          unit: item.unit,
          isActive: true,
          minStock: 0,
          stock,
          costPrice: 0,
          category: item.category,
          engineFields: {
            __kind__: "Restaurant",
            Restaurant: { category: restCat },
          },
        });
        count++;
      } catch (_e) {
        /* continue */
      }
    }
    setSaving(false);
    setSavedCount(count);
    onProductsAdded();
    setTimeout(onClose, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg my-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Quick Menu</h2>
            <p className="text-xs text-gray-500">
              Select items, set price &amp; stock, save all at once
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none font-light"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {savedCount > 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-2 text-green-500">&#10003;</div>
            <p className="text-green-600 font-semibold text-lg">
              {savedCount} item{savedCount > 1 ? "s" : ""} added!
            </p>
          </div>
        ) : (
          <>
            <div className="flex overflow-x-auto gap-1 px-3 pt-3 pb-1">
              {QUICK_MENU_CATEGORIES.map((cat, idx) => (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setActiveCategory(idx)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${activeCategory === idx ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-gray-400">
                {currentCategory.items.length} items
              </span>
              <button
                type="button"
                onClick={selectAll}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                Select All
              </button>
            </div>
            <div className="px-3 pb-2 grid grid-cols-1 gap-1 max-h-52 overflow-y-auto">
              {currentCategory.items.map((item) => {
                const key = itemKey(item);
                const checked = !!selectedItems[key];
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => toggleItem(item)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-colors ${checked ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`}
                    >
                      {checked && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <title>Selected</title>
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 font-medium text-sm text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400">{item.unit}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${item.category === "Veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.category === "Veg" ? "Veg" : "Non-Veg"}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedList.length > 0 && (
              <div className="border-t border-gray-200 px-3 pt-3 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {selectedList.length} item
                    {selectedList.length > 1 ? "s" : ""} — Enter price &amp;
                    stock
                  </span>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    Clear all
                  </button>
                </div>
                <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                  {selectedList.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <span className="flex-1 text-xs font-medium text-gray-700 truncate">
                        {item.name}{" "}
                        <span className="text-gray-400 font-normal">
                          ({item.unit})
                        </span>
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                          updateField(item.key, "price", e.target.value)
                        }
                        className={`w-20 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 ${priceErrors[item.key] ? "border-red-400" : "border-gray-300"}`}
                      />
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Stock"
                        value={item.stock}
                        onChange={(e) =>
                          updateField(item.key, "stock", e.target.value)
                        }
                        className={`w-16 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 ${stockErrors[item.key] ? "border-red-400" : "border-gray-300"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={selectedList.length === 0 || saving}
                className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving
                  ? "Saving..."
                  : selectedList.length > 0
                    ? `Save ${selectedList.length} Item${selectedList.length > 1 ? "s" : ""}`
                    : "Save All"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
