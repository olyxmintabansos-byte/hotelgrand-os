export type SuiteTier = 'PRESIDENTIAL_PENTHOUSE' | 'ROYAL_DIPLOMATIC' | 'GRAND_HERITAGE' | 'IMPERIAL_GARDEN_VILLA';

export interface SuiteRoom {
  id: string;
  roomNumber: string;
  name: string;
  tier: SuiteTier;
  floor: number;
  squareMeters: number;
  nightlyRateUSD: number;
  status: 'OCCUPIED' | 'VACANT_INSPECTED' | 'HOUSEKEEPING' | 'RESERVED_VIP';
  currentGuest?: {
    name: string;
    title: string;
    vipTier: 'DIAMOND_ELITE' | 'ROYAL_AMBASSADOR' | 'DIPLOMAT';
    checkIn: string;
    checkOut: string;
    butlerAssigned: string;
    currentFolioUSD: number;
  };
}

export interface ButlerRequest {
  id: string;
  roomNumber: string;
  guestName: string;
  category: 'PRIVATE_CHEF' | 'CHAMPAGNE_CAVIAR' | 'ROLLS_ROYCE_TRANSFER' | 'YACHT_CHARTER' | 'SPA_ENSUITE';
  details: string;
  scheduledTime: string;
  status: 'DISPATCHED' | 'IN_PREPARATION' | 'FULFILLED';
  costUSD: number;
}

export interface HotelMetrics {
  totalRooms: number;
  occupiedRooms: number;
  occupancyPct: number;
  adrUSD: number;
  revPARUSD: number;
  totalDailyRevenueUSD: number;
}

export interface HotelContextType {
  suites: SuiteRoom[];
  updateRoomStatus: (id: string, status: SuiteRoom['status']) => void;
  conciergeRequests: ButlerRequest[];
  addConciergeRequest: (req: Omit<ButlerRequest, 'id'>) => void;
  fulfillRequest: (id: string) => void;
  metrics: HotelMetrics;
}
