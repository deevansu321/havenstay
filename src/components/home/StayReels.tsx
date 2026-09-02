'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, Star, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useCurrency } from '@/context/CurrencyContext';

interface Story {
  id: string;
  hostName: string;
  hostAvatar: string;
  location: string;
  title: string;
  propertyId: string;
  price: number;
  rating: number;
  coverImage: string;
  media: {
    url: string;
    caption: string;
    tag: string;
  }[];
}

const STORIES: Story[] = [
  {
    id: 'story-1',
    hostName: 'Rohan & Ananya',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Goa, India',
    title: 'The Glass Pavilion & Sunset Infinity Pool',
    propertyId: 'prop-1',
    price: 32500,
    rating: 4.98,
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        caption: 'Golden hour dipping into our private cliffside infinity pool 🌅',
        tag: 'Sunset Infinity Pool',
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fresh seafood dinner prepared by our private chef on the terrace 🦞',
        tag: 'Private Chef Dining',
      },
    ],
  },
  {
    id: 'story-2',
    hostName: 'Jean-Pierre',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: 'Zermatt, Switzerland',
    title: 'Matterhorn Alpine Chalet & Hot Tub',
    propertyId: 'prop-13',
    price: 88000,
    rating: 5.0,
    coverImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Waking up directly facing the Matterhorn pyramid in fresh snow 🏔️',
        tag: 'Matterhorn Views',
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Evening hot tub soak under the crisp alpine stars ✨',
        tag: 'Outdoor Cedar Tub',
      },
    ],
  },
  {
    id: 'story-3',
    hostName: 'Astrid & Lars',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    location: 'Tromsø, Norway',
    title: 'Aurora Glass Igloo Sanctuary',
    propertyId: 'prop-16',
    price: 46000,
    rating: 4.99,
    coverImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Aurora Borealis dancing directly above our heated glass ceiling right now 🌌',
        tag: 'Northern Lights Live',
      },
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
        caption: 'Morning Nordic breakfast basket with freshly baked cinnamon rolls ☕',
        tag: 'Arctic Breakfast',
      },
    ],
  },
  {
    id: 'story-4',
    hostName: 'Princess Gayatri',
    hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    location: 'Jaipur, Rajasthan',
    title: 'Heritage Haveli & Palace Courtyard',
    propertyId: 'prop-3',
    price: 24000,
    rating: 4.94,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunset sitar recital in the 200-year-old carved marble courtyard 🦚',
        tag: 'Royal Courtyard',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
        caption: 'Candlelight dinner under hand-painted fresco ceilings 🕯️',
        tag: 'Fresco Dining',
      },
    ],
  },
  {
    id: 'story-5',
    hostName: 'Takeshi & Yoko',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: 'Kyoto, Japan',
    title: '120-Year-Old Machiya & Zen Garden',
    propertyId: 'prop-17',
    price: 38000,
    rating: 4.98,
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        caption: 'Morning matcha tea ceremony overlooking our private zen moss garden 🍵',
        tag: 'Zen Bamboo Garden',
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fragrant Hinoki cypress wood soaking tub after a walk in Gion 🎋',
        tag: 'Hinoki Bath',
      },
    ],
  },
  {
    id: 'story-6',
    hostName: 'Moana & Teva',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Bora Bora, French Polynesia',
    title: 'Overwater Glass Villa Lagoon',
    propertyId: 'prop-14',
    price: 95000,
    rating: 4.99,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Watching tropical fish through the glass floor panel in our living room 🐠',
        tag: 'Lagoon Floor Glass',
      },
      {
        url: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Direct plunge ladder from the catamaran deck into warm turquoise waters 🏝️',
        tag: 'Ocean Hammock',
      },
    ],
  },
];

