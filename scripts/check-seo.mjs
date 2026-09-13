import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageMetadata } from '../src/lib/seo.ts';

const output = process.argv[2] ?? 'dist';
const read = path => readFileSync(`${output}/${path}`, 'utf8');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '');
const meta = (html, name) => {
  const tag = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'name') === name || attribute(tag, 'property') === name);
  return tag ? attribute(tag, 'content') : '';
};
const sitemap = new Set([...read('sitemap-0.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1])));
const titles = new Set();
const descriptions = new Set();
let home;
for (const route of Object.keys(pageMetadata)) {
  const html = read(route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const description = meta(html, 'description');
  assert.ok(title.length > 10 && title.length < 90, `${route}: meaningful title`);
  assert.ok(description.length > 60 && description.length < 180, `${route}: concise description`);
  assert.ok(!titles.has(title), `${route}: unique title`); titles.add(title);
  assert.ok(!descriptions.has(description), `${route}: unique description`); descriptions.add(description);
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonicals.length, 1);
  const canonical = attribute(canonicals[0][0], 'href');
  const url = new URL(canonical);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.search + url.hash, '');
  assert.ok(url.pathname.endsWith('/'));
  assert.ok(sitemap.has(canonical), `${route}: canonical must match sitemap`);
  if (route === '/') home = canonical;
  assert.equal(meta(html, 'og:url'), canonical);
  assert.equal(meta(html, 'og:title'), title);
  assert.equal(meta(html, 'twitter:card'), 'summary_large_image');
  assert.ok(new URL(meta(html, 'og:image')).protocol === 'https:');
  assert.ok(!meta(html, 'robots').includes('noindex'));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  const ld = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(ld, `${route}: JSON-LD`);
  const graph = JSON.parse(ld[1])['@graph'];
  assert.ok(graph.some(item => item.url === canonical && ['WebPage', 'ProfilePage'].includes(item['@type'])));
}
assert.equal(sitemap.size, Object.keys(pageMetadata).length, 'Only indexable pages belong in sitemap');
for (const path of ['404.html', 'impressum/index.html', 'datenschutz/index.html']) {
  assert.ok(meta(read(path), 'robots').includes('noindex'), path);
}
assert.ok(read('robots.txt').includes(`Sitemap: ${home}sitemap-index.xml`));
assert.ok(read('robots.txt').includes(`Disallow: ${new URL(home).pathname}studio/`));
console.log(`SEO checks passed: ${sitemap.size} pages, metadata, canonical/sitemap consistency, JSON-LD, noindex and robots.txt.`);
