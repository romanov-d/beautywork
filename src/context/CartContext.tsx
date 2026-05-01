"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CART_VERSION = "v2";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  image: string;
  specs: string[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart_version") !== CART_VERSION) {
        localStorage.removeItem("cart");
        localStorage.setItem("cart_version", CART_VERSION);
      }
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((newItem: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i =>
          i.id === newItem.id ? { ...i, qty: Math.min(99, i.qty + 1) } : i
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.min(99, Math.max(1, item.qty + delta)) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const count = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
