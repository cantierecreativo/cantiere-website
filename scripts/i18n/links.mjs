// Rewrites internal links inside EN content so they point to EN pages (e.g. /servizi/ecommerce -> /en/services/ecommerce).
// Only the EN locale is touched; EN blocks are updated in place (same ids). IT links are left as they are.
// Usage: bun run i18n:links [-- --dry-run] [-- --ids=1,2]
import fs from "fs";
import { ApiError, buildBlockRecord } from "@datocms/cma-client-node";
import { MODELS, getClient, parseArgs } from "./lib.mjs";

const { ids, dryRun } = parseArgs();
const { client, repo, environment } = getClient();
const legacy = JSON.parse(fs.readFileSync("redirects/legacy-map.json", "utf8"));

// IT segment -> [EN segment, model whose slug follows]. Keep in sync with next.config.js rewrites.
const SECTIONS = {
  servizi: ["services", "service"],
  soluzioni: ["solutions", "solution"],
  tecnologie: ["technologies", "technology"],
  metodo: ["methods", "method"],
  settori: ["industries", "company_service"],
  "case-studies": ["case-studies", "case_study"],
  portfolio: ["portfolio", "work"],
  blog: ["blog", "article"],
};
const STATIC = {
  "/": "/en",
  "/chi-siamo": "/en/about",
  "/chi-siamo/team": "/en/about/team",
  "/chi-siamo/offerte-lavoro": "/en/about/job-positions",
  "/contatti": "/en/contact-us",
  "/partners": "/en/partners",
  "/lab": "/en/lab",
  "/lab/atlante-uffizi": "/en/lab/uffizi-atlas",
  "/lab/configuratore-sedute-3d": "/en/lab/3d-seating-configurator",
};
const SITE = /^(https?:\/\/(?:www\.)?cantierecreativo\.net)(\/.*)?$/;

// Load every in-scope record once (current version, nested blocks).
const records = [];
for (const type of [...MODELS, "article"]) {
  for await (const r of client.items.listPagedIterator({ filter: { type }, nested: true, version: "current" }, { perPage: 30, concurrency: 3 })) {
    records.push({ type, record: r });
  }
}
const enSlug = {}; // `${model}:${itSlug}` -> enSlug
for (const { type, record } of records) {
  if (record.slug?.it && record.slug?.en) enSlug[`${type}:${record.slug.it}`] = record.slug.en;
}

// Apply the legacy redirect map to an IT path (same matching as next.config.js, enough for these patterns).
function resolveLegacy(path) {
  for (const { source, destination } of legacy) {
    const names = [];
    const re = new RegExp(
      "^" + source.replace(/:(\w+)(\([^)]*\))?/g, (_, n, p) => (names.push(n), p ?? "([^/]+)")) + "$"
    );
    const m = path.match(re);
    if (m) return destination.replace(/:(\w+)/g, (_, n) => m[names.indexOf(n) + 1]);
  }
  return path;
}

// IT path -> EN path, or null when there is no EN page to point to.
function toEnPath(rawPath) {
  // "/it/..." is the explicit default-locale form of an IT path.
  const path = resolveLegacy(rawPath.replace(/\/+$/, "").replace(/^\/it(?=\/|$)/, "") || "/");
  if (path === "/en" || path.startsWith("/en/")) return null;
  if (STATIC[path]) return STATIC[path];
  const segs = path.split("/").slice(1);
  if (segs[0] === "blog" && segs[1] === "tags" && segs.length === 3) return `/en${path}`;
  if (segs.length === 1 && SECTIONS[segs[0]]) return `/en/${SECTIONS[segs[0]][0]}`;
  if (segs.length === 2 && SECTIONS[segs[0]]) {
    const [enSeg, model] = SECTIONS[segs[0]];
    const slug = enSlug[`${model}:${segs[1]}`];
    return slug ? `/en/${enSeg}/${slug}` : null;
  }
  if (segs.length === 3 && segs[0] === "chi-siamo" && segs[1] === "offerte-lavoro") {
    const slug = enSlug[`job:${segs[2]}`];
    return slug ? `/en/about/job-positions/${slug}` : null;
  }
  if (segs.length === 1 && enSlug[`landing_page:${segs[0]}`]) return `/en/${enSlug[`landing_page:${segs[0]}`]}`;
  return null;
}

const changes = [];
const unmapped = new Set();

