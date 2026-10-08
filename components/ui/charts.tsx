'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { GrantsData } from '@/types';

interface AwardsByYearChartProps {
  data: GrantsData['byYear'];
}

export function AwardsByYearChart({ data }: AwardsByYearChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tickFormatter={value => value ?? "Unknown"} />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'goodDays') return [formatNumber(value), 'Good Days'];
              if (name === 'dollars') return [formatCurrency(value), 'Dollars Awarded'];
              return [value, name];
            }}
          />
          <Bar dataKey="dollars" fill="#3B82F6" name="dollars" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ActivityMixChartProps {
  data: GrantsData['byTag'];
}

export function ActivityMixChart({ data }: ActivityMixChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={value => `$${Number(value) / 1000}k`} />
          <YAxis type="category" dataKey="tag" width={85} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => [formatCurrency(value), 'Dollars awarded']} />
          <Bar dataKey="dollars" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface TopProducersChartProps {
  data: GrantsData['top'];
  onItemClick?: (item: GrantsData['top'][0]) => void;
}

export function TopProducersChart({ data, onItemClick }: TopProducersChartProps) {
  const chartData = data.slice(0, 5); // Show top 5

  return (
    <div className="space-y-3">
      {chartData.map((item, index) => (
        <button type="button"
          key={`${item.grantee}-${index}`}
          className="w-full text-left flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
          onClick={() => onItemClick?.(item)}
        >
          <div className="w-8 text-sm font-medium text-gray-500">
            #{index + 1}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{item.grantee}</span>
              <span className="text-sm text-gray-600">
                {formatNumber(item.goodDays)} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.goodDays / chartData[0].goodDays) * 100}%`
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatCurrency(item.amount)}</span>
              <span>${item.costPerGD}/day</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

interface CostStatsProps {
  stats: GrantsData['costStats'];
}

export function CostStats({ stats }: CostStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">
          {stats.min === null ? 'Pending' : `$${stats.min}`}
        </div>
        <div className="text-sm text-green-700">Minimum</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">
          {stats.median === null ? 'Pending' : `$${stats.median}`}
        </div>
        <div className="text-sm text-blue-700">Median</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <div className="text-2xl font-bold text-purple-600">
          {stats.max === null ? 'Pending' : `$${stats.max}`}
        </div>
        <div className="text-sm text-purple-700">Maximum</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
    </div>
  );
}
