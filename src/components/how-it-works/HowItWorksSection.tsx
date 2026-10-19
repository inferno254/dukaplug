'use client';

import React from 'react';
import { MousePointerClick, Smartphone, Bike, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Pick Your Plug',
      swahiliTitle: 'Chagua Vile Unataka',
      desc: 'Pick your supper, sliced greens for tomorrow\'s stew, or dorm chargers with honest preparation time counters.',
      icon: MousePointerClick,
      color: '#4CA82E',
      badge: 'Step 1 • Cart Up',
    },
    {
      number: '02',
      title: 'Lipa na M-Pesa (Daraja)',
      swahiliTitle: 'Lipa Pap Pap',
      desc: 'Instant STK push right to your phone screen. Zero payment lag, zero manual bank numbers to copy.',
      icon: Smartphone,
      color: '#FFC400',
      badge: 'Step 2 • Secure STK',
    },
    {
      number: '03',
      title: 'Nimefika! Fast Dispatch',
      swahiliTitle: 'Tuko Gate / Hostels',
      desc: 'Our electric bodas & riders glide through Rongai, MMU, CUEA, & Karen directly to your hostel gate in 15-25 mins.',
      icon: Bike,
      color: '#2F7A1F',
      badge: 'Step 3 • Delivered',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-36 px-6 bg-[#080D07] relative overflow-hidden">
      {/* Decorative ambient radial line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#2F7A1F]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-black tracking-widest uppercase text-[#FFC400]">
            Speed Protocol
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F6F4EC]">
            HOW IT <span className="text-[#4CA82E]">WORKS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9EB29C]">
            Three smooth kinetic steps between student cravings and opening your dorm door.
          </p>
        </div>

        {/* Step Cards with Connected Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.number}
                className="relative p-8 rounded-3xl bg-[#0E160D] border border-[#1E2B1A] hover:border-[#4CA82E]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-2"
              >
                <div className="space-y-6">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-neutral-700 group-hover:text-[#FFC400] transition-colors">
                      {s.number}
                    </span>
                    <div className="p-3.5 rounded-2xl bg-[#142012] border border-white/5 text-white">
                      <Icon className="w-6 h-6" style={{ color: s.color }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#FFC400]">
                      {s.badge}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#4CA82E] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#7A8E76] font-semibold italic">
                      {s.swahiliTitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#1E2B1A]/60 flex items-center gap-2 text-[11px] font-bold text-[#A8BEA3]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4CA82E]" />
                  <span>Real-time GPS coordination</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

