import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildDayArtwork, artworkSVG } from '../lib/good-day-art';
import { frontMarkSVG, kidsArtworkSVG, weeklyMarks } from '../lib/shirt-print-art';

const [snapshotPath, outputPath] = process.argv.slice(2);
if (!snapshotPath || !outputPath) throw new Error('Usage: tsx scripts/export-shirt-art.ts grant-snapshot.json output-folder');
const output = resolve(outputPath);
mkdirSync(output, { recursive: true });
const data = JSON.parse(readFileSync(snapshotPath, 'utf8'));
const art = buildDayArtwork(data);
const files = {
  'adult-back-12in-editable.svg': artworkSVG(art),
  'kids-back-8in-editable.svg': kidsArtworkSVG(art),
  'adult-front-3.5in-editable.svg': frontMarkSVG(3.5),
  'kids-front-2.5in-editable.svg': frontMarkSVG(2.5),
};
for (const [name, svg] of Object.entries(files)) writeFileSync(resolve(output, name), svg);
writeFileSync(resolve(output, 'count-verification.json'), JSON.stringify({
  source: 'https://www.pmanfoundation.org/api/grants', fetchedAt: art.fetchedAt,
  adultDots: art.dots.length, goodDays: art.total,
  kidsFullWeekDots: Math.floor(art.total / 7), kidsPartialDotDays: art.total % 7,
  kidsRepresentedDays: weeklyMarks(art).reduce((sum, mark) => sum + mark.days, 0),
  estimateCoverage: { contributingGrants: art.grants.length, grantsWithoutEstimates: art.missingEstimates },
}, null, 2));
console.log(`Exported adult and kids artwork for ${art.total} good days to ${output}`);
