import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Termine',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Datum und Uhrzeit', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'Ort', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'externalUrl', title: 'Externer Link (optional)', type: 'url' }),
  ],
  orderings: [{ title: 'Datum', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'location' } },
});
