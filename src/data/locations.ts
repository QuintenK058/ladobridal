/** Wedding-location subpages. Only name specific venues Quinty has worked at or approves (see VENUES placeholders). */
import type { RegionTag } from './reviews';

export interface LocationPage {
  slug: string; name: string; title: string; description: string; h1: string; lead: string;
  hubText: string; region: { href: string; label: string }; review: RegionTag;
  sections: { title: string; html: string }[];
  morning: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  shots: string[];
}

const VENUES = '<p><span class="ph">[ECHTE LOCATIES · alleen locaties noemen waar Quinty heeft gewerkt of die ze goedkeurt]</span></p>';

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: 'landgoed-friese-wouden', name: 'Landgoederen in de Friese Wouden',
    title: 'Bruidsstyling op een landgoed in de Friese Wouden | Lado Bridal',
    description: 'Trouwen op een landgoed in de Friese Wouden, rond Beetsterzwaag en Olterterp? Zo stem je haar en make-up af op bos, lanen en gefilterd licht.',
    h1: 'Bruidsstyling op een landgoed in de Friese Wouden',
    lead: 'Oude lanen, statige huizen en licht dat door de bomen valt. Een landgoed in de Friese Wouden is een sprookjesachtig decor, en dat vraagt om een look die net zo tijdloos is.',
    hubText: 'De landgoederen rond Beetsterzwaag en Olterterp zijn geliefd om hun lanen, oude bomen en statige huizen. Het licht valt er gefilterd door het bladerdak: zacht en flatterend, maar ook wisselend tussen schaduw en zon. Dat vraagt om make-up met iets meer definitie, zodat je gezicht op foto’s niet vervaagt, en om een egale huid die ook in een zonnevlek goed oogt. Binnen in een landhuis is het licht vaak gedempt; ik zoek dan de plek bij het hoge raam. Wie op een landgoed trouwt, kiest vaak een klassiek-romantische look: een lage knot of zachte golven met een lange sluier die mooi uitkomt tussen de bomen.',
    region: { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' }, review: 'friesland',
    sections: [
      { title: 'Wat een landgoed <em>bijzonder</em> maakt', html: '<p>Een landgoed geeft je een hele dag decor: een oprijlaan voor je aankomst, een tuin of bos voor de ceremonie, een landhuis voor het diner. Je beweegt de hele dag tussen binnen en buiten. Een goede bruidslook houdt daar rekening mee.</p><p>Het licht onder bomen is zacht maar onvoorspelbaar. Een egale huid, een zachte glow op de jukbeenderen en iets meer diepte rond de ogen zorgen dat je zowel in de schaduw als in een zonnestraal goed op de foto staat.</p>' + VENUES },
      { title: 'Haar en make-up <em>tussen de bomen</em>', html: '<p><strong>Haar:</strong> een lage knot, een half-los kapsel met zachte golven of een losse vlecht passen mooi bij het romantische karakter. Een lange sluier komt prachtig uit in een laan, maar vang dan wel de wind op: ik zet hem extra stevig vast.</p><p><strong>Make-up:</strong> warme, zachte tinten die passen bij het groen; een waterproof mascara voor emotionele momenten; en een basis die bij een warme zomerdag niet gaat glimmen.</p><p><strong>Insecten en pollen:</strong> heb je last van hooikoorts, vertel het bij de intake. Dan werk ik met extra waterproof producten rond de ogen.</p>' },
      { title: 'Waar je je <em>klaarmaakt</em>', html: '<p>Veel landgoederen hebben een bruidssuite of een kamer waar je je kunt klaarmaken. Soms maak je je thuis of in een hotel in de buurt klaar. Ik vraag vooraf naar de ruimte: is er daglicht, zijn er stopcontacten, en hoe ver is het lopen naar de ceremonieplek?</p>' },
    ],
    morning: [
      { title: 'Aankomst', text: 'Ik ben er ruim op tijd en zet op bij het raam met het beste daglicht.' },
      { title: 'Bruidsmeisjes en moeder', text: 'Eerst de anderen, zodat jij als laatste klaar bent.' },
      { title: 'Jouw look', text: 'Haar en make-up zoals bij de proefsessie.' },
      { title: 'De sluier', text: 'Pas als je jurk aan is, zodat hij nergens aan blijft haken.' },
      { title: 'Naar buiten', text: 'Een laatste check in het daglicht onder de bomen.' },
    ],
    faq: [
      { q: 'Welk kapsel past bij een landgoedbruiloft?', a: '<p>Romantisch en tijdloos: een lage knot, zachte golven of half-los met een lange sluier. Bij de proefsessie kijken we wat bij je jurk past.</p>' },
      { q: 'Hoe ver is Beetsterzwaag van Leeuwarden?', a: '<p>Ongeveer 38 km. De reiskosten zijn dan ongeveer €26,60 (38 × 2 × €0,35).</p>' },
      { q: 'Wat als het regent?', a: '<p>Dan ga je naar binnen en past de look nog steeds. Ik zet je haar zo vast dat een vochtige dag het niet laat uitzakken, en je make-up is waterproof waar het moet.</p>' },
    ],
    shots: ['bruid in een laan op een landgoed', 'detail lange sluier tussen bomen', 'bruid bij landhuis'],
  },
  {
    slug: 'friese-meren', name: 'Trouwen aan de Friese Meren',
    title: 'Bruidsstyling aan de Friese Meren | Lado Bridal',
    description: 'Trouwen aan de Friese Meren bij Sneek, Heeg of Langweer? Tips voor een bruidskapsel en make-up die wind, water en zon aankunnen.',
    h1: 'Bruidsstyling voor een bruiloft aan de Friese Meren',
    lead: 'Water, wind en weidse luchten. Rond Sneek, Heeg en Langweer trouw je met uitzicht over het water, soms op een boot. Prachtig, en een uitdaging voor je haar.',
    hubText: 'Rond Sneek, Heeg en Langweer trouw je met uitzicht over het water: in een paviljoen, een oude boerderij aan het meer of zelfs op een boot. Water betekent wind en vochtige lucht, en dat is de grootste vijand van een volledig los kapsel. Ik raad hier vaak half-los, een losse vlecht of een zachte opsteek aan, met een sluier die stevig vastzit. Make-up houd ik licht en fris, met een goed vastgezette basis die niet gaat glimmen in de zon op het water. Plan je foto’s aan de waterkant, dan houd ik rekening met het felle, weerkaatsende licht.',
    region: { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' }, review: 'friesland',
    sections: [
      { title: 'Het water als <em>decor</em>', html: '<p>Een bruiloft aan de Friese Meren voelt als vakantie: ruimte, licht, water. Het licht weerkaatst op het water en zorgt voor een natuurlijke reflector, wat prachtig is voor foto’s. Maar het betekent ook dat er weinig beschutting is tegen wind en zon.</p>' + VENUES },
      { title: 'Een kapsel dat <em>tegen wind</em> kan', html: '<p>Een volledig los kapsel waait in een paar minuten alle kanten op. Daarom bouw ik een kapsel voor het water altijd op met steun: een half-los kapsel met een verborgen basis, een losse vlecht of een zachte, lage opsteek. Losse plukjes rond het gezicht zet ik zo vast dat ze mogen bewegen zonder in je ogen te waaien.</p><p>Een sluier is aan het water spectaculair op foto’s, maar trekt ook aan je haar. Ik zet hem vast met een steun die het gewicht verdeelt, en raad aan hem tijdens de borrel af te doen.</p>' },
      { title: 'Make-up in de <em>zon op het water</em>', html: '<p>Het weerkaatsende licht maakt alles helderder. Een te zware make-up wordt dan snel hard. Ik werk met een lichte, langhoudende basis, waterproof rond de ogen, en een SPF-vriendelijke voorbereiding als je de hele dag buiten bent.</p>' },
      { title: 'Trouwen <em>op een boot</em>', html: '<p>Ga je met een boot van de ceremonie naar het feest? Dan is de wind op het water nog sterker. Neem een vest of omslagdoek mee, houd je sluier vast en plan de foto’s op het water liefst aan het begin van de tocht, als alles nog perfect zit.</p>' },
    ],
    morning: [
      { title: 'Vertrek uit Leeuwarden', text: 'Sneek ligt op ca. 25 km; ik reken marge voor een openstaande brug.' },
      { title: 'Opzetten', text: 'Bij het raam met uitzicht op het water, meestal het mooiste licht.' },
      { title: 'Gasten', text: 'Bruidsmeisjes en moeder eerst.' },
      { title: 'Jouw look', text: 'Gebouwd op wind en zon.' },
      { title: 'Klaar', text: 'Sluier erin, lipkleur mee, op naar de steiger.' },
    ],
    faq: [
      { q: 'Kan ik een los kapsel dragen aan het water?', a: '<p>Het kan, maar het is kwetsbaar. Half-los of een losse opsteek houdt het veel beter vol. Bij de proefsessie laten we zien hoe beide eruitzien.</p>' },
      { q: 'Wat zijn de reiskosten naar Sneek?', a: '<p>Sneek ligt op ongeveer 25 km van Leeuwarden: 25 × 2 × €0,35 = €17,50.</p>' },
      { q: 'Blijft make-up zitten bij zon op het water?', a: '<p>Ja, met een goed voorbereide huid, een lichte basis die is vastgezet en waterproof producten rond de ogen.</p>' },
    ],
    shots: ['bruid aan het water, Friese Meren', 'bruid op een boot', 'detail kapsel met wind'],
  },
  {
    slug: 'borgen-groningen', name: 'Borgen in Groningen',
    title: 'Bruidsstyling op een Groningse borg | Lado Bridal',
    description: 'Trouwen op een borg in Groningen? Zo stem je bruidskapsel en make-up af op statige binnenruimtes, tuinen en het weidse ommeland.',
    h1: 'Bruidsstyling voor een bruiloft op een Groningse borg',
    lead: 'Grachten, oude muren en tuinen die eeuwen teruggaan. Een borg in het Groningse ommeland is een statig decor, met binnenruimtes vol sfeer en een weids landschap eromheen.',
    hubText: 'De Groningse borgen zijn statige huizen met grachten, oude tuinen en sfeervolle maar vaak donkere binnenruimtes. Juist die combinatie vraagt aandacht: binnen is het licht gedempt en warm, buiten in de tuin fel en open. Ik bouw de make-up daarom op zodat hij in beide situaties klopt, met een stralende maar niet glimmende huid en net genoeg definitie voor foto’s in een donkere zaal. Een klassieke look past hier vaak goed: een elegante opsteek of een lage knot met een sluier die mooi uitkomt op een stenen trap of brug over de gracht.',
    region: { href: '/bruidsstylist-groningen', label: 'Bruidsstylist Groningen' }, review: 'groningen',
    sections: [
      { title: 'Statig, maar <em>persoonlijk</em>', html: '<p>Een borg heeft iets plechtigs, maar een bruiloft daar voelt vaak verrassend intiem. De ceremonie is binnen in een historische zaal of buiten in de tuin, en de foto’s maak je bij de gracht, op een brug of in de oude bomen.</p>' + VENUES },
      { title: 'Licht binnen <em>en buiten</em>', html: '<p>Historische zalen hebben vaak kleine ramen en donkere lambriseringen. Op foto’s kan een te lichte make-up daar flets lijken, en een te zware buiten in de zon juist hard. Ik zoek de balans: een egale huid met een zachte glow, iets meer diepte in de wimperlijn en wenkbrauwen, en een lipkleur die in beide lichtsoorten klopt.</p>' },
      { title: 'Een look die past bij <em>historie</em>', html: '<p>Klassieke looks passen hier vanzelf: een elegante opsteek, een gladde lage knot of zachte, gestructureerde golven. Een kathedraalsluier op een stenen trap of brug is een klassieker op foto’s. Ik zorg dat hij stevig zit, ook als het in het open landschap waait.</p>' },
    ],
    morning: [
      { title: 'Reis via de A7', text: 'Afhankelijk van de borg ca. 50–90 km; boven 75 km overnacht ik in de buurt.' },
      { title: 'Opzetten', text: 'In de bruidskamer of bij het grootste raam.' },
      { title: 'Gasten', text: 'Bruidsmeisjes en moeder eerst.' },
      { title: 'Jouw look', text: 'Afgestemd op binnen- én buitenlicht.' },
      { title: 'Foto’s bij de gracht', text: 'Een laatste check op wind en licht.' },
    ],
    faq: [
      { q: 'Kom je naar alle borgen in Groningen?', a: '<p>Ja. Ligt de borg verder dan 75 km van Leeuwarden, dan overnacht ik in de buurt. Alle kosten staan vooraf in je offerte.</p>' },
      { q: 'Welke make-up werkt in een donkere historische zaal?', a: '<p>Een stralende, egale huid met iets meer definitie rond de ogen. Zo verdwijn je niet in het gedempte licht, zonder dat het buiten te zwaar wordt.</p>' },
      { q: 'Kan ik me op de borg zelf klaarmaken?', a: '<p>Veel borgen hebben een ruimte voor de bruid. Vraag het na bij de locatie; ik werk overal waar daglicht en een stopcontact is.</p>' },
    ],
    shots: ['bruid op een Groningse borg', 'bruid op stenen brug bij gracht', 'historische zaal'],
  },
  {
    slug: 'stadhuis-leeuwarden', name: 'Stadhuis Leeuwarden',
    title: 'Bruidsstyling voor het stadhuis in Leeuwarden | Lado Bridal',
    description: 'Trouwen op het stadhuis in Leeuwarden? Zo plan je haar en make-up rond een strak tijdschema, met minimale reistijd vanaf de studio.',
    h1: 'Bruidsstyling voor een bruiloft op het stadhuis in Leeuwarden',
    lead: 'Een ceremonie op het stadhuis is compact, persoonlijk en strak gepland. Een rustige ochtend met een ruime marge maakt het verschil.',
    hubText: 'Trouwen op het stadhuis in Leeuwarden betekent vaak een compacte ceremonie op een vaste tijd, gevolgd door foto’s in de binnenstad. Omdat mijn studio in Leeuwarden staat, is de reistijd minimaal en de planning eenvoudig. Ik plan de ochtend terug vanaf je ceremonietijd en houd een ruime marge aan voor parkeren, aankleden en foto’s vooraf. Je look moet zowel binnen in de trouwzaal als buiten tussen de oude gevels kloppen: een egale, langhoudende basis en een kapsel dat een windvlaag op de stoep kan hebben.',
    region: { href: '/bruidsstylist-leeuwarden', label: 'Bruidsstylist Leeuwarden' }, review: 'leeuwarden',
    sections: [
      { title: 'Een ceremonie <em>op tijd</em>', html: '<p>Een stadhuisceremonie heeft een vaste starttijd, en vaak volgt de volgende ceremonie kort daarna. Te laat komen is geen optie. Daarom plan ik terug vanaf het moment dat je de trouwzaal binnenloopt: aankomst, parkeren, foto’s vooraf, aankleden, jouw look en die van eventuele gasten. Er zit altijd een buffer in.</p>' + VENUES },
      { title: 'Binnen <em>en buiten</em> mooi', html: '<p>Na de ceremonie volgen meestal foto’s op de trappen of in de binnenstad. Tussen gebouwen kan het waaien en het licht wisselt van schaduw naar zon. Ik zet je kapsel vast op de plekken waar wind het eerst grip krijgt, en houd de make-up zo dat die in beide lichtsoorten klopt.</p>' },
      { title: 'Klaarmaken <em>in de stad</em>', html: '<p>Veel bruiden maken zich klaar in een hotel in het centrum of bij hun ouders in of rond Leeuwarden. Een hotelkamer dicht bij het stadhuis is ideaal: korte loop- of rijafstand en vaak mooi licht.</p>' },
    ],
    morning: [
      { title: 'Korte rit', text: 'Vanuit de studio ben ik snel bij je.' },
      { title: 'Gasten eerst', text: 'Moeder en bruidsmeisjes, als die er zijn.' },
      { title: 'Jouw look', text: 'Ruim op tijd klaar.' },
      { title: 'Foto’s vooraf', text: 'Eventueel een first look in de stad.' },
      { title: 'Naar het stadhuis', text: 'Ontspannen en op tijd.' },
    ],
    faq: [
      { q: 'Hoe vroeg moet ik beginnen voor een stadhuisceremonie?', a: '<p>Dat hangt af van het aantal personen en de looks. Ik maak een planning terug vanaf je ceremonietijd, met een ruime buffer.</p>' },
      { q: 'Wat kost bruidsstyling voor het stadhuis in Leeuwarden?', a: '<p>De Complete Bruidslook begint vanaf €600, met minimale reiskosten binnen de stad. Zie <a href="/tarieven">tarieven</a>.</p>' },
      { q: 'Kun je ook mijn moeder en getuige stylen?', a: '<p>Ja. Gasten en bruidsmeisjes €75 p.p., moeder van de bruid €75 inclusief stylingadvies.</p>' },
    ],
    shots: ['bruid bij het stadhuis Leeuwarden', 'bruidspaar in de binnenstad', 'klaarmaken in hotelkamer'],
  },
  {
    slug: 'waddeneilanden', name: 'Waddeneilanden',
    title: 'Bruidsstyling op de Waddeneilanden | Lado Bridal',
    description: 'Trouwen op Terschelling, Vlieland, Ameland of Schiermonnikoog? Bruidskapsel en make-up op het eiland, met de boot mee en een planning rond de dienstregeling.',
    h1: 'Bruidsstyling op de Waddeneilanden',
    lead: 'Duinen, strand en een uitzicht dat eindeloos lijkt. Op Terschelling, Vlieland, Ameland of Schiermonnikoog trouw je ver weg van alles. Ik reis met je mee.',
    hubText: 'Een bruiloft op een Waddeneiland is bijzonder: een overtocht, duinen, strand en zeewind. Ik reis mee met de boot vanuit Harlingen, Holwerd of Lauwersoog, en plan de ochtend rond de dienstregeling. Vaak betekent dat een overnachting op het eiland, zodat ik ’s ochtends niet afhankelijk ben van de eerste boot. Voor je look is wind het belangrijkste aandachtspunt: kies een kapsel met steun en een sluier die stevig vastzit. Make-up houd ik licht, langhoudend en bestand tegen zon, zout en zand.',
    region: { href: '/bruidsstylist-friesland', label: 'Bruidsstylist Friesland' }, review: 'friesland',
    sections: [
      { title: 'De overtocht <em>plannen</em>', html: '<p>Terschelling en Vlieland bereik je vanuit Harlingen, Ameland vanuit Holwerd en Schiermonnikoog vanuit Lauwersoog. Omdat je aan de dienstregeling vastzit, plan ik vaak een overnachting op het eiland, zodat ik op je trouwochtend niet afhankelijk ben van de eerste boot. De kosten voor boot en verblijf staan vooraf in je offerte.</p><p>Neem bij het plannen van je dag ook de boot van je gasten mee: wie komt wanneer aan, en wie moet er ’s avonds weer terug?</p>' + VENUES },
      { title: 'Zeewind, zon <em>en zand</em>', html: '<p>Op een eiland waait het bijna altijd. Een kapsel met een verborgen basis (half-los, vlecht of losse opsteek) houdt het veel beter dan helemaal los. Ik zet je sluier extra stevig vast en raad aan hem na de ceremonie af te doen.</p><p>Je make-up moet tegen zon, zout en zand kunnen: een lichte, goed vastgezette basis, waterproof producten rond de ogen, en een lipkleur die je meeneemt in je tasje.</p>' },
      { title: 'Klaarmaken <em>op het eiland</em>', html: '<p>Op een eiland maak je je meestal klaar in een hotel, B&B of vakantiehuis. Ik vraag vooraf naar de ruimte en het licht. Zand in de kamer is onvermijdelijk; ik werk met een schone, afgedekte werkplek.</p>' },
    ],
    morning: [
      { title: 'De dag ervoor', text: 'Overtocht met de boot en overnachting op het eiland.' },
      { title: 'Opzetten', text: 'In je hotel of vakantiehuis, bij het beste licht.' },
      { title: 'Gasten', text: 'Eerst bruidsmeisjes en moeder.' },
      { title: 'Jouw look', text: 'Gebouwd op zeewind.' },
      { title: 'Naar de duinen', text: 'Sluier erin, klaar voor de ceremonie.' },
    ],
    faq: [
      { q: 'Overnacht je op het eiland?', a: '<p>Meestal wel. Dan ben ik niet afhankelijk van de eerste boot en ben ik op je trouwochtend ruim op tijd. De kosten zie je vooraf in je offerte.</p>' },
      { q: 'Welke eilanden doe je?', a: '<p>Terschelling, Vlieland, Ameland en Schiermonnikoog. <span class="ph">[CHECK: ook Texel?]</span></p>' },
      { q: 'Welk kapsel houdt het in de zeewind?', a: '<p>Half-los met een verborgen basis, een losse vlecht of een zachte opsteek. Helemaal los is mooi, maar in de wind niet lang.</p>' },
    ],
    shots: ['bruid in de duinen', 'bruid op het strand met sluier', 'overtocht met de boot'],
  },
  {
    slug: 'schuurbruiloft-drenthe-overijssel', name: 'Schuurbruiloft in Drenthe & Overijssel',
    title: 'Bruidsstyling schuurbruiloft Drenthe & Overijssel | Lado Bridal',
    description: 'Trouwen in een schuur of op een boerderij in Drenthe of Overijssel? Haar en make-up voor schuurlicht, een dag buiten en een avond dansen.',
    h1: 'Bruidsstyling voor een schuurbruiloft in Drenthe en Overijssel',
    lead: 'Lange tafels, lichtslingers, hooibalen en een dansvloer die tot laat doorgaat. Een schuurbruiloft is ontspannen en persoonlijk, en je look mag dat ook zijn.',
    hubText: 'Een schuurbruiloft in Drenthe of Overijssel is ontspannen: lange tafels, lichtslingers en een feest dat tot laat doorgaat. Het licht in een schuur is overdag zacht vanuit de deuren en ’s avonds warm en donker. Ik kies daarom een make-up die in beide situaties werkt, met net iets meer definitie zodat je op avondfoto’s niet verdwijnt. Romantische, half-losse kapsels en losse vlechten passen hier mooi en hebben genoeg steun voor een avond dansen. De getting-ready-ruimte is soms een woonkamer of zolder: ik neem eigen licht mee.',
    region: { href: '/bruidsstylist-drenthe', label: 'Bruidsstylist Drenthe' }, review: 'drenthe',
    sections: [
      { title: 'Het licht <em>in een schuur</em>', html: '<p>Overdag valt er zacht licht door de grote deuren, en dat is prachtig voor foto’s. ’s Avonds is het donker met warm licht van slingers en kaarsen. Make-up die overdag perfect is, kan ’s avonds verdwijnen. Ik bouw de look daarom op met iets meer definitie rond de ogen en een lip die ook bij kaarslicht zichtbaar is.</p>' + VENUES },
      { title: 'Romantisch <em>en stevig</em>', html: '<p>Bij een schuurbruiloft kiezen veel bruiden voor een romantische, wat lossere look: half-los met golven, een losse vlecht, bloemen in het haar. Ontspannen hoeft niet slap te zijn: ik bouw het kapsel op met een stevige basis, zodat het na een avond dansen nog steeds zit.</p>' },
      { title: 'Klaarmaken <em>op de boerderij</em>', html: '<p>Op een boerderij maak je je vaak klaar in een woonkamer, een zolderkamer of een B&B in de buurt. Daglicht is er niet altijd genoeg; ik neem mijn eigen licht mee. Laat me vooraf weten waar je je klaarmaakt, zodat ik weet wat ik moet meenemen.</p><p>De meeste schuurlocaties in Drenthe en Overijssel liggen op meer dan 75 km van Leeuwarden. Dan overnacht ik in de buurt; de kosten staan vooraf in je offerte.</p>' },
    ],
    morning: [
      { title: 'De dag ervoor', text: 'Boven 75 km overnacht ik in de buurt.' },
      { title: 'Opzetten met eigen licht', text: 'Bij het raam of de deur, aangevuld met lampen.' },
      { title: 'Gasten', text: 'Bruidsmeisjes en moeder eerst.' },
      { title: 'Jouw look', text: 'Romantisch, maar gebouwd op een lange dag.' },
      { title: 'Klaar', text: 'Bloemen of sluier erin, en naar buiten.' },
    ],
    faq: [
      { q: 'Welk kapsel past bij een schuurbruiloft?', a: '<p>Romantisch half-los, een losse vlecht of zachte golven, eventueel met bloemen. Met een stevige basis zodat het blijft zitten tijdens het feest.</p>' },
      { q: 'Hoe zorg je dat make-up ook ’s avonds goed is?', a: '<p>Door iets meer definitie te gebruiken dan je voor een daglook zou doen, en een lipkleur die bij kaarslicht zichtbaar blijft. Je krijgt je lipkleur mee voor na het eten.</p>' },
      { q: 'Reken je verblijfkosten voor Drenthe of Overijssel?', a: '<p>Als de locatie verder dan 75 km van Leeuwarden ligt wel. Dat staat vooraf in je offerte.</p>' },
    ],
    shots: ['bruid in schuur, zacht tegenlicht', 'detail bloemen in het haar', 'avondfeest met lichtslingers'],
  },
];
