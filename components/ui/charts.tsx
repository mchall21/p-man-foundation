'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getChartColor, formatCurrency, formatNumber } from '@/lib/utils';
import type { GrantsData } from '@/types';

interface GoodDaysByYearChartProps {
  data: GrantsData['byYear'];
}

export function GoodDaysByYearChart({ data }: GoodDaysByYearChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'goodDays') return [formatNumber(value), 'Good Days'];
              if (name === 'dollars') return [formatCurrency(value), 'Dollars Granted'];
              return [value, name];
            }}
          />
          <Bar dataKey="goodDays" fill="#3B82F6" name="goodDays" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ActivityMixChartProps {
  data: GrantsData['byTag'];
}

export function ActivityMixChart({ data }: ActivityMixChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: getChartColor(index)
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="goodDays"
            nameKey="tag"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [formatNumber(value), 'Good Days']}
            labelFormatter={(label: string) => label}
          />
          <Legend />
        </PieChart>
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
        <div 
          key={item.grantee}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
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
        </div>
      ))}
    </div>
  );
}

interface CostStatsProps {
  stats: GrantsData['costStats'];
}

export function CostStats({ stats }: CostStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">
          ${stats.min}
        </div>
        <div className="text-sm text-green-700">Minimum</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-2xl font-bold text-blue-600">
          ${stats.median}
        </div>
        <div className="text-sm text-blue-700">Median</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <div className="text-2xl font-bold text-purple-600">
          ${stats.max}
        </div>
        <div className="text-sm text-purple-700">Maximum</div>
        <div className="text-xs text-gray-600 mt-1">per good day</div>
      </div>
    </div>
  );
}