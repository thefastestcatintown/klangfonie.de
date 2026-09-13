import { formatEventDate } from '../lib/dates';

type PublicEvent = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  externalUrl?: string;
};

const section = document.querySelector<HTMLElement>('[data-events-section]');
const list = section?.querySelector<HTMLElement>('[data-events-list]');
const projectId = section?.dataset.projectId || '';
const dataset = section?.dataset.dataset || '';

if (section && list && /^[a-z0-9-]+$/.test(projectId) && /^[a-z0-9_-]+$/.test(dataset)) {
  const query = '*[_type == "event" && date >= now()] | order(date asc){_id,title,date,endDate,location,description,externalUrl,"imageUrl":image.asset->url,"imageAlt":coalesce(image.alt,title)}';
  const endpoint = `https://${projectId}.apicdn.sanity.io/v2026-03-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
      return response.json() as Promise<{ result?: PublicEvent[] }>;
    })
    .then(({ result }) => {
      if (!Array.isArray(result)) return;
      list.replaceChildren(...(result.length > 0 ? result.map(createEvent) : [createEmptyState()]));
    })
    .catch(() => {
      // Die beim Build erzeugte Terminliste bleibt als verlässlicher Fallback stehen.
    });
}

function createEvent(event: PublicEvent): HTMLElement {
  const article = document.createElement('article');
  const time = document.createElement('time');
  const details = document.createElement('div');
  const content = document.createElement('div');
  const title = document.createElement('h3');
  const location = document.createElement('p');

  time.dateTime = event.date;
  time.textContent = formatEventDate(event.date, event.endDate);
  title.textContent = event.title;
  location.className = 'event-location';
  location.textContent = event.location;
  content.append(title, location);

  if (event.imageUrl) {
    try {
      const imageUrl = new URL(event.imageUrl);
      if (imageUrl.protocol === 'https:' && imageUrl.hostname === 'cdn.sanity.io') {
        const image = document.createElement('img');
        imageUrl.searchParams.set('w', '640');
        imageUrl.searchParams.set('h', '426');
        imageUrl.searchParams.set('fit', 'crop');
        imageUrl.searchParams.set('auto', 'format');
        image.className = 'event-image';
        image.src = imageUrl.href;
        image.alt = event.imageAlt || event.title;
        image.width = 640;
        image.height = 426;
        image.loading = 'lazy';
        details.classList.add('has-image');
        details.append(image);
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

  details.classList.add('event-details');
  details.append(content);
  article.append(time, details);

  if (event.externalUrl) {
    try {
      const externalUrl = new URL(event.externalUrl);
      if (externalUrl.protocol === 'http:' || externalUrl.protocol === 'https:') {
        const link = document.createElement('a');
        link.href = externalUrl.href;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = 'Mehr erfahren ↗';
        article.append(link);
      }
    } catch {
      // Ungültige optionale Links werden nicht ausgegeben.
    }
  }

  return article;
}

function createEmptyState(): HTMLElement {
  const empty = document.createElement('p');
  empty.className = 'events-empty';
  empty.textContent = 'Neue Konzerttermine werden hier veröffentlicht.';
  return empty;
}

