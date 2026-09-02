'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, Globe, Sparkles, MapPin, CheckCircle2, ShieldCheck, Crown, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface Stamp {
  id: string;
  name: string;
  location: string;
  icon: string;
  category: string;
  date: string;
  status: 'unlocked' | 'locked';
  description: string;
}

export function TravelPassport() {
  const stamps: Stamp[] = [
    {
      id: 'stamp-1',
      name: 'Oceanfront Wanderer',
      location: 'Goa Coastline',
      icon: '🌊',
      category: 'Beachfront',
      date: 'Visited Oct 2025',
      status: 'unlocked',
      description: 'Stayed in a cliffside glass pavilion overlooking the Arabian Sea.',
    },
    {
      id: 'stamp-2',
      name: 'Himalayan Ridge Trekker',
      location: 'Solang Valley, Manali',
      icon: '🏔️',
      category: 'Alpine',
      date: 'Visited Jan 2026',
      status: 'unlocked',
      description: 'Handcrafted Scandinavian cedar A-frame stay at 7,200ft altitude.',
    },
    {
      id: 'stamp-3',
      name: 'Royal Haveli Connoisseur',
      location: 'Old City, Jaipur',
      icon: '🏰',
      category: 'Heritage',
      date: 'Visited Mar 2026',
      status: 'unlocked',
      description: '19th-century royal palace with private sandstone courtyards.',
    },
    {
      id: 'stamp-4',
      name: 'Arctic Aurora Chaser',
      location: 'Tromsø, Norway',
      icon: '🌌',
      category: 'OMG Stays',
      date: 'Unlock by booking',
      status: 'locked',
      description: 'Sleep under dancing Northern Lights inside a heated glass igloo.',
    },
    {
      id: 'stamp-5',
      name: 'Matterhorn Alpine Skier',
      location: 'Zermatt, Switzerland',
      icon: '⛷️',
      category: 'Ski Chalet',
      date: 'Unlock by booking',
      status: 'locked',
      description: 'Direct ski-in / ski-out luxury timber lodge facing the Matterhorn.',
    },
    {
      id: 'stamp-6',
      name: 'Kyoto Zen Master',
      location: 'Gion, Kyoto, Japan',
      icon: '🎋',
      category: 'Heritage Machiya',
      date: 'Unlock by booking',
      status: 'locked',
      description: '120-year-old preserved townhouse with private Hinoki soaking tub.',
    },
  ];

  const unlockedCount = stamps.filter((s) => s.status === 'unlocked').length;

  return (
    <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-indigo-950 via-slate-900 to-black text-white p-6 sm:p-8 shadow-xl space-y-6">
      {/* Passport Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-400" />
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              HavenStay Guest Passport™
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Collect verified travel stamps, unlock loyalty perks, and track your global milestones.
          </p>
        </div>

        {/* Loyalty Tier Badge */}
        <div className="flex items-center gap-2 rounded-2xl bg-amber-400/20 border border-amber-400/40 px-4 py-2 text-amber-300 shrink-0">
          <Crown className="h-5 w-5 fill-amber-400 text-amber-400" />
          <div>
            <span className="font-extrabold text-xs block">Gold Explorer Tier</span>
            <span className="text-[10px] text-amber-200">{unlockedCount} of {stamps.length} Stamps Collected</span>
          </div>
        </div>
      </div>

      {/* Grid of Passport Stamps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className={`p-4 rounded-2xl border transition-all ${
              stamp.status === 'unlocked'
                ? 'bg-white/10 border-amber-400/50 shadow-md'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{stamp.icon}</span>
              {stamp.status === 'unlocked' ? (
                <span className="rounded-full bg-emerald-400/20 border border-emerald-400/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  ✓ Verified Stamp
                </span>
              ) : (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                  Locked
                </span>
              )}
            </div>

            <h4 className="font-bold text-sm text-white">{stamp.name}</h4>
            <p className="text-[11px] text-amber-300 font-semibold">{stamp.location}</p>
            <p className="text-[11px] text-gray-300 mt-1 leading-tight line-clamp-2">{stamp.description}</p>
            <span className="text-[10px] text-gray-400 block mt-2 font-mono">{stamp.date}</span>
          </div>
        ))}
      </div>

      {/* Passport Footer Perks */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Next Reward: Free Late 2:00 PM Checkout at 4 stamps</span>
        </div>

        <Link href="/search">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            Explore next destination
          </Button>
        </Link>
      </div>
    </div>
  );
}
