export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  altEn?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SiteSettings {
  siteTitle: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  email: string;
  phone?: string;
  instagram?: string;
  youtube?: string;
  location?: string;
}

export interface HomePage {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineEn?: string;
  heroText: string;
  heroTextEn?: string;
  heroImage?: SanityImage;
  heroVideoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaLabelEn?: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaLabelEn?: string;
  secondaryCtaUrl: string;
  introHeadline: string;
  introHeadlineEn?: string;
  introText: string;
  introTextEn?: string;
  introText2?: string;
  introText2En?: string;
  testimonialsHeadline?: string;
  testimonialsHeadlineEn?: string;
  testimonialsText?: string;
  testimonialsTextEn?: string;
  eventsHeadline?: string;
  eventsHeadlineEn?: string;
}

export interface Service {
  _id?: string;
  title: string;
  titleEn?: string;
  slug: string;
  category: 'Unterricht' | 'Yoga' | 'Live' | 'Band';
  shortDescription: string;
  shortDescriptionEn?: string;
  headline: string;
  headlineEn?: string;
  body?: PortableTextBlock[];
  bodyEn?: PortableTextBlock[];
  image?: SanityImage;
  priceInfo?: string;
  priceInfoEn?: string;
  duration?: string;
  durationEn?: string;
  ctaLabel: string;
  ctaLabelEn?: string;
  ctaUrl: string;
  sortOrder: number;
}

export interface Testimonial {
  _id?: string;
  quote: string;
  name: string;
  sourceType?: 'Schüler:in' | 'Veranstalter:in' | 'Yogalehrer:in' | 'Sonstige Person';
  context?: string;
  quoteEn?: string;
  nameEn?: string;
  contextEn?: string;
}

export interface Video {
  _id?: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  featured?: boolean;
}

export interface AboutPage {
  headline: string;
  intro: string;
  portrait?: SanityImage;
  body?: PortableTextBlock[];
  milestones?: Array<{ year?: string; yearEn?: string; text: string; textEn?: string; details?: string[]; detailsEn?: string[] }>;
}

export interface Event {
  _id?: string;
  title: string;
  date?: string;
  endDate?: string;
  planningLabel?: string;
  planningLabelEn?: string;
  recurrence?: 'none' | 'weekly' | 'monthly' | 'yearly';
  repeatUntil?: string;
  location: string;
  image?: SanityImage;
  description: string;
  ctaType?: 'more' | 'book';
  externalUrl?: string;
  titleEn?: string;
  locationEn?: string;
  descriptionEn?: string;
}
import type { PortableTextBlock } from '@portabletext/types';
