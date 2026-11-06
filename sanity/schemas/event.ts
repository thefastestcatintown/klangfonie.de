import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Konzerte & Termine',
  type: 'document',
  description: 'Ein Konzert oder einen anderen öffentlichen Termin anlegen.',
  fieldsets: [
    {
      name: 'english',
      title: 'Englische Übersetzungen',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'titleEn', title: 'Titel', type: 'string', fieldset: 'english' }),
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
    defineField({ name: 'locationEn', title: 'Ort', type: 'string', fieldset: 'english' }),
    defineField({
      name: 'image',
      title: 'Veranstaltungsbild (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung (Deutsch)',
          type: 'string',
          description: 'Kurz beschreiben, was auf dem Bild zu sehen ist.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'altEn',
          title: 'Bildbeschreibung (Englisch, optional)',
          type: 'string',
        }),
      ],
    }),
    defineField({ name: 'description', title: 'Beschreibung', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'descriptionEn', title: 'Beschreibung', type: 'text', rows: 4, fieldset: 'english' }),
    defineField({ name: 'externalUrl', title: 'Externer Link (optional)', type: 'url' }),
  ],
  orderings: [{ title: 'Datum', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'location', media: 'image' } },
});
