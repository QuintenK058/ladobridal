/**
 * By Lado — single source of truth. Empty strings / nulls are CHECK items (see PLACEHOLDERS.md).
 * Components hide or placeholder anything that is not filled in. Never fill these with guesses.
 */
export const SITE = {
  url: 'https://bylado.nl',            // CHECK: final domain
  name: 'By Lado',
  owner: 'Quinty Kant',
  city: 'Leeuwarden',
  province: 'Friesland',
  email: '',                           // CHECK
  phone: '',                           // CHECK, e.g. '+31 6 …'
  phoneDisplay: '',
  whatsapp: '',                        // CHECK: digits only incl. country code, e.g. '316…' → enables all WhatsApp buttons
  instagram: '',                       // CHECK: full URL
  instagramHandle: '',
  tiktok: '',                          // CHECK: full URL
  reviewProfileUrl: '',                // CHECK: Google profile (separate By Lado profile)
  reviewWriteUrl: '',
  rating: null as null | { value: number; count: number; source: string }, // CHECK — real numbers only
  clients: null as null | number,      // CHECK — real number only
  kvk: '',
  streetAddress: '',                   // CHECK: public or "op afspraak"
  postalCode: '',
  geo: { lat: 53.2012, lng: 5.7999 },  // Leeuwarden centre, not the studio
  openingHours: '',                    // CHECK, e.g. 'Di–za op afspraak'
  bookingUrl: '',                      // CHECK: Salonized / Treatwell / Fresha link; empty → native form
  consultPrice: null as null | number, // CHECK: 0 = gratis
  consultMinutes: null as null | number,
  nextSlot: '',                        // CHECK: honest waiting time, e.g. 'maart' — empty hides it
  ladoBridal: 'https://ladobridal.com',
  lastUpdated: '2026-11',
};

export const hasWa = () => !!SITE.whatsapp;
export const waLink = (text: string) => (SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : '/consult');
export const euro = (n: number, lang: 'nl' | 'en' = 'nl') =>
  new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
export const ph = (label: string) => `<span class="ph">[${label}]</span>`;
export const priceOr = (n: number | null | undefined, label = 'PRIJS') => (typeof n === 'number' ? euro(n) : ph(label));

/** Price list — ALL from Quinty, incl. btw. null = not yet known. */
export const PRICES = {
  consult: null as number | null,
  maintenance: null as number | null,  // per session or per hour — CHECK model
  removal: null as number | null,
  cutBlend: null as number | null,
  toning: null as number | null,
  colourMixPerShade: null as number | null,
};

export const LENGTHS = [30, 40, 50, 60]; // cm — CHECK which lengths are available

/**
 * Calculator model — CHECK with Quinty. Price = hair+placement for the chosen method and length,
 * × amount factor (volume / lengte / beide), + colour mix, + yearly maintenance (visits × price) + new hair per year.
 * Any null makes that line show “prijs volgt” and hides the total, so nothing is ever guessed.
 */
export const CALC: {
  base: Record<string, Record<number, number | null>>; // method → length(cm) → price incl. placement
  amountFactor: Record<'volume' | 'lengte' | 'beide', number | null>;
  colourMix: number | null;
  maintenanceVisitsPerYear: Record<string, number | null>;
  newHairPerYear: Record<string, number | null>; // € per year for replacing hair
} = {
  base: { tape: { 30: null, 40: null, 50: null, 60: null }, keratine: { 30: null, 40: null, 50: null, 60: null }, weft: { 30: null, 40: null, 50: null, 60: null }, microring: { 30: null, 40: null, 50: null, 60: null }, clipin: { 30: null, 40: null, 50: null, 60: null } },
  amountFactor: { volume: null, lengte: null, beide: null },
  colourMix: null,
  maintenanceVisitsPerYear: { tape: null, keratine: null, weft: null, microring: null, clipin: 0 },
  newHairPerYear: { tape: null, keratine: null, weft: null, microring: null, clipin: null },
};
