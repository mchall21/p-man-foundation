'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import type { ProcessedGrant } from '@/types';

interface GrantsTableProps {
  grants: ProcessedGrant[];
}

type SortField = 'year' | 'amount' | 'grantee';
type SortDirection = 'asc' | 'desc';

export function GrantsTable({ grants }: GrantsTableProps) {
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique years and types for filters
  const availableYears = useMemo(() => {
    const years = [...new Set(grants.map(g => g.year))].sort((a, b) => b - a);
    return years;
  }, [grants]);

  const availableTypes = useMemo(() => {
    const types = [...new Set(grants.map(g => g.granteeType).filter(Boolean))].sort();
    return types;
  }, [grants]);

  // Filter and sort grants
  const filteredAndSortedGrants = useMemo(() => {
    const filtered = grants.filter(grant => {
      const matchesYear = filterYear === 'all' || grant.year.toString() === filterYear;
      const matchesType = filterType === 'all' || grant.granteeType === filterType;
      const matchesSearch = searchTerm === '' || 
        grant.grantee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesYear && matchesType && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];

      if (sortField === 'grantee') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
  }, [grants, sortField, sortDirection, filterYear, filterType, searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-blue-600 transition-colors font-semibold"
    >
      <span>{children}</span>
      {sortField === field && (
        <span className="text-blue-600">
          {sortDirection === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </button>
  );

  // Check if grantee has a website (you may need to add this field to your data)
  const getGranteeWebsite = (grant: ProcessedGrant): string | null => {
    // First check if there's a dedicated website field
    if (grant.website) {
      return grant.website;
    }
    
    // Then check description for URLs
    if (grant.description) {
      const urlMatch = grant.description.match(/(https?:\/\/[^\s,]+)/i);
      return urlMatch ? urlMatch[1] : null;
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-playfair mb-4">All Grants Database</h3>
        
        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search grantees, descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grantee Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {availableTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedGrants.length} of {grants.length} grants
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <SortButton field="year">Year</SortButton>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <SortButton field="amount">Amount</SortButton>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <SortButton field="grantee">Grantee</SortButton>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedGrants.map((grant, index) => {
                const website = getGranteeWebsite(grant);
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {grant.year}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {formatCurrency(grant.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="max-w-xs">
                        {website ? (
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            {grant.grantee}
                          </a>
                        ) : (
                          <span className="font-medium">{grant.grantee}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="max-w-xs">
                        {grant.granteeType || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="max-w-md">
                        {grant.description || '—'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="max-w-xs">
                        {grant.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {grant.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {grant.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{grant.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          '—'
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedGrants.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No grants found matching the current filters.
        </div>
      )}
    </div>
  );
}