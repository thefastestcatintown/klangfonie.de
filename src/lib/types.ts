export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
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
  heroText: string;
  heroImage?: SanityImage;
  heroVideoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  introHeadline: string;
  introText: string;
}

export interface Service {
  _id?: string;
  title: string;
  slug: string;
  category: 'Unterricht' | 'Yoga' | 'Live' | 'Band';
  shortDescription: string;
  headline: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
  priceInfo?: string;
  duration?: string;
  ctaLabel: string;
  ctaUrl: string;
  sortOrder: number;
}

export interface Testimonial {
  _id?: string;
  quote: string;
  name: string;
  context?: string;
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
  milestones?: Array<{ year?: string; text: string }>;
}

export interface Event {
  _id?: string;
  title: string;
  date: string;
  location: string;
  image?: SanityImage;
  description: string;
  externalUrl?: string;
}
import type { PortableTextBlock } from '@portabletext/types';
