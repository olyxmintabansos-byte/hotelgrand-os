'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  DollarSign,
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Scale,
  RefreshCw,
  Download
} from 'lucide-react';
import { useHotel } from '@/context/HotelContext';

interface RevenueItem {
  department: string;
  grossUSD: number;
  vatUSD: number;
  netUSD: number;
}

const DAILY_LEDGER: RevenueItem[] = [
  { department: 'Presidential & Suite Accommodations', grossUSD: 329700, vatUSD: 32970, netUSD: 296730 },
  { department: 'Michelin Dining & Grand Vintage Cellar', grossUSD: 84500, vatUSD: 8450, netUSD: 76050 },
  { department: 'Celestial Thermal Sanctuary & Spa', grossUSD: 36200, vatUSD: 3620, netUSD: 32580 },
  { department: 'White-Glove Butler & Superyacht Charters', grossUSD: 68400, vatUSD: 6840, netUSD: 61560 },
  { department: 'Chauffeured Rolls-Royce Fleet Transfers', grossUSD: 14800, vatUSD: 1480, netUSD: 13320 },
];

const CURRENCY_RATES = [
  { code: 'EUR', name: 'Euro (Base Currency)', rate: 1.00, spread: '0.00%' },
  { code: 'USD', name: 'United States Dollar', rate: 1.09, spread: '+0.15%' },
  { code: 'GBP', name: 'British Pound Sterling', rate: 0.84, spread: '+0.12%' },
  { code: 'CHF', name: 'Swiss Franc', rate: 0.94, spread: '+0.08%' },
  { code: 'AED', name: 'UAE Dirham', rate: 4.00, spread: '+0.20%' },
];

export default function NightAuditPage() {
  const { metrics } = useHotel();
  const [auditClosed, setAuditClosed] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const totalGross = DAILY_LEDGER.reduce((s, d) => s + d.grossUSD, 0);
  const totalVAT = DAILY_LEDGER.reduce((s, d) => s + d.vatUSD, 0);
  const totalNet = DAILY_LEDGER.reduce((s, d) => s + d.netUSD, 0);

  const runNightAuditClose = () => {
    setAuditClosed(true);
    setToastMsg(`NIGHT AUDIT COMPLETED. GENERAL LEDGER RECONCILED: €${totalNet.toLocaleString()} POSTED TO ESCROW.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const exportFolioAuditReport = () => {
    const reportData = {
      auditDate: new Date().toLocaleDateString(),
      metrics,
      ledger: DAILY_LEDGER,
      currencies: CURRENCY_RATES,
      totalNetRevenueUSD: totalNet,
    };
    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hotelgrandeur_night_audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg('EXPORTED NIGHT AUDIT FOLIO TO JSON');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#e6e2dc] pb-20">
      {/* Header */}
      <div className="border-b border-[#d4af37]/30 bg-gradient-to-b from-[#171513] to-[#0e0d0c] px-4 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#d4af37] block">
              GENERAL LEDGER &amp; FISCAL RECONCILIATION
            </span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white leading-tight">
              Night Audit <span className="gold-gradient-text italic font-normal">&amp; Folio Settlement</span>
            </h1>
            <p className="text-sm font-sans text-[#a39a8e] max-w-xl leading-relaxed">
              Daily departmental balance close, municipal tourism tax, foreign exchange settlement, and escrow balancing.
            </p>
          </div>

          <div className="flex items-center gap-4 font-sans text-xs">
            <button
              onClick={exportFolioAuditReport}
              className="px-6 py-3 bg-[#171513] hover:bg-[#211e1a] text-white border border-[#3d362a] uppercase cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>EXPORT AUDIT JSON</span>
            </button>
            <button
              onClick={runNightAuditClose}
              className={`px-6 py-3 font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                auditClosed
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20'
                  : 'bg-[#d4af37] hover:bg-[#c5a059] text-black shadow-xl shadow-[#d4af37]/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{auditClosed ? 'LEDGER RECONCILED (CLOSED)' : 'EXECUTE NIGHT AUDIT CLOSE'}</span>
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-[#1b2b1a] border-b border-emerald-500 text-emerald-300 font-sans text-xs py-2 px-4 text-center sticky top-20 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Daily Financial Totals Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">TOTAL GROSS REVENUE</span>
            <strong className="text-3xl font-serif text-white block mt-1">${totalGross.toLocaleString()}</strong>
            <span className="text-xs text-[#a39a8e]">All 5 Luxury Revenue Centers</span>
          </div>

          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">MUNICIPAL VAT &amp; TAX</span>
            <strong className="text-3xl font-serif text-[#d4af37] block mt-1">${totalVAT.toLocaleString()}</strong>
            <span className="text-xs text-[#a39a8e]">10% Palace Surtax &amp; Escrow</span>
          </div>

          <div className="editorial-card p-6 border-l-2 border-l-[#d4af37]">
            <span className="text-[10px] text-[#8c8273] uppercase tracking-widest block">NET SETTLED PROFIT</span>
            <strong className="text-3xl font-serif text-emerald-400 block mt-1">${totalNet.toLocaleString()}</strong>
            <span className="text-xs text-[#d4af37]">Post-Tax General Ledger Balance</span>
          </div>
        </div>

        {/* Departmental Revenue Breakdown Table */}
        <div className="editorial-card p-8">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-4 mb-6">
            <h3 className="text-xl font-serif text-white tracking-wide">Daily Departmental General Ledger Audit</h3>
            <span className="text-xs text-[#d4af37] font-serif">Fiscal Cycle: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans text-left">
              <thead className="border-b border-[#2b251e] text-[#8c8273] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">REVENUE DEPARTMENT</th>
                  <th className="py-3 px-4 text-right">GROSS (USD)</th>
                  <th className="py-3 px-4 text-right text-[#d4af37]">VAT / TAX (10%)</th>
                  <th className="py-3 px-4 text-right text-emerald-400">NET SETTLEMENT</th>
                  <th className="py-3 px-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1b17]">
                {DAILY_LEDGER.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#1a1714]">
                    <td className="py-4 px-4 font-serif text-sm font-semibold text-white">{item.department}</td>
                    <td className="py-4 px-4 text-right text-white">${item.grossUSD.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-[#d4af37]">${item.vatUSD.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-emerald-400 font-bold">${item.netUSD.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-[#172217] text-emerald-400 border border-emerald-500/40 text-[10px] font-semibold">
                        BALANCED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Foreign Currency Settlement Rates */}
        <div className="editorial-card p-8">
          <div className="flex items-center justify-between border-b border-[#2b251e] pb-4 mb-6">
            <h3 className="text-xl font-serif text-white tracking-wide">Palace Foreign Exchange &amp; Escrow Rates</h3>
            <span className="text-xs text-[#a39a8e] font-sans">Live Fix against Euro Treasury Spot</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-sans text-xs">
            {CURRENCY_RATES.map((curr) => (
              <div key={curr.code} className="p-4 bg-[#0e0d0c] border border-[#2b251e] space-y-1">
                <span className="font-serif text-lg font-bold text-[#d4af37]">{curr.code}</span>
                <div className="text-white font-semibold text-sm">{curr.rate.toFixed(2)}</div>
                <div className="text-[10px] text-[#786f63]">{curr.name}</div>
                <div className="text-[10px] text-emerald-400 pt-1 border-t border-[#2b251e]">{curr.spread} Spread</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
