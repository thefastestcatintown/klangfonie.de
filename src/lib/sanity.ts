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
    console.warn('[Klangfonie] Sanity-Abfrage fehlgeschlagen, Fallback wird verwendet.', error);
    return fallback;
  }
}

export function imageUrl(image: SanityImage | undefined, width = 1200, height?: number): string | undefined {
  if (!image?.asset?._ref) return undefined;
  let result = builder.image(image).width(width).auto('format').fit('crop');
  if (height) result = result.height(height);
  return result.url();
}

export async function getSettings(): Promise<SiteSettings> {
  return safeFetch(`*[_type == "siteSettings"][0]{siteTitle, defaultSeoTitle, defaultSeoDescription, email, phone, instagram, youtube, location}`, {}, fallbackSettings);
}

export async function getHome(): Promise<HomePage> {
  return safeFetch(`*[_type == "homePage"][0]{heroEyebrow, heroHeadline, heroText, heroImage, heroVideoUrl, primaryCtaLabel, primaryCtaUrl, secondaryCtaLabel, secondaryCtaUrl, introHeadline, introText}`, {}, fallbackHome);
}

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch(`*[_type == "service"] | order(sortOrder asc){_id, title, "slug": slug.current, category, shortDescription, headline, body, image, priceInfo, duration, ctaLabel, ctaUrl, sortOrder}`, {}, fallbackServices);
  return services.length > 0 ? services : fallbackServices;
}

export async function getService(category: Service['category']): Promise<Service> {
  const fallback = fallbackServices.find((item) => item.category === category) ?? fallbackServices[0];
  return safeFetch(`*[_type == "service" && category == $category][0]{_id, title, "slug": slug.current, category, shortDescription, headline, body, image, priceInfo, duration, ctaLabel, ctaUrl, sortOrder}`, { category }, fallback);
}

export async function getAbout(): Promise<AboutPage> {
  return safeFetch(`*[_type == "aboutPage"][0]{headline, intro, portrait, body, milestones}`, {}, fallbackAbout);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(`*[_type == "testimonial"] | order(sortOrder asc){_id, quote, name, context}`, {}, []);
}

export async function getFeaturedVideo(): Promise<Video | null> {
  const video = await safeFetch(`*[_type == "video" && featured == true] | order(sortOrder asc)[0]{_id, title, youtubeUrl, description, featured}`, {}, fallbackVideo);
  return video.youtubeUrl ? video : fallbackVideo;
}

export async function getEvents(): Promise<Event[]> {
  return safeFetch(`*[_type == "event" && date >= now()] | order(date asc){_id, title, date, endDate, location, image, description, externalUrl}`, {}, []);
}

export function youtubeEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes('youtu.be')
      ? parsed.pathname.slice(1)
      : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : undefined;
  } catch {
    return undefined;
  }
}
