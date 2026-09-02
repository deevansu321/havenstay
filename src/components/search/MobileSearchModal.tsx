'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, MapPin, Calendar, Users, RotateCcw } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { GuestSelector, GuestsCount } from './GuestSelector';
import { DestinationPopover } from './DestinationPopover';
import { Button } from '@/components/common/Button';
import { formatDateRange } from '@/lib/utils';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export function MobileSearchModal({
  isOpen,
  onClose,
  initialLocation = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 1,
}: MobileSearchModalProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<'where' | 'when' | 'who'>('where');
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState<GuestsCount>({
    adults: initialGuests || 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  if (!isOpen) return null;

  const totalGuests = guests.adults + guests.children;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (totalGuests > 1) params.set('guests', String(totalGuests));

    onClose();
    router.push(`/search?${params.toString()}`);
  };

  const handleClearAll = () => {
    setLocation('');
    setCheckIn('');
    setCheckOut('');
    setGuests({ adults: 1, children: 0, infants: 0, pets: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F7F7] flex flex-col md:hidden animate-slide-up overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="font-bold text-sm text-[#222222]">Stays</span>

        <button
          type="button"
          onClick={handleClearAll}
          className="text-xs font-semibold text-gray-600 underline"
        >
          Clear all
        </button>
      </div>

      {/* Accordion Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {/* Step 1: Where */}
        <div
          className={`rounded-3xl border transition-all ${
            activeStep === 'where'
              ? 'bg-white border-gray-200 p-5 shadow-airbnb-card'
              : 'bg-white/80 border-gray-200 p-4'
          }`}
        >
          {activeStep === 'where' ? (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#222222]">Where to?</h3>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  placeholder="Search destinations (e.g. Goa, Manali, Paris)"
                  className="w-full rounded-2xl border border-gray-300 py-3 pl-10 pr-4 text-sm font-semibold text-[#222222] focus:border-black focus:outline-hidden"
                />
              </div>
              <DestinationPopover
                searchTerm={location}
                onSelect={(dest) => {
                  setLocation(dest);
                  setActiveStep('when');
                }}
              />
            </div>
          ) : (
            <div
              onClick={() => setActiveStep('where')}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-semibold text-gray-500">Where</span>
              <span className="text-xs font-bold text-[#222222] truncate max-w-[160px]">
                {location || "I'm flexible"}
              </span>
            </div>
          )}
        </div>

        {/* Step 2: When */}
        <div
          className={`rounded-3xl border transition-all ${
            activeStep === 'when'
              ? 'bg-white border-gray-200 p-5 shadow-airbnb-card'
              : 'bg-white/80 border-gray-200 p-4'
          }`}
        >
          {activeStep === 'when' ? (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#222222]">When’s your trip?</h3>
              <DatePicker
                checkIn={checkIn}
                checkOut={checkOut}
                isSingleMonthMobile={true}
                onChange={(inDate, outDate) => {
                  setCheckIn(inDate);
                  setCheckOut(outDate);
                  if (inDate && outDate) setActiveStep('who');
                }}
              />
            </div>
          ) : (
            <div
              onClick={() => setActiveStep('when')}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-semibold text-gray-500">When</span>
              <span className="text-xs font-bold text-[#222222]">
                {checkIn ? formatDateRange(checkIn, checkOut) : 'Add dates'}
              </span>
            </div>
          )}
        </div>

        {/* Step 3: Who */}
        <div
          className={`rounded-3xl border transition-all ${
            activeStep === 'who'
              ? 'bg-white border-gray-200 p-5 shadow-airbnb-card'
              : 'bg-white/80 border-gray-200 p-4'
          }`}
        >
          {activeStep === 'who' ? (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#222222]">Who’s coming?</h3>
              <GuestSelector guests={guests} onChange={setGuests} />
            </div>
          ) : (
            <div
              onClick={() => setActiveStep('who')}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-semibold text-gray-500">Who</span>
              <span className="text-xs font-bold text-[#222222]">
                {totalGuests > 1 ? `${totalGuests} guests` : 'Add guests'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Search Action */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleClearAll}
          className="text-xs font-bold text-[#222222] underline"
        >
          Clear all
        </button>

        <Button
          variant="primary"
          size="md"
          onClick={handleSearch}
          leftIcon={<Search className="h-4 w-4 stroke-[3]" />}
          className="px-6 py-3 rounded-2xl text-sm font-bold"
        >
          Search stays
        </Button>
      </div>
    </div>
  );
}
