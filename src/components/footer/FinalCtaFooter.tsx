'use client';

import React from 'react';
import { MessageCircle, ShoppingBag, ArrowUpRight, Heart } from 'lucide-react';

interface FinalCtaFooterProps {
  onOpenCart: () => void;
}

export default function FinalCtaFooter({ onOpenCart }: FinalCtaFooterProps) {
  const whatsappUrl = 'https://wa.me/254700000000?text=Hi%20DukaPlug,%20I%20want%20to%20order%20meals%20and%20groceries%20to%20my%20hostel!';

  return (
    <footer className="relative bg-[#050804] border-t border-[#1E2B1A] pt-20 pb-12 px-6 overflow-hidden">
      {/* Background Soft Brand Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#4CA82E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Massive CTA Banner */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="text-xs font-black tracking-widest uppercase text-[#FFC400]">
            Ready To Get Sorted?
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#F6F4EC] leading-none">
            STAY <span className="text-[#4CA82E]">SORTED.</span> <br />
            ZERO <span className="text-[#FFC400]">HUSTLE.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9EB29C] max-w-xl mx-auto">
            Order fresh meals, Sukuma Wiki, milk, and campus tech directly on the web or through our 24/7 WhatsApp concierge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenCart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2F7A1F] to-[#4CA82E] text-black font-black text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(76,168,46,0.4)] flex items-center justify-center gap-2 hover:opacity-90"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Open Bag & Checkout</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#121E10] border border-[#2F7A1F]/60 text-white hover:text-[#4CA82E] font-black text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>WhatsApp Direct Order</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Brand, Info, Copyright */}
        <div className="pt-16 border-t border-[#1E2B1A]/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7A8E76]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#121910] border border-[#2F7A1F]/40 p-1.5 flex items-center justify-center">
              <img src="/logo.svg" alt="DukaPlug Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-white text-sm">
              Duka<span className="text-[#FFC400]">Plug</span>
            </span>
            <span className="text-[11px] text-neutral-500">
              • Rongai & Nairobi Campus Delivery
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted for Kenyan Students with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>in Ongata Rongai</span>
          </div>

          <div className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} DukaPlug. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

