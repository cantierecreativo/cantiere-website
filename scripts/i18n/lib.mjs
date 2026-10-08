// Shared helpers for the IT -> EN content translation pipeline (export -> translate -> import).
// See scripts/i18n/README.md for the run order.
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import {
  buildClient,
  duplicateBlockRecord,
  SchemaRepository,
} from "@datocms/cma-client-node";

dotenv.config({ path: ".env.local" });

export const DATA_DIR = "scripts/i18n/data";
export const EXPORT_DIR = `${DATA_DIR}/export`;
export const TRANSLATED_DIR = `${DATA_DIR}/translated`;
export const IMPORTED_DIR = `${DATA_DIR}/imported`;

// Public-site models only. Blog (article), intranet, guidelines and glossary are out of scope.
// menu / footer_menu entries are blocks (menu_item, menu_group), so they are handled like any other block.
export const MODELS = [
  "homepage",
  "about_index",
  "articles_index",
  "article_tags_index",
  "case_studies_index",
  "contacts_index",
  "events_index",
  "jobs_index",
  "methods_index",
  "partners_index",
  "products_index",
  "services_index",
  "services_company_index",
  "solutions_index",
  "team_index",
  "technologies_index",
  "works_index",
  "service",
  "solution",
  "technology",
  "method",
  "company_service",
  "case_study",
  "work",
  "team_member",
  "landing_page",
  "styled_landing_page",
  "internal_link",
  "menu",
  "footer_menu",
];

// The frontend builds these URLs from page.slug, so the EN slug must match labels.json.
export const FIXED_EN_SLUGS = {
  about_index: "about",
  partners_index: "partners",
  contacts_index: "contact-us",
  methods_index: "methods",
  jobs_index: "job-positions",
};

// Never translated, whatever their type: identifiers, URLs, person and customer names.
const DENY = new Set([
  "slug",
  "link_url",
  "url",
  "src",
  "link",
  "anchor",
  "number",
  "email",
  "embed_type",
  "author",
  "name",
  "github_id",
  "twitter_id",
  "linkedin_url",
  "url_website",
]);

