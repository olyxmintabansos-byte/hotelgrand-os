'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SuiteRoom,
  ButlerRequest,
  HotelMetrics,
  HotelContextType
} from '@/types/hotel';

const INITIAL_SUITES: SuiteRoom[] = [
  {
    id: 'suite-801',
    roomNumber: 'PH-801',
    name: 'The Celestial Presidential Penthouse',
    tier: 'PRESIDENTIAL_PENTHOUSE',
    floor: 38,
    squareMeters: 480,
    nightlyRateUSD: 14500,
    status: 'OCCUPIED',
    currentGuest: {
      name: 'Lord Alistair Sterling',
      title: 'Ambassador Plenipotentiary',
      vipTier: 'ROYAL_AMBASSADOR',
      checkIn: '26 Sep 2026',
      checkOut: '03 Oct 2026',
      butlerAssigned: 'Jean-Pierre Dubois (Master Butler)',
      currentFolioUSD: 48200,
    },
  },
  {
    id: 'suite-702',
    roomNumber: 'STE-702',
    name: 'The Windsor Royal Diplomatic Suite',
    tier: 'ROYAL_DIPLOMATIC',
    floor: 32,
    squareMeters: 310,
    nightlyRateUSD: 8900,
    status: 'OCCUPIED',
    currentGuest: {
      name: 'Princess Elena von Habsburg',
      title: 'Honorary Patron of the Arts',
      vipTier: 'DIAMOND_ELITE',
      checkIn: '27 Sep 2026',
      checkOut: '01 Oct 2026',
      butlerAssigned: 'Helena Vance',
      currentFolioUSD: 24650,
    },
  },
  {
    id: 'suite-604',
    roomNumber: 'STE-604',
    name: 'The Grand Heritage Astor Suite',
    tier: 'GRAND_HERITAGE',
    floor: 28,
    squareMeters: 220,
    nightlyRateUSD: 5200,
    status: 'RESERVED_VIP',
    currentGuest: {
      name: 'Sir Jonathan Thorne',
      title: 'Managing Director, Apex Capital',
      vipTier: 'DIPLOMAT',
      checkIn: 'Today (15:00 ETA)',
      checkOut: '30 Sep 2026',
      butlerAssigned: 'Arthur Pendelton',
      currentFolioUSD: 5200,
    },
  },
  {
    id: 'suite-v01',
    roomNumber: 'VIL-01',
    name: 'The Imperial Garden Pavilion & Private Pool',
    tier: 'IMPERIAL_GARDEN_VILLA',
    floor: 1,
    squareMeters: 620,
    nightlyRateUSD: 18000,
    status: 'VACANT_INSPECTED',
  },
  {
    id: 'suite-508',
    roomNumber: 'STE-508',
    name: 'The Versailles Parisian Suite',
    tier: 'GRAND_HERITAGE',
    floor: 24,
    squareMeters: 195,
    nightlyRateUSD: 4800,
    status: 'HOUSEKEEPING',
  },
];

const INITIAL_REQUESTS: ButlerRequest[] = [
  {
    id: 'req-1',
    roomNumber: 'PH-801',
    guestName: 'Lord Alistair Sterling',
    category: 'CHAMPAGNE_CAVIAR',
    details: 'Dom Pérignon P2 Vintage 2004 with 100g Beluga Imperial Caviar & warm blinis',
    scheduledTime: '19:30 Tonight',
    status: 'IN_PREPARATION',
    costUSD: 2850,
  },
  {
    id: 'req-2',
    roomNumber: 'STE-702',
    guestName: 'Princess Elena von Habsburg',
    category: 'ROLLS_ROYCE_TRANSFER',
    details: 'Chauffeured Rolls-Royce Phantom VIII to Royal Opera House gala',
    scheduledTime: '20:15 Tonight',
    status: 'DISPATCHED',
    costUSD: 1200,
  },
  {
    id: 'req-3',
    roomNumber: 'PH-801',
    guestName: 'Lord Alistair Sterling',
    category: 'YACHT_CHARTER',
    details: '140ft Riva Superyacht sunset cruise with private onboard sushi master',
    scheduledTime: 'Tomorrow 16:00',
    status: 'FULFILLED',
    costUSD: 16500,
  },
];

const LOCAL_STORAGE_KEY = 'hotelgrandeur_os_state_v1';

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export function HotelProvider({ children }: { children: React.ReactNode }) {
  const [suites, setSuites] = useState<SuiteRoom[]>(INITIAL_SUITES);
  const [conciergeRequests, setConciergeRequests] = useState<ButlerRequest[]>(INITIAL_REQUESTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.suites) setSuites(parsed.suites);
        if (parsed.conciergeRequests) setConciergeRequests(parsed.conciergeRequests);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ suites, conciergeRequests }));
    } catch {}
  }, [suites, conciergeRequests]);

  const updateRoomStatus = (id: string, status: SuiteRoom['status']) => {
    setSuites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const addConciergeRequest = (req: Omit<ButlerRequest, 'id'>) => {
    const newReq: ButlerRequest = {
      ...req,
      id: `req-${Date.now()}`,
    };
    setConciergeRequests((prev) => [newReq, ...prev]);
  };

  const fulfillRequest = (id: string) => {
    setConciergeRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'FULFILLED' } : r))
    );
  };

  const totalRooms = 42;
  const occupiedRooms = suites.filter((s) => s.status === 'OCCUPIED').length + 32;
  const occupancyPct = Math.round((occupiedRooms / totalRooms) * 100);
  const adrUSD = 7850;
  const revPARUSD = Math.round(adrUSD * (occupancyPct / 100));
  const totalDailyRevenueUSD = occupiedRooms * adrUSD;

  return (
    <HotelContext.Provider
      value={{
        suites,
        updateRoomStatus,
        conciergeRequests,
        addConciergeRequest,
        fulfillRequest,
        metrics: {
          totalRooms,
          occupiedRooms,
          occupancyPct,
          adrUSD,
          revPARUSD,
          totalDailyRevenueUSD,
        },
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) throw new Error('useHotel must be used within a HotelProvider');
  return context;
}
