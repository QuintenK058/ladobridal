/**
 * Unique copy per method page. General descriptions of how a method works are factual; anything about Quinty’s
 * own practice (numbers, preferences, what she does/doesn’t do) is a placeholder or marked CHECK.
 */
const C = (s: string) => `<span class="ph">[${s}]</span>`;

export interface MethodCopy {
  title: string; description: string; h1: string; lead: string;
  what: string; forWho: { yes: string[]; no: string[] }; steps: { title: string; text: string }[];
  care: string; included: string[]; faq: { q: string; a: string }[]; related: string[]; guides: { href: string; label: string }[];
}

export const COPY: Record<string, MethodCopy> = {
  tape: {
    title: 'Tape extensions Leeuwarden | Plat, licht en snel | By Lado',
    description: 'Tape extensions in Leeuwarden: dunne, platte banen die vlak tegen je hoofd liggen. Ideaal bij fijn haar. Consult, kleur op maat en eerlijk onderhoudsadvies.',
    h1: 'Tape extensions in Leeuwarden',
    lead: 'Dunne, platte banen die vlak tegen je hoofdhuid liggen. Tape extensions zijn snel geplaatst, voelen licht aan en verdelen het gewicht over een brede strook, waardoor ze vaak goed werken bij fijn haar.',
    what: `<p>Bij tape extensions worden twee dunne banen haar met een klevende strip als een sandwich om een smal plukje van je eigen haar gezet. Omdat de banen plat zijn, liggen ze vlak tegen je hoofd en vallen ze in je haar weg. Het gewicht wordt verdeeld over de hele breedte van de baan in plaats van over één punt.</p>
<p>Dat maakt tape een veelgekozen methode voor wie fijn of normaal haar heeft en zowel lengte als volume wil. Het plaatsen gaat relatief snel, en bij onderhoud worden de banen losgemaakt, opnieuw voorzien van tape en hoger teruggezet. ${C('CHECK: hergebruikt Quinty tapes bij onderhoud? hoe vaak?')}</p>
<h3>Hoe voelt het?</h3>
<p>De eerste dagen voel je dat er iets zit, vooral als je je haar naar achteren strijkt. Dat went meestal snel. Belangrijk is dat de banen niet te dicht bij je hoofdhuid en niet te strak geplaatst worden, zodat je eigen haar vrij kan bewegen.</p>`,
    forWho: {
      yes: ['Je hebt fijn tot normaal haar en wilt meer volume, lengte of allebei', 'Je wilt een vlakke methode zonder bolletjes of ringen', 'Je wilt een relatief korte plaatsingstijd'],
      no: ['Je draagt je haar heel vaak in een hoge staart of strakke knot (de banen kunnen dan zichtbaar worden)', 'Je gebruikt veel olie of siliconen vlak bij de aanzet', 'Je haar is erg beschadigd of breekt snel — dan adviseer ik eerst herstel'],
    },
    steps: [
      { title: 'Consult & kleur', text: 'We bepalen lengte, hoeveelheid en kleur; zo nodig mengen we tinten.' },
      { title: 'Voorbereiden', text: 'Je haar wordt gewassen en goed ontvet, zodat de tape goed hecht.' },
      { title: 'Plaatsen', text: 'In rijen, steeds een smal plukje eigen haar tussen twee banen.' },
      { title: 'Knippen & blenden', text: 'De extensions worden in je eigen haar geknipt tot je de overgang niet meer ziet.' },
      { title: 'Uitleg', text: 'Je krijgt uitleg over wassen, borstelen en slapen.' },
    ],
    care: `<p>De eerste ${C('X')} uur na het plaatsen kun je je haar beter niet wassen, zodat de tape goed kan hechten. Gebruik daarna verzorgingsproducten zonder olie of siliconen rond de aanzet, en borstel vanaf de punten naar boven met één hand bij de aanzet.</p>
<p>Omdat je eigen haar doorgroeit, zakken de banen langzaam naar beneden. Bij onderhoud worden ze losgemaakt en weer hoger gezet. Volgens mijn eigen richtlijn is dat elke <strong>${C('X')} weken</strong>; het haar zelf gaat bij goede verzorging ongeveer <strong>${C('X maanden')}</strong> mee.</p>`,
    included: ['Consult en kleuradvies', 'Plaatsen', 'Knippen en blenden', 'Nazorgadvies'],
    faq: [
      { q: 'Zie je tape extensions als ik mijn haar opsteek?', a: `<p>Bij een lage staart of losse knot meestal niet. Bij een hoge, strakke staart kunnen de banen zichtbaar worden. Wil je je haar vaak hoog dragen, vertel het in het consult; dan plaats ik er rekening mee of adviseer ik een andere methode.</p>` },
      { q: 'Zijn tape extensions geschikt voor fijn haar?', a: '<p>Vaak wel, omdat het gewicht over een brede strook wordt verdeeld. Belangrijk is dat er niet te veel haar wordt geplaatst voor wat je eigen haar kan dragen.</p>' },
      { q: 'Kunnen tape extensions opnieuw gebruikt worden?', a: `<p>${C('CHECK: Quinty’s eigen werkwijze voor hergebruik bij onderhoud')}</p>` },
      { q: 'Hoe lang duurt het plaatsen?', a: `<p>Ongeveer ${C('X uur')}, afhankelijk van hoeveel banen er worden geplaatst. Knippen en blenden zit daarbij in.</p>` },
      { q: 'Mag ik de tapes zelf verwijderen?', a: '<p>Liever niet. Met de verkeerde remover of door trekken kun je je eigen haar beschadigen. Verwijderen gaat snel en zacht in de studio.</p>' },
    ],
    related: ['keratine', 'weft'], guides: [{ href: '/gidsen/tape-of-keratine-extensions', label: 'Tape of keratine: welke past bij jou?' }, { href: '/gidsen/extensions-bij-fijn-haar', label: 'Extensions bij fijn haar' }],
  },
  keratine: {
    title: 'Keratine extensions Leeuwarden | Bonding op maat | By Lado',
    description: 'Keratine extensions in Leeuwarden: losse strengen met een bonding, één voor één geplaatst voor veel bewegingsvrijheid. Consult, kleur op maat en eerlijk advies.',
    h1: 'Keratine extensions (bondings) in Leeuwarden',
    lead: 'Losse strengen met een kleine keratine-bonding, één voor één aan je eigen haar gezet. Omdat elke streng apart beweegt, kun je je haar vrij dragen, ook opgestoken.',
    what: `<p>Keratine extensions, ook wel bondings of k-tips genoemd, zijn kleine strengen haar met aan het uiteinde een bonding van keratine. Die bonding wordt met warmte zacht gemaakt en om een klein plukje van je eigen haar gerold. Na het afkoelen zit de streng vast.</p>
<p>Omdat er per streng maar een klein plukje eigen haar wordt gebruikt en de strengen los van elkaar bewegen, valt het haar heel natuurlijk. Het is een methode met veel bewegingsvrijheid: staarten, vlechten en opsteken zijn meestal goed mogelijk.</p>
<h3>Wat vraagt het?</h3>
<p>Het plaatsen kost meer tijd dan bijvoorbeeld tape, omdat elke streng apart wordt gezet. En omdat de strengen met warmte worden geplaatst en verwijderd, is precisie belangrijk: de bonding mag niet te groot zijn voor het plukje haar eronder.</p>`,
    forWho: {
      yes: ['Je wilt je haar ook opgestoken of in een staart kunnen dragen', 'Je sport veel en wilt een methode met bewegingsvrijheid', 'Je hebt normaal tot dik haar'],
      no: ['Je wilt snel klaar zijn: het plaatsen duurt langer', 'Je haar is erg fijn of breekbaar ' + C('CHECK: Quinty’s advies bij fijn haar + bondings'), 'Je wilt de extensions vaak verwijderen en terugzetten'],
    },
    steps: [
      { title: 'Consult & kleur', text: 'Lengte, hoeveelheid en kleur(mix) bepalen.' },
      { title: 'Secties maken', text: 'Je haar wordt in nette, kleine secties verdeeld.' },
      { title: 'Streng voor streng', text: 'Elke bonding wordt om een klein plukje eigen haar gezet.' },
      { title: 'Knippen & blenden', text: 'Alles wordt ingeknipt tot het één geheel is.' },
      { title: 'Uitleg', text: 'Hoe je borstelt, wast en slaapt met bondings.' },
    ],
    care: `<p>Borstel dagelijks met een zachte extensionborstel, en houd de bondings uit elkaar door met je vingers langs de aanzet te gaan. Slaap met je haar in een losse vlecht. Vermijd hete stijltangen vlak bij de bondings.</p>
<p>Na verloop van tijd groeien de bondings mee naar beneden. Volgens mijn eigen richtlijn plan je onderhoud elke <strong>${C('X weken')}</strong> en gaan de strengen ongeveer <strong>${C('X maanden')}</strong> mee. ${C('CHECK: worden bondings bij onderhoud opnieuw gebond?')}</p>`,
    included: ['Consult en kleuradvies', 'Plaatsen streng voor streng', 'Knippen en blenden', 'Nazorgadvies'],
    faq: [
      { q: 'Doet het plaatsen van keratine extensions pijn?', a: '<p>Nee, het plaatsen zelf doet geen pijn. De eerste nachten kun je de bondings voelen als je op je hoofd ligt; dat went meestal snel.</p>' },
      { q: 'Kan ik met keratine extensions zwemmen?', a: '<p>Ja, met wat extra aandacht: draag je haar in een vlecht, spoel chloor of zout direct uit en verzorg goed. Zie de <a href="/nazorg">nazorg</a>.</p>' },
      { q: 'Hoe lang duurt het plaatsen van bondings?', a: `<p>Ongeveer ${C('X uur')}, afhankelijk van het aantal strengen.</p>` },
      { q: 'Zijn bondings zichtbaar?', a: '<p>Bij een goede kleurmatch en de juiste grootte van de bonding vallen ze weg in je haar, ook als je het opsteekt.</p>' },
      { q: 'Wat is het verschil met tape?', a: '<p>Tape ligt plat en is sneller geplaatst; bondings bewegen losser en geven meer vrijheid in hoe je je haar draagt. Lees de vergelijking <a href="/gidsen/tape-of-keratine-extensions">tape of keratine</a>.</p>' },
    ],
    related: ['tape', 'microring'], guides: [{ href: '/gidsen/tape-of-keratine-extensions', label: 'Tape of keratine: welke past bij jou?' }, { href: '/gidsen/hoe-lang-gaan-hair-extensions-mee', label: 'Hoe lang gaan hair extensions mee?' }],
  },
  weft: {
    title: 'Weft extensions Leeuwarden | Veel volume in één rij | By Lado',
    description: 'Weft extensions in Leeuwarden: een of meer rijen haar op een dunne baan voor veel volume in één keer. Eerlijk advies of je haar het gewicht kan dragen.',
    h1: 'Weft extensions in Leeuwarden',
    lead: 'Een rij haar op een dunne baan, vastgezet aan een basis van je eigen haar. Met weft extensions krijg je in één keer veel volume, met weinig bevestigingspunten.',
    what: `<p>Een weft is een lange, dunne baan waarop haar is gestikt of handgebonden. De baan wordt horizontaal in je haar gezet, op een basis van je eigen haar, bijvoorbeeld met kleine ringetjes of een vlechtje. Er bestaan verschillende soorten (zoals hand-tied, genius of machine weft); ze verschillen in dikte, soepelheid en hoe ze worden vastgezet. ${C('CHECK: welke weft-variant(en) Quinty gebruikt en hoe ze bevestigt')}</p>
<p>Omdat er veel haar op één baan zit, geeft een weft snel veel volume. Daar staat tegenover dat het gewicht over minder punten wordt verdeeld. Je eigen haar moet dat goed kunnen dragen.</p>`,
    forWho: {
      yes: ['Je wilt veel volume in één keer', 'Je hebt normaal tot dik haar', 'Je wilt weinig losse bevestigingspunten'],
      no: ['Je hebt heel fijn of dun haar zonder voldoende basis', 'Je draagt je haar vaak strak naar achteren of hoog opgestoken', 'Je wilt alleen een klein beetje extra lengte'],
    },
    steps: [
      { title: 'Consult & kleur', text: 'Hoeveel rijen, welke lengte en welke kleur(en).' },
      { title: 'Basis maken', text: 'Een rij van je eigen haar wordt voorbereid als basis.' },
      { title: 'Rijen plaatsen', text: 'De weft wordt op de basis vastgezet, rij voor rij.' },
      { title: 'Knippen & blenden', text: 'Inknippen tot de overgang niet meer zichtbaar is.' },
      { title: 'Uitleg', text: 'Verzorging, slapen en wanneer je terugkomt.' },
    ],
    care: `<p>Borstel dagelijks met één hand bij de rij, droog de basis goed na het wassen en slaap niet met nat haar. Omdat de basis meegroeit, wordt de rij bij onderhoud weer hoger gezet. Mijn richtlijn: onderhoud elke <strong>${C('X weken')}</strong>, de weft gaat ongeveer <strong>${C('X maanden')}</strong> mee.</p>`,
    included: ['Consult en kleuradvies', 'Plaatsen van de rij(en)', 'Knippen en blenden', 'Nazorgadvies'],
    faq: [
      { q: 'Hoeveel rijen weft heb ik nodig?', a: '<p>Dat hangt af van je eigen haar en hoeveel volume je wilt. Vaak is één of twee rijen genoeg; in het consult kijken we wat je haar kan dragen.</p>' },
      { q: 'Is weft geschikt voor fijn haar?', a: '<p>Bij heel fijn haar ben ik voorzichtig, omdat het gewicht over minder punten wordt verdeeld. Soms is tape of keratine dan een betere keuze.</p>' },
      { q: 'Voel je een weft zitten?', a: '<p>De eerste dagen voel je de rij, vooral bij het slapen. Dat went meestal snel als de rij niet te strak is gezet.</p>' },
      { q: 'Kan ik mijn haar opsteken met weft extensions?', a: '<p>Een losse knot of lage staart gaat meestal goed. Bij een hoge staart kan de rij zichtbaar worden.</p>' },
    ],
    related: ['tape', 'microring'], guides: [{ href: '/gidsen/hoe-lang-gaan-hair-extensions-mee', label: 'Hoe lang gaan hair extensions mee?' }],
  },
  microring: {
    title: 'Microring extensions Leeuwarden | Zonder lijm of warmte | By Lado',
    description: 'Microring extensions in Leeuwarden: strengen met een klein ringetje, zonder lijm of warmte geplaatst. Consult, kleur op maat en eerlijk advies per haartype.',
    h1: 'Microring extensions in Leeuwarden',
    lead: 'Strengen die met een klein ringetje aan je eigen haar worden geklemd. Zonder lijm en zonder warmte, en bij onderhoud vaak opnieuw te gebruiken.',
    what: `<p>Bij microring extensions (ook wel i-tips of micro rings) wordt een klein plukje eigen haar samen met de streng door een minuscuul ringetje gehaald. Het ringetje wordt dichtgeknepen, waardoor de streng vastzit. Er komt geen lijm of warmte aan te pas.</p>
<p>Omdat de ringetjes weer open kunnen, worden de strengen bij onderhoud vaak losgemaakt, hoger gezet en hergebruikt. ${C('CHECK: hergebruik bij Quinty')} Het ringetje heeft de kleur van je haar, zodat het wegvalt.</p>`,
    forWho: {
      yes: ['Je wilt geen lijm of warmte bij je haar', 'Je hebt normaal tot dik haar', 'Je wilt strengen bij onderhoud kunnen hergebruiken'],
      no: ['Je hebt heel fijn haar waarin ringetjes voelbaar of zichtbaar kunnen zijn', 'Je wilt een methode die helemaal plat ligt'],
    },
    steps: [
      { title: 'Consult & kleur', text: 'Lengte, hoeveelheid, kleur van haar én ringetjes.' },
      { title: 'Secties maken', text: 'Kleine, nette secties voor een gelijkmatige verdeling.' },
      { title: 'Ringetjes plaatsen', text: 'Streng en plukje eigen haar door het ringetje, dichtknijpen.' },
      { title: 'Knippen & blenden', text: 'Alles wordt ingeknipt tot één geheel.' },
      { title: 'Uitleg', text: 'Borstelen, wassen en slapen met ringetjes.' },
    ],
    care: `<p>Borstel met één hand bij de aanzet en vermijd producten die de ringetjes glad maken. Na het wassen goed droog föhnen bij de aanzet. Mijn richtlijn: onderhoud elke <strong>${C('X weken')}</strong>, strengen gaan ongeveer <strong>${C('X maanden')}</strong> mee.</p>`,
    included: ['Consult en kleuradvies', 'Plaatsen met ringetjes', 'Knippen en blenden', 'Nazorgadvies'],
    faq: [
      { q: 'Zijn microrings slecht voor je haar?', a: '<p>Niet als ze goed geplaatst worden: niet te strak, met de juiste hoeveelheid haar per ringetje en met op tijd onderhoud. Lees ook <a href="/gidsen/zijn-extensions-slecht-voor-je-haar">zijn extensions slecht voor je haar?</a></p>' },
      { q: 'Voel je de ringetjes?', a: '<p>De eerste dagen wel een beetje, vooral bij het slapen. Daarna merken de meeste mensen er weinig van.</p>' },
      { q: 'Kan ik de strengen hergebruiken?', a: `<p>Vaak wel, bij onderhoud. ${C('CHECK: hoe vaak en hoe lang bij Quinty')}</p>` },
      { q: 'Wat is het verschil met keratine?', a: '<p>Keratine gebruikt een bonding met warmte; microrings een ringetje zonder warmte. Bondings zijn vaak iets kleiner, ringetjes zijn makkelijker te hergebruiken.</p>' },
    ],
    related: ['keratine', 'tape'], guides: [{ href: '/gidsen/zijn-extensions-slecht-voor-je-haar', label: 'Zijn extensions slecht voor je haar?' }],
  },
  clipin: {
    title: 'Clip-in extensions Leeuwarden | Tijdelijk volume | By Lado',
    description: 'Clip-in extensions in Leeuwarden: in kleur gematcht en op maat geknipt, voor een dag, een feest of je bruiloft. Je doet ze zelf in en uit.',
    h1: 'Clip-in extensions in Leeuwarden',
    lead: 'Banen met kleine clipjes die je zelf in- en uitdoet. Voor een feest, een shoot, je bruiloft, of om te ervaren hoe meer haar je staat, zonder vaste afspraak.',
    what: `<p>Clip-in extensions zijn banen haar met kleine clipjes. Je zet ze zelf in, tegen een getoupeerd plukje van je eigen haar, en haalt ze er aan het eind van de dag weer uit. Er is geen plaatsing of onderhoud nodig.</p>
<p>Het verschil tussen clip-ins die opvallen en clip-ins die wegvallen zit in de kleur en de afwerking. Daarom match ik de kleur op jouw haar en knip ik ze in, zodat de lengtes overlopen in je eigen haar. ${C('CHECK: verkoopt Quinty clip-ins (shop) of alleen op maat via consult?')}</p>`,
    forWho: {
      yes: ['Je wilt extensions voor één dag of een event', 'Je wilt eerst ervaren hoe meer lengte of volume je staat', 'Je wilt geen onderhoudsafspraken'],
      no: ['Je wilt elke dag extensions zonder ze zelf in te zetten', 'Je hebt heel kort haar waarin de clips niet goed verborgen kunnen worden'],
    },
    steps: [
      { title: 'Consult & kleur', text: 'Kleur, lengte en hoeveel banen je nodig hebt.' },
      { title: 'Op maat maken', text: 'De set wordt in jouw kleur(en) samengesteld.' },
      { title: 'Inknippen', text: 'De clip-ins worden ingeknipt in je eigen haar.' },
      { title: 'Uitleg', text: 'Ik laat zien hoe je ze zelf snel en onzichtbaar inzet.' },
    ],
    care: `<p>Bewaar je clip-ins plat of opgehangen, borstel ze voor gebruik en was ze alleen als het nodig is. Gebruik een hittebeschermer als je ze krult of stijlt. Met goede verzorging gaan ze ${C('X')} mee.</p>`,
    included: ['Kleuradvies', 'Set op maat', 'Inknippen', 'Uitleg hoe je ze inzet'],
    faq: [
      { q: 'Kan ik clip-ins voor mijn bruiloft gebruiken?', a: '<p>Ja. Neem ze mee naar je proefsessie, zodat je bruidskapsel erop wordt afgestemd. Zie <a href="/extensions-bruiloft">extensions voor je bruiloft</a>.</p>' },
      { q: 'Kan ik clip-ins zelf inzetten?', a: '<p>Ja, ik laat zien hoe. Na een paar keer oefenen gaat het snel.</p>' },
      { q: 'Kan ik met clip-ins slapen?', a: '<p>Liever niet. Haal ze ’s avonds uit; dat is beter voor je eigen haar en voor de clip-ins.</p>' },
      { q: 'Zijn clip-ins zichtbaar?', a: '<p>Bij een goede kleurmatch en als ze zijn ingeknipt meestal niet. Bij heel kort of dun haar kunnen de clips lastiger te verbergen zijn.</p>' },
    ],
    related: ['tape', 'keratine'], guides: [{ href: '/gidsen/extensions-voor-je-bruiloft', label: 'Extensions voor je bruiloft' }],
  },
};
