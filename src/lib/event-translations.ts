import type { Event } from './types';

const englishFallbacks: Record<string, Partial<Event>> = {
  'a0efcb85-2017-4ce3-9bb5-7824e44ed2d5': {
    titleEn: 'Winter Sound Night',
    locationEn: 'YogaSky Berlin',
    descriptionEn: 'Immerse yourself in the warm sounds of the Winter Sound Night. Gentle handpan melodies and deeply resonating gong vibrations surround you, inviting you to let go and dream. An evening filled with relaxation and inner calm.',
  },
};

export function localizeEvent<T extends Event>(event: T, language: 'de' | 'en'): T {
  if (language === 'de') return event;
  const fallback = event._id ? englishFallbacks[event._id] : undefined;
  return {
    ...event,
    title: event.titleEn || fallback?.titleEn || event.title,
    location: event.locationEn || fallback?.locationEn || event.location,
    description: event.descriptionEn || fallback?.descriptionEn || event.description,
  };
}
