import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Konzerte & Termine',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Beginn (Datum und Uhrzeit)', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({
      name: 'endDate',
      title: 'Ende (Datum und Uhrzeit, optional)',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.date;
          if (!endDate || typeof endDate !== 'string' || typeof startDate !== 'string') return true;
          return new Date(endDate) > new Date(startDate) || 'Das Ende muss nach dem Beginn liegen.';
        }),
    }),
    defineField({ name: 'location', title: 'Ort', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'image',
      title: 'Veranstaltungsbild (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          type: 'string',
          description: 'Kurz beschreiben, was auf dem Bild zu sehen ist.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'externalUrl', title: 'Externer Link (optional)', type: 'url' }),
  ],
  orderings: [{ title: 'Datum', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'location', media: 'image' } },
});
