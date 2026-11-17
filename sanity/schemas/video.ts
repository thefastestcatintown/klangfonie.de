import { defineField, defineType } from 'sanity';

export const video = defineType({
  name: 'video',
  title: 'Musikvideos',
  type: 'document',
  description: 'YouTube-Musikvideos hinterlegen und für die spätere Darstellung auf der Website sortieren.',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'youtubeUrl', title: 'YouTube-URL', type: 'url', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Beschreibung (optional)', type: 'text', rows: 3 }),
    defineField({
      name: 'featured',
      title: 'Aktuelles Hauptvideo',
      description: 'Wird derzeit intern für das einzelne Video der bestehenden Website verwendet.',
      type: 'boolean',
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Reihenfolge',
      description: 'Kleinere Zahlen erscheinen später zuerst, zum Beispiel 10, 20, 30.',
      type: 'number',
      initialValue: 10,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', youtubeUrl: 'youtubeUrl', sortOrder: 'sortOrder' },
    prepare: ({ title, youtubeUrl, sortOrder }) => ({
      title: title || 'Unbenanntes Musikvideo',
      subtitle: [`Reihenfolge ${sortOrder ?? 10}`, youtubeUrl].filter(Boolean).join(' · '),
    }),
  },
});
