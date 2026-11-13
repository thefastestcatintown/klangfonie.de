import { defineArrayMember, defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Berufliche & musikalische Stationen',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Überschrift', type: 'string', hidden: true }),
    defineField({ name: 'intro', title: 'Einleitung', type: 'text', rows: 4, hidden: true }),
    defineField({
      name: 'portrait',
      title: 'Bild auf den „Über mich“-Seiten',
      description: 'Dieses Bild erscheint bei „Meine Intention“ und „Meine Geschichte“. Der Bildausschnitt kann über den Fokuspunkt angepasst werden.',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Bildbeschreibung für Screenreader', type: 'string', validation: (rule) => rule.required() }],
    }),
    defineField({ name: 'body', title: 'Haupttext', type: 'blockContent', hidden: true }),
    defineField({
      name: 'milestones',
      title: 'Stationen',
      description: 'Die Einträge erscheinen auf der Seite „Über Daniela – Geschichte“. Du kannst sie verschieben, öffnen oder ergänzen.',
      type: 'array',
      of: [defineArrayMember({ type: 'object', fieldsets: [
        { name: 'english', title: 'Englische Übersetzung', options: { collapsible: true, collapsed: true } },
      ], fields: [
        { name: 'year', title: 'Jahr / Zeitraum', type: 'string' },
        { name: 'yearEn', title: 'Jahr / Zeitraum', type: 'string', fieldset: 'english' },
        { name: 'text', title: 'Station', type: 'string', validation: (rule) => rule.required() },
        { name: 'textEn', title: 'Station', type: 'string', fieldset: 'english' },
        { name: 'details', title: 'Details (optional)', type: 'array', of: [{ type: 'string' }] },
        { name: 'detailsEn', title: 'Details (optional)', type: 'array', of: [{ type: 'string' }], fieldset: 'english' },
      ], preview: { select: { title: 'text', subtitle: 'year' } } })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Berufliche & musikalische Stationen' }) },
});