const isUrlish = (s) =>
  /^(https?:\/\/|mailto:|tel:|\/|#)\S*$/.test(s) || /^\S+@\S+\.\S+$/.test(s);

export function getClient() {
  const environment = process.env.NEXT_PUBLIC_DATO_ENV;
  const apiToken = process.env.DATOCMS_CMA_TOKEN;
  if (!environment) throw new Error("NEXT_PUBLIC_DATO_ENV is empty: refusing to touch the primary environment");
  if (!apiToken) throw new Error("DATOCMS_CMA_TOKEN is missing in .env.local");
  const client = buildClient({ apiToken, environment });
  return { client, repo: new SchemaRepository(client), environment };
}

// Default alt/title of an asset, used when a file field has no alt/title of its own.
// The `required_alt_title` validator falls back to these per locale, and they mostly exist only in IT.
export function uploadDefaultsLoader(client) {
  const cache = new Map();
  return (uploadId) => {
    if (!cache.has(uploadId)) {
      cache.set(
        uploadId,
        client.uploads.find(uploadId).then(({ default_field_metadata: m }) => ({
          alt: m.alt?.it || null,
          title: m.title?.it || null,
        }))
      );
    }
    return cache.get(uploadId);
  };
}

async function fileStrings(file, basePath, uploadDefaults, put) {
  const defaults = file.alt && file.title ? {} : await uploadDefaults(file.upload_id);
  put([...basePath, "alt"], file.alt || defaults.alt);
  put([...basePath, "title"], file.title || defaults.title);
}

// Collects every translatable string of a field value into `out`, keyed by its dotted path.
async function collectValue(field, value, basePath, repo, uploadDefaults, out) {
  const { api_key: apiKey, field_type: type, validators } = field.attributes;
  if (value == null || DENY.has(apiKey)) return;
  const put = (p, s) => {
    if (typeof s === "string" && s.trim() && !isUrlish(s.trim())) out[p.join(".")] = s;
  };

  switch (type) {
    case "string":
    case "text":
      if (!validators?.enum) put(basePath, value);
      break;
    case "seo":
      put([...basePath, "title"], value.title);
      put([...basePath, "description"], value.description);
      break;
    case "file":
      await fileStrings(value, basePath, uploadDefaults, put);
      break;
    case "gallery":
      for (const [i, file] of value.entries()) await fileStrings(file, [...basePath, i], uploadDefaults, put);
      break;
    case "rich_text":
      for (const [i, block] of value.entries()) await collectBlock(block, [...basePath, i], repo, uploadDefaults, out);
      break;
    case "single_block":
      await collectBlock(value, basePath, repo, uploadDefaults, out);
      break;
    case "structured_text":
      await collectDast(value.document, [...basePath, "document"], repo, uploadDefaults, put, out);
      break;
    default:
      break;
  }
}

// Block fields are never localized: every string/text field of the block is collected, recursively.
async function collectBlock(block, basePath, repo, uploadDefaults, out) {
  if (typeof block === "string") throw new Error(`Block at ${basePath.join(".")} is not nested: export with nested: true`);
  const blockType = await repo.getRawItemTypeById(block.relationships.item_type.data.id);
  for (const bf of await repo.getRawItemTypeFields(blockType)) {
    const key = bf.attributes.api_key;
    await collectValue(bf, block.attributes[key], [...basePath, "attributes", key], repo, uploadDefaults, out);
  }
}

// Structured text: every span is a string to translate; blocks inside it are collected like any other block.
// Spans of the same paragraph get consecutive keys, so the translator sees them in order.
async function collectDast(node, path, repo, uploadDefaults, put, out) {
  if (node.type === "span") put([...path, "value"], node.value);
  // Link titles (tooltip / accessible description) live in the link's meta.
  if ((node.type === "link" || node.type === "itemLink") && node.meta) {
    node.meta.forEach((m, i) => m.id === "title" && put([...path, "meta", i, "value"], m.value));
  }
  if ((node.type === "block" || node.type === "inlineBlock") && node.item) {
    await collectBlock(node.item, [...path, "item"], repo, uploadDefaults, out);
  }
  for (const [i, child] of (node.children ?? []).entries()) {
    await collectDast(child, [...path, "children", i], repo, uploadDefaults, put, out);
  }
}

// Copy of a structured text value with every block replaced by mapBlock(block).
async function mapDastBlocks(value, mapBlock) {
  const copy = structuredClone(value);
  const walk = async (node) => {
    if ((node.type === "block" || node.type === "inlineBlock") && typeof node.item === "object") node.item = await mapBlock(node.item);
    for (const child of node.children ?? []) await walk(child);
  };
  await walk(copy.document);
  return copy;
}

// Returns { "<path>": "<it text>" } for all localized fields of a nested record.
export async function collectStrings(record, fields, repo, uploadDefaults) {
  const out = {};
  for (const field of fields) {
    if (!field.attributes.localized) continue;
    const apiKey = field.attributes.api_key;
    await collectValue(field, record[apiKey]?.it, [apiKey], repo, uploadDefaults, out);
  }
  return out;
}

// "main_blocks.0.attributes.title" -> ["main_blocks", 0, "attributes", "title"]
const splitPath = (key) => key.split(".").map((s) => (/^\d+$/.test(s) ? Number(s) : s));

// Update payload for every localized field: IT unchanged (blocks by id), EN = copy of IT with translations applied.
// Old EN values and EN blocks are not carried over, so DatoCMS replaces them.
export async function localizedPayload(record, fields, translated, repo, slugFor) {
  const payload = {};
  for (const field of fields) {
    if (!field.attributes.localized) continue;
    const { api_key: k, field_type: type } = field.attributes;
    const itVal = record[k]?.it ?? null;
    let it = itVal;
    let en;
    if (itVal == null) {
      en = null;
    } else if (type === "rich_text") {
      it = itVal.map((b) => b.id);
      // duplicateBlockRecord mutates its input: always clone.
      en = await Promise.all(itVal.map((b) => duplicateBlockRecord(structuredClone(b), repo)));
    } else if (type === "single_block") {
      it = itVal.id;
      en = await duplicateBlockRecord(structuredClone(itVal), repo);
    } else if (type === "structured_text") {
      it = await mapDastBlocks(itVal, (b) => b.id);
      en = await mapDastBlocks(itVal, (b) => duplicateBlockRecord(structuredClone(b), repo));
    } else if (type === "slug") {
      en = slugFor();
    } else {
      en = structuredClone(itVal);
    }
    payload[k] = { it, en };
  }
  for (const [key, text] of Object.entries(translated)) {
    const [field, ...rest] = splitPath(key);
    if (rest.length) setPath(payload[field].en, rest, text);
    else payload[field].en = text;
  }
  return payload;
}

function setPath(obj, keys, value) {
  let cur = obj;
  for (const k of keys.slice(0, -1)) {
    if (cur[k] == null) throw new Error(`Path ${keys.join(".")} not found`);
    cur = cur[k];
  }
  cur[keys.at(-1)] = value;
}

export const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// All exported records: [{ file, data }]
export function listExports() {
  if (!fs.existsSync(EXPORT_DIR)) throw new Error(`${EXPORT_DIR} not found: run "bun run i18n:export" first (it is also the backup)`);
  return fs
    .readdirSync(EXPORT_DIR)
    .flatMap((model) =>
      fs.readdirSync(`${EXPORT_DIR}/${model}`).map((f) => `${EXPORT_DIR}/${model}/${f}`)
    )
    .map((file) => ({ file, data: readJson(file) }));
}

// --ids a,b,c  --dry-run  --force
export function parseArgs(argv = process.argv.slice(2)) {
  const idsArg = argv.find((a) => a.startsWith("--ids="))?.split("=")[1] ?? argv[argv.indexOf("--ids") + 1];
  return {
    ids: argv.includes("--ids") || argv.some((a) => a.startsWith("--ids=")) ? new Set(idsArg.split(",")) : null,
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    verify: argv.includes("--verify"),
    models: argv.find((a) => a.startsWith("--models="))?.split("=")[1].split(",") ?? null,
  };
}
