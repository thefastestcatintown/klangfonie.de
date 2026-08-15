import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'klangfonie',
  title: 'Klangfonie Inhalte',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem().title('Startseite').child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('Über Daniela').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('Website-Einstellungen').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !['homePage', 'aboutPage', 'siteSettings'].includes(item.getId() || '')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