export function StayReels() {
  const { format } = useCurrency();
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  // Auto advance story media
  useEffect(() => {
    if (activeStoryIndex === null) return;
    const activeStory = STORIES[activeStoryIndex];

    const timer = setTimeout(() => {
      if (mediaIndex < activeStory.media.length - 1) {
        setMediaIndex((prev) => prev + 1);
      } else if (activeStoryIndex < STORIES.length - 1) {
        setActiveStoryIndex((prev) => (prev !== null ? prev + 1 : 0));
        setMediaIndex(0);
      } else {
        setActiveStoryIndex(null);
        setMediaIndex(0);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, mediaIndex]);

  const openStory = (idx: number) => {
    setActiveStoryIndex(idx);
    setMediaIndex(0);
  };

  const currentStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;
  const currentMedia = currentStory ? currentStory.media[mediaIndex] : null;

  return (
    <div className="py-2">
      {/* Horizontal Reels Circular Bar */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
        {STORIES.map((story, idx) => (
          <button
            key={story.id}
            type="button"
            onClick={() => openStory(idx)}
            className="group flex flex-col items-center gap-1.5 shrink-0 focus:outline-hidden cursor-pointer"
          >
            {/* Story Gradient Ring */}
            <div className="relative p-0.5 rounded-full bg-linear-to-tr from-[#FF385C] via-purple-500 to-amber-400 group-hover:scale-108 transition-transform duration-300 shadow-sm">
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-white bg-gray-100">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#222222] truncate max-w-[72px] sm:max-w-[80px] text-center">
              {story.location.split(',')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Interactive Story Viewer */}
      {currentStory && currentMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden animate-fade-in"
          onClick={() => setActiveStoryIndex(null)}
        >
          {/* Main Story Container - Always fully contained in viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[720px] rounded-3xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between select-none"
          >
            {/* Background Media Image */}
            <Image
              src={currentMedia.url}
              alt={currentMedia.caption}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 450px"
              className="object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/70 pointer-events-none" />

            {/* Top Navigation & Progress Bars */}
            <div className="relative z-20 p-3 sm:p-4 space-y-2.5 sm:space-y-3 shrink-0">
              {/* Progress Line Segments */}
              <div className="flex gap-1.5">
                {currentStory.media.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
                    <div
                      className={`h-full bg-white transition-all duration-300 ${
                        i < mediaIndex
                          ? 'w-full'
                          : i === mediaIndex
                          ? 'w-full animate-progress'
                          : 'w-0'
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Host Info & Close Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-white/60 shrink-0">
                    <Image
                      src={currentStory.hostAvatar}
                      alt={currentStory.hostName}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-white leading-tight">
                      {currentStory.hostName}
                    </h4>
                    <p className="text-[10px] text-white/80">{currentStory.location}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStoryIndex(null)}
                  className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                  aria-label="Close story"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Tap Zones for Next/Prev */}
            <div className="absolute inset-y-20 inset-x-0 z-10 flex">
              <div
                onClick={() => {
                  if (mediaIndex > 0) setMediaIndex((m) => m - 1);
                  else if (activeStoryIndex !== null && activeStoryIndex > 0) {
                    setActiveStoryIndex(activeStoryIndex - 1);
                    setMediaIndex(0);
                  }
                }}
                className="w-1/2 h-full cursor-pointer"
              />
              <div
                onClick={() => {
                  if (mediaIndex < currentStory.media.length - 1) setMediaIndex((m) => m + 1);
                  else if (activeStoryIndex !== null && activeStoryIndex < STORIES.length - 1) {
                    setActiveStoryIndex(activeStoryIndex + 1);
                    setMediaIndex(0);
                  } else {
                    setActiveStoryIndex(null);
                  }
                }}
                className="w-1/2 h-full cursor-pointer"
              />
            </div>

            {/* Bottom Story Caption & Listing Card CTA */}
            <div className="relative z-20 p-3 sm:p-4 space-y-2.5 shrink-0">
              {/* Caption */}
              <div className="bg-black/60 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 space-y-1">
                <span className="inline-block rounded-full bg-[#FF385C] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                  {currentMedia.tag}
                </span>
                <p className="text-[11px] sm:text-xs font-semibold text-white leading-snug">
                  {currentMedia.caption}
                </p>
              </div>

              {/* Direct Booking CTA Card */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-white text-[#222222] shadow-xl">
                <div className="min-w-0 pr-2">
                  <h5 className="font-extrabold text-xs truncate">{currentStory.title}</h5>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-600">
                    <Star className="h-3 w-3 fill-black text-black" />
                    <span className="font-bold text-black">{currentStory.rating.toFixed(2)}</span>
                    <span>·</span>
                    <span className="font-bold text-black">{format(currentStory.price)}</span>
                    <span className="text-gray-400">/ night</span>
                  </div>
                </div>

                <Link href={`/rooms/${currentStory.propertyId}`} onClick={() => setActiveStoryIndex(null)}>
                  <Button variant="primary" size="sm" className="rounded-xl px-3 text-xs font-bold shrink-0">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
