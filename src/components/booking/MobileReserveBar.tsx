'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/common/Button';

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
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between z-40 lg:hidden shadow-airbnb-floating">
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-[#222222]">
            {format(property.price)}
          </span>
          <span className="text-xs text-gray-500">/ night</span>
        </div>
        <span className="text-xs text-gray-600 underline font-medium">
          {property.datesAvailable || 'Available now'}
        </span>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={handleReserve}
        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-transform"
      >
        Reserve
      </Button>
    </div>
  );
}
