'use client';

import React from 'react';
import { Flame, Carrot, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface ExplodedBagSectionProps {
  onSelectCategory: (cat: 'meals' | 'groceries' | 'shopping') => void;
}

export default function ExplodedBagSection({
  onSelectCategory,
}: ExplodedBagSectionProps) {
  const layers = [
    {
      id: 'hot-meals',
      category: 'meals' as const,
      title: 'LAYER 01: Sizzling Hot Meals',
      badge: 'Prep in 5 - 18 Mins',
      desc: 'Cooked fresh on order. Steaming Kuku Fry, Smokies Pasua, coastal Biryani, and soft Chapatis delivered with zero heat loss.',
      icon: Flame,
      color: '#FFC400',
      bgColor: 'from-amber-950/40 via-[#181308] to-[#0E150D]',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      tagText: 'Freshly Cooked',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'fresh-produce',
      category: 'groceries' as const,
      title: 'LAYER 02: Farm-Fresh Rongai Greens',
      badge: 'Farm to Sufuria',
      desc: 'No middleman market markup. Triple-washed sliced Sukuma Wiki, plump red tomatoes, broccoli crowns, and sweet cabbages.',
      icon: Carrot,
      color: '#4CA82E',
      bgColor: 'from-emerald-950/40 via-[#0B1809] to-[#0E150D]',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      tagText: 'Farm Harvested',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'shopping-dorm',
      category: 'shopping' as const,
      title: 'LAYER 03: Shopping & Hostel Paraphernalia',
      badge: 'Zero Stress',
      desc: 'Everything you need in the dorms: rapid kettles, fast GaN charger cables, Brookside milk cartons, instant noodles, and snacks.',
      icon: Sparkles,
      color: '#2F7A1F',
      bgColor: 'from-green-950/40 via-[#0F170D] to-[#0E150D]',
      borderColor: 'border-green-600/30 hover:border-[#4CA82E]',
      tagText: 'Campus Essentials',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="the-bag" className="relative py-24 md:py-36 px-6 bg-[#070A06] overflow-hidden">
      {/* Background Section Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4CA82E]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131C11] border border-[#2F7A1F]/40 text-[#4CA82E] text-xs font-black tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>X-Ray Vision • Inside The Plug</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F6F4EC]">
            UNPACK <br />
            <span className="text-[#FFC400]">THE DUKA BAG</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9EB29C] leading-relaxed">
            One delivery crate, split intelligently. Your hot sizzling supper never sweats against your chilled milk or fresh crisp sukuma greens.
          </p>
        </div>

        {/* 3 Layered Exploded Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.id}
                className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${layer.bgColor} border ${layer.borderColor} transition-all duration-500 hover:-translate-y-2 group shadow-2xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Floating Top Image with Glass Effect */}
                <div className="space-y-6">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                    <img
                      src={layer.image}
                      alt={layer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                      {layer.tagText}
                    </div>
                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
                      <Icon className="w-4 h-4" style={{ color: layer.color }} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#FFC400]">
                        {layer.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white group-hover:text-[#FFC400] transition-colors leading-tight">
                      {layer.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A0B49E] leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onSelectCategory(layer.category)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#142012] border border-[#2F7A1F]/40 hover:bg-[#4CA82E] hover:text-black text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Browse {layer.title.split(':')[1]}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

