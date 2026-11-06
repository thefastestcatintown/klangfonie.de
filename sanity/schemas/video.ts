import { defineField, defineType } from 'sanity';

export const video = defineType({
  name: 'video',
  title: 'Musikvideo',
  type: 'document',
  description: 'Das YouTube-Video auf der Seite „Live-Musik“.',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'youtubeUrl', title: 'YouTube-URL', type: 'url', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Auf der Website zeigen', type: 'boolean', initialValue: true, hidden: true }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', initialValue: 10, hidden: true }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
});
