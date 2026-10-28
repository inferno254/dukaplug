'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

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
  syncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [syncing, setSyncing] = useState(false);
  const { user } = useAuth();

  // Load cart from Supabase when user changes
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    let cancelled = false;
    setSyncing(true);

    const loadCart = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('cart_items')
          .select('*, product:products(*, vendor:vendors(*))')
          .eq('user_id', user.id);

        if (error) throw error;

        if (!cancelled && data) {
          const loaded: CartItem[] = data.map((row: any) => ({
            product: row.product,
            quantity: row.quantity,
          }));
          setItems(loaded);
        }
      } catch (err) {
        console.error('Failed to load cart:', err);
      } finally {
        if (!cancelled) setSyncing(false);
      }
    };

    loadCart();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Persist cart to Supabase when items change and user is logged in
  const persistCart = useCallback(async (newItems: CartItem[]) => {
    if (!user) return;

    try {
      // Delete all existing cart items for this user, then insert new ones
      const { error: deleteError } = await (supabase as any)
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      if (newItems.length > 0) {
        const rows = newItems.map((item) => ({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
        }));

        const { error: insertError } = await (supabase as any)
          .from('cart_items')
          .insert(rows);

        if (insertError) throw insertError;
      }
    } catch (err) {
      console.error('Failed to persist cart:', err);
    }
  }, [user?.id]);

  // Debounced persistence
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      persistCart(items);
    }, 500);
    return () => clearTimeout(timer);
  }, [items, user?.id, persistCart]);

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
      value={{ items, cartCount, addItem, removeItem, updateQuantity, clearCart, syncing }}
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