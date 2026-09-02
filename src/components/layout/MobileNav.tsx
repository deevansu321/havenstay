'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart, Briefcase, MessageSquare, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

export function MobileNav() {
  const pathname = usePathname();
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const { wishlistIds } = useWishlist();
  const wishlistCount = wishlistIds ? wishlistIds.length : 0;

  // Hide mobile nav on checkout, create wizard, or room detail pages (room page uses MobileReserveBar)
  if (
    pathname.startsWith('/reserve') ||
    pathname.startsWith('/host/create') ||
    pathname.startsWith('/rooms/')
  ) {
    return null;
  }

  const navItems = [
    { label: 'Explore', href: '/', icon: Compass },
    { label: 'Wishlists', href: '/wishlists', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : undefined },
    { label: 'Trips', href: '/trips', icon: Briefcase },
    { label: 'Messages', href: '/messages', icon: MessageSquare },
    {
      label: isAuthenticated ? (user?.name?.split(' ')[0] || 'Profile') : 'Log in',
      href: isAuthenticated ? '/account' : '#',
      icon: UserIcon,
      onClick: isAuthenticated ? undefined : () => openAuthModal('login'),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 pt-2 pb-3 px-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="group flex flex-col items-center gap-0.5 py-1 px-3 text-gray-500 hover:text-black transition-all active:scale-90"
              >
                <div className="relative">
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </div>
                <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex flex-col items-center gap-0.5 py-1 px-3 transition-all active:scale-90 ${
                isActive
                  ? 'text-[#FF385C] font-bold'
                  : 'text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'stroke-[2.5] scale-105' : 'stroke-[1.8] group-hover:scale-110'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF385C] px-1 text-[9px] font-bold text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#FF385C]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
