'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-[#222222]">Something went wrong</h2>
        <p className="text-xs text-gray-500">
          An unexpected error occurred while loading this page.
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button variant="black" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Go to home
        </Button>
      </div>
    </div>
  );
}
