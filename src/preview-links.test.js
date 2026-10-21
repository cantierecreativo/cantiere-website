import { test, expect } from "bun:test";
import { previewLinks } from "../netlify/functions/preview-links.mjs";

const env = { siteUrl: "https://www.cantierecreativo.net", draftUrl: "https://preview--x.netlify.app" };
const req = (api_key, slug, locale) => ({ item: { attributes: { slug } }, itemType: { attributes: { api_key } }, locale });

test("link pubblicato e bozza con gli URL del sito", () => {
  expect(previewLinks(req("service", { it: "web-design", en: "web-design" }, "en"), env)).toEqual([
    { label: "Published version", url: "https://www.cantierecreativo.net/en/services/web-design" },
    { label: "Draft version", url: "https://preview--x.netlify.app/en/services/web-design" },
  ]);
  expect(previewLinks(req("homepage", null, "it"), env)[0].url).toBe("https://www.cantierecreativo.net/");
  expect(previewLinks(req("services_index", null, "en"), env)[0].url).toBe("https://www.cantierecreativo.net/en/services");
  expect(previewLinks(req("lab_project", { it: "atlante-uffizi", en: "uffizi-atlas" }, "en"), env)[0].url).toBe("https://www.cantierecreativo.net/en/ai-lab/uffizi-atlas");
  expect(previewLinks(req("lab_index", null, "it"), env)[0].url).toBe("https://www.cantierecreativo.net/ai-lab");
});

test("niente link per modelli sconosciuti, slug mancanti o senza deploy di bozza", () => {
  expect(previewLinks(req("menu_item", null, "it"), env)).toEqual([]);
  expect(previewLinks(req("article", { it: null }, "it"), env)).toEqual([]);
  expect(previewLinks({}, env)).toEqual([]);
  expect(previewLinks(req("article", { it: "x" }, "it"), { siteUrl: "https://s" })).toHaveLength(1);
});
