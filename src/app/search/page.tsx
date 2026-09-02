'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { FilterModal } from '@/components/category/FilterModal';
import { FilterState } from '@/lib/types';
import { EmptyState } from '@/components/common/EmptyState';
import { SlidersHorizontal, Map as MapIcon, List, ArrowUpDown } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location') || '';
  const checkInParam = searchParams.get('checkIn') || '';
  const checkOutParam = searchParams.get('checkOut') || '';
  const guestsParam = searchParams.get('guests') ? Number(searchParams.get('guests')) : 1;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price_low' | 'price_high'>('recommended');
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [showMapMobile, setShowMapMobile] = useState(false);

  // Filter listings
  const results = useMemo(() => {
    let list = PROPERTIES.filter((prop) => {
      // Location matching
      if (locationParam.trim()) {
        const query = locationParam.toLowerCase();
        const matchesLoc =
          prop.location.city.toLowerCase().includes(query) ||
          prop.location.country.toLowerCase().includes(query) ||
          prop.title.toLowerCase().includes(query) ||
          prop.type.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }

      // Guests
      if (guestsParam && prop.guests < guestsParam) {
        return false;
      }

      // Min Price
      if (filters.minPrice && prop.price < filters.minPrice) {
        return false;
      }

      // Max Price
      if (filters.maxPrice && prop.price > filters.maxPrice) {
        return false;
      }

      // Types
      if (filters.types && filters.types.length > 0 && !filters.types.includes(prop.type)) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms !== 'any' && prop.bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      // Bathrooms
      if (filters.bathrooms && filters.bathrooms !== 'any' && prop.bathrooms < Number(filters.bathrooms)) {
        return false;
      }

      // Amenities
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((a) => prop.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [locationParam, guestsParam, filters, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.types && filters.types.length > 0) count += filters.types.length;
    if (filters.bedrooms && filters.bedrooms !== 'any') count++;
    if (filters.bathrooms && filters.bathrooms !== 'any') count++;
    if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;
    return count;
  }, [filters]);

  const dateText = (checkInParam || checkOutParam)
    ? formatDateRange(checkInParam, checkOutParam)
    : '';

  return (
    <div className="w-full min-h-screen bg-white pb-20 md:pb-8">
      {/* Sub-header Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white border-b border-gray-100 py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-[#222222] truncate">
              {results.length} places {locationParam ? `in ${locationParam}` : 'available'}
            </h1>
            {dateText && (
              <p className="text-[11px] text-gray-500 truncate">
                {dateText} {guestsParam > 1 ? `· ${guestsParam} guests` : ''}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none rounded-xl border border-gray-300 py-1.5 sm:py-2 pl-2.5 sm:pl-3 pr-7 sm:pr-8 text-xs font-semibold text-[#222222] bg-white hover:border-black cursor-pointer focus:outline-hidden"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest rated</option>
                <option value="price_low">Price: low to high</option>
                <option value="price_high">Price: high to low</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-gray-500" />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 py-1.5 sm:py-2 px-2.5 sm:px-3 text-xs font-semibold text-[#222222] hover:border-black transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#222222] text-[9px] sm:text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Grid + Map Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Properties Left Column */}
          <div className={`lg:col-span-7 ${showMapMobile ? 'hidden lg:block' : 'block'}`}>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10">
                {results.map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    priority={idx < 4}
                    onHover={(id) => setHoveredPropertyId(id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<MapIcon className="h-10 w-10" />}
                title="No results match your search"
                description="Try expanding your search radius or clearing filter criteria to discover properties."
                actionText="Reset filters"
                onAction={() => setFilters({})}
              />
            )}
          </div>

          {/* Map Right Column */}
          <div
            className={`lg:col-span-5 sticky top-36 h-[calc(100vh-160px)] ${
              showMapMobile ? 'block fixed inset-x-0 bottom-16 top-28 z-30 px-3' : 'hidden lg:block'
            }`}
          >
            <InteractiveMap
              properties={results}
              hoveredPropertyId={hoveredPropertyId}
              onPropertyHover={(id) => setHoveredPropertyId(id)}
              className="w-full h-full shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Floating Map/List Toggle on Mobile */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => setShowMapMobile(!showMapMobile)}
          className="flex items-center gap-2 rounded-full bg-[#222222] text-white px-5 py-2.5 shadow-airbnb-floating font-bold text-xs transition-transform active:scale-95"
        >
          {showMapMobile ? (
            <>
              <List className="h-4 w-4" />
              <span>Show list</span>
            </>
          ) : (
            <>
              <MapIcon className="h-4 w-4" />
              <span>Show map</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(updated) => setFilters(updated)}
        totalResultsCount={results.length}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><div className="skeleton-shimmer h-96 rounded-3xl" /></div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
