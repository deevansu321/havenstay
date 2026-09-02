'use client';

import React, { useState } from 'react';
import { AMENITIES_LIST } from '@/data/amenities';
import { AMENITY_ICON_LOOKUP, AmenitiesModal } from './AmenitiesModal';
import { Check } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface AmenitiesGridProps {
  amenityIds: string[];
}

export function AmenitiesGrid({ amenityIds }: AmenitiesGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Match IDs to items
  const matchedAmenities = AMENITIES_LIST.filter((a) => amenityIds.includes(a.id));
  const displayedAmenities = matchedAmenities.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {displayedAmenities.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="text-gray-700">
              {AMENITY_ICON_LOOKUP[item.icon] || <Check className="h-5 w-5" />}
            </div>
            <span className="text-sm font-medium text-[#222222]">{item.name}</span>
          </div>
        ))}
      </div>

      {matchedAmenities.length > 6 && (
        <Button
          variant="outline"
          size="md"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl mt-2"
        >
          Show all {matchedAmenities.length} amenities
        </Button>
      )}

      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableAmenityIds={amenityIds}
      />
    </div>
  );
}
