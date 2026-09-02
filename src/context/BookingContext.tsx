'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking } from '@/lib/types';
import { INITIAL_TRIPS } from '@/data/trips';

interface BookingContextType {
  trips: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  getBookingById: (bookingId: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Booking[]>(INITIAL_TRIPS);

  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem('airbnb_trips');
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveTrips = (nextTrips: Booking[]) => {
    setTrips(nextTrips);
    try {
      localStorage.setItem('airbnb_trips', JSON.stringify(nextTrips));
    } catch {
      // ignore
    }
  };

  const addBooking = (booking: Booking) => {
    const nextTrips = [booking, ...trips];
    saveTrips(nextTrips);
  };

  const cancelBooking = (bookingId: string) => {
    const nextTrips = trips.map((trip) =>
      trip.id === bookingId ? { ...trip, status: 'cancelled' as const } : trip
    );
    saveTrips(nextTrips);
  };

  const getBookingById = (bookingId: string) => {
    return trips.find((t) => t.id === bookingId);
  };

  return (
    <BookingContext.Provider value={{ trips, addBooking, cancelBooking, getBookingById }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
