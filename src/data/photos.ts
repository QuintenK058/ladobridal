/**
 * Quinty’s own photos (imported from the previous ladobridal.com). Alt texts describe only what is visible —
 * no locations or claims that aren’t known. Files: public/img/<name>-800|1600.avif|webp.
 */
export const PHOTO = {
  toost: { src: '/img/bruidspaar-toost-opgestoken-bruidskapsel', alt: 'Bruid en bruidegom proosten; bruid met opgestoken bruidskapsel en haaraccessoire' },
  kapel: { src: '/img/bruidspaar-kapel-raamlicht', alt: 'Bruidspaar in een kapel met strijklicht door een gotisch raam' },
  omhelzing: { src: '/img/bruidspaar-omhelzing-opsteek-parels', alt: 'Bruidspaar in een omhelzing; romantische opsteek met parels in het haar' },
  quinty: { src: '/img/quinty-kant-portret', alt: 'Portret van Quinty Kant, bruidsstylist en make-up artist' },
  tafel: { src: '/img/bruid-aan-tafel-opsteek-parels', alt: 'Bruid aan de feesttafel met een zachte opsteek met parels' },
  lageStaart: { src: '/img/lage-staart-bruidskapsel', alt: 'Strakke lage staart als bruidskapsel, van achteren gezien' },
  kapelOmhelzing: { src: '/img/bruidspaar-kapel-omhelzing', alt: 'Bruidspaar omhelst elkaar in een lichte kapel; opgestoken bruidskapsel' },
  sluier: { src: '/img/bruidsmake-up-sluier-soft-glam', alt: 'Bruid met sluier, soft glam bruidsmake-up en lang donker haar in golven' },
  krullen: { src: '/img/bruidskapsel-krullen-zetten', alt: 'Quinty zet krullen voor een bruidskapsel' },
  lageKnot: { src: '/img/lage-knot-losse-lokken', alt: 'Lage, losse knot met losse lokken op donker haar' },
  halfLos: { src: '/img/half-los-hollywood-golven', alt: 'Half-los bruidskapsel met lange golven en highlights' },
  hogeKnot: { src: '/img/hoge-knot-volume', alt: 'Hoge knot met volume en losse plukjes' },
  golven: { src: '/img/hollywood-golven-donker-haar', alt: 'Glanzende Hollywood-golven op donker haar' },
  gevlochten: { src: '/img/bruid-kapel-gevlochten-opsteek', alt: 'Bruid en bruidegom lopen door een kapel; bruid met gevlochten opsteek en bloemen' },
  blondeKrullen: { src: '/img/half-los-blonde-krullen', alt: 'Half-los bruidskapsel met volle blonde krullen' },
  aanHetWerk: { src: '/img/quinty-aan-het-werk-zwart-wit', alt: 'Quinty aan het werk aan een bruidskapsel, zwart-wit' },
  wenkbrauwen: { src: '/img/bruidsmake-up-wenkbrauwen', alt: 'Quinty werkt de wenkbrauwen bij tijdens het aanbrengen van bruidsmake-up' },
  oogschaduw: { src: '/img/soft-glam-oogschaduw', alt: 'Soft glam make-up: oogschaduw wordt aangebracht' },
} as const;
export type PhotoKey = keyof typeof PHOTO;
