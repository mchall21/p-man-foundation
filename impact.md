# Impact Page Spec — P-Man Foundation

## Purpose

The Impact page is where we show supporters what their dollars actually do.  
It combines storytelling with live data visualization from our grants log.

---

## Content & Design Guidance

### Intro Block
We fund small, practical grants that create sober social activities. Those days stack up.  
With modest dollars and repeatable programs, we turn ordinary meetups — rides, hikes, open mics, gym nights — into **one more good day** after another.

### At-a-glance Counters
- **Total granted (to date)**  
- **Estimated “good days” created**  
- **Overall cost per good day**

**Design:** animated counters that pull from live grant data.

---

### Visualizations

#### 1. Good Days by Year — *Bar Chart*
**Goal:** Show growth & consistency of outcomes over time.  
**Data:** Sum of `Good Days` by grant year.  
**Design:** Vertical bars with data labels and tooltip {year, good days, dollars granted}.  
**Caption:** “Good days are participant-days created by funded activities.”

#### 2. Cost per Good Day — *Stat Tiles (with optional distribution)*
**Goal:** Transparency on efficiency.  
**Data:** Min, Median, Max cost/day across grants.  
**Design:** Three large stat tiles. Optional: scatter/dot plot showing spread.  
**Copy below:**  
> Most programs deliver low cost per good day; one-off celebrations cost more but help people reconnect with community.

#### 3. Activity Mix — *Donut Chart with Filters*
**Goal:** Show the kinds of sober activities funded.  
**Data:** `Sober Social Activity Type` tags (Physical, Outdoors, Social, The Arts, Spiritual).  
**Design:** Donut segments; multi-select filters for tags.  
**Copy note:** Activities can overlap.

#### 4. Top “Good Day” Producers — *Horizontal Bar List*
**Goal:** Spotlight the most impactful grants.  
**Data:** Top 10 by `Good Days`.  
**Design:** Horizontal bars labeled with grant name, good days, and cost/day.  
**Interaction:** Click → detail modal with description, photo, quote.

---

### Stories (Grant Cards)

Each card: photo + 60–90 words + metric + optional link. Start with:

- **“Pickleball made easy.”** Brainwashed Coffee used $1,000 to host sober pickleball — **400 good days at ~$3/day.**  
- **“A stage for real life.”** R2ise Theater’s production drew crowds — **750 good days at ~$4/day.**  
- **“A path around relapse.”** Lightway Recovery’s walking path gives a safe loop — **600 good days at ~$5/day.**  
- **“Boards that bring people back.”** Docs Place bought surf boards for sober surfing — **360 good days at ~$4/day.**

---

### Methods Box
> **How we count “good days.”**  
> Each grant includes *Estimated Days* and *Participants*. We calculate **Good Days = Days × Participants** within a conservative year.  
> - One-off events = participants that day.  
> - Recurring series = sessions × attendance.  
> - Equipment/paths = small daily users × many days.  
> Numbers come directly from our grant log and can be updated as programs report actuals.

Include a **“Download current data (CSV)”** link back to the Google Sheet.

---

### CTAs
Keep Donate + Apply buttons visible at top and bottom.

---

## Technical Implementation

### Data Source
- **Google Sheet**: https://docs.google.com/spreadsheets/d/1vtqYR9gcFz_xNPAw7tdz_qB7JjIDO_uHrTYW-BoKKcg/edit?gid=0#gid=0
- Publish tab as CSV:
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={TAB_GID}

csharp
Copy
Edit
- Env var: `GRANTS_CSV_URL`

### Server-side Fetch Pipeline
- Fetch CSV (server-side, not client).  
- Parse → normalize fields:  
- `amount` → float  
- `year` → from `Date`  
- `tags` → split `Sober Social Activity Type`  
- `goodDays` → use provided Good Days if >0; else compute Days×Participants  
- `costPerGD` → amount / goodDays  
- Cache result for 10–15 minutes (ISR/stale-while-revalidate).  
- Provide `/api/grants.json` to the front-end.

### Derived Datasets
- **Totals**: dollars, goodDays, cost/day overall  
- **By Year**: group by year → sum  
- **By Tag**: group by normalized tags (overlaps allowed)  
- **Top Producers**: sort grants by goodDays desc  
- **Cost Stats**: min/median/max of cost/day

### API Contract (example)
```json
{
"updatedAt": "2025-08-16T14:12:00Z",
"totals": { "dollars": 127101, "goodDays": 7611, "costPerGD": 16.7 },
"byYear": [{ "year": 2020, "dollars": 3600, "goodDays": 120 }, ...],
"byTag": [{ "tag": "Physical", "dollars": 4383, "goodDays": 4383 }, ...],
"top": [{ "grantee":"R2ise Theater","goodDays":750,"costPerGD":4,"description":"Theater performance..." }],
"rows": [ { "grantee":"...", "date":"...", "amount":1000, "goodDays":30, "tags":["Social","Arts"], ... } ]
}
Frontend
All charts consume /api/grants.json.

Show “Data last updated …” timestamp.

Add query param ?refresh=1 for dev cache-bust.

Edge Cases
Skip rows with 0 or invalid amount/good days in cost-per-day charts.

Tag normalization: “Arts” == “The Arts”, “Outdoors” vs “Outdoor”.