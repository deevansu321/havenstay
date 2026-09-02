'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { MapPin, Compass, Sparkles, Navigation } from 'lucide-react';

interface DestinationItem {
  name: string;
  type: string;
  stateOrCountry: string;
  startingPrice: number;
}

const CATEGORIES: Record<string, DestinationItem[]> = {
  popular: [
    { name: 'Goa', type: 'Beachfront villas & private pools', stateOrCountry: 'India', startingPrice: 12000 },
    { name: 'Manali', type: 'Snow chalets & cedar cabins', stateOrCountry: 'Himachal Pradesh', startingPrice: 8500 },
    { name: 'Jaipur', type: 'Royal havelis & courtyards', stateOrCountry: 'Rajasthan', startingPrice: 9000 },
    { name: 'Udaipur', type: 'Lakefront palace suites', stateOrCountry: 'Rajasthan', startingPrice: 18000 },
    { name: 'Mumbai', type: 'Sea-facing luxury penthouses', stateOrCountry: 'Maharashtra', startingPrice: 14000 },
    { name: 'Lonavala', type: 'Monsoon pool villas', stateOrCountry: 'Maharashtra', startingPrice: 11000 },
    { name: 'Alibaug', type: 'Coastal family estates', stateOrCountry: 'Maharashtra', startingPrice: 15000 },
    { name: 'Bengaluru', type: 'Urban garden lofts', stateOrCountry: 'Karnataka', startingPrice: 6500 },
    { name: 'Coorg', type: 'Coffee plantation estates', stateOrCountry: 'Karnataka', startingPrice: 9500 },
    { name: 'Ooty', type: 'Colonial tea estate bungalows', stateOrCountry: 'Tamil Nadu', startingPrice: 7500 },
    { name: 'Pondicherry', type: 'French quarter heritage villas', stateOrCountry: 'Tamil Nadu', startingPrice: 8000 },
    { name: 'Rishikesh', type: 'Ganges riverfront retreats', stateOrCountry: 'Uttarakhand', startingPrice: 7000 },
    { name: 'Shimla', type: 'Himalayan mountain view stays', stateOrCountry: 'Himachal Pradesh', startingPrice: 6000 },
    { name: 'Munnar', type: 'Mist valley treehouses', stateOrCountry: 'Kerala', startingPrice: 8500 },
  ],
  arts_culture: [
    { name: 'Jaipur', type: 'Hand-painted fresco courtyards', stateOrCountry: 'Rajasthan', startingPrice: 9000 },
    { name: 'Varanasi', type: 'Ancient ghat riverfront suites', stateOrCountry: 'Uttar Pradesh', startingPrice: 5500 },
    { name: 'Kyoto', type: '120-year-old wooden Machiya', stateOrCountry: 'Japan', startingPrice: 28000 },
    { name: 'Paris', type: 'Historic clock room & lofts', stateOrCountry: 'France', startingPrice: 35000 },
    { name: 'Rome', type: 'Renaissance palazzo apartments', stateOrCountry: 'Italy', startingPrice: 22000 },
    { name: 'Udaipur', type: 'Mewar royal heritage stays', stateOrCountry: 'Rajasthan', startingPrice: 18000 },
  ],
  outdoors: [
    { name: 'Manali', type: 'Pine forest hiking chalets', stateOrCountry: 'Himachal Pradesh', startingPrice: 8500 },
    { name: 'Rishikesh', type: 'White water rafting & yoga stays', stateOrCountry: 'Uttarakhand', startingPrice: 7000 },
    { name: 'Zermatt', type: 'Glacier ski-in/ski-out timber chalets', stateOrCountry: 'Switzerland', startingPrice: 65000 },
    { name: 'Tromsø', type: 'Aurora glass igloos', stateOrCountry: 'Norway', startingPrice: 42000 },
    { name: 'Leh Ladakh', type: 'High-altitude eco domes', stateOrCountry: 'India', startingPrice: 9500 },
    { name: 'Kasol', type: 'Parvati valley riverfront camps', stateOrCountry: 'Himachal Pradesh', startingPrice: 4500 },
  ],
  mountains: [
    { name: 'Manali', type: 'Alpine cedar wood chalets', stateOrCountry: 'Himachal Pradesh', startingPrice: 8500 },
    { name: 'Shimla', type: 'Colonial ridge estates', stateOrCountry: 'Himachal Pradesh', startingPrice: 6000 },
    { name: 'Ooty', type: 'Nilgiri tea garden bungalows', stateOrCountry: 'Tamil Nadu', startingPrice: 7500 },
    { name: 'Mussoorie', type: 'Queen of the Hills cottages', stateOrCountry: 'Uttarakhand', startingPrice: 8000 },
    { name: 'Munnar', type: 'Cloud forest treehouses', stateOrCountry: 'Kerala', startingPrice: 8500 },
    { name: 'Zermatt', type: 'Matterhorn peak view lodges', stateOrCountry: 'Switzerland', startingPrice: 65000 },
  ],
  beach: [
    { name: 'Goa', type: 'Cliffside sunset infinity pools', stateOrCountry: 'India', startingPrice: 12000 },
    { name: 'Gokarna', type: 'Om beach palm shacks', stateOrCountry: 'Karnataka', startingPrice: 5000 },
    { name: 'Alibaug', type: 'Secluded beachfront mansions', stateOrCountry: 'Maharashtra', startingPrice: 15000 },
    { name: 'Pondicherry', type: 'Promenade beach townhouses', stateOrCountry: 'Tamil Nadu', startingPrice: 8000 },
    { name: 'Varkala', type: 'Clifftop sea breeze cabanas', stateOrCountry: 'Kerala', startingPrice: 6000 },
    { name: 'Bora Bora', type: 'Overwater glass floor villas', stateOrCountry: 'French Polynesia', startingPrice: 85000 },
  ],
  unique: [
    { name: 'Musée d’Orsay', type: 'Parisian Clock Room suite', stateOrCountry: 'Paris, France', startingPrice: 0 },
    { name: 'Carl’s Floating House', type: 'Up Balloon House experience', stateOrCountry: 'New Mexico', startingPrice: 0 },
    { name: 'Aurora Igloo', type: 'Heated glass ceiling sanctuary', stateOrCountry: 'Norway', startingPrice: 46000 },
    { name: 'Ferrari Museum', type: 'Sleep in the trophy rotunda', stateOrCountry: 'Maranello, Italy', startingPrice: 0 },
  ],
};

