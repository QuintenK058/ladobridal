// Generates a typographic 1200×630 OG image per route into public/og/ (run: npm run og, after a build).
// Uses the pre-installed Playwright Chromium. Commit the PNGs; deploys don't need Playwright.
import { readdirSync, readFileSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
mkdirSync('public/og', { recursive: true });
const font = readFileSync('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2').toString('base64');
const fontI = readFileSync('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2').toString('base64');
const jost = readFileSync('node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2').toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const og = html.match(/<meta property="og:image" content="[^"]*\/og\/([^"]+)\.png"/)?.[1];
  const title = (html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || '').replace(/&#39;/g, '’').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s*·\s*By Lado$/, '');
  if (!og || /content="noindex/.test(html)) continue;
  await page.setContent(`<html><head><style>
    @font-face{font-family:C;src:url(data:font/woff2;base64,${font})}@font-face{font-family:C;font-style:italic;src:url(data:font/woff2;base64,${fontI})}
    @font-face{font-family:J;src:url(data:font/woff2;base64,${jost})}
    body{margin:0;width:1200px;height:630px;background:#F7F2EB;color:#1F1814;font-family:C;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box;position:relative}
    .w{font-family:J;letter-spacing:.42em;font-size:22px;font-weight:600}.w small{display:block;font-family:C;font-style:italic;letter-spacing:.02em;font-size:16px;margin-top:6px;color:#6B5F57;font-weight:300}
    h1{font-weight:320;letter-spacing:-.035em;font-size:${title.length > 55 ? 64 : 78}px;line-height:1.04;margin:0;max-width:740px;letter-spacing:-.01em}
    .f{font-family:J;font-size:18px;letter-spacing:.2em;text-transform:uppercase;color:#6B5F57;display:flex;align-items:center;gap:18px}.f:before{content:'';width:48px;height:1px;background:#9C6B45}
    .arch{position:absolute;right:0;top:0;width:330px;height:630px;background:linear-gradient(165deg,#E7D3BC,#C9A27A 60%,#9C6B45)}
  </style></head><body><div class="arch"></div><div class="w">BY LADO<small>hair extensions</small></div><h1>${esc(title)}</h1><div class="f">bylado.nl</div></body></html>`);
  await page.screenshot({ path: `public/og/${og}.png` });
  n++;
}
await browser.close();
console.log(`OG images: ${n}`);
