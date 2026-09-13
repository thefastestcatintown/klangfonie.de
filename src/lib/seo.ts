import type { SiteSettings } from './types';

export const brandName = 'Klangfonia';
export const pageMetadata: Record<string, { title: string; description: string; label: string }> = {
  '/': { title: 'Klangfonia – Handpan, Coaching & Musik | Daniela Schneider', description: 'Handpan entdecken mit Daniela Schneider: persönliche Lernbegleitung, Big Band, Workshops und Live-Musik. Konzerte und Termine bei Klangfonia.', label: 'Startseite' },
  '/unterricht': { title: 'Handpan lernen: Lernbegleitung 1:1 | Klangfonia', description: 'Handpan lernen mit Daniela Schneider: persönliche Lernbegleitung für Anfänger und Fortgeschrittene. Rhythmus, Technik und freies Spiel in deinem Tempo.', label: 'Lernbegleitung 1:1' },
  '/ensemble': { title: 'Big Band – gemeinsam Handpan spielen | Klangfonia', description: 'Gemeinsam Handpan spielen in der Big Band: Patterns entwickeln, Zusammenspiel vertiefen und Bühnenerfahrung sammeln. Schnuppertreffen mit Daniela anfragen.', label: 'Big Band' },
  '/workshops': { title: 'Handpan-Workshops für Einsteiger & Fortgeschrittene | Klangfonia', description: 'Entdecke die Handpan oder vertiefe dein Spiel: Workshops mit Daniela Schneider für Einsteiger und Fortgeschrittene. Technik, Rhythmus und eigener Ausdruck.', label: 'Workshops' },
  '/yoga': { title: 'Handpan für Retreats & Yoga | Klangfonia', description: 'Live-Handpan mit Daniela Schneider für Retreats, Yoga und Meditation. Feinfühlige Musik, abgestimmt auf Bewegung, Atem und stille Momente.', label: 'Retreats' },
  '/live': { title: 'Handpan-Live-Musik mit Daniela Schneider | Klangfonia', description: 'Handpan-Live-Musik für Konzerte, Feiern und besondere Momente. Daniela Schneider spielt solo oder mit weiteren Musiker:innen – passend zu deinem Anlass.', label: 'Musik' },
  '/ueber-daniela': { title: 'Daniela Schneider – Handpan & Lernbegleitung | Klangfonia', description: 'Lerne Daniela Schneider kennen: Handpan-Spielerin, Musikerin und Lernbegleiterin. Erfahre mehr über ihren persönlichen Zugang zu Musik und Begegnung.', label: 'Über mich' },
  '/kontakt': { title: 'Kontakt zu Daniela Schneider | Klangfonia', description: 'Schreib Daniela Schneider: Fragen zu Handpan-Lernbegleitung, Big Band, Workshops, Retreats oder Live-Musik. Nimm Kontakt auf und erzähle von deiner Idee.', label: 'Kontakt' },
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
    { '@type': 'Person', '@id': personId, name: 'Daniela Schneider', url: about, ...(sameAs.length ? { sameAs } : {}) },
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
