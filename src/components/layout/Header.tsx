'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { CompactSearchBar } from '@/components/search/CompactSearchBar';
import { HeroSearchBar } from '@/components/search/HeroSearchBar';
import { MobileSearchModal } from '@/components/search/MobileSearchModal';
import { AiTripPlannerModal } from '@/components/ai/AiTripPlannerModal';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Globe,
  Menu,
  User as UserIcon,
  Heart,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Search,
  PlusCircle,
  X,
} from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, openAuthModal, logout, switchDemoUser } = useAuth();
  const { currency, setCurrency } = useCurrency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isExpandedSearchOpen, setIsExpandedSearchOpen] = useState(false);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);

  const isCheckoutPage = pathname.startsWith('/reserve/') || pathname.startsWith('/host/create');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown menu and search overlay on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        isExpandedSearchOpen &&
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(e.target as Node)
      ) {
        setIsExpandedSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpandedSearchOpen]);

  const currencies: { code: 'INR' | 'USD' | 'EUR' | 'GBP'; name: string; symbol: string }[] = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  if (isCheckoutPage) {
    return (
      <header className="sticky top-0 z-40 w-full h-16 sm:h-20 bg-white border-b border-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-16 sm:h-20 bg-white border-b border-gray-100 flex items-center transition-shadow duration-200 ${
          isScrolled ? 'shadow-xs' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Desktop Logo */}
          <div className="hidden md:flex items-center shrink-0">
            <Logo />
          </div>

          {/* Desktop Center Compact Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl px-2">
            <CompactSearchBar
              onClick={() => setIsExpandedSearchOpen(true)}
            />
          </div>

          {/* Mobile App-Style Floating Search Pill */}
          <div className="flex md:hidden items-center flex-1 gap-2 py-1">
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(true)}
              className="flex-1 flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-white py-1.5 px-2.5 shadow-airbnb-search text-left active:scale-98 transition-transform"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-[#FF385C] to-[#E00B41] text-white shrink-0 shadow-2xs">
                <Search className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-[#222222] block leading-tight">Where to?</span>
                <span className="text-[10px] text-gray-500 font-medium block truncate">Anywhere · Any week · Guests</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsAiPlannerOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-rose-50 to-purple-50 border border-purple-200 text-[#FF385C] shadow-2xs shrink-0 active:scale-90 transition-transform"
              aria-label="AI Planner"
              title="Plan with AI"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsCurrencyModalOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs shrink-0 active:scale-90 transition-transform"
              aria-label="Currency & Language"
            >
              <Globe className="h-4 w-4" />
            </button>
          </div>

          {/* Right Menu Controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsAiPlannerOpen(true)}
              className="flex items-center gap-1.5 rounded-full py-1.5 px-3 text-xs font-bold text-white bg-linear-to-r from-[#FF385C] via-purple-600 to-indigo-600 shadow-xs hover:shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Plan with AI</span>
            </button>

            <Link
              href="/host"
              className="hidden lg:flex items-center gap-1.5 rounded-full py-2 px-3.5 text-xs font-semibold text-[#222222] hover:bg-gray-100 transition-colors"
            >
              <span>Become a host</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsCurrencyModalOpen(true)}
              className="flex items-center gap-1 rounded-full p-2.5 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
              aria-label="Currency and Language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold uppercase">{currency}</span>
            </button>

            {/* User Dropdown Menu Button */}
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-gray-300 py-1.5 pl-3 pr-1.5 hover:shadow-airbnb-search transition-all cursor-pointer select-none"
                aria-label="User navigation menu"
              >
                <Menu className="h-4 w-4 text-gray-700 stroke-[2.5]" />
                <div className="relative h-7 w-7 rounded-full bg-gray-600 text-white flex items-center justify-center overflow-hidden">
                  {isAuthenticated && user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Dropdown Menu Box */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white py-2 shadow-airbnb-modal border border-gray-100 animate-popover z-50 text-sm text-[#222222]">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-bold text-sm truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/messages"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 font-medium"
                        >
                          <span className="flex items-center gap-2.5">
                            <MessageSquare className="h-4 w-4 text-gray-600" />
                            Messages
                          </span>
                          <span className="h-2 w-2 rounded-full bg-[#FF385C]" />
                        </Link>

                        <Link
                          href="/trips"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 font-medium"
                        >
                          <Briefcase className="h-4 w-4 text-gray-600" />
                          Trips
                        </Link>

                        <Link
                          href="/wishlists"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 font-medium"
                        >
                          <Heart className="h-4 w-4 text-gray-600" />
                          Wishlists
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <Link
                          href="/host"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50"
                        >
                          <PlusCircle className="h-4 w-4 text-gray-600" />
                          Host an experience
                        </Link>
                        <Link
                          href="/account"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50"
                        >
                          <UserIcon className="h-4 w-4 text-gray-600" />
                          Account & Profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50"
                        >
                          <Settings className="h-4 w-4 text-gray-600" />
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          type="button"
                          onClick={() => {
                            switchDemoUser(user?.isSuperhost ? 'guest' : 'host');
                            setIsMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 px-4 py-2 hover:bg-gray-50 text-xs font-semibold text-[#FF385C]"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Switch to {user?.isSuperhost ? 'Guest' : 'Superhost'} Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 px-4 py-2 hover:bg-gray-50 text-xs text-gray-600"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          openAuthModal('register');
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2.5 font-bold hover:bg-gray-50 text-left"
                      >
                        Sign up
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          openAuthModal('login');
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2.5 hover:bg-gray-50 text-left"
                      >
                        Log in
                      </button>
                      <div className="border-t border-gray-100 my-1" />
                      <Link
                        href="/host"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex w-full items-center px-4 py-2.5 hover:bg-gray-50 text-left"
                      >
                        Become a host
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          switchDemoUser('guest');
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-xs font-semibold text-[#FF385C]"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Instant Guest Login</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Expanded Floating Search Overlay for Desktop */}
      {isExpandedSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col items-center pt-8 px-4 animate-fade-in">
          <div
            ref={searchOverlayRef}
            className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-airbnb-modal border border-gray-100 space-y-4 animate-popover"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Search HavenStay
              </span>
              <button
                type="button"
                onClick={() => setIsExpandedSearchOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black"
                aria-label="Close search overlay"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <HeroSearchBar />
          </div>
        </div>
      )}

      {/* Currency & Language Selection Modal */}
      <Modal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        title="Currency & Language"
        maxWidth="md"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-sm text-[#222222] mb-3">Choose a currency</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => {
                    setCurrency(curr.code);
                    setIsCurrencyModalOpen(false);
                  }}
                  className={`flex flex-col p-3 rounded-2xl border text-left transition-all ${
                    currency === curr.code
                      ? 'border-black bg-gray-50 ring-1 ring-black'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  <span className="font-bold text-sm text-[#222222]">{curr.name}</span>
                  <span className="text-xs text-gray-500">
                    {curr.code} – {curr.symbol}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Mobile Search Modal */}
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      {/* AI Trip Planner Modal */}
      <AiTripPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
      />
    </>
  );
}
