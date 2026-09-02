'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';

interface CompactSearchBarProps {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  onClick: () => void;
}

export function CompactSearchBar({
  location,
  checkIn,
  checkOut,
  guests,
  onClick,
}: CompactSearchBarProps) {
  const locationText = location || 'Anywhere';
  const datesText = (checkIn || checkOut) ? formatDateRange(checkIn, checkOut) : 'Any week';
  const guestsText = guests && guests > 1 ? `${guests} guests` : 'Add guests';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between gap-3 rounded-full border border-gray-300 bg-white py-2 pl-5 pr-2 shadow-xs hover:shadow-airbnb-search transition-all duration-200 cursor-pointer active:scale-98 text-left"
    >
      <div className="flex items-center text-xs sm:text-sm font-semibold text-[#222222] divide-x divide-gray-200">
        <span className="pr-3 truncate max-w-[100px] sm:max-w-[140px]">{locationText}</span>
        <span className="px-3 truncate max-w-[90px] sm:max-w-[120px] font-medium text-gray-600">{datesText}</span>
        <span className="pl-3 truncate hidden sm:inline-block font-normal text-gray-500">{guestsText}</span>
      </div>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF385C] text-white transition-transform group-hover:scale-105">
        <Search className="h-3.5 w-3.5 stroke-[3]" />
      </div>
    </button>
  );
}
