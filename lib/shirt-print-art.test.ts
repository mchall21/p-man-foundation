import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeGrants, processGrant } from './grants';
import { buildDayArtwork } from './good-day-art';
import { kidsArtworkSVG, weeklyMarks } from './shirt-print-art';

function artFor(count: number) {
  return buildDayArtwork(analyzeGrants([processGrant({ Grantee: 'Example', Amount: '100', 'Good Days': String(count) })!]));
}

test('kids artwork accounts for all 8,018 days with 1,145 weeks and three remaining days', () => {
  const art = artFor(8018), marks = weeklyMarks(art);
  assert.equal(marks.length, 1146);
  assert.equal(marks.filter(mark => mark.days === 7).length, 1145);
  assert.equal(marks.at(-1)?.days, 3);
  assert.equal(marks.reduce((sum, mark) => sum + mark.days, 0), 8018);
  assert.deepEqual(marks.flatMap(mark => mark.memberIds), art.dots.map(dot => dot.id));
  const svg = kidsArtworkSVG(art);
  assert.equal((svg.match(/data-unit-days="7"/g) ?? []).length, 1145);
  assert.equal((svg.match(/data-unit-days="3"/g) ?? []).length, 1);
  assert.match(svg, /1,145 good weeks \+ 3 good days\./);
});

test('weekly print handles empty totals, exact weeks, and every remainder without rounding', () => {
  for (let count = 0; count <= 22; count++) {
    const art = artFor(count), marks = weeklyMarks(art);
    assert.equal(marks.length, Math.ceil(count / 7));
    assert.equal(marks.reduce((sum, mark) => sum + mark.days, 0), count);
    assert.equal(marks.filter(mark => mark.days < 7).length, count % 7 ? 1 : 0);
  }
});
