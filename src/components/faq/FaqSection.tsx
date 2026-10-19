'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  swahiliHook: string;
  a: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'How fast will my food arrive at my hostel?',
      swahiliHook: 'Mnakam haraka aje?',
      a: 'Cooked meals display live estimated preparation times (e.g. 5-18 mins). Once picked up, our riders deliver across MMU, CUEA, Rongai town, and Karen in 10 to 20 minutes flat.',
    },
    {
      q: 'Can I order fresh groceries like Sukuma Wiki, Tomatoes & Broccoli?',
      swahiliHook: 'Mboga ni safi na fresh?',
      a: 'Yes! We source directly from peri-urban smallholder farms in Ongata Rongai and Kajiado. Our Sukuma Wiki is washed, chopped, and bagged ready to cook.',
    },
    {
      q: 'How does Lipa na M-Pesa work on DukaPlug?',
      swahiliHook: 'Malipo ya M-Pesa inafanyaje kazi?',
      a: 'When you tap "Lipa na M-Pesa", we trigger an instant Daraja STK push notification directly on your smartphone screen. Simply enter your M-Pesa PIN, and your order is instantly dispatched.',
    },
    {
      q: 'What if I am at Maasai Lodge or Karen Plains?',
      swahiliHook: 'Je maeneo ya mbali kama Tuala & Karen?',
      a: 'We have designated dispatch zones covering Maasai Lodge, Tuala, Galleria, and Karen Plains with transparent pre-calculated delivery fees starting from KES 50.',
    },
    {
      q: 'Can I order multiple things in one bag (e.g. Biryani + Sukuma + Charger)?',
      swahiliHook: 'Naeza changanya chakula na shopping?',
      a: 'Absolutely! That is why we are DukaPlug. Our insulated multi-compartment delivery crates isolate steaming hot meals from chilled items and electronics.',
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-36 px-6 bg-[#070B06] relative">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131C11] border border-[#2F7A1F]/40 text-[#FFC400] text-xs font-black tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? Tuko Live</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F6F4EC]">
            FREQUENTLY <br />
            <span className="text-[#4CA82E]">ASKED QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0E150D] border border-[#1E2B1A] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#121910] transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#FFC400]">
                      {faq.swahiliHook}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`p-2 rounded-xl bg-black/40 text-neutral-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#4CA82E]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#A0B49E] leading-relaxed border-t border-[#1E2B1A]/40 bg-[#0B100A]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

