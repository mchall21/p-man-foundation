'use client';

import { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  format?: 'number' | 'currency' | 'decimal';
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, format = 'number', decimals = 0, duration = 1000, prefix = '', suffix = '', className = '' }: AnimatedCounterProps) {
  const element = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    setDisplayValue(value);
    if (!element.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplayValue(progress === 1 ? value : value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);
  const renderNumber = (number: number) => format === 'currency' ? formatCurrency(number) : format === 'decimal' ? number.toFixed(decimals) : Math.round(number).toLocaleString('en-US');
  return <span ref={element} className={`tabular-nums ${className}`}><span className="sr-only">{prefix}{renderNumber(value)}{suffix}</span><span aria-hidden="true">{prefix}{renderNumber(displayValue)}{suffix}</span></span>;
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