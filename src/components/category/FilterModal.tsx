'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { FilterState } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { POPULAR_AMENITY_IDS, AMENITIES_LIST } from '@/data/amenities';
import { Home, Building, Hotel, Warehouse, Check } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (updated: FilterState) => void;
  totalResultsCount?: number;
}

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
  totalResultsCount = 12,
}: FilterModalProps) {
  const { format } = useCurrency();
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Sync when opened
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleClear = () => {
    setLocalFilters({});
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const toggleAmenity = (id: string) => {
    const current = localFilters.amenities || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setLocalFilters({ ...localFilters, amenities: updated });
  };

  const toggleType = (type: string) => {
    const current = localFilters.types || [];
    const updated = current.includes(type)
      ? current.filter((item) => item !== type)
      : [...current, type];
    setLocalFilters({ ...localFilters, types: updated });
  };

  const propertyTypes = [
    { label: 'House', icon: <Home className="h-6 w-6" />, value: 'Entire home' },
    { label: 'Apartment', icon: <Building className="h-6 w-6" />, value: 'Entire apartment' },
    { label: 'Guesthouse / Villa', icon: <Warehouse className="h-6 w-6" />, value: 'Entire villa' },
    { label: 'Luxury Suite / Hotel', icon: <Hotel className="h-6 w-6" />, value: 'Luxury suite' },
  ];

  const numberOptions = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      maxWidth="2xl"
    >
      <div className="space-y-8 divide-y divide-gray-100 pb-16">
        {/* Price Range */}
        <div className="space-y-4 pt-1">
          <div>
            <h4 className="text-lg font-bold text-[#222222]">Price range</h4>
            <p className="text-xs text-gray-500">Nightly prices before taxes and fees</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-300 p-3 focus-within:border-black">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase">Minimum</label>
              <div className="flex items-center gap-1 font-semibold text-base text-[#222222]">
                <span>₹</span>
                <input
                  type="number"
                  value={localFilters.minPrice || ''}
                  placeholder="5000"
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full bg-transparent focus:outline-hidden"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-300 p-3 focus-within:border-black">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase">Maximum</label>
              <div className="flex items-center gap-1 font-semibold text-base text-[#222222]">
                <span>₹</span>
                <input
                  type="number"
                  value={localFilters.maxPrice || ''}
                  placeholder="80000"
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      maxPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full bg-transparent focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Types */}
        <div className="space-y-4 pt-6">
          <div>
            <h4 className="text-lg font-bold text-[#222222]">Property type</h4>
            <p className="text-xs text-gray-500">Choose the kind of place you want to stay in</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {propertyTypes.map((pt) => {
              const isSelected = localFilters.types?.includes(pt.value);
              return (
                <button
                  key={pt.value}
                  type="button"
                  onClick={() => toggleType(pt.value)}
                  className={`flex flex-col items-start justify-between p-4 rounded-2xl border transition-all text-left h-28 ${
                    isSelected
                      ? 'border-black bg-gray-50 shadow-xs ring-1 ring-black'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  <div className={isSelected ? 'text-black' : 'text-gray-600'}>{pt.icon}</div>
                  <span className="text-xs font-bold text-[#222222]">{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rooms and Beds */}
        <div className="space-y-6 pt-6">
          <div>
            <h4 className="text-lg font-bold text-[#222222]">Rooms and beds</h4>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#222222]">Bedrooms</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {numberOptions.map((opt) => {
                const isSelected =
                  opt === 'Any'
                    ? !localFilters.bedrooms || localFilters.bedrooms === 'any'
                    : localFilters.bedrooms === Number(opt);
                return (
                  <button
                    key={`bed-${opt}`}
                    type="button"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bedrooms: opt === 'Any' ? 'any' : Number(opt),
                      })
                    }
                    className={`h-10 min-w-14 rounded-full px-4 text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 bg-white text-[#222222] hover:border-black'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-[#222222]">Bathrooms</span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {numberOptions.map((opt) => {
                const isSelected =
                  opt === 'Any'
                    ? !localFilters.bathrooms || localFilters.bathrooms === 'any'
                    : localFilters.bathrooms === Number(opt);
                return (
                  <button
                    key={`bath-${opt}`}
                    type="button"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bathrooms: opt === 'Any' ? 'any' : Number(opt),
                      })
                    }
                    className={`h-10 min-w-14 rounded-full px-4 text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'border-gray-200 bg-white text-[#222222] hover:border-black'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4 pt-6">
          <div>
            <h4 className="text-lg font-bold text-[#222222]">Amenities</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_AMENITY_IDS.map((amenityId) => {
              const item = AMENITIES_LIST.find((a) => a.id === amenityId);
              if (!item) return null;
              const isChecked = localFilters.amenities?.includes(item.id);

              return (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer select-none"
                >
                  <div
                    onClick={() => toggleAmenity(item.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                      isChecked
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm text-gray-800 font-medium">{item.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Booking Options */}
        <div className="space-y-4 pt-6">
          <div>
            <h4 className="text-lg font-bold text-[#222222]">Booking options</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-sm text-[#222222] block">Instant Book</span>
                <span className="text-xs text-gray-500">Listings you can book without waiting for host approval</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLocalFilters({ ...localFilters, instantBook: !localFilters.instantBook })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  localFilters.instantBook ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    localFilters.instantBook ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-sm text-[#222222] block">Self check-in</span>
                <span className="text-xs text-gray-500">Easy access to the property via smart lock or keypad</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLocalFilters({ ...localFilters, selfCheckIn: !localFilters.selfCheckIn })
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  localFilters.selfCheckIn ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    localFilters.selfCheckIn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="fixed sm:sticky bottom-0 inset-x-0 bg-white border-t border-gray-100 p-4 sm:px-6 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm font-semibold text-[#222222] underline hover:text-black"
        >
          Clear all
        </button>

        <Button variant="black" onClick={handleApply}>
          Show {totalResultsCount} places
        </Button>
      </div>
    </Modal>
  );
}
