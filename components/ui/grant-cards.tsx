'use client';

import { formatCurrency, formatNumber } from '@/lib/utils';
import type { GrantsData } from '@/types';

// Editorial summaries of specific historical awards, not reported outcomes.
const grantFeatures = [
  { grantee: 'No Longer Bound', year: 2025, amount: 2000, title: 'A place to show up and work out', category: 'Movement', description: 'A $2,000 grant supported weightlifting and boxing equipment for No Longer Bound’s new gym in Cumming. The award puts the focus on an everyday opportunity: making exercise part of life in recovery.' },
  { grantee: 'Hickey House', year: 2022, amount: 4000, title: 'More ways to get moving', category: 'Movement', description: 'At Hickey House in Helen, a $4,000 grant supported upgrades to weights, cardio equipment, and sports equipment. It is a practical investment in the space and tools people can use to be active.' },
  { grantee: 'Brainwashed Coffee', year: 2024, amount: 1000, title: 'Connection across the net', category: 'Play', description: 'A $1,000 grant to Brainwashed Coffee in Chester supported a pickleball space and tournament. A shared game gives people a reason to get together, with the activity itself at the center of the gathering.' },
  { grantee: 'Docs place', displayName: 'Doc’s Place', year: 2021, amount: 1500, title: 'A reason to head for the water', category: 'Outdoors', description: 'A $1,500 grant to Doc’s Place in Brunswick supported new surfboards for sober surfing. The idea is simple: help make an outdoor activity available as a way to spend time together in sobriety.' },
];

export function GrantStoryGrid({ grants }: { grants: GrantsData['rows'] }) {
  const features = grantFeatures.filter(feature => grants.some(grant =>
    grant.grantee === feature.grantee && grant.year === feature.year && grant.amount === feature.amount
  ));
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
      {features.map(feature => (
        <article key={feature.grantee} className="border-t border-[#b9c9c1] pt-6">
          <p className="eyebrow mb-4">{feature.category} · {feature.year} grant</p>
          <h3 className="font-playfair text-3xl leading-tight mb-4">{feature.title}</h3>
          <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
            <span>{feature.displayName || feature.grantee}</span>
            <span>{formatCurrency(feature.amount)} awarded</span>
          </div>
        </article>
      ))}
    </div>
  );
}

interface GrantDetailModalProps {
  grant: GrantsData['top'][0] | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GrantDetailModal({ grant, isOpen, onClose }: GrantDetailModalProps) {
  if (!isOpen || !grant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {grant.grantee}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close grant details"
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              {grant.description}
            </p>
            
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(grant.goodDays)}
                </div>
                <div className="text-sm text-gray-600">Estimated Good Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(grant.amount)}
                </div>
                <div className="text-sm text-gray-600">Grant Amount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${grant.costPerGD}
                </div>
                <div className="text-sm text-gray-600">Cost per Day</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              aria-label="Close grant details"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}