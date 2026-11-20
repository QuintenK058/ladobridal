import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = () => {
  const body = SITE.launched
    ? `User-agent: *\nAllow: /\nDisallow: /bedankt\nDisallow: /en/thank-you\nDisallow: /styleguide\n\nSitemap: ${SITE.url}/sitemap.xml\n`
    : `# Pre-launch: not indexed yet (set SITE.launched = true in src/data/site.ts)\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
