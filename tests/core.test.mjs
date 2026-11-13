import test from 'node:test';
import assert from 'node:assert/strict';
import { withBase, routePath, canonicalUrl } from '../src/lib/urls.ts';
import { formatEventDate, formatEventSchedule } from '../src/lib/dates.ts';
import { youtubeEmbedUrl } from '../src/lib/youtube.ts';
import { serializeJsonLd, structuredData } from '../src/lib/seo.ts';
import { contentPath, languageFromPath, languageRoute } from '../src/lib/i18n.ts';
import { expandRecurringEvents } from '../src/lib/event-recurrence.ts';

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

test('language routes keep the same page, query and fragment across DE and EN', () => {
  assert.equal(languageFromPath('/klangfonia.de/en/live/', '/klangfonia.de/'), 'en');
  assert.equal(languageFromPath('/klangfonia.de/live/', '/klangfonia.de/'), 'de');
  assert.equal(contentPath('/klangfonia.de/en/kontakt/?interesse=live', '/klangfonia.de/'), '/kontakt');
  assert.equal(languageRoute('/kontakt?interesse=live#formular', 'en'), '/en/kontakt?interesse=live#formular');
  assert.equal(languageRoute('/en/workshops', 'de'), '/workshops');
  assert.equal(languageRoute('/termine', 'en'), '/en/termine');
  assert.equal(languageRoute('/', 'en'), '/en');
});

test('event dates use Berlin time, including DST and a range crossing midnight', () => {
  assert.equal(formatEventDate('2026-07-01T17:00:00Z'), '1. Juli 2026 · 19:00 Uhr');
  assert.equal(formatEventDate('2026-01-01T17:00:00Z', '2026-01-01T19:00:00Z'), '1. Januar 2026 · 18:00–20:00 Uhr');
  const midnight = formatEventDate('2026-07-01T21:30:00Z', '2026-07-01T22:30:00Z');
  assert.match(midnight, /1\. Juli 2026/);
  assert.match(midnight, /2\. Juli 2026/);
  assert.match(midnight, /23:30/);
  assert.match(midnight, /00:30/);
  assert.equal(formatEventDate('2026-11-14T18:00:00Z', undefined, 'en'), '14 November 2026 · 19:00');
  assert.equal(formatEventSchedule(undefined, undefined, '2027 in Planung'), '2027 in Planung');
  assert.equal(formatEventSchedule(undefined, undefined, undefined, 'en'), 'Date to be announced');
});

test('recurring events keep Berlin wall-clock time and calendar day across DST', () => {
  const event = {
    title: 'Monatlicher Klangabend',
    date: '2027-01-31T18:00:00.000Z',
    endDate: '2027-01-31T19:30:00.000Z',
    recurrence: 'monthly',
    location: 'Berlin',
    description: 'Test',
  };
  const occurrences = expandRecurringEvents([event], new Date('2027-01-01T00:00:00.000Z'), 3);
  assert.deepEqual(occurrences.map((item) => item.date), [
    '2027-01-31T18:00:00.000Z',
    '2027-02-28T18:00:00.000Z',
    '2027-03-31T17:00:00.000Z',
  ]);
  assert.equal(formatEventDate(occurrences[2].date), '31. März 2027 · 19:00 Uhr');
  assert.equal(new Date(occurrences[2].endDate).getTime() - new Date(occurrences[2].date).getTime(), 90 * 60 * 1000);
});

test('recurring events respect their optional final date', () => {
  const occurrences = expandRecurringEvents([{
    title: 'Wöchentlicher Termin', date: '2027-01-04T18:00:00.000Z', recurrence: 'weekly', repeatUntil: '2027-01-18', location: 'Berlin', description: 'Test',
  }], new Date('2027-01-01T00:00:00.000Z'));
  assert.equal(occurrences.length, 3);
  assert.equal(occurrences[2].date, '2027-01-18T18:00:00.000Z');
});

test('recurring events use the occurrence count configured in Sanity', () => {
  const occurrences = expandRecurringEvents([{
    title: 'Monatlicher Termin',
    date: '2026-12-05T13:30:00.000Z',
    recurrence: 'monthly',
    occurrenceCount: 2,
    location: 'Berlin',
    description: 'Test',
  }], new Date('2026-12-01T00:00:00.000Z'));

  assert.equal(occurrences.length, 2);
  assert.equal(formatEventDate(occurrences[0].date), '5. Dezember 2026 · 14:30 Uhr');
  assert.equal(formatEventDate(occurrences[1].date), '5. Januar 2027 · 14:30 Uhr');
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
  assert.equal(person.workLocation.name, 'Berlin');
  assert.equal(person.workLocation.address.addressLocality, 'Berlin');
  assert.equal(profile.mainEntity['@id'], person['@id']);
  assert.equal(data['@graph'].find(item => item['@type'] === 'BreadcrumbList').itemListElement[1].item, 'https://example.org/ueber-daniela/');
});
