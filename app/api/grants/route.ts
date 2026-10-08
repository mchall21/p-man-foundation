import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { analyzeGrants, parseCSV, processGrant } from '@/lib/grants';
import { includeApproved2026 } from '@/lib/grant-supplement';
import type { ProcessedGrant } from '@/types';

function getCSVUrl(): string {
  if (process.env.GRANTS_CSV_URL) return process.env.GRANTS_CSV_URL;
  // This public grant log is the canonical source in every environment.
  const sheetId = process.env.GRANTS_SHEET_ID || '1vtqYR9gcFz_xNPAw7tdz_qB7JjIDO_uHrTYW-BoKKcg';
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${process.env.GRANTS_SHEET_GID || '0'}`;
}

async function fetchGrants(csvUrl: string) {
  const response = await fetch(csvUrl, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Grant source unavailable');
  const sourceRows = parseCSV(await response.text());
  if (!sourceRows.some(row => processGrant(row) !== null)) throw new Error('Grant source has no valid awards');
  const grants = includeApproved2026(sourceRows).map(processGrant).filter((grant): grant is ProcessedGrant => grant !== null);
  if (!grants.length) throw new Error('Grant source has no valid awards');
  return analyzeGrants(grants);
}

const configuredTTL = Number(process.env.GRANTS_CACHE_TTL || 600);
const getCachedGrants = unstable_cache(fetchGrants, ['grants-data-v3-approved-2026'], {
  revalidate: Number.isFinite(configuredTTL) && configuredTTL > 0 ? configuredTTL : 600,
  tags: ['grants'],
});

export async function GET(request: Request) {
  try {
    const csvUrl = getCSVUrl();
    const data = new URL(request.url).searchParams.get('refresh') === '1'
      ? await fetchGrants(csvUrl) : await getCachedGrants(csvUrl);
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    // Never expose source URLs, private rows, or fabricated fallback totals.
    return NextResponse.json({ error: 'Grant data is temporarily unavailable. Please try again later.' }, { status: 503 });
  }
}
