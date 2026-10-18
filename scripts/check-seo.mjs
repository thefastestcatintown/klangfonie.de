import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { pageMetadata, pageMetadataEn } from '../src/lib/seo.ts';

const output = process.argv[2] ?? 'dist';
const read = path => readFileSync(`${output}/${path}`, 'utf8');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '');
const textContent = value => decode(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const meta = (html, name) => {
  const tag = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'name') === name || attribute(tag, 'property') === name);
  return tag ? attribute(tag, 'content') : '';
};
const sitemap = new Set([...read('sitemap-0.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1])));
const titles = new Set();
const descriptions = new Set();
const pages = new Map();
let home;
const metadataRoutes = [
  ...Object.keys(pageMetadata),
  ...Object.keys(pageMetadataEn).map(route => route === '/' ? '/en' : `/en${route}`),
];
for (const route of metadataRoutes) {
  const html = read(route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  pages.set(route, html);
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
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map(match => ({ level: Number(match[1]), text: textContent(match[2]) }));
  assert.equal(headings.filter(heading => heading.level === 1).length, 1, `${route}: exactly one h1`);
  assert.equal(headings[0]?.level, 1, `${route}: heading structure starts with h1`);
  headings.forEach((heading, index) => {
    assert.ok(heading.text.length > 2, `${route}: headings have meaningful text`);
    if (index > 0) assert.ok(heading.level <= headings[index - 1].level + 1, `${route}: heading levels do not skip`);
  });

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  for (const image of images) {
    assert.match(image, /\balt(?:="[^"]*")?(?=\s|>)/, `${route}: every image has an alt attribute`);
    const alt = attribute(image, 'alt');
    assert.ok(alt.length < 180, `${route}: image alt text is concise`);
    assert.ok(!/\b(?:DSC|IMG|image|photo)[-_ ]?\d+\b/i.test(alt), `${route}: image alt text is descriptive`);
  }
  assert.ok(/Berlin|Neukölln/.test(title + description + html), `${route}: local relevance`);
  const ld = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(ld, `${route}: JSON-LD`);
  const graph = JSON.parse(ld[1])['@graph'];
  assert.ok(graph.some(item => item.url === canonical && ['WebPage', 'ProfilePage'].includes(item['@type'])));
}

const homeUrl = new URL(home);
const basePath = homeUrl.pathname;
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b([^>]*)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g)) {
    const openingTag = `<a${match[1]}href="${match[2]}"${match[3]}>`;
    const inner = match[4];
    const imageAlt = [...inner.matchAll(/<img\b[^>]*alt="([^"]*)"[^>]*>/g)].map(item => decode(item[1])).join(' ');
    const accessibleName = textContent(inner) || attribute(openingTag, 'aria-label') || imageAlt;
    assert.ok(accessibleName, `${route}: every link has an accessible name (${match[2]})`);

    const target = new URL(decode(match[2]), new URL(route === '/' ? home : `${homeUrl.origin}${basePath}${route.slice(1)}/`));
    if (target.origin !== homeUrl.origin || !target.pathname.startsWith(basePath)) continue;
    const relativePath = target.pathname.slice(basePath.length).replace(/^\/+|\/+$/g, '');
    const outputPath = relativePath ? `${relativePath}/index.html` : 'index.html';
    assert.ok(existsSync(`${output}/${outputPath}`), `${route}: internal link target exists (${match[2]})`);
    if (target.hash) {
      const targetHtml = read(outputPath);
      const id = decodeURIComponent(target.hash.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      assert.match(targetHtml, new RegExp(`\\bid="${id}"`), `${route}: fragment target exists (${match[2]})`);
    }
  }
}
assert.equal(sitemap.size, metadataRoutes.length, 'Only indexable pages belong in sitemap');
for (const path of ['404.html', 'impressum/index.html', 'datenschutz/index.html', 'en/impressum/index.html', 'en/datenschutz/index.html']) {
  assert.ok(meta(read(path), 'robots').includes('noindex'), path);
}
assert.ok(read('robots.txt').includes(`Sitemap: ${home}sitemap-index.xml`));
assert.ok(read('robots.txt').includes(`Disallow: ${new URL(home).pathname}studio/`));
console.log(`SEO checks passed: ${sitemap.size} pages, metadata, headings, image alt text, internal links, canonical/sitemap consistency, JSON-LD, noindex and robots.txt.`);
