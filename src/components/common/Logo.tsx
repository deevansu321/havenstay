import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 text-[#FF385C] transition-transform duration-200 active:scale-95 ${className}`}
      aria-label="Haven Stay Home"
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="h-8 w-8 text-[#FF385C] transition-transform group-hover:scale-105"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 1C10.5 1 6 5.5 6 11c0 5 4.1 11.1 9.2 18.7.4.6 1.2.6 1.6 0C21.9 22.1 26 16 26 11c0-5.5-4.5-10-10-10zm0 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
          <path
            d="M16 4.5C12.4 4.5 9.5 7.4 9.5 11c0 4.1 3.5 9.3 6.5 14.1 3-4.8 6.5-10 6.5-14.1 0-3.6-2.9-6.5-6.5-6.5zm0 9c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
            fill="#FFFFFF"
          />
          <circle cx="16" cy="11" r="2" fill="#FF385C" />
        </svg>
      </div>
      <span className="hidden font-extrabold tracking-tight text-[#FF385C] text-xl sm:inline-block font-sans">
        haven<span className="text-[#222222]">stay</span>
      </span>
    </Link>
  );
}
