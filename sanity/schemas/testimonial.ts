import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Stimmen',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Zitat', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'context', title: 'Kontext (optional)', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Reihenfolge', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'context' } },
});
