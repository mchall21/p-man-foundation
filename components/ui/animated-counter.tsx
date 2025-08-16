'use client';

import { useEffect, useRef, useState } from 'react';
import { animateNumber, formatCurrency, formatNumber } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  format?: 'number' | 'currency' | 'decimal';
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  format = 'number',
  decimals = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateNumber(0, value, duration, setDisplayValue);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formatValue = (val: number): string => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'decimal':
        return val.toFixed(decimals);
      case 'number':
      default:
        return formatNumber(val);
    }
  };

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
}

interface MetricCounterProps {
  title: string;
  value: number;
  format?: 'number' | 'currency' | 'decimal';
  decimals?: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  className?: string;
}

export function MetricCounter({
  title,
  value,
  format = 'number',
  decimals = 0,
  prefix = '',
  suffix = '',
  description,
  className = ''
}: MetricCounterProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
        <AnimatedCounter 
          value={value}
          format={format}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-1">
        {title}
      </div>
      {description && (
        <div className="text-sm text-gray-500">
          {description}
        </div>
      )}
    </div>
  );
}