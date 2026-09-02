'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/common/Button';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  DollarSign,
  HeartHandshake,
} from 'lucide-react';

export default function HostLandingPage() {
  const { format } = useCurrency();
  const [city, setCity] = useState<'Goa' | 'Manali' | 'Jaipur' | 'Mumbai' | 'Paris' | 'Tokyo' | 'Bali'>('Goa');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [nightsBooked, setNightsBooked] = useState<number>(15);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Base nightly rate per city for calculations
  const cityBaseRates: Record<string, number> = {
    Goa: 12000,
    Manali: 8500,
    Jaipur: 9500,
    Mumbai: 14000,
    Paris: 22000,
    Tokyo: 19500,
    Bali: 11000,
  };

  const estimatedNightly = (cityBaseRates[city] || 10000) * (1 + (bedrooms - 1) * 0.45);
  const monthlyEarnings = Math.round(estimatedNightly * nightsBooked);

  const faqs = [
    {
      q: 'Is my place right for HavenStay?',
      a: 'HavenStay guests are interested in all kinds of places—from spare rooms to cozy mountain chalets, beachfront villas, and designer city lofts.',
    },
    {
      q: 'How do I get paid as a Host?',
      a: 'We automatically transfer your payouts via Direct Bank Deposit, UPI, or PayPal 24 hours after your guest’s scheduled check-in time.',
    },
    {
      q: 'What protections do I have against property damage?',
      a: 'Every reservation includes AirCover for Hosts: up to $3M USD in property damage protection and $1M USD in host liability insurance.',
    },
    {
      q: 'How much should I charge?',
      a: 'You have full control over your pricing. Our smart pricing tools give you real-time recommendations based on local travel demand and seasons.',
    },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-20 sm:pb-16">
      {/* Hero Section with Earnings Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF385C] bg-rose-50 py-1.5 px-3 rounded-full border border-rose-100">
              <Sparkles className="h-3.5 w-3.5" />
              HavenStay Hosting
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-[#222222] tracking-tight leading-tight">
              Airbnb it on HavenStay.
            </h1>

            <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
              Join millions of hosts earning substantial income by sharing their homes with respectful world travelers.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/host/create">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} className="py-3.5 sm:py-4 px-8 text-sm sm:text-base font-bold w-full sm:w-auto">
                  Start your listing
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div className="lg:col-span-6 rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 shadow-airbnb-card space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-4 gap-1">
              <div>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase">Estimated Monthly Revenue</span>
                <div className="text-2xl sm:text-4xl font-extrabold text-[#FF385C]">
                  {format(monthlyEarnings)}
                </div>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                {nightsBooked} nights at ~{format(Math.round(estimatedNightly))}/night
              </span>
            </div>

            {/* City Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#222222]">Destination / City</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(['Goa', 'Manali', 'Jaipur', 'Mumbai', 'Paris', 'Tokyo', 'Bali'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCity(c)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                      city === c
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-black'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#222222]">
                <span>Bedrooms</span>
                <span>{bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full accent-[#FF385C] cursor-pointer"
              />
            </div>

            {/* Nights Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#222222]">
                <span>Nights booked per month</span>
                <span>{nightsBooked} nights</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={nightsBooked}
                onChange={(e) => setNightsBooked(Number(e.target.value))}
                className="w-full accent-[#FF385C] cursor-pointer"
              />
            </div>

            <Link href="/host/create" className="block pt-2">
              <Button variant="black" size="md" fullWidth className="py-3 text-xs sm:text-sm font-bold">
                Airbnb your {bedrooms}-bedroom place
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Hosting Works */}
      <section className="bg-gray-50 py-10 sm:py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">Hosting made effortless</h2>
            <p className="text-xs sm:text-sm text-gray-600">From setup to your first five-star review, we support you every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-gray-200 space-y-2.5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#FF385C] font-bold text-base sm:text-lg">
                1
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#222222]">Create your listing</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Describe your space, upload photos, and set your house rules and cancellation policy in under 10 minutes.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-gray-200 space-y-2.5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#FF385C] font-bold text-base sm:text-lg">
                2
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#222222]">Welcome your guests</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Message guests directly, provide smart lock codes or greet them in person with authentic local hospitality.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-gray-200 space-y-2.5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#FF385C] font-bold text-base sm:text-lg">
                3
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#222222]">Get paid seamlessly</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Receive direct bank deposits automatically 24 hours after check-in with transparent low host service fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AirCover Host Protection Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-black text-[#FF385C]">
            <span>haven</span><span className="text-black">cover</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">Protection for every Host</h2>
          <p className="text-xs sm:text-sm text-gray-600">Always included, always free. Only on HavenStay.</p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 max-w-3xl mx-auto divide-y divide-gray-100">
          <div className="flex items-center justify-between py-3.5 first:pt-0">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Guest identity verification</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">Comprehensive government ID checks for every booking.</p>
            </div>
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
          </div>

          <div className="flex items-center justify-between py-3.5">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#222222]">$3M USD Damage Protection</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">Covers rare damage to your home and valuable art/amenities.</p>
            </div>
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
          </div>

          <div className="flex items-center justify-between py-3.5">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#222222]">$1M USD Liability Insurance</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">Protected in the rare event a guest gets hurt or property is damaged.</p>
            </div>
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
          </div>

          <div className="flex items-center justify-between py-3.5 last:pb-0">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#222222]">24-Hour Dedicated Safety Line</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">One-tap access to specially-trained safety agents day or night.</p>
            </div>
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 shrink-0" />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#222222] text-center">Frequently asked questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3.5 sm:py-4">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between font-bold text-xs sm:text-base text-[#222222] text-left cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
