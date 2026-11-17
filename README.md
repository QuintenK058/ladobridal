# Lado Bridal — ladobridal.com

Static Astro site: every route is pre-rendered to full HTML (content, meta, hreflang and JSON-LD in the initial response).

## Run
```
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ + sitemap.xml
npm run check      # QA pass: H1s, titles, links, hreflang, JSON-LD, placeholders → QA-PLACEHOLDERS.tsv
npm run og         # regenerate per-page OG images into public/og (needs Playwright), then build again
```

## Where things live
| What | File |
|---|---|
| Facts, prices, contact, regions | `src/data/site.ts` |
| Real Google reviews (paste here, never invent) | `src/data/reviews.ts` |
| Regional pages (unique copy per region) | `src/data/regions.ts` → `src/pages/[region].astro` |
| Wedding-location pages | `src/data/locations.ts` → `src/pages/trouwlocaties/[slug].astro` |
| Guides (briefs, noindex until `ready: true`) | `src/data/site.ts` GUIDES + `src/pages/gidsen/[slug].astro` |
| NL⇄EN page pairs (hreflang + language toggle) | `src/data/i18n.ts` |
| Design tokens, components, motion CSS | `src/styles/global.css` (see `/styleguide`) |
| Motion, menu, carousel, gallery, lightbox | `src/scripts/main.ts` |
| Booking funnel | `src/components/LeadForm.astro` + `src/scripts/form.ts` |
| Price calculator | `src/pages/tarieven.astro` + `src/scripts/calc.ts` |
| Consent Mode v2, GA4, Meta Pixel, UTM | `src/scripts/track.ts` |

## Photos
`<Img shot="…">` renders a labelled placeholder (no stock brides). For a real photo export
`naam-800.avif/.webp` and `naam-1600.avif/.webp` to `public/img/` and pass `src="/img/naam"` + Dutch `alt`.
Filename convention: `bruidskapsel-los-opgestoken-friesland`.

## Backend (Supabase + Resend)
1. Create a Supabase project (EU region). Run `supabase/migrations/20261117000000_leads.sql`
   (leads table, insert-only RLS, rate-limit trigger, private `inspiratie` bucket).
2. Deploy `supabase/functions/notify-lead` with secrets `RESEND_API_KEY` and `MAIL_FROM`; verify ladobridal.com in Resend (SPF/DKIM).
3. Add a Database Webhook: table `leads`, event INSERT → the `notify-lead` function.
4. Copy `.env.example` to `.env` (or set in the host) with `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`.
Without Supabase env the form falls back to opening the visitor’s mail app.

## Hosting
Netlify or Cloudflare Pages: build `npm run build`, publish `dist`. `public/_headers` and `public/_redirects` are included.
URLs are extensionless (`/bruidsstylist-friesland`), exactly as today — no existing URL changes.
Before switching DNS: export all indexed URLs from Search Console and check each one resolves.

## Before launch
- Work through `PLACEHOLDERS.md` and `QA-PLACEHOLDERS.tsv` (`npm run check`).
- Remove or protect `/styleguide`.

## Test status (17 nov 2026)
- `npm run check`: 53 pages, only open issues are the home title/description length (taken verbatim from the brief).
- All routes at 360/390/768/1024/1440 px: no horizontal overflow, no JS errors (Chromium).
- Lighthouse mobile (local preview): performance 93–99, accessibility 100, best practices 100, SEO 100 on all 12 measured pages; CLS ≤ 0.08 after metric-matched fallback fonts.
- Keyboard: skip link, mega menu, mobile menu, drawer focus trap, FAQ, carousel, lightbox.
- Booking funnel tested end-to-end against a mocked Supabase (payload, consent update, redirect).
- **Not tested here:** Safari / iOS (no WebKit in the build environment) and the real Supabase/Resend project — test both on a staging URL before launch.
