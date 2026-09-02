'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CuratedCollections() {
  const collections = [
    {
      title: 'Top 1% Exceptional Homes',
      subtitle: 'The highest guest-rated villas & retreats globally',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      href: '/search?category=luxe',
      tag: 'Curated Luxe',
    },
    {
      title: 'Himalayan & Alpine Chalets',
      subtitle: 'Cedar saunas, wood fires, and snow peaks',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      href: '/search?category=skiing',
      tag: 'Winter Escapes',
    },
    {
      title: 'Clifftop Infinity Pools',
      subtitle: 'Unobstructed 180° horizon views over crystal oceans',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      href: '/search?category=pools',
      tag: 'Sunset Views',
    },
    {
      title: 'Royal Heritage Palaces',
      subtitle: 'Historic 19th-century havelis and regal courtyards',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      href: '/search?category=mansions',
      tag: 'Royal Stays',
    },
  ];

  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#FF385C]" />
        <h2 className="text-xl sm:text-2xl font-black text-[#222222] tracking-tight">
          Curated Collections
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collections.map((col, idx) => (
          <Link
            key={idx}
            href={col.href}
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={col.image}
              alt={col.title}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute top-3 left-3 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {col.tag}
            </div>

            <div className="absolute bottom-4 inset-x-4 space-y-1 text-white">
              <h3 className="font-extrabold text-base leading-snug group-hover:text-rose-200 transition-colors flex items-center justify-between">
                <span>{col.title}</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-xs text-gray-300 line-clamp-1">{col.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
