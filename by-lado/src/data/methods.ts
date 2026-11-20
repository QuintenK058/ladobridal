/**
 * Extension methods. `offered` must be confirmed by Quinty: unconfirmed methods are built but noindex + excluded
 * from the sitemap, nav and marquee are driven by this file. All numbers (duration, lifespan, maintenance, prices)
 * are Quinty's own — null renders a visible placeholder. General explanations describe the method, not her results.
 */
export interface Method {
  slug: string; key: 'tape' | 'keratine' | 'weft' | 'microring' | 'clipin';
  name: string; short: string; offered: boolean | null;
  idealFor: string; notFor: string; hairTypes: string;
  placingTime: string | null; lasts: string | null; maintenanceEvery: string | null; reusable: string | null; visibility: string | null;
  fromPrice: number | null;
  shot: string;
}

export const METHODS: Method[] = [
  { slug: '/tape-extensions', key: 'tape', name: 'Tape extensions', short: 'Dunne, platte banen die als een sandwich om een klein plukje eigen haar worden geplakt.', offered: null,
    idealFor: 'Fijn tot normaal haar, volume én lengte, wie een vlakke, snelle methode wil', notFor: 'Wie het haar vaak hoog opsteekt zonder dat de banen mogen opvallen', hairTypes: 'Fijn – normaal',
    placingTime: null, lasts: null, maintenanceEvery: null, reusable: null, visibility: null, fromPrice: null, shot: 'tape extensions close-up, aanzet' },
  { slug: '/keratine-extensions', key: 'keratine', name: 'Keratine extensions', short: 'Losse strengen met een keratine-bonding, één voor één aan je eigen haar gezet.', offered: null,
    idealFor: 'Wie veel bewegingsvrijheid wil en het haar ook opgestoken wil dragen', notFor: 'Wie snel resultaat wil met een korte plaatsingstijd', hairTypes: 'Normaal – dik',
    placingTime: null, lasts: null, maintenanceEvery: null, reusable: null, visibility: null, fromPrice: null, shot: 'keratine bondings, losse strengen' },
  { slug: '/weft-extensions', key: 'weft', name: 'Weft extensions', short: 'Een rij haar op een dunne baan, vastgezet aan een basis van je eigen haar.', offered: null,
    idealFor: 'Veel volume in één keer, normaal tot dik haar', notFor: 'Heel fijn of dun haar zonder voldoende basis', hairTypes: 'Normaal – dik',
    placingTime: null, lasts: null, maintenanceEvery: null, reusable: null, visibility: null, fromPrice: null, shot: 'weft extensions, rij aan de achterkant' },
  { slug: '/microring-extensions', key: 'microring', name: 'Microring extensions', short: 'Strengen die met een klein ringetje worden vastgeklemd, zonder lijm of warmte.', offered: null,
    idealFor: 'Wie geen lijm of warmte wil en strengen wil kunnen hergebruiken', notFor: 'Heel fijn haar waarin ringetjes voelbaar kunnen zijn', hairTypes: 'Normaal – dik',
    placingTime: null, lasts: null, maintenanceEvery: null, reusable: null, visibility: null, fromPrice: null, shot: 'microrings, detail' },
  { slug: '/clip-in-extensions', key: 'clipin', name: 'Clip-in extensions', short: 'Banen met clipjes die je zelf in- en uitdoet, voor een dag, een feest of een shoot.', offered: null,
    idealFor: 'Tijdelijk volume of lengte, een event, uitproberen', notFor: 'Wie elke dag extensions wil zonder zelf te stylen', hairTypes: 'Alle haartypes',
    placingTime: null, lasts: null, maintenanceEvery: null, reusable: null, visibility: null, fromPrice: null, shot: 'clip-in set op een rij' },
];

export const confirmed = () => METHODS.filter((m) => m.offered !== false);
export const val = (v: string | null, label = 'CHECK') => v ?? `<span class="ph">[${label}]</span>`;
