import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { BookingProvider } from '@/context/BookingContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { AuthModal } from '@/components/auth/AuthModal';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'HavenStay | Vacation Rentals, Cabins, Beachfront Villas & More',
  description:
    'Find the perfect vacation home, luxury villa, private cabin, or beachfront oasis. Book unique places to stay from world-class hosts on HavenStay.',
  openGraph: {
    title: 'HavenStay - Vacation Rentals & Luxury Stays',
    description: 'Find the perfect vacation home, luxury villa, private cabin, or beachfront oasis.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#222222] pb-16 md:pb-0">
        <CurrencyProvider>
          <AuthProvider>
            <WishlistProvider>
              <BookingProvider>
                <Header />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
                <MobileNav />
                <AuthModal />
              </BookingProvider>
            </WishlistProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
