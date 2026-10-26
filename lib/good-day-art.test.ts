import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeGrants, processGrant } from './grants';
import { artworkSVG, buildDayArtwork, sunrisePositions } from './good-day-art';

const grant = (name: string, days: number | null) => processGrant({ Grantee: name, Amount: '1000', 'Award Year': '2026', 'Good Days': days === null ? '' : String(days), Description: 'A community activity' })!;

test('8,018 source units produce 8,018 unique, labelled SVG dots with matching grant attribution', () => {
  const art = buildDayArtwork(analyzeGrants([grant('Alpha', 4000), grant('Beta', 4018), grant('Pending', null)]));
  assert.equal(art.dots.length, 8018);
  assert.equal(art.missingEstimates, 1);
  assert.equal(new Set(art.dots.map(dot => dot.id)).size, 8018);
  assert.equal(new Set(art.dots.map(dot => `${dot.x},${dot.y}`)).size, 8018);
  for (const award of art.grants) {
    const days = art.dots.filter(dot => dot.grantId === award.id);
    assert.equal(days.length, award.count);
    assert.deepEqual(days.map(dot => dot.dayInGrant), Array.from({ length: award.count }, (_, i) => i + 1));
  }
  const svg = artworkSVG(art);
  assert.equal((svg.match(/<circle /g) ?? []).length, 8018);
  assert.equal((svg.match(/data-dot-index=/g) ?? []).length, 8018);
  assert.match(svg, /8,018 good days\. One dot for each\./);
  assert.ok(art.dots.every(dot => dot.label.includes(art.grants[dot.grantIndex].source.grantee)));
});

test('refresh growth, source reordering, and repeated grants preserve unique identities', () => {
  const rows = [grant('Alpha', 4), grant('Beta', 6)];
  const first = buildDayArtwork(analyzeGrants(rows));
  const reordered = buildDayArtwork(analyzeGrants([...rows].reverse()));
  assert.deepEqual(first.dots.map(dot => dot.id), reordered.dots.map(dot => dot.id));
  const grown = buildDayArtwork(analyzeGrants([grant('Alpha', 7), grant('Beta', 6)]));
  assert.equal(grown.dots.length, 13);
  assert.ok(first.dots.every(dot => grown.dots.some(next => next.id === dot.id)));
  const duplicate = buildDayArtwork(analyzeGrants([grant('Alpha', 4), grant('Alpha', 4)]));
  assert.equal(new Set(duplicate.dots.map(dot => dot.id)).size, 8);
});

test('empty, missing, and zero estimates are not converted into invented days', () => {
  for (const rows of [[], [grant('Missing', null)], [grant('Zero', 0)]]) {
    const art = buildDayArtwork(analyzeGrants(rows));
    assert.equal(art.total, 0); assert.equal(art.dots.length, 0);
    assert.equal((artworkSVG(art).match(/<circle /g) ?? []).length, 0);
  }
});

test('invalid, fractional, mismatched, or excessive counts fail visibly instead of rounding', () => {
  for (const bad of [2.5, -1, NaN, Infinity, 100001]) {
    const data = analyzeGrants([grant('Alpha', 2)]);
    data.rows[0].goodDays = bad; data.totals.goodDays = bad;
    assert.throws(() => buildDayArtwork(data));
  }
  const mismatch = analyzeGrants([grant('Alpha', 2)]);
  mismatch.totals.goodDays = 3;
  assert.throws(() => buildDayArtwork(mismatch), /disagree/);
});

test('sunrise layout remains distinct and bounded for small and large totals', () => {
  for (const count of [0, 1, 2, 3, 7, 18, 365, 8018, 100000]) {
    const dots = sunrisePositions(count);
    assert.equal(dots.length, count);
    assert.equal(new Set(dots.map(dot => `${dot.x},${dot.y}`)).size, count);
    assert.ok(dots.every(dot => Number.isFinite(dot.x) && Number.isFinite(dot.y) && dot.radius > 0 && dot.x >= 60 && dot.x <= 940 && dot.y >= 70 && dot.y <= 515));
  }
});

test('untrusted grant text cannot escape SVG labels or metadata', () => {
  const art = buildDayArtwork(analyzeGrants([grant('</title><script>alert("x")</script>&', 1)]));
  const svg = artworkSVG(art);
  assert.ok(!svg.includes('<script>'));
  assert.match(svg, /&lt;script&gt;/);
  assert.match(svg, /&amp;/);
});
