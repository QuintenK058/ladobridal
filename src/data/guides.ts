export interface Guide { slug: string; title: string; lead: string; ready: boolean; toc: [string, string][]; brief: string }
export const GUIDES: Guide[] = [
  { slug: 'wat-kosten-hair-extensions', title: 'Wat kosten hair extensions?', ready: true, lead: 'Wat je betaalt voor hair extensions, waar de prijs van afhangt en waarom je altijd per jaar moet rekenen.', toc: [], brief: '' },
  { slug: 'tape-of-keratine-extensions', title: 'Tape of keratine extensions: welke past bij jou?', ready: false, lead: 'Tape en keratine naast elkaar: haartype, comfort, onderhoud en kosten.',
    toc: [['verschil', 'Het verschil in het kort'], ['haartype', 'Welk haartype?'], ['comfort', 'Comfort en dragen'], ['onderhoud', 'Onderhoud'], ['kosten', 'Kosten per jaar'], ['keuze', 'Zo kies je']],
    brief: 'Zoekintentie: “tape of keratine extensions”, “verschil tape en bonding”. Vergelijkingstabel met Quinty’s eigen cijfers; eerlijk “voor wie niet”. Links: /tape-extensions, /keratine-extensions, /extension-check.' },
  { slug: 'extensions-bij-fijn-haar', title: 'Extensions bij fijn haar', ready: false, lead: 'Kan het, welke methode, hoeveel gewicht en waar je op let.',
    toc: [['kan-het', 'Kan het?'], ['methode', 'Welke methode?'], ['gewicht', 'Hoeveel gewicht?'], ['onzichtbaar', 'Onzichtbaar bij fijn haar'], ['verzorging', 'Verzorging']],
    brief: 'Zoekintentie: “extensions fijn haar”, “haarverdikking dun haar”. Geen medische claims; bij haaruitval verwijzen naar huisarts/dermatoloog. Echte voor/na op fijn haar. Links: /tape-extensions, /keratine-extensions, /extension-check.' },
  { slug: 'zijn-extensions-slecht-voor-je-haar', title: 'Zijn extensions slecht voor je haar?', ready: false, lead: 'Een eerlijk antwoord: wanneer extensions schade doen, en hoe je dat voorkomt.',
    toc: [['eerlijk', 'Het eerlijke antwoord'], ['oorzaken', 'Waar schade vandaan komt'], ['voorkomen', 'Zo voorkom je het'], ['nee', 'Wanneer ik nee zeg'], ['uitval', 'Haaruitval: eerst naar de arts']],
    brief: 'Zoekintentie: “zijn extensions slecht voor je haar”. Eerlijk, geen garanties (“geen schade gegarandeerd” is verboden), geen medische claims. Links: /extensions-onderhoud, /nazorg, /extensions-verwijderen.' },
  { slug: 'hoe-lang-gaan-hair-extensions-mee', title: 'Hoe lang gaan hair extensions mee?', ready: false, lead: 'Per methode: hoe lang het haar meegaat, hoe vaak onderhoud nodig is en wat de levensduur beïnvloedt.',
    toc: [['per-methode', 'Per methode'], ['factoren', 'Wat de levensduur bepaalt'], ['onderhoud', 'Onderhoud'], ['vervangen', 'Wanneer vervangen?']],
    brief: 'ALLEEN Quinty’s eigen cijfers per methode (geen internetgemiddelden). Links: alle methodepagina’s, /prijzen.' },
  { slug: 'extensions-voor-je-bruiloft', title: 'Extensions voor je bruiloft', ready: false, lead: 'Wanneer plaatsen, hoe combineren met je proefsessie en bruidskapsel.',
    toc: [['timing', 'Timing'], ['proefsessie', 'Samen met je proefsessie'], ['kapsel', 'Opgestoken of los'], ['clipins', 'Clip-ins als alternatief']],
    brief: 'Cross-link naar ladobridal.com (geen tekst van Lado Bridal kopiëren). Links: /extensions-bruiloft, /clip-in-extensions.' },
];
