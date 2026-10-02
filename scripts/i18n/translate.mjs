// Translates the exported IT strings to EN with the Claude API.
// One file per record in scripts/i18n/data/translated/<id>.json; existing files are skipped (resume) unless --force.
// Usage: bun run i18n:translate [-- --ids 1,2,3] [-- --force]
import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { TRANSLATED_DIR, listExports, parseArgs, writeJson } from "./lib.mjs";

const MODEL = process.env.TRANSLATE_MODEL || "claude-opus-5-5";
const CHUNK_CHARS = 40_000;
const CONCURRENCY = 3;

const SYSTEM = `You translate website content from Italian to US English for Cantiere Creativo, an Italian web agency (Florence) that builds fast websites and digital products with DatoCMS, Jamstack, headless CMS, Next.js and Astro.

Write natural, confident, concise B2B marketing copy, as a native English copywriter would. Do not translate literally.

Input: a JSON array of {key, text}. Return every key exactly once with its translated text.

Rules:
- Values may be HTML fragments. Keep the same semantic structure and tags (p, h1-h6, ul, ol, li, a, strong, em, b, i, br, blockquote, img) and keep href and src attributes unchanged. Translate only the visible text.
- Clean editor leftovers: drop data-* attributes, class, style and id attributes, and unwrap span or div elements that only carried them. Never add new wrappers. Decode nothing and add no Markdown.
- Never change URLs, paths, anchors, email addresses, phone numbers, code, numbers or {{placeholders}}.
- Keep brand and product names as they are: Cantiere Creativo, DatoCMS, Jamstack, Next.js, Astro, Netlify, Vercel, Supabase, Shopify, Snipcart, Mux, Tailwind, headless CMS, composable. Keep names of people, customers and projects untranslated.
- Fixed terms: Servizi = Services, Soluzioni = Solutions, Settori = Industries, Metodo = Our method, Chi siamo = About us, Case study = Case studies, Offerte di lavoro = Careers, Contatti = Contact, Tecnologie = Technologies, Portfolio = Portfolio.
- Keys containing "label", "cta" or "prefix" are short UI labels: at most 3 words, no trailing period.
- A key ending in "seo.title" must stay under 60 characters; a key ending in "seo.description" under 155 characters.
- If a value is already in English or has nothing to translate, return it unchanged.`;

const Output = z.object({ items: z.array(z.object({ key: z.string(), text: z.string() })) });

const anthropic = new Anthropic();
const { ids, force } = parseArgs();

function chunks(entries) {
  const out = [[]];
  let size = 0;
  for (const e of entries) {
    if (size + e[1].length > CHUNK_CHARS && out.at(-1).length) {
      out.push([]);
      size = 0;
    }
    out.at(-1).push(e);
    size += e[1].length;
  }
  return out;
}

async function translateChunk(model, entries, hint) {
  const res = await anthropic.messages.parse({
    model: MODEL,
    max_tokens: 32000,
    system: SYSTEM,
    output_config: { effort: "low", format: zodOutputFormat(Output) },
    messages: [
      {
        role: "user",
        content: `Content type: ${model}.${hint ? ` Previous attempt was rejected: ${hint}` : ""}\n${JSON.stringify(entries.map(([key, text]) => ({ key, text })))}`,
      },
    ],
  });
  if (res.stop_reason === "refusal") throw new Error(`refusal (${res.stop_details?.category ?? "unknown"})`);
  if (res.stop_reason === "max_tokens") throw new Error("output truncated (max_tokens)");
  const out = Object.fromEntries(res.parsed_output.items.map((i) => [i.key, i.text]));
  const missing = entries.filter(([k, v]) => !out[k]?.trim() && v.trim()).map(([k]) => k);
  const extra = Object.keys(out).filter((k) => !entries.some(([ek]) => ek === k));
  if (missing.length || extra.length) throw new Error(`missing keys: ${missing.join(", ")}; unexpected keys: ${extra.join(", ")}`);
  return out;
}

async function translateRecord({ id, model, strings }) {
  const translated = {};
  for (const part of chunks(Object.entries(strings))) {
    try {
      Object.assign(translated, await translateChunk(model, part));
    } catch (e) {
      if (e instanceof Anthropic.APIError) throw e;
      Object.assign(translated, await translateChunk(model, part, e.message));
    }
  }
  writeJson(`${TRANSLATED_DIR}/${id}.json`, { id, model, llm: MODEL, strings: translated });
  fs.rmSync(`${TRANSLATED_DIR}/${id}.error.json`, { force: true });
}

const todo = listExports()
  .map(({ data }) => data)
  .filter((r) => Object.keys(r.strings).length)
  .filter((r) => !ids || ids.has(r.id))
  .filter((r) => force || !fs.existsSync(`${TRANSLATED_DIR}/${r.id}.json`));

console.info(`Translating ${todo.length} records with ${MODEL}`);
let done = 0;
let failed = 0;
for (let i = 0; i < todo.length; i += CONCURRENCY) {
  await Promise.all(
    todo.slice(i, i + CONCURRENCY).map(async (r) => {
      try {
        await translateRecord(r);
        done++;
        console.info(`ok ${r.model} ${r.id} (${done}/${todo.length})`);
      } catch (e) {
        failed++;
        writeJson(`${TRANSLATED_DIR}/${r.id}.error.json`, { id: r.id, model: r.model, error: String(e) });
        console.error(`FAILED ${r.model} ${r.id}: ${e}`);
      }
    })
  );
}
console.info(`Done: ${done} translated, ${failed} failed`);
if (failed) process.exitCode = 1;
