/**
 * Single source of truth for verified business facts.
 * Anything marked CHECK must be confirmed with Quinty before launch — see PLACEHOLDERS.md.
 */
export const SITE = {
  url: 'https://ladobridal.com',
  name: 'Lado Bridal',
  owner: 'Quinty Kant',
  ownerTitle: 'MUAH-gecertificeerd bruidsstylist & make-up artist',
  city: 'Leeuwarden',
  province: 'Friesland',
  email: 'info@ladobridal.com',
  phone: '+31 6 37092185',
  phoneDisplay: '06 37 09 21 85',
  phoneHref: 'tel:+31637092185',
  whatsapp: 'https://wa.me/31637092185',
  instagram: 'https://www.instagram.com/lado.bridal/',
  instagramHandle: '@lado.bridal',
  // CHECK: replace with the real Google Business Profile URL + review link.
  googleProfileUrl: 'https://www.google.com/search?q=Lado+Bridal+Leeuwarden',
  googleReviewUrl: '',
  // CHECK: KVK number is legally required on the website.
  kvk: '',
  // CHECK: is the studio address public? Until confirmed the site is a service-area business.
  streetAddress: '',
  postalCode: '',
  geo: { lat: 53.2012, lng: 5.7999 }, // Leeuwarden city centre (not the studio)
  rating: { value: 5.0, count: 8 }, // CHECK current review count before launch
  stats: { years: 4, brides: 40, international: 5 },
  lastUpdated: '2026-11',
} as const;

export function waLink(text: string) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Prices — consumer prices must be shown incl. btw (or confirm KOR). CHECK all. */
export const PRICES = {
  completeBruidslook: 600 as number | null, // CHECK incl. btw
  bruidskapsel: null as number | null,       // CHECK — "vanaf" price needed
  bruidsvisagie: null as number | null,      // CHECK — "vanaf" price needed
  guest: 75,          // bridesmaid/guest, hair OR make-up, per person
  mother: 75,         // mother of the bride incl. styling advice
  lashes: 15,         // extra set of lashes
  photoshoot: 175,    // photoshoot/editorial, per look, from
  touchUpHour: 65,    // extra touch-up hour
  perKm: 0.35,        // round trip: one-way km × 2 × €0.35
  overnightFromKm: 75,
  deposit: 25,        // %
};

export const euro = (n: number, lang: 'nl' | 'en' = 'nl') =>
  new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2,
  }).format(n);

export const travelCost = (oneWayKm: number) => Math.round(oneWayKm * 2 * PRICES.perKm * 100) / 100;

export const INCLUDED_NL = [
  'Telefonische intake: we bespreken je dag, je jurk en je wensen',
  'Volledige proefsessie in de studio in Leeuwarden',
  'Premium, langhoudende en huidvriendelijke producten',
  'Hygiënische werkwijze: schone kwasten en materialen per persoon',
  'Op-tijd-garantie dankzij een ruime planning',
  'Persoonlijke styling guide voor de dag zelf',
];
export const INCLUDED_EN = [
  'Phone intake: we talk through your day, your dress and your wishes',
  'A full trial session in the studio in Leeuwarden',
  'Premium, long-wear, skin-friendly products',
  'A hygienic way of working: clean brushes and tools for every person',
  'On-time guarantee thanks to generous planning',
  'A personal styling guide for the day itself',
];

export const DESTINATIONS_NL = ['Italië', 'Spanje', 'Frankrijk', 'Portugal', 'Oostenrijk', 'Griekenland', 'België', 'Duitsland'];
export const DESTINATIONS_EN = ['Italy', 'Spain', 'France', 'Portugal', 'Austria', 'Greece', 'Belgium', 'Germany'];

