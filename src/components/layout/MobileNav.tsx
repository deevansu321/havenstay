'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, Briefcase, MessageSquare, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function MobileNav() {
  const pathname = usePathname();
  const { isAuthenticated, openAuthModal } = useAuth();

  // Hide mobile nav on checkout, create wizard, or room detail pages (room page uses MobileReserveBar)
  if (
    pathname.startsWith('/reserve') ||
    pathname.startsWith('/host/create') ||
    pathname.startsWith('/rooms/')
  ) {
    return null;
  }

  const navItems = [
    { label: 'Explore', href: '/', icon: <Search className="h-5 w-5" /> },
    { label: 'Wishlists', href: '/wishlists', icon: <Heart className="h-5 w-5" /> },
    { label: 'Trips', href: '/trips', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Messages', href: '/messages', icon: <MessageSquare className="h-5 w-5" /> },
    {
      label: isAuthenticated ? 'Profile' : 'Log in',
      href: isAuthenticated ? '/account' : '#',
      icon: <UserIcon className="h-5 w-5" />,
      onClick: isAuthenticated ? undefined : () => openAuthModal('login'),
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-4 md:hidden shadow-lg pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-center gap-1 text-gray-500 hover:text-black transition-colors"
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-[#FF385C] font-semibold' : 'text-gray-500 hover:text-black'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
