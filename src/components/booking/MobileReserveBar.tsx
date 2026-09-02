'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/common/Button';
import { Star, ShieldCheck } from 'lucide-react';

interface MobileReserveBarProps {
  property: Property;
  checkIn?: string;
  checkOut?: string;
}

export function MobileReserveBar({
  property,
  checkIn,
  checkOut,
}: MobileReserveBarProps) {
  const router = useRouter();
  const { format } = useCurrency();

  const handleReserve = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    router.push(`/reserve/${property.id}?${params.toString()}`);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 px-4 py-2.5 pb-4 flex items-center justify-between z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] select-none">
      <div className="space-y-0.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-black text-[#222222]">
            {format(property.price)}
          </span>
          <span className="text-xs text-gray-500 font-medium">night</span>
          {property.originalPrice && property.originalPrice > property.price && (
            <span className="text-[11px] text-gray-400 line-through">
              {format(property.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-600 font-semibold">
          <Star className="h-3 w-3 fill-black text-black" />
          <span>{property.rating.toFixed(2)}</span>
          <span>·</span>
          <span className="underline">{property.datesAvailable || 'Available now'}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReserve}
        className="px-6 py-2.5 rounded-2xl bg-linear-to-r from-[#FF385C] via-[#E00B41] to-[#D70466] text-white text-xs sm:text-sm font-black shadow-md active:scale-95 transition-all cursor-pointer"
      >
        Reserve
      </button>
    </div>
  );
}
