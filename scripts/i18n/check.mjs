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

const strings = await collectStrings(record, types.page, repo);
assert.deepEqual(Object.keys(strings).sort(), [
  "blocks.0.attributes.cards.0.attributes.image.alt",
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
assert.equal(payload.blocks.en[0].attributes.cards[1].attributes.text, "/solo-un-path");
assert.equal(record.blocks.it[0].attributes.cards[0].id, "c1", "source record is not mutated");
assert.deepEqual(payload.title, { it: "Sviluppo web", en: "EN:title" });
assert.deepEqual(payload.seo.en, { title: "EN:seo.title", description: "EN:seo.description", image: "u1" });
assert.deepEqual(payload.featured, { it: true, en: true }, "non-text localized fields mirror IT");
assert.equal(payload.slug.en, "web-development-a-la-carte");
console.info("i18n check OK");
