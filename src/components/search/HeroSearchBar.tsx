'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles, Home, Ticket, Crown } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { GuestSelector, GuestsCount } from './GuestSelector';
import { DestinationPopover } from './DestinationPopover';
import { formatDateRange } from '@/lib/utils';

interface HeroSearchBarProps {
  initialLocation?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export function HeroSearchBar({
  initialLocation = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 1,
}: HeroSearchBarProps) {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState<'stays' | 'experiences' | 'luxe'>('stays');
  const [activeTab, setActiveTab] = useState<'where' | 'checkIn' | 'checkOut' | 'who' | null>(null);
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState<GuestsCount>({
    adults: initialGuests || 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const guestSummary =
    totalGuests === 0
      ? 'Add guests'
      : `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
          guests.infants > 0 ? `, ${guests.infants} infant` : ''
        }${guests.pets > 0 ? `, ${guests.pets} pet` : ''}`;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (totalGuests > 1) params.set('guests', String(totalGuests));
    if (searchMode === 'luxe') params.set('category', 'luxe');

    setActiveTab(null);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Top Search Mode Tabs */}
      <div className="flex items-center gap-6 mb-3 text-sm font-semibold text-[#222222]">
        <button
          type="button"
          onClick={() => setSearchMode('stays')}
          className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
            searchMode === 'stays'
              ? 'border-black text-[#222222] font-bold'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Stays</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSearchMode('experiences');
            router.push('/#icons');
          }}
          className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
            searchMode === 'experiences'
              ? 'border-black text-[#222222] font-bold'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Ticket className="h-4 w-4 text-[#FF385C]" />
          <span>Icons & Experiences</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSearchMode('luxe');
            router.push('/search?category=luxe');
          }}
          className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
            searchMode === 'luxe'
              ? 'border-black text-[#222222] font-bold'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Crown className="h-4 w-4 text-amber-500" />
          <span>Luxe Estates</span>
        </button>
      </div>

      {/* Search Bar Pill Container */}
      <div
        className={`w-full flex items-center rounded-full border transition-all duration-200 ${
          activeTab
            ? 'bg-[#EBEBEB] border-transparent shadow-airbnb-floating'
            : 'bg-white border-gray-200 hover:shadow-airbnb-search shadow-sm'
        }`}
      >
        {/* Where Segment */}
        <div
          onClick={() => setActiveTab('where')}
          className={`flex-1 cursor-pointer py-3.5 px-6 rounded-full transition-colors relative ${
            activeTab === 'where' ? 'bg-white shadow-airbnb-card z-10' : 'hover:bg-gray-100/70'
          }`}
        >
          <label className="block text-xs font-bold text-[#222222] tracking-tight">Where</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setActiveTab('where')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            placeholder="Search destinations, villas, cities"
            className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder-gray-500 focus:outline-hidden truncate"
          />
          {location && activeTab === 'where' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocation('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Check In Segment */}
        <div
          onClick={() => setActiveTab('checkIn')}
          className={`cursor-pointer py-3.5 px-6 rounded-full transition-colors flex-1 ${
            activeTab === 'checkIn' || activeTab === 'checkOut'
              ? 'bg-white shadow-airbnb-card z-10'
              : 'hover:bg-gray-100/70'
          }`}
        >
          <span className="block text-xs font-bold text-[#222222] tracking-tight">Check in</span>
          <span className="block text-sm font-medium text-gray-800 truncate">
            {checkIn ? formatDateRange(checkIn) : 'Add dates'}
          </span>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Check Out Segment */}
        <div
          onClick={() => setActiveTab('checkOut')}
          className={`cursor-pointer py-3.5 px-6 rounded-full transition-colors flex-1 ${
            activeTab === 'checkIn' || activeTab === 'checkOut'
              ? 'bg-white shadow-airbnb-card z-10'
              : 'hover:bg-gray-100/70'
          }`}
        >
          <span className="block text-xs font-bold text-[#222222] tracking-tight">Check out</span>
          <span className="block text-sm font-medium text-gray-800 truncate">
            {checkOut ? formatDateRange(checkOut) : 'Add dates'}
          </span>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Who / Guests Segment & Search Button */}
        <div
          onClick={() => setActiveTab('who')}
          className={`flex items-center justify-between cursor-pointer py-2 pl-6 pr-2 rounded-full transition-colors flex-1 ${
            activeTab === 'who' ? 'bg-white shadow-airbnb-card z-10' : 'hover:bg-gray-100/70'
          }`}
        >
          <div className="truncate pr-2">
            <span className="block text-xs font-bold text-[#222222] tracking-tight">Who</span>
            <span className="block text-sm font-medium text-gray-800 truncate">
              {guestSummary}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }}
            className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white p-3.5 sm:px-4 sm:py-3 font-bold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-4 w-4 stroke-[3]" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Popovers */}
      {activeTab === 'where' && (
        <div className="absolute top-full left-0 mt-3 z-30 rounded-3xl bg-white shadow-airbnb-modal border border-gray-100 overflow-hidden animate-popover">
          <DestinationPopover
            searchTerm={location}
            onSelect={(dest) => {
              setLocation(dest);
              setActiveTab('checkIn');
            }}
          />
        </div>
      )}

      {(activeTab === 'checkIn' || activeTab === 'checkOut') && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-30 rounded-3xl bg-white shadow-airbnb-modal border border-gray-100 overflow-hidden animate-popover">
          <DatePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(inDate, outDate) => {
              setCheckIn(inDate);
              setCheckOut(outDate);
              if (inDate && !outDate) {
                setActiveTab('checkOut');
              } else if (inDate && outDate) {
                setActiveTab('who');
              }
            }}
          />
        </div>
      )}

      {activeTab === 'who' && (
        <div className="absolute top-full right-0 mt-3 z-30 rounded-3xl bg-white shadow-airbnb-modal border border-gray-100 overflow-hidden animate-popover">
          <GuestSelector guests={guests} onChange={setGuests} />
        </div>
      )}
    </div>
  );
}
