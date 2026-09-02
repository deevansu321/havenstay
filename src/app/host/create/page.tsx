'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { useCurrency } from '@/context/CurrencyContext';
import { POPULAR_AMENITY_IDS, AMENITIES_LIST } from '@/data/amenities';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building,
  Warehouse,
  Trees,
  Waves,
  Camera,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

export default function HostCreateWizard() {
  const router = useRouter();
  const { format } = useCurrency();

  const [step, setStep] = useState(1);
  const totalSteps = 9;

  // Form State
  const [propertyType, setPropertyType] = useState('Entire villa');
  const [city, setCity] = useState('Goa');
  const [country, setCountry] = useState('India');
  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['wifi', 'kitchen', 'pool', 'air-conditioning']);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  ]);
  const [title, setTitle] = useState('The Azure Horizon Villa & Private Plunge Pool');
  const [description, setDescription] = useState('Escape to this peaceful coastal retreat featuring stunning panoramic sunsets, lush private tropical gardens, and bespoke modern architecture.');
  const [price, setPrice] = useState(22500);
  const [isPublished, setIsPublished] = useState(false);

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Publish
      setIsPublished(true);
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const types = [
    { label: 'House / Villa', icon: <Warehouse className="h-5 w-5 sm:h-6 sm:w-6" />, value: 'Entire villa' },
    { label: 'Apartment', icon: <Building className="h-5 w-5 sm:h-6 sm:w-6" />, value: 'Entire apartment' },
    { label: 'Cabin / Chalet', icon: <Trees className="h-5 w-5 sm:h-6 sm:w-6" />, value: 'Entire cabin' },
    { label: 'Beachfront Stay', icon: <Waves className="h-5 w-5 sm:h-6 sm:w-6" />, value: 'Beachfront villa' },
  ];

  if (isPublished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center space-y-6 animate-slide-up">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222]">
            Congratulations! 🎉
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Your listing <span className="font-bold text-black">&quot;{title}&quot;</span> is now live on HavenStay.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-airbnb-card text-left space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
            <Image
              src={photos[0]}
              alt={title}
              fill
              sizes="600px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#222222]">{title}</h3>
            <p className="text-xs text-gray-500">{city}, {country} · {format(price)}/night</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="black" size="md" fullWidth>
              Go to marketplace
            </Button>
          </Link>
          <Link href="/rooms/prop-1" className="w-full sm:w-auto">
            <Button variant="outline" size="md" fullWidth>
              View public listing
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-between max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Top Header & Progress Bar */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Step {step} of {totalSteps}
          </span>

          <Link href="/host" className="text-xs font-semibold text-gray-600 hover:text-black">
            Exit
          </Link>
        </div>

        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Steps Content */}
      <div className="py-6 sm:py-8 space-y-6 animate-fade-in flex-1">
        {/* Step 1: Property Type */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Which of these best describes your place?</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Choose a category that guests will discover your home under.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {types.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setPropertyType(t.value)}
                  className={`flex flex-col items-start justify-between p-4 sm:p-5 rounded-2xl border text-left h-28 sm:h-32 transition-all ${
                    propertyType === t.value
                      ? 'border-black bg-gray-50 ring-1 ring-black'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  <div className={propertyType === t.value ? 'text-black' : 'text-gray-600'}>{t.icon}</div>
                  <span className="text-xs sm:text-sm font-bold text-[#222222]">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Where is your place located?</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Your address is only shared with guests after their booking is confirmed.</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-2xl border border-gray-300 p-3">
                <label className="block text-[10px] font-bold uppercase text-gray-500">City / Region</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Goa, Manali, Paris"
                  className="w-full text-sm sm:text-base font-semibold text-[#222222] focus:outline-hidden bg-transparent"
                />
              </div>

              <div className="rounded-2xl border border-gray-300 p-3">
                <label className="block text-[10px] font-bold uppercase text-gray-500">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India"
                  className="w-full text-sm sm:text-base font-semibold text-[#222222] focus:outline-hidden bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Floor Plan */}
        {step === 3 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Share some basics about your place</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">You’ll add more details later, like bed types.</p>
            </div>

            <div className="divide-y divide-gray-200 border-y border-gray-200">
              <div className="flex items-center justify-between py-3.5">
                <span className="font-semibold text-xs sm:text-sm text-[#222222]">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs sm:text-sm">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <span className="font-semibold text-xs sm:text-sm text-[#222222]">Bedrooms</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs sm:text-sm">{bedrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBedrooms(bedrooms + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <span className="font-semibold text-xs sm:text-sm text-[#222222]">Beds</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBeds(Math.max(1, beds - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs sm:text-sm">{beds}</span>
                  <button
                    type="button"
                    onClick={() => setBeds(beds + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <span className="font-semibold text-xs sm:text-sm text-[#222222]">Bathrooms</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs sm:text-sm">{bathrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBathrooms(bathrooms + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Amenities */}
        {step === 4 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Tell guests what your place offers</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Select all amenities you provide.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {POPULAR_AMENITY_IDS.map((id) => {
                const item = AMENITIES_LIST.find((a) => a.id === id);
                if (!item) return null;
                const isSelected = selectedAmenities.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAmenity(item.id)}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-black bg-gray-50 ring-1 ring-black'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#222222]">{item.name}</span>
                    {isSelected && <Check className="h-4 w-4 stroke-[3] text-black" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Photos */}
        {step === 5 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Add photos of your place</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Upload high-quality photos to showcase your space.</p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {photos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200">
                  <Image src={src} alt="Listing photo" fill sizes="200px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 sm:p-8 text-center space-y-2 hover:border-black cursor-pointer transition-colors">
              <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mx-auto" />
              <span className="font-bold text-xs sm:text-sm text-[#222222] block">Drag photos here</span>
              <span className="text-[11px] sm:text-xs text-gray-500 block">Or browse from your device</span>
            </div>
          </div>
        )}

        {/* Step 6: Title */}
        {step === 6 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Give your place a title</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Short titles work best. Highlight what makes your place special.</p>
            </div>

            <textarea
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              className="w-full rounded-2xl border border-gray-300 p-3.5 sm:p-4 text-sm sm:text-base font-semibold focus:border-black focus:outline-hidden"
            />
            <span className="text-xs text-gray-400">{title.length} / 60 characters</span>
          </div>
        )}

        {/* Step 7: Description */}
        {step === 7 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Create your description</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Share what makes your space unique and welcoming.</p>
            </div>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-3.5 sm:p-4 text-xs sm:text-sm font-medium focus:border-black focus:outline-hidden"
            />
          </div>
        )}

        {/* Step 8: Price */}
        {step === 8 && (
          <div className="space-y-4 sm:space-y-6 text-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Set your nightly price</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">You can change it anytime.</p>
            </div>

            <div className="flex items-center justify-center gap-2 py-6 sm:py-8">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#222222]">₹</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="text-3xl sm:text-5xl font-extrabold text-[#222222] w-40 sm:w-48 text-center border-b-2 border-black focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-gray-500">Suggested price for your area: ₹18,000 – ₹26,000</p>
          </div>
        )}

        {/* Step 9: Review & Publish */}
        {step === 9 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#222222]">Review your listing</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Here’s what we’ll show to guests.</p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-4 sm:p-5 bg-white shadow-airbnb-card space-y-3 sm:space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
                <Image src={photos[0]} alt={title} fill sizes="600px" className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-[#222222]">{title}</h3>
                <p className="text-xs text-gray-500">{city}, {country}</p>
                <p className="text-xs text-gray-500">{guests} guests · {bedrooms} bedrooms · {bathrooms} baths</p>
                <div className="pt-2 font-bold text-xs sm:text-sm text-[#222222]">{format(price)} / night</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="border-t border-gray-200 pt-3 sm:pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 1}
          className="text-xs sm:text-sm font-bold text-[#222222] underline hover:text-black disabled:opacity-30"
        >
          Back
        </button>

        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm"
        >
          {step === totalSteps ? 'Publish listing' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
