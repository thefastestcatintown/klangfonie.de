import { getCliClient } from 'sanity/cli';
import { pageCopyDefaults } from '../src/content/page-copy-defaults';

const client = getCliClient({ apiVersion: '2026-03-01' });
const affected: Record<string, string[]> = {
  unterricht: ['title', 'intro', 'body'],
  ensemble: ['title', 'intro'],
  workshops: ['beginnerEyebrow', 'beginnerIntro', 'beginnerDetails', 'advancedEyebrow', 'advancedIntro', 'advancedDetails'],
  live: ['title', 'body'],
};

for (const [pageId, keys] of Object.entries(affected)) {
  const documentId = `pageCopy-${pageId}`;
  const document = await client.getDocument<{ _rev: string; entries?: Array<{ key?: string; de?: string; en?: string }> }>(documentId);
  if (!document) throw new Error(`Sanity-Dokument fehlt: ${documentId}`);

  const entries = (document.entries || []).map((entry) => keys.includes(entry.key || '')
    ? {
        ...entry,
        de: pageCopyDefaults[pageId].de[entry.key as string],
        en: pageCopyDefaults[pageId].en[entry.key as string],
      }
    : entry);

  await client.patch(documentId).ifRevisionId(document._rev).set({ entries }).commit();
  console.log(`ODT-Texte aktualisiert: ${pageId} (${keys.length})`);
}
