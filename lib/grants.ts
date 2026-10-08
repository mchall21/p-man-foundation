import type { GrantsData, ProcessedGrant } from '../types/index';

type RawGrantRow = Record<string, string>;

/** Parse the entire CSV stream: quoted fields can contain commas, quotes and newlines. */
export function parseCSV(text: string): RawGrantRow[] {
  const records: string[][] = [];
  let record: string[] = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) { record.push(field.trim()); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      record.push(field.trim()); records.push(record); record = []; field = '';
    } else field += char;
  }
  if (quoted) throw new Error('Malformed CSV');
  if (field || record.length) { record.push(field.trim()); records.push(record); }
  const headers = records.shift()?.map(header => header.replace(/^\uFEFF/, '')) || [];
  if (!(headers.includes('Grantee Name') || headers.includes('Grantee')) || !headers.includes('Amount')) {
    throw new Error('Grant source is missing required columns');
  }
  return records.filter(values => values.some(Boolean)).map(values =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] || '']))
  );
}

export function parseNumber(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const cleaned = value.replace(/[$,\s]/g, '');
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function normalizeTags(text: string): string[] {
  const aliases: Record<string, string> = { 'the arts': 'Arts', art: 'Arts', arts: 'Arts', 'physical activity': 'Physical', physical: 'Physical', 'outdoor activities': 'Outdoors', outdoor: 'Outdoors', outdoors: 'Outdoors', 'social activities': 'Social', social: 'Social', spirituality: 'Spiritual', spiritual: 'Spiritual' };
  return [...new Set(text.split(/[,;|]/).map(tag => {
    const clean = tag.replace(/[^\p{L}\p{N}\s&/-]/gu, '').trim().toLowerCase();
    return aliases[clean] || (clean ? clean[0].toUpperCase() + clean.slice(1) : '');
  }).filter(Boolean))];
}

export function processGrant(row: RawGrantRow): ProcessedGrant | null {
  const grantee = (row['Grantee Name'] || row.Grantee || '').trim();
  const amount = parseNumber(row.Amount);
  if (!grantee || amount === null || amount <= 0) return null;
  const participants = parseNumber(row.Participants);
  const days = parseNumber(row['Estimated Days']);
  const suppliedDays = parseNumber(row['Good Days']);
  const calculatedDays = participants !== null && days !== null ? participants * days : null;
  const candidateDays = suppliedDays ?? calculatedDays;
  const goodDays = candidateDays !== null && Number.isFinite(candidateDays) ? candidateDays : null;
  const ratio = goodDays !== null && goodDays > 0 ? amount / goodDays : null;
  const costPerGD = ratio !== null && Number.isFinite(ratio) ? ratio : null;
  const parsedDate = row.Date ? new Date(row.Date) : null;
  const validDate = parsedDate && Number.isFinite(parsedDate.getTime()) ? parsedDate : null;
  const explicitYear = parseNumber(row['Award Year']);
  const year = explicitYear !== null && Number.isInteger(explicitYear) && explicitYear >= 1900 && explicitYear <= 2200
    ? explicitYear : validDate?.getUTCFullYear() ?? null;
  const description = row.Description || '';
  const websiteValue = (row['Website/Social'] || row.Website || row.URL || description.match(/https?:\/\/[^\s,)]+/i)?.[0] || '').trim();
  const website = /^https?:\/\//i.test(websiteValue) ? websiteValue : undefined;
  return { grantee, amount, date: validDate?.toISOString().slice(0, 10) || '', year,
    participants: participants ?? undefined, days: days ?? undefined,
    goodDays, costPerGD,
    tags: normalizeTags(`${row['Sober Social Activity Type'] || ''},${row.Category || ''}`),
    description, location: row.Location || '', granteeType: row['Grantee Type'] || '', website };
}

const round = (value: number) => Math.round(value * 100) / 100;

export function analyzeGrants(grants: ProcessedGrant[], fetchedAt = new Date().toISOString()): GrantsData {
  const estimated = grants.filter(g => g.goodDays !== null);
  const costed = grants.filter((g): g is ProcessedGrant & { goodDays: number; costPerGD: number } => g.costPerGD !== null && g.goodDays !== null);
  const totalDays = estimated.reduce((sum, g) => sum + (g.goodDays ?? 0), 0);
  const estimatedDollars = estimated.reduce((sum, g) => sum + g.amount, 0);
  const byYear: GrantsData['byYear'] = [];
  const tagMap = new Map<string, { dollars: number; goodDays: number }>();
  for (const grant of grants) {
    let bucket = byYear.find(item => item.year === grant.year);
    if (!bucket) { bucket = { year: grant.year, dollars: 0, goodDays: 0, awards: 0, estimatedAwards: 0 }; byYear.push(bucket); }
    bucket.dollars += grant.amount; bucket.goodDays += grant.goodDays ?? 0; bucket.awards++;
    if (grant.goodDays !== null) bucket.estimatedAwards++;
    for (const tag of grant.tags) {
      const value = tagMap.get(tag) || { dollars: 0, goodDays: 0 };
      value.dollars += grant.amount; value.goodDays += grant.goodDays ?? 0; tagMap.set(tag, value);
    }
  }
  const costs = costed.map(g => g.costPerGD).sort((a, b) => a - b);
  const middle = Math.floor(costs.length / 2);
  return { updatedAt: fetchedAt,
    totals: { dollars: round(grants.reduce((sum, g) => sum + g.amount, 0)), goodDays: totalDays,
      costPerGD: totalDays > 0 ? round(estimatedDollars / totalDays) : null,
      awards: grants.length, uniqueRecipients: new Set(grants.map(g => g.grantee.toLowerCase().replace(/[^a-z0-9]/g, ''))).size },
    coverage: { estimatedAwards: estimated.length, pendingAwards: grants.length - estimated.length, estimatedDollars: round(estimatedDollars) },
    byYear: byYear.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999)),
    byTag: [...tagMap.entries()].map(([tag, value]) => ({ tag, ...value })).sort((a, b) => b.dollars - a.dollars),
    top: [...costed].sort((a, b) => b.goodDays - a.goodDays).slice(0, 10).map(g => ({ grantee: g.grantee, goodDays: g.goodDays, costPerGD: round(g.costPerGD), description: g.description || '', amount: g.amount })),
    costStats: { min: costs.length ? round(costs[0]) : null, median: costs.length ? round(costs.length % 2 ? costs[middle] : (costs[middle - 1] + costs[middle]) / 2) : null, max: costs.length ? round(costs[costs.length - 1]) : null }, rows: grants };
}
