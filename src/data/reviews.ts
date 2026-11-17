/**
 * REVIEWS — paste ONLY real Google reviews here (exact wording, with permission for photos).
 * Never generate review text. Components fall back to clearly labelled placeholders while this is empty.
 */
export type RegionTag = 'friesland' | 'leeuwarden' | 'groningen' | 'drenthe' | 'overijssel' | 'noord-holland' | 'destination';
export type ServiceTag = 'complete' | 'kapsel' | 'visagie' | 'gasten';

export interface Review {
  id: string;
  text: string;            // exact review text from Google
  name: string;            // first name as shown on Google
  date: string;            // ISO, e.g. '2025-06-01'
  location?: string;       // e.g. 'Bruiloft in Italië'
  region?: RegionTag;
  service?: ServiceTag;
  photo?: string;          // only with the bride's written permission
  source: 'google';
  url?: string;            // link to the review on Google
  featured?: 'heat' | 'italy';
}

export const REVIEWS: Review[] = [
  // { id: 'g1', text: '…', name: '…', date: '2025-07-12', location: 'Bruiloft in Italië', region: 'destination', service: 'complete', source: 'google', featured: 'italy' },
];

/** Pick up to n reviews matching a tag, falling back to the best general ones. */
export function pickReviews(opts: { region?: RegionTag; service?: ServiceTag; featured?: Review['featured'] }, n = 2): Review[] {
  const pool = [...REVIEWS];
  const scored = pool
    .map((r) => ({ r, s: (opts.featured && r.featured === opts.featured ? 4 : 0) + (opts.region && r.region === opts.region ? 2 : 0) + (opts.service && r.service === opts.service ? 1 : 0) }))
    .sort((a, b) => b.s - a.s || b.r.date.localeCompare(a.r.date));
  return scored.slice(0, n).map((x) => x.r);
}

export function formatReviewDate(iso: string, lang: 'nl' | 'en' = 'nl') {
  return new Intl.DateTimeFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { month: 'long', year: 'numeric' }).format(new Date(iso));
}
