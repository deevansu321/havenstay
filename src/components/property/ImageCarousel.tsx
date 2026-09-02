'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  priority?: boolean;
}

export function ImageCarousel({
  images,
  title,
  aspectRatio = 'square',
  priority = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swiped left -> Next
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      // Swiped right -> Prev
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    setTouchStart(null);
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    portrait: 'aspect-[4/5]',
  }[aspectRatio];

  return (
    <div
      className={`group/carousel relative w-full overflow-hidden rounded-2xl bg-gray-100 ${aspectClasses}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Current Image */}
      <Image
        src={images[currentIndex] || images[0]}
        alt={`${title} - photo ${currentIndex + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover transition-transform duration-500 group-hover/carousel:scale-105"
      />

      {/* Prev Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-hidden z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={nextImage}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-hidden z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4 stroke-[2.5]" />
        </button>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 z-10">
          {images.slice(0, 5).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                currentIndex === i
                  ? 'w-4 bg-white shadow-xs'
                  : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
