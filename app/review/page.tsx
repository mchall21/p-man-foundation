'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GrantApplication } from '@/types';
import { ChevronLeft, ChevronRight, ExternalLink, Check, X, HelpCircle, DollarSign, RefreshCw, Calculator } from 'lucide-react';

const SHEET_ID = '1esaDQaoVY8vTd0gd5LxA4KCWk0oMXVEPCY-pQ3aS-Xg';
const BUDGET_STORAGE_KEY = 'pman-grant-review-budget';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function StatusBadge({ decision }: { decision: string }) {
  if (!decision) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <HelpCircle className="w-3 h-3" />
        Pending Review
      </span>
    );
  }
  const isApproved = decision.toLowerCase().includes('approve') || decision.toLowerCase() === 'yes';
  const isDenied = decision.toLowerCase().includes('den') || decision.toLowerCase() === 'no';

  if (isApproved) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <Check className="w-3 h-3" />
        Approved
      </span>
    );
  }
  if (isDenied) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <X className="w-3 h-3" />
        Denied
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
      {decision}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{title}</h3>
      <div className="bg-gray-50 rounded-lg p-4">{children}</div>
    </div>
  );
}

function Field({ label, value, className = '' }: { label: string; value: string | number; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs text-gray-500 mb-1">{label}</dt>
      <dd className="text-gray-900 whitespace-pre-wrap">{value || 'N/A'}</dd>
    </div>
  );
}

