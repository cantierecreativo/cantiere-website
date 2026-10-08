// Offline self-check: collected string paths must land on the same spots of the EN block copies.
// Run: bun run i18n:check
import assert from "assert/strict";
import { collectStrings, localizedPayload, slugify } from "./lib.mjs";

const f = (api_key, field_type, localized = false, validators = {}) => ({ attributes: { api_key, field_type, localized, validators } });
const types = {
  page: [f("title", "string", true), f("slug", "slug", true), f("seo", "seo", true), f("blocks", "rich_text", true), f("featured", "boolean", true)],
  cards_block: [f("title", "string"), f("cards", "rich_text")],
  card: [f("title", "string"), f("text", "text"), f("link_url", "string"), f("image", "file")],
};
const repo = {
  getRawItemTypeById: async (id) => ({ id }),
  getRawItemTypeFields: async ({ id }) => types[id],
};
const block = (id, type, attributes) => ({ id, type: "item", attributes, relationships: { item_type: { data: { id: type, type: "item_type" } } }, meta: {} });

const record = {
  title: { it: "Sviluppo web", en: "Old title" },
  slug: { it: "sviluppo-web", en: null },
  featured: { it: true, en: false },
  seo: { it: { title: "SEO it", description: "Desc it", image: "u1" }, en: null },
  blocks: {
    it: [
      block("b1", "cards_block", {
        title: "Le card",
        cards: [
          block("c1", "card", { title: "Card uno", text: "<p>Testo</p>", link_url: "https://x.it", image: { upload_id: "u2", alt: "Foto", title: null } }),
          block("c2", "card", { title: "", text: "/solo-un-path", link_url: null, image: null }),
        ],
      }),
    ],
    en: [block("old", "cards_block", { title: "Stale", cards: [] })],
  },
};

const uploadDefaults = async () => ({ alt: "Alt di default", title: "Titolo di default" });
const strings = await collectStrings(record, types.page, repo, uploadDefaults);
assert.deepEqual(Object.keys(strings).sort(), [
  "blocks.0.attributes.cards.0.attributes.image.alt",
  "blocks.0.attributes.cards.0.attributes.image.title",
  "blocks.0.attributes.cards.0.attributes.text",
  "blocks.0.attributes.cards.0.attributes.title",
  "blocks.0.attributes.title",
  "seo.description",
  "seo.title",
  "title",
]);

const translated = Object.fromEntries(Object.keys(strings).map((k) => [k, `EN:${k}`]));
const payload = await localizedPayload(record, types.page, translated, repo, () => slugify("Web development à la carte"));

assert.deepEqual(payload.blocks.it, ["b1"], "IT blocks are kept by id");
const card = payload.blocks.en[0].attributes.cards[0];
assert.equal(card.id, undefined, "EN blocks are new (no id)");
assert.equal(card.attributes.text, "EN:blocks.0.attributes.cards.0.attributes.text");
assert.equal(card.attributes.link_url, "https://x.it", "denylisted fields are copied as-is");
assert.equal(card.attributes.image.alt, "EN:blocks.0.attributes.cards.0.attributes.image.alt");
assert.equal(card.attributes.image.upload_id, "u2");
assert.equal(strings["blocks.0.attributes.cards.0.attributes.image.title"], "Titolo di default", "missing title falls back to the asset default");
assert.equal(card.attributes.image.title, "EN:blocks.0.attributes.cards.0.attributes.image.title");
assert.equal(payload.blocks.en[0].attributes.cards[1].attributes.text, "/solo-un-path");
assert.equal(record.blocks.it[0].attributes.cards[0].id, "c1", "source record is not mutated");
assert.deepEqual(payload.title, { it: "Sviluppo web", en: "EN:title" });
assert.deepEqual(payload.seo.en, { title: "EN:seo.title", description: "EN:seo.description", image: "u1" });
assert.deepEqual(payload.featured, { it: true, en: true }, "non-text localized fields mirror IT");
assert.equal(payload.slug.en, "web-development-a-la-carte");
// Structured text: spans and blocks inside the document.
types.article = [f("body", "structured_text", true)];
const article = {
  body: {
    it: {
      schema: "dast",
      document: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "span", value: "Testo " }, { type: "span", marks: ["strong"], value: "in grassetto" }] },
          { type: "block", item: block("st1", "card", { title: "Card nel testo", text: "", link_url: null, image: null }) },
          { type: "paragraph", children: [{ type: "link", url: "https://x.it", meta: [{ id: "title", value: "Titolo del link" }], children: [{ type: "span", value: "link" }] }] },
        ],
      },
    },
  },
};
const stStrings = await collectStrings(article, types.article, repo, uploadDefaults);
assert.deepEqual(Object.keys(stStrings), [
  "body.document.children.0.children.0.value",
  "body.document.children.0.children.1.value",
  "body.document.children.1.item.attributes.title",
  "body.document.children.2.children.0.meta.0.value",
  "body.document.children.2.children.0.children.0.value",
]);
const stPayload = await localizedPayload(article, types.article, Object.fromEntries(Object.keys(stStrings).map((k) => [k, `EN:${k}`])), repo, () => null);
assert.equal(stPayload.body.it.document.children[1].item, "st1", "IT blocks in structured text are kept by id");
assert.equal(stPayload.body.en.document.children[1].item.id, undefined, "EN structured text blocks are new");
assert.equal(stPayload.body.en.document.children[1].item.attributes.title, "EN:body.document.children.1.item.attributes.title");
assert.equal(stPayload.body.en.document.children[0].children[1].marks[0], "strong", "marks are kept");
assert.equal(stPayload.body.en.document.children[2].children[0].url, "https://x.it");
assert.equal(stPayload.body.en.document.children[2].children[0].meta[0].value, "EN:body.document.children.2.children.0.meta.0.value", "link titles are translated");
assert.equal(article.body.it.document.children[1].item.id, "st1", "source structured text is not mutated");
console.info("i18n check OK");
