'use client';

import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Users } from 'lucide-react';
import { DELIVERY_ZONES } from '@/data/products';
import { formatKES } from '@/lib/utils';

interface ZonesSectionProps {
  onSelectZone: (zoneId: string) => void;
  selectedZoneId: string;
}

export default function ZonesSection({
  onSelectZone,
  selectedZoneId,
}: ZonesSectionProps) {
  return (
    <section id="zones" className="py-24 md:py-36 px-6 bg-[#0B0F0A] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E2B1A] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-black tracking-widest uppercase text-[#4CA82E]">
              Hyper-Local Radar
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F6F4EC]">
              DELIVERY <span className="text-[#FFC400]">ZONES</span>
            </h2>
            <p className="text-sm text-[#9EB29C] max-w-lg">
              Active dispatch riders roaming Ongata Rongai, Karen, MMU, and CUEA corridors. Click a zone to lock in live delivery fee estimates.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131C11] border border-[#2F7A1F]/30 text-xs font-bold text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>55+ Active Riders On Campus Grounds</span>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DELIVERY_ZONES.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <div
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 relative border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#152313] border-[#4CA82E] shadow-[0_0_25px_rgba(76,168,46,0.25)] -translate-y-1'
                    : 'bg-[#0E150D] border-[#1E2B1A] hover:border-[#2F7A1F] hover:bg-[#121910]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-black/40 text-[#4CA82E]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black tracking-wider uppercase text-neutral-400">
                        Zone {zone.id.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 text-[10px] font-bold text-neutral-300">
                      <Users className="w-3 h-3 text-[#FFC400]" />
                      <span>{zone.activeRiders} Riders</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">{zone.name}</h3>
                    <p className="text-xs text-[#8A9C86] mt-0.5">{zone.subLocation}</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1E2B1A] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-[#FFC400]" />
                    <span>~{zone.etaMinutes} mins</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Delivery Fee</span>
                    <span className="text-sm font-black text-[#4CA82E]">
                      {formatKES(zone.deliveryFee)}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -top-2.5 -right-2 px-2.5 py-0.5 rounded-full bg-[#4CA82E] text-black text-[9px] font-black uppercase tracking-wider shadow-md">
                    Selected Zone
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

