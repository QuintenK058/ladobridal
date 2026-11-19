// Renders the downloadable guide (dist/downloads/extensions-gids.html) to public/ + dist/ PDF. Run after `astro build`.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { createServer } from 'node:http';
import { readFile, copyFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
const DIST = 'dist', OUT = 'public/downloads/by-lado-extensions-gids.pdf';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const srv = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const b = await readFile(join(DIST, p)); res.writeHead(200, { 'Content-Type': types[extname(p)] ?? 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = srv.address().port;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/downloads/extensions-gids.html`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await mkdir('public/downloads', { recursive: true }); await mkdir(join(DIST, 'downloads'), { recursive: true });
await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
await copyFile(OUT, join(DIST, 'downloads/by-lado-extensions-gids.pdf'));
await browser.close(); srv.close();
console.log('PDF:', OUT);
