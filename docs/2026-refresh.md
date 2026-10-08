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
- Replaced the old 10th-ride ticket link with Matthew’s confirmed 2026 Eventbrite URL.
- Removed unavailable pledge promises and unsupported donation-to-outcome examples.
- Grant parsing handles quoted multiline fields and formatted numbers. Award Year works separately from Date. Unknown impact does not remove funded awards. No fabricated fallback totals.
- Impact page explains coverage, funding vs payment, overlapping categories, and estimated participant-days.
- Canonical public sheet is the default data source; GRANTS_CSV_URL/GRANTS_SHEET_ID/GRANTS_SHEET_GID can override it.

## Review items before production

- Editor access and verified 2026 import.
- 2026 registration URL confirmed and linked from the homepage and ride page.
- Video playback verified in the embedded Drive player. Its closed-caption control is disabled; a caption track is still needed.
- Preview review. Vercel build passed for the preview. The connected Vercel account lacks access to this project/team, so remote browser verification remains blocked by SSO; local desktop/mobile checks passed. Do not merge to production until requested.

## Validation

- Three focused grant-data regression tests passed.
- Canonical CSV reconciles to 63 awards / $127,101 / 6,921 estimated good days.
- TypeScript and scoped ESLint passed; Vercel preview build passed.
- Homepage and Impact render at 390px without page overflow; main mobile navigation opens.
- Photo gallery and 2026 ride page render; embedded video reaches playing state.
- Simulated grant-network failure renders unavailable copy instead of fake data or a permanent skeleton.

## Review revision: onsite media and grant features

Replaced the Drive iframe with a native HTML5 player and a 40 MB, 720p H.264/AAC derivative of the supplied 2025 film (original remains in Drive). The film loads only after the visitor presses play. Removed Drive album/photo exits; gallery photos open website-hosted files. The impact-page source link now points to the onsite grant records.

Replaced the automatically ranked spreadsheet cards with four editorial summaries matched to specific historical awards (organization, year, amount). Copy describes funded activities, not measured outcomes or participant testimonials. Uses the 2025 No Longer Bound equipment award, 2022 Hickey House equipment award, 2024 Brainwashed Coffee pickleball award, and 2021 Doc’s Place surfing award.

Validation: scoped ESLint, TypeScript, desktop/mobile layout and native video playback. No source sharing permissions changed. Supplied film has no caption track; a reviewed transcript/caption file is still needed.

## Ride history refresh

Rebuilt the history page as a chronological, shirt-led archive. All nine 2016–2024 shirt designs and 15 existing historical photos are visible inline, with year anchors and a 2025 photo row linking to the full gallery and film. Removed the carousel and photo modal. Added a shared illustrated history feature on the ride and Patrick story pages, plus a footer archive link. Desktop and 390px browser checks verified layout, year-anchor positioning, and entry links; scoped ESLint and TypeScript passed.

## Shirt design context

Matthew supplied and confirmed the design references: 2017 Outkast, 2018 Atlanta skyline, 2019 Mike Ditka/Chicago Bears, 2020 COVID, 2021 Chicago flag, 2022 Irish roots, 2023 Troy’s Decide brand, 2024 Peachtree Road Race, and 2025 One More Good Day/tenth anniversary. Added Audrey’s credit (Patrick’s sister-in-law), with the 2023 heart design exception. Intro now explains that most years capture something important to Patrick.

## Event registration and favicon

Added the approved Eventbrite copy, 9:30 AM arrival, 10 AM speakers/grantee panel, 10:30 AM kids’ ride, 11 AM adult ride, and noon lunch/socializing. Added Grant Park pavilion and parking details, ticket links on the ride page and homepage, and replaced the old Eventbrite constant. All new event copy avoids em dashes.

Added a navy/cream bicycle favicon matching the Lucide header mark, with SVG, multi-size ICO, and Apple touch icon. Verified rendered icon metadata, local icon delivery, ticket destinations, all schedule times, and desktop/390px layouts. Scoped ESLint and TypeScript passed. Eventbrite blocked the automated page read; the ticket URL and copy were supplied and confirmed by Matthew.

## Content preservation review

Compared the refresh against origin/main after Matthew flagged lost content. Restored a prominent Patrick photo/story feature, the full explanation of ticket-funded event costs and 100% of donations going to grants, and all three older community photographs on the homepage. Restored desktop mission navigation and a ride-page mission link; fixed the footer’s pre-existing /about link to the actual Patrick page. The refreshed inline shirt/photo archive and approved design captions remain.

Patrick’s full story and the foundation’s mission, values, and background were retained. Grant application FAQs remain, with updated award/timing details. Kept corrections removing unsupported donation-to-outcome price examples, mock grant totals, and promises of an unavailable per-mile pledge product. The former rotating community hero is now a visible photo collection, preserving the images alongside the new 2025 hero. Verified 1024px desktop and 390px mobile layouts and restored content visibility; scoped lint passed.

## Best-effort 2026 good-day estimates

Matthew authorized best-effort estimation on October 7. Prepared 1,097 additional participant-days across 14 of the 15 approved awards; the individual recovery-support grant remains outside the sober-social metric. Added to the existing 6,921 snapshot, the combined estimate is 8,018. These are forecasts, not attendance actuals.

Per-award calculations and assumptions are in `2026-good-day-estimates.json`; the import payload now includes native formulas and cell notes. Application-based subtotal is 354; the remaining 743 uses explicit assumptions about partial funding, attendance, or duration. Do not describe the aggregate as unique people or exclusively attributable outcomes.

Retried the canonical sheet update after inspecting the blank target rows. Google again returned PERMISSION_DENIED. Neither canonical data nor website totals changed. Editor access for the connected account is still required; re-read target rows before applying the payload to avoid overwriting later changes.
