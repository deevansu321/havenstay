'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';

interface PriceMarkerProps {
  property: Property;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick: (property: Property) => void;
  onHover?: (id: string | null) => void;
}

export function PriceMarker({
  property,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover,
}: PriceMarkerProps) {
  const { formatShort } = useCurrency();
  const highlighted = isSelected || isHovered;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(property);
      }}
      onMouseEnter={() => onHover && onHover(property.id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`group relative flex items-center justify-center rounded-full font-bold text-xs py-1.5 px-3 transition-all duration-200 cursor-pointer shadow-md focus:outline-hidden ${
        highlighted
          ? 'bg-[#222222] text-white scale-110 z-30 ring-2 ring-white shadow-xl'
          : 'bg-white text-[#222222] hover:scale-105 hover:bg-gray-50 z-10 border border-gray-200'
      }`}
      aria-label={`View ${property.title} for ${formatShort(property.price)}`}
    >
      <span>{formatShort(property.price)}</span>
      
      {/* Down arrow triangle */}
      <div
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 transition-colors ${
          highlighted ? 'border-t-[#222222]' : 'border-t-white'
        }`}
      />
    </button>
  );
}
