'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { getReviewsForProperty } from '@/data/reviews';
import { RatingCategoryBars } from './RatingCategoryBars';
import { Star, Award, Search, Sparkles, CheckCircle2, ThumbsUp, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

interface ReviewSectionProps {
  property: Property;
}

export function ReviewSection({ property }: ReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const reviews = getReviewsForProperty(property.id);

  const mentionChips = [
    { label: 'Stunning view', count: 28 },
    { label: 'Cleanliness', count: 24 },
    { label: 'Great host', count: 19 },
    { label: 'Private pool', count: 16 },
    { label: 'Quiet & peaceful', count: 12 },
    { label: 'Fast WiFi', count: 9 },
  ];

  const filteredReviews = useMemo(() => {
    let result = reviews;
    const filterTerm = activeChip || searchQuery;
    if (filterTerm.trim()) {
      const term = filterTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.comment.toLowerCase().includes(term) ||
          r.author.name.toLowerCase().includes(term)
      );
    }
    return result;
  }, [reviews, searchQuery, activeChip]);

  return (
    <div className="space-y-8 py-8 border-t border-gray-200">
      {/* Header Rating Overview */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#222222]">
            <Star className="h-6 w-6 sm:h-7 sm:w-7 fill-[#222222] text-[#222222]" />
            <span>{property.rating.toFixed(2)}</span>
          </div>
          <span className="text-2xl font-bold text-gray-300">·</span>
          <span className="text-2xl sm:text-3xl font-black text-[#222222]">
            {property.reviewsCount} reviews
          </span>
        </div>

        {property.isGuestFavorite && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-900 font-semibold bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 max-w-xl">
            <Award className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Guest Favorite — One of the top 1% rated homes on HavenStay for cleanliness and accuracy.</span>
          </div>
        )}
      </div>

      {/* Breakdown Category Ratings */}
      <RatingCategoryBars ratings={property.ratingsBreakdown} />

      {/* Review Keyword Search Bar & Mention Chips */}
      <div className="space-y-3 pt-2">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeChip) setActiveChip(null);
            }}
            placeholder="Search reviews (e.g. pool, sunset, breakfast, host)..."
            className="w-full rounded-2xl border border-gray-300 py-2.5 pl-10 pr-10 text-xs sm:text-sm font-medium focus:border-black focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mention Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Mentioned:
          </span>
          {mentionChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                if (activeChip === chip.label) {
                  setActiveChip(null);
                } else {
                  setActiveChip(chip.label);
                  setSearchQuery('');
                }
              }}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeChip === chip.label
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {chip.label} ({chip.count})
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {(filteredReviews.length > 0 ? filteredReviews.slice(0, 6) : reviews.slice(0, 6)).map((rev) => (
          <div key={rev.id} className="space-y-3 p-4 rounded-2xl bg-gray-50/60 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shadow-2xs">
                  <Image
                    src={rev.author.avatar}
                    alt={rev.author.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#222222]">{rev.author.name}</h4>
                  <p className="text-xs text-gray-500">
                    {rev.author.location} · {rev.author.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-[#222222]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#222222] text-[#222222]" />
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-400 font-medium">
              <span>Stayed · {rev.date}</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > 2 && (
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl mt-4 text-xs font-bold"
        >
          Show all {property.reviewsCount} reviews & ratings
        </Button>
      )}

      {/* Full Reviews Modal with Live Search */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`All Guest Reviews (${property.reviewsCount})`}
        maxWidth="2xl"
      >
        <div className="space-y-6">
          {/* Modal Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all guest reviews..."
              className="w-full rounded-2xl border border-gray-300 py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <div className="space-y-6 divide-y divide-gray-100 max-h-[60vh] overflow-y-auto pr-1">
            {filteredReviews.map((rev) => (
              <div key={`modal-${rev.id}`} className="pt-6 first:pt-0 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={rev.author.avatar}
                      alt={rev.author.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#222222]">{rev.author.name}</h4>
                    <p className="text-xs text-gray-500">{rev.author.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                  <div className="flex items-center text-[#222222]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#222222] text-[#222222]" />
                    ))}
                  </div>
                  <span>·</span>
                  <span>{rev.date}</span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
