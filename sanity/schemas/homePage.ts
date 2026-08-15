import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero: kleine Zeile', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'heroHeadline', title: 'Hero: Überschrift', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'heroText', title: 'Hero: Text', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero: Bild', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternativtext', type: 'string', validation: (rule) => rule.required() }] }),
    defineField({ name: 'heroVideoUrl', title: 'Hero: Video-URL (optional)', type: 'url' }),
    defineField({ name: 'primaryCtaLabel', title: 'Primärer Button: Text', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'primaryCtaUrl', title: 'Primärer Button: Ziel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryCtaLabel', title: 'Sekundärer Button: Text', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryCtaUrl', title: 'Sekundärer Button: Ziel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'introHeadline', title: 'Einleitung: Überschrift', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'introText', title: 'Einleitung: Text', type: 'text', rows: 4, validation: (rule) => rule.required() }),
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
});
