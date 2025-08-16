'use client';

import Image from 'next/image';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { GrantsData } from '@/types';

interface GrantStoryCardProps {
  title: string;
  description: string;
  goodDays: number;
  costPerDay: number;
  image?: string;
  link?: string;
}

export function GrantStoryCard({ 
  title, 
  description, 
  goodDays, 
  costPerDay, 
  image,
  link 
}: GrantStoryCardProps) {
  const CardContent = (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {image && (
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(goodDays)}
              </div>
              <div className="text-gray-500">good days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${costPerDay}
              </div>
              <div className="text-gray-500">per day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

interface GrantStoryGridProps {
  stories?: GrantStoryCardProps[];
}

export function GrantStoryGrid({ stories }: GrantStoryGridProps) {
  // Default stories based on the spec
  const defaultStories: GrantStoryCardProps[] = [
    {
      title: "Pickleball made easy.",
      description: "Brainwashed Coffee used $1,000 to host sober pickleball sessions, creating a welcoming space for people in recovery to stay active and social.",
      goodDays: 400,
      costPerDay: 3,
      image: "/images/ride-photos/2018/event-photo-1.jpg"
    },
    {
      title: "A stage for real life.",
      description: "R2ise Theater's community production brought people together through the arts, proving that creativity and recovery go hand in hand.",
      goodDays: 750,
      costPerDay: 4,
      image: "/images/ride-photos/2018/event-photo-2.jpg"
    },
    {
      title: "A path around relapse.",
      description: "Lightway Recovery's walking path gives residents a safe loop for exercise and reflection, supporting their journey to sobriety.",
      goodDays: 600,
      costPerDay: 5,
      image: "/images/ride-photos/2016/group-photo-1.jpg"
    },
    {
      title: "Boards that bring people back.",
      description: "Docs Place bought surf boards for their sober surfing group, helping members find peace and community in the waves.",
      goodDays: 360,
      costPerDay: 4,
      image: "/images/ride-photos/2016/group-photo-2.jpg"
    }
  ];

  const displayStories = stories || defaultStories;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {displayStories.map((story, index) => (
        <GrantStoryCard key={index} {...story} />
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
                <div className="text-sm text-gray-600">Good Days</div>
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