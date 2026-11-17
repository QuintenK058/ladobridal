import { defineConfig } from 'astro/config';

// Static output: every route is pre-rendered to full HTML (content, meta and JSON-LD in the initial response).
export default defineConfig({
  site: 'https://ladobridal.com',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
