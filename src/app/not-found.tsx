import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-[#FF385C]">
        <Compass className="h-10 w-10 animate-spin-slow" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-black text-[#222222]">404</h1>
        <h2 className="text-xl font-bold text-[#222222]">We can’t seem to find the page you’re looking for.</h2>
        <p className="text-xs text-gray-500">
          Here are some helpful links instead:
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link href="/">
          <Button variant="black" size="md">
            Go to Homepage
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" size="md">
            Explore Stays
          </Button>
        </Link>
      </div>
    </div>
  );
}
