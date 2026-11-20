/** General aftercare habits — shared by /nazorg and the downloadable Extensions-gids. */
export const AFTERCARE: [id: string, title: string, text: string][] = [
  ['wassen', 'Wassen', 'Was je haar met je hoofd rechtop of naar achteren (niet voorover), gebruik een milde shampoo en houd conditioner en olie weg van de aanzet.'],
  ['fohnen', 'Föhnen', 'Föhn de aanzet altijd goed droog. Vocht dat bij de bevestigingspunten blijft zitten, zorgt sneller voor klitten.'],
  ['borstelen', 'Borstelen', 'Borstel met een zachte extensionborstel, van de punten naar boven, en houd met je andere hand de aanzet vast.'],
  ['slapen', 'Slapen', 'Slaap nooit met nat haar. Doe je haar in een losse vlecht of lage staart; een zijden kussensloop helpt tegen klitten.'],
  ['sporten', 'Sporten & zwemmen', 'Draag je haar in een vlecht, spoel chloor en zout direct uit en verzorg daarna extra.'],
  ['zon', 'Zon', 'Bescherm je lengtes tegen veel zon; uitgedroogd haar verliest sneller glans.'],
  ['hitte', 'Stijltang & krultang', 'Gebruik altijd een hittebeschermer en houd hete tangen weg van de bevestigingspunten.'],
  ['producten', 'Producten', 'Gebruik producten zonder zware oliën of siliconen bij de aanzet.'],
];
/** Strip sentences that still contain an unconfirmed placeholder (for client-facing print/PDF). */
export const confirmedOnly = (html: string) =>
  html.replace(/<[^>]+>/g, (t) => (t.includes('class="ph"') ? '\u0000' : t)).split(/(?<=[.!?])\s+/)
    .filter((s) => !s.includes('\u0000')).join(' ').replace(/<\/?(p|strong|a)[^>]*>/g, '').replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
export const GUIDE_PDF = '/downloads/by-lado-extensions-gids.pdf';
