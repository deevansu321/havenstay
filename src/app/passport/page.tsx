'use client';

import React from 'react';
import { TravelPassport } from '@/components/account/TravelPassport';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PassportPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#222222] hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Account</span>
      </Link>

      <TravelPassport />
    </div>
  );
}
