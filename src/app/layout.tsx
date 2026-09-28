import type { Metadata } from 'next';
import './globals.css';
import { HotelProvider } from '@/context/HotelContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'HotelGrandeur OS — Luxury 5-Star Hotel PMS & White-Glove Butler Concierge',
  description:
    'Titan #41: Magazine-style editorial property management system for presidential penthouses, Michelin-star dining allocations, and private yacht concierge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#0e0d0c] text-[#e6e2dc]">
        <HotelProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </HotelProvider>
      </body>
    </html>
  );
}
