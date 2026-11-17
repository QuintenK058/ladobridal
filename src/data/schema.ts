import { SITE, PRICES } from './site';

export const BUSINESS_ID = `${SITE.url}/#business`;
export const PERSON_ID = `${SITE.url}/#quinty`;

export const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: stripHtml(i.a) } })),
  };
}

export function serviceSchema(opts: { name: string; path: string; description: string; area?: { type: 'City' | 'AdministrativeArea' | 'Country'; name: string }[]; price?: number | null }) {
  const s: Record<string, unknown> = {
    '@type': 'Service',
    '@id': `${SITE.url}${opts.path}#service`,
    name: opts.name,
    serviceType: 'Bruidsstyling',
    description: opts.description,
    provider: { '@id': BUSINESS_ID },
    url: `${SITE.url}${opts.path}`,
  };
  if (opts.area?.length) s.areaServed = opts.area.map((a) => ({ '@type': a.type, name: a.name }));
  const price = opts.price === undefined ? PRICES.completeBruidslook : opts.price;
  if (price) s.offers = { '@type': 'Offer', priceCurrency: 'EUR', price, priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'EUR', valueAddedTaxIncluded: true }, url: `${SITE.url}/tarieven` };
  return s;
}

export function articleSchema(opts: { headline: string; path: string; description: string; dateModified: string; datePublished?: string }) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: `${SITE.url}${opts.path}`,
    dateModified: opts.dateModified,
    datePublished: opts.datePublished ?? opts.dateModified,
    author: { '@id': PERSON_ID },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'nl-NL',
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.owner,
    jobTitle: 'Bruidsstylist & make-up artist (MUAH-gecertificeerd)',
    worksFor: { '@id': BUSINESS_ID },
    sameAs: [SITE.instagram],
    knowsLanguage: ['nl', 'en'],
  };
}

export function businessSchema() {
  const address: Record<string, string> = { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.province, addressCountry: 'NL' };
  if (SITE.streetAddress) { address.streetAddress = SITE.streetAddress; address.postalCode = SITE.postalCode; }
  return {
    '@type': ['BeautySalon', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og/default.png`,
    description: 'Bruidskapsel en bruidsmake-up door Quinty Kant, MUAH-gecertificeerd. Proefsessie in Leeuwarden, styling op locatie in Noord-Nederland, de rest van Nederland en het buitenland.',
    telephone: SITE.phone,
    email: SITE.email,
    address,
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: [
      ...['Friesland', 'Groningen', 'Drenthe', 'Overijssel', 'Noord-Holland', 'Flevoland', 'Utrecht'].map((name) => ({ '@type': 'AdministrativeArea', name })),
      ...['Nederland', 'Italië', 'Spanje', 'Frankrijk', 'Portugal', 'Oostenrijk', 'Griekenland', 'België', 'Duitsland'].map((name) => ({ '@type': 'Country', name })),
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    sameAs: [SITE.instagram, SITE.googleProfileUrl].filter((u) => u && !u.includes('google.com/search')),
    founder: { '@id': PERSON_ID },
  };
}
