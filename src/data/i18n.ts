export const PAIRS: Record<string, string> = {
  '/': '/en', '/extensions': '/en/extensions', '/prijzen': '/en/prices', '/resultaten': '/en/results', '/reviews': '/en/reviews',
  '/over-quinty': '/en/about-quinty', '/consult': '/en/consult', '/extension-check': '/en/extension-check', '/nazorg': '/en/aftercare',
  '/bedankt': '/en/thank-you', '/privacy': '/en/privacy', '/contact': '/en/contact',
};
const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(PAIRS).map(([a, b]) => [b, a]));
export const langOf = (p: string): 'nl' | 'en' => (p === '/en' || p.startsWith('/en/') ? 'en' : 'nl');
export const counterpart = (p: string) => (langOf(p) === 'nl' ? PAIRS[p] : REVERSE[p]);
