'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Product {
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

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getByCategory: (category: string) => Product[];
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getByCategory = useCallback(
    (category: string) => {
      return products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    },
    [products]
  );

  return { products, loading, error, refetch: fetchProducts, getByCategory };
}