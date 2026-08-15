import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://klangfonie.de',
  output: 'static',
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-03-01',
      useCdn: false,
      studioBasePath: '/studio',
      studioRouterHistory: 'hash',
    }),
    react(),
    sitemap({
      filter: (page) => !['/studio/', '/impressum/', '/datenschutz/'].some((path) => page.endsWith(path)),
    }),
  ],
});
