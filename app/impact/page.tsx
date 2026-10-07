'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCounter } from '@/components/ui/animated-counter';
import { AwardsByYearChart, ActivityMixChart, TopProducersChart, CostStats } from '@/components/ui/charts';
import { GrantStoryGrid, GrantDetailModal } from '@/components/ui/grant-cards';
import { GrantsTable } from '@/components/ui/grants-table';
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
        // Add refresh parameter to bypass cache if needed
        const params = new URLSearchParams();
        if (process.env.NODE_ENV === 'development') {
          params.set('refresh', '1');
        }

        const url = `/api/grants${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(20000) });

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
          title="Total Awarded"
          value={data.totals.dollars}
          format="currency"
          description="to date"
        />
        <MetricCounter
          title="Estimated Good Days"
          value={data.totals.goodDays}
          format="number"
          description="estimated participant-days"
        />
        <MetricCounter title="Grants Awarded" value={data.totals.awards} format="number" description="across recorded grant cycles" />
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8 text-gray-700">
        <p>Impact estimates cover <strong>{data.coverage.estimatedAwards} of {data.totals.awards} awards</strong>. {data.coverage.pendingAwards} awards await estimates and remain included in funding totals.</p>
        <p className="mt-2">The weighted cost per estimated good day is {data.totals.costPerGD === null ? 'not yet available' : `$${data.totals.costPerGD.toFixed(2)}`}, using only the ${data.coverage.estimatedDollars.toLocaleString('en-US')} awarded to programs with estimates.</p>
      </div>
      {/* Data timestamp */}
      <div className="text-center text-sm text-gray-500 mb-12">
        Grant log fetched: {new Date(data.updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}. This is the source retrieval time, not its last edit date.
      </div>

      {/* Visualizations */}
      <div className="space-y-16">

        {/* Good Days by Year Chart */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Awards by Year</h2>
          <p className="text-gray-600 mb-6">
            Approved funding by award year, including grants awaiting impact estimates.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AwardsByYearChart data={data.byYear} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Award year reflects the grant cycle. It is separate from application and payment dates.
            </p>
          </div>
        </section>

        {/* Cost Efficiency */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Cost per Good Day</h2>
          <p className="text-gray-600 mb-6">
            Estimated cost uses only awards with recorded impact estimates.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CostStats stats={data.costStats} />
            <p className="text-sm text-gray-600 mt-6 text-center max-w-2xl mx-auto">
              These estimates describe participant-days, not clinical outcomes. Costs are not comparable without considering program context.
            </p>
          </div>
        </section>

        {/* Activity Mix */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Activity Mix</h2>
          <p className="text-gray-600 mb-6">
            Award dollars by activity. A grant can appear in several categories; these bars must not be added together.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ActivityMixChart data={data.byTag} />
          </div>
        </section>

        {/* Top Producers */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Largest Recorded Good-Day Estimates</h2>
          <p className="text-gray-600 mb-6">
            Individual awards with the largest recorded estimates; this is not a ranking of recovery outcomes.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <TopProducersChart data={data.top} onItemClick={handleGrantClick} />
          </div>
        </section>

        {/* Grant Stories */}
        <section>
          <p className="eyebrow mb-4">Grants in action</p>
          <h2 className="section-heading mb-6">What a grant makes possible.</h2>
          <p className="max-w-2xl text-lg text-slate-600 mb-10">A gym, a game, a day on the water. These past awards show the practical ways we support connection and activity in recovery.</p>
          <GrantStoryGrid grants={data.rows} />
        </section>

        {/* All Grants Table */}
        <section id="grant-database">
          <h2 className="text-3xl font-bold mb-8">Complete Grants Database</h2>
          <p className="text-gray-600 mb-6">
            Awards recorded in our grant log, sortable and searchable. Awarded amounts do not indicate payment status.
          </p>
          <GrantsTable grants={data.rows} />
        </section>

        {/* Methods Box */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">How we count &ldquo;good days&rdquo;</h3>
          <div className="prose prose-blue">
            <p>
              Where available, grants include <em>Estimated Days</em> and <em>Participants</em>.
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
              href="#grant-database"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Explore the grant records →
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
