import approved2026 from './grants-2026.json';
import { processGrant } from './grants';

type Row = Record<string, string>;
const normalized = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Approved decisions supplement the read-only grant log until its import is applied.
 * Source: 2026 decision workbook; calculations: docs/2026-good-day-estimates.json.
 * A matching sheet row wins, including later corrections to amounts and estimates.
 */
export function includeApproved2026(rows: Row[]): Row[] {
  const merged = rows.map(row => ({ ...row }));
  for (const award of approved2026) {
    const index = merged.findIndex(row => {
      if (row['Decision Source'] === award['Decision Source']) return true;
      const grant = processGrant(row);
      return grant?.year === 2026 && normalized(grant.grantee) === normalized(award.Grantee)
        && grant.amount === Number(award.Amount);
    });
    if (index === -1) merged.push({ ...award });
    else {
      const grant = processGrant(merged[index]);
      // Supply only a missing estimate. Keep a recorded zero or revised value.
      if (grant && grant.goodDays === null) merged[index]['Good Days'] = award['Good Days'];
    }
  }
  return merged;
}
