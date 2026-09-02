'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { getReviewsForProperty } from '@/data/reviews';
import { RatingCategoryBars } from './RatingCategoryBars';
import { Star, Award } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

interface ReviewSectionProps {
  property: Property;
}

export function ReviewSection({ property }: ReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = getReviewsForProperty(property.id);

  return (
    <div className="space-y-8 py-8">
      {/* Header Rating Overview */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-2xl font-bold text-[#222222]">
            <Star className="h-6 w-6 fill-[#222222] text-[#222222]" />
            <span>{property.rating.toFixed(2)}</span>
          </div>
          <span className="text-2xl font-bold text-gray-400">·</span>
          <span className="text-2xl font-bold text-[#222222]">
            {property.reviewsCount} reviews
          </span>
        </div>

        {property.isGuestFavorite && (
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <Award className="h-4 w-4 text-[#FF385C]" />
            <span>One of the most loved homes on HavenStay based on ratings, reviews, and reliability.</span>
          </div>
        )}
      </div>

      {/* Breakdown Bars */}
      <RatingCategoryBars ratings={property.ratingsBreakdown} />

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {reviews.slice(0, 6).map((rev) => (
          <div key={rev.id} className="space-y-3">
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
                <p className="text-xs text-gray-500">
                  {rev.author.location} · {rev.author.joinedDate}
                </p>
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

      {reviews.length > 2 && (
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl mt-4"
        >
          Show all {property.reviewsCount} reviews
        </Button>
      )}

      {/* Full Reviews Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Reviews (${property.reviewsCount})`}
        maxWidth="2xl"
      >
        <div className="space-y-6 divide-y divide-gray-100">
          {reviews.map((rev) => (
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
      </Modal>
    </div>
  );
}
