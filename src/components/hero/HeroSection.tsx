'use client';

import React from 'react';
import { Sparkles, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';
import SceneContainer from '@/components/3d/SceneContainer';
import Marquee from '@/components/ui/Marquee';

interface HeroSectionProps {
  onOpenCart: () => void;
  onExploreCategories: () => void;
}

export default function HeroSection({
  onOpenCart,
  onExploreCategories,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0F0A] pt-6 md:pt-10">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2F7A1F]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#FFC400]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Floating Glass Navigation */}
      <header className="relative z-30 max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#121910] border border-[#2F7A1F]/40 p-2 flex items-center justify-center shadow-lg shadow-[#2F7A1F]/10">
            <img src="/logo.svg" alt="DukaPlug Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight flex items-center">
              <span className="text-[#4CA82E]">Duka</span>
              <span className="text-[#FFC400]">Plug</span>
            </span>
            <span className="block text-[10px] tracking-widest text-[#8A9C86] uppercase font-bold">
              Rongai • MMU • Karen
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-bold text-[#A8BEA3]">
          <a href="#the-bag" className="hover:text-white transition-colors">The Bag</a>
          <a href="#categories" className="hover:text-white transition-colors">Order Meals & Greens</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#zones" className="hover:text-white transition-colors">Delivery Zones</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="px-5 py-2.5 rounded-full bg-[#182415] border border-[#4CA82E]/50 text-xs font-black text-[#F6F4EC] hover:bg-[#2F7A1F] transition-all flex items-center gap-2 group shadow-lg"
          >
            <span>My Bag</span>
            <span className="w-2 h-2 rounded-full bg-[#FFC400] group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Core Cinematic Display */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col lg:flex-row items-center justify-center py-8 lg:py-12 gap-8">
        {/* Left Column: Giant Display Typography & Punchy Copy */}
        <div className="w-full lg:w-3/5 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162214] border border-[#2F7A1F]/50 text-[#FFC400] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>Smart Campus Delivery In Under 20 Mins</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-[#F6F4EC]">
            LETA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CA82E] via-[#FFC400] to-[#4CA82E]">
              SORTED
            </span> <br />
            PAP.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#B0C4AC] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            From sizzling hot <strong className="text-white">Kuku Fry</strong> and <strong className="text-white">Chapati Madondo</strong> to fresh <strong className="text-white">Sukuma Wiki, Broccoli & Tomatoes</strong> straight from Rongai. Lipa na M-Pesa, delivered right to your hostel door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreCategories}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2F7A1F] to-[#4CA82E] hover:from-[#4CA82E] hover:to-[#FFC400] text-black font-black text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(76,168,46,0.4)] flex items-center justify-center gap-2"
            >
              <span>Order Now (Fast Dispatch)</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              href="#the-bag"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#121910] border border-[#1E2B1A] hover:border-[#4CA82E]/50 text-xs font-bold tracking-wider uppercase text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Explore The 3D Bag</span>
              <span className="text-[#FFC400]">↓</span>
            </a>
          </div>

          {/* Social Proof & Campus Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#8A9C86] font-semibold">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFC400]" />
              <span>Avg Cook & Dispatch: 16 Mins</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4CA82E]" />
              <span>Instant M-Pesa STK Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Delivery Bag & Orbiting Produce */}
        <div className="w-full lg:w-2/5 h-[340px] sm:h-[420px] lg:h-[520px] relative flex items-center justify-center">
          <SceneContainer className="w-full h-full" />
          
          {/* Floating Live Badge Over 3D */}
          <div className="absolute bottom-4 right-4 bg-[#0E150D]/90 backdrop-blur-md border border-[#2F7A1F]/40 px-3.5 py-2 rounded-xl text-left pointer-events-none shadow-xl">
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Active Hub
            </div>
            <div className="text-xs font-black text-white">Rongai • MMU Hostels</div>
          </div>
        </div>
      </div>

      {/* Ticker / Marquee Banner at Section Bottom */}
      <div className="relative z-20 w-full mt-auto">
        <Marquee />
      </div>
    </section>
  );
}

