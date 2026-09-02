'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg',
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-3xl',
    full: 'max-w-5xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full ${maxWidthClasses} max-h-[94vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white shadow-airbnb-modal animate-slide-up overflow-hidden`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 shrink-0">
          {showCloseButton ? (
            <button
              onClick={onClose}
              className="rounded-full p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-hidden"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <div className="w-8" />
          )}

          {title && (
            <h3 className="font-bold text-sm sm:text-base text-[#222222] text-center flex-1 px-2 truncate">
              {title}
            </h3>
          )}

          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
