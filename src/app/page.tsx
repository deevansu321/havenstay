'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { CategoryNav } from '@/components/category/CategoryNav';
import { FilterModal } from '@/components/category/FilterModal';
import { IconsSection } from '@/components/home/IconsSection';
import { CuratedCollections } from '@/components/home/CuratedCollections';
import { FilterState } from '@/lib/types';
import { EmptyState } from '@/components/common/EmptyState';
import { MapPin, Sparkles, SlidersHorizontal, Flame } from 'lucide-react';

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});

  // Filter properties based on category and custom filter criteria
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // Category match
      if (categoryParam !== 'all' && prop.category !== categoryParam) {
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

      // Property Type
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

      // Instant Book
      if (filters.instantBook && !prop.rules.selfCheckIn) {
        return false;
      }

      // Self Check-in
      if (filters.selfCheckIn && !prop.rules.selfCheckIn) {
        return false;
      }

      return true;
    });
  }, [categoryParam, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.types && filters.types.length > 0) count += filters.types.length;
    if (filters.bedrooms && filters.bedrooms !== 'any') count++;
    if (filters.bathrooms && filters.bathrooms !== 'any') count++;
    if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.instantBook) count++;
    if (filters.selfCheckIn) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
      {/* Category Horizontal Navigation */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white pt-1">
        <CategoryNav
          onOpenFilters={() => setIsFilterModalOpen(true)}
          activeFilterCount={activeFilterCount}
        />
      </div>

      {/* Curated Collection Banners */}
      {categoryParam === 'all' && <CuratedCollections />}

      {/* HavenStay Icons & Celebrity Stays */}
      {categoryParam === 'all' && (
        <section id="icons">
          <IconsSection />
        </section>
      )}

      {/* Property Cards Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-[#FF385C]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#222222]">
              {categoryParam === 'all' ? 'Popular homes around the world' : `Exceptional ${categoryParam.replace('-', ' ')} stays`}
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {filteredProperties.length} places available
          </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProperties.map((property, idx) => (
              <PropertyCard
                key={property.id}
                property={property}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<MapPin className="h-10 w-10" />}
            title="No exact matches found"
            description="Try changing or clearing some of your filters to discover more extraordinary stays."
            actionText="Clear all filters"
            onAction={() => setFilters({})}
          />
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(updated) => setFilters(updated)}
        totalResultsCount={filteredProperties.length}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8"><div className="skeleton-shimmer h-96 rounded-3xl" /></div>}>
      <HomeContent />
    </Suspense>
  );
}
