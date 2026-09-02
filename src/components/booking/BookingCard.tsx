'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { calculateNights, calculatePricingBreakdown, formatDateRange } from '@/lib/utils';
import { DatePicker } from '@/components/search/DatePicker';
import { GuestSelector, GuestsCount } from '@/components/search/GuestSelector';
import { Button } from '@/components/common/Button';
import { Star, ChevronDown, Gem } from 'lucide-react';

interface BookingCardProps {
  property: Property;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export function BookingCard({
  property,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
}: BookingCardProps) {
  const router = useRouter();
  const { format, showTaxes } = useCurrency();

  // Set default dates if not provided (5 days starting next week)
  const defaultIn = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const defaultOut = () => {
    const d = new Date();
    d.setDate(d.getDate() + 12);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(initialCheckIn || defaultIn());
  const [checkOut, setCheckOut] = useState(initialCheckOut || defaultOut());
  const [guests, setGuests] = useState<GuestsCount>({
    adults: Math.min(initialGuests, property.guests) || 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
        setShowGuestPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nights = calculateNights(checkIn, checkOut);
  const breakdown = calculatePricingBreakdown(property.price, nights);
  const totalGuests = guests.adults + guests.children;

  const handleReserve = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(guests.adults),
      children: String(guests.children),
      infants: String(guests.infants),
      pets: String(guests.pets),
    });
    router.push(`/reserve/${property.id}?${params.toString()}`);
  };

  return (
    <div
      ref={cardRef}
      className="sticky top-28 rounded-3xl border border-gray-200 bg-white p-6 shadow-airbnb-card space-y-6"
    >
      {/* Top Price & Rating Row */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#222222]">
            {format(property.price)}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {showTaxes ? 'total' : '/ night'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-[#222222]">
          <Star className="h-3.5 w-3.5 fill-[#222222]" />
          <span>{property.rating.toFixed(2)}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500 underline">{property.reviewsCount} reviews</span>
        </div>
      </div>

      {/* Date & Guest Input Box */}
      <div className="relative rounded-2xl border border-gray-300 divide-y divide-gray-300 overflow-visible">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          {/* Check In */}
          <button
            type="button"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowGuestPicker(false);
            }}
            className="p-3 text-left hover:bg-gray-50 transition-colors rounded-tl-2xl"
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
              Check-in
            </span>
            <span className="block text-xs font-medium text-[#222222] truncate">
              {formatDateRange(checkIn)}
            </span>
          </button>

          {/* Check Out */}
          <button
            type="button"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowGuestPicker(false);
            }}
            className="p-3 text-left hover:bg-gray-50 transition-colors rounded-tr-2xl"
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
              Checkout
            </span>
            <span className="block text-xs font-medium text-[#222222] truncate">
              {formatDateRange(checkOut)}
            </span>
          </button>
        </div>

        {/* Guests Dropdown Row */}
        <button
          type="button"
          onClick={() => {
            setShowGuestPicker(!showGuestPicker);
            setShowDatePicker(false);
          }}
          className="flex w-full items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors rounded-b-2xl"
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
              Guests
            </span>
            <span className="block text-xs font-medium text-[#222222]">
              {totalGuests} guest{totalGuests > 1 ? 's' : ''}
              {guests.infants > 0 && `, ${guests.infants} infant`}
              {guests.pets > 0 && `, ${guests.pets} pet`}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        {/* Popovers */}
        {showDatePicker && (
          <div className="absolute top-full right-0 mt-2 z-40 rounded-3xl bg-white shadow-airbnb-modal border border-gray-100 overflow-hidden animate-popover">
            <DatePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={(inDate, outDate) => {
                setCheckIn(inDate);
                setCheckOut(outDate);
                if (inDate && outDate) setShowDatePicker(false);
              }}
            />
          </div>
        )}

        {showGuestPicker && (
          <div className="absolute top-full right-0 mt-2 z-40 rounded-3xl bg-white shadow-airbnb-modal border border-gray-100 overflow-hidden animate-popover">
            <GuestSelector
              guests={guests}
              onChange={setGuests}
              maxGuests={property.guests}
            />
          </div>
        )}
      </div>

      {/* Reserve CTA Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleReserve}
        className="text-base py-3.5"
      >
        Reserve
      </Button>

      <p className="text-center text-xs text-gray-500">
        You won’t be charged yet
      </p>

      {/* Dynamic Price Calculation Breakdown */}
      <div className="space-y-3 pt-2 text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <span className="underline underline-offset-2">
            {format(property.price)} × {nights} {nights === 1 ? 'night' : 'nights'}
          </span>
          <span>{format(breakdown.nightsTotal)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="underline underline-offset-2">Cleaning fee</span>
          <span>{format(breakdown.cleaningFee)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="underline underline-offset-2">HavenStay service fee</span>
          <span>{format(breakdown.serviceFee)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="underline underline-offset-2">Taxes (GST 18%)</span>
          <span>{format(breakdown.taxes)}</span>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-between items-center font-bold text-base text-[#222222]">
          <span>Total</span>
          <span>{format(breakdown.totalPrice)}</span>
        </div>
      </div>

      {property.isRareFind && (
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50/70 p-3.5 border border-amber-200/60">
          <Gem className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold block">This is a rare find</span>
            <span>{property.host.name}’s place is usually fully booked.</span>
          </div>
        </div>
      )}
    </div>
  );
}
