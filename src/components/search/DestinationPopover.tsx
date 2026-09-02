'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Sparkles, TrendingUp, Sun, Snowflake, Navigation, Compass, Loader2, Check } from 'lucide-react';
import { calculateDistanceKm, formatDistanceString } from '@/lib/geoUtils';
import { PROPERTIES } from '@/data/properties';

interface Destination {
  id: string;
  name: string;
  region: string;
  weather: string;
  image: string;
  lat: number;
  lng: number;
}

const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'dest-all',
    name: "I'm flexible",
    region: 'Search all destinations worldwide',
    weather: 'All climates',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
    lat: 0,
    lng: 0,
  },
  {
    id: 'dest-chandigarh',
    name: 'Chandigarh',
    region: 'Sukhna Lake luxury villas & private pools',
    weather: '26°C Pleasant',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80',
    lat: 30.7333,
    lng: 76.7794,
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    region: 'Coastal beaches & sunset villas',
    weather: '29°C Sunny',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    lat: 15.5527,
    lng: 73.7548,
  },
  {
    id: 'dest-manali',
    name: 'Manali',
    region: 'Snowy peaks & alpine cabins',
    weather: '16°C Crisp',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    lat: 32.2432,
    lng: 77.1892,
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur',
    region: 'Royal palaces & heritage havelis',
    weather: '31°C Clear',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    id: 'dest-udaipur',
    name: 'Udaipur',
    region: 'Lake Pichola & Mewar royal palaces',
    weather: '30°C Sunny',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
    lat: 24.5854,
    lng: 73.7125,
  },
  {
    id: 'dest-zermatt',
    name: 'Zermatt',
    region: 'Swiss Matterhorn ski chalets',
    weather: '8°C Alpine Snow',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&q=80',
    lat: 45.9765,
    lng: 7.7491,
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    region: '120-year-old Machiya & Zen bamboo',
    weather: '19°C Serene',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    lat: 35.0116,
    lng: 135.7681,
  },
  {
    id: 'dest-paris',
    name: 'Paris',
    region: 'Eiffel views & Haussmannian flats',
    weather: '21°C Pleasant',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 'dest-tromso',
    name: 'Tromsø',
    region: 'Aurora glass igloos & arctic fjords',
    weather: '-2°C Northern Lights',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
    lat: 69.6492,
    lng: 18.9553,
  },
];

interface DestinationPopoverProps {
  onSelect: (destination: string) => void;
  searchTerm?: string;
}

export function DestinationPopover({ onSelect, searchTerm = '' }: DestinationPopoverProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [userLocationNote, setUserLocationNote] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      onSelect('Chandigarh');
      return;
    }

    setIsLocating(true);
    setUserLocationNote('Detecting your GPS location...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        try {
          // Reverse geocode user location with OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLon}&zoom=12`,
            { headers: { 'Accept-Language': 'en' } }
          );

          if (res.ok) {
            const data = await res.json();
            const rawCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.municipality ||
              data.address?.state_district ||
              data.address?.county ||
              data.address?.state ||
              '';

            if (rawCity) {
              setIsLocating(false);
              setUserLocationNote(`Detected: ${rawCity}`);
              onSelect(rawCity);
              return;
            }
          }
        } catch (e) {
          // Fallback to nearest dataset property calculation
        }

        // Compute closest city from properties list if geocoding times out
        let closestCity = 'Chandigarh';
        let minDistance = Infinity;

        for (const p of PROPERTIES) {
          const dist = calculateDistanceKm(
            userLat,
            userLon,
            p.location.coordinates.lat,
            p.location.coordinates.lng
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = p.location.city;
          }
        }

        setIsLocating(false);
        setUserLocationNote(`Closest destination: ${closestCity} (${minDistance} km away)`);
        onSelect(closestCity);
      },
      (err) => {
        setIsLocating(false);
        // Fallback default
        onSelect('Chandigarh');
      },
      { timeout: 6000, enableHighAccuracy: true }
    );
  };

  const filtered = searchTerm.trim()
    ? POPULAR_DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : POPULAR_DESTINATIONS;

  return (
    <div className="p-4 sm:p-6 max-w-2xl bg-white select-none space-y-4">
      {/* 1-Click Nearby GPS Location Button */}
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-linear-to-r from-rose-50 via-purple-50 to-indigo-50 border border-rose-100 hover:border-black transition-all group text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF385C] text-white shadow-xs group-hover:scale-105 transition-transform">
            {isLocating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#222222]">
              {isLocating ? 'Detecting your GPS city...' : 'Nearby Stays (Use Current Location)'}
            </h4>
            <p className="text-[11px] text-gray-500">
              {userLocationNote || 'Find weekend getaways and private villas closest to you'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#FF385C] bg-white py-1.5 px-3.5 rounded-full border border-rose-200 shadow-2xs shrink-0">
          Find Near Me
        </span>
      </button>

      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          <Sparkles className="h-3.5 w-3.5 text-[#FF385C]" />
          <span>{searchTerm.trim() ? `Search results for "${searchTerm}"` : 'Top Curated Destinations'}</span>
        </div>
        <span className="text-[11px] text-gray-400">Live climate info</span>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
        {filtered.map((dest) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => onSelect(dest.name === "I'm flexible" ? '' : dest.name)}
            className="group flex flex-col text-left transition-transform active:scale-95 focus:outline-hidden cursor-pointer"
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
      <div className="pt-3 border-t border-gray-100 space-y-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
          Trending Searches in India
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Chandigarh', full: 'Chandigarh' },
            { label: 'Goa', full: 'Goa' },
            { label: 'Manali', full: 'Manali' },
            { label: 'Jaipur', full: 'Jaipur' },
            { label: 'Udaipur', full: 'Udaipur' },
            { label: 'Kasauli', full: 'Kasauli' },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onSelect(chip.full)}
              className="py-1 px-3 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
