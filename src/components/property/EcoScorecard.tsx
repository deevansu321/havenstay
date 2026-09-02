'use client';

import React, { useState } from 'react';
import { Leaf, Sun, Droplets, Utensils, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export function EcoScorecard() {
  const { format } = useCurrency();
  const [treePledged, setTreePledged] = useState(false);

  const ecoPoints = [
    {
      icon: <Sun className="h-4 w-4 text-amber-500" />,
      title: '100% Solar Powered',
      desc: 'On-site rooftop solar microgrid with battery backup power',
    },
    {
      icon: <Droplets className="h-4 w-4 text-sky-500" />,
      title: 'Rainwater Harvested',
      desc: 'Filtered freshwater recharge wells and greywater garden recycling',
    },
    {
      icon: <Utensils className="h-4 w-4 text-emerald-500" />,
      title: 'Farm-to-Table Dining',
      desc: 'Organic spices and produce sourced from local community farmers',
    },
    {
      icon: <Leaf className="h-4 w-4 text-emerald-600" />,
      title: 'Zero Single-Use Plastic',
      desc: 'Refillable glass bottled spring water & biodegradable amenities',
    },
  ];

  return (
    <div className="rounded-3xl border border-emerald-200 bg-linear-to-br from-emerald-50/50 via-white to-teal-50/30 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-sm text-[#222222]">EcoStay™ Certified Green Home</h4>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                Top 5% Eco
              </span>
            </div>
            <p className="text-[11px] text-gray-500">Zero-carbon footprint & sustainable architecture</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-emerald-700 block">Score: 98/100</span>
          <span className="text-[10px] text-gray-400">Audited 2026</span>
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {ecoPoints.map((point, idx) => (
          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
            <div className="mt-0.5 shrink-0">{point.icon}</div>
            <div>
              <h5 className="font-bold text-xs text-[#222222]">{point.title}</h5>
              <p className="text-[11px] text-gray-500 leading-tight">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tree Planting Offset Pledge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-900 text-white shadow-xs">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="text-xl">🌱</span>
          <div>
            <span className="font-bold text-xs block">Plant a Native Mangrove Tree</span>
            <span className="text-[10px] text-emerald-200 block">Offsets ~45 kg CO₂ for your travel stay</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTreePledged(!treePledged)}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            treePledged
              ? 'bg-emerald-400 text-emerald-950 font-black shadow-md'
              : 'bg-white text-emerald-950 hover:bg-emerald-100'
          }`}
        >
          {treePledged ? '✓ Tree Added (₹120)' : '+ Add Tree Pledge (₹120)'}
        </button>
      </div>
    </div>
  );
}
