'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Sparkles, TrendingUp, Sun, Snowflake } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  region: string;
  weather: string;
  image: string;
}

const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'dest-all',
    name: "I'm flexible",
    region: 'Search everywhere',
    weather: 'All climates',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    region: 'Coastal beaches & sunset villas',
    weather: '29°C Sunny',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-manali',
    name: 'Manali',
    region: 'Snowy peaks & alpine cabins',
    weather: '16°C Crisp',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur',
    region: 'Royal palaces & heritage havelis',
    weather: '31°C Clear',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-zermatt',
    name: 'Zermatt',
    region: 'Swiss Matterhorn ski chalets',
    weather: '8°C Alpine Snow',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-bali',
    name: 'Bali',
    region: 'Jungle treehouses & clifftop villas',
    weather: '28°C Tropical',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-tokyo',
    name: 'Tokyo',
    region: 'High-rise skyline penthouses',
    weather: '22°C Mild',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dest-paris',
    name: 'Paris',
    region: 'Eiffel views & Haussmannian flats',
    weather: '21°C Pleasant',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
  },
];

interface DestinationPopoverProps {
  onSelect: (destination: string) => void;
  searchTerm?: string;
}

export function DestinationPopover({ onSelect, searchTerm = '' }: DestinationPopoverProps) {
  const filtered = searchTerm.trim()
    ? POPULAR_DESTINATIONS.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : POPULAR_DESTINATIONS;

  return (
    <div className="p-4 sm:p-6 max-w-2xl bg-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          <Sparkles className="h-3.5 w-3.5 text-[#FF385C]" />
          <span>Top Curated Destinations</span>
        </div>
        <span className="text-[11px] text-gray-400">Live climate info</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filtered.map((dest) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => onSelect(dest.name === "I'm flexible" ? '' : dest.name)}
            className="group flex flex-col text-left transition-transform active:scale-95 focus:outline-hidden"
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 group-hover:border-black transition-colors mb-2">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 50vw, 150px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {dest.name !== "I'm flexible" && (
                <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs rounded-md px-1.5 py-0.5 text-[9px] text-white font-medium">
                  {dest.weather}
                </div>
              )}
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#222222] group-hover:text-[#FF385C] transition-colors line-clamp-1">
              {dest.name}
            </span>
            <span className="text-[11px] text-gray-500 line-clamp-1">
              {dest.region}
            </span>
          </button>
        ))}
      </div>

      {/* Trending Quick Search Chips */}
      <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
          Trending Searches
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['Goa Beachfront Villas', 'Manali Snow Cabins', 'Zermatt Ski Chalets', 'Udaipur Lake Palaces', 'Paris Eiffel Views'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onSelect(chip.split(' ')[0])}
              className="py-1 px-2.5 rounded-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
