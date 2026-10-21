'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  is_available: boolean;
  vendor?: {
    id: string;
    name: string;
    rating: number;
    location: string | null;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  updateQuantity: (product: Product, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (product: Product) => {
    setItems((prev) => prev.filter((i) => i.product.id !== product.id));
  };

  const updateQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      removeItem(product);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === product.id ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, cartCount, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within CartProvider');
  return context;
}