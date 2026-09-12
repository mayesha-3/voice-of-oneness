# The Voice of Oneness — National Qur'an Recitation Competition (TV One UK)

Foundational codebase and static site scaffold for **The Voice of Oneness**, a national Qur'an recitation competition organized by TV One UK since 2021 (Season 6).

## Stack Overview
- **Framework**: Astro (static HTML output for zero-JS default performance and high SEO ranking)
- **Interactive Islands**: React (`.tsx`) for client-side interactivity (`client:load`, `client:visible`)
- **Styling**: Tailwind CSS with custom brand color tokens (`tvone-orange`, `tvone-blue`, `tvone-gold`)
- **Data Layer**: Local JSON files in `src/content/` (no backend required)
- **Deployment Target**: Static export compatible with Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## Folder Structure

```
frontend/
├── public/
│   └── placeholders/          # Place images and thumbnails here
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # Global head, SEO meta/OG, JSON-LD, Navbar, Footer
│   ├── pages/
│   │   ├── index.astro        # Homepage (HeroCountdown, LiveBanner, RoundProgress, UpdatesFeed)
│   │   ├── this-year.astro    # Season 6 Hub (DailyLineupTabs, RoundProgress, StreamPlayer)
│   │   ├── gallery.astro      # 6-Year Archive (YearFilterGrid)
│   │   ├── hall-of-fame/
│   │   │   ├── index.astro    # Winners Grid (WinnerCard)
│   │   │   └── [slug].astro   # Dynamic Winner Profile (getStaticPaths from winners.json)
│   │   ├── organizers.astro   # TV One UK & Chairman vision
│   │   ├── team.astro         # Presenters & Judges (TeamTabs)
│   │   ├── sponsors.astro     # Sponsors & partner showcase
│   │   └── contestants.astro  # Top 40 & Top 10 lists (ContestantStageList)
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroCountdown.tsx
│   │   │   ├── LiveBanner.tsx
│   │   │   └── UpdatesFeed.tsx
│   │   ├── this-year/
│   │   │   ├── DailyLineupTabs.tsx
│   │   │   ├── RoundProgress.tsx
│   │   │   └── StreamPlayer.tsx
│   │   ├── gallery/
│   │   │   └── YearFilterGrid.tsx
│   │   ├── hall-of-fame/
│   │   │   └── WinnerCard.tsx
│   │   ├── team/
│   │   │   └── TeamTabs.tsx
│   │   ├── contestants/
│   │   │   └── ContestantStageList.tsx
│   │   └── shared/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── SEOHead.tsx
│   ├── content/
│   │   ├── winners.json        # Array of winner entries
│   │   ├── contestants.json    # Array of contestant entries
│   │   ├── updates.json        # Array of announcement entries
│   │   └── history.json        # Season-by-season milestones
│   └── styles/
│       └── global.css          # Tailwind base & layer imports
├── astro.config.mjs
├── tailwind.config.mjs         # Brand color tokens (tvone-orange, tvone-blue, tvone-gold)
├── tsconfig.json
└── package.json
```

---

## How to Add & Manage Content

### 1. Adding/Editing Winners
Edit `src/content/winners.json`. Each winner object contains:
```json
{
  "year": 2025,
  "name": "Reciter Name",
  "slug": "reciter-name",
  "photo": "/placeholders/winner-2025.jpg",
  "quote": "Inspirational quote...",
  "category": "Adults Category (18-25)",
  "location": "London, UK",
  "score": "98.5%"
}
```
*Note: Adding a new winner entry automatically generates a new static page at `/hall-of-fame/[slug]` with structured Person schema JSON-LD.*

### 2. Updating Contestants
Edit `src/content/contestants.json` with stage values: `"top40"`, `"top10"`, or `"winners"`.

### 3. Posting Competition Updates & Deadlines
Edit `src/content/updates.json`.

### 4. Adding Images
Place your images in `public/` (e.g. `public/images/winner-2025.jpg`) and reference them in JSON files or components as `/images/winner-2025.jpg`.

---

## Brand Colors & Customization

Custom brand tokens are configured in `tailwind.config.mjs`:
- `bg-tvone-orange` (`#FF5722`)
- `bg-tvone-blue` (`#0F172A`)
- `text-tvone-gold` (`#D4AF37`)

---

## Commands

```bash
# Start local dev server
npm run dev

# Generate static HTML build for production
npm run build

# Preview static build locally
npm run preview
```
