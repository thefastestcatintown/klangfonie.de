import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { fallbackAbout, fallbackHome, fallbackServices, fallbackSettings, fallbackVideo } from './fallbacks';
import type { AboutPage, Event, HomePage, SanityImage, Service, SiteSettings, Testimonial, Video } from './types';

export const isSanityConfigured = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID);
const builder = createImageUrlBuilder(sanityClient);

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const value = await sanityClient.fetch<T>(query, params);
    return value ?? fallback;
  } catch (error) {
    console.warn('[Klangfonia] Sanity-Abfrage fehlgeschlagen, Fallback wird verwendet:', error instanceof Error ? error.message : 'Unbekannter Fehler');
    return fallback;
  }
}

export async function getPageCopy(
  pageId: string,
  language: 'de' | 'en',
  fallback: Record<string, string>,
): Promise<Record<string, string>> {
  const entries = await safeFetch<Array<{ key?: string; de?: string; en?: string }>>(
    `*[_type == "pageCopy" && pageId == $pageId][0].entries[]{key, de, en}`,
    { pageId },
    [],
  );
  return entries.reduce<Record<string, string>>((copy, entry) => {
    if (!entry.key) return copy;
    const localized = language === 'en' ? entry.en || entry.de : entry.de;
    if (localized?.trim()) copy[entry.key] = localized.trim();
    return copy;
  }, { ...fallback });
}

export function copyParagraphs(value: string): string[] {
  return value.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

export function copyList(value: string): string[] {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

export function imageUrl(image: SanityImage | undefined, width = 1200, height?: number): string | undefined {
  if (!image?.asset?._ref) return undefined;
  let result = builder.image(image).width(width).auto('format').fit('crop');
  if (height) result = result.height(height);
  return result.url();
}

export function imageSrcSet(image: SanityImage | undefined, widths: number[], heightRatio?: number): string | undefined {
  const candidates = widths.flatMap((width) => {
    const height = heightRatio ? Math.round(width * heightRatio) : undefined;
    const url = imageUrl(image, width, height);
    return url ? [`${url} ${width}w`] : [];
  });
  return candidates.length > 0 ? candidates.join(', ') : undefined;
}

export async function getSettings(): Promise<SiteSettings> {
  return safeFetch(`*[_type == "siteSettings"][0]{siteTitle, defaultSeoTitle, defaultSeoDescription, email, phone, instagram, youtube, location}`, {}, fallbackSettings);
}

export async function getHome(): Promise<HomePage> {
  return safeFetch(`*[_type == "homePage"][0]{heroEyebrow, heroHeadline, heroHeadlineEn, heroText, heroTextEn, heroImage, heroVideoUrl, primaryCtaLabel, primaryCtaLabelEn, primaryCtaUrl, secondaryCtaLabel, secondaryCtaLabelEn, secondaryCtaUrl, introHeadline, introHeadlineEn, introText, introTextEn, introText2, introText2En, testimonialsHeadline, testimonialsHeadlineEn, testimonialsText, testimonialsTextEn, eventsHeadline, eventsHeadlineEn}`, {}, fallbackHome);
}

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch(`*[_type == "service"] | order(sortOrder asc){_id, title, titleEn, "slug": slug.current, category, shortDescription, shortDescriptionEn, headline, headlineEn, body, bodyEn, image, priceInfo, priceInfoEn, duration, durationEn, ctaLabel, ctaLabelEn, ctaUrl, sortOrder}`, {}, fallbackServices);
  return services.length > 0 ? services : fallbackServices;
}

export async function getService(category: Service['category']): Promise<Service> {
  const fallback = fallbackServices.find((item) => item.category === category) ?? fallbackServices[0];
  return safeFetch(`*[_type == "service" && category == $category][0]{_id, title, titleEn, "slug": slug.current, category, shortDescription, shortDescriptionEn, headline, headlineEn, body, bodyEn, image, priceInfo, priceInfoEn, duration, durationEn, ctaLabel, ctaLabelEn, ctaUrl, sortOrder}`, { category }, fallback);
}

export function localizeService(service: Service, language: 'de' | 'en'): Service {
  if (language === 'de') return service;
  return {
    ...service,
    title: service.titleEn || service.title,
    shortDescription: service.shortDescriptionEn || service.shortDescription,
    headline: service.headlineEn || service.headline,
    body: service.bodyEn || service.body,
    priceInfo: service.priceInfoEn || service.priceInfo,
    duration: service.durationEn || service.duration,
    ctaLabel: service.ctaLabelEn || service.ctaLabel,
    image: service.image ? { ...service.image, alt: service.image.altEn || service.image.alt } : undefined,
  };
}

export async function getAbout(): Promise<AboutPage> {
  return safeFetch(`*[_type == "aboutPage"][0]{headline, intro, portrait, body, milestones}`, {}, fallbackAbout);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(`*[_type == "testimonial"] | order(sortOrder asc){_id, quote, quoteEn, name, nameEn, sourceType, context, contextEn}`, {}, []);
}

export async function getFeaturedVideo(): Promise<Video | null> {
  const video = await safeFetch(`*[_type == "video" && featured == true] | order(sortOrder asc)[0]{_id, title, youtubeUrl, description, featured}`, {}, fallbackVideo);
  return video.youtubeUrl ? video : fallbackVideo;
}

export async function getEvents(): Promise<Event[]> {
  return safeFetch(`*[_type == "event" && (!defined(date) || date >= now() || (defined(recurrence) && recurrence != "none"))] | order(defined(date) desc, date asc, _createdAt desc){_id, title, titleEn, date, endDate, planningLabel, planningLabelEn, recurrence, repeatUntil, location, locationEn, image, description, descriptionEn, ctaType, externalUrl}`, {}, []);
}
