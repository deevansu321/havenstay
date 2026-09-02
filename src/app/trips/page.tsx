'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatDateRange } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Modal } from '@/components/common/Modal';
import { Briefcase, MessageSquare, MapPin, Download, AlertTriangle } from 'lucide-react';

export default function TripsPage() {
  const { trips, cancelBooking } = useBooking();
  const { format } = useCurrency();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [cancellingTripId, setCancellingTripId] = useState<string | null>(null);

  const filteredTrips = trips.filter((t) => t.status === activeTab);

  const handleConfirmCancel = () => {
    if (cancellingTripId) {
      cancelBooking(cancellingTripId);
      setCancellingTripId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#222222] tracking-tight">Trips</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your upcoming stays and past travel memories.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'border-black text-[#222222]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Upcoming stays ({trips.filter((t) => t.status === 'upcoming').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'past'
              ? 'border-black text-[#222222]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Past reservations ({trips.filter((t) => t.status === 'past').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cancelled')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'cancelled'
              ? 'border-black text-[#222222]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Cancelled ({trips.filter((t) => t.status === 'cancelled').length})
        </button>
      </div>

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="flex flex-col sm:flex-row gap-5 rounded-3xl border border-gray-200 p-5 bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 sm:h-auto sm:w-48 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={trip.property.image}
                  alt={trip.property.title}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FF385C] uppercase tracking-wider">
                      {trip.status === 'upcoming' ? 'Confirmed' : trip.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                    </span>
                    <span className="text-xs font-mono text-gray-400">#{trip.confirmationCode}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#222222] line-clamp-1">
                    {trip.property.title}
                  </h3>
                  <p className="text-xs text-gray-500">{trip.property.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-gray-100">
                  <div>
                    <span className="text-gray-400 block">Dates</span>
                    <span className="font-semibold text-[#222222]">
                      {formatDateRange(trip.checkIn, trip.checkOut)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total paid</span>
                    <span className="font-semibold text-[#222222]">
                      {format(trip.pricing.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link href="/messages" className="flex-1">
                    <Button variant="outline" size="sm" fullWidth leftIcon={<MessageSquare className="h-3.5 w-3.5" />}>
                      Message host
                    </Button>
                  </Link>

                  {trip.status === 'upcoming' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCancellingTripId(trip.id)}
                      className="text-red-600 hover:bg-red-50 text-xs"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Briefcase className="h-10 w-10" />}
          title={`No ${activeTab} trips`}
          description={
            activeTab === 'upcoming'
              ? 'Time to dust off your bags and start planning your next great getaway.'
              : 'Your travel history will appear here once you complete reservations.'
          }
          actionText="Start exploring"
          actionHref="/"
        />
      )}

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={!!cancellingTripId}
        onClose={() => setCancellingTripId(null)}
        title="Cancel Reservation"
        maxWidth="sm"
      >
        <div className="space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#222222]">Are you sure you want to cancel?</h3>
          <p className="text-xs text-gray-500">
            Based on the host’s cancellation policy, you are eligible for a full refund back to your original payment method.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => setCancellingTripId(null)}
            >
              Keep reservation
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleConfirmCancel}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
