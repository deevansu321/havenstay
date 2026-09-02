'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { useCurrency } from '@/context/CurrencyContext';
import { Star, Check, X, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

export function CompareModal({ isOpen, onClose, properties }: CompareModalProps) {
  const { format } = useCurrency();

  if (properties.length === 0) return null;

  const compareItems = [
    {
      label: 'Nightly Price',
      render: (p: Property) => <span className="font-extrabold text-base text-[#222222]">{format(p.price)}</span>,
    },
    {
      label: 'Rating & Reviews',
      render: (p: Property) => (
        <span className="flex items-center gap-1 font-bold text-xs text-[#222222]">
          <Star className="h-3.5 w-3.5 fill-[#222222]" />
          {p.rating.toFixed(2)} ({p.reviewsCount})
        </span>
      ),
    },
    {
      label: 'Guests Capacity',
      render: (p: Property) => <span className="text-xs text-gray-700">{p.guests} guests</span>,
    },
    {
      label: 'Bedrooms & Beds',
      render: (p: Property) => <span className="text-xs text-gray-700">{p.bedrooms} beds ({p.beds} beds)</span>,
    },
    {
      label: 'Bathrooms',
      render: (p: Property) => <span className="text-xs text-gray-700">{p.bathrooms} baths</span>,
    },
    {
      label: 'Private Pool',
      render: (p: Property) =>
        p.amenities.includes('pool') ? (
          <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
        ) : (
          <X className="h-4 w-4 text-gray-300" />
        ),
    },
    {
      label: 'Hot Tub / Jacuzzi',
      render: (p: Property) =>
        p.amenities.includes('hot-tub') ? (
          <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
        ) : (
          <X className="h-4 w-4 text-gray-300" />
        ),
    },
    {
      label: 'Self Check-in',
      render: (p: Property) =>
        p.rules.selfCheckIn ? (
          <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
        ) : (
          <X className="h-4 w-4 text-gray-300" />
        ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compare Saved Properties"
      maxWidth="2xl"
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-xs font-bold uppercase text-gray-400 w-36">Feature</th>
              {properties.slice(0, 3).map((p) => (
                <th key={p.id} className="py-3 px-4 min-w-[160px]">
                  <div className="space-y-2">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100">
                      <Image src={p.images[0]} alt={p.title} fill sizes="160px" className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#222222] line-clamp-1">{p.title}</h4>
                      <p className="text-[11px] text-gray-500">{p.location.city}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {compareItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-semibold text-gray-500">{item.label}</td>
                {properties.slice(0, 3).map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    {item.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="py-4 px-4 font-semibold text-gray-500">Action</td>
              {properties.slice(0, 3).map((p) => (
                <td key={p.id} className="py-4 px-4">
                  <Link href={`/rooms/${p.id}`} onClick={onClose}>
                    <Button variant="primary" size="sm" fullWidth rightIcon={<ArrowRight className="h-3 w-3" />}>
                      View
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
