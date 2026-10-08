import { test } from 'node:test';
import assert from 'node:assert/strict';
import { includeApproved2026 } from './grant-supplement';
import { analyzeGrants, processGrant } from './grants';

test('approved cohort adds 15 awards, $34,650 and 1,097 estimated days', () => {
  const rows = includeApproved2026([]);
  const data = analyzeGrants(rows.map(row => processGrant(row)!));
  assert.equal(data.totals.awards, 15);
  assert.equal(data.totals.dollars, 34650);
  assert.equal(data.totals.goodDays, 1097);
  assert.equal(data.coverage.pendingAwards, 1);
  assert.equal(includeApproved2026(rows).length, 15);
});

test('matching source rows win, and historical awards remain separate', () => {
  const imported = includeApproved2026([]);
  const source = [{ ...imported[0], Amount: '1400', 'Good Days': '60' },
    { ...imported[1], 'Decision Source': '', 'Good Days': '0' },
    { ...imported[2], 'Award Year': '2025', 'Decision Source': '' }];
  const result = includeApproved2026(source);
  assert.equal(result.length, 16);
  assert.equal(result[0].Amount, '1400');
  assert.equal(result[0]['Good Days'], '60');
  assert.equal(result[1]['Good Days'], '0');
  assert.equal(source.length, 3);
});

test('a partial import receives only missing awards and missing estimates', () => {
  const imported = includeApproved2026([]);
  const rows = includeApproved2026([{ ...imported[0], 'Good Days': '' }]);
  assert.equal(rows.length, 15);
  assert.equal(rows[0]['Good Days'], '72');
});
