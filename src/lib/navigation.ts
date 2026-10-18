import type { Language } from './i18n';

export const coachingLinks = [
  { href: '/unterricht', label: 'Lernbegleitung 1:1' },
  { href: '/ensemble', label: 'Big Band' },
  { href: '/workshops', label: 'Workshops' },
];

export const aboutLinks = [
  { href: '/ueber-daniela/intention', label: 'Meine Intention' },
  { href: '/ueber-daniela/geschichte', label: 'Meine Geschichte' },
];

export const navigationLinks = [
  { href: '/yoga', label: 'Retreats' },
  { href: '/live', label: 'Musik' },
  { href: '/ueber-daniela/intention', label: 'Über mich' },
  { href: '/#termine', label: 'Termine' },
];

export const footerLinks = [{ href: '/unterricht', label: 'Coaching' }, ...navigationLinks, { href: '/kontakt', label: 'Kontakt' }];

const englishCoachingLinks = [
  { href: '/unterricht', label: 'One-to-one guidance' },
  { href: '/ensemble', label: 'Big Band' },
  { href: '/workshops', label: 'Workshops' },
];

const englishAboutLinks = [
  { href: '/ueber-daniela/intention', label: 'My intention' },
  { href: '/ueber-daniela/geschichte', label: 'My story' },
];

const englishNavigationLinks = [
  { href: '/yoga', label: 'Retreats' },
  { href: '/live', label: 'Music' },
  { href: '/ueber-daniela/intention', label: 'About me' },
  { href: '/#termine', label: 'Events' },
];

export function navigationFor(language: Language) {
  if (language === 'en') {
    return {
      coachingLinks: englishCoachingLinks,
      aboutLinks: englishAboutLinks,
      navigationLinks: englishNavigationLinks,
      footerLinks: [{ href: '/unterricht', label: 'Coaching' }, ...englishNavigationLinks, { href: '/kontakt', label: 'Contact' }],
    };
  }
  return { coachingLinks, aboutLinks, navigationLinks, footerLinks };
}
