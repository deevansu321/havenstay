'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Globe, DollarSign, Bell, Shield, Check } from 'lucide-react';

export default function SettingsPage() {
  const { currency, setCurrency, showTaxes, setShowTaxes } = useCurrency();
  const { user } = useAuth();

  const currencies: { code: 'INR' | 'USD' | 'EUR' | 'GBP'; name: string; symbol: string }[] = [
    { code: 'INR', name: 'Indian Rupee (Default)', symbol: '₹' },
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight">Settings & Preferences</h1>
        <p className="text-sm text-gray-500 mt-1">Configure your currency, language, taxes, and notifications.</p>
      </div>

      <div className="space-y-6 divide-y divide-gray-200">
        {/* Currency Setting */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#FF385C]" />
            <h2 className="text-lg font-bold text-[#222222]">Preferred Currency</h2>
          </div>
          <p className="text-xs text-gray-500">Choose how prices and totals are formatted throughout the app.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currencies.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-black bg-gray-50 ring-1 ring-black'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm text-[#222222] block">{c.name}</span>
                    <span className="text-xs text-gray-500">{c.code} – {c.symbol}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 stroke-[3] text-black" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Taxes Toggle */}
        <div className="flex items-center justify-between pt-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#222222]">Display total price before/after taxes</h3>
            <p className="text-xs text-gray-500">Includes 18% GST in listing card previews and search cards.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowTaxes(!showTaxes)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              showTaxes ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${
                showTaxes ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Language Selection */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#FF385C]" />
            <h2 className="text-lg font-bold text-[#222222]">Language & Region</h2>
          </div>
          <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-[#222222] block">English (India)</span>
              <span className="text-xs text-gray-500">Localized date formatting and terminology</span>
            </div>
            <span className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 py-1 px-3 rounded-xl">
              Active
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#FF385C]" />
            <h2 className="text-lg font-bold text-[#222222]">Notification Preferences</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <span className="text-sm font-medium text-gray-800">Booking confirmations & itinerary updates</span>
              <input type="checkbox" defaultChecked className="accent-black h-4 w-4" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <span className="text-sm font-medium text-gray-800">Messages from Hosts</span>
              <input type="checkbox" defaultChecked className="accent-black h-4 w-4" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <span className="text-sm font-medium text-gray-800">Exclusive travel inspiration and discounts</span>
              <input type="checkbox" defaultChecked className="accent-black h-4 w-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
