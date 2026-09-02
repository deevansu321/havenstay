import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} />;
}

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-2xl" />
      {/* Title & Rating */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-12" />
      </div>
      {/* Subtitles */}
      <Skeleton className="h-3.5 w-1/2" />
      <Skeleton className="h-3.5 w-1/3" />
      {/* Price */}
      <Skeleton className="h-4 w-24 mt-1" />
    </div>
  );
}

export function PropertyGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
