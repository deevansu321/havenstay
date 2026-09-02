'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/types';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Copy, Check, QrCode, MessageCircle, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function ShareModal({ isOpen, onClose, property }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://havenstay.com/rooms/${property.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Check out this incredible stay: ${property.title} in ${property.location.city}! ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(`Found this dream stay on HavenStay: ${property.title}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share this place"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Listing preview pill */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
          <div className="relative h-16 w-20 rounded-xl overflow-hidden shrink-0">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <h4 className="font-bold text-xs text-[#222222] truncate">{property.title}</h4>
            <p className="text-[11px] text-gray-500 truncate">{property.location.city}, {property.location.country}</p>
            <span className="text-[11px] font-bold text-[#222222]">★ {property.rating.toFixed(2)} ({property.reviewsCount})</span>
          </div>
        </div>

        {/* Share buttons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:border-black transition-colors group"
          >
            {copied ? (
              <Check className="h-6 w-6 text-emerald-600 mb-2" />
            ) : (
              <Copy className="h-6 w-6 text-gray-700 mb-2 group-hover:scale-110 transition-transform" />
            )}
            <span className="text-xs font-semibold text-[#222222]">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:border-emerald-500 transition-colors group"
          >
            <MessageCircle className="h-6 w-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#222222]">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleTwitter}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:border-sky-500 transition-colors group"
          >
            <svg className="h-6 w-6 fill-current text-sky-500 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs font-semibold text-[#222222]">X / Twitter</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:border-black transition-colors group"
          >
            <QrCode className="h-6 w-6 text-gray-700 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#222222]">QR Code</span>
          </button>
        </div>

        {/* QR Code Container */}
        {showQr && (
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 animate-slide-up">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`}
                alt="QR Code for listing"
                width={160}
                height={160}
                className="rounded-lg"
              />
            </div>
            <span className="text-xs text-gray-500 text-center">Scan with any mobile camera to view listing</span>
          </div>
        )}
      </div>
    </Modal>
  );
}
