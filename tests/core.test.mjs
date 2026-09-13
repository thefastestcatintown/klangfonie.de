import test from 'node:test';
import assert from 'node:assert/strict';
import { withBase, routePath, canonicalUrl } from '../src/lib/urls.ts';
import { formatEventDate } from '../src/lib/dates.ts';
import { youtubeEmbedUrl } from '../src/lib/youtube.ts';
import { serializeJsonLd, structuredData } from '../src/lib/seo.ts';

test('deployment URLs preserve queries, fragments and files without duplicating base paths', () => {
  assert.equal(withBase('/unterricht', '/'), '/unterricht/');
  assert.equal(withBase('/kontakt?interesse=ensemble#formular', '/vorschau/'), '/vorschau/kontakt/?interesse=ensemble#formular');
  assert.equal(withBase('/vorschau/unterricht/', '/vorschau/'), '/vorschau/unterricht/');
  assert.equal(withBase('/vorschau', '/vorschau/'), '/vorschau/');
  assert.equal(withBase('/_astro/image.webp?w=400', '/vorschau/'), '/vorschau/_astro/image.webp?w=400');
  assert.equal(withBase('/robots.txt', '/'), '/robots.txt');
  assert.equal(withBase('#musik', '/vorschau/'), '#musik');
  assert.equal(withBase('https://example.org/event', '/vorschau/'), 'https://example.org/event');
  assert.equal(withBase('//cdn.example.org/img.png', '/vorschau/'), '//cdn.example.org/img.png');
  assert.equal(routePath('/vorschau/ensemble/?x=1', '/vorschau/'), '/ensemble');
  assert.equal(canonicalUrl('/vorschau/kontakt?interesse=ensemble#form', 'https://example.org', '/vorschau/'), 'https://example.org/vorschau/kontakt/');
});

test('event dates use Berlin time, including DST and a range crossing midnight', () => {
  assert.equal(formatEventDate('2026-07-01T17:00:00Z'), '1. Juli 2026 · 19:00 Uhr');
  assert.equal(formatEventDate('2026-01-01T17:00:00Z', '2026-01-01T19:00:00Z'), '1. Januar 2026 · 18:00–20:00 Uhr');
  const midnight = formatEventDate('2026-07-01T21:30:00Z', '2026-07-01T22:30:00Z');
  assert.match(midnight, /1\. Juli 2026/);
  assert.match(midnight, /2\. Juli 2026/);
  assert.match(midnight, /23:30/);
  assert.match(midnight, /00:30/);
});

test('YouTube accepts supported video URLs, rejects lookalike hosts and malformed IDs', () => {
  const id = 'dQw4w9WgXcQ';
  for (const url of [`https://youtu.be/${id}`, `https://www.youtube.com/watch?v=${id}&t=2`, `https://youtube.com/shorts/${id}`, `https://www.youtube-nocookie.com/embed/${id}`]) {
    assert.equal(youtubeEmbedUrl(url), `https://www.youtube-nocookie.com/embed/${id}?rel=0`);
  }
  for (const url of ['https://not-youtu.be/dQw4w9WgXcQ', 'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'https://youtube.com/@channel', 'https://youtu.be/abc', 'not a url', undefined]) {
    assert.equal(youtubeEmbedUrl(url), undefined);
  }
});

test('JSON-LD safely serializes CMS strings and links the profile to the same person', () => {
  const data = structuredData({
    canonical: 'https://example.org/ueber-daniela/', home: 'https://example.org/', about: 'https://example.org/ueber-daniela/',
    image: 'https://example.org/portrait.webp', title: 'Daniela', description: '</script><script>alert(1)</script>', route: '/ueber-daniela',
    settings: { siteTitle: 'Klangfonia', defaultSeoTitle: '', defaultSeoDescription: '', email: '', instagram: 'javascript:alert(1)', youtube: 'https://youtube.com/@daniela' },
  });
  const serialized = serializeJsonLd(data);
  assert.equal(serialized.includes('</script>'), false);
  assert.deepEqual(JSON.parse(serialized), data);
  const person = data['@graph'].find(item => item['@type'] === 'Person');
  const profile = data['@graph'].find(item => item['@type'] === 'ProfilePage');
  assert.deepEqual(person.sameAs, ['https://youtube.com/@daniela']);
  assert.equal(profile.mainEntity['@id'], person['@id']);
  assert.equal(data['@graph'].find(item => item['@type'] === 'BreadcrumbList').itemListElement[1].item, 'https://example.org/ueber-daniela/');
});
