'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Sparkles, Eye, Compass, Maximize2, Info } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

export function VirtualTourModal({
  isOpen,
  onClose,
  title,
  images,
}: VirtualTourModalProps) {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const rooms = [
    {
      name: 'Oceanfront Terrace & Pool',
      image: images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        { top: '65%', left: '48%', label: 'Heated Saltwater Infinity Pool (28°C)' },
        { top: '35%', left: '80%', label: 'Sunset Horizon Lounge & Fire Pit' },
      ]
    },
    {
      name: 'Open Living Pavilion',
      image: images[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        { top: '40%', left: '30%', label: 'Floor-to-Ceiling Thermal Acoustic Glass' },
        { top: '55%', left: '60%', label: 'Bespoke Italian Leather Sectional' },
      ]
    },
    {
      name: 'Master Suite Bedroom',
      image: images[2] || 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        { top: '50%', left: '45%', label: 'King Size Organic Cotton Mattress' },
        { top: '30%', left: '75%', label: 'Motorized Blackout Shades & Star Skylight' },
      ]
    },
  ];

  const currentRoom = rooms[activeRoomIndex % rooms.length];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="360° Virtual Walkthrough"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Room Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {rooms.map((room, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveRoomIndex(idx);
                setActiveHotspot(null);
              }}
              className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeRoomIndex === idx
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* 360 Viewport Container */}
        <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-black shadow-inner select-none group">
          <Image
            src={currentRoom.image}
            alt={currentRoom.name}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* 360 Badge Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white border border-white/20">
            <Compass className="h-4 w-4 animate-spin-slow text-[#FF385C]" />
            <span>Interactive View · {currentRoom.name}</span>
          </div>

          {/* Interactive Hotspots */}
          {currentRoom.hotspots.map((spot, i) => (
            <div
              key={i}
              className="absolute z-20"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot === spot.label ? null : spot.label)}
                className="group/spot relative flex h-7 w-7 items-center justify-center rounded-full bg-[#FF385C] text-white shadow-lg ring-4 ring-white/50 animate-pulse hover:scale-125 transition-transform"
                aria-label={spot.label}
              >
                <Info className="h-4 w-4 stroke-[2.5]" />
              </button>

              {activeHotspot === spot.label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-52 rounded-xl bg-black/90 backdrop-blur-md p-2.5 text-center text-xs font-semibold text-white shadow-xl animate-popover">
                  {spot.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black/90" />
                </div>
              )}
            </div>
          ))}

          <div className="absolute bottom-4 inset-x-4 flex justify-between items-center text-[11px] text-white/80 bg-black/40 backdrop-blur-xs py-1.5 px-3 rounded-xl">
            <span>Tap hot-spots to inspect luxury amenities & details</span>
            <span>HD Walkthrough</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
