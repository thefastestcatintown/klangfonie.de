import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Angebote',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Interner Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'URL-Kürzel', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Kategorie', type: 'string', options: { list: ['Unterricht', 'Yoga', 'Live', 'Band'], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'shortDescription', title: 'Kurzbeschreibung', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'headline', title: 'Seitenüberschrift', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Ausführlicher Text', type: 'blockContent' }),
    defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternativtext', type: 'string', validation: (rule) => rule.required() }] }),
    defineField({ name: 'priceInfo', title: 'Preisinfo (optional)', type: 'string' }),
    defineField({ name: 'duration', title: 'Dauer (optional)', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'Button: Text', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'ctaUrl', title: 'Button: Ziel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});
