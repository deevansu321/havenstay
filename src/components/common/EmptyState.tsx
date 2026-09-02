import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto animate-fade-in">
      {icon && (
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-[#FF385C]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-[#222222] mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
      {actionText && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="black">{actionText}</Button>
            </Link>
          ) : (
            <Button variant="black" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
