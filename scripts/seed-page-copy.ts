import { getCliClient } from 'sanity/cli';
import { pageCopyDefaults } from '../src/content/page-copy-defaults';

const client = getCliClient({ apiVersion: '2026-03-01' });

if (process.env.CONFIRM_PAGE_COPY_RESET !== 'yes') {
  throw new Error('Abbruch: Dieses Migrationsskript überschreibt Seitentexte. Nur mit CONFIRM_PAGE_COPY_RESET=yes ausführen.');
}

function labelFor(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase());
}

for (const [pageId, localized] of Object.entries(pageCopyDefaults)) {
  const keys = [...new Set([...Object.keys(localized.de), ...Object.keys(localized.en)])];
  const entries = keys.map((key) => ({
    _type: 'copyEntry',
    _key: key.replace(/[^a-zA-Z0-9_-]/g, '-'),
    key,
    label: labelFor(key),
    de: localized.de[key] || localized.en[key] || '',
    en: localized.en[key] || '',
  }));
  await client.createOrReplace({
    _id: `pageCopy-${pageId}`,
    _type: 'pageCopy',
    pageId,
    entries,
  });
  console.log(`Seitentexte aktualisiert: ${pageId} (${entries.length})`);
}