export const SERVICES_NL = [
  { slug: '/bruidskapsel', name: 'Bruidskapsel', line: 'Los, half-los of opgestoken, gestyled om de hele dag te blijven zitten.', shot: 'bruidskapsel achterkant · 4:5' },
  { slug: '/bruidsvisagie', name: 'Bruidsvisagie', line: 'Make-up die op je huid lijkt, en die foto’s, tranen en dansen overleeft.', shot: 'make-up close-up · 4:5' },
  { slug: '/complete-bruidslook', name: 'Complete Bruidslook', line: 'Haar en make-up in één hand: één visie, één planning, een rustige ochtend.', shot: 'bruid volledige look · 4:5' },
  { slug: '/gala-en-gasten-styling', name: 'Gala & gasten', line: 'Voor bruidsmeisjes, moeders, gasten, gala’s en fotoshoots.', shot: 'bruidsmeisjes groep · 4:5' },
];

export const REGIONS = [
  { slug: '/bruidsstylist-friesland', name: 'Friesland', label: 'Bruidsstylist Friesland', note: 'Thuisprovincie' },
  { slug: '/bruidsstylist-leeuwarden', name: 'Leeuwarden', label: 'Bruidsstylist Leeuwarden', note: 'Studio & proefsessie' },
  { slug: '/bruidsstylist-groningen', name: 'Groningen', label: 'Bruidsstylist Groningen', note: 'Stad & ommeland' },
  { slug: '/bruidsstylist-drenthe', name: 'Drenthe', label: 'Bruidsstylist Drenthe', note: 'Schuren & landgoederen' },
  { slug: '/bruidsstylist-zwolle', name: 'Zwolle & Overijssel', label: 'Bruidsstylist Zwolle', note: 'Via de A32/A28' },
  { slug: '/bruidsstylist-noord-holland', name: 'Noord-Holland', label: 'Bruidsstylist Noord-Holland', note: 'Via de Afsluitdijk' },
  { slug: '/bruidsstylist-nederland', name: 'Heel Nederland', label: 'Bruidsstylist op locatie in Nederland', note: 'Alle regio’s' },
];

export const LOCATIONS = [
  { slug: '/trouwlocaties/landgoed-friese-wouden', name: 'Landgoederen in de Friese Wouden', anchor: 'Bruidsstyling op een landgoed in de Friese Wouden' },
  { slug: '/trouwlocaties/friese-meren', name: 'Trouwen aan de Friese Meren', anchor: 'Bruidsstyling aan de Friese Meren' },
  { slug: '/trouwlocaties/borgen-groningen', name: 'Borgen in Groningen', anchor: 'Bruidsstyling op een Groningse borg' },
  { slug: '/trouwlocaties/stadhuis-leeuwarden', name: 'Stadhuis Leeuwarden', anchor: 'Bruidsstyling voor een bruiloft op het stadhuis in Leeuwarden' },
  { slug: '/trouwlocaties/waddeneilanden', name: 'Waddeneilanden', anchor: 'Bruidsstyling op de Waddeneilanden' },
  { slug: '/trouwlocaties/schuurbruiloft-drenthe-overijssel', name: 'Schuurbruiloft in Drenthe & Overijssel', anchor: 'Bruidsstyling voor een schuurbruiloft' },
];

export const GUIDES = [
  { slug: '/wat-kost-een-bruidsstyliste-friesland', title: 'Wat kost een bruidsstyliste in Friesland?', ready: true },
  { slug: '/gidsen/planning-trouwochtend-haar-en-make-up', title: 'Zo plan je je trouwochtend: haar en make-up', ready: false },
  { slug: '/gidsen/bruidskapsel-los-of-opgestoken', title: 'Bruidskapsel: los of opgestoken?', ready: false },
  { slug: '/gidsen/bruidsmake-up-die-de-hele-dag-blijft-zitten', title: 'Bruidsmake-up die de hele dag blijft zitten', ready: false },
  { slug: '/gidsen/proefsessie-voorbereiden-checklist', title: 'Je proefsessie voorbereiden: de checklist', ready: false },
];
