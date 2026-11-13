import { formatEventSchedule } from '../lib/dates';
import { localizeEvent } from '../lib/event-translations';
import { expandRecurringEvents } from '../lib/event-recurrence';
import { imageSrcSet, imageUrl } from '../lib/sanity';
import type { SanityImage } from '../lib/types';

type PublicEvent = {
  _id: string;
  title: string;
  date?: string;
  endDate?: string;
  planningLabel?: string;
  planningLabelEn?: string;
  recurrence?: 'none' | 'weekly' | 'monthly' | 'yearly';
  repeatUntil?: string;
  occurrenceCount?: number;
  location: string;
  image?: SanityImage;
  imageAlt?: string;
  description: string;
  ctaType?: 'more' | 'book';
  externalUrl?: string;
  titleEn?: string;
  locationEn?: string;
  descriptionEn?: string;
};

const section = document.querySelector<HTMLElement>('[data-events-section]');
const list = section?.querySelector<HTMLElement>('[data-events-list]');
const projectId = section?.dataset.projectId || '';
const dataset = section?.dataset.dataset || '';
const language = section?.dataset.language === 'en' ? 'en' : 'de';
const moreLabel = section?.dataset.moreLabel || (language === 'en' ? 'Find out more' : 'Mehr erfahren');
const bookLabel = section?.dataset.bookLabel || (language === 'en' ? 'Book event' : 'Termin buchen');
const emptyLabel = section?.dataset.emptyLabel || (language === 'en' ? 'New concert dates will be published here.' : 'Neue Konzerttermine werden hier veröffentlicht.');
const limit = section?.dataset.limit ? Number(section.dataset.limit) : undefined;
const layout = section?.dataset.layout === 'list' ? 'list' : 'cards';
const eventHeadingLevel = section?.dataset.eventHeadingLevel === 'h2' ? 'h2' : 'h3';

if (section && list && /^[a-z0-9-]+$/.test(projectId) && /^[a-z0-9_-]+$/.test(dataset)) {
  const query = '*[_type == "event" && (!defined(date) || date >= now() || (defined(recurrence) && recurrence != "none"))] | order(defined(date) desc, date asc, _createdAt desc){_id,title,titleEn,date,endDate,planningLabel,planningLabelEn,recurrence,repeatUntil,occurrenceCount,location,locationEn,description,descriptionEn,ctaType,externalUrl,image,"imageAlt":select($language == "en" => coalesce(image.altEn,image.alt,titleEn,title), coalesce(image.alt,title))}';
  const endpoint = `https://${projectId}.apicdn.sanity.io/v2026-03-01/data/query/${dataset}?query=${encodeURIComponent(query)}&$language=${encodeURIComponent(JSON.stringify(language))}`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
      return response.json() as Promise<{ result?: PublicEvent[] }>;
    })
    .then(({ result }) => {
      if (!Array.isArray(result)) return;
      const allEvents = expandRecurringEvents(result).map((event) => localizeEvent(event, language));
      const events = typeof limit === 'number' && Number.isFinite(limit) ? allEvents.slice(0, limit) : allEvents;
      list.classList.toggle('events--single', layout === 'cards' && events.length === 1);
      list.replaceChildren(...(events.length > 0 ? events.map(createEvent) : [createEmptyState()]));
    })
    .catch(() => {
      // Die beim Build erzeugte Terminliste bleibt als verlässlicher Fallback stehen.
    });
}

function createEvent(event: PublicEvent): HTMLElement {
  const article = document.createElement('article');
  const meta = document.createElement('header');
  const schedule = event.date ? document.createElement('time') : document.createElement('p');
  const content = document.createElement('div');
  const title = document.createElement(eventHeadingLevel);
  const location = document.createElement('p');

  meta.className = 'event-meta';
  schedule.className = 'event-date';
  if (schedule instanceof HTMLTimeElement && event.date) schedule.dateTime = event.date;
  schedule.textContent = formatEventSchedule(event.date, event.endDate, event.planningLabel, language);
  meta.append(schedule);
  content.className = 'event-content';
  title.textContent = event.title;
  location.className = 'event-location';
  location.textContent = event.location;
  content.append(title, location);

  if (event.image) {
    try {
      const source = imageUrl(event.image, 960, 540);
      if (source) {
        const safeImageUrl = new URL(source);
        if (safeImageUrl.protocol !== 'https:' || safeImageUrl.hostname !== 'cdn.sanity.io') throw new Error('Unsupported image URL');
        const image = document.createElement('img');
        image.className = 'event-image';
        image.src = safeImageUrl.href;
        image.srcset = imageSrcSet(event.image, [480, 720, 960], 9 / 16) || '';
        image.sizes = layout === 'list' ? '(min-width: 52rem) 36vw, calc(100vw - 2rem)' : '(min-width: 64rem) 33vw, calc(100vw - 2rem)';
        image.alt = event.imageAlt || event.title;
        image.width = 960;
        image.height = 540;
        image.loading = 'lazy';
        image.decoding = 'async';
        article.classList.add('has-image');
        article.append(image);
      }
    } catch {
      // Ungültige Bild-URLs werden nicht ausgegeben.
    }
  }

  if (event.description) {
    const description = document.createElement('p');
    description.textContent = event.description;
    content.append(description);
  }

  if (event.externalUrl) {
    try {
      const externalUrl = new URL(event.externalUrl);
      if (externalUrl.protocol === 'http:' || externalUrl.protocol === 'https:') {
        const link = document.createElement('a');
        link.href = externalUrl.href;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = `${event.ctaType === 'book' ? bookLabel : moreLabel} ↗`;
        content.append(link);
      }
    } catch {
      // Ungültige optionale Links werden nicht ausgegeben.
    }
  }

  article.prepend(meta);
  article.append(content);

  return article;
}

function createEmptyState(): HTMLElement {
  const empty = document.createElement('p');
  empty.className = 'events-empty';
  empty.textContent = emptyLabel;
  return empty;
}

