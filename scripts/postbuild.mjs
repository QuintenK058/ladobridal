// Post-build: sitemap.xml from the generated HTML (indexable pages only, with hreflang alternates + lastmod).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const DIST = 'dist';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(DIST);
const today = new Date().toISOString().slice(0, 10);
const entries = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) continue;
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({ lang: m[1], href: m[2] }));
  entries.push({ canonical, alts });
}
entries.sort((a, b) => a.canonical.localeCompare(b.canonical));
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map((e) => `  <url>
    <loc>${e.canonical}</loc>
    <lastmod>${today}</lastmod>
${e.alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${entries.length} URLs`);
