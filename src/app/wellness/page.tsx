'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Droplets,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  HeartPulse,
  UserCheck,
  Plus
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

interface SpaTreatment {
  id: string;
  name: string;
  durationMinutes: number;
  costUSD: number;
  description: string;
  therapist: string;
  category: 'FACIAL' | 'HYDROTHERAPY' | 'MASSAGE' | 'AYURVEDA';
}

const TREATMENTS_MENU: SpaTreatment[] = [
  {
    id: 'tr-1',
    name: '24K Imperial Gold Leaf Rejuvenating Facial',
    durationMinutes: 90,
    costUSD: 1450,
    description: 'Pure 24-karat gold leaf infused with Swiss cellular collagen peptides and white truffle elixir.',
    therapist: 'Madame Giselle Laurent',
    category: 'FACIAL',
  },
  {
    id: 'tr-2',
    name: 'Deep-Sea Marine Hydrotherapy & Thermal Caldarium',
    durationMinutes: 60,
    costUSD: 850,
    description: 'Mineral-rich Mediterranean seawater immersion followed by 38°C thermal steam and algae wrapping.',
    therapist: 'Dimitri S.',
    category: 'HYDROTHERAPY',
  },
  {
    id: 'tr-3',
    name: 'Monégasque Four-Hand Silk Oil Massage',
    durationMinutes: 120,
    costUSD: 2100,
    description: 'Synchronized therapeutic massage by two master therapists utilizing warm organic Grasse rose oil.',
    therapist: 'Clara & Vivienne',
    category: 'MASSAGE',
  },
  {
    id: 'tr-4',
    name: 'Royal Shirodhara Ayurvedic Crown Therapy',
    durationMinutes: 75,
    costUSD: 980,
    description: 'Continuous rhythmic stream of warm herbalized medicated oils over the third eye center.',
    therapist: 'Dr. Ananya Rao',
    category: 'AYURVEDA',
  },
];

interface CabanaBooking {
  id: string;
  cabanaNumber: string;
  suiteRoom: string;
  guestName: string;
  poolArea: string;
  timeSlot: string;
  champagneSelection: string;
}

const INITIAL_CABANAS: CabanaBooking[] = [
  { id: 'cab-1', cabanaNumber: 'CABANA IMPERIAL 01', suiteRoom: 'PH-801', guestName: 'Lord Alistair Sterling', poolArea: 'Private Cliffside Infinity Deck', timeSlot: '14:00 - 18:00', champagneSelection: 'Krug Vintage 2008' },
  { id: 'cab-2', cabanaNumber: 'CABANA ROYALE 04', suiteRoom: 'STE-702', guestName: 'Princess Elena von Habsburg', poolArea: 'Heated Roman Hydro-Pool', timeSlot: '11:00 - 15:00', champagneSelection: 'Ruinart Blanc de Blancs' },
];

