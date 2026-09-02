'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { useCurrency } from '@/context/CurrencyContext';
import { Star, Medal, Users, Bed, Bath, ArrowRight } from 'lucide-react';
import { FavoriteHeart } from './FavoriteHeart';

interface QuickViewModalProps {
  property: Property | null;
  onClose: () => void;
}

export function QuickViewModal({ property, onClose }: QuickViewModalProps) {
  const { format } = useCurrency();

  if (!property) return null;

  return (
    <Modal
      isOpen={!!property}
      onClose={onClose}
      title={property.location.city}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-2 gap-2 h-64 rounded-2xl overflow-hidden bg-gray-100 relative">
          <div className="relative h-full">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <div className="relative h-full">
              <Image
                src={property.images[1] || property.images[0]}
                alt="Photo 2"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
            <div className="relative h-full">
              <Image
                src={property.images[2] || property.images[0]}
                alt="Photo 3"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <FavoriteHeart propertyId={property.id} size="sm" className="bg-white/80 backdrop-blur-md rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#FF385C] uppercase tracking-wider block">
                {property.type}
              </span>
              <h3 className="font-extrabold text-lg text-[#222222]">{property.title}</h3>
              <p className="text-xs text-gray-500">{property.location.city}, {property.location.country}</p>
            </div>

            <div className="flex items-center gap-1 font-bold text-sm text-[#222222] shrink-0 bg-gray-50 py-1.5 px-3 rounded-xl border border-gray-100">
              <Star className="h-4 w-4 fill-[#222222]" />
              <span>{property.rating.toFixed(2)}</span>
              <span className="text-xs text-gray-400 font-normal">({property.reviewsCount})</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 py-3 border-y border-gray-100 text-xs text-gray-700">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{property.guests} guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-gray-500" />
              <span>{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-gray-500" />
              <span>{property.bathrooms} baths</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="font-black text-xl text-[#222222]">
              {format(property.price)}
            </span>
            <span className="text-xs text-gray-500">/ night</span>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/rooms/${property.id}`} onClick={onClose}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Full details
              </Button>
            </Link>
            <Link href={`/reserve/${property.id}`} onClick={onClose}>
              <Button variant="primary" size="sm">
                Reserve
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