export default function ReviewPage() {
  const [applications, setApplications] = useState<GrantApplication[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [availableBudget, setAvailableBudget] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [editDecision, setEditDecision] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editWhy, setEditWhy] = useState('');
  const [needsSetup, setNeedsSetup] = useState(false);

  // Load budget from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (saved) setAvailableBudget(parseFloat(saved) || 0);
  }, []);

  // Save budget to localStorage when changed
  const updateBudget = (value: number) => {
    setAvailableBudget(value);
    localStorage.setItem(BUDGET_STORAGE_KEY, value.toString());
  };

  // Calculate budget breakdown
  const budgetBreakdown = useMemo(() => {
    let approved = 0;
    let maybe = 0;
    let pending = 0;

    applications.forEach((app) => {
      const decision = app.decision?.toLowerCase() || '';
      const amount = parseFloat(app.approvedAmount?.replace(/[$,]/g, '') || '0') || app.amountRequested;

      if (decision.includes('approve') || decision === 'yes') {
        approved += parseFloat(app.approvedAmount?.replace(/[$,]/g, '') || '0') || 0;
      } else if (decision.includes('maybe') || decision.includes('consider')) {
        maybe += amount;
      } else if (!decision || decision === '') {
        pending += app.amountRequested;
      }
    });

    return {
      approved,
      maybe,
      pending,
      remaining: availableBudget - approved,
      remainingAfterMaybe: availableBudget - approved - maybe,
    };
  }, [applications, availableBudget]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/applications');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setApplications(data.applications);
      setError(null);
    } catch (err) {
      setError('Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    if (filter === 'pending') return !app.decision;
    if (filter === 'reviewed') return !!app.decision;
    return true;
  });

  const current = filteredApplications[currentIndex];
  const total = filteredApplications.length;

  // Sync edit fields when current application changes
  useEffect(() => {
    if (current) {
      setEditDecision(current.decision || '');
      setEditAmount(current.approvedAmount || '');
      setEditWhy(current.why || '');
    }
  }, [current]);

  const saveDecision = async () => {
    if (!current) return;
    setSaving(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowIndex: current.rowIndex,
          decision: editDecision,
          approvedAmount: editAmount,
          why: editWhy,
        }),
      });
      const data = await res.json();

      if (data.needsSetup) {
        setNeedsSetup(true);
        window.open(data.editUrl, '_blank');
        return;
      }

      if (data.success) {
        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app.rowIndex === current.rowIndex
              ? { ...app, decision: editDecision, approvedAmount: editAmount, why: editWhy }
              : app
          )
        );
      }
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const quickDecision = (decision: string, amount?: string) => {
    setEditDecision(decision);
    if (amount !== undefined) setEditAmount(amount);
  };

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
  }, [total]);

  const openSheetForEdit = useCallback(() => {
    if (!current) return;
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0&range=T${current.rowIndex}:V${current.rowIndex}`;
    window.open(url, '_blank');
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft' || e.key === 'k') {
        goTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'j') {
        goTo(currentIndex + 1);
      } else if (e.key === 'e') {
        openSheetForEdit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goTo, openSheetForEdit]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchApplications}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">No applications found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Grant Application Review</h1>
              <p className="text-sm text-gray-500">P-Man Foundation</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value as typeof filter);
                  setCurrentIndex(0);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All ({applications.length})</option>
                <option value="pending">Pending ({applications.filter((a) => !a.decision).length})</option>
                <option value="reviewed">Reviewed ({applications.filter((a) => a.decision).length})</option>
              </select>

              {/* Refresh */}
              <button
                onClick={fetchApplications}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 min-w-[80px] text-center">
                  {currentIndex + 1} of {total}
                </span>
                <button
                  onClick={() => goTo(currentIndex + 1)}
                  disabled={currentIndex === total - 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick nav dots */}
          <div className="flex gap-1 mt-3 flex-wrap">
            {filteredApplications.map((app, i) => (
              <button
                key={app.rowIndex}
                onClick={() => goTo(i)}
                className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                  i === currentIndex
                    ? 'bg-blue-600 text-white'
                    : app.decision
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={app.name}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{current.name}</h2>
                  {current.title && <p className="text-gray-600">{current.title}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {current.applicantType} &bull; Submitted {formatDate(current.timestamp)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{formatCurrency(current.amountRequested)}</div>
                  <p className="text-sm text-gray-500">Requested</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <StatusBadge decision={current.decision} />
                {current.approvedAmount && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    <DollarSign className="w-3 h-3" />
                    {current.approvedAmount} Approved
                  </span>
                )}
              </div>
            </div>

            {/* Purpose & Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Section title="Grant Purpose & Goals">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{current.purpose || 'N/A'}</p>
              </Section>

              <Section title="Expected Impact">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{current.impact || 'N/A'}</p>
              </Section>

              <Section title="Budget / Fund Allocation">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{current.budget || 'N/A'}</p>
              </Section>

              {current.additionalInfo && (
                <Section title="Additional Information">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{current.additionalInfo}</p>
                </Section>
              )}
            </div>
          </div>

          {/* Right Column - Quick Info & Actions */}
          <div className="space-y-4">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <dl className="space-y-3">
                <Field label="Email" value={current.email} />
                <Field label="Phone" value={current.phone} />
                <Field label="Address" value={current.address} />
                {current.socialMedia && <Field label="Social Media" value={current.socialMedia} />}
              </dl>
            </div>

            {/* Organization Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Organization</h3>
              <dl className="space-y-3">
                <Field label="Type" value={current.applicantType} />
                <Field label="Nonprofit Status" value={current.nonprofitStatus} />
                {current.organizationDetails && (
                  <Field label="Details" value={current.organizationDetails} />
                )}
              </dl>
            </div>

            {/* Program Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Program Details</h3>
              <dl className="space-y-3">
                <Field label="People Served" value={current.peopleServed} />
                <Field label="Start Date" value={current.startDate} />
                <Field label="Event Type" value={current.eventType} />
              </dl>
            </div>

            {/* Current Decision (if exists) */}
            {(current.decision || current.approvedAmount || current.why || current.molly) && (
              <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4">Current Decision</h3>
                <dl className="space-y-3">
                  <Field label="Decision" value={current.decision} />
                  <Field label="Approved Amount" value={current.approvedAmount} />
                  <Field label="Reasoning" value={current.why} />
                  {current.molly && <Field label="Molly's Notes" value={current.molly} />}
                </dl>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Decision Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Budget Row */}
          <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-gray-400" />
                <label className="text-sm text-gray-600">Budget:</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={availableBudget || ''}
                    onChange={(e) => updateBudget(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 pl-6 pr-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-700">
                  <span className="text-gray-500">Approved:</span> {formatCurrency(budgetBreakdown.approved)}
                </span>
                <span className="text-yellow-700">
                  <span className="text-gray-500">Maybe:</span> {formatCurrency(budgetBreakdown.maybe)}
                </span>
                <span className={`font-semibold ${budgetBreakdown.remaining < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                  <span className="text-gray-500 font-normal">Remaining:</span> {formatCurrency(budgetBreakdown.remaining)}
                </span>
                {budgetBreakdown.maybe > 0 && (
                  <span className="text-gray-500">
                    (after maybe: <span className={budgetBreakdown.remainingAfterMaybe < 0 ? 'text-red-500' : ''}>{formatCurrency(budgetBreakdown.remainingAfterMaybe)}</span>)
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm text-gray-500">Request:</span>
              <span className="ml-2 font-bold text-lg">{formatCurrency(current.amountRequested)}</span>
            </div>
          </div>

          {/* Decision Form Row */}
          <div className="flex items-center gap-4">
            {/* Quick Decision Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => quickDecision('Approved', current.amountRequested.toString())}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editDecision.toLowerCase().includes('approve')
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <Check className="w-4 h-4 inline mr-1" />
                Approve
              </button>
              <button
                onClick={() => quickDecision('Maybe')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editDecision.toLowerCase().includes('maybe')
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                <HelpCircle className="w-4 h-4 inline mr-1" />
                Maybe
              </button>
              <button
                onClick={() => quickDecision('Denied', '0')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editDecision.toLowerCase().includes('den')
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                <X className="w-4 h-4 inline mr-1" />
                Deny
              </button>
            </div>

            {/* Amount Field */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Amount:</label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="text"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="0"
                  className="w-24 pl-6 pr-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Why Field */}
            <div className="flex-1 flex items-center gap-2">
              <label className="text-sm text-gray-600">Why:</label>
              <input
                type="text"
                value={editWhy}
                onChange={(e) => setEditWhy(e.target.value)}
                placeholder="Reason for decision..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveDecision}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Save
            </button>

            {/* Fallback: Open Sheet */}
            <button
              onClick={openSheetForEdit}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              title="Open in Google Sheets"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>

          {/* Setup notice */}
          {needsSetup && (
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded">
              Direct saving not configured. See <code className="bg-amber-100 px-1 rounded">google-apps-script.js</code> for setup instructions, or use the sheet link to edit manually.
            </div>
          )}

          {/* Keyboard hint */}
          <div className="mt-2 text-xs text-gray-400 text-center">
            ← → navigate
          </div>
        </div>
      </div>

          </div>
  );
}
