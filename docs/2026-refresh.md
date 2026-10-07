# 2026 refresh — preview review

## Sources

- Current deployed baseline: `36d6b81` on `main`.
- Canonical grant database: https://docs.google.com/spreadsheets/d/1vtqYR9gcFz_xNPAw7tdz_qB7JjIDO_uHrTYW-BoKKcg/edit
- Decisions: https://docs.google.com/spreadsheets/d/1esaDQaoVY8vTd0gd5LxA4KCWk0oMXVEPCY-pQ3aS-Xg/edit (Form Responses 1, Decision and Approved Amount).
- Matthew confirmed on October 7, 2026 that the approved applications from 2025/early 2026 are **2026 grants**.
- Media: https://drive.google.com/drive/folders/1D6ESTUXzDcVFRZpT5fNyAf6t-DEvA-aq

## Grant reconciliation

The current canonical log has 63 awards totaling $127,101 through 2025. The decision source has 15 positive approved amounts totaling $34,650. They are a separate 2026 cohort; expected combined total is 78 awards / $161,751.

Prepared import: `2026-grant-import.json`. **Not applied:** Google Sheets returned 403 permission denied for the connected account, matthew@runpoint.ai. The account needs Editor access to the canonical workbook. Do not replay the payload without re-reading A65:Q79 and O1:Q1: verify no new values were entered and that the same rows are still available. Apply once atomically using the Google Drive Sheets connector, then verify every row and formulas. The website reads the canonical sheet, so it will reflect its existing totals until import succeeds.

The import retains the 63 historical awards. It fills A65:Q79 and labels existing blank columns O:Q as Award Year, Decision Source, and Reconciliation Notes. Exact Date, Participants, Estimated Days, and outcome estimates stay blank. Formula columns D/G/M/N are preserved or explicitly generated with row-relative references; missing outcomes stay blank, not zero.

One personal recovery-support recipient is anonymized in the public-facing grant log; no private application narratives or contact details are imported. Repeat organizations retain familiar names where the source identifies them. Row 26's Jeff West is identified as Athens Recovery Warriors by the workbook's existing contact cross-reference; the current award log uses Recovery Warriors for its earlier Tough Mudder award.

The Connection Forsyth remains **$4,460 approved**. Its payment note says $4,000; record the $460 discrepancy for follow-up without reducing the approved award. These totals represent awards, not verified payments.

Historical estimated good days remain 6,921. After import, coverage should be 63 of 78 awards; 15 are awaiting estimates. Weighted cost uses only awards with recorded estimates ($127,101 / 6,921 = $18.36), not all approved funding divided by partial outcomes.

## Website changes

- Photo-led home and ride pages; cream, deep blue-green, and warm accent palette.
- 12 optimized 2025 photos (about 3 MB total), with links to originals and full album.
- 2025 recap film loads on request; Google Drive retains the source video.
- 2025 gallery/history entry, November 14, 2026 event date retained from production.
- Removed the old 10th-ride ticket link from the ride page pending a confirmed 2026 URL.
- Removed unavailable pledge promises and unsupported donation-to-outcome examples.
- Grant parsing handles quoted multiline fields and formatted numbers. Award Year works separately from Date. Unknown impact does not remove funded awards. No fabricated fallback totals.
- Impact page explains coverage, funding vs payment, overlapping categories, and estimated participant-days.
- Canonical public sheet is the default data source; GRANTS_CSV_URL/GRANTS_SHEET_ID/GRANTS_SHEET_GID can override it.

## Review items before production

- Editor access and verified 2026 import.
- Confirm current 2026 registration URL, if registration is open.
- Video playback verified in the embedded Drive player. Its closed-caption control is disabled; a caption track is still needed.
- Preview review. Vercel build passed for the preview. The connected Vercel account lacks access to this project/team, so remote browser verification remains blocked by SSO; local desktop/mobile checks passed. Do not merge to production until requested.

## Validation

- Three focused grant-data regression tests passed.
- Canonical CSV reconciles to 63 awards / $127,101 / 6,921 estimated good days.
- TypeScript and scoped ESLint passed; Vercel preview build passed.
- Homepage and Impact render at 390px without page overflow; main mobile navigation opens.
- Photo gallery and 2026 ride page render; embedded video reaches playing state.
- Simulated grant-network failure renders unavailable copy instead of fake data or a permanent skeleton.
