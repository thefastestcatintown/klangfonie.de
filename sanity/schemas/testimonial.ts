import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Bewertungen & Stimmen',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Zitat', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'sourceType',
      title: 'Stimme von',
      type: 'string',
      options: {
        list: [
          { title: 'Schüler:in', value: 'Schüler:in' },
          { title: 'Veranstalter:in', value: 'Veranstalter:in' },
          { title: 'Yogalehrer:in', value: 'Yogalehrer:in' },
          { title: 'Sonstige Person', value: 'Sonstige Person' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', title: 'Name oder Bezeichnung', description: 'Zum Beispiel „Anna“ oder „Christopher Eschenbecher“', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'context', title: 'Angebot oder Anlass (optional)', description: 'Zum Beispiel „Lernbegleitung“ oder „Yoga-Retreat“', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', sourceType: 'sourceType', context: 'context' },
    prepare: ({ title, sourceType, context }) => ({ title, subtitle: [sourceType, context].filter(Boolean).join(' · ') }),
  },
});
