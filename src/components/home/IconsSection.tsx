'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ICONS_EXPERIENCES } from '@/data/icons';
import { IconExperience } from '@/lib/types';
import { Sparkles, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import confetti from 'canvas-confetti';

export function IconsSection() {
  const [selectedIcon, setSelectedIcon] = useState<IconExperience | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [requestReason, setRequestReason] = useState('');

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
    try {
      confetti({
        particleCount: 130,
        spread: 75,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#FF385C] animate-ping" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight">
              HavenStay <span className="text-[#FF385C]">Icons</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Extraordinary experiences hosted by the world’s greatest icons in music, film, art, and sports.
          </p>
        </div>

        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Limited Golden Ticket Access
        </span>
      </div>

      {/* Icons Horizontal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ICONS_EXPERIENCES.map((icon) => (
          <div
            key={icon.id}
            onClick={() => setSelectedIcon(icon)}
            className="group relative flex flex-col rounded-3xl overflow-hidden bg-black text-white cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Cover Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={icon.image}
                alt={icon.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                {icon.status}
              </div>

              {/* Category Pill */}
              <div className="absolute top-3 right-3 z-10 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white">
                {icon.category}
              </div>
            </div>

            {/* Bottom Content Overlay */}
            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-1">
                <span className="text-xs text-rose-300 font-semibold">{icon.location}</span>
                <h3 className="font-bold text-base leading-snug line-clamp-2 text-white group-hover:text-rose-200 transition-colors">
                  {icon.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden border border-white/40">
                    <Image src={icon.host.avatar} alt={icon.host.name} fill sizes="24px" className="object-cover" />
                  </div>
                  <span className="font-medium truncate max-w-[100px] text-gray-300">{icon.host.name}</span>
                </div>

                <span className="font-bold text-[#FF385C] bg-white/10 py-1 px-2 rounded-lg">
                  {icon.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Request Modal */}
      {selectedIcon && (
        <Modal
          isOpen={!!selectedIcon}
          onClose={() => {
            setSelectedIcon(null);
            setIsSuccessModalOpen(false);
          }}
          title={selectedIcon.title}
          maxWidth="lg"
        >
          {!isSuccessModalOpen ? (
            <form onSubmit={handleSendRequest} className="space-y-6">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <Image src={selectedIcon.image} alt={selectedIcon.title} fill sizes="600px" className="object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md rounded-xl px-3 py-1 text-xs text-white font-bold">
                  Hosted by {selectedIcon.host.name} · {selectedIcon.host.role}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#222222]">About this Icon experience</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedIcon.description}</p>
              </div>

              <div className="rounded-2xl bg-rose-50 p-4 border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-[#FF385C]" />
                  <div>
                    <span className="font-bold text-xs text-[#222222] block">Golden Ticket Admission</span>
                    <span className="text-[11px] text-gray-500">Winners are chosen randomly from all valid entries</span>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-[#FF385C]">FREE</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Number of guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-3 text-xs font-semibold focus:border-black focus:outline-hidden"
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={4}>4 guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Why do you want to stay here? (Share your passion)
                  </label>
                  <textarea
                    rows={3}
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    required
                    placeholder="Tell the host why this stay would mean the world to you..."
                    className="w-full rounded-xl border border-gray-300 p-3 text-xs focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Request Golden Ticket Entry
              </Button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-slide-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-[#222222]">Request Submitted!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                You’ve entered the selection pool for <span className="font-bold text-black">&quot;{selectedIcon.title}&quot;</span>.
                Winners will receive an official notification via email.
              </p>
              <Button
                variant="black"
                onClick={() => {
                  setSelectedIcon(null);
                  setIsSuccessModalOpen(false);
                }}
              >
                Back to marketplace
              </Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
