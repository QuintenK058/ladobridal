// Generates abstract, decorative hair-strand illustrations (SVG) into public/art/.
// Not photos and never used as proof (before/after, results, portraits stay real-photo placeholders).
import { mkdirSync, writeFileSync } from 'node:fs';

const PALETTES = {
  blond: ['#F1E2C4', '#E3C99A', '#D2B080', '#BF975F', '#A97F4B'],
  honing: ['#EAD3B0', '#D8B282', '#C9A27A', '#B08458', '#946A42'],
  karamel: ['#D9B48A', '#C29266', '#A97849', '#8E5F38', '#6F4729'],
  bruin: ['#B8906A', '#99704C', '#7D5839', '#5F412A', '#46301F'],
  donker: ['#6B4E3D', '#523A2D', '#3D2B21', '#2C1F18', '#1E1511'],
  rood: ['#C98A5E', '#B06A40', '#94522F', '#7A4024', '#5E301B'],
};
const BG = { blond: ['#F7F2EB', '#EFE3D0'], honing: ['#F4ECE1', '#E7D3BC'], karamel: ['#EFE3D4', '#DCC3A6'], bruin: ['#EDE5DA', '#D8C4AE'], donker: ['#E6DACB', '#C9B39C'], rood: ['#F1E4D8', '#E0C3AA'] };

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

function art({ name, palette, seed, w = 800, h = 1000, strands = 26, sway = 0.22, flow = 'down', bunch = 0.5 }) {
  const r = rng(seed); const pal = PALETTES[palette]; const [bg1, bg2] = BG[palette];
  const body = [], hairs = [];
  // a "lock" = a soft broad base stroke + many thin, near-parallel hairs sharing its curve
  const locks = Math.max(6, Math.round(strands / 3));
  for (let i = 0; i < locks; i++) {
    const t = locks === 1 ? 0.5 : i / (locks - 1);
    const x0 = w * (0.5 + (t - 0.5) * (1.45 - bunch * 0.8)) + (r() - 0.5) * 50;
    const x3 = x0 + (r() - 0.5) * w * sway * 2 + (flow === 'swirl' ? Math.sin(t * 3.1 + seed) * w * 0.22 : 0);
    const c1x = x0 + (r() - 0.5) * w * sway * 3, c1y = h * (0.22 + r() * 0.16);
    const c2x = x3 + (r() - 0.5) * w * sway * 3, c2y = h * (0.58 + r() * 0.22);
    const base = pal[Math.floor(r() * pal.length)];
    const width = 30 + r() * 70;
    const d = (dx, k = 1) => `M${(x0 + dx).toFixed(1)} -40 C${(c1x + dx * k).toFixed(1)} ${c1y.toFixed(1)} ${(c2x + dx * k).toFixed(1)} ${c2y.toFixed(1)} ${(x3 + dx).toFixed(1)} ${h + 60}`;
    body.push(`<path d="${d(0)}" stroke="${base}" stroke-width="${width.toFixed(0)}" stroke-opacity="0.22" fill="none" stroke-linecap="round"/>`);
    const n = 9 + Math.floor(r() * 9);
    for (let j = 0; j < n; j++) {
      const dx = (j / (n - 1) - 0.5) * width * 0.9 + (r() - 0.5) * 6;
      const col = r() > 0.82 ? '#FFF6E8' : pal[Math.floor(r() * pal.length)];
      hairs.push(`<path d="${d(dx, 0.9 + r() * 0.2)}" stroke="${col}" stroke-width="${(0.5 + r() * 1.8).toFixed(2)}" stroke-opacity="${(0.35 + r() * 0.5).toFixed(2)}" fill="none"/>`);
    }
  }
  const paths = [...body, ...hairs];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/>${paths.join('')}</svg>`;
  writeFileSync(`public/art/${name}.svg`, svg);
}

mkdirSync('public/art', { recursive: true });
const list = [
  // methods
  { name: 'tape', palette: 'honing', seed: 11, strands: 30, sway: 0.12, bunch: 0.2 },
  { name: 'keratine', palette: 'karamel', seed: 23, strands: 34, sway: 0.2 },
  { name: 'weft', palette: 'bruin', seed: 37, strands: 40, sway: 0.1, bunch: 0.1 },
  { name: 'microring', palette: 'donker', seed: 41, strands: 28, sway: 0.25 },
  { name: 'clipin', palette: 'blond', seed: 53, strands: 26, sway: 0.3, flow: 'swirl' },
  // shades
  { name: 'blond', palette: 'blond', seed: 61 }, { name: 'bruin', palette: 'bruin', seed: 67 }, { name: 'donker', palette: 'donker', seed: 71 }, { name: 'rood', palette: 'rood', seed: 79 },
  // moods
  { name: 'lengte', palette: 'honing', seed: 83, strands: 22, sway: 0.08, bunch: 0.7, h: 1600 },
  { name: 'volume', palette: 'karamel', seed: 89, strands: 46, sway: 0.32, bunch: 0 },
  { name: 'beide', palette: 'bruin', seed: 97, strands: 36, sway: 0.2, flow: 'swirl' },
  { name: 'tijdelijk', palette: 'blond', seed: 101, strands: 18, sway: 0.35, flow: 'swirl' },
  { name: 'fijn', palette: 'blond', seed: 103, strands: 18, sway: 0.15 },
  { name: 'normaal', palette: 'honing', seed: 107, strands: 30, sway: 0.18 },
  { name: 'dik', palette: 'donker', seed: 109, strands: 50, sway: 0.18, bunch: 0 },
  { name: 'kort', palette: 'karamel', seed: 113, strands: 26, sway: 0.4, flow: 'swirl', h: 700 },
  { name: 'schouder', palette: 'honing', seed: 127, strands: 28, sway: 0.2 },
  { name: 'lang', palette: 'bruin', seed: 131, strands: 26, sway: 0.1, h: 1600 },
  { name: 'sport', palette: 'karamel', seed: 137, strands: 30, sway: 0.3, flow: 'swirl' },
  { name: 'weinig-tijd', palette: 'honing', seed: 139, strands: 30, sway: 0.08, bunch: 0.3 },
  { name: 'zelf-stylen', palette: 'rood', seed: 149, strands: 30, sway: 0.34, flow: 'swirl' },
  { name: 'nee', palette: 'blond', seed: 151 }, { name: 'tevreden', palette: 'honing', seed: 157 }, { name: 'niet-tevreden', palette: 'bruin', seed: 163 },
  // editorial
  { name: 'kleurmatch', palette: 'karamel', seed: 167, strands: 44, sway: 0.15, bunch: 0.1 },
  { name: 'eigen-haar', palette: 'bruin', seed: 173, strands: 24, sway: 0.12 },
  { name: 'eerlijk', palette: 'honing', seed: 179, strands: 30, sway: 0.25, flow: 'swirl' },
  { name: 'hero', palette: 'honing', seed: 181, strands: 52, sway: 0.24, flow: 'swirl', bunch: 0.2 },
];
list.forEach(art);
console.log(`art: ${list.length} SVGs`);
