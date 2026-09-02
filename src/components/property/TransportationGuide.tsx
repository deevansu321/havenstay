'use client';

import React from 'react';
import { Plane, Train, Car, Zap, Footprints, ShieldCheck } from 'lucide-react';

interface TransportationGuideProps {
  city: string;
}

export function TransportationGuide({ city }: TransportationGuideProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 font-bold">
          <Car className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-[#222222]">Getting Around & Transportation</h4>
          <p className="text-[11px] text-gray-500">Key transit hubs and driving distances in {city}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
        <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
          <Plane className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#222222] block">International Airport</span>
            <span className="text-gray-500 text-[11px]">~35 min drive (28 km) · Pre-paid taxis available</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
          <Train className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#222222] block">Main Railway Junction</span>
            <span className="text-gray-500 text-[11px]">~20 min drive (14 km) · Direct expressway access</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
          <Car className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#222222] block">Free On-Premises Parking</span>
            <span className="text-gray-500 text-[11px]">Dedicated private driveway for up to 3 SUVs</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
          <Zap className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#222222] block">EV Charging Station</span>
            <span className="text-gray-500 text-[11px]">Type-2 22kW fast charger available for guests</span>
          </div>
        </div>
      </div>
    </div>
  );
}
