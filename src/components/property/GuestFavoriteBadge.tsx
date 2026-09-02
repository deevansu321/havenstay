'use client';

import React from 'react';
import { Trophy, Star, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuestFavoriteBadgeProps {
  rating: number;
  reviewsCount: number;
  isSuperhost?: boolean;
}

export function GuestFavoriteBadge({
  rating,
  reviewsCount,
  isSuperhost = true,
}: GuestFavoriteBadgeProps) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-linear-to-br from-amber-50/70 via-white to-amber-50/30 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 select-none">
      {/* Laurel Leaf Emblem */}
      <div className="flex items-center gap-4 text-center md:text-left">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-amber-400 to-amber-600 text-white shadow-md shrink-0">
          <Trophy className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-sm font-black tracking-widest text-amber-900 uppercase">
              ✦ Guest favorite ✦
            </span>
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-[#222222]">
            One of the most loved homes on HavenStay
          </h3>
          <p className="text-xs text-gray-500">
            Ranked in the top 1% of homes based on ratings, reviews, and host reliability
          </p>
        </div>
      </div>

      {/* Metrics Stat Pillars */}
      <div className="flex items-center gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-amber-200 pt-4 md:pt-0 md:pl-8 shrink-0 text-center">
        <div>
          <span className="text-xl sm:text-2xl font-black text-[#222222] block">{rating.toFixed(2)}</span>
          <div className="flex items-center justify-center gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        <div className="h-8 w-px bg-amber-200" />

        <div>
          <span className="text-xl sm:text-2xl font-black text-[#222222] block">{reviewsCount}</span>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Reviews
          </span>
        </div>

        <div className="h-8 w-px bg-amber-200" />

        <div>
          <span className="text-xl sm:text-2xl font-black text-amber-700 block">Top 1%</span>
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Worldwide
          </span>
        </div>
      </div>
    </div>
  );
}
