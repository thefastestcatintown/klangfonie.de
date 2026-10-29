import type { SiteSettings } from './types';
import type { Language } from './i18n';

export const brandName = 'Klangfonia';
export const pageMetadata: Record<string, { title: string; description: string; label: string }> = {
  '/': { title: 'Handpan lernen in Berlin | Klangfonia', description: 'Klangfonia mit Daniela Schneider: persönliche Lernbegleitung, Workshops, Big Band sowie Live-Musik für Yoga und besondere Anlässe.', label: 'Startseite' },
  '/unterricht': { title: 'Handpan-Unterricht in Berlin | Klangfonia', description: 'Persönliche Handpan-Lernbegleitung mit Daniela Schneider für Anfänger und Fortgeschrittene – in deinem eigenen Tempo.', label: 'Lernbegleitung 1:1' },
  '/selbsteinschaetzung': { title: 'Handpan-Level einschätzen | Klangfonia', description: 'Finde mit einer kurzen Selbsteinschätzung heraus, wo du beim Handpan-Spiel stehst und was dein nächster Lernschritt sein könnte.', label: 'Level einschätzen' },
  '/ensemble': { title: 'Handpan Big Band in Berlin | Klangfonia', description: 'In Danielas Handpan Big Band entwickelst du Patterns, Zusammenspiel und Bühnenerfahrung. Unverbindliches Schnuppertreffen anfragen.', label: 'Big Band' },
  '/workshops': { title: 'Handpan-Workshops in Berlin | Klangfonia', description: 'Handpan-Workshops für Einsteiger und Fortgeschrittene: Klang, Technik, Rhythmus und eigener musikalischer Ausdruck mit Daniela Schneider.', label: 'Workshops' },
  '/yoga': { title: 'Live-Handpan für Yoga & Retreats in Berlin | Klangfonia', description: 'Live-Handpan mit Daniela Schneider für Yoga, Retreats und Meditation – feinfühlige Musik für Bewegung, Atem und stille Momente.', label: 'Retreats' },
  '/live': { title: 'Handpan-Live-Musik in Berlin | Daniela Schneider', description: 'Handpan-Live-Musik für Konzerte, Feiern und besondere Momente. Daniela Schneider spielt solo oder mit weiteren Musiker:innen – passend zum Anlass.', label: 'Musik' },
  '/ueber-daniela/intention': { title: 'Daniela Schneiders musikalische Intention | Klangfonia', description: 'Daniela Schneider verbindet Handpan-Musik, Rhythmus und Feingefühl zu berührenden Klangerlebnissen und schafft musikalische Verbindung in Berlin.', label: 'Meine Intention' },
  '/ueber-daniela/geschichte': { title: 'Daniela Schneider – musikalischer Weg | Klangfonia', description: 'Erfahre mehr über Daniela Schneiders musikalischen Weg, ihre Ausbildung und ihre langjährige Erfahrung als Percussionistin und Handpan-Musikerin in Berlin.', label: 'Meine Geschichte' },
  '/kontakt': { title: 'Handpan in Berlin anfragen | Klangfonia', description: 'Kontaktiere Daniela Schneider zu Handpan-Unterricht, Big Band, Workshops, Yoga-Begleitung oder Live-Musik und erzähle von deiner Idee.', label: 'Kontakt' },
};

export const pageMetadataEn: Record<string, { title: string; description: string; label: string }> = {
  '/': { title: 'Learn handpan in Berlin | Klangfonia', description: 'Klangfonia with Daniela Schneider: personal handpan guidance, workshops, a big band and live music for retreats and special occasions.', label: 'Home' },
  '/unterricht': { title: 'Handpan lessons in Berlin | Klangfonia', description: 'Personal handpan guidance with Daniela Schneider for beginners and advanced players, at your own pace.', label: 'One-to-one guidance' },
  '/selbsteinschaetzung': { title: 'Assess your handpan level | Klangfonia', description: 'Use a short self-assessment to reflect on your handpan playing and find a possible next step.', label: 'Level self-assessment' },
  '/ensemble': { title: 'Join a Handpan Big Band in Berlin | Klangfonia', description: 'Develop patterns, ensemble playing and stage experience in Daniela’s Handpan Big Band. Ask for a no-obligation trial session.', label: 'Big Band' },
  '/workshops': { title: 'Handpan workshops in Berlin | Klangfonia', description: 'Handpan workshops for beginners and advanced players: sound, technique, rhythm and your own musical expression.', label: 'Workshops' },
  '/yoga': { title: 'Live handpan for retreats in Berlin | Klangfonia', description: 'Live handpan and body percussion with Daniela Schneider for retreats, movement, mindfulness and shared musical experiences.', label: 'Retreats' },
  '/live': { title: 'Live handpan music in Berlin | Daniela Schneider', description: 'Live handpan music for concerts, celebrations and special moments, sensitively shaped to suit each occasion.', label: 'Music' },
  '/ueber-daniela/intention': { title: 'Daniela Schneider’s musical intention | Klangfonia', description: 'Daniela Schneider combines handpan music, rhythm and sensitivity to create atmospheric experiences that connect people.', label: 'My intention' },
  '/ueber-daniela/geschichte': { title: 'Daniela Schneider – musical journey | Klangfonia', description: 'Learn about Daniela Schneider’s musical path, training and many years of experience as a percussionist and handpan musician.', label: 'My story' },
  '/kontakt': { title: 'Enquire about handpan in Berlin | Klangfonia', description: 'Contact Daniela Schneider about handpan lessons, the Big Band, workshops, retreat music or live performances.', label: 'Contact' },
};

export function serializeJsonLd(value: unknown): string {
  // CMS values must not be able to close the script element.
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function structuredData(input: {
  canonical: string; home: string; about: string; image: string;
  title: string; description: string; route: string; settings: SiteSettings; language?: Language;
}) {
  const { canonical, home, about, image, title, description, route, settings, language = 'de' } = input;
  const inLanguage = language === 'en' ? 'en' : 'de-DE';
  const metadata = language === 'en' ? pageMetadataEn : pageMetadata;
  const personId = `${about}#person`;
  const websiteId = `${home}#website`;
  const sameAs = [settings.instagram, settings.youtube].filter((value): value is string => {
    if (!value) return false;
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  });
  const graph: Record<string, unknown>[] = [
    { '@type': 'WebSite', '@id': websiteId, url: home, name: brandName, inLanguage, creator: { '@id': personId } },
    {
      '@type': 'Person', '@id': personId, name: 'Daniela Schneider', url: about,
      jobTitle: language === 'en' ? 'Handpan musician and teacher' : 'Handpan-Musikerin und Lernbegleiterin',
      knowsAbout: language === 'en' ? ['Handpan', 'Handpan lessons', 'Handpan workshops', 'Live music'] : ['Handpan', 'Handpan-Unterricht', 'Handpan-Workshops', 'Live-Musik'],
      workLocation: {
        '@type': 'Place', name: 'Berlin',
        address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressRegion: 'Berlin', addressCountry: 'DE' },
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': route.startsWith('/ueber-daniela') ? 'ProfilePage' : 'WebPage', '@id': `${canonical}#webpage`,
      url: canonical, name: title, description, inLanguage, isPartOf: { '@id': websiteId },
      about: { '@id': personId }, ...(route.startsWith('/ueber-daniela') ? { mainEntity: { '@id': personId } } : {}),
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(route !== '/' ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    },
  ];
  if (route !== '/') graph.push({
    '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: language === 'en' ? 'Home' : 'Startseite', item: home },
      { '@type': 'ListItem', position: 2, name: metadata[route]?.label ?? title, item: canonical },
    ],
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
