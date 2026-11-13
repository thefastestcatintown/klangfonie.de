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
    defineField({
      name: 'date',
      title: 'Beginn (Datum und Uhrzeit, optional)',
      description: 'Wenn der genaue Termin noch nicht feststeht, dieses Feld leer lassen und stattdessen den Planungsstand ausfüllen.',
      type: 'datetime',
      validation: (rule) => rule.custom((date, context) => {
        const planningLabel = context.document?.planningLabel;
        if (date || (typeof planningLabel === 'string' && planningLabel.trim())) return true;
        return 'Bitte einen Beginn oder einen Planungsstand angeben.';
      }),
    }),
    defineField({
      name: 'planningLabel',
      title: 'Planungsstand (wenn der Beginn noch offen ist)',
      description: 'Zum Beispiel „2027 in Planung“, „Frühjahr 2027“ oder „Termin folgt“.',
      type: 'string',
      validation: (rule) => rule.custom((planningLabel, context) => {
        const date = context.document?.date;
        if (date || (typeof planningLabel === 'string' && planningLabel.trim())) return true;
        return 'Bitte einen Planungsstand oder einen Beginn angeben.';
      }),
    }),
    defineField({ name: 'planningLabelEn', title: 'Planungsstand', type: 'string', fieldset: 'english' }),
    defineField({
      name: 'endDate',
      title: 'Ende (Datum und Uhrzeit, optional)',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.date;
          if (!endDate || typeof endDate !== 'string') return true;
          if (typeof startDate !== 'string') return 'Ein Ende kann nur zusammen mit einem Beginn angegeben werden.';
          return new Date(endDate) > new Date(startDate) || 'Das Ende muss nach dem Beginn liegen.';
        }),
    }),
    defineField({
      name: 'recurrence',
      title: 'Wiederholung',
      description: 'Aus einem Eintrag werden automatisch die kommenden Termine erzeugt.',
      type: 'string',
      initialValue: 'none',
      options: {
        layout: 'radio',
        list: [
          { title: 'Keine Wiederholung', value: 'none' },
          { title: 'Wöchentlich', value: 'weekly' },
          { title: 'Monatlich', value: 'monthly' },
          { title: 'Jährlich', value: 'yearly' },
        ],
      },
      validation: (rule) =>
        rule.custom((recurrence, context) => {
          if (!recurrence || recurrence === 'none' || context.document?.date) return true;
          return 'Eine Wiederholung benötigt ein genaues Startdatum.';
        }),
    }),
    defineField({
      name: 'repeatUntil',
      title: 'Wiederholen bis (optional)',
      description: 'Wenn das Feld leer bleibt, zeigt die Website jeweils die nächsten zwölf Termine der Serie.',
      type: 'date',
      hidden: ({ document }) => !document?.recurrence || document.recurrence === 'none',
      validation: (rule) =>
        rule.custom((repeatUntil, context) => {
          const startDate = context.document?.date;
          if (!repeatUntil || typeof repeatUntil !== 'string' || typeof startDate !== 'string') return true;
          return repeatUntil >= startDate.slice(0, 10) || 'Das Ende der Wiederholung darf nicht vor dem Beginn liegen.';
        }),
    }),
    defineField({ name: 'location', title: 'Ort', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'locationEn', title: 'Ort', type: 'string', fieldset: 'english' }),
    defineField({
      name: 'image',
      title: 'Veranstaltungsbild (optional)',
      description: 'Nach dem Hochladen „Bearbeiten“ öffnen und den Fokuspunkt auf das wichtigste Motiv setzen. Dieser Bildausschnitt wird auf der Website im Querformat verwendet.',
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
    defineField({
      name: 'ctaType',
      title: 'Button-Beschriftung',
      description: 'Legt fest, welcher Text auf dem Button dieses Termins erscheint.',
      type: 'string',
      initialValue: 'more',
      options: {
        layout: 'radio',
        list: [
          { title: 'Mehr erfahren', value: 'more' },
          { title: 'Termin buchen', value: 'book' },
        ],
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'Button-Link (optional)',
      description: 'Ohne Link wird kein Button angezeigt.',
      type: 'url',
    }),
  ],
  orderings: [{ title: 'Datum / Planung', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', planningLabel: 'planningLabel', location: 'location', media: 'image' },
    prepare: ({ title, date, planningLabel, location, media }) => ({
      title,
      subtitle: [planningLabel || (date ? new Date(date).toLocaleDateString('de-DE') : 'In Planung'), location].filter(Boolean).join(' · '),
      media,
    }),
  },
});
