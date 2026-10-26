import type { GrantsData, ProcessedGrant } from '../types/index';

export interface DayDot {
  id: string;
  index: number;
  grantId: string;
  grantIndex: number;
  dayInGrant: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  label: string;
}

export interface DayGrant {
  id: string;
  source: ProcessedGrant;
  firstDot: number;
  count: number;
}

export interface DayArtwork {
  total: number;
  fetchedAt: string;
  missingEstimates: number;
  grants: DayGrant[];
  dots: DayDot[];
}

const MAX_DOTS = 100_000;
const NAVY = '#102f45';
const GOLD = '#d99318';
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
const rounded = (n: number) => Math.round(n * 1000) / 1000;
export const formatDays = (n: number) => n.toLocaleString('en-US');

// The feed has no permanent award IDs. This transparent composite key excludes
// goodDays so increasing an award's estimate preserves its existing dot IDs.
// Editing identifying source fields changes its key; duplicate rows get a suffix.
function identity(grant: ProcessedGrant): string {
  return JSON.stringify([grant.year, grant.date, grant.grantee, grant.amount, grant.description ?? '']);
}

function hash(value: string): string {
  let a = 2166136261;
  let b = 5381;
  for (let i = 0; i < value.length; i++) {
    a = Math.imul(a ^ value.charCodeAt(i), 16777619);
    b = Math.imul(b, 33) ^ value.charCodeAt(i);
  }
  return `${(a >>> 0).toString(16)}${(b >>> 0).toString(16)}`;
}

/** Equal-spaced semicircular rings, allocated with largest remainders.
 * Every unit gets exactly one position. No random decoration or rounding of data.
 */
export function sunrisePositions(total: number) {
  if (!Number.isSafeInteger(total) || total < 0 || total > MAX_DOTS) {
    throw new Error('This artwork needs a whole-number count between 0 and 100,000.');
  }
  if (total === 0) return [];
  const inner = 65, outer = 435;
  const pitch = Math.sqrt((Math.PI * (outer * outer - inner * inner) / 2) / total);
  const ringCount = Math.min(total, Math.max(1, Math.round((outer - inner) / pitch) + 1));
  const rings = Array.from({ length: ringCount }, (_, i) => ({
    radius: ringCount === 1 ? outer : inner + i * (outer - inner) / (ringCount - 1),
    count: 0, remainder: 0, index: i,
  }));
  const weights = rings.reduce((sum, ring) => sum + ring.radius, 0);
  for (const ring of rings) {
    const exact = total * ring.radius / weights;
    ring.count = Math.floor(exact);
    ring.remainder = exact - ring.count;
  }
  const remaining = total - rings.reduce((sum, ring) => sum + ring.count, 0);
  const priority = [...rings].sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (let i = 0; i < remaining; i++) priority[i].count++;
  const radialGap = ringCount > 1 ? (outer - inner) / (ringCount - 1) : 20;
  let minGap = radialGap;
  for (const ring of rings) {
    if (ring.count > 1) minGap = Math.min(minGap, 2 * ring.radius * Math.sin(Math.PI / (2 * (ring.count - 1))));
  }
  const dotRadius = rounded(Math.min(5, minGap * 0.30));
  return rings.flatMap(ring => Array.from({ length: ring.count }, (_, i) => {
    const angle = ring.count === 1 ? Math.PI / 2 : Math.PI * i / (ring.count - 1);
    return {
      x: rounded(500 - ring.radius * Math.cos(angle)),
      y: rounded(510 - ring.radius * Math.sin(angle)),
      radius: dotRadius,
      color: ring.radius < 210 ? GOLD : NAVY,
    };
  }));
}

