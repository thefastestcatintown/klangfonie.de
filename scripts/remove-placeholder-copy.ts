import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-11-06' });
const documentIds = ['pageCopy-home', 'pageCopy-yoga'];
const placeholderKey = /^(testimonialsNote|example[123]|partners|partner[123])/;

const documents = await client.fetch<Array<{ _id: string; entries?: Array<{ key?: string }> }>>(
  '*[_id in $documentIds]{_id, entries}',
  { documentIds },
);

const transaction = documents.reduce((current, document) => {
  const entries = (document.entries || []).filter((entry) => !placeholderKey.test(entry.key || ''));
  return current.patch(document._id, { set: { entries } });
}, client.transaction());

if (documents.length > 0) await transaction.commit();

console.log(`Removed placeholder copy from ${documents.length} Sanity documents.`);
