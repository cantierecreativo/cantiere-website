// Read-only. Dumps every in-scope record (all locales, nested blocks) to scripts/i18n/data/export/<model>/<id>.json.
// The dump is the backup to restore from, and the source of the strings to translate.
// Usage: bun run i18n:export [-- --models=article --ids=1,2]  (default: every model in MODELS)
import { EXPORT_DIR, MODELS, collectStrings, getClient, parseArgs, uploadDefaultsLoader, writeJson } from "./lib.mjs";

const { models, ids } = parseArgs();
const { client, repo, environment } = getClient();
const uploadDefaults = uploadDefaultsLoader(client);
console.info(`Exporting from environment "${environment}"`);

let totalRecords = 0;
let totalChars = 0;
for (const apiKey of models ?? MODELS) {
  const itemType = await repo.getItemTypeByApiKey(apiKey);
  const fields = await repo.getRawItemTypeFields(itemType);
  let count = 0;
  let chars = 0;
  for await (const record of client.items.listPagedIterator(
    { filter: { type: apiKey, ...(ids && { ids: [...ids].join(",") }) }, nested: true, version: "current" },
    { perPage: 30, concurrency: 3 }
  )) {
    const strings = await collectStrings(record, fields, repo, uploadDefaults);
    writeJson(`${EXPORT_DIR}/${apiKey}/${record.id}.json`, {
      id: record.id,
      model: apiKey,
      itemTypeId: itemType.id,
      meta: record.meta,
      existingEnSlug: record.slug?.en ?? null,
      strings,
      record,
    });
    count++;
    chars += Object.values(strings).join("").length;
  }
  totalRecords += count;
  totalChars += chars;
  console.info(`${apiKey}: ${count} records, ${chars} chars to translate`);
}
console.info(`Done: ${totalRecords} records, ${totalChars} chars. Files in ${EXPORT_DIR}`);