export function buildDayArtwork(data: GrantsData): DayArtwork {
  if (!Array.isArray(data.rows) || !Number.isSafeInteger(data.totals?.goodDays)) {
    throw new Error('The grant feed does not contain a whole-number good-day total.');
  }
  const sorted = [...data.rows].sort((a, b) => compare(identity(a), identity(b)) || (a.goodDays ?? -1) - (b.goodDays ?? -1));
  let total = 0, missingEstimates = 0;
  for (const row of sorted) {
    if (row.goodDays === null) { missingEstimates++; continue; }
    if (!Number.isSafeInteger(row.goodDays) || row.goodDays < 0) {
      throw new Error('A grant has a fractional or invalid good-day count. No dots have been rounded or invented.');
    }
    total += row.goodDays;
  }
  if (total !== data.totals.goodDays) throw new Error('The grant rows and headline total disagree. Refresh the data before exporting.');
  const positions = sunrisePositions(total);
  const grants: DayGrant[] = [];
  const dots: DayDot[] = [];
  const occurrences = new Map<string, number>();
  const identities = new Map<string, string>();
  for (const row of sorted) {
    if (row.goodDays === null || row.goodDays === 0) continue;
    const key = identity(row), digest = hash(key);
    if (identities.has(digest) && identities.get(digest) !== key) throw new Error('Grant identifiers conflict. Export stopped.');
    identities.set(digest, key);
    const occurrence = (occurrences.get(key) ?? 0) + 1;
    occurrences.set(key, occurrence);
    const grantId = `grant-${digest}-${occurrence}`;
    const grantIndex = grants.length;
    grants.push({ id: grantId, source: row, firstDot: dots.length, count: row.goodDays });
    for (let day = 1; day <= row.goodDays; day++) {
      const index = dots.length;
      dots.push({ ...positions[index], index, grantId, grantIndex, dayInGrant: day,
        id: `${grantId}-day-${day}`,
        label: `Good day ${formatDays(index + 1)} of ${formatDays(total)}: ${row.grantee}, ${row.year ?? 'year unrecorded'}. Day ${formatDays(day)} of ${formatDays(row.goodDays)} for this grant.`,
      });
    }
  }
  return { total, fetchedAt: data.updatedAt, missingEstimates, grants, dots };
}

export function escapeXML(text: string): string {
  return text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]!));
}

/** Shared by the interactive view and export, so the artwork cannot drift. */
export function artworkSVG(art: DayArtwork, includeCopy = true): string {
  const circles = art.dots.map(dot => `<circle id="${dot.id}" data-dot-index="${dot.index}" data-grant-id="${dot.grantId}" data-day-in-grant="${dot.dayInGrant}" cx="${dot.x}" cy="${dot.y}" r="${dot.radius}" fill="${dot.color}"><title>${escapeXML(dot.label)}</title></circle>`).join('');
  const metadata = escapeXML(JSON.stringify({ total: art.total, fetchedAt: art.fetchedAt,
    unit: 'One dot represents one estimated participant-day from the grant feed, not a named person or calendar date.',
    source: 'https://www.pmanfoundation.org/api/grants',
    grantIdentity: 'Composite of award year, date, grantee, amount and description; duplicate occurrence suffix. Not a permanent database record ID.',
    grants: art.grants,
  }));
  const copy = includeCopy ? `<g fill="${NAVY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif">
    <text x="500" y="650" font-size="111" font-weight="700" letter-spacing="-4">ONE MORE</text>
    <text x="500" y="760" font-size="111" font-weight="700" letter-spacing="-4">GOOD DAY</text>
    <text x="500" y="832" font-size="31">${formatDays(art.total)} good days. One dot for each.</text>
    <text x="500" y="938" font-size="20" letter-spacing="4">PEDAL FOR P-MAN</text>
  </g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="12in" height="${includeCopy ? '12in' : '6.72in'}" viewBox="0 0 1000 ${includeCopy ? 1000 : 560}" role="img" aria-labelledby="day-art-title day-art-description" data-total-dots="${art.total}">
  <title id="day-art-title">One more good day: ${formatDays(art.total)} dots</title>
  <desc id="day-art-description">Each dot represents one good day in the grant data. Select a dot to inspect its grant. The source counts are estimates of participation.</desc>
  <metadata>${metadata}</metadata><g id="good-day-dots">${circles}</g>${copy}</svg>`;
}