export default function ThermalSanctuaryPage() {
  const { suites } = useHotel();
  const [cabanas, setCabanas] = useState<CabanaBooking[]>(INITIAL_CABANAS);
  const [selectedTreatment, setSelectedTreatment] = useState<SpaTreatment>(TREATMENTS_MENU[0]);
  const [bookedToast, setBookedToast] = useState<string | null>(null);

  const bookTreatment = (tr: SpaTreatment) => {
    setBookedToast(`RESERVED "${tr.name}" FOR SUITE PH-801 (CHARGED TO FOLIO: $${tr.costUSD.toLocaleString()})`);
    setTimeout(() => setBookedToast(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#e6e2dc] pb-20">
      {/* Header */}
      <div className="border-b border-[#d4af37]/30 bg-gradient-to-b from-[#171513] to-[#0e0d0c] px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#d4af37] block">
              THE CELESTIAL THERMAL SANCTUARY & SPA
            </span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight">
              Holistic Wellness <span className="gold-gradient-text italic font-normal">&amp; Private Cabanas</span>
            </h1>
            <p className="text-sm font-sans text-[#a39a8e] max-w-xl leading-relaxed">
              Hydrotherapy mineral baths, Swiss cellular facials, and private cliffside cabana reservations for palace dignitaries.
            </p>
          </div>

          <div className="flex items-center gap-4 font-sans text-xs">
            <Link
              href="/audit/"
              className="px-6 py-3 bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold tracking-wider uppercase shadow-xl shadow-[#d4af37]/20 cursor-pointer"
            >
              <span>NIGHT AUDIT &amp; FOLIO →</span>
            </Link>
          </div>
        </div>
      </div>

      {bookedToast && (
        <div className="bg-[#1b2b1a] border-b border-emerald-500 text-emerald-300 font-sans text-xs py-2 px-4 text-center sticky top-20 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{bookedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Hydrotherapy Bath Temperature Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">TEPIDARIUM (WARM RELAXATION)</span>
            <strong className="text-3xl font-serif text-white block mt-1">36.5°C</strong>
            <span className="text-xs text-emerald-400">Dead Sea Mineral Salts Infused</span>
          </div>

          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">CALDARIUM (THERMAL STEAM BATH)</span>
            <strong className="text-3xl font-serif text-[#d4af37] block mt-1">42.0°C</strong>
            <span className="text-xs text-[#a39a8e]">Eucalyptus &amp; Lavender Aromatherapy</span>
          </div>

          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">FRIGIDARIUM (ICE PLUNGE VITALITY)</span>
            <strong className="text-3xl font-serif text-cyan-400 block mt-1">12.0°C</strong>
            <span className="text-xs text-[#a39a8e]">Filtered Alpine Glacial Water</span>
          </div>
        </div>

        {/* Exclusive Treatments Menu */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-3">
            <h2 className="text-xl font-serif text-white tracking-wide">Signature Haute Spa Therapies</h2>
            <span className="text-xs font-sans text-[#a39a8e]">En-Suite or Private Treatment Pavilion</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {TREATMENTS_MENU.map((tr) => (
              <div
                key={tr.id}
                className="editorial-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider bg-[#262015] px-2 py-0.5 border border-[#d4af37]/30">
                      {tr.category}
                    </span>
                    <span className="text-[#a39a8e] font-serif italic">{tr.durationMinutes} Minutes</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mt-2 leading-snug">{tr.name}</h3>
                  <p className="text-xs text-[#a39a8e] mt-2 leading-relaxed">{tr.description}</p>

                  <div className="mt-4 pt-3 border-t border-[#2b251e] flex items-center justify-between text-xs">
                    <span className="text-[#786f63]">Master Practitioner: <strong className="text-white">{tr.therapist}</strong></span>
                    <span className="font-serif text-lg font-bold text-[#d4af37]">${tr.costUSD.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2b251e] flex justify-end">
                  <button
                    onClick={() => bookTreatment(tr)}
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase cursor-pointer"
                  >
                    CHARGE TO SUITE FOLIO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Cliffside Cabana Allocations */}
        <div className="editorial-card p-8">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-4 mb-6">
            <div>
              <h3 className="text-xl font-serif text-white tracking-wide">Cliffside Private Cabanas &amp; Daybed Allocations</h3>
              <p className="text-xs text-[#a39a8e] mt-0.5">Private infinity pool access, dedicated butler, and vintage champagne service.</p>
            </div>
            <span className="text-xs text-[#d4af37] font-serif">{cabanas.length} Reserved Today</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-xs">
            {cabanas.map((cab) => (
              <div key={cab.id} className="p-5 bg-[#0e0d0c] border border-[#2b251e] space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-[#d4af37] font-serif text-base">{cab.cabanaNumber}</strong>
                  <span className="text-[10px] px-2 py-0.5 bg-[#172217] text-emerald-400 border border-emerald-500/40 uppercase">
                    ACTIVE CONFIRMED
                  </span>
                </div>
                <div className="text-white font-semibold text-sm">{cab.guestName} ({cab.suiteRoom})</div>
                <div className="text-[#a39a8e]">{cab.poolArea} • Time: {cab.timeSlot}</div>
                <div className="pt-2 border-t border-[#2b251e] text-[#d4af37]">
                  Cellar Pairing: <strong>{cab.champagneSelection}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
