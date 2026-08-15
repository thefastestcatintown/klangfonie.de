import { defineField, defineType } from 'sanity';

export const video = defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'youtubeUrl', title: 'YouTube-URL', type: 'url', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Auf der Startseite zeigen', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
});
