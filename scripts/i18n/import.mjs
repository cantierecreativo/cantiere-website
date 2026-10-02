// Writes the EN locale of every exported record: a copy of the IT value with translated strings applied.
// IT is sent back unchanged (blocks by id); the previous EN content and EN blocks are replaced.
// Usage:
//   bun run i18n:import -- --ids 1,2,3 --dry-run   validate only, no writes
//   bun run i18n:import -- --ids 1,2,3             pilot
//   bun run i18n:import                            everything not imported yet (--force to redo)
//   bun run i18n:import -- --verify                check published EN content
import fs from "fs";
import { ApiError } from "@datocms/cma-client-node";
import {
  FIXED_EN_SLUGS,
  IMPORTED_DIR,
  TRANSLATED_DIR,
  getClient,
  listExports,
  localizedPayload,
  parseArgs,
  readJson,
  slugify,
  writeJson,
} from "./lib.mjs";

const { ids, dryRun, force, verify } = parseArgs();
const { client, repo, environment } = getClient();
const exports = listExports().map(({ data }) => data);

// EN slugs already taken, per model, to keep generated slugs unique.
const takenSlugs = {};
for (const x of exports) {
  takenSlugs[x.model] ??= new Map();
  if (x.existingEnSlug) takenSlugs[x.model].set(x.existingEnSlug, x.id);
}

function enSlug(x, translated) {
  if (FIXED_EN_SLUGS[x.model]) return FIXED_EN_SLUGS[x.model];
  if (x.existingEnSlug) return x.existingEnSlug;
  const source = translated.title ?? x.record.title?.it ?? x.record.slug?.it;
  if (!source) return null;
  const base = slugify(source);
  const taken = takenSlugs[x.model];
  let slug = base;
  for (let n = 2; taken.has(slug) && taken.get(slug) !== x.id; n++) slug = `${base}-${n}`;
  taken.set(slug, x.id);
  return slug;
}

async function buildPayload(x, translated) {
  const itemType = await repo.getRawItemTypeById(x.itemTypeId);
  const fields = await repo.getRawItemTypeFields(itemType);
  const payload = await localizedPayload(x.record, fields, translated, repo, () => enSlug(x, translated));
  payload.meta = { current_version: x.meta.current_version };
  return { payload, draftMode: itemType.attributes.draft_mode_active };
}

async function importOne(x) {
  const translatedFile = `${TRANSLATED_DIR}/${x.id}.json`;
  const hasStrings = Object.keys(x.strings).length > 0;
  if (hasStrings && !fs.existsSync(translatedFile)) return "untranslated";
  const translated = hasStrings ? readJson(translatedFile).strings : {};
  const { payload, draftMode } = await buildPayload(x, translated);

  if (dryRun) {
    await client.items.validateExisting(x.id, payload);
    const size = Buffer.byteLength(JSON.stringify(payload));
    console.info(`valid ${x.model} ${x.id} ${Math.round(size / 1024)}KB  title: "${x.record.title?.en ?? ""}" -> "${payload.title?.en ?? ""}"`);
    return "valid";
  }

  await client.items.update(x.id, payload);
  const publish = draftMode && x.meta.status === "published";
  if (publish) await client.items.publish(x.id);
  writeJson(`${IMPORTED_DIR}/${x.id}.json`, { at: new Date().toISOString(), published: publish });
  if (draftMode && !publish) console.warn(`not published (status was "${x.meta.status}"): ${x.model} ${x.id}`);
  console.info(`imported ${x.model} ${x.id}${publish ? " + published" : ""}`);
  return "imported";
}

async function runVerify() {
  const problems = [];
  const byModel = {};
  for (const x of exports) (byModel[x.model] ??= []).push(x);
  for (const [model, list] of Object.entries(byModel)) {
    const seen = new Map();
    for (let i = 0; i < list.length; i += 100) {
      const batch = list.slice(i, i + 100);
      const records = await client.items.list({ filter: { ids: batch.map((x) => x.id).join(",") }, version: "published" });
      for (const rec of records) {
        const x = batch.find((b) => b.id === rec.id);
        for (const key of Object.keys(x.strings).filter((k) => !k.includes("."))) {
          if (!rec[key]?.en?.trim()) problems.push(`${model} ${rec.id}: empty EN ${key}`);
        }
        const slug = rec.slug?.en;
        if (rec.slug && rec.slug.it && !slug) problems.push(`${model} ${rec.id}: empty EN slug`);
        if (slug && seen.has(slug)) problems.push(`${model} ${rec.id}: EN slug "${slug}" also used by ${seen.get(slug)}`);
        if (slug) seen.set(slug, rec.id);
      }
    }
  }
  problems.forEach((p) => console.error(p));
  console.info(problems.length ? `${problems.length} problems` : "Verify OK: published EN content complete");
  if (problems.length) process.exitCode = 1;
}

if (verify) {
  await runVerify();
} else {
  const todo = exports
    .filter((x) => !ids || ids.has(x.id))
    .filter((x) => dryRun || force || !fs.existsSync(`${IMPORTED_DIR}/${x.id}.json`));
  console.info(`${dryRun ? "Validating" : "Importing"} ${todo.length} records on environment "${environment}"`);
  const counts = {};
  for (const x of todo) {
    let result;
    try {
      result = await importOne(x);
    } catch (e) {
      if (e instanceof ApiError && e.findError("STALE_ITEM_VERSION")) {
        result = "stale";
        console.error(`STALE ${x.model} ${x.id}: changed in the CMS after export, re-export it`);
      } else {
        result = "failed";
        console.error(`FAILED ${x.model} ${x.id}: ${e instanceof ApiError ? JSON.stringify(e.errors) : e}`);
      }
    }
    if (result === "untranslated") console.warn(`skipped ${x.model} ${x.id}: no translation file`);
    counts[result] = (counts[result] ?? 0) + 1;
  }
  console.info("Done:", counts);
  if (counts.failed || counts.stale) process.exitCode = 1;
}
