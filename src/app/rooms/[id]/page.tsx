'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';
import { FavoriteHeart } from '@/components/property/FavoriteHeart';
import { PhotosGalleryModal } from '@/components/property/PhotosGalleryModal';
import { VirtualTourModal } from '@/components/property/VirtualTourModal';
import { ShareModal } from '@/components/property/ShareModal';
import { AiConcierge } from '@/components/property/AiConcierge';
import { AmbientSoundscape } from '@/components/property/AmbientSoundscape';
import { GoldenHourSimulator } from '@/components/property/GoldenHourSimulator';
import { GroupSplitCalculator } from '@/components/property/GroupSplitCalculator';
import { PriceTrackerModal } from '@/components/property/PriceTrackerModal';
import { AmenitiesGrid } from '@/components/property/AmenitiesGrid';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { BookingCard } from '@/components/booking/BookingCard';
import { MobileReserveBar } from '@/components/booking/MobileReserveBar';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { ImageCarousel } from '@/components/property/ImageCarousel';
import {
  Star,
  Share2,
  Medal,
  ShieldCheck,
  Sparkles,
  Bed,
  MapPin,
  Calendar,
  Grid,
  ChevronLeft,
  ChevronRight,
  Clock,
  DoorClosed,
  Eye,
  Compass,
  Sun,
  TrendingUp,
  Bell,
  Split,
  Volume2,
} from 'lucide-react';

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default function RoomPage({ params }: RoomPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const property = PROPERTIES.find((p) => p.id === resolvedParams.id);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPriceTrackerOpen, setIsPriceTrackerOpen] = useState(false);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 pb-24 lg:pb-8">
      {/* Mobile Top Navigation Bar */}
      <div className="flex md:hidden items-center justify-between py-1">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPriceTrackerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            aria-label="Price drop alert"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            aria-label="Share listing"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <FavoriteHeart propertyId={property.id} size="sm" />
          </div>
        </div>
      </div>

      {/* Title & Top Action Bar on Desktop */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {property.badge && (
            <span className="rounded-full bg-linear-to-r from-amber-500 to-amber-700 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
              ★ {property.badge}
            </span>
          )}
          {property.viewsThisWeek && (
            <span className="text-[11px] sm:text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {property.viewsThisWeek} viewed this week
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-[#222222] tracking-tight leading-snug">
          {property.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[#222222]">
            <div className="flex items-center gap-1 font-bold">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#222222]" />
              <span>{property.rating.toFixed(2)}</span>
            </div>
            <span>·</span>
            <span className="underline font-semibold">{property.reviewsCount} reviews</span>
            {property.isSuperhost && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <Medal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF385C]" />
                  Superhost
                </span>
              </>
            )}
            <span>·</span>
            <span className="font-medium text-gray-600 underline">
              {property.location.city}, {property.location.state ? `${property.location.state}, ` : ''}{property.location.country}
            </span>
            {property.weather && (
              <>
                <span>·</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-gray-700 font-medium">
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  {property.weather.temp} ({property.weather.condition})
                </span>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPriceTrackerOpen(true)}
              className="flex items-center gap-1.5 rounded-xl py-2 px-3 hover:bg-gray-100 font-semibold text-xs text-[#222222] transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4 text-amber-600" />
              <span>Price alert</span>
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl py-2 px-3 hover:bg-gray-100 font-semibold text-xs text-[#222222] transition-colors cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              <span>Share & QR</span>
            </button>
            <div className="flex items-center gap-1 hover:bg-gray-100 rounded-xl px-2 py-1">
              <FavoriteHeart propertyId={property.id} size="sm" />
              <span className="text-xs font-semibold text-[#222222]">Save</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipeable Carousel vs Desktop 5-Image Collage Grid */}
      <div className="block md:hidden -mx-3 sm:-mx-6 relative">
        <ImageCarousel images={property.images} title={property.title} aspectRatio="video" priority={true} />
        <button
          type="button"
          onClick={() => setIsVirtualTourOpen(true)}
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl bg-black/80 text-white px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-md"
        >
          <Compass className="h-3.5 w-3.5 text-[#FF385C]" />
          <span>360° Tour</span>
        </button>
      </div>

      {/* Desktop 5-Image Collage Grid */}
      <div className="hidden md:block relative rounded-3xl overflow-hidden bg-gray-100">
        <div className="grid grid-cols-4 gap-2 h-[420px] lg:h-[480px]">
          {/* Main Large Image */}
          <div
            onClick={() => setIsGalleryOpen(true)}
            className="col-span-2 relative h-full cursor-pointer overflow-hidden group"
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority
              sizes="50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Supporting Images */}
          <div className="grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={property.images[1] || property.images[0]}
                alt={`${property.title} photo 2`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={property.images[2] || property.images[0]}
                alt={`${property.title} photo 3`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={property.images[3] || property.images[0]}
                alt={`${property.title} photo 4`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={property.images[4] || property.images[0]}
                alt={`${property.title} photo 5`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons: 360 Walkthrough + Show all photos */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={() => setIsVirtualTourOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-black/80 text-white px-4 py-2 text-xs font-bold shadow-md backdrop-blur-md hover:bg-black hover:scale-105 transition-all"
          >
            <Compass className="h-4 w-4 text-[#FF385C]" />
            <span>360° Virtual Tour</span>
          </button>

          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-bold text-[#222222] shadow-md backdrop-blur-xs hover:bg-white hover:scale-105 transition-all"
          >
            <Grid className="h-4 w-4" />
            <span>Show all {property.images.length} photos</span>
          </button>
        </div>
      </div>

      {/* Main Content & Sticky Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 sm:pt-4">
        {/* Left Information Column */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 divide-y divide-gray-200">
          {/* Host & Rooms Overview */}
          <div className="flex items-start justify-between gap-4 pb-4 sm:pb-6">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#222222]">
                {property.type} hosted by {property.host.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} baths
              </p>
            </div>

            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-2xs">
              <Image
                src={property.host.avatar}
                alt={property.host.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Futuristic Feature 1: Spatial Ambient Soundscape Player */}
          <div className="py-4 sm:py-6">
            <AmbientSoundscape propertyCategory={property.category} city={property.location.city} />
          </div>

          {/* Futuristic Feature 2: AI Property Concierge */}
          <div className="py-4 sm:py-6">
            <AiConcierge property={property} />
          </div>

          {/* Futuristic Feature 3: Sunlight & Golden Hour Simulator */}
          <div className="py-4 sm:py-6">
            <GoldenHourSimulator image={property.images[0]} title={property.title} />
          </div>

          {/* Highlights */}
          <div className="space-y-4 sm:space-y-5 py-4 sm:py-6">
            {property.isGuestFavorite && (
              <div className="flex items-start gap-3 sm:gap-4">
                <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF385C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Guest favorite</h4>
                  <p className="text-xs text-gray-500">
                    This home is in the top 1% of homes on HavenStay based on guest ratings.
                  </p>
                </div>
              </div>
            )}

            {property.rules.selfCheckIn && (
              <div className="flex items-start gap-3 sm:gap-4">
                <DoorClosed className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Self check-in</h4>
                  <p className="text-xs text-gray-500">
                    Check yourself in easily with the smart keypad on the front door.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 sm:gap-4">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#222222]">Flexible cancellation</h4>
                <p className="text-xs text-gray-500">{property.cancellationPolicy}</p>
              </div>
            </div>
          </div>

          {/* Sleeping Arrangements */}
          <div className="space-y-3 sm:space-y-4 py-4 sm:py-6">
            <h3 className="text-base sm:text-lg font-bold text-[#222222]">Where you’ll sleep</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {property.sleepingArrangements.map((room, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 p-4 sm:p-5 space-y-2 sm:space-y-3 bg-gray-50/50"
                >
                  <Bed className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#222222]">{room.bedroom}</h4>
                    <p className="text-xs text-gray-500">{room.bedType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 sm:space-y-4 py-4 sm:py-6">
            <h3 className="text-base sm:text-lg font-bold text-[#222222]">About this space</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3 sm:space-y-4 py-4 sm:py-6">
            <h3 className="text-base sm:text-lg font-bold text-[#222222]">What this place offers</h3>
            <AmenitiesGrid amenityIds={property.amenities} />
          </div>

          {/* Futuristic Feature 4: Group Cost Splitter */}
          <div className="py-4 sm:py-6">
            <GroupSplitCalculator
              totalPrice={property.price * 5}
              nights={5}
              propertyTitle={property.title}
            />
          </div>

          {/* Host Card Profile */}
          <div className="space-y-3 sm:space-y-4 py-4 sm:py-6">
            <h3 className="text-base sm:text-lg font-bold text-[#222222]">Meet your Host</h3>
            <div className="rounded-3xl border border-gray-200 bg-gray-50/60 p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={property.host.avatar}
                    alt={property.host.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-[#222222]">{property.host.name}</h4>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-600">
                    <Medal className="h-3.5 w-3.5 text-[#FF385C]" />
                    <span>Superhost · {property.host.yearsHosting} years hosting</span>
                  </div>
                  <p className="text-xs text-gray-500">{property.host.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-gray-200 pt-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Response rate</span>
                  <span className="font-bold text-xs sm:text-sm text-[#222222]">
                    {property.host.responseRate}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Response time</span>
                  <span className="font-bold text-xs sm:text-sm text-[#222222]">
                    {property.host.responseTime}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Languages</span>
                  <span className="font-bold text-xs sm:text-sm text-[#222222] truncate">
                    {property.host.languages?.join(', ') || 'English'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Widget Column on Desktop */}
        <div className="hidden lg:block lg:col-span-5">
          <BookingCard property={property} />
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection property={property} />

      {/* Location Interactive Map */}
      <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-[#222222]">Where you’ll be</h3>
        <p className="text-xs sm:text-sm text-gray-600">
          {property.location.city}, {property.location.country}
        </p>
        <div className="h-72 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-sm">
          <InteractiveMap properties={[property]} selectedPropertyId={property.id} />
        </div>
      </div>

      {/* Mobile Bottom Sticky Reserve Bar */}
      <MobileReserveBar property={property} />

      {/* Modals */}
      <PhotosGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.images}
        title={property.title}
        propertyId={property.id}
      />

      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        title={property.title}
        images={property.virtualTourImages || property.images}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        property={property}
      />

      <PriceTrackerModal
        isOpen={isPriceTrackerOpen}
        onClose={() => setIsPriceTrackerOpen(false)}
        currentPrice={property.price}
        propertyTitle={property.title}
      />
    </div>
  );
}
