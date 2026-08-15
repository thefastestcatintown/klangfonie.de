import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Name der Website', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'defaultSeoTitle', title: 'Standardtitel für Suchmaschinen', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'defaultSeoDescription', title: 'Standardbeschreibung für Suchmaschinen', type: 'text', rows: 3, validation: (rule) => rule.required().max(170) }),
    defineField({ name: 'email', title: 'E-Mail-Adresse', type: 'string', validation: (rule) => rule.required().email() }),
    defineField({ name: 'phone', title: 'Telefon (optional)', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram-URL (optional)', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube-URL (optional)', type: 'url' }),
    defineField({ name: 'location', title: 'Ort / Region (optional)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Website-Einstellungen' }) },
});
