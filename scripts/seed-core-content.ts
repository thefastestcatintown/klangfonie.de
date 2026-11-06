import { getCliClient } from 'sanity/cli';
import { fallbackAbout, fallbackHome, fallbackServices, fallbackVideo } from '../src/lib/fallbacks';

const client = getCliClient({ apiVersion: '2026-03-01' });

const home = {
  ...fallbackHome,
  _id: 'homePage',
  _type: 'homePage',
  heroHeadlineEn: 'Sound that connects.',
  heroTextEn: 'Discover the handpan, grow together and experience music with Daniela Schneider in Berlin.',
  primaryCtaLabelEn: 'Discover one-to-one guidance',
  secondaryCtaLabelEn: 'Listen to music',
  introHeadlineEn: 'Learn handpan and experience music together',
  introTextEn: 'At Klangfonia, you can find your own personal way into the handpan – whether you are playing for the first time or want to develop your musical ideas further.',
  introText2En: 'Daniela Schneider supports you through one-to-one lessons, workshops and playing together in the Handpan Big Band. You can also book her as a live musician for retreats, concerts and special occasions.',
  testimonialsHeadline: 'Was Teilnehmende sagen',
  testimonialsHeadlineEn: 'What participants say',
  testimonialsText: 'Persönliche Erfahrungen aus Unterricht, Workshops und Retreats.',
  testimonialsTextEn: 'Personal experiences from lessons, workshops and retreats.',
  eventsHeadline: 'Konzerte & Termine',
  eventsHeadlineEn: 'Concerts & events',
};

const serviceEnglish: Record<string, Record<string, string>> = {
  Unterricht: { titleEn: 'One-to-one guidance', shortDescriptionEn: 'Personal guidance for people discovering the instrument or developing their playing.', headlineEn: 'Your own way into the handpan.', ctaLabelEn: 'Enquire about guidance' },
  Yoga: { titleEn: 'Retreats & handpan', shortDescriptionEn: 'Music accompanying movement, breath and stillness without taking centre stage.', headlineEn: 'Live sound for your retreat.', ctaLabelEn: 'Enquire about a retreat' },
  Live: { titleEn: 'Live music', shortDescriptionEn: 'Solo or with other musicians for events, retreats and special moments.', headlineEn: 'Music for special spaces.', ctaLabelEn: 'Enquire about live music' },
};

await client.createIfNotExists(home);
await client.createIfNotExists({ ...fallbackAbout, _id: 'aboutPage', _type: 'aboutPage' });
await client.createIfNotExists({ ...fallbackVideo, _id: 'video-featured', _type: 'video', sortOrder: 10 });

for (const service of fallbackServices) {
  await client.createIfNotExists({
    ...service,
    ...serviceEnglish[service.category],
    _id: `service-${service.slug}`,
    _type: 'service',
    slug: { _type: 'slug', current: service.slug },
  });
}

console.log('Startseite, Über-Daniela, Angebote und Video sind in Sanity angelegt.');
