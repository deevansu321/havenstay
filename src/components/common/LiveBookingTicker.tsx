'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Sparkles, TrendingUp, CheckCircle2, Heart } from 'lucide-react';

interface NotificationEvent {
  id: string;
  avatar: string;
  message: string;
  stayTitle: string;
  location: string;
  timeAgo: string;
  propertyId: string;
  stayImage: string;
  type: 'booked' | 'saved' | 'trending';
}

const EVENTS: NotificationEvent[] = [
  {
    id: 'evt-1',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    message: 'Aarav from Mumbai booked',
    stayTitle: 'The Glass Pavilion & Infinity Pool',
    location: 'Goa',
    timeAgo: '2 minutes ago',
    propertyId: 'prop-1',
    stayImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80',
    type: 'booked',
  },
  {
    id: 'evt-2',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    message: 'Ananya from Bengaluru saved',
    stayTitle: 'Nordic Cedar A-Frame Chalet',
    location: 'Manali',
    timeAgo: '4 minutes ago',
    propertyId: 'prop-2',
    stayImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=200&q=80',
    type: 'saved',
  },
  {
    id: 'evt-3',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    message: 'Kabir from Delhi booked',
    stayTitle: 'Matterhorn Ski Chalet with Hot Tub',
    location: 'Zermatt',
    timeAgo: '6 minutes ago',
    propertyId: 'prop-13',
    stayImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=200&q=80',
    type: 'booked',
  },
  {
    id: 'evt-4',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    message: 'Diya from London saved',
    stayTitle: 'Overwater Glass Villa in Bora Bora',
    location: 'French Polynesia',
    timeAgo: '9 minutes ago',
    propertyId: 'prop-14',
    stayImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
    type: 'saved',
  },
];

export function LiveBookingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 3.5s
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    // Cycle through events every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
        setIsVisible(true);
      }, 800);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const event = EVENTS[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 hidden sm:block max-w-xs animate-slide-up">
      <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-airbnb-modal text-left select-none group">
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
          aria-label="Dismiss notification"
        >
          <X className="h-3 w-3" />
        </button>

        <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-gray-100">
          <Image
            src={event.stayImage}
            alt={event.stayTitle}
            fill
            sizes="48px"
            className="object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-[#FF385C]" />
        </div>

        <Link
          href={`/rooms/${event.propertyId}`}
          className="min-w-0 flex-1 space-y-0.5 focus:outline-hidden"
        >
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-gray-700 truncate">{event.message}</span>
          </div>

          <h5 className="font-extrabold text-xs text-[#222222] truncate hover:text-[#FF385C] transition-colors">
            {event.stayTitle}
          </h5>

          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>{event.location}</span>
            <span>{event.timeAgo}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
