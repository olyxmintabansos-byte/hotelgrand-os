'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  KeyRound,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { SuiteRoom } from '@/types/hotel';

export default function SuitesCockpitPage() {
  const { suites, updateRoomStatus, metrics } = useHotel();
  const [selectedSuite, setSelectedSuite] = useState<SuiteRoom>(suites[0]);

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#e6e2dc] pb-20">
      {/* Editorial Cover Banner */}
      <div className="border-b border-[#d4af37]/30 bg-gradient-to-b from-[#171513] to-[#0e0d0c] px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#d4af37] block">
              THE IMPERIAL PORTFOLIO • MONTE CARLO
            </span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight">
              Presidential Suites <span className="gold-gradient-text italic font-normal">&amp; Residences</span>
            </h1>
            <p className="text-sm font-sans text-[#a39a8e] max-w-xl leading-relaxed">
              White-glove inventory management for diplomatic delegations, royal dignitaries, and private estates.
            </p>
          </div>

          <div className="flex items-center gap-4 font-sans text-xs">
            <Link
              href="/concierge/"
              className="px-6 py-3 bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold tracking-wider uppercase shadow-xl shadow-[#d4af37]/20 transition-all cursor-pointer"
            >
              <span>BUTLER CONCIERGE DESK →</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
          <div className="editorial-card p-5 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">DAILY OCCUPANCY</span>
            <strong className="text-3xl font-serif text-white block mt-1">{metrics.occupancyPct}%</strong>
            <span className="text-xs text-[#d4af37]">38 of 42 Suites Filled</span>
          </div>

          <div className="editorial-card p-5 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">AVERAGE DAILY RATE</span>
            <strong className="text-3xl font-serif text-[#d4af37] block mt-1">${metrics.adrUSD.toLocaleString()}</strong>
            <span className="text-xs text-[#a39a8e]">Ultra-Luxury Segment</span>
          </div>

          <div className="editorial-card p-5 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">REVPAR</span>
            <strong className="text-3xl font-serif text-white block mt-1">${metrics.revPARUSD.toLocaleString()}</strong>
            <span className="text-xs text-emerald-400">+8.5% YoY Benchmark</span>
          </div>

          <div className="editorial-card p-5 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">PROJECTED DAILY REVENUE</span>
            <strong className="text-3xl font-serif text-white block mt-1">${(metrics.totalDailyRevenueUSD / 1000).toFixed(0)}k</strong>
            <span className="text-xs text-[#a39a8e]">Excluding F&amp;B charges</span>
          </div>
        </div>

        {/* Master Suites Directory */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-3">
            <h2 className="text-xl font-serif text-white tracking-wide">Featured Suites &amp; Penthouse Residences</h2>
            <span className="text-xs font-sans text-[#a39a8e]">{suites.length} VIP Units Under Monitored Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {suites.map((suite) => {
              const isSelected = selectedSuite.id === suite.id;

              return (
                <div
                  key={suite.id}
                  onClick={() => setSelectedSuite(suite)}
                  className={`editorial-card p-6 flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected ? 'border-[#d4af37] bg-[#1a1714] shadow-2xl' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-serif text-lg font-bold text-[#d4af37]">{suite.roomNumber}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 tracking-wider font-semibold uppercase ${
                          suite.status === 'OCCUPIED'
                            ? 'bg-[#2b1f14] text-[#d4af37] border border-[#d4af37]/40'
                            : suite.status === 'RESERVED_VIP'
                            ? 'bg-[#172217] text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {suite.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-white leading-snug">{suite.name}</h3>
                    <div className="text-xs text-[#a39a8e] mt-1 font-serif italic">
                      Floor {suite.floor} • {suite.squareMeters} m² • ${suite.nightlyRateUSD.toLocaleString()} / night
                    </div>

                    {suite.currentGuest ? (
                      <div className="mt-4 pt-4 border-t border-[#2b251e] space-y-1.5 text-xs">
                        <div className="text-white font-semibold flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>{suite.currentGuest.name}</span>
                        </div>
                        <div className="text-[#a39a8e] text-[11px]">{suite.currentGuest.title}</div>
                        <div className="text-[#d4af37] text-[11px]">Folio: ${suite.currentGuest.currentFolioUSD.toLocaleString()}</div>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-[#2b251e] text-xs text-[#786f63] italic">
                        Available for Diplomatic Allocation
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#2b251e] flex items-center justify-between text-xs">
                    <span className="text-[#a39a8e]">Protocol Tier:</span>
                    <span className="text-[#d4af37] font-semibold">{suite.tier.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Suite Detailed Ledger */}
        <div className="editorial-card p-8 border-t-2 border-t-[#d4af37]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2b251e] pb-6 mb-6">
            <div>
              <span className="text-xs font-sans text-[#d4af37] uppercase tracking-[0.2em] block mb-1">
                RESIDENCE FOLIO &amp; PROTOCOL SPECIFICATION
              </span>
              <h2 className="text-3xl font-serif text-white">{selectedSuite.name}</h2>
              <p className="text-xs font-sans text-[#a39a8e] mt-1">
                Suite {selectedSuite.roomNumber} • Floor {selectedSuite.floor} • Sovereign Diplomatic Immunity Area
              </p>
            </div>

            <div className="flex items-center gap-3 font-sans text-xs">
              <button
                onClick={() => updateRoomStatus(selectedSuite.id, 'VACANT_INSPECTED')}
                className="px-4 py-2 bg-[#171513] hover:bg-[#211e1a] text-white border border-[#3d362a] cursor-pointer"
              >
                MARK INSPECTED
              </button>
              <button
                onClick={() => updateRoomStatus(selectedSuite.id, 'OCCUPIED')}
                className="px-4 py-2 bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold cursor-pointer"
              >
                CHECK-IN VIP GUEST
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            <div className="p-4 bg-[#0e0d0c] border border-[#2b251e] space-y-2">
              <span className="text-[#8c8273] uppercase tracking-wider block">PRIVATE AMENITIES</span>
              <ul className="space-y-1 text-white">
                <li>• Heated Infinity Edge Marble Terrace Plunge Pool</li>
                <li>• Bang &amp; Olufsen Bespoke Audio System</li>
                <li>• Dual Walk-in Calacatta Oro Marble Bathrooms</li>
                <li>• Biometric Private Elevator Access</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0e0d0c] border border-[#2b251e] space-y-2">
              <span className="text-[#8c8273] uppercase tracking-wider block">ASSIGNED MASTER BUTLER</span>
              <div className="text-white font-serif text-base">
                {selectedSuite.currentGuest?.butlerAssigned || 'White-Glove Butler Fleet On-Call'}
              </div>
              <p className="text-[#a39a8e] leading-relaxed">
                24/7 Dedicated butler service, unpacking/packing, bespoke culinary service, and private yacht liaison.
              </p>
            </div>

            <div className="p-4 bg-[#0e0d0c] border border-[#2b251e] space-y-2">
              <span className="text-[#8c8273] uppercase tracking-wider block">CURRENT FOLIO BALANCE</span>
              <div className="text-[#d4af37] font-serif text-2xl font-bold">
                ${selectedSuite.currentGuest?.currentFolioUSD.toLocaleString() || '0.00'}
              </div>
              <span className="text-[#a39a8e] block">MasterCard World Elite / Gold Bullion Escrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
