'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import type { GrantsData } from '@/types';

export function ImpactSummary() {
  const [data, setData] = useState<GrantsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/grants', { signal: AbortSignal.timeout(20000) });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Failed to fetch impact data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded mb-2"></div>
              <div className="h-6 bg-white/20 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded mb-2"></div>
              <div className="h-6 bg-white/20 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded mb-2"></div>
              <div className="h-6 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return (
    <section className="bg-blue-600 text-white py-12 text-center px-4">
      <h2 className="text-3xl font-bold mb-3">Our Impact</h2>
      <p>Our grant totals are temporarily unavailable. Please check back soon.</p>
      <Link href="/impact" className="inline-block mt-4 underline">View our impact page →</Link>
    </section>
  );

  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-playfair mb-2">Our Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center text-white">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter
                value={data.totals.dollars}
                format="currency"
              />
            </div>
            <div className="text-lg font-semibold">Total Awarded</div>
          </div>

          <div className="text-center text-white">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter
                value={data.totals.goodDays}
                format="number"
              />
            </div>
            <div className="text-lg font-semibold">Estimated Good Days</div>
          </div>

          <div className="text-center text-white">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter
                value={data.totals.awards}
                format="number"
              />
            </div>
            <div className="text-lg font-semibold">Grants Awarded</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/impact"
            className="inline-flex items-center text-white/90 hover:text-white font-medium transition-colors"
          >
            See detailed impact data →
          </Link>
        </div>
      </div>
    </section>
  );
}
