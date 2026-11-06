import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Bild, Dauer & Preis',
  type: 'document',
  description: 'Hier werden nur das Seitenbild und – falls vorhanden – Dauer und Preis gepflegt.',
  fieldsets: [
    {
      name: 'english',
      title: 'Englische Übersetzungen',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({ name: 'title', title: 'Interner Titel', type: 'string', hidden: true }),
    defineField({ name: 'titleEn', title: 'Titel (Englisch)', type: 'string', hidden: true }),
    defineField({ name: 'slug', title: 'URL-Kürzel', type: 'slug', hidden: true }),
    defineField({ name: 'category', title: 'Kategorie', type: 'string', hidden: true }),
    defineField({ name: 'shortDescription', title: 'Kurzbeschreibung', type: 'text', hidden: true }),
    defineField({ name: 'shortDescriptionEn', title: 'Kurzbeschreibung (Englisch)', type: 'text', hidden: true }),
    defineField({ name: 'headline', title: 'Seitenüberschrift', type: 'string', hidden: true }),
    defineField({ name: 'headlineEn', title: 'Seitenüberschrift (Englisch)', type: 'string', hidden: true }),
    defineField({ name: 'body', title: 'Ausführlicher Text', type: 'blockContent', hidden: true }),
    defineField({ name: 'bodyEn', title: 'Ausführlicher Text (Englisch)', type: 'blockContent', hidden: true }),
    defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', title: 'Alternativtext (Deutsch)', type: 'string', validation: (rule) => rule.required() },
      { name: 'altEn', title: 'Alternativtext (Englisch, optional)', type: 'string' },
    ] }),
    defineField({ name: 'priceInfo', title: 'Preis (optional)', type: 'string', description: 'Zum Beispiel „ab 60 €“.', hidden: ({ document }) => document?.category === 'Live' }),
    defineField({ name: 'priceInfoEn', title: 'Preis', type: 'string', fieldset: 'english', hidden: ({ document }) => document?.category === 'Live' }),
    defineField({ name: 'duration', title: 'Dauer (optional)', type: 'string', description: 'Zum Beispiel „60 Minuten“.', hidden: ({ document }) => document?.category === 'Live' }),
    defineField({ name: 'durationEn', title: 'Dauer', type: 'string', fieldset: 'english', hidden: ({ document }) => document?.category === 'Live' }),
    defineField({ name: 'ctaLabel', title: 'Button: Text', type: 'string', hidden: true }),
    defineField({ name: 'ctaLabelEn', title: 'Button: Text (Englisch)', type: 'string', hidden: true }),
    defineField({ name: 'ctaUrl', title: 'Button: Ziel', type: 'string', hidden: true }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', hidden: true }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});
