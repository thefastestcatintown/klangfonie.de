import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Über Daniela',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Überschrift', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'intro', title: 'Einleitung', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'portrait', title: 'Porträt', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alternativtext', type: 'string', validation: (rule) => rule.required() }] }),
    defineField({ name: 'body', title: 'Haupttext', type: 'blockContent' }),
    defineField({
      name: 'milestones',
      title: 'Musikalische Stationen (optional)',
      type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [
        { name: 'year', title: 'Jahr / Zeitraum', type: 'string' },
        { name: 'text', title: 'Station', type: 'string', validation: (rule) => rule.required() },
      ], preview: { select: { title: 'text', subtitle: 'year' } } })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Über Daniela' }) },
});
