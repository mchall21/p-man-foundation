import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeGrants, parseCSV, parseNumber, processGrant } from './grants';

test('multiline CSV and formatted numbers retain funded awards with unknown impact', () => {
  const text = 'Grantee Name,Amount,Good Days,Description,Award Year,Date,Website/Social\r\n"The Group","$4,460",,"First line\nSecond ""quoted"" line",2026,,https://example.org\r\n';
  const rows = parseCSV(text);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].Description, 'First line\nSecond "quoted" line');
  const grant = processGrant(rows[0])!;
  assert.equal(grant.amount, 4460); assert.equal(grant.year, 2026);
  assert.equal(grant.date, ''); assert.equal(grant.goodDays, null); assert.equal(grant.costPerGD, null);
  assert.equal(grant.website, 'https://example.org');
  const result = analyzeGrants([grant]);
  assert.equal(result.totals.dollars, 4460); assert.equal(result.coverage.pendingAwards, 1);
  assert.equal(result.totals.costPerGD, null); assert.deepEqual(result.costStats, { min: null, median: null, max: null });
});

test('estimates use formatted counts, all funding is included, and costs use matching coverage', () => {
  const grants = [
    processGrant({ Grantee: 'Group A', Amount: '100', 'Good Days': '1,000', Date: '2/1/2025', Category: 'The Arts', 'Sober Social Activity Type': '🎨 Arts,Arts' })!,
    processGrant({ Grantee: 'Group A', Amount: '300', Participants: '10', 'Estimated Days': '2', 'Award Year': '2026', Date: 'bad' })!,
    processGrant({ Grantee: 'Group B', Amount: '4000', 'Award Year': '2026' })!,
  ];
  const result = analyzeGrants(grants);
  assert.equal(result.totals.dollars, 4400); assert.equal(result.totals.awards, 3);
  assert.equal(result.totals.uniqueRecipients, 2); assert.equal(result.totals.goodDays, 1020);
  assert.equal(result.totals.costPerGD, 0.39); assert.equal(result.coverage.estimatedDollars, 400);
  assert.equal(result.byTag.find(tag => tag.tag === 'Arts')?.dollars, 100);
  assert.equal(result.costStats.median, 7.55);
  assert.equal(result.byYear.find(year => year.year === 2026)?.dollars, 4300);
  assert.equal(grants[0].amount, 100, 'analysis does not reorder source rows');
});

test('invalid values never become fabricated dates, zeros or infinite ratios', () => {
  assert.equal(parseNumber('12 people'), null); assert.equal(parseNumber('Infinity'), null);
  assert.equal(parseNumber(''), null); assert.equal(parseNumber('0'), 0);
  assert.equal(processGrant({ Grantee: 'A', Amount: '20' })?.year, null);
  assert.equal(processGrant({ Grantee: 'A', Amount: '20', 'Good Days': '0' })?.costPerGD, null);
  assert.throws(() => parseCSV('<html>Sign in</html>'));
  assert.throws(() => parseCSV('Grantee,Amount\n"broken,20'));
});
