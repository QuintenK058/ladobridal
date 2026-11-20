import { defineConfig } from 'astro/config';

// Static output: every route is pre-rendered to full HTML (content, meta and JSON-LD in the initial response).
export default defineConfig({
  site: 'https://bylado.nl', // CHECK: final By Lado domain
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
