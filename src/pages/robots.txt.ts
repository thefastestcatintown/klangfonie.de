import type { APIRoute } from 'astro';
import { withBase } from '../lib/urls';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site ?? 'https://klangfonie.de');
  return new Response(`User-agent: *\nAllow: /\nDisallow: ${withBase('/studio')}\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
