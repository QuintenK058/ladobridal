import { SITE } from './site';
export const BUSINESS_ID = `${SITE.url}/#business`;
export const PERSON_ID = `${SITE.url}/#quinty`;
const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const faqSchema = (items: { q: string; a: string }[]) => ({ '@type': 'FAQPage', mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: strip(i.a) } })) });
export function serviceSchema(o: { name: string; path: string; description: string; price?: number | null }) {
  const s: Record<string, unknown> = { '@type': 'Service', '@id': `${SITE.url}${o.path}#service`, name: o.name, serviceType: 'Hair extensions', description: o.description, provider: { '@id': BUSINESS_ID }, areaServed: [{ '@type': 'City', name: 'Leeuwarden' }, { '@type': 'AdministrativeArea', name: 'Friesland' }], url: `${SITE.url}${o.path}` };
  if (typeof o.price === 'number') s.offers = { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: o.price, priceCurrency: 'EUR', valueAddedTaxIncluded: true } };
  return s;
}
export const articleSchema = (o: { headline: string; path: string; description: string; dateModified: string }) => ({ '@type': 'Article', headline: o.headline, description: o.description, mainEntityOfPage: `${SITE.url}${o.path}`, dateModified: o.dateModified, datePublished: o.dateModified, author: { '@id': PERSON_ID }, publisher: { '@id': BUSINESS_ID }, inLanguage: 'nl-NL' });
export const personSchema = () => ({ '@type': 'Person', '@id': PERSON_ID, name: SITE.owner, jobTitle: 'Kapster en hair extensions specialist', worksFor: { '@id': BUSINESS_ID }, knowsAbout: ['hair extensions', 'haarverlenging', 'haarverdikking', 'kleuradvies', 'knippen'], hasCredential: [{ '@type': 'EducationalOccupationalCredential', credentialCategory: 'Opleiding', name: 'Kappersopleiding' }, { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certificaat', name: `Extensions-cursus ${SITE.training.extensionsAcademy}`, recognizedBy: { '@type': 'Organization', name: SITE.training.extensionsAcademy } }], sameAs: [SITE.instagram, SITE.tiktok].filter(Boolean) });
export function businessSchema() {
  const address: Record<string, string> = { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.province, addressCountry: 'NL' };
  if (SITE.streetAddress) { address.streetAddress = SITE.streetAddress; address.postalCode = SITE.postalCode; }
  const b: Record<string, unknown> = {
    '@type': ['HairSalon', 'LocalBusiness'], '@id': BUSINESS_ID, name: SITE.name, url: SITE.url, logo: `${SITE.url}/logo.png`, image: `${SITE.url}/og/default.png`,
    description: 'Hair extensions in Leeuwarden door Quinty Kant: persoonlijk consult, kleur op maat en natuurlijke haarverlenging en haarverdikking.',
    address, geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: [{ '@type': 'City', name: 'Leeuwarden' }, { '@type': 'AdministrativeArea', name: 'Friesland' }],
    founder: { '@id': PERSON_ID }, sameAs: [SITE.instagram, SITE.tiktok, SITE.reviewProfileUrl].filter(Boolean),
  };
  if (SITE.phone) b.telephone = SITE.phone;
  if (SITE.email) b.email = SITE.email;
  return b;
}
