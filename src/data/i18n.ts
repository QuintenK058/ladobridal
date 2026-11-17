/** NL ⇄ EN route pairs. Only pages that exist in both languages get hreflang pairs. */
export const PAIRS: Record<string, string> = {
  '/': '/en',
  '/bruidskapsel': '/en/bridal-hair',
  '/bruidsvisagie': '/en/bridal-makeup',
  '/complete-bruidslook': '/en/complete-bruidslook',
  '/gala-en-gasten-styling': '/en/guests-and-events',
  '/proefsessie': '/en/trial-session',
  '/tarieven': '/en/rates',
  '/over-mij': '/en/about',
  '/contact': '/en/contact',
  '/ervaringen': '/en/reviews',
  '/portfolio': '/en/portfolio',
  '/destination-wedding-stylist': '/en/destination-wedding-stylist',
  '/destination-wedding-stylist/italie': '/en/destination-wedding-stylist/italy',
  '/bedankt': '/en/thank-you',
  '/privacy': '/en/privacy',
};
const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(PAIRS).map(([nl, en]) => [en, nl]));

export function langOf(path: string): 'nl' | 'en' {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'nl';
}
export function counterpart(path: string): string | undefined {
  return langOf(path) === 'nl' ? PAIRS[path] : REVERSE[path];
}
