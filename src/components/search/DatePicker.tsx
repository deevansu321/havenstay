'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface DatePickerProps {
  checkIn?: string;
  checkOut?: string;
  onChange: (checkIn: string, checkOut: string) => void;
  minDate?: Date;
  isSingleMonthMobile?: boolean;
}

export function DatePicker({
  checkIn,
  checkOut,
  onChange,
  minDate = new Date(),
  isSingleMonthMobile = true,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (checkIn) return new Date(checkIn);
    return new Date();
  });
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  // Month navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const now = new Date();
    if (prev.getMonth() >= now.getMonth() || prev.getFullYear() > now.getFullYear()) {
      setCurrentMonth(prev);
    }
  };

  const handleDateClick = (dateStr: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      // First click: set check-in, clear check-out
      onChange(dateStr, '');
    } else if (checkIn && !checkOut) {
      // Second click
      const selected = new Date(dateStr);
      const start = new Date(checkIn);
      if (selected < start) {
        // Clicked before check-in, replace check-in
        onChange(dateStr, '');
      } else {
        onChange(checkIn, dateStr);
      }
    }
  };

  const isPast = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const formatISO = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderMonth = (monthOffset: number = 0) => {
    const target = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = target.getFullYear();
    const month = target.getMonth();

    const monthName = target.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateStr = formatISO(dateObj);
      const disabled = isPast(dateObj);

      const isSelectedStart = checkIn === dateStr;
      const isSelectedEnd = checkOut === dateStr;
      const isInRange =
        checkInDate &&
        checkOutDate &&
        dateObj > checkInDate &&
        dateObj < checkOutDate;
      const isInHoverRange =
        checkInDate &&
        !checkOutDate &&
        hoverDate &&
        dateObj > checkInDate &&
        dateObj <= new Date(hoverDate);

      let dayClasses = 'h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all relative z-10 ';

      if (disabled) {
        dayClasses += 'text-gray-300 cursor-not-allowed line-through ';
      } else if (isSelectedStart || isSelectedEnd) {
        dayClasses += 'bg-[#222222] text-white font-bold scale-105 shadow-xs ';
      } else if (isInRange || isInHoverRange) {
        dayClasses += 'text-[#222222] hover:bg-gray-200 ';
      } else {
        dayClasses += 'text-gray-800 hover:border hover:border-black cursor-pointer ';
      }

      days.push(
        <div
          key={dateStr}
          className="relative flex items-center justify-center p-0.5"
          onMouseEnter={() => !disabled && setHoverDate(dateStr)}
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* Background range strip */}
          {(isInRange || isInHoverRange) && (
            <div
              className={`absolute inset-y-0.5 bg-gray-100/90 z-0 ${
                isSelectedStart ? 'left-1/2 right-0' : isSelectedEnd ? 'left-0 right-1/2' : 'inset-x-0'
              }`}
            />
          )}

          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && handleDateClick(dateStr)}
            className={dayClasses}
          >
            {day}
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full max-w-[320px]">
        <div className="text-center font-bold text-sm text-[#222222] mb-3">
          {monthName}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1">{days}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 bg-white select-none">
      {/* Navigation and Clear Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full border border-gray-200 hover:border-black transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full border border-gray-200 hover:border-black transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {(checkIn || checkOut) && (
          <button
            type="button"
            onClick={() => onChange('', '')}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black underline underline-offset-4"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear dates
          </button>
        )}
      </div>

      {/* Dual calendar on desktop, single on mobile */}
      <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
        {renderMonth(0)}
        <div className={isSingleMonthMobile ? 'hidden sm:block' : 'block'}>
          {renderMonth(1)}
        </div>
      </div>
    </div>
  );
}
