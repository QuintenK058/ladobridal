# By Lado — hair extensions website

Static Astro site for By Lado, a hair extensions studio (every route pre-rendered to full HTML: content, meta, hreflang, JSON-LD).

```
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ + sitemap.xml
npm run check    # QA: H1s, titles, links, hreflang, JSON-LD, placeholders, duplicate sentences vs ../lado-bridal/dist
npm run og       # regenerate OG images (Playwright), then build again
```

## Where things live
| What | File |
|---|---|
| Contact, prices, booking, rating (all CHECK items) | `src/data/site.ts` |
| Methods (+ `offered` flag, numbers per method) | `src/data/methods.ts` |
| Method page copy | `src/data/methodContent.ts` → `src/pages/[method].astro` |
| Results, reviews, quiz advice logic | `src/data/content.ts` |
| Guides | `src/data/guides.ts` |
| Calculator model | `CALC` in `src/data/site.ts` + `src/scripts/calc.ts` |
| Consult form + quiz engine | `src/scripts/steps.ts` |
| Signature motions (strand, length reveal, swatches, video, before/after, offer) | `src/scripts/brand.ts` |
| Tokens & components | `src/styles/global.css` (see `/styleguide`) |

## How “unknown” is handled
- Empty contact fields hide the buttons that need them (e.g. no WhatsApp number → no WhatsApp buttons).
- `offered: null` methods are built but **noindex** and left out of the sitemap; set `true` (or `false` to remove).
- Prices `null` show `[PRIJS]`; the calculator shows “prijs volgt” and hides totals instead of guessing.
- Empty `RESULTS` / `REVIEWS` render clearly labelled placeholder slots; filters appear only with enough real items.

## Backend
Supabase: run `supabase/migrations/20261117000000_leads.sql` (leads table for consult/quiz/guide, insert-only RLS, rate limit, private `haarfotos` bucket). Deploy `supabase/functions/notify-lead` (secrets `RESEND_API_KEY`, `MAIL_FROM`, `OWNER_EMAIL`) and add a Database Webhook on INSERT. Env: see `.env.example` (incl. `PUBLIC_TIKTOK_PIXEL_ID`).

## Hosting
Vercel: import the repo; `vercel.json` sets clean URLs and headers. Set the env vars in the Vercel project.

## Test status (17 nov 2026)
- `npm run check`: 44 pages, 0 issues, 0 sentences shared with ladobridal.com.
- 35 routes × 360/390/768/1024/1440 px: no overflow, no JS errors (Chromium).
- Extension-check: all 36 goal × hair type × lifestyle paths reach a result.
- Consult flow, calculator → consult prefill, `?type=onderhoud`, sticky bar, overlay (Esc) tested.
- Results lightbox (before/after slider, prev/next, Esc, focus return, tap toggle on touch) and printable aftercare card (/nazorg → print or save as PDF) tested.
- Lighthouse mobile (local): performance 94–99, accessibility 100, SEO 100 (method pages show lower SEO only because they are noindex until confirmed); CLS ≤ 0.001.
- Not tested here: Safari/iOS, real Supabase/Resend, real videos/photos.
