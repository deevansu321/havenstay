'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { PROPERTIES } from '@/data/properties';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Sparkles,
  Send,
  Bot,
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Mic,
  MicOff,
  Flame,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiTripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: { time: string; activity: string; tag: string }[];
}

export function AiTripPlannerModal({ isOpen, onClose }: AiTripPlannerModalProps) {
  const { format } = useCurrency();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[]>([]);
  const [destinationSummary, setDestinationSummary] = useState('');

  const samplePrompts = [
    '✨ Romantic 5-day mountain escape with heated hot tub under ₹25,000/night',
    '🌊 Luxury 4-person beachfront villa in Goa with private pool and chef',
    '🏰 Royal heritage stay in Rajasthan with authentic palace courtyards',
    '⛷️ Ski-in/ski-out winter chalet with sauna and panoramic snow peaks',
  ];

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech to text voice capture
      setTimeout(() => {
        setPrompt('Beachfront luxury villa with infinity pool in Goa for 4 friends');
        setIsListening(false);
      }, 2200);
    } else {
      setIsListening(false);
    }
  };

  const handleGenerate = (queryText?: string) => {
    const query = queryText || prompt;
    if (!query.trim()) return;

    setIsGenerating(true);
    setRecommendedProperties([]);
    setGeneratedItinerary([]);

    setTimeout(() => {
      const lower = query.toLowerCase();

      // Find matching properties
      let matched: Property[] = [];
      if (lower.includes('beach') || lower.includes('goa') || lower.includes('ocean')) {
        matched = PROPERTIES.filter((p) => p.category === 'beachfront' || p.location.city.includes('Goa'));
        setDestinationSummary('Tropical Coastal Luxury · Goa, India');
        setGeneratedItinerary([
          {
            day: 1,
            title: 'Arrival & Sunset Infinity Pool Welcome',
            activities: [
              { time: '03:00 PM', activity: 'Private check-in with fresh coconut welcome drink', tag: 'Check-in' },
              { time: '05:30 PM', activity: 'Sunset cocktails on the oceanfront deck', tag: 'Leisure' },
              { time: '08:00 PM', activity: 'Complimentary private chef seafood dinner', tag: 'Dining' },
            ],
          },
          {
            day: 2,
            title: 'Private Catamaran Sailing & Beach Day',
            activities: [
              { time: '09:00 AM', activity: 'Floating champagne breakfast in the pool', tag: 'Breakfast' },
              { time: '02:00 PM', activity: 'Private catamaran charter along Baga coastline', tag: 'Adventure' },
              { time: '07:30 PM', activity: 'Live acoustic music by the beach fire pit', tag: 'Nightlife' },
            ],
          },
          {
            day: 3,
            title: 'Heritage Portuguese Quarter & Spa',
            activities: [
              { time: '10:00 AM', activity: 'Guided walking tour of Fontainhas Latin Quarter', tag: 'Culture' },
              { time: '04:00 PM', activity: 'In-villa Ayurvedic deep tissue massage', tag: 'Wellness' },
            ],
          },
        ]);
      } else if (lower.includes('mountain') || lower.includes('snow') || lower.includes('manali') || lower.includes('ski') || lower.includes('zermatt')) {
        matched = PROPERTIES.filter((p) => p.category === 'cabins' || p.category === 'skiing' || p.location.city.includes('Manali') || p.location.city.includes('Zermatt'));
        setDestinationSummary('Alpine Snow Sanctuary · High Altitude Serenity');
        setGeneratedItinerary([
          {
            day: 1,
            title: 'Himalayan Ridge Arrival & Cedar Sauna',
            activities: [
              { time: '02:00 PM', activity: '4x4 mountain scenic transfer to chalet', tag: 'Transfer' },
              { time: '04:30 PM', activity: 'Cedar barrel sauna session with mountain views', tag: 'Wellness' },
              { time: '07:00 PM', activity: 'Fondue and mulled wine by the cast-iron fireplace', tag: 'Dining' },
            ],
          },
          {
            day: 2,
            title: 'Glacier Stargazing & Snow Trek',
            activities: [
              { time: '09:30 AM', activity: 'Guided snowshoe trek through pine forests', tag: 'Adventure' },
              { time: '08:30 PM', activity: 'Telescope deep-sky stargazing on the heated deck', tag: 'Experience' },
            ],
          },
        ]);
      } else {
        matched = PROPERTIES.slice(0, 3);
        setDestinationSummary('Curated World-Class Retreat');
        setGeneratedItinerary([
          {
            day: 1,
            title: 'Bespoke Host Welcome & Orientation',
            activities: [
              { time: '03:00 PM', activity: 'Exclusive VIP check-in with host welcome basket', tag: 'Welcome' },
              { time: '07:00 PM', activity: 'Chef-prepared locally-sourced dinner', tag: 'Dining' },
            ],
          },
          {
            day: 2,
            title: 'Curated Architectural Exploration',
            activities: [
              { time: '10:00 AM', activity: 'Private guided cultural landmark tour', tag: 'Sightseeing' },
              { time: '05:00 PM', activity: 'Sunset photography session', tag: 'Leisure' },
            ],
          },
        ]);
      }

      setRecommendedProperties(matched.slice(0, 3));
      setIsGenerating(false);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 1400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="HavenStay AI Co-Pilot™"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Header Tag */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-linear-to-r from-rose-50 via-purple-50 to-amber-50 border border-rose-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-r from-[#FF385C] to-purple-600 text-white shadow-md shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-sm text-[#222222]">
              AI Autonomous Trip Generator & Concierge
            </h3>
            <p className="text-xs text-gray-500">
              Describe your dream vacation in plain English or voice. We’ll curate matching luxury stays and custom day-by-day itineraries.
            </p>
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find me a luxury beachfront villa in Goa for 4 friends with private pool, chef and fast WiFi under ₹35,000/night..."
              className="w-full rounded-2xl border border-gray-300 p-4 pr-12 text-xs sm:text-sm font-medium focus:border-black focus:outline-hidden resize-none shadow-xs"
            />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`absolute right-3.5 bottom-3.5 p-2 rounded-full transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isListening ? 'Listening...' : 'Speak prompt'}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>
          </div>

          {isListening && (
            <div className="flex items-center gap-2 text-xs text-[#FF385C] font-semibold animate-pulse px-1">
              <span className="h-2 w-2 rounded-full bg-[#FF385C]" />
              <span>Listening to voice prompt...</span>
            </div>
          )}

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(sample.replace('✨ ', '').replace('🌊 ', '').replace('🏰 ', '').replace('⛷️ ', ''));
                  handleGenerate(sample);
                }}
                className="py-1.5 px-3 rounded-full text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors text-left truncate max-w-full"
              >
                {sample}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isGenerating}
            onClick={() => handleGenerate()}
            disabled={!prompt.trim() && !isGenerating}
            leftIcon={<Sparkles className="h-4 w-4" />}
            className="py-3 text-xs sm:text-sm font-bold shadow-md rounded-2xl"
          >
            Generate AI Dream Vacation & Itinerary
          </Button>
        </div>

        {/* Results Stream */}
        {destinationSummary && (
          <div className="space-y-6 pt-4 border-t border-gray-100 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#FF385C]" />
                <h4 className="font-extrabold text-sm text-[#222222]">{destinationSummary}</h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                AI Match 99.4%
              </span>
            </div>

            {/* Recommended Stays Grid */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Recommended Handpicked Stays
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedProperties.map((prop) => (
                  <Link
                    key={prop.id}
                    href={`/rooms/${prop.id}`}
                    onClick={onClose}
                    className="group rounded-2xl border border-gray-200 p-2 bg-white hover:shadow-airbnb-card hover:border-black transition-all flex flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-2">
                      <Image
                        src={prop.images[0]}
                        alt={prop.title}
                        fill
                        sizes="200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-0.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h6 className="font-bold text-xs text-[#222222] line-clamp-1 group-hover:text-[#FF385C] transition-colors">
                          {prop.title}
                        </h6>
                        <p className="text-[11px] text-gray-500">{prop.location.city}</p>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#222222]">
                        <span>{format(prop.price)}</span>
                        <span className="flex items-center gap-0.5 text-[11px]">
                          <Star className="h-3 w-3 fill-black text-black" />
                          {prop.rating.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Generated Day-by-Day Itinerary */}
            {generatedItinerary.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Generated Day-by-Day Itinerary
                </h5>
                <div className="space-y-3">
                  {generatedItinerary.map((day) => (
                    <div key={day.day} className="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-xs font-bold">
                          {day.day}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#222222]">{day.title}</span>
                      </div>

                      <div className="space-y-2 pl-8 border-l-2 border-gray-200 ml-3">
                        {day.activities.map((act, i) => (
                          <div key={i} className="flex items-baseline justify-between text-xs gap-2">
                            <div className="flex items-baseline gap-2 min-w-0">
                              <span className="font-mono text-[11px] text-gray-400 font-semibold shrink-0">
                                {act.time}
                              </span>
                              <span className="text-gray-700 font-medium truncate">{act.activity}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md shrink-0">
                              {act.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
