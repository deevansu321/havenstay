'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import {
  User,
  ShieldCheck,
  Star,
  Calendar,
  Heart,
  Briefcase,
  Settings,
  Edit3,
  Award,
  Sparkles,
} from 'lucide-react';

export default function AccountPage() {
  const { user, isAuthenticated, openAuthModal, updateUserProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-[#FF385C] mx-auto">
          <User className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#222222]">Account & Profile</h1>
        <p className="text-xs text-gray-500">Log in to view and manage your profile and bookings.</p>
        <Button variant="primary" size="md" onClick={() => openAuthModal('login')}>
          Log in or sign up
        </Button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone });
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-24 md:pb-10">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#222222] tracking-tight">Account</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {user?.name} · <span className="font-medium text-black">{user?.email}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Profile Card */}
        <div className="md:col-span-4 rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shadow-sm">
              <Image
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                alt={user?.name || 'User'}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#222222]">{user?.name}</h3>
              <span className="text-xs text-gray-500 font-semibold">
                {user?.isSuperhost ? 'Superhost & Verified Guest' : 'Guest'}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit3 className="h-3.5 w-3.5" />}
              onClick={() => {
                setName(user?.name || '');
                setPhone(user?.phone || '');
                setIsEditModalOpen(true);
              }}
              className="rounded-xl w-full text-xs"
            >
              Edit Profile
            </Button>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-gray-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Identity Verified</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <Star className="h-4 w-4 text-[#FF385C] shrink-0" />
              <span>{user?.reviewsCount || 12} Guest Reviews</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
              <span>Joined {user?.joinedDate || 'March 2023'}</span>
            </div>
          </div>
        </div>

        {/* Right Shortcuts Grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/trips"
            className="flex items-start gap-4 p-5 rounded-3xl border border-gray-200 bg-white hover:shadow-airbnb-card hover:border-black transition-all group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#FF385C] shrink-0 group-hover:scale-110 transition-transform">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#222222]">Your Trips</h3>
              <p className="text-xs text-gray-500">Manage reservations, view receipts and check-in codes.</p>
            </div>
          </Link>

          <Link
            href="/wishlists"
            className="flex items-start gap-4 p-5 rounded-3xl border border-gray-200 bg-white hover:shadow-airbnb-card hover:border-black transition-all group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-rose-50 text-[#FF385C] shrink-0 group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#222222]">Wishlists</h3>
              <p className="text-xs text-gray-500">View saved dream stays and custom collections.</p>
            </div>
          </Link>

          <Link
            href="/passport"
            className="flex items-start gap-4 p-5 rounded-3xl border border-gray-200 bg-white hover:shadow-airbnb-card hover:border-black transition-all group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#222222]">Travel Passport & Stamps</h3>
              <p className="text-xs text-gray-500">Collect verified stamps, unlock loyalty tiers & rewards.</p>
            </div>
          </Link>

          <Link
            href="/settings"
            className="flex items-start gap-4 p-5 rounded-3xl border border-gray-200 bg-white hover:shadow-airbnb-card hover:border-black transition-all group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 shrink-0 group-hover:scale-110 transition-transform">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#222222]">Preferences & Currency</h3>
              <p className="text-xs text-gray-500">Currency switcher, languages, and notifications.</p>
            </div>
          </Link>

          <Link
            href="/host"
            className="flex items-start gap-4 p-5 rounded-3xl border border-gray-200 bg-white hover:shadow-airbnb-card hover:border-black transition-all group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-[#222222]">Host Dashboard</h3>
              <p className="text-xs text-gray-500">Manage listings, calculate revenue, and check AirCover.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        maxWidth="sm"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 p-2.5 text-xs sm:text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-gray-300 p-2.5 text-xs sm:text-sm focus:border-black focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="black" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
