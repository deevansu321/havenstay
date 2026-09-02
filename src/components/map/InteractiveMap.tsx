'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { useCurrency } from '@/context/CurrencyContext';
import { FavoriteHeart } from '../property/FavoriteHeart';
import { formatPriceShort } from '@/lib/utils';
import { Layers, Star, X, MapPin, Sparkles, Navigation, Plus, Minus, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  hoveredPropertyId?: string | null;
  onPropertyHover?: (id: string | null) => void;
  className?: string;
}

export function InteractiveMap({
  properties,
  selectedPropertyId,
  hoveredPropertyId,
  onPropertyHover,
  className = '',
}: InteractiveMapProps) {
  const { format } = useCurrency();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite'>('streets');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Leaflet Map on client
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Clean up existing map instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center (India/Asia or first property coordinate)
      const firstCoord = properties.length > 0 && properties[0].location?.coordinates
        ? [properties[0].location.coordinates.lat, properties[0].location.coordinates.lng]
        : [20.5937, 78.9629];

      const map = L.map(mapContainerRef.current, {
        center: firstCoord as [number, number],
        zoom: properties.length === 1 ? 13 : 5,
        zoomControl: false,
        attributionControl: false,
      });

      // Base Tile Layer (CartoDB Voyager: clean Airbnb style - No API Key Required)
      const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '© OpenStreetMap contributors, © CARTO',
        crossOrigin: true,
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Tiles © Esri',
        crossOrigin: true,
      });

      if (mapLayer === 'satellite') {
        satelliteLayer.addTo(map);
      } else {
        streetLayer.addTo(map);
      }

      mapInstanceRef.current = map;

      // Add zoom control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      if (isMounted) setIsLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLayer]);

  // Update Markers when properties, currency, or selection changes
  useEffect(() => {
    async function updateMarkers() {
      if (!mapInstanceRef.current || typeof window === 'undefined') return;
      const L = (await import('leaflet')).default;

      const map = mapInstanceRef.current;

      // Remove previous markers
      Object.values(markersRef.current).forEach((marker: any) => map.removeLayer(marker));
      markersRef.current = {};

      const bounds = L.latLngBounds([]);

      properties.forEach((prop) => {
        if (!prop.location?.coordinates) return;

        const { lat, lng } = prop.location.coordinates;
        bounds.extend([lat, lng]);

        const isSelected = selectedPropertyId === prop.id || activeProperty?.id === prop.id;
        const isHovered = hoveredPropertyId === prop.id;

        const formattedPrice = formatPriceShort(prop.price);

        const customIcon = L.divIcon({
          className: 'custom-price-div-icon',
          html: `
            <div class="airbnb-price-pill ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}" id="marker-${prop.id}">
              ${formattedPrice}
            </div>
          `,
          iconSize: [60, 30],
          iconAnchor: [30, 15],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setActiveProperty(prop);
          map.panTo([lat, lng], { animate: true });
        });

        marker.on('mouseover', () => {
          if (onPropertyHover) onPropertyHover(prop.id);
        });

        marker.on('mouseout', () => {
          if (onPropertyHover) onPropertyHover(null);
        });

        markersRef.current[prop.id] = marker;
      });

      // Fit map bounds if multiple properties exist
      if (properties.length > 1 && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      } else if (properties.length === 1 && properties[0].location?.coordinates) {
        map.setView([properties[0].location.coordinates.lat, properties[0].location.coordinates.lng], 13);
      }
    }

    if (isLoaded) {
      updateMarkers();
    }
  }, [properties, isLoaded, selectedPropertyId, hoveredPropertyId, activeProperty, format]);

  // Handle selected property changes from outside
  useEffect(() => {
    if (selectedPropertyId) {
      const matched = properties.find((p) => p.id === selectedPropertyId);
      if (matched && matched.location?.coordinates && mapInstanceRef.current) {
        mapInstanceRef.current.panTo(
          [matched.location.coordinates.lat, matched.location.coordinates.lng],
          { animate: true }
        );
        setActiveProperty(matched);
      }
    }
  }, [selectedPropertyId, properties]);

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-gray-200 bg-[#E5E9EE] shadow-sm select-none ${className}`}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Layer Switcher & Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center rounded-2xl bg-white/95 p-1 shadow-md border border-gray-200 backdrop-blur-xs text-xs font-bold text-[#222222]">
          <button
            type="button"
            onClick={() => setMapLayer('streets')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              mapLayer === 'streets'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Map
          </button>
          <button
            type="button"
            onClick={() => setMapLayer('satellite')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              mapLayer === 'satellite'
                ? 'bg-black text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Satellite
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-1.5 shadow-md border border-gray-200 backdrop-blur-xs text-xs font-semibold text-gray-700">
          <Navigation className="h-3.5 w-3.5 text-[#FF385C]" />
          <span>Real-time GPS coordinates</span>
        </div>
      </div>

      {/* Selected Listing Popup Card */}
      {activeProperty && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm rounded-3xl bg-white p-3 shadow-airbnb-modal border border-gray-200 animate-slide-up"
        >
          <button
            type="button"
            onClick={() => setActiveProperty(null)}
            className="absolute top-4 right-4 z-40 rounded-full bg-white/95 p-1.5 text-gray-700 shadow-sm hover:bg-white transition-transform active:scale-95"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3">
            <Image
              src={activeProperty.images[0]}
              alt={activeProperty.title}
              fill
              sizes="340px"
              className="object-cover"
            />
            <div className="absolute top-2 left-2 z-20">
              <FavoriteHeart propertyId={activeProperty.id} size="sm" />
            </div>
          </div>

          <div className="px-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-[#222222] truncate">
                {activeProperty.location.city}, {activeProperty.location.country}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#222222] shrink-0">
                <Star className="h-3.5 w-3.5 fill-[#222222]" />
                <span>{activeProperty.rating.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 truncate">{activeProperty.title}</p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-sm sm:text-base text-[#222222]">
                  {format(activeProperty.price)}
                </span>
                <span className="text-xs text-gray-500">/ night</span>
              </div>

              <Link
                href={`/rooms/${activeProperty.id}`}
                className="text-xs font-bold text-[#FF385C] hover:underline"
              >
                View details →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
