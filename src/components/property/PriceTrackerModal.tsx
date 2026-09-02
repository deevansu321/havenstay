'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { useCurrency } from '@/context/CurrencyContext';
import { Bell, TrendingDown, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface PriceTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  propertyTitle: string;
}

export function PriceTrackerModal({
  isOpen,
  onClose,
  currentPrice,
  propertyTitle,
}: PriceTrackerModalProps) {
  const { format } = useCurrency();
  const [targetPrice, setTargetPrice] = useState(Math.round(currentPrice * 0.85));
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsSubscribed(false);
      }}
      title="Price Drop Tracker"
      maxWidth="md"
    >
      {!isSubscribed ? (
        <form onSubmit={handleSubscribe} className="space-y-5">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#222222]">Track Seasonal Price Drops</h4>
              <p className="text-[11px] text-gray-600">Get notified instantly when this property drops below your target price.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Current nightly rate</span>
              <span className="font-bold text-sm text-[#222222]">{format(currentPrice)}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs font-bold text-[#222222]">
                <span>Target Alert Price</span>
                <span className="text-emerald-700 font-extrabold">{format(targetPrice)} (15% off)</span>
              </div>
              <input
                type="range"
                min={Math.round(currentPrice * 0.5)}
                max={currentPrice}
                step={500}
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-gray-300 p-3 text-xs focus:border-black focus:outline-hidden"
            />
          </div>

          <Button type="submit" variant="primary" size="md" fullWidth leftIcon={<Bell className="h-4 w-4" />}>
            Activate Price Alert
          </Button>
        </form>
      ) : (
        <div className="text-center py-6 space-y-4 animate-slide-up">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
            <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h3 className="text-lg font-bold text-[#222222]">Price Alert Activated!</h3>
          <p className="text-xs text-gray-600 max-w-xs mx-auto">
            We’ll monitor <span className="font-bold text-black">&quot;{propertyTitle}&quot;</span> and notify you at <span className="font-bold text-black">{email}</span> the moment the rate drops to {format(targetPrice)}.
          </p>
          <Button variant="black" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}
