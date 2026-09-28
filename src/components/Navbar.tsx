'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Crown,
  KeyRound,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Receipt,
  Calendar,
  Compass
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

export function Navbar() {
  const pathname = usePathname();
  const { metrics } = useHotel();

  const navLinks = [
    { href: '/', label: 'SUITES COCKPIT', sub: 'PRESIDENTIAL INVENTORY' },
    { href: '/concierge/', label: 'BUTLER & DINING', sub: 'WHITE-GLOVE SERVICE' },
    { href: '/wellness/', label: 'THERMAL SANCTUARY', sub: 'SPA & PRIVATE CABANA' },
    { href: '/audit/', label: 'NIGHT AUDIT', sub: 'FOLIO & GENERAL LEDGER' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0e0d0c]/95 backdrop-blur-md border-b border-[#d4af37]/30">
      <div className="bg-[#090807] border-b border-[#2b251e] px-4 py-1 text-xs flex flex-wrap items-center justify-between text-[#a39a8e] font-sans">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold text-[11px] tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>THE GRANDEUR MONACO • 5-STAR PALACE DISTINCTION</span>
          </div>
          <span className="hidden sm:inline-block text-zinc-700">|</span>
          <span className="hidden sm:inline-block text-[11px]">
            REVPAR: <strong className="text-white">${metrics.revPARUSD.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 bg-[#171513] px-2.5 py-0.5 rounded border border-[#3d362a]">
            <span className="text-[#8c8273]">OCCUPANCY:</span>
            <span className="font-bold text-[#d4af37]">{metrics.occupancyPct}% ({metrics.occupiedRooms}/{metrics.totalRooms})</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#171513] px-2.5 py-0.5 rounded border border-[#3d362a]">
            <span className="text-[#8c8273]">ADR:</span>
            <span className="font-bold text-white">${metrics.adrUSD.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-none bg-[#171513] border border-[#d4af37] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
              <Crown className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <div className="text-2xl font-serif tracking-widest text-white flex items-center gap-2">
                HOTEL<span className="gold-gradient-text italic font-normal">GRANDEUR</span>
                <span className="text-[10px] font-sans tracking-widest px-2 py-0.5 bg-[#262015] text-[#d4af37] border border-[#d4af37]/40">
                  TITAN #41
                </span>
              </div>
              <div className="text-[9px] font-sans tracking-[0.25em] text-[#a39a8e] uppercase">
                THE HAUTE PROPERTY MANAGEMENT SYSTEM
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 font-sans">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col px-4 py-2 transition-all border ${
                    isActive
                      ? 'bg-[#1e1b17] text-[#d4af37] border-[#d4af37]/60 shadow-inner'
                      : 'text-[#a39a8e] hover:text-white hover:bg-[#151311] border-transparent'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wider">{item.label}</span>
                  <span className="text-[9px] text-[#786f63] tracking-tight">{item.sub}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
