'use client';

import React from 'react';
import { Modal } from '@/components/common/Modal';
import { AMENITIES_LIST } from '@/data/amenities';
import {
  Wifi,
  UtensilsCrossed,
  Laptop,
  Wind,
  Flame,
  Shirt,
  Tv,
  Sparkles,
  Check,
  Waves,
  Bath,
  Car,
  Zap,
  Dumbbell,
  Thermometer,
  Sun,
  Anchor,
  Mountain,
  Snowflake,
  ShieldCheck,
  ShieldAlert,
  HeartPulse,
  Camera,
} from 'lucide-react';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAmenityIds: string[];
}

export const AMENITY_ICON_LOOKUP: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-5 w-5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-5 w-5" />,
  Laptop: <Laptop className="h-5 w-5" />,
  Wind: <Wind className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Shirt: <Shirt className="h-5 w-5" />,
  Tv: <Tv className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Check: <Check className="h-5 w-5" />,
  Waves: <Waves className="h-5 w-5" />,
  Bath: <Bath className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  Thermometer: <Thermometer className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  Anchor: <Anchor className="h-5 w-5" />,
  Mountain: <Mountain className="h-5 w-5" />,
  Snowflake: <Snowflake className="h-5 w-5" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  Camera: <Camera className="h-5 w-5" />,
};

export function AmenitiesModal({
  isOpen,
  onClose,
  availableAmenityIds,
}: AmenitiesModalProps) {
  const categories = [
    { key: 'features', title: 'Luxury & Outdoor Features' },
    { key: 'essentials', title: 'Bedroom & Laundry Essentials' },
    { key: 'location', title: 'Scenic Views & Location' },
    { key: 'safety', title: 'Home Safety & Security' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="What this place offers"
      maxWidth="xl"
    >
      <div className="space-y-8 divide-y divide-gray-100">
        {categories.map((cat) => {
          const items = AMENITIES_LIST.filter(
            (a) => a.category === cat.key && availableAmenityIds.includes(a.id)
          );

          if (items.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-4 pt-6 first:pt-0">
              <h4 className="text-base font-bold text-[#222222]">{cat.title}</h4>
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 py-3.5">
                    <div className="text-gray-700 mt-0.5 shrink-0">
                      {AMENITY_ICON_LOOKUP[item.icon] || <Check className="h-5 w-5" />}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-[#222222] block">
                        {item.name}
                      </span>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