// Rewrites one URL if it is an internal IT link; returns it unchanged otherwise.
function fixUrl(url) {
  const m = url.match(/^([^?#]*)([?#].*)?$/);
  let [, base, rest = ""] = m;
  let host = "";
  const site = base.match(SITE);
  if (site) [, host, base = "/"] = site;
  if (!base.startsWith("/") || base.startsWith("//")) return url;
  if (/\.(xml|jpe?g|png|gif|svg|pdf|webp)$/i.test(base)) return url;
  const en = toEnPath(base);
  if (!en) {
    if (!base.startsWith("/en")) unmapped.add(base);
    return url;
  }
  return host + en + rest;
}

const fixString = (s) =>
  /^\s*(https?:\/\/|\/)\S*\s*$/.test(s)
    ? fixUrl(s.trim())
    : s.replace(/href="([^"]*)"/g, (_, url) => `href="${fixUrl(url)}"`);

// Returns { changed, value } where value is the request-shaped EN value.
async function fixValue(type, value, where) {
  if (value == null) return { changed: false, value };
  if (type === "string" || type === "text") {
    const v = fixString(value);
    if (v !== value) changes.push(`${where}: ${value.length > 120 ? "…" : value} -> ${v.length > 120 ? "…" : v}`);
    return { changed: v !== value, value: v };
  }
  if (type === "rich_text") {
    let changed = false;
    const out = [];
    for (const [i, b] of value.entries()) {
      const r = await fixBlock(b, `${where}.${i}`);
      changed ||= r.changed;
      out.push(r.changed ? r.value : b.id);
    }
    return { changed, value: out };
  }
  if (type === "single_block") {
    const r = await fixBlock(value, where);
    return { changed: r.changed, value: r.changed ? r.value : value.id };
  }
  if (type === "structured_text") {
    let changed = false;
    const doc = structuredClone(value);
    const walk = async (node, path) => {
      if (node.type === "link" && node.url) {
        const u = fixUrl(node.url);
        if (u !== node.url) changes.push(`${where}${path}: ${node.url} -> ${u}`), (node.url = u), (changed = true);
      }
      if ((node.type === "block" || node.type === "inlineBlock") && typeof node.item === "object") {
        const r = await fixBlock(node.item, `${where}${path}`);
        changed ||= r.changed;
        node.item = r.changed ? r.value : node.item.id;
      }
      for (const [i, c] of (node.children ?? []).entries()) await walk(c, `${path}.${i}`);
    };
    await walk(doc.document, "");
    return { changed, value: doc };
  }
  return { changed: false, value };
}

async function fixBlock(block, where) {
  const fields = await repo.getRawItemTypeFields(await repo.getRawItemTypeById(block.relationships.item_type.data.id));
  const attrs = {};
  for (const f of fields) {
    const k = f.attributes.api_key;
    const r = await fixValue(f.attributes.field_type, block.attributes[k], `${where}.${k}`);
    if (r.changed) attrs[k] = r.value;
  }
  return Object.keys(attrs).length ? { changed: true, value: buildBlockRecord({ id: block.id, ...attrs }) } : { changed: false };
}

// IT value in request shape: blocks by id.
function itRequest(type, value) {
  if (value == null) return value;
  if (type === "rich_text") return value.map((b) => b.id);
  if (type === "single_block") return value.id;
  if (type === "structured_text") {
    const doc = structuredClone(value);
    const walk = (n) => {
      if ((n.type === "block" || n.type === "inlineBlock") && typeof n.item === "object") n.item = n.item.id;
      (n.children ?? []).forEach(walk);
    };
    walk(doc.document);
    return doc;
  }
  return value;
}

console.info(`${dryRun ? "Checking" : "Fixing"} EN links in ${records.length} records on environment "${environment}"`);
const counts = {};
for (const { type, record } of records) {
  if (ids && !ids.has(record.id)) continue;
  if (record.meta.status === "draft") continue;
  const fields = await repo.getRawItemTypeFields(await repo.getRawItemTypeById(record.item_type.id));
  const payload = {};
  for (const f of fields.filter((f) => f.attributes.localized)) {
    const { api_key: k, field_type: t } = f.attributes;
    const r = await fixValue(t, record[k]?.en, `${type} ${record.id} ${k}`);
    if (r.changed) payload[k] = { ...record[k], it: itRequest(t, record[k]?.it), en: r.value };
  }
  if (!Object.keys(payload).length) continue;
  if (dryRun) {
    counts.toFix = (counts.toFix ?? 0) + 1;
    continue;
  }
  try {
    await client.items.update(record.id, { ...payload, meta: { current_version: record.meta.current_version } });
    const itemType = await repo.getRawItemTypeById(record.item_type.id);
    if (itemType.attributes.draft_mode_active && record.meta.status === "published") await client.items.publish(record.id);
    if (record.meta.status === "updated") console.warn(`not published (pending IT draft): ${type} ${record.id}`);
    counts.fixed = (counts.fixed ?? 0) + 1;
  } catch (e) {
    counts.failed = (counts.failed ?? 0) + 1;
    console.error(`FAILED ${type} ${record.id}: ${e instanceof ApiError ? JSON.stringify(e.errors) : e}`);
  }
}
changes.forEach((c) => console.info(c));
if (unmapped.size) console.info(`Internal links without an EN page (left unchanged): ${[...unmapped].sort().join(", ")}`);
console.info("Done:", counts, `${changes.length} links rewritten`);
if (counts.failed) process.exitCode = 1;
