import type { SiteSettings } from './types';

export const brandName = 'Klangfonia';
export const pageMetadata: Record<string, { title: string; description: string; label: string }> = {
  '/': { title: 'Handpan lernen in Berlin-Neukölln | Klangfonia', description: 'Handpan in Berlin-Neukölln mit Daniela Schneider: persönliche Lernbegleitung, Workshops, Big Band sowie Live-Musik für Yoga und besondere Anlässe.', label: 'Startseite' },
  '/unterricht': { title: 'Handpan-Unterricht in Berlin-Neukölln | Klangfonia', description: 'Handpan lernen in Berlin-Neukölln: persönliche Lernbegleitung mit Daniela Schneider für Anfänger und Fortgeschrittene – in deinem eigenen Tempo.', label: 'Lernbegleitung 1:1' },
  '/ensemble': { title: 'Handpan Big Band in Berlin | Klangfonia', description: 'Gemeinsam Handpan spielen in Berlin: In Danielas Big Band entwickelst du Patterns, Zusammenspiel und Bühnenerfahrung. Unverbindliches Schnuppertreffen anfragen.', label: 'Big Band' },
  '/workshops': { title: 'Handpan-Workshops in Berlin-Neukölln | Klangfonia', description: 'Handpan-Workshops in Berlin-Neukölln für Einsteiger und Fortgeschrittene: Klang, Technik, Rhythmus und eigener musikalischer Ausdruck mit Daniela Schneider.', label: 'Workshops' },
  '/yoga': { title: 'Live-Handpan für Yoga & Retreats in Berlin | Klangfonia', description: 'Live-Handpan mit Daniela Schneider aus Berlin für Yoga, Retreats und Meditation – feinfühlige Musik für Bewegung, Atem und stille Momente.', label: 'Retreats' },
  '/live': { title: 'Handpan-Live-Musik in Berlin | Daniela Schneider', description: 'Handpan-Live-Musik aus Berlin für Konzerte, Feiern und besondere Momente. Daniela Schneider spielt solo oder mit weiteren Musiker:innen – passend zum Anlass.', label: 'Musik' },
  '/ueber-daniela': { title: 'Daniela Schneider – Handpan-Musikerin aus Berlin | Klangfonia', description: 'Daniela Schneider ist Handpan-Musikerin und Lernbegleiterin in Berlin-Neukölln. Erfahre mehr über ihren persönlichen Zugang zu Musik und Begegnung.', label: 'Über mich' },
  '/kontakt': { title: 'Handpan in Berlin-Neukölln anfragen | Klangfonia', description: 'Kontaktiere Daniela Schneider in Berlin-Neukölln zu Handpan-Unterricht, Big Band, Workshops, Yoga-Begleitung oder Live-Musik und erzähle von deiner Idee.', label: 'Kontakt' },
};

export function serializeJsonLd(value: unknown): string {
  // CMS values must not be able to close the script element.
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function structuredData(input: {
  canonical: string; home: string; about: string; image: string;
  title: string; description: string; route: string; settings: SiteSettings;
}) {
  const { canonical, home, about, image, title, description, route, settings } = input;
  const personId = `${about}#person`;
  const websiteId = `${home}#website`;
  const sameAs = [settings.instagram, settings.youtube].filter((value): value is string => {
    if (!value) return false;
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  });
  const graph: Record<string, unknown>[] = [
    { '@type': 'WebSite', '@id': websiteId, url: home, name: brandName, inLanguage: 'de-DE', creator: { '@id': personId } },
    {
      '@type': 'Person', '@id': personId, name: 'Daniela Schneider', url: about,
      jobTitle: 'Handpan-Musikerin und Lernbegleiterin',
      knowsAbout: ['Handpan', 'Handpan-Unterricht', 'Handpan-Workshops', 'Live-Musik'],
      workLocation: {
        '@type': 'Place', name: 'Berlin-Neukölln',
        address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressRegion: 'Berlin', addressCountry: 'DE' },
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': route === '/ueber-daniela' ? 'ProfilePage' : 'WebPage', '@id': `${canonical}#webpage`,
      url: canonical, name: title, description, inLanguage: 'de-DE', isPartOf: { '@id': websiteId },
      about: { '@id': personId }, ...(route === '/ueber-daniela' ? { mainEntity: { '@id': personId } } : {}),
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(route !== '/' ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    },
  ];
  if (route !== '/') graph.push({
    '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: home },
      { '@type': 'ListItem', position: 2, name: pageMetadata[route]?.label ?? title, item: canonical },
    ],
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
