'use client';

import React, { useState } from 'react';
import { MapPin, Coffee, Sunset, Wine, Compass, Footprints, Car, Sparkles, Navigation } from 'lucide-react';

interface Gem {
  name: string;
  category: 'cafe' | 'sunset' | 'dining' | 'adventure';
  distance: string;
  travelType: 'walk' | 'drive';
  tip: string;
  rating: number;
}

interface NeighborhoodVibesProps {
  city: string;
}

export function NeighborhoodVibes({ city }: NeighborhoodVibesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'cafe' | 'sunset' | 'dining'>('all');

  const gems: Gem[] = [
    {
      name: 'Artisan Espresso Roastery & Bakery',
      category: 'cafe',
      distance: '4 min walk · 320 m',
      travelType: 'walk',
      tip: 'Try the cinnamon morning brioche and cold brew single-origin robusta.',
      rating: 4.9,
    },
    {
      name: 'Secret Sunset Cliff Viewpoint',
      category: 'sunset',
      distance: '8 min walk · 650 m',
      travelType: 'walk',
      tip: 'Host favorite spot to watch dolphins jump in the red golden hour light.',
      rating: 5.0,
    },
    {
      name: 'Olive Grove Candlelit Bistro',
      category: 'dining',
      distance: '12 min walk · 1.1 km',
      travelType: 'walk',
      tip: 'Live jazz saxophone on Friday nights with fresh wood-fired sourdough pizzas.',
      rating: 4.8,
    },
    {
      name: 'Hidden Lagoon Paddleboard Shack',
      category: 'sunset',
      distance: '6 min drive · 2.4 km',
      travelType: 'drive',
      tip: 'Complimentary paddleboard gear reserved exclusively for HavenStay guests.',
      rating: 4.9,
    },
  ];

  const filteredGems = activeTab === 'all' ? gems : gems.filter((g) => g.category === activeTab);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 font-bold">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#222222]">Neighborhood Vibe & Host Hidden Gems</h4>
            <p className="text-[11px] text-gray-500">Handpicked local spots within minutes of your doorstep in {city}</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'cafe', label: '☕ Cafes' },
            { id: 'sunset', label: '🌅 Views' },
            { id: 'dining', label: '🍷 Dining' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-1 px-3 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gems Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {filteredGems.map((gem, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-200 hover:border-black transition-colors space-y-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h5 className="font-bold text-xs text-[#222222] group-hover:text-[#FF385C] transition-colors">
                  {gem.name}
                </h5>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                  {gem.travelType === 'walk' ? (
                    <Footprints className="h-3.5 w-3.5 text-gray-400" />
                  ) : (
                    <Car className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  <span>{gem.distance}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#222222] bg-white py-0.5 px-2 rounded-lg border border-gray-200">
                ★ {gem.rating}
              </span>
            </div>

            <p className="text-[11px] text-gray-600 italic bg-white/80 p-2 rounded-xl border border-gray-100">
              &quot;{gem.tip}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
