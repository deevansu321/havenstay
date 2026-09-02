'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { ImageCarousel } from './ImageCarousel';
import { FavoriteHeart } from './FavoriteHeart';
import { QuickViewModal } from './QuickViewModal';
import { Star, Eye, Flame, Sun, CloudSun, TrendingUp } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  onHover?: (id: string | null) => void;
}

export function PropertyCard({
  property,
  priority = false,
  onHover,
}: PropertyCardProps) {
  const { format, showTaxes } = useCurrency();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const discountPercent =
    property.originalPrice && property.originalPrice > property.price
      ? Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)
      : null;

  return (
    <>
      <div
        onMouseEnter={() => onHover && onHover(property.id)}
        onMouseLeave={() => onHover && onHover(null)}
        className="group flex flex-col relative"
      >
        {/* Media Image Carousel Container */}
        <div className="relative w-full mb-3">
          <ImageCarousel
            images={property.images}
            title={property.title}
            aspectRatio="square"
            priority={priority}
          />

          {/* Favorite Heart Button */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <FavoriteHeart propertyId={property.id} size="md" />
          </div>

          {/* Guest Favorite / Badge */}
          {property.badge === 'Guest favorite' || property.isGuestFavorite ? (
            <div className="absolute top-3 left-3 z-20 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#222222] shadow-sm backdrop-blur-xs flex items-center gap-1">
              <span>Guest favorite</span>
            </div>
          ) : property.badge === 'Top 1%' ? (
            <div className="absolute top-3 left-3 z-20 rounded-full bg-linear-to-r from-amber-500 to-amber-700 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-xs">
              ★ Top 1% Stays
            </div>
          ) : property.isRareFind ? (
            <div className="absolute top-3 left-3 z-20 rounded-full bg-black/85 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-xs">
              Rare find
            </div>
          ) : null}

          {/* Discount Pill */}
          {discountPercent && (
            <div className="absolute bottom-3 left-3 z-20 rounded-full bg-emerald-700 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {discountPercent}% OFF
            </div>
          )}

          {/* Quick View Button on Desktop Hover */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            className="absolute bottom-3 right-3 z-20 hidden group-hover:flex items-center gap-1.5 rounded-full bg-white/95 text-[#222222] px-3 py-1.5 text-xs font-bold shadow-md hover:bg-white hover:scale-105 transition-all backdrop-blur-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick look</span>
          </button>
        </div>

        {/* Details Link */}
        <Link
          href={`/rooms/${property.id}`}
          className="flex flex-col gap-1 focus:outline-hidden"
        >
          {/* Title and Rating */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-bold text-sm text-[#222222] truncate group-hover:text-black">
              {property.location.city}, {property.location.country}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-[#222222]">
              <Star className="h-3.5 w-3.5 fill-[#222222] text-[#222222]" />
              <span>{property.rating.toFixed(2)}</span>
            </div>
          </div>

          {/* Distance / Subtitle & Weather Tag */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate max-w-[70%]">
              {property.location.distance || `${property.bedrooms} bedrooms · ${property.type}`}
            </span>
            {property.weather && (
              <span className="shrink-0 text-[11px] text-gray-600 font-medium flex items-center gap-1">
                <Sun className="h-3 w-3 text-amber-500" />
                {property.weather.temp}
              </span>
            )}
          </div>

          {/* Date Range & Views */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">
              {property.datesAvailable || 'Available next month'}
            </span>
            {property.viewsThisWeek && (
              <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" />
                {property.viewsThisWeek} viewed
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-1 flex items-baseline gap-1.5 text-sm">
            <span className="font-extrabold text-[#222222]">
              {format(property.price)}
            </span>
            <span className="text-xs font-normal text-gray-600">
              {showTaxes ? 'total' : 'night'}
            </span>
            {property.originalPrice && !showTaxes && (
              <span className="text-xs text-gray-400 line-through ml-1">
                {format(property.originalPrice)}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        property={isQuickViewOpen ? property : null}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
