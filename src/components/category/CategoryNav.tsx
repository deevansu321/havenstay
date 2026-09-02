'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import {
  Home,
  Mountain,
  Waves,
  Trees,
  Flame,
  Sparkles,
  Crown,
  Building2,
  Wheat,
  Palmtree,
  Compass,
  Box,
  Rocket,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface CategoryNavProps {
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5 sm:h-6 sm:w-6" />,
  Mountain: <Mountain className="h-5 w-5 sm:h-6 sm:w-6" />,
  Waves: <Waves className="h-5 w-5 sm:h-6 sm:w-6" />,
  Trees: <Trees className="h-5 w-5 sm:h-6 sm:w-6" />,
  Flame: <Flame className="h-5 w-5 sm:h-6 sm:w-6" />,
  Sparkles: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
  Crown: <Crown className="h-5 w-5 sm:h-6 sm:w-6" />,
  Building2: <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />,
  Wheat: <Wheat className="h-5 w-5 sm:h-6 sm:w-6" />,
  Palmtree: <Palmtree className="h-5 w-5 sm:h-6 sm:w-6" />,
  Compass: <Compass className="h-5 w-5 sm:h-6 sm:w-6" />,
  Box: <Box className="h-5 w-5 sm:h-6 sm:w-6" />,
  Rocket: <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />,
  Snowflake: <Snowflake className="h-5 w-5 sm:h-6 sm:w-6" />,
};

export function CategoryNav({ onOpenFilters, activeFilterCount = 0 }: CategoryNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const { showTaxes, setShowTaxes } = useCurrency();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  const handleCategorySelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center justify-between gap-2 border-b border-gray-100 bg-white py-2 sm:py-3 select-none">
      {/* Left Scroll Chevron for Desktop */}
      {canScrollLeft && (
        <div className="hidden sm:flex absolute left-0 top-0 bottom-0 items-center pr-6 bg-gradient-to-r from-white via-white/90 to-transparent z-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-xs hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Horizontal Categories Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth px-1 sm:px-4 flex-1"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`group flex flex-col items-center gap-1.5 pb-2 pt-1 border-b-2 transition-all cursor-pointer shrink-0 select-none ${
                isActive
                  ? 'border-[#222222] text-[#222222] font-semibold'
                  : 'border-transparent text-gray-500 hover:text-[#222222] hover:border-gray-300'
              }`}
            >
              <div
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-[#222222]' : 'text-gray-500 group-hover:text-[#222222]'
                }`}
              >
                {ICON_MAP[cat.iconName] || <Home className="h-5 w-5 sm:h-6 sm:w-6" />}
              </div>
              <span className="text-[11px] sm:text-xs whitespace-nowrap tracking-tight">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Scroll Chevron for Desktop */}
      {canScrollRight && (
        <div className="hidden sm:flex items-center pl-6 bg-gradient-to-l from-white via-white/90 to-transparent z-10">
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-xs hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Mobile & Desktop Action Controls: Filters & Taxes Toggle */}
      <div className="flex items-center gap-2 pl-2 shrink-0">
        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-1.5 rounded-xl border border-gray-300 py-2 px-3 text-xs font-semibold text-[#222222] hover:border-black transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#222222] text-[9px] sm:text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* Taxes Toggle Pill on Desktop */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-gray-200 py-2 px-3 text-xs text-[#222222]">
          <span className="font-semibold whitespace-nowrap">Display taxes</span>
          <button
            type="button"
            onClick={() => setShowTaxes(!showTaxes)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              showTaxes ? 'bg-black' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={showTaxes}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                showTaxes ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
