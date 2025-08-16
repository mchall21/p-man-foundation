'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCounter } from '@/components/ui/animated-counter';
import { GoodDaysByYearChart, ActivityMixChart, TopProducersChart, CostStats } from '@/components/ui/charts';
import { GrantStoryGrid, GrantDetailModal } from '@/components/ui/grant-cards';
import { EXTERNAL_LINKS } from '@/lib/constants';
import type { GrantsData } from '@/types';

export default function ImpactPage() {
  const [data, setData] = useState<GrantsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<GrantsData['top'][0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/grants');
        if (!response.ok) {
          throw new Error('Failed to fetch grants data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleGrantClick = (grant: GrantsData['top'][0]) => {
    setSelectedGrant(grant);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Impact</h1>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600">Loading impact data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Impact</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">
            {error || 'Failed to load impact data. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Impact</h1>
      
      {/* Intro Block */}
      <div className="prose prose-lg max-w-4xl mb-12">
        <p className="text-xl text-gray-700 leading-relaxed">
          We fund small, practical grants that create sober social activities. Those days stack up. 
          With modest dollars and repeatable programs, we turn ordinary meetups — rides, hikes, 
          open mics, gym nights — into <strong>one more good day</strong> after another.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Link
          href="/donate"
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
        >
          Donate
        </Link>
        <Link
          href="/grants"
          className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors text-center"
        >
          Apply
        </Link>
      </div>

      {/* At-a-glance Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <MetricCounter
          title="Total Granted"
          value={data.totals.dollars}
          format="currency"
          description="to date"
        />
        <MetricCounter
          title="Good Days Created"
          value={data.totals.goodDays}
          format="number"
          description="estimated participant-days"
        />
        <MetricCounter
          title="Cost per Good Day"
          value={data.totals.costPerGD}
          format="decimal"
          decimals={1}
          prefix="$"
          description="average across all grants"
        />
      </div>

      {/* Data timestamp */}
      <div className="text-center text-sm text-gray-500 mb-12">
        Data last updated: {new Date(data.updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>

      {/* Visualizations */}
      <div className="space-y-16">
        
        {/* Good Days by Year Chart */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Good Days by Year</h2>
          <p className="text-gray-600 mb-6">
            Growth and consistency of outcomes over time.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <GoodDaysByYearChart data={data.byYear} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Good days are participant-days created by funded activities.
            </p>
          </div>
        </section>

        {/* Cost Efficiency */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Cost per Good Day</h2>
          <p className="text-gray-600 mb-6">
            Transparency on efficiency across different types of programs.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CostStats stats={data.costStats} />
            <p className="text-sm text-gray-600 mt-6 text-center max-w-2xl mx-auto">
              Most programs deliver low cost per good day; one-off celebrations cost more 
              but help people reconnect with community.
            </p>
          </div>
        </section>

        {/* Activity Mix */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Activity Mix</h2>
          <p className="text-gray-600 mb-6">
            The kinds of sober activities we fund. Activities can overlap.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ActivityMixChart data={data.byTag} />
          </div>
        </section>

        {/* Top Producers */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Top "Good Day" Producers</h2>
          <p className="text-gray-600 mb-6">
            The most impactful grants by total good days created.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <TopProducersChart data={data.top} onItemClick={handleGrantClick} />
          </div>
        </section>

        {/* Grant Stories */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Stories from the Field</h2>
          <GrantStoryGrid />
        </section>

        {/* Methods Box */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">How we count "good days"</h3>
          <div className="prose prose-blue">
            <p>
              Each grant includes <em>Estimated Days</em> and <em>Participants</em>. 
              We calculate <strong>Good Days = Days × Participants</strong> within a conservative year.
            </p>
            <ul>
              <li>One-off events = participants that day.</li>
              <li>Recurring series = sessions × attendance.</li>
              <li>Equipment/paths = small daily users × many days.</li>
            </ul>
            <p>
              Numbers come directly from our grant log and can be updated as programs report actuals.
            </p>
          </div>
          <div className="mt-6">
            <a
              href={EXTERNAL_LINKS.grantsSheet}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Download current data (CSV) →
            </a>
          </div>
        </section>

        {/* Bottom CTAs */}
        <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Impact</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every donation creates more opportunities for people in recovery to find 
            community and joy in sobriety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/grants"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Apply for a Grant
            </Link>
          </div>
        </section>
      </div>

      {/* Grant Detail Modal */}
      <GrantDetailModal
        grant={selectedGrant}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}