/**
 * Regional landing pages. Each page has ONE primary keyword and fully unique copy.
 * Distances are approximate one-way road distances from Leeuwarden ("ca."); quotes use the real route.
 * Towns marked CHECK must be confirmed by Quinty (does she actually work there?).
 */
import type { RegionTag } from './reviews';

export interface RegionPage {
  slug: string;
  keyword: string;
  name: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  geo: { region: string; placename: string };
  area: { type: 'City' | 'AdministrativeArea' | 'Country'; name: string }[];
  h1: string;
  lead: string;
  intro: string;
  weddingTitle: string;
  wedding: string;
  morningTitle: string;
  morningIntro: string;
  morning: { title: string; text: string }[];
  areaTitle: string;
  areaText: string;
  towns: string[];
  locations: { href: string; label: string }[];
  travelTitle: string;
  travelText: string;
  travelExamples: [string, number][];
  review: RegionTag;
  portfolio: string[];
  faq: { q: string; a: string }[];
  near: { href: string; label: string }[];
  extra?: string;
}

const T = (km: number) => (Math.round(km * 2 * 0.35 * 100) / 100).toFixed(2).replace('.', ',').replace(',00', '');

export const REGION_PAGES: RegionPage[] = [
  /* ------------------------------------------------------------------ FRIESLAND */
  {
    slug: 'bruidsstylist-friesland',
    keyword: 'bruidsstylist Friesland',
    name: 'Friesland',
    title: 'Bruidsstylist Friesland | Haar & make-up op locatie',
    description: 'Bruidsstylist in heel Friesland: bruidskapsel en make-up op je trouwlocatie, van de Friese Meren tot de Waddeneilanden. Proefsessie in Leeuwarden.',
    ogTitle: 'Bruidsstylist in heel Friesland · Lado Bridal',
    ogDescription: 'Van Sneek tot Schiermonnikoog: haar en make-up op je trouwlocatie, met proefsessie in Leeuwarden.',
    geo: { region: 'NL-FR', placename: 'Friesland' },
    area: [{ type: 'AdministrativeArea', name: 'Friesland' }],
    h1: 'Bruidsstylist in Friesland, op jouw trouwlocatie',
    lead: 'Als bruidsstylist in Friesland kom ik op je trouwochtend naar je toe, waar in de provincie je ook trouwt: op een landgoed in de Wouden, aan het water bij de Friese Meren of op een van de Waddeneilanden.',
    intro: `<p>Friesland is mijn thuisprovincie. Mijn studio staat in Leeuwarden, en vanaf daar ben ik binnen een halfuur tot een uur in de meeste Friese dorpen en steden. Dat maakt de reiskosten laag en de planning eenvoudig: ik ken de wegen, weet hoe lang een rit over de A7 of de N31 duurt, en reken een ruime marge in voor een brug die net openstaat.</p>
<p>De <a href="/proefsessie">proefsessie</a> doen we in de studio in Leeuwarden. Voor bruiden uit Friesland is dat meestal een korte rit, en het is een mooi moment om de dag rustig door te nemen. Op de trouwdag zelf kom ik naar jou: naar je ouderlijk huis, een hotelkamer of de getting-ready-ruimte van je locatie.</p>
<p>Trouw je in Leeuwarden zelf? Dan lees je meer op mijn pagina <a href="/bruidsstylist-leeuwarden">bruidsstylist Leeuwarden</a>.</p>`,
    weddingTitle: 'Trouwen in Friesland: wat betekent dat voor <em>haar en make-up?</em>',
    wedding: `<p>Friese trouwlocaties zijn gevarieerd, en elke soort vraagt iets anders van je look.</p>
<h3>Landgoederen in de Friese Wouden</h3>
<p>Rond Beetsterzwaag en Olterterp trouw je tussen oude bomen, met zacht, gefilterd licht. Dat licht is prachtig voor foto’s maar kan make-up ook vlak maken. Ik werk dan met iets meer definitie rond de ogen en een zachte glow op de jukbeenderen. Lees meer over <a href="/trouwlocaties/landgoed-friese-wouden">bruidsstyling op een landgoed in de Friese Wouden</a>.</p>
<h3>Aan het water: de Friese Meren</h3>
<p>Rond Sneek, Heeg en Langweer trouw je met uitzicht over het water, en soms op een boot. Water betekent wind en vochtige lucht. Een volledig los kapsel heeft het daar zwaar; half-los of een losse, zachte opsteek houdt beter stand. Zie <a href="/trouwlocaties/friese-meren">bruidsstyling aan de Friese Meren</a>.</p>
<h3>Historische raadhuizen en kerken</h3>
<p>In steden als Franeker, Bolsward en Harlingen trouw je vaak in een historisch raadhuis. Binnen is het licht soms schaars; buiten op de stoep staat de wind. Ik zorg dat je make-up in beide situaties klopt en dat je kapsel tegen een windvlaag kan.</p>
<h3>De Waddeneilanden</h3>
<p>Trouwen op Terschelling, Vlieland, Ameland of Schiermonnikoog betekent een overtocht, zand, zon en zeewind. Ik reis mee met de boot en plan de ochtend rond de dienstregeling. Meer daarover op <a href="/trouwlocaties/waddeneilanden">bruidsstyling op de Waddeneilanden</a>.</p>`,
    morningTitle: 'Zo ziet je trouwochtend <em>eruit</em>',
    morningIntro: 'Een voorbeeld voor een Complete Bruidslook met twee bruidsmeisjes, op een locatie op ongeveer 30 km van Leeuwarden. Je eigen planning maak ik na de proefsessie.',
    morning: [
      { title: 'Vertrek uit Leeuwarden', text: 'Ruim op tijd, met marge voor verkeer en een openstaande brug.' },
      { title: 'Aankomst en opzetten', text: 'Ik zoek de plek met het beste daglicht en zet mijn spullen klaar.' },
      { title: 'Bruidsmeisjes', text: 'Eerst haar of make-up van de bruidsmeisjes, zodat jij als laatste klaar bent.' },
      { title: 'Jouw haar en make-up', text: 'Rustig, in de volgorde die we bij de proefsessie hebben afgesproken.' },
      { title: 'Jurk, sluier en klaar', text: 'Ik help met de sluier en de laatste details, vlak voor de fotograaf je komt halen.' },
    ],
    areaTitle: 'Mijn werkgebied in <em>Friesland</em>',
    areaText: `<p>Ik werk in heel Friesland. Vaak style ik bruiden in en rond Sneek, Drachten en Heerenveen, maar ook in Harlingen, Dokkum, Bolsward, Franeker en Joure. In het zuiden kom ik graag naar Lemmer en Wolvega, en in het oosten naar Burgum en de dorpen in de Friese Wouden. Op de Waddeneilanden reis ik mee met de boot.</p>`,
    towns: ['Sneek', 'Drachten', 'Heerenveen', 'Harlingen', 'Dokkum', 'Bolsward', 'Franeker', 'Joure', 'Lemmer', 'Wolvega', 'Burgum', 'Beetsterzwaag', 'Terschelling', 'Vlieland', 'Ameland', 'Schiermonnikoog'],
    locations: [
      { href: '/trouwlocaties/landgoed-friese-wouden', label: 'Bruidsstyling op een landgoed in de Friese Wouden' },
      { href: '/trouwlocaties/friese-meren', label: 'Bruidsstyling aan de Friese Meren' },
      { href: '/trouwlocaties/waddeneilanden', label: 'Bruidsstyling op de Waddeneilanden' },
    ],
    travelTitle: 'Reiskosten binnen <em>Friesland</em>',
    travelText: `<p>Reiskosten reken ik vanaf Leeuwarden: het aantal kilometers enkele reis × 2 × €0,35. Binnen Friesland blijft dat meestal laag. Een paar voorbeelden (afstanden zijn een indicatie):</p>`,
    travelExamples: [['Sneek', 25], ['Heerenveen', 30], ['Lemmer', 50]],
    review: 'friesland',
    portfolio: ['bruid op landgoed, Friese Wouden', 'bruid aan het water, Friese Meren', 'bruid op Waddeneiland, duinen'],
    faq: [
      { q: 'Kom je ook naar de Waddeneilanden?', a: '<p>Ja. Ik reis mee met de boot vanaf Harlingen, Holwerd of Lauwersoog, afhankelijk van het eiland. Omdat je aan een dienstregeling vastzit, plan ik vaak een overnachting op het eiland of reis ik de dag ervoor. De kosten daarvoor staan vooraf in je offerte.</p>' },
      { q: 'Hoe houd ik mijn kapsel goed bij wind aan het water?', a: '<p>Kies een kapsel met steun: half-los, een vlecht of een losse opsteek. Ik bouw het op met een verborgen basis en zet de sluier extra stevig vast. Bij de proefsessie bespreken we wat bij jouw locatie past.</p>' },
      { q: 'Wat zijn de reiskosten binnen Friesland?', a: `<p>€0,35 per km, heen en terug, vanaf Leeuwarden. Voor Drachten (ca. 30 km) is dat ongeveer €${T(30)}, voor Wolvega (ca. 50 km) ongeveer €${T(50)}. In de <a href="/tarieven#calculator">prijscalculator</a> zie je het voor jouw plaats.</p>` },
      { q: 'Moet ik voor de proefsessie naar Leeuwarden komen?', a: '<p>Ja, de proefsessie is in mijn studio in Leeuwarden. Vanuit de meeste Friese plaatsen is dat een korte rit. Het voordeel: daglicht, rust en alles bij de hand.</p>' },
      { q: 'Doe je ook bruiloften in een Fries dorp of op een boerderij?', a: '<p>Zeker. Ik werk overal waar een stopcontact en een raam met daglicht is. Op een boerderij of in een dorpshuis zoek ik de beste plek bij het raam en neem ik zelf extra licht mee.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-leeuwarden', label: 'Bruidsstylist Leeuwarden' },
      { href: '/bruidsstylist-groningen', label: 'Bruidsstylist Groningen' },
      { href: '/bruidsstylist-drenthe', label: 'Bruidsstylist Drenthe' },
    ],
  },

  /* ------------------------------------------------------------------ LEEUWARDEN */
  {
    slug: 'bruidsstylist-leeuwarden',
    keyword: 'bruidsstylist Leeuwarden',
    name: 'Leeuwarden',
    title: 'Bruidsstylist Leeuwarden | Bruidskapsel & make-up',
    description: 'Bruidsstylist in Leeuwarden: studio en proefsessie in de stad, op je trouwdag op locatie. Bruidskapsel en make-up voor stadhuis, binnenstad en hotels.',
    ogTitle: 'Bruidsstylist Leeuwarden · Lado Bridal',
    ogDescription: 'Bruidskapsel en bruidsmake-up vanuit mijn studio in Leeuwarden: proefsessie dichtbij, op je trouwdag bij jou.',
    geo: { region: 'NL-FR', placename: 'Leeuwarden' },
    area: [{ type: 'City', name: 'Leeuwarden' }],
    h1: 'Bruidsstylist in Leeuwarden: bruidskapsel &amp; make-up',
    lead: 'Leeuwarden is mijn thuisbasis. Hier staat mijn studio, hier doen we je proefsessie, en hier style ik bruiden die trouwen op het stadhuis, in de binnenstad of in een van de hotels in de stad.',
    intro: `<p>Trouw je in Leeuwarden, dan is alles dichtbij. Je proefsessie is om de hoek, en op je trouwdag hoef ik nauwelijks te reizen. Dat betekent minimale reiskosten en een ochtend zonder verrassingen in het verkeer.</p>
<p>Als bruidsstylist in Leeuwarden doe ik je <a href="/bruidskapsel">bruidskapsel</a> en je <a href="/bruidsvisagie">bruidsmake-up</a>, of allebei in de <a href="/complete-bruidslook">Complete Bruidslook</a>. Ik kom naar je huis, je hotelkamer of de ruimte waar je je klaarmaakt. De proefsessie doen we 4–8 weken vooraf in de studio.</p>
<p><span class="ph">[CHECK: studioadres openbaar? Zo ja: adres + kaart hieronder. Zo nee: alleen “studio in Leeuwarden”.]</span></p>`,
    weddingTitle: 'Trouwen in Leeuwarden: <em>de stad</em> als decor',
    wedding: `<p>Een bruiloft in Leeuwarden heeft een eigen ritme. Je trouwt vaak op het stadhuis en daarna volgen foto’s in de binnenstad, langs de grachten en de oude gevels. Dat vraagt een look die er zowel binnen als buiten goed uitziet.</p>
<h3>Het stadhuis</h3>
<p>Een ceremonie op het stadhuis is meestal compact en strak gepland. Je wilt er dus op tijd en klaar zijn, zonder haast. Ik plan de ochtend terug vanaf je ceremonietijd en houd een ruime marge aan. Lees meer op <a href="/trouwlocaties/stadhuis-leeuwarden">bruidsstyling voor een bruiloft op het stadhuis in Leeuwarden</a>.</p>
<h3>Klaarmaken in een hotel in de stad</h3>
<p>Veel bruiden maken zich klaar in een hotelkamer in het centrum. Dat is praktisch: dichtbij de ceremonie, met een badkamer en vaak mooi licht. Ik vraag vooraf naar de kamer (grootte, ramen, stopcontacten), zodat ik weet waar ik kan werken.</p>
<h3>Foto’s in de binnenstad</h3>
<p>Tussen de gebouwen kan het waaien, en het licht wisselt van schaduw naar zon. Ik zet je haar vast op de plekken waar wind het eerst grip krijgt, en stem je make-up af op zowel zacht als hard licht.</p>`,
    morningTitle: 'Een trouwochtend <em>in de stad</em>',
    morningIntro: 'Voorbeeld voor een Complete Bruidslook met de moeder van de bruid, klaarmaken in een hotel in het centrum en een ceremonie op het stadhuis.',
    morning: [
      { title: 'Korte rit naar je hotel', text: 'Binnen Leeuwarden ben ik er snel, dus de ochtend kan rustig beginnen.' },
      { title: 'Moeder van de bruid', text: 'Haar of make-up en stylingadvies, zodat zij daarna jou kan bijstaan.' },
      { title: 'Jouw look', text: 'Haar en make-up in de volgorde van je proefsessie.' },
      { title: 'Laatste details', text: 'Sluier en accessoires, terwijl de fotograaf de details vastlegt.' },
      { title: 'Naar het stadhuis', text: 'Je gaat op tijd en ontspannen op weg; je lipkleur gaat mee in je tasje.' },
    ],
    areaTitle: 'Leeuwarden <em>en omgeving</em>',
    areaText: `<p>Ik werk in alle wijken van Leeuwarden en in de dorpen eromheen, zoals Stiens, Grou, Goutum, Wirdum en Hijum. Trouw je net buiten de stad, dan blijven de reiskosten beperkt. Voor de rest van de provincie zie je meer op <a href="/bruidsstylist-friesland">bruidsstylist Friesland</a>.</p>`,
    towns: ['Leeuwarden centrum', 'Huizum', 'Camminghaburen', 'Goutum', 'Stiens', 'Grou', 'Wirdum', 'Hijum'],
    locations: [
      { href: '/trouwlocaties/stadhuis-leeuwarden', label: 'Bruidsstyling voor een bruiloft op het stadhuis in Leeuwarden' },
    ],
    travelTitle: 'Reiskosten in <em>Leeuwarden</em>',
    travelText: `<p>Binnen Leeuwarden zijn de reiskosten minimaal; ik reken dezelfde formule (enkele reis × 2 × €0,35), maar over een korte afstand. Voorbeelden:</p>`,
    travelExamples: [['Binnenstad (ca. 5 km)', 5], ['Grou (ca. 15 km)', 15]],
    review: 'leeuwarden',
    portfolio: ['bruid bij het stadhuis', 'bruid in de binnenstad, grachten', 'klaarmaken in hotelkamer'],
    faq: [
      { q: 'Waar is je studio in Leeuwarden?', a: '<p>Mijn studio is in Leeuwarden. Het precieze adres krijg je bij het inplannen van je proefsessie. <span class="ph">[CHECK: adres openbaar of niet]</span></p>' },
      { q: 'Kan ik me ook klaarmaken in de studio?', a: '<p>Op je trouwdag kom ik liever naar jou toe, zodat je je niet hoeft te verplaatsen in je jurk. <span class="ph">[CHECK: is klaarmaken in de studio een optie?]</span></p>' },
      { q: 'Hoeveel tijd moet ik plannen voor een stadhuisceremonie?', a: '<p>Ik plan terug vanaf de ceremonietijd en houd een ruime marge aan voor de rit, het parkeren en de foto’s vooraf. Je eigen tijdschema krijg je na de proefsessie.</p>' },
      { q: 'Wat kost een bruidsstylist in Leeuwarden?', a: '<p>De Complete Bruidslook begint vanaf €600, met minimale reiskosten binnen de stad. Bekijk de <a href="/tarieven">tarieven</a> of lees <a href="/wat-kost-een-bruidsstyliste-friesland">wat een bruidsstyliste in Friesland kost</a>.</p>' },
      { q: 'Style je ook gasten in een hotel in de stad?', a: '<p>Ja. Bruidsmeisjes en gasten kosten €75 per persoon, de moeder van de bruid €75 inclusief stylingadvies. In een hotelkamer werk ik bij het raam, met mijn eigen licht als het buiten grauw is.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' },
      { href: '/bruidsstylist-groningen', label: 'Bruidsstylist Groningen' },
    ],
  },

  /* ------------------------------------------------------------------ GRONINGEN */
  {
    slug: 'bruidsstylist-groningen',
    keyword: 'bruidsstylist Groningen',
    name: 'Groningen',
    title: 'Bruidsstylist Groningen | Haar & make-up op locatie',
    description: 'Bruidsstylist in Groningen: bruidskapsel en bruidsmake-up in de stad en het ommeland, van borgen tot boerderijen. Proefsessie in Leeuwarden, via de A7.',
    ogTitle: 'Bruidsstylist Groningen · Lado Bridal',
    ogDescription: 'Haar en make-up voor je bruiloft in Groningen-stad en het ommeland, van borg tot schuur.',
    geo: { region: 'NL-GR', placename: 'Groningen' },
    area: [{ type: 'AdministrativeArea', name: 'Groningen' }, { type: 'City', name: 'Groningen' }],
    h1: 'Bruidsstylist in Groningen, in de stad en het ommeland',
    lead: 'Trouw je in Groningen, in de stad of ergens in het ommeland? Dan rij ik vanuit Leeuwarden over de A7 naar je toe, met een look die past bij een borg, een boerderij of een stadshotel.',
    intro: `<p>Groningen-stad ligt op ongeveer een uur rijden van mijn studio in Leeuwarden. Veel bruiden uit Groningen kiezen daarom voor mij: dichtbij genoeg voor een ontspannen proefsessie, en op de trouwdag zonder overnachting bereikbaar voor de meeste plekken in de provincie.</p>
<p>De <a href="/proefsessie">proefsessie</a> doen we in Leeuwarden. Voor bruiden uit Groningen is dat vaak een mooie aanleiding voor een dagje uit, eventueel samen met je moeder of een getuige. Op je trouwdag kom ik naar jou toe, in de stad of op je locatie in het ommeland.</p>`,
    weddingTitle: 'Trouwen in Groningen: <em>borgen, boerderijen</em> en de stad',
    wedding: `<p>Groningen heeft een heel eigen soort trouwlocaties, met veel ruimte en een weids landschap.</p>
<h3>Borgen en landgoederen in het ommeland</h3>
<p>De Groningse borgen zijn statig, met oude bomen, grachten en vaak sfeervolle, maar wat donkere binnenruimtes. Voor de make-up betekent dat: niet te zwaar beginnen, want het licht buiten is fel en binnen gedempt. Meer daarover op <a href="/trouwlocaties/borgen-groningen">bruidsstyling op een Groningse borg</a>.</p>
<h3>Boerderijen en schuren in het Westerkwartier en Oldambt</h3>
<p>Een bruiloft in een schuur of op een boerderij is ontspannen en persoonlijk. De getting-ready-ruimte is soms een woonkamer of een zolder. Ik neem eigen licht mee en zoek de plek bij het raam. Lees meer over <a href="/trouwlocaties/schuurbruiloft-drenthe-overijssel">bruidsstyling voor een schuurbruiloft</a>.</p>
<h3>Aan de Waddenkust</h3>
<p>Rond Lauwersoog en de dijken langs de Waddenzee trouw je met een uitzicht dat nergens op lijkt, en met wind die nergens anders zo hard waait. Kies hier een kapsel met steun en laat de sluier pas bij de foto’s indoen.</p>
<h3>Groningen-stad</h3>
<p>In de stad maken bruiden zich vaak klaar in een hotel of appartement in het centrum. Dat is praktisch en vaak mooi licht. Ik vraag vooraf naar parkeren, want in de binnenstad wil je daar niet op de ochtend achter komen.</p>`,
    morningTitle: 'Zo ziet je trouwochtend <em>in Groningen</em> eruit',
    morningIntro: 'Voorbeeld voor een Complete Bruidslook met drie bruidsmeisjes op een locatie in het ommeland, op ongeveer 70 km van Leeuwarden.',
    morning: [
      { title: 'Vroeg vertrek via de A7', text: 'Ik reken ruim reistijd, zodat een file bij Drachten of Groningen geen stress geeft.' },
      { title: 'Opzetten bij het raam', text: 'Op een borg of boerderij zoek ik het beste licht; zo nodig met eigen lampen.' },
      { title: 'Drie bruidsmeisjes', text: 'Om en om haar en make-up, zodat iedereen op tijd klaar is.' },
      { title: 'Jouw look', text: 'Rustig, in de volgorde van de proefsessie.' },
      { title: 'Naar buiten voor de foto’s', text: 'Sluier erin, een laatste check op wind en licht, en klaar.' },
    ],
    areaTitle: 'Mijn werkgebied in <em>Groningen</em>',
    areaText: `<p>Ik kom naar Groningen-stad en naar het ommeland: Haren, Zuidhorn, Leek, Bedum, Appingedam, Delfzijl, Hoogezand, Veendam en Winschoten. Ook in de dorpen van het Westerkwartier en Oldambt en langs de Waddenkust bij Lauwersoog ben ik welkom. Ligt je locatie in het oosten van de provincie, verder dan 75 km van Leeuwarden, dan overnacht ik in de buurt.</p>`,
    towns: ['Groningen', 'Haren', 'Zuidhorn', 'Leek', 'Bedum', 'Appingedam', 'Delfzijl', 'Hoogezand', 'Veendam', 'Winschoten', 'Lauwersoog'],
    locations: [
      { href: '/trouwlocaties/borgen-groningen', label: 'Bruidsstyling op een Groningse borg' },
      { href: '/trouwlocaties/schuurbruiloft-drenthe-overijssel', label: 'Bruidsstyling voor een schuurbruiloft' },
    ],
    travelTitle: 'Reiskosten naar <em>Groningen</em>',
    travelText: `<p>Ook naar Groningen reken ik €0,35 per km vanaf Leeuwarden, heen en terug. Een paar voorbeelden (indicatief):</p>`,
    travelExamples: [['Groningen-stad', 60], ['Haren', 70], ['Zuidhorn', 50]],
    review: 'groningen',
    portfolio: ['bruid bij een Groningse borg', 'bruid in schuur, Westerkwartier', 'bruid aan de Waddenkust'],
    faq: [
      { q: 'Hoe ver is het van Leeuwarden naar Groningen?', a: `<p>Groningen-stad ligt op ongeveer 60 km. Dat is ongeveer een uur rijden, afhankelijk van het verkeer. De reiskosten zijn dan ongeveer €${T(60)}.</p>` },
      { q: 'Kom je ook naar Oost-Groningen?', a: '<p>Ja. Voor plaatsen als Winschoten, Veendam of Delfzijl is de afstand groter dan 75 km. Dan overnacht ik in de buurt, zodat ik ’s ochtends op tijd en uitgerust bij je ben. De kosten staan vooraf in je offerte. <span class="ph">[CHECK: afstanden Oost-Groningen bevestigen]</span></p>' },
      { q: 'Kan de proefsessie ook in Groningen?', a: '<p>De proefsessie is in mijn studio in Leeuwarden, waar ik het licht, de spullen en de rust heb om je look goed uit te werken. Vanuit Groningen is dat ongeveer een uur rijden.</p>' },
      { q: 'Wat werkt goed bij een bruiloft op een borg?', a: '<p>Een look die zowel in gedempt binnenlicht als in de buitenlucht goed is: een egale, stralende huid met iets meer definitie rond de ogen, en een kapsel dat tegen wind kan als je buiten foto’s maakt in de tuin.</p>' },
      { q: 'Doe je ook bruidsmeisjes in Groningen?', a: '<p>Ja, €75 per persoon voor haar of make-up. Reiskosten reken ik één keer per trouwdag, dus met meer personen wordt het relatief voordeliger.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' },
      { href: '/bruidsstylist-drenthe', label: 'Bruidsstylist Drenthe' },
    ],
  },

  /* ------------------------------------------------------------------ DRENTHE */
  {
    slug: 'bruidsstylist-drenthe',
    keyword: 'bruidsstylist Drenthe',
    name: 'Drenthe',
    title: 'Bruidsstylist Drenthe | Bruidskapsel & make-up op locatie',
    description: 'Bruidsstylist in Drenthe: haar en make-up voor schuurbruiloften, landgoederen en buitenceremonies in Assen, Meppel, Hoogeveen en Emmen. Langhoudend, ook buiten.',
    ogTitle: 'Bruidsstylist Drenthe · Lado Bridal',
    ogDescription: 'Langhoudend haar en make-up voor je bruiloft in Drenthe, van schuur tot bos.',
    geo: { region: 'NL-DR', placename: 'Drenthe' },
    area: [{ type: 'AdministrativeArea', name: 'Drenthe' }],
    h1: 'Bruidsstylist in Drenthe voor schuur, landgoed en bos',
    lead: 'In Drenthe trouw je vaak buiten: in een schuur, op een landgoed of tussen de bomen. Als bruidsstylist in Drenthe zorg ik voor een look die daar de hele dag tegen kan, van de ceremonie tot het kampvuur.',
    intro: `<p>Drenthe is een van de mooiste provincies om in te trouwen als je van natuur houdt. Het is ook een provincie waar je de hele dag buiten bent, en dat vraagt iets van je haar en make-up. Mijn focus ligt hier op langhoudend werk: een basis die bij zon, wind en een frisse avond blijft zitten.</p>
<p>Vanuit Leeuwarden ligt een groot deel van Drenthe op meer dan 75 km. Dat is geen bezwaar: ik overnacht dan in de buurt, zodat ik ’s ochtends uitgerust en op tijd bij je ben. Die kosten staan vooraf in je offerte. De <a href="/proefsessie">proefsessie</a> doen we in de studio in Leeuwarden.</p>`,
    weddingTitle: 'Trouwen in Drenthe: <em>buiten</em>, de hele dag',
    wedding: `<h3>Schuren en boerderijen</h3>
<p>Een schuurbruiloft is ontspannen, met lange tafels en lichtslingers. Overdag valt er zacht licht door de deuren; ’s avonds is het donker en warm. Ik kies een make-up die in beide situaties werkt, en een kapsel dat een avond dansen op een houten vloer overleeft. Meer op <a href="/trouwlocaties/schuurbruiloft-drenthe-overijssel">bruidsstyling voor een schuurbruiloft</a>.</p>
<h3>Landgoederen en havezaten</h3>
<p>Drenthe heeft prachtige landgoederen met lanen en tuinen. Voor de foto’s loop je vaak een stuk door het groen. Zon door de bomen geeft vlekkerig licht; ik houd de huid daarom egaal en mat in de T-zone, met glow op de plekken waar die mooi is.</p>
<h3>Ceremonies in het bos of op de heide</h3>
<p>Een ceremonie in de natuur is magisch, maar je hebt geen spiegel en geen beschutting. Kies een kapsel met houvast (half-los of een losse vlecht), en neem je lipkleur mee. Bij warm weer zet ik je make-up extra vast; bij een frisse ochtend let ik op droge huid.</p>`,
    morningTitle: 'Een trouwochtend <em>in Drenthe</em>',
    morningIntro: 'Voorbeeld voor een Complete Bruidslook met twee bruidsmeisjes, op een locatie bij Assen (ca. 85 km), met overnachting in de buurt.',
    morning: [
      { title: 'De avond ervoor', text: 'Ik reis naar Drenthe en overnacht in de buurt van je locatie.' },
      { title: 'Korte rit naar je locatie', text: 'Uitgerust en ruim op tijd; geen ochtendspits op de A7 of A28.' },
      { title: 'Bruidsmeisjes', text: 'Eerst zij, zodat jij als laatste klaar bent en alles fris blijft.' },
      { title: 'Jouw look', text: 'Langhoudend opgebouwd, afgestemd op een dag buiten.' },
      { title: 'Naar buiten', text: 'Laatste check in het daglicht, sluier erin, klaar voor de ceremonie.' },
    ],
    areaTitle: 'Mijn werkgebied in <em>Drenthe</em>',
    areaText: `<p>Ik kom naar Assen, Meppel, Hoogeveen en Emmen, en naar de dorpen en landgoederen daartussen. <span class="ph">[CHECK: welke Drentse plaatsen/locaties werkt Quinty daadwerkelijk? Aanvullen.]</span> Ligt je locatie in het noorden van Drenthe, dicht bij Groningen, dan kijk ook op <a href="/bruidsstylist-groningen">bruidsstylist Groningen</a>. Trouw je in de kop van Overijssel, zie <a href="/bruidsstylist-zwolle">bruidsstylist Zwolle</a>.</p>`,
    towns: ['Assen', 'Meppel', 'Hoogeveen', 'Emmen'],
    locations: [
      { href: '/trouwlocaties/schuurbruiloft-drenthe-overijssel', label: 'Bruidsstyling voor een schuurbruiloft in Drenthe of Overijssel' },
    ],
    travelTitle: 'Reiskosten naar <em>Drenthe</em>',
    travelText: `<p>Reiskosten: enkele reis × 2 × €0,35 vanaf Leeuwarden. Boven 75 km enkele reis komen er verblijfkosten bij; die staan altijd vooraf in je offerte. Voorbeelden (indicatief):</p>`,
    travelExamples: [['Meppel', 80], ['Assen', 85], ['Emmen', 125]],
    review: 'drenthe',
    portfolio: ['bruid in schuur, zacht tegenlicht', 'bruid op landgoed in Drenthe', 'ceremonie in het bos'],
    faq: [
      { q: 'Waarom reken je een overnachting voor Drenthe?', a: '<p>Omdat de meeste Drentse locaties meer dan 75 km van Leeuwarden liggen. Door in de buurt te overnachten ben ik ’s ochtends uitgerust en ruim op tijd, ook als je vroeg begint. De kosten zie je vooraf in je offerte.</p>' },
      { q: 'Blijft make-up zitten bij een bruiloft buiten?', a: '<p>Ja, als we daar vanaf het begin rekening mee houden. Ik werk met een dunne, goed gehechte basis, zet alles vast en gebruik waterproof producten rond de ogen. Je krijgt je lipkleur mee voor na het eten.</p>' },
      { q: 'Welk kapsel past bij een schuurbruiloft?', a: '<p>Veel bruiden kiezen een romantisch, half-los kapsel of een losse vlecht met wat textuur. Het ziet er ontspannen uit en heeft genoeg steun voor een avond dansen.</p>' },
      { q: 'Werk je ook in een schuur zonder goede verlichting?', a: '<p>Ja. Ik zoek het daglicht bij de deur of het raam en neem zelf licht mee. Laat me vooraf weten waar je je klaarmaakt, dan houd ik daar rekening mee.</p>' },
      { q: 'Kunnen we de proefsessie ook in Drenthe doen?', a: '<p>De proefsessie is in mijn studio in Leeuwarden. Vanuit Assen of Meppel is dat ongeveer een uur rijden.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-groningen', label: 'Bruidsstylist Groningen' },
      { href: '/bruidsstylist-zwolle', label: 'Bruidsstylist Zwolle' },
      { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' },
    ],
  },

  /* ------------------------------------------------------------------ ZWOLLE / OVERIJSSEL */
  {
    slug: 'bruidsstylist-zwolle',
    keyword: 'bruidsstylist Zwolle',
    name: 'Zwolle & Overijssel',
    title: 'Bruidsstylist Zwolle & Overijssel | Lado Bridal',
    description: 'Bruidsstylist voor Zwolle en de kop van Overijssel: bruidskapsel en make-up op locatie in Zwolle, Kampen, Steenwijk en omgeving. Proefsessie in Leeuwarden.',
    ogTitle: 'Bruidsstylist Zwolle · Lado Bridal',
    ogDescription: 'Haar en make-up voor je bruiloft in Zwolle en de kop van Overijssel.',
    geo: { region: 'NL-OV', placename: 'Zwolle' },
    area: [{ type: 'City', name: 'Zwolle' }, { type: 'AdministrativeArea', name: 'Overijssel' }],
    h1: 'Bruidsstylist in Zwolle en de kop van Overijssel',
    lead: 'Trouw je in Zwolle of in de kop van Overijssel? Dan kom ik vanuit Leeuwarden naar je toe, met een rustige planning en een look die past bij een stadshotel, een landgoed of een schuur op het platteland.',
    intro: `<p>Zwolle ligt op ongeveer 105 km van mijn studio in Leeuwarden. Dat is verder dan Friesland of Groningen, maar goed te doen: ik overnacht in de buurt, zodat ik ’s ochtends op tijd en uitgerust bij je ben. Die verblijfkosten staan vooraf in je offerte.</p>
<p>Waarom zou je een bruidsstylist uit Leeuwarden boeken voor een bruiloft in Zwolle? Bruiden die mij boeken, doen dat meestal omdat ze mijn werk op Instagram hebben gezien of via een andere bruid van me hoorden, en omdat ze haar en make-up in één hand willen. De <a href="/proefsessie">proefsessie</a> doen we in Leeuwarden.</p>`,
    weddingTitle: 'Trouwen rond <em>Zwolle</em>',
    wedding: `<h3>De stad Zwolle</h3>
<p>In Zwolle maken veel bruiden zich klaar in een hotel of appartement in de binnenstad, en volgen foto’s langs de grachten en historische gebouwen. Ik vraag vooraf naar parkeren en de ruimte waar ik kan werken.</p>
<h3>Schuren en landgoederen</h3>
<p>Rond Zwolle en in de kop van Overijssel vind je veel boerderijen, schuren en landgoederen. Ze zijn ruim en persoonlijk, met vaak een ontspannen sfeer. Voor de look betekent dat: langhoudend, met een kapsel dat een avond dansen aankan. Lees meer over <a href="/trouwlocaties/schuurbruiloft-drenthe-overijssel">bruidsstyling voor een schuurbruiloft</a>.</p>
<h3>Aan het water</h3>
<p>In het noordwesten van Overijssel trouw je dicht bij water en riet. Mooi voor foto’s, maar houd rekening met wind en vochtige lucht: kies een kapsel met steun. <span class="ph">[CHECK: welke plaatsen/locaties in Overijssel (bv. Kampen, Steenwijk, Giethoorn) bevestigt Quinty?]</span></p>`,
    morningTitle: 'Een trouwochtend <em>rond Zwolle</em>',
    morningIntro: 'Voorbeeld voor een Complete Bruidslook met moeder van de bruid en twee bruidsmeisjes in Zwolle, met overnachting de avond ervoor.',
    morning: [
      { title: 'De avond ervoor', text: 'Ik reis naar Zwolle en overnacht in de buurt.' },
      { title: 'Naar je hotel of huis', text: 'Korte rit, ruim op tijd, zonder spits op de A32 of A28.' },
      { title: 'Moeder en bruidsmeisjes', text: 'Eerst de anderen, met stylingadvies voor je moeder.' },
      { title: 'Jouw look', text: 'Haar en make-up volgens de proefsessie.' },
      { title: 'Klaar voor vertrek', text: 'Sluier erin, lipkleur in je tasje en op weg.' },
    ],
    areaTitle: 'Werkgebied in <em>Overijssel</em>',
    areaText: `<p>Ik kom naar Zwolle en de kop van Overijssel, waaronder Kampen en Steenwijk <span class="ph">[CHECK: Giethoorn en andere plaatsen]</span>. Trouw je in Drenthe, kijk dan op <a href="/bruidsstylist-drenthe">bruidsstylist Drenthe</a>. Verder naar het zuiden of oosten? Neem contact op, dan kijken we samen wat mogelijk is.</p>`,
    towns: ['Zwolle', 'Kampen', 'Steenwijk'],
    locations: [
      { href: '/trouwlocaties/schuurbruiloft-drenthe-overijssel', label: 'Bruidsstyling voor een schuurbruiloft in Drenthe of Overijssel' },
    ],
    travelTitle: 'Reiskosten naar <em>Zwolle</em>',
    travelText: `<p>Reiskosten: enkele reis × 2 × €0,35, plus verblijfkosten omdat de afstand groter is dan 75 km. Voorbeelden (indicatief):</p>`,
    travelExamples: [['Steenwijk', 70], ['Kampen', 100], ['Zwolle', 105]],
    review: 'overijssel',
    portfolio: ['bruid in Zwolle, binnenstad', 'bruid in schuur, Overijssel', 'bruid aan het water'],
    faq: [
      { q: 'Kom je echt helemaal naar Zwolle?', a: '<p>Ja. Ik overnacht in de buurt, zodat ik ’s ochtends op tijd en uitgerust ben. Die kosten staan vooraf in je offerte, zodat je niet voor verrassingen komt te staan.</p>' },
      { q: 'Is een bruidsstylist uit Leeuwarden niet duur voor Zwolle?', a: `<p>De reiskosten naar Zwolle (ca. 105 km) zijn ongeveer €${T(105)}, plus een overnachting. Met meerdere personen (bruidsmeisjes, moeder) wordt dat per persoon snel minder, omdat ik één keer reken per trouwdag. Bereken het zelf in de <a href="/tarieven#calculator">prijscalculator</a>.</p>` },
      { q: 'Waar doen we de proefsessie?', a: '<p>In mijn studio in Leeuwarden, 4–8 weken voor de bruiloft. Vanuit Zwolle is dat ruim een uur rijden.</p>' },
      { q: 'Werk je ook in Steenwijk en Kampen?', a: '<p>Ja. Steenwijk ligt op ongeveer 70 km, dus binnen de grens zonder overnachting; Kampen ligt daar net boven.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-drenthe', label: 'Bruidsstylist Drenthe' },
      { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' },
      { href: '/bruidsstylist-nederland', label: 'Bruidsstylist op locatie in Nederland' },
    ],
  },

  /* ------------------------------------------------------------------ NOORD-HOLLAND */
  {
    slug: 'bruidsstylist-noord-holland',
    keyword: 'bruidsstylist Noord-Holland',
    name: 'Noord-Holland',
    title: 'Bruidsstylist Noord-Holland | Haar & make-up op locatie',
    description: 'Bruidsstylist voor je bruiloft in Noord-Holland: via de Afsluitdijk naar je locatie, met overnachting in de buurt. Complete Bruidslook met proefsessie.',
    ogTitle: 'Bruidsstylist Noord-Holland · Lado Bridal',
    ogDescription: 'Via de Afsluitdijk naar je bruiloft in Noord-Holland: uitgerust, op tijd en met alle kosten vooraf.',
    geo: { region: 'NL-NH', placename: 'Noord-Holland' },
    area: [{ type: 'AdministrativeArea', name: 'Noord-Holland' }],
    h1: 'Bruidsstylist in Noord-Holland, via de Afsluitdijk',
    lead: 'Trouw je in Noord-Holland en wil je een bruidsstylist met wie het meteen klikt? Ik kom vanuit Leeuwarden over de Afsluitdijk naar je toe, en overnacht in de buurt zodat ik ’s ochtends uitgerust en op tijd bij je ben.',
    intro: `<p>Noord-Holland is voor mij geen buurprovincie zoals Groningen of Drenthe, maar dankzij de Afsluitdijk wel dichterbij dan je denkt. Den Helder en de Kop van Noord-Holland liggen op ongeveer 100 km, Alkmaar op ongeveer 115 km.</p>
<p>Omdat dat verder is dan 75 km, overnacht ik in de buurt van je locatie. Dat zie ik niet als een nadeel: zo ben ik op je trouwochtend uitgerust, ruim op tijd en hoef ik niet in het donker over de dijk. De verblijfkosten staan vooraf in je offerte.</p>
<p>Het loont vooral als er meer mensen gestyled worden. Reiskosten en overnachting reken ik één keer per trouwdag, dus met een paar bruidsmeisjes of je moeder erbij worden ze per persoon snel kleiner.</p>`,
    weddingTitle: 'Trouwen in <em>Noord-Holland</em>',
    wedding: `<h3>Aan de kust</h3>
<p>Een bruiloft aan zee of in de duinen betekent zon, zand en wind. Mooi licht, maar uitdagend voor je haar. Ik raad een kapsel met steun aan en zet de sluier stevig vast. Make-up houd ik licht, met extra aandacht voor de ogen en een goed vastgezette basis.</p>
<h3>Historische steden en buitenplaatsen</h3>
<p>In oude steden en op buitenplaatsen maak je je vaak klaar in een hotel of een appartement. Ik vraag vooraf naar de ruimte en parkeren, en plan de ochtend terug vanaf je ceremonie.</p>
<h3>Polders en boerderijen</h3>
<p>Een bruiloft op het platteland is ruim en persoonlijk. De look moet de hele dag meegaan: van de ceremonie tot het feest in de schuur.</p>
<p><span class="ph">[CHECK: welke plaatsen/locaties in Noord-Holland bevestigt Quinty?]</span></p>`,
    morningTitle: 'Een trouwochtend <em>in Noord-Holland</em>',
    morningIntro: 'Voorbeeld voor een Complete Bruidslook met drie bruidsmeisjes, ca. 115 km van Leeuwarden.',
    morning: [
      { title: 'Over de Afsluitdijk', text: 'De dag ervoor rijd ik naar Noord-Holland en overnacht in de buurt.' },
      { title: 'Rustige start', text: 'Een korte rit naar je locatie en ruim de tijd om op te zetten.' },
      { title: 'Bruidsmeisjes', text: 'Drie looks die bij elkaar passen, elk met een eigen accent.' },
      { title: 'Jouw look', text: 'Haar en make-up zoals we bij de proefsessie hebben afgesproken.' },
      { title: 'Klaar voor de foto’s', text: 'Sluier, details en een laatste check in het daglicht.' },
    ],
    areaTitle: 'Werkgebied in <em>Noord-Holland</em>',
    areaText: `<p>Vanuit Leeuwarden kom ik naar de Kop van Noord-Holland, West-Friesland en de regio Alkmaar. Verder naar het zuiden kan ook; neem contact op, dan rekenen we het samen door. <span class="ph">[CHECK: concrete plaatsen]</span></p>`,
    towns: ['Den Helder', 'Alkmaar'],
    locations: [],
    travelTitle: 'Reiskosten naar <em>Noord-Holland</em>',
    travelText: `<p>Reiskosten zijn €0,35 per km vanaf Leeuwarden, heen en terug, plus verblijfkosten (want verder dan 75 km). Voorbeelden (indicatief):</p>`,
    travelExamples: [['Den Helder', 100], ['Alkmaar', 115], ['Amsterdam', 140]],
    review: 'noord-holland',
    portfolio: ['bruid aan de kust, duinen', 'bruid in historische stad', 'bruidsmeisjes in Noord-Holland'],
    faq: [
      { q: 'Waarom overnacht je bij een bruiloft in Noord-Holland?', a: '<p>Omdat de afstand groter is dan 75 km. Ik wil op je trouwochtend uitgerust en ruim op tijd zijn, zonder het risico van een vroege rit en file. De verblijfkosten staan vooraf in je offerte.</p>' },
      { q: 'Wat kost een bruidsstylist uit Leeuwarden in Noord-Holland?', a: `<p>De Complete Bruidslook begint vanaf €600. Voor Alkmaar (ca. 115 km) komen er ongeveer €${T(115)} aan reiskosten bij, plus een overnachting. Met meer personen deel je die kosten. Reken het uit in de <a href="/tarieven#calculator">prijscalculator</a>.</p>` },
      { q: 'Moet ik voor de proefsessie naar Leeuwarden?', a: '<p>Ja. Veel bruiden uit Noord-Holland combineren het met een dagje Friesland. Woon je echt te ver weg, dan bespreken we de mogelijkheden.</p>' },
      { q: 'Werkt een los kapsel aan de kust?', a: '<p>Het kan, maar het is kwetsbaar in de wind. Ik raad een half-los kapsel of een losse opsteek aan. Bij de proefsessie kijken we wat bij jou en je jurk past.</p>' },
    ],
    near: [
      { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' },
      { href: '/bruidsstylist-nederland', label: 'Bruidsstylist op locatie in Nederland' },
    ],
  },
];

export const NL_HUB = {
  slug: 'bruidsstylist-nederland',
};