export function InspirationGetaways() {
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState<string>('popular');

  const tabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'arts_culture', label: 'Arts & culture' },
    { id: 'outdoors', label: 'Outdoors' },
    { id: 'mountains', label: 'Mountains' },
    { id: 'beach', label: 'Beach' },
    { id: 'unique', label: 'Unique stays' },
  ];

  const currentDestinations = CATEGORIES[activeTab] || CATEGORIES.popular;

  return (
    <section className="border-t border-gray-200 pt-12 pb-8 space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black text-[#222222]">
          Inspiration for future getaways
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Explore curated stays and popular destinations across India and worldwide
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative cursor-pointer ${
              activeTab === tab.id
                ? 'text-[#222222]'
                : 'text-gray-500 hover:text-[#222222]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#222222]" />
            )}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-5 gap-x-4">
        {currentDestinations.map((dest, idx) => (
          <Link
            key={idx}
            href={`/search?location=${encodeURIComponent(dest.name)}`}
            className="group block space-y-0.5"
          >
            <h4 className="text-xs sm:text-sm font-bold text-[#222222] group-hover:underline truncate">
              {dest.name}
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-1">
              {dest.type}
            </p>
            {dest.startingPrice > 0 && (
              <p className="text-[10px] text-gray-600 font-semibold">
                From <span className="font-bold text-[#222222]">{format(dest.startingPrice)}</span>/night
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
