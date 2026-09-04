import type { AboutPage, HomePage, Service, SiteSettings, Video } from './types';

export const fallbackSettings: SiteSettings = {
  siteTitle: 'Klangfonia',
  defaultSeoTitle: 'Klangfonia – Handpan, Musik & Begegnung',
  defaultSeoDescription: 'Handpanunterricht und feinfühlige Live-Musik für Yoga, Events und besondere Momente mit Daniela Schneider.',
  email: '',
  location: 'Deutschland',
};

export const fallbackHome: HomePage = {
  heroEyebrow: 'DANIELA SCHNEIDER · HANDPAN · MUSIK',
  heroHeadline: 'Klang, der verbindet.',
  heroText: 'Ich verbinde persönliche Lernbegleitung an der Handpan, Live-Musik und feinfühlige Klangbegleitung für Yoga, besondere Momente und Menschen, die selbst ins Spielen eintauchen möchten.',
  primaryCtaLabel: 'Lernbegleitung entdecken',
  primaryCtaUrl: '/unterricht',
  secondaryCtaLabel: 'Musik hören',
  secondaryCtaUrl: '#musik',
  introHeadline: 'Erst hören. Dann weiterlesen.',
  introText: 'Die Handpan muss man eigentlich nicht erklären. Man muss sie hören.',
};

export const fallbackServices: Service[] = [
  {
    title: 'Lernbegleitung', slug: 'unterricht', category: 'Unterricht',
    shortDescription: 'Persönliche Lernbegleitung für Menschen, die das Instrument neu entdecken oder ihr Spiel weiterentwickeln möchten.',
    headline: 'Dein eigener Zugang zur Handpan.', ctaLabel: 'Lernbegleitung anfragen', ctaUrl: '/kontakt?interesse=unterricht', sortOrder: 10,
  },
  {
    title: 'Yoga & Handpan', slug: 'yoga', category: 'Yoga',
    shortDescription: 'Musik, die Bewegung, Atem und Stille begleitet, ohne sich in den Vordergrund zu drängen.',
    headline: 'Live-Klang für deine Yogaklasse.', ctaLabel: 'Gemeinsame Klasse anfragen', ctaUrl: '/kontakt?interesse=yoga', sortOrder: 20,
  },
  {
    title: 'Live & Band', slug: 'live', category: 'Live',
    shortDescription: 'Solo, gemeinsam mit anderen Musiker:innen oder als musikalische Begleitung für Events, Retreats und besondere Momente.',
    headline: 'Musik für besondere Räume.', ctaLabel: 'Live-Musik anfragen', ctaUrl: '/kontakt?interesse=live', sortOrder: 30,
  },
];

export const fallbackAbout: AboutPage = {
  headline: 'Musik entsteht für mich im Zuhören.',
  intro: 'Ich bin Daniela Schneider, Handpan-Spielerin und Musikerin. An der Handpan fasziniert mich, wie Rhythmus und Melodie unmittelbar zusammenfinden – und aus wenigen Tönen ein ganzer Klangraum entsteht.',
  milestones: [],
};

export const fallbackVideo: Video = {
  title: 'Die Farben des Lichtes – The Colors of Light',
  youtubeUrl: 'https://www.youtube.com/watch?v=eSMxRz38M5s',
  description: 'Daniela Schneider an der Handpan.',
  featured: true,
};
