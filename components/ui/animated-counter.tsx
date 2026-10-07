'use client';

import { formatCurrency, formatNumber } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  format?: 'number' | 'currency' | 'decimal';
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, format = 'number', decimals = 0, prefix = '', suffix = '', className = '' }: AnimatedCounterProps) {
  // Render the actual figure immediately, including for reduced-motion users.
  const formatted = format === 'currency' ? formatCurrency(value) : format === 'decimal' ? value.toFixed(decimals) : formatNumber(value);
  return <span className={className}>{prefix}{formatted}{suffix}</span>;
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