// Dopo astro build: completa dist/_redirects (copiato da public/) con i redirect legacy e le regole del sito statico.
// redirects/legacy-map.json resta la fonte unica: lo legge anche scripts/i18n/links.mjs.
import fs from "fs";

const file = "dist/_redirects";
const lines = fs.readFileSync(file, "utf8").replace(/\n*$/, "").split("\n");
const sources = new Set(lines.map((l) => l.trim().split(/\s+/)[0]));
// Le righe già in public/_redirects vincono, come quando Netlify le applicava prima di next.config.js.
const legacy = JSON.parse(fs.readFileSync("redirects/legacy-map.json", "utf8"))
  .filter((r) => !sources.has(r.source))
  .map((r) => `${r.source} ${r.destination} 301`);

lines.push(
  "",
  "# Legacy da redirects/legacy-map.json",
  ...legacy,
  "",
  "# Sitemap generata da @astrojs/sitemap; Search Console conosce /sitemap.xml",
  "/sitemap.xml /sitemap-index.xml 200",
  "",
  "# 404 in inglese: deve restare l'ultima regola",
  "/en/* /en/404 404",
);
fs.writeFileSync(file, lines.join("\n") + "\n");
console.log(`_redirects: ${legacy.length} redirect legacy aggiunti`);
