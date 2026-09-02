'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { Sparkles, CheckCircle2, MessageSquare, MapPin, KeyRound, Tag } from 'lucide-react';

interface RatingCategoryBarsProps {
  ratings: Property['ratingsBreakdown'];
}

export function RatingCategoryBars({ ratings }: RatingCategoryBarsProps) {
  const categories = [
    { label: 'Cleanliness', score: ratings.cleanliness, icon: <Sparkles className="h-5 w-5" /> },
    { label: 'Accuracy', score: ratings.accuracy, icon: <CheckCircle2 className="h-5 w-5" /> },
    { label: 'Communication', score: ratings.communication, icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'Location', score: ratings.location, icon: <MapPin className="h-5 w-5" /> },
    { label: 'Check-in', score: ratings.checkIn, icon: <KeyRound className="h-5 w-5" /> },
    { label: 'Value', score: ratings.value, icon: <Tag className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-6 border-y border-gray-200">
      {categories.map((cat) => {
        const percent = (cat.score / 5) * 100;
        return (
          <div key={cat.label} className="flex flex-col gap-1 pr-4 border-r border-gray-100 last:border-r-0">
            <span className="text-xs font-semibold text-[#222222]">{cat.label}</span>
            <span className="text-lg font-bold text-[#222222]">{cat.score.toFixed(1)}</span>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-gray-400 mt-2">{cat.icon}</div>
          </div>
        );
      })}
    </div>
  );
}
