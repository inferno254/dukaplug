'use client';

import React from 'react';

interface MarqueeProps {
  items?: string[];
  direction?: 'left' | 'right';
  speed?: string;
  className?: string;
}

export default function Marquee({
  items = [
    'LETA HARAKA SANA',
    'RONGAI • MMU • CUEA • KAREN',
    'FRESH SUKUMA & BROCCOLI',
    'SORTED PAP NA M-PESA',
    'HOT MEALS IN 15 MINS',
    'BEST CAMPUS PLUG 2026',
    'NO DRAMA • REAL TIME DISPATCH',
  ],
  direction = 'left',
  speed = '35s',
  className = '',
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-3 border-y border-[#1E2B1A] bg-[#0E150D]/90 backdrop-blur-md ${className}`}>
      <div
        className="flex shrink-0 items-center gap-8 animate-marquee"
        style={{
          animationDuration: speed,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="flex items-center gap-6">
            <span className="text-xs md:text-sm tracking-[0.25em] font-extrabold text-[#F6F4EC] uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
          </div>
        ))}
      </div>
      <div
        className="flex shrink-0 items-center gap-8 animate-marquee"
        style={{
          animationDuration: speed,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
        aria-hidden="true"
      >
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="flex items-center gap-6">
            <span className="text-xs md:text-sm tracking-[0.25em] font-extrabold text-[#F6F4EC] uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
          </div>
        ))}
      </div>
    </div>
  );
}

