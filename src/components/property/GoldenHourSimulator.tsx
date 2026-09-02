'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Sunset, Moon, Sparkles, Clock, Compass } from 'lucide-react';

interface GoldenHourSimulatorProps {
  image: string;
  title: string;
}

export function GoldenHourSimulator({ image, title }: GoldenHourSimulatorProps) {
  const [hour, setHour] = useState(18.5); // Default to 6:30 PM Sunset

  const getTimeProfile = (h: number) => {
    if (h < 9) {
      return {
        label: 'Dawn & Sunrise (06:30 AM)',
        colorOverlay: 'bg-linear-to-t from-pink-500/20 via-indigo-500/15 to-amber-300/20 mix-blend-screen',
        brightness: 'brightness-95 contrast-105',
        icon: <Sun className="h-4 w-4 text-pink-400" />,
        desc: 'Soft morning dawn light and cool gentle mist',
      };
    }
    if (h < 17) {
      return {
        label: 'Midday Sunlight (01:00 PM)',
        colorOverlay: 'bg-amber-100/10 mix-blend-overlay',
        brightness: 'brightness-105 contrast-100',
        icon: <Sun className="h-4 w-4 text-amber-500" />,
        desc: 'Crystal clear daylight and shimmering pool reflections',
      };
    }
    if (h < 20.5) {
      return {
        label: 'Golden Hour Sunset (06:30 PM)',
        colorOverlay: 'bg-linear-to-t from-amber-600/35 via-rose-500/25 to-purple-800/20 mix-blend-color-burn',
        brightness: 'brightness-95 contrast-120 saturate-150',
        icon: <Sunset className="h-4 w-4 text-amber-400 animate-pulse" />,
        desc: 'Dramatic golden horizon reflections & warm ambient terrace lighting',
      };
    }
    return {
      label: 'Starry Night (11:00 PM)',
      colorOverlay: 'bg-indigo-950/60 mix-blend-multiply',
      brightness: 'brightness-75 contrast-125 saturate-75',
      icon: <Moon className="h-4 w-4 text-sky-300" />,
      desc: 'Underwater pool lights active, fire pit glowing, zero light pollution stargazing',
    };
  };

  const profile = getTimeProfile(hour);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 font-bold">
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#222222]">Sunlight & Golden Hour Simulator</h4>
            <p className="text-[11px] text-gray-500">Scrub time to preview daylight and sunset lighting</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 py-1 px-3 rounded-full">
          {profile.icon}
          <span>{profile.label.split(' ')[0]}</span>
        </div>
      </div>

      {/* Simulated Time-of-Day Viewport */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-inner select-none">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className={`object-cover transition-all duration-500 ${profile.brightness}`}
        />
        {/* Color Grading Overlay */}
        <div className={`absolute inset-0 transition-colors duration-500 ${profile.colorOverlay}`} />

        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md rounded-xl px-3 py-1 text-xs text-white font-bold flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>{profile.label}</span>
        </div>

        <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-xs rounded-xl p-2 text-[11px] text-white/90 text-center font-medium">
          {profile.desc}
        </div>
      </div>

      {/* Time Slider */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-xs font-semibold text-gray-600">
          <span>06:00 Dawn</span>
          <span>12:00 Midday</span>
          <span className="font-bold text-amber-600">18:30 Sunset</span>
          <span>24:00 Night</span>
        </div>
        <input
          type="range"
          min="6"
          max="24"
          step="0.5"
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
