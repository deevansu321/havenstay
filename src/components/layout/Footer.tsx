'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export function Footer() {
  const { currency, setCurrency } = useCurrency();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSection(openSection === name ? null : name);
  };

  const sections = [
    {
      title: 'Support',
      links: [
        { label: 'Help Centre', href: '#' },
        { label: 'AirCover Guarantee', href: '#' },
        { label: 'Anti-discrimination', href: '#' },
        { label: 'Disability support', href: '#' },
        { label: 'Cancellation options', href: '#' },
        { label: 'Report neighbourhood concern', href: '#' },
      ],
    },
    {
      title: 'Hosting',
      links: [
        { label: 'Airbnb your home', href: '/host' },
        { label: 'AirCover for Hosts', href: '/host' },
        { label: 'Hosting resources', href: '#' },
        { label: 'Community forum', href: '#' },
        { label: 'Hosting responsibly', href: '#' },
        { label: 'Join a free Hosting class', href: '#' },
      ],
    },
    {
      title: 'HavenStay',
      links: [
        { label: 'Newsroom', href: '#' },
        { label: 'New features', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Investors', href: '#' },
        { label: 'Gift cards', href: '#' },
        { label: 'HavenStay emergency stays', href: '#' },
      ],
    },
    {
      title: 'Explore Destinations',
      links: [
        { label: 'Goa Coastal Stays', href: '/search?location=Goa' },
        { label: 'Manali Mountain Cabins', href: '/search?location=Manali' },
        { label: 'Jaipur Royal Palaces', href: '/search?location=Jaipur' },
        { label: 'Paris Eiffel Views', href: '/search?location=Paris' },
        { label: 'Tokyo Skyline Suites', href: '/search?location=Tokyo' },
        { label: 'Bali Jungle Sanctuaries', href: '/search?location=Bali' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#F7F7F7] border-t border-gray-200 text-[#222222] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Desktop Columns / Mobile Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
          {sections.map((section) => (
            <div key={section.title} className="border-b md:border-b-0 border-gray-200 pb-4 md:pb-0">
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between font-bold text-sm text-[#222222] md:cursor-default"
              >
                <span>{section.title}</span>
                <ChevronDown
                  className={`h-4 w-4 md:hidden transition-transform ${
                    openSection === section.title ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <ul
                className={`space-y-3 mt-3 text-sm text-gray-600 ${
                  openSection === section.title ? 'block' : 'hidden md:block'
                }`}
              >
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:underline hover:text-black">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Settings */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center md:text-left">
            <span>© 2026 HavenStay, Inc.</span>
            <span>·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Company details</Link>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:underline text-[#222222]"
            >
              <Globe className="h-4 w-4" />
              <span>English (IN)</span>
            </button>

            <button
              type="button"
              className="hover:underline text-[#222222]"
              onClick={() => {
                const nextCurr = currency === 'INR' ? 'USD' : currency === 'USD' ? 'EUR' : 'INR';
                setCurrency(nextCurr);
              }}
            >
              {currency === 'INR' ? '₹ INR' : currency === 'USD' ? '$ USD' : '€ EUR'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
