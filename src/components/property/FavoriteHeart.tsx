'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface FavoriteHeartProps {
  propertyId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FavoriteHeart({
  propertyId,
  size = 'md',
  className = '',
}: FavoriteHeartProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const active = isWishlisted(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleWishlist(propertyId);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`group/heart relative flex items-center justify-center p-2 rounded-full transition-transform active:scale-75 focus:outline-hidden ${className} ${
        isAnimating ? 'animate-heart-pulse' : ''
      }`}
    >
      <Heart
        className={`${sizeClasses} transition-colors duration-200 stroke-white stroke-[2] ${
          active
            ? 'fill-[#FF385C] stroke-[#FF385C]'
            : 'fill-black/30 group-hover/heart:scale-110'
        }`}
      />
    </button>
  );
}
