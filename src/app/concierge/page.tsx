'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Clock,
  Car,
  Wine,
  Anchor,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';
import { ButlerRequest } from '@/types/hotel';

export default function ButlerConciergePage() {
  const { conciergeRequests, addConciergeRequest, fulfillRequest } = useHotel();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [roomNum, setRoomNum] = useState<string>('PH-801');
  const [guestName, setGuestName] = useState<string>('Lord Alistair Sterling');
  const [category, setCategory] = useState<ButlerRequest['category']>('CHAMPAGNE_CAVIAR');
  const [details, setDetails] = useState<string>("Krug Clos d'Ambonnay 2002 Champagne with Beluga Royal Reserve");
  const [schedTime, setSchedTime] = useState<string>('Tonight at 21:00');
  const [cost, setCost] = useState<number>(3400);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addConciergeRequest({
      roomNumber: roomNum,
      guestName,
      category,
      details,
      scheduledTime: schedTime,
      status: 'IN_PREPARATION',
      costUSD: cost,
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#e6e2dc] pb-20">
      {/* Header */}
      <div className="border-b border-[#d4af37]/30 bg-gradient-to-b from-[#171513] to-[#0e0d0c] px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#d4af37] block">
              LES CLÉFS D'OR WHITE-GLOVE CONCIERGE
            </span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight">
              Butler &amp; Michelin <span className="gold-gradient-text italic font-normal">Dining Dispatch</span>
            </h1>
            <p className="text-sm font-sans text-[#a39a8e] max-w-xl leading-relaxed">
              Bespoke gastronomy, rare vintage champagne cellars, chauffeured transfers, and private Mediterranean marine charters.
            </p>
          </div>

          <div className="flex items-center gap-4 font-sans text-xs">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold tracking-wider uppercase shadow-xl shadow-[#d4af37]/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>NEW BESPOKE REQUEST</span>
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-[#171513] hover:bg-[#211e1a] text-white border border-[#3d362a] uppercase cursor-pointer"
            >
              <span>← SUITES DIRECTORY</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8 font-sans">
        {/* Concierge Requests Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-3">
            <h2 className="text-xl font-serif text-white tracking-wide">Active VIP Butler Dispatches</h2>
            <span className="text-xs text-[#a39a8e]">{conciergeRequests.length} High-Value Experiences in Motion</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conciergeRequests.map((req) => (
              <div key={req.id} className="editorial-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-serif text-base font-bold text-[#d4af37]">
                      Suite {req.roomNumber}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 tracking-wider font-semibold uppercase ${
                        req.status === 'FULFILLED'
                          ? 'bg-[#172217] text-emerald-400 border border-emerald-500/40'
                          : req.status === 'DISPATCHED'
                          ? 'bg-[#2b1f14] text-[#d4af37] border border-[#d4af37]/40'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white">{req.guestName}</h3>
                  <div className="text-xs text-[#a39a8e] mt-1 font-serif italic">{req.category.replace('_', ' ')}</div>

                  <p className="text-xs text-white/90 mt-3 leading-relaxed bg-[#0e0d0c] p-3 border border-[#2b251e]">
                    &quot;{req.details}&quot;
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-[#a39a8e]">
                    <span>SCHEDULE: <strong className="text-white">{req.scheduledTime}</strong></span>
                    <span>CHARGE: <strong className="text-[#d4af37]">${req.costUSD.toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2b251e] flex items-center justify-between">
                  <span className="text-[11px] text-[#786f63]">Dispatched under Les Clefs d'Or Seal</span>
                  {req.status !== 'FULFILLED' && (
                    <button
                      onClick={() => fulfillRequest(req.id)}
                      className="px-3 py-1 bg-[#171513] hover:bg-[#2b251e] border border-[#d4af37]/50 text-[#d4af37] text-xs font-semibold cursor-pointer"
                    >
                      MARK FULFILLED
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="editorial-card max-w-lg w-full p-8 border-[#d4af37]">
            <h3 className="text-2xl font-serif text-white mb-2">Dispatch Bespoke Butler Request</h3>
            <p className="text-xs text-[#a39a8e] mb-6">
              Create an exclusive culinary, automotive, or marine service request for royal and diplomatic guests.
            </p>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#a39a8e] block mb-1">SUITE NUMBER</label>
                  <input
                    type="text"
                    required
                    value={roomNum}
                    onChange={(e) => setRoomNum(e.target.value)}
                    className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white font-serif font-bold"
                  />
                </div>
                <div>
                  <label className="text-[#a39a8e] block mb-1">GUEST NAME</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#a39a8e] block mb-1">SERVICE CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white"
                >
                  <option value="CHAMPAGNE_CAVIAR">Champagne &amp; Grand Caviar Pairing</option>
                  <option value="PRIVATE_CHEF">Private Michelin Master Chef</option>
                  <option value="ROLLS_ROYCE_TRANSFER">Chauffeured Rolls-Royce Limousine</option>
                  <option value="YACHT_CHARTER">Mediterranean Superyacht Charter</option>
                  <option value="SPA_ENSUITE">En-Suite Private Thermal Therapy</option>
                </select>
              </div>

              <div>
                <label className="text-[#a39a8e] block mb-1">BESPOKE DETAILS &amp; SPECIAL INSTRUCTIONS</label>
                <textarea
                  rows={3}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#a39a8e] block mb-1">SCHEDULED TIME</label>
                  <input
                    type="text"
                    value={schedTime}
                    onChange={(e) => setSchedTime(e.target.value)}
                    className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[#a39a8e] block mb-1">FOLIO CHARGE (USD)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0e0d0c] border border-[#3d362a] rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2b251e]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#171513] text-[#a39a8e] cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d4af37] text-black font-semibold cursor-pointer"
                >
                  DISPATCH REQUEST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
