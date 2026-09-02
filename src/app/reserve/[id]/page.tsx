'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/context/BookingContext';
import { calculateNights, calculatePricingBreakdown, formatDateRange } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  Star,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  Calendar,
  Users,
  Building,
} from 'lucide-react';

interface ReservePageProps {
  params: Promise<{ id: string }>;
}

export default function ReservePage({ params }: ReservePageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { format } = useCurrency();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { addBooking } = useBooking();

  const property = PROPERTIES.find((p) => p.id === resolvedParams.id);

  const checkIn = searchParams.get('checkIn') || '2026-10-14';
  const checkOut = searchParams.get('checkOut') || '2026-10-19';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const infants = Number(searchParams.get('infants')) || 0;
  const pets = Number(searchParams.get('pets')) || 0;

  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!property) {
    notFound();
  }

  const nights = calculateNights(checkIn, checkOut);
  const breakdown = calculatePricingBreakdown(property.price, nights);
  const totalGuests = adults + children;

  const handleConfirmReservation = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const code = `HM${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setConfirmationCode(code);

      const newBooking = {
        id: `res-${Date.now()}`,
        propertyId: property.id,
        property: {
          title: property.title,
          location: `${property.location.city}, ${property.location.country}`,
          image: property.images[0],
          type: property.type,
          hostName: property.host.name,
        },
        userId: user?.id || 'usr-101',
        checkIn,
        checkOut,
        nights,
        guests: { adults, children, infants, pets },
        pricing: breakdown,
        status: 'upcoming' as const,
        createdAt: new Date().toISOString().split('T')[0],
        confirmationCode: code,
        paymentMethod: {
          type: paymentType,
          lastFour: paymentType === 'card' ? '4242' : 'upi',
        },
      };

      addBooking(newBooking);
      setIsProcessing(false);
      setIsConfirmed(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16 text-center space-y-6 animate-slide-up">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto shadow-sm">
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
            Reservation Confirmed! 🎉
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            You’re going to {property.location.city}! Confirmation code:{' '}
            <span className="font-bold text-black">{confirmationCode}</span>
          </p>
        </div>

        {/* Receipt Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 text-left shadow-airbnb-card space-y-5 sm:space-y-6 max-w-xl mx-auto">
          <div className="flex items-center gap-3.5 pb-4 sm:pb-6 border-b border-gray-100">
            <div className="relative h-16 w-20 sm:h-20 sm:w-24 rounded-2xl overflow-hidden shrink-0">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold block">{property.type}</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#222222] truncate">{property.title}</h3>
              <p className="text-[11px] sm:text-xs text-gray-500">Hosted by {property.host.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block">Dates</span>
              <span className="font-bold text-[#222222] block mt-0.5">{formatDateRange(checkIn, checkOut)}</span>
              <span className="text-gray-400">{nights} nights</span>
            </div>
            <div>
              <span className="text-gray-500 block">Guests</span>
              <span className="font-bold text-[#222222] block mt-0.5">{totalGuests} guests</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs sm:text-sm font-bold text-[#222222]">
            <span>Total paid ({paymentType.toUpperCase()})</span>
            <span>{format(breakdown.totalPrice)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/trips" className="w-full sm:w-auto">
            <Button variant="black" size="md" fullWidth>
              View your trips
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" fullWidth>
              Explore more stays
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20">
      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <Link
          href={`/rooms/${property.id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#222222] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Confirm and pay</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 divide-y divide-gray-200">
          {/* Step 1: Your trip */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Your trip</h2>

            <div className="flex justify-between items-center py-2">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Dates</h4>
                <p className="text-xs text-gray-500">{formatDateRange(checkIn, checkOut)}</p>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/rooms/${property.id}`)}
                className="text-xs font-bold text-[#222222] underline hover:text-black"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Guests</h4>
                <p className="text-xs text-gray-500">
                  {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                  {infants > 0 ? `, ${infants} infant` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/rooms/${property.id}`)}
                className="text-xs font-bold text-[#222222] underline hover:text-black"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Step 2: Choose Payment Method */}
          <div className="space-y-5 sm:space-y-6 pt-6 sm:pt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Choose how to pay</h2>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 py-1 px-2.5 rounded-full">
                <Lock className="h-3 w-3" />
                <span className="hidden sm:inline">SSL 256-bit Encrypted</span>
                <span className="sm:hidden">Encrypted</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  paymentType === 'card'
                    ? 'border-black bg-gray-50 ring-1 ring-black font-bold'
                    : 'border-gray-200 hover:border-black'
                }`}
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mb-1 text-gray-700" />
                <span className="text-[11px] sm:text-xs">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('upi')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  paymentType === 'upi'
                    ? 'border-black bg-gray-50 ring-1 ring-black font-bold'
                    : 'border-gray-200 hover:border-black'
                }`}
              >
                <span className="text-sm sm:text-base font-black mb-0.5 text-[#FF385C]">UPI</span>
                <span className="text-[11px] sm:text-xs">GPay / PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('netbanking')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  paymentType === 'netbanking'
                    ? 'border-black bg-gray-50 ring-1 ring-black font-bold'
                    : 'border-gray-200 hover:border-black'
                }`}
              >
                <Building className="h-4 w-4 sm:h-5 sm:w-5 mb-1 text-gray-700" />
                <span className="text-[11px] sm:text-xs">NetBanking</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentType === 'card' && (
              <div className="rounded-2xl border border-gray-300 divide-y divide-gray-300 overflow-hidden">
                <div className="p-3 bg-white">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold text-[#222222] focus:outline-hidden bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-3 bg-white">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">Expiration</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold text-[#222222] focus:outline-hidden bg-transparent"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full text-xs sm:text-sm font-semibold text-[#222222] focus:outline-hidden bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentType === 'upi' && (
              <div className="rounded-2xl border border-gray-300 p-3 sm:p-4 space-y-2">
                <label className="block text-xs font-bold text-gray-700">Enter UPI ID (VPA)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okaxis"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs sm:text-sm focus:border-black focus:outline-hidden"
                />
              </div>
            )}

            {paymentType === 'netbanking' && (
              <div className="rounded-2xl border border-gray-300 p-3 sm:p-4 space-y-2">
                <label className="block text-xs font-bold text-gray-700">Select Bank</label>
                <select className="w-full rounded-xl border border-gray-300 p-2.5 text-xs sm:text-sm font-semibold text-[#222222] focus:border-black focus:outline-hidden">
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
          </div>

          {/* Confirm and Pay CTA */}
          <div className="pt-6 sm:pt-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isProcessing}
              onClick={handleConfirmReservation}
              className="py-3.5 sm:py-4 text-sm sm:text-base font-bold"
            >
              Confirm and pay · {format(breakdown.totalPrice)}
            </Button>
            <p className="text-center text-[11px] text-gray-500 mt-2">
              By confirming, you agree to the Host’s House Rules, Ground Rules, and HavenStay Terms.
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Property & Price Summary Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-airbnb-card space-y-5">
            <div className="flex gap-3.5 items-start pb-4 border-b border-gray-100">
              <div className="relative h-20 w-24 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">{property.type}</span>
                <h3 className="font-bold text-xs sm:text-sm text-[#222222] truncate">{property.title}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-[#222222]">
                  <Star className="h-3.5 w-3.5 fill-[#222222]" />
                  <span>{property.rating.toFixed(2)}</span>
                  <span className="text-gray-400 font-normal">({property.reviewsCount})</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
              <h4 className="font-bold text-sm text-[#222222] mb-2">Price details</h4>

              <div className="flex justify-between">
                <span>{format(property.price)} × {nights} nights</span>
                <span>{format(breakdown.nightsTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>{format(breakdown.cleaningFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>HavenStay service fee</span>
                <span>{format(breakdown.serviceFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes (GST 18%)</span>
                <span>{format(breakdown.taxes)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-sm sm:text-base text-[#222222]">
                <span>Total (INR)</span>
                <span>{format(breakdown.totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>HavenStay Protection included with every booking.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
