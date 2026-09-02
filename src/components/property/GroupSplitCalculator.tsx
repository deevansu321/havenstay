'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { Users, Share2, Copy, Check, MessageCircle, DollarSign, Split } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface GroupSplitCalculatorProps {
  totalPrice: number;
  nights: number;
  propertyTitle: string;
}

export function GroupSplitCalculator({
  totalPrice,
  nights,
  propertyTitle,
}: GroupSplitCalculatorProps) {
  const { format } = useCurrency();
  const [friendsCount, setFriendsCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const pricePerPerson = Math.round(totalPrice / Math.max(1, friendsCount));
  const pricePerPersonPerNight = Math.round(pricePerPerson / Math.max(1, nights));

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Here is our trip split for "${propertyTitle}":\n\n` +
      `📅 Duration: ${nights} nights\n` +
      `👥 Total Travelers: ${friendsCount} people\n` +
      `💰 Total Cost: ${format(totalPrice)}\n` +
      `👉 Your Share: ${format(pricePerPerson)} (${format(pricePerPersonPerNight)}/night)\n\n` +
      `Let's book it on HavenStay!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    const text =
      `Trip split for "${propertyTitle}":\n` +
      `Total: ${format(totalPrice)} for ${nights} nights\n` +
      `Split among ${friendsCount} people = ${format(pricePerPerson)} per person.\n` +
      `Book on HavenStay: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 font-bold">
            <Split className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#222222]">Split Cost with Friends</h4>
            <p className="text-[11px] text-gray-500">Calculate per-person share & generate UPI payment links</p>
          </div>
        </div>

        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 py-1 px-2.5 rounded-full">
          Instant Split
        </span>
      </div>

      {/* Counter Slider */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-xs font-bold text-[#222222]">
          <span>Number of travelers</span>
          <span className="text-indigo-600 font-extrabold">{friendsCount} people</span>
        </div>
        <input
          type="range"
          min="2"
          max="16"
          value={friendsCount}
          onChange={(e) => setFriendsCount(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      {/* Breakdown Box */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Each Person Pays</span>
          <span className="text-lg sm:text-xl font-black text-[#222222]">{format(pricePerPerson)}</span>
          <span className="text-[10px] text-gray-500 block">Total for {nights} nights</span>
        </div>
        <div className="border-l border-gray-200">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Per Person / Night</span>
          <span className="text-lg sm:text-xl font-black text-indigo-600">{format(pricePerPersonPerNight)}</span>
          <span className="text-[10px] text-gray-500 block">/ night</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 text-xs font-bold shadow-xs transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Send WhatsApp Split</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="p-2.5 rounded-xl border border-gray-300 hover:border-black text-gray-700 transition-colors"
          title="Copy breakdown"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
