'use client';

import React, { useState } from 'react';
import { Property, AiFaq } from '@/lib/types';
import { Sparkles, Send, Bot, User, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface AiConciergeProps {
  property: Property;
}

export function AiConcierge({ property }: AiConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: `Hello! I’m the HavenStay AI Concierge for ${property.host.name}’s home. Ask me anything about WiFi speeds, amenities, pool temperatures, or local recommendations!`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const sampleChips = [
    'Is the pool heated?',
    'How fast is the Wi-Fi?',
    'What are the house rules for noise?',
    'Can we check in early?',
  ];

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    const userText = query.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInputQuery('');
    setIsThinking(true);

    // Answer matching
    setTimeout(() => {
      let matchedAnswer = '';

      // Check if matches any specific property aiFaqs
      const lower = userText.toLowerCase();
      const matchedFaq = property.aiFaqs?.find((f) =>
        lower.includes(f.category) ||
        lower.split(' ').some((word) => word.length > 3 && f.question.toLowerCase().includes(word))
      );

      if (matchedFaq) {
        matchedAnswer = matchedFaq.answer;
      } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('speed')) {
        matchedAnswer = `The home features ultra-high-speed 500+ Mbps fiber Wi-Fi with dual backup routers, ideal for 4K video conferencing and seamless remote work.`;
      } else if (lower.includes('pool') || lower.includes('heated') || lower.includes('swim')) {
        matchedAnswer = `Yes! The private pool is kept sparkling clean daily and is heated to a comfortable 28°C (82°F).`;
      } else if (lower.includes('check-in') || lower.includes('early') || lower.includes('time')) {
        matchedAnswer = `Standard check-in is ${property.rules.checkIn}. Early check-in can be requested directly after booking and is accommodated whenever the previous guests check out early.`;
      } else if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) {
        matchedAnswer = property.rules.petsAllowed
          ? `Pets are welcome at this property! We ask that you let the host know in advance so we can prepare pet bowls.`
          : `Unfortunately, pets are not allowed at this property to preserve allergy-free conditions for all guests.`;
      } else {
        matchedAnswer = `Great question! ${property.title} in ${property.location.city} offers ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, and hosts up to ${property.guests} guests with dedicated host concierge support.`;
      }

      setMessages((prev) => [...prev, { role: 'ai', text: matchedAnswer }]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="rounded-3xl border border-rose-200 bg-linear-to-br from-rose-50/50 via-white to-amber-50/30 p-6 shadow-xs space-y-4">
      {/* Header Banner */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF385C] to-[#E00B41] text-white shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-sm text-[#222222]">AI Property Concierge</h4>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Instant answers
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Get instant answers regarding amenities, speeds, and rules
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
          aria-label="Toggle concierge"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4 pt-2 animate-fade-in border-t border-rose-100">
          {/* Quick Query Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {sampleChips.map((chip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAsk(chip)}
                className="py-1.5 px-3 rounded-full text-xs font-semibold bg-white border border-rose-200 text-gray-800 hover:border-[#FF385C] hover:text-[#FF385C] transition-colors shadow-2xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Stream */}
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar p-2 bg-white/80 rounded-2xl border border-gray-100">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 items-start ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'ai' && (
                  <div className="h-6 w-6 rounded-full bg-[#FF385C] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`rounded-2xl py-2 px-3.5 text-xs leading-relaxed max-w-[85%] ${
                    m.role === 'user'
                      ? 'bg-[#222222] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-[#FF385C]" />
                <span>Concierge is looking up details...</span>
              </div>
            )}
          </div>

          {/* Custom Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about this property..."
              className="flex-1 rounded-xl border border-gray-300 py-2 px-3.5 text-xs bg-white focus:border-black focus:outline-hidden"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputQuery.trim()}
              className="rounded-xl px-3 py-2 text-xs"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
