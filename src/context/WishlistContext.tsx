'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistCollection } from '@/lib/types';
import { PROPERTIES } from '@/data/properties';

interface WishlistContextType {
  wishlistIds: string[];
  collections: WishlistCollection[];
  toggleWishlist: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;
  createCollection: (name: string, propertyId?: string) => void;
  removeFromWishlist: (propertyId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const DEFAULT_COLLECTION: WishlistCollection = {
  id: 'col-favorites',
  name: 'My Favorites',
  propertyIds: ['prop-1', 'prop-4', 'prop-7'],
  coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  createdAt: '2026-08-01',
};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<WishlistCollection[]>([DEFAULT_COLLECTION]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prop-1', 'prop-4', 'prop-7']);

  useEffect(() => {
    try {
      const savedIds = localStorage.getItem('airbnb_wishlist_ids');
      if (savedIds) {
        setWishlistIds(JSON.parse(savedIds));
      }
      const savedCollections = localStorage.getItem('airbnb_wishlist_collections');
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = (ids: string[], cols: WishlistCollection[]) => {
    try {
      localStorage.setItem('airbnb_wishlist_ids', JSON.stringify(ids));
      localStorage.setItem('airbnb_wishlist_collections', JSON.stringify(cols));
    } catch {
      // ignore
    }
  };

  const isWishlisted = (propertyId: string) => wishlistIds.includes(propertyId);

  const toggleWishlist = (propertyId: string) => {
    let newIds: string[];
    if (wishlistIds.includes(propertyId)) {
      newIds = wishlistIds.filter((id) => id !== propertyId);
    } else {
      newIds = [...wishlistIds, propertyId];
    }
    setWishlistIds(newIds);

    // Update default collection
    const updatedCollections = collections.map((col) => {
      if (col.id === 'col-favorites') {
        return {
          ...col,
          propertyIds: newIds,
          coverImage: newIds.length > 0 
            ? PROPERTIES.find((p) => p.id === newIds[newIds.length - 1])?.images[0] || col.coverImage
            : col.coverImage
        };
      }
      return col;
    });

    setCollections(updatedCollections);
    saveToStorage(newIds, updatedCollections);
  };

  const removeFromWishlist = (propertyId: string) => {
    const newIds = wishlistIds.filter((id) => id !== propertyId);
    setWishlistIds(newIds);
    const updatedCollections = collections.map((col) => ({
      ...col,
      propertyIds: col.propertyIds.filter((id) => id !== propertyId),
    }));
    setCollections(updatedCollections);
    saveToStorage(newIds, updatedCollections);
  };

  const createCollection = (name: string, propertyId?: string) => {
    const newId = `col-${Date.now()}`;
    const initialProps = propertyId ? [propertyId] : [];
    const cover = propertyId 
      ? PROPERTIES.find((p) => p.id === propertyId)?.images[0] 
      : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';

    const newCol: WishlistCollection = {
      id: newId,
      name,
      propertyIds: initialProps,
      coverImage: cover,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = [...collections, newCol];
    setCollections(updated);
    saveToStorage(wishlistIds, updated);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        collections,
        toggleWishlist,
        isWishlisted,
        createCollection,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
