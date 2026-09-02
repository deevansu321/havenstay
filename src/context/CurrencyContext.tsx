'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/lib/types';
import { formatPrice, formatPriceShort, CURRENCY_RATES } from '@/lib/utils';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountInINR: number) => string;
  formatShort: (amountInINR: number) => string;
  showTaxes: boolean;
  setShowTaxes: (show: boolean) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [showTaxes, setShowTaxesState] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('airbnb_currency');
      if (saved && ['INR', 'USD', 'EUR', 'GBP'].includes(saved)) {
        setCurrencyState(saved as Currency);
      }
      const savedTaxes = localStorage.getItem('airbnb_show_taxes');
      if (savedTaxes !== null) {
        setShowTaxesState(savedTaxes === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('airbnb_currency', c);
    } catch {
      // ignore
    }
  };

  const setShowTaxes = (show: boolean) => {
    setShowTaxesState(show);
    try {
      localStorage.setItem('airbnb_show_taxes', String(show));
    } catch {
      // ignore
    }
  };

  const format = (amountInINR: number) => {
    const finalAmount = showTaxes ? Math.round(amountInINR * 1.18) : amountInINR;
    return formatPrice(finalAmount, currency);
  };

  const formatShort = (amountInINR: number) => {
    const finalAmount = showTaxes ? Math.round(amountInINR * 1.18) : amountInINR;
    return formatPriceShort(finalAmount, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, formatShort, showTaxes, setShowTaxes }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
