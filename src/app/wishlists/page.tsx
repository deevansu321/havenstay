'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { CompareModal } from '@/components/wishlist/CompareModal';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Heart, Plus, FolderHeart, Scale } from 'lucide-react';

export default function WishlistsPage() {
  const { wishlistIds, collections, createCollection } = useWishlist();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');

  const savedProperties = PROPERTIES.filter((p) => wishlistIds.includes(p.id));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (collectionName.trim()) {
      createCollection(collectionName.trim());
      setCollectionName('');
      setIsCreateModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight">Wishlists</h1>
          <p className="text-sm text-gray-500 mt-1">Your curated collections of favorite stays.</p>
        </div>

        <div className="flex items-center gap-3">
          {savedProperties.length >= 2 && (
            <Button
              variant="outline"
              size="md"
              leftIcon={<Scale className="h-4 w-4 text-[#FF385C]" />}
              onClick={() => setIsCompareModalOpen(true)}
              className="rounded-xl"
            >
              Compare stays ({savedProperties.length})
            </Button>
          )}

          <Button
            variant="black"
            size="md"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-xl"
          >
            Create new wishlist
          </Button>
        </div>
      </div>

      {/* Collections Grid Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {collections.map((col) => {
          const count = col.id === 'col-favorites' ? wishlistIds.length : col.propertyIds.length;
          return (
            <div
              key={col.id}
              className="group flex flex-col gap-3 rounded-3xl border border-gray-200 p-4 bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100">
                {col.coverImage ? (
                  <Image
                    src={col.coverImage}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <FolderHeart className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="px-1">
                <h3 className="font-bold text-base text-[#222222] group-hover:text-[#FF385C] transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-gray-500">{count} saved {count === 1 ? 'place' : 'places'}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* All Saved Properties Grid */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#222222]">Saved Homes ({savedProperties.length})</h2>
          {savedProperties.length >= 2 && (
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="text-xs font-bold text-[#FF385C] hover:underline flex items-center gap-1"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Compare side-by-side</span>
            </button>
          )}
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart className="h-10 w-10" />}
            title="Your wishlist is empty"
            description="As you search, tap the heart icon on any stay to save your favorite destinations here."
            actionText="Start exploring"
            actionHref="/"
          />
        )}
      </div>

      {/* Create Collection Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Name this wishlist"
        maxWidth="sm"
      >
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="e.g. Summer in Greece 2026"
              maxLength={50}
              required
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-black focus:outline-hidden"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">50 characters max</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="black">
              Create
            </Button>
          </div>
        </form>
      </Modal>

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        properties={savedProperties}
      />
    </div>
  );
}
