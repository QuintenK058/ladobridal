// QA pass over dist/: H1s, titles/descriptions, canonical/hreflang, internal links, JSON-LD, leaks, placeholders.
import { readdirSync, readFileSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
const routeOf = (f) => { let r = '/' + f.replace(/^dist\//, '').replace(/\.html$/, '').replace(/(^|\/)index$/, ''); return r.replace(/\/$/, '') || '/'; };
const routes = new Set(files.map(routeOf));
const issues = []; const titles = {}; const descs = {}; const placeholders = []; const hreflang = {};
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
for (const f of files) {
  const route = routeOf(f); if (route === '/404') continue;
  const html = readFileSync(f, 'utf8'); const body = strip(html);
  const noindex = html.includes('content="noindex');
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) issues.push(`${route}: ${h1} H1s`);
  const title = dec(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''); const desc = dec(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!noindex) {
    (titles[title] ||= []).push(route); (descs[desc] ||= []).push(route);
    if (title.length > 65) issues.push(`${route}: title ${title.length} chars`);
    if (desc.length > 160) issues.push(`${route}: description ${desc.length} chars`);
    if (!html.includes('rel="canonical"')) issues.push(`${route}: no canonical`);
  }
  const alts = [...html.matchAll(/hreflang="(nl-NL|en)" href="https:\/\/ladobridal\.com([^"]*)"/g)].map((m) => [m[1], m[2] || '/']);
  hreflang[route] = alts;
  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) {
    if (m[1].startsWith('/_astro/')) continue;
    const t = m[1].replace(/\/$/, '') || '/';
    if (/\.(png|svg|xml|txt|webp|avif|jpg)$/.test(t)) { if (!existsSync(join('public', t)) && !existsSync(join('dist', t))) issues.push(`${route}: missing asset ${t}`); continue; }
    if (!routes.has(t)) issues.push(`${route}: broken link ${t}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { issues.push(`${route}: invalid JSON-LD`); } }
  if (/Waar ik in Buitenland|Bruidsvisagie Buitenland/.test(body)) issues.push(`${route}: leaked template place name`);
  if (route === '/bruidsstylist-groningen' && !html.includes('content="NL-GR"')) issues.push('groningen: wrong geo.region');
  if (route === '/bruidsstylist-friesland' && /<h2[^>]*>[^<]*Bruidskapsel Leeuwarden/.test(body)) issues.push('friesland: cannibalising H2');
  const text = body.replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/\[([A-Z][A-Z0-9 \-·:/.,’'()]{2,}[^\]]{0,160})\]/g)) placeholders.push(`${route}\t${m[1].trim()}`);
  if (!noindex && route.startsWith('/bruidsstylist-')) { const words = text.replace(/\s+/g, ' ').split(' ').length; issues.push(`INFO ${route}: ~${words} words on page (incl. nav/footer)`); }
}
for (const [t, r] of Object.entries(titles)) if (r.length > 1) issues.push(`duplicate title "${t}": ${r.join(', ')}`);
for (const [d, r] of Object.entries(descs)) if (r.length > 1) issues.push(`duplicate description: ${r.join(', ')}`);
for (const [route, alts] of Object.entries(hreflang)) for (const [, target] of alts) {
  if (target === route) continue;
  const back = hreflang[target]; if (!back || !back.some(([, t]) => t === route)) issues.push(`hreflang not reciprocal: ${route} → ${target}`);
}
const uniq = [...new Set(placeholders)];
writeFileSync('QA-PLACEHOLDERS.tsv', 'route\tplaceholder\n' + uniq.join('\n') + '\n');
const real = issues.filter((i) => !i.startsWith('INFO'));
console.log(issues.join('\n') || 'no issues');
console.log(`\n${files.length} pages · ${real.length} issues · ${uniq.length} placeholder occurrences → QA-PLACEHOLDERS.tsv`);
