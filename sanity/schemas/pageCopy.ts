import { defineArrayMember, defineField, defineType } from 'sanity';

export const pageCopy = defineType({
  name: 'pageCopy',
  title: 'Seitentexte',
  type: 'document',
  description: 'Hier werden nur die sichtbaren Texte dieser Website-Seite bearbeitet.',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Seite / Bereich',
      type: 'string',
      readOnly: ({ document }) => Boolean(document?._createdAt),
      hidden: true,
      validation: (rule) => rule.required(),
      options: {
        list: [
          ['Globale Texte & Navigation', 'global'],
          ['Startseite', 'home'],
          ['Lernbegleitung', 'unterricht'],
          ['Big Band', 'ensemble'],
          ['Workshops', 'workshops'],
          ['Retreats', 'yoga'],
          ['Live-Musik', 'live'],
          ['Über Daniela – Intention', 'about-intention'],
          ['Über Daniela – Geschichte', 'about-story'],
          ['Kontakt', 'contact'],
          ['Selbsteinschätzung', 'self-assessment'],
          ['Impressum', 'legal-notice'],
          ['Datenschutz', 'privacy'],
        ].map(([title, value]) => ({ title, value })),
      },
    }),
    defineField({
      name: 'image',
      title: 'Bild auf dieser Seite',
      description: 'Dieses Bild erscheint nur auf dieser „Über mich“-Seite. Über „Bearbeiten“ kannst du den Fokuspunkt und damit den sichtbaren Bildausschnitt festlegen.',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => !['about-intention', 'about-story'].includes(String(document?.pageId || '')),
      fields: [
        defineField({ name: 'alt', title: 'Bildbeschreibung für Screenreader', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'altEn', title: 'Englische Bildbeschreibung (optional)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'entries',
      title: 'Texte auf der Seite',
      description: 'Öffne einen Eintrag, um den deutschen Text oder bei Bedarf die englische Übersetzung zu ändern.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'copyEntry',
          title: 'Text',
          type: 'object',
          fieldsets: [
            {
              name: 'english',
              title: 'Englische Übersetzung',
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            defineField({ name: 'key', title: 'Technischer Schlüssel', type: 'string', readOnly: true, hidden: true, validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Bezeichnung', type: 'string', readOnly: true, hidden: true, validation: (rule) => rule.required() }),
            defineField({ name: 'de', title: 'Text', type: 'text', rows: 4, validation: (rule) => rule.required() }),
            defineField({ name: 'en', title: 'Englischer Text', type: 'text', rows: 4, fieldset: 'english' }),
          ],
          preview: { select: { title: 'label', subtitle: 'de' } },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'pageId' }, prepare: ({ title }) => ({ title: title || 'Seitentexte' }) },
});
