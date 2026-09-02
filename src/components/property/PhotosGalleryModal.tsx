'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Share2 } from 'lucide-react';
import { FavoriteHeart } from './FavoriteHeart';

interface PhotosGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  propertyId: string;
}

export function PhotosGalleryModal({
  isOpen,
  onClose,
  images,
  title,
  propertyId,
}: PhotosGalleryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in custom-scrollbar">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full p-2 hover:bg-gray-100 text-gray-700 font-semibold text-sm transition-colors"
          aria-label="Back to listing"
        >
          <X className="h-5 w-5" />
          <span className="hidden sm:inline">Close photos</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title, url: window.location.href });
              }
            }}
            className="flex items-center gap-1.5 rounded-full p-2 hover:bg-gray-100 text-gray-700 text-sm font-semibold transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <FavoriteHeart propertyId={propertyId} size="md" className="p-2 hover:bg-gray-100" />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#222222]">{title}</h2>
          <p className="text-sm text-gray-500">All {images.length} high-resolution property photos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden bg-gray-100 ${
                idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={img}
                alt={`${title} photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
