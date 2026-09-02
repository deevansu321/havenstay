import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; locale: string }> = {
  INR: { symbol: '₹', rate: 1, locale: 'en-IN' },
  USD: { symbol: '$', rate: 0.012, locale: 'en-US' },
  EUR: { symbol: '€', rate: 0.011, locale: 'de-DE' },
  GBP: { symbol: '£', rate: 0.0095, locale: 'en-GB' },
};

export function formatPrice(amountInINR: number, currency: Currency = 'INR'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = Math.round(amountInINR * config.rate);

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

export function formatPriceShort(amountInINR: number, currency: Currency = 'INR'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = Math.round(amountInINR * config.rate);
  return `${config.symbol}${new Intl.NumberFormat(config.locale).format(converted)}`;
}

export function formatDateRange(checkIn?: string, checkOut?: string): string {
  if (!checkIn && !checkOut) return 'Add dates';
  if (checkIn && !checkOut) {
    const d = new Date(checkIn);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (checkIn && checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    if (d1.getMonth() === d2.getMonth()) {
      return `${d1.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${d2.getDate()}`;
    }
    return `${d1.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${d2.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }
  return 'Add dates';
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

export function calculatePricingBreakdown(nightlyRate: number, nights: number) {
  const nightsTotal = nightlyRate * nights;
  const cleaningFee = Math.round(nightlyRate * 0.15); // ~15% or fixed base
  const serviceFee = Math.round(nightsTotal * 0.14);  // 14% platform service fee
  const taxes = Math.round((nightsTotal + serviceFee) * 0.18); // 18% GST in India
  const totalPrice = nightsTotal + cleaningFee + serviceFee + taxes;

  return {
    nightlyRate,
    nights,
    nightsTotal,
    cleaningFee,
    serviceFee,
    taxes,
    totalPrice,
  };
}
