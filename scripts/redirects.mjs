// Dopo astro build: completa dist/_redirects (copiato da public/) con i redirect legacy e le regole del sito statico.
// redirects/legacy-map.json resta la fonte unica: lo legge anche scripts/i18n/links.mjs.
import fs from "fs";
import { EN_SEGMENTS } from "../src/routes.mjs";

const file = "dist/_redirects";
const lines = fs.readFileSync(file, "utf8").replace(/\n*$/, "").split("\n");
const sources = new Set(lines.map((l) => l.trim().split(/\s+/)[0]));
// Le righe già in public/_redirects vincono, come quando Netlify le applicava prima di next.config.js.
const legacy = JSON.parse(fs.readFileSync("redirects/legacy-map.json", "utf8"))
  .filter((r) => !sources.has(r.source))
  .map((r) => `${r.source} ${r.destination} 301`);

// Next serviva le pagine EN anche con i segmenti italiani (/en/servizi/x): ora vanno agli URL inglesi.
// Prima i segmenti annidati (chi-siamo/offerte-lavoro), poi quelli semplici.
const nested = [["chi-siamo/offerte-lavoro", "about/job-positions"]];
const itSegments = [
  ...nested,
  ...Object.entries(EN_SEGMENTS).filter(([it]) => !nested.some(([n]) => n.endsWith(`/${it}`))),
].flatMap(([it, en]) => [`/en/${it} /en/${en} 301`, `/en/${it}/* /en/${en}/:splat 301`]);

lines.push(
  "",
  "# Legacy da redirects/legacy-map.json",
  ...legacy,
  "",
  "# Segmenti italiani sotto /en",
  ...itSegments,
  "",
  "# Sitemap generata da @astrojs/sitemap; Search Console conosce /sitemap.xml",
  "/sitemap.xml /sitemap-index.xml 200",
  "",
  "# 404 in inglese: deve restare l'ultima regola",
  "/en/* /en/404 404",
);
fs.writeFileSync(file, lines.join("\n") + "\n");
console.log(`_redirects: ${legacy.length} redirect legacy aggiunti`);
