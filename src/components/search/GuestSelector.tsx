'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface GuestsCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestSelectorProps {
  guests: GuestsCount;
  onChange: (guests: GuestsCount) => void;
  maxGuests?: number;
}

export function GuestSelector({
  guests,
  onChange,
  maxGuests = 16,
}: GuestSelectorProps) {
  const totalGuests = guests.adults + guests.children;

  const updateCount = (type: keyof GuestsCount, delta: number) => {
    const updated = { ...guests };
    const nextVal = Math.max(0, updated[type] + delta);

    if (type === 'adults') {
      // If changing adults to 0 when children exist, keep at least 1 adult
      if (nextVal === 0 && updated.children > 0) return;
      if (nextVal > maxGuests) return;
      updated.adults = nextVal;
    } else if (type === 'children') {
      if (totalGuests + delta > maxGuests) return;
      // If adding child and adults is 0, set adults to 1
      if (nextVal > 0 && updated.adults === 0) {
        updated.adults = 1;
      }
      updated.children = nextVal;
    } else if (type === 'infants') {
      if (nextVal > 5) return;
      if (nextVal > 0 && updated.adults === 0) {
        updated.adults = 1;
      }
      updated.infants = nextVal;
    } else if (type === 'pets') {
      if (nextVal > 5) return;
      if (nextVal > 0 && updated.adults === 0) {
        updated.adults = 1;
      }
      updated.pets = nextVal;
    }

    onChange(updated);
  };

  const rows = [
    {
      key: 'adults' as const,
      title: 'Adults',
      subtitle: 'Ages 13 or above',
      count: guests.adults,
      canDecrement: guests.adults > (guests.children > 0 ? 1 : 0),
      canIncrement: totalGuests < maxGuests,
    },
    {
      key: 'children' as const,
      title: 'Children',
      subtitle: 'Ages 2–12',
      count: guests.children,
      canDecrement: guests.children > 0,
      canIncrement: totalGuests < maxGuests,
    },
    {
      key: 'infants' as const,
      title: 'Infants',
      subtitle: 'Under 2',
      count: guests.infants,
      canDecrement: guests.infants > 0,
      canIncrement: guests.infants < 5,
    },
    {
      key: 'pets' as const,
      title: 'Pets',
      subtitle: 'Bringing a service animal?',
      count: guests.pets,
      canDecrement: guests.pets > 0,
      canIncrement: guests.pets < 5,
    },
  ];

  return (
    <div className="flex flex-col divide-y divide-gray-100 p-2 sm:p-4 min-w-[280px] sm:min-w-[340px] bg-white select-none">
      {rows.map((row) => (
        <div key={row.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#222222]">{row.title}</span>
            <span className="text-xs text-gray-500">{row.subtitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={!row.canDecrement}
              onClick={() => updateCount(row.key, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed transition-colors"
              aria-label={`Decrease ${row.title}`}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-5 text-center text-sm font-semibold text-[#222222]">
              {row.count}
            </span>

            <button
              type="button"
              disabled={!row.canIncrement}
              onClick={() => updateCount(row.key, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed transition-colors"
              aria-label={`Increase ${row.title}`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
