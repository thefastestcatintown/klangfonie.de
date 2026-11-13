import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

const pageCopyDocument = (S: any, title: string, pageId: string) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType('pageCopy').documentId(`pageCopy-${pageId}`).title(title));

const serviceDocument = (S: any, title: string, slug: string) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType('service').documentId(`service-${slug}`).title(title));

export default defineConfig({
  name: 'klangfonia',
  title: 'Klangfonia Inhalte',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Startseite')
              .child(
                S.list()
                  .title('Startseite')
                  .items([
                    S.listItem()
                      .title('Überschrift & Einleitung')
                      .child(S.document().schemaType('homePage').documentId('homePage').title('Überschrift & Einleitung')),
                    pageCopyDocument(S, 'Weitere Texte', 'home'),
                  ]),
              ),
            S.listItem()
              .title('Lernbegleitung')
              .child(
                S.list()
                  .title('Lernbegleitung')
                  .items([
                    pageCopyDocument(S, 'Texte', 'unterricht'),
                    serviceDocument(S, 'Bild, Dauer & Preis', 'unterricht'),
                  ]),
              ),
            pageCopyDocument(S, 'Workshops', 'workshops'),
            pageCopyDocument(S, 'Handpan Big Band', 'ensemble'),
            S.listItem()
              .title('Retreats & Handpan')
              .child(
                S.list()
                  .title('Retreats & Handpan')
                  .items([
                    pageCopyDocument(S, 'Texte', 'yoga'),
                    serviceDocument(S, 'Bild, Dauer & Preis', 'yoga'),
                  ]),
              ),
            S.listItem()
              .title('Live-Musik')
              .child(
                S.list()
                  .title('Live-Musik')
                  .items([
                    pageCopyDocument(S, 'Texte', 'live'),
                    serviceDocument(S, 'Bild', 'live'),
                    S.listItem()
                      .title('Musikvideo')
                      .child(S.document().schemaType('video').documentId('video-featured').title('Musikvideo')),
                  ]),
              ),
            S.documentTypeListItem('event').title('Konzerte & Termine'),
            S.listItem()
              .title('Über Daniela')
              .child(
                S.list()
                  .title('Über Daniela')
                  .items([
                    pageCopyDocument(S, 'Intention', 'about-intention'),
                    pageCopyDocument(S, 'Geschichte', 'about-story'),
                    S.listItem()
                      .title('Berufliche & musikalische Stationen')
                      .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('Stationen')),
                  ]),
              ),
            S.documentTypeListItem('testimonial').title('Bewertungen & Stimmen'),
            pageCopyDocument(S, 'Kontakt', 'contact'),
            pageCopyDocument(S, 'Selbsteinschätzung', 'self-assessment'),
            S.divider(),
            S.listItem()
              .title('Weitere Einstellungen')
              .child(
                S.list()
                  .title('Weitere Einstellungen')
                  .items([
                    pageCopyDocument(S, 'Navigation & allgemeine Hinweise', 'global'),
                    S.listItem()
                      .title('Kontaktdaten & Suchmaschinen')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Kontaktdaten & Suchmaschinen')),
                  ]),
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((item) => ['event', 'testimonial'].includes(item.templateId)),
  },
});
