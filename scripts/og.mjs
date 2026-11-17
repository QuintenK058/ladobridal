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
const fontDir = 'node_modules/@fontsource/cormorant-garamond/files';
const font = readFileSync(join(fontDir, 'cormorant-garamond-latin-300-normal.woff2')).toString('base64');
const fontI = readFileSync(join(fontDir, 'cormorant-garamond-latin-300-italic.woff2')).toString('base64');
const jost = readFileSync('node_modules/@fontsource/jost/files/jost-latin-400-normal.woff2').toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const og = html.match(/<meta property="og:image" content="[^"]*\/og\/([^"]+)\.png"/)?.[1];
  const title = (html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || '').replace(/&#39;/g, '’').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s*·\s*Lado Bridal$/, '');
  if (!og || html.includes('noindex')) continue;
  await page.setContent(`<html><head><style>
    @font-face{font-family:C;src:url(data:font/woff2;base64,${font})}@font-face{font-family:C;font-style:italic;src:url(data:font/woff2;base64,${fontI})}
    @font-face{font-family:J;src:url(data:font/woff2;base64,${jost})}
    body{margin:0;width:1200px;height:630px;background:#FAF7F2;color:#2B2420;font-family:C;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box;position:relative}
    .w{font-family:C;letter-spacing:.32em;font-size:26px;font-weight:300}.w small{display:block;font-family:J;font-size:12px;letter-spacing:.38em;margin-top:8px;color:#6F625A}
    h1{font-weight:300;font-size:${title.length > 55 ? 64 : 78}px;line-height:1.04;margin:0;max-width:900px;letter-spacing:-.01em}
    .f{font-family:J;font-size:18px;letter-spacing:.2em;text-transform:uppercase;color:#6F625A;display:flex;align-items:center;gap:18px}.f:before{content:'';width:48px;height:1px;background:#A8834F}
    .arch{position:absolute;right:80px;top:72px;width:250px;height:330px;border-radius:999px 999px 0 0;background:linear-gradient(160deg,#E9D5CF,#E8D9C5 55%,#DCC9B2)}
  </style></head><body><div class="arch"></div><div class="w">LADO BRIDAL<small>HAIR &amp; MAKE-UP</small></div><h1>${esc(title)}</h1><div class="f">ladobridal.com</div></body></html>`);
  await page.screenshot({ path: `public/og/${og}.png` });
  n++;
}
await browser.close();
console.log(`OG images: ${n}`);
