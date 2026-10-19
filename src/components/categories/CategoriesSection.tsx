'use client';

import React, { useState } from 'react';
import { Plus, Flame, Clock, Sparkles, Check, Info } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { formatKES } from '@/lib/utils';

interface CategoriesSectionProps {
  onAddToCart: (product: Product) => void;
  selectedCategoryTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
}

const TABS = [
  { id: 'all',        label: 'All' },
  { id: 'meals',      label: '🍗 Meals' },
  { id: 'groceries',  label: '🥦 Groceries' },
  { id: 'essentials', label: '🛒 Essentials' },
  { id: 'shopping',   label: '⚡ Gear' },
];

export default function CategoriesSection({
  onAddToCart,
  selectedCategoryTab,
  onTabChange,
  searchQuery,
}: CategoriesSectionProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesTab = selectedCategoryTab === 'all' || p.category === selectedCategoryTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section id="categories" className="py-8 px-4 md:px-6 bg-[#0B0F0A]">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#1E2B1A] pb-4">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#4CA82E]">
              Campus Smart Store
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F4EC] mt-0.5">
              Order <span className="text-[#FFC400]">Smart</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${
                  selectedCategoryTab === tab.id
                    ? 'bg-[#4CA82E] text-black shadow-md shadow-[#4CA82E]/25'
                    : 'bg-[#121910] text-[#9EB29C] hover:text-white border border-[#1E2B1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-sm text-[#9EB29C] text-center py-12">
            No products found{searchQuery ? ` for "${searchQuery}"` : ''}.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-xl bg-[#0E150D] border border-[#1E2B1A] hover:border-[#4CA82E]/50 p-3 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-neutral-900 mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.cookTimeMinutes && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-amber-500/40 text-[9px] font-bold text-[#FFC400] flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {prod.cookTimeMinutes}m
                    </div>
                  )}
                  {prod.farmFreshSource && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-emerald-500/40 text-[9px] font-bold text-[#4CA82E] flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      Fresh
                    </div>
                  )}
                  {prod.campusFavorite && (
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-[#FFC400] text-black text-[8px] font-black uppercase">
                      Fave
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-xs font-bold text-white group-hover:text-[#4CA82E] transition-colors line-clamp-2 leading-snug">
                    {prod.name}
                  </h3>
                  {prod.portionSize && (
                    <p className="text-[10px] text-neutral-500 flex items-start gap-0.5 line-clamp-1">
                      <Info className="w-2.5 h-2.5 text-[#4CA82E] mt-0.5 shrink-0" />
                      {prod.portionSize}
                    </p>
                  )}
                </div>

                {/* Price + Add */}
                <div className="pt-2 mt-2 border-t border-[#1E2B1A] flex items-center justify-between gap-1">
                  <div>
                    <span className="text-sm font-black text-[#FFC400]">
                      {formatKES(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="block text-[9px] text-neutral-600 line-through">
                        {formatKES(prod.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(prod)}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-0.5 ${
                      addedId === prod.id
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#182415] hover:bg-[#4CA82E] text-white hover:text-black border border-[#2F7A1F]/50'
                    }`}
                  >
                    {addedId === prod.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
