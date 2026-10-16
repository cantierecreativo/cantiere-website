// Confronta ogni URL della sitemap di produzione con un'altra build (default: astro preview in locale).
// Per URL: status, <title>, path del canonical, meta robots, testo del primo h1, numero di <img>.
// Uso: bun run parity            BASE=https://astro--cantiere-website-2023.netlify.app bun run parity
const BASE = process.env.BASE ?? "http://localhost:4321";
const PROD = "https://www.cantierecreativo.net";
const CONCURRENCY = 8;

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;|&#160;/g, " ");
const pick = (html, re) => decode((html.match(re)?.[1] ?? "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const facts = (html) => ({
  title: pick(html, /<title[^>]*>([^<]*)/),
  canonical: (pick(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) || "").replace(/^https?:\/\/[^/]+/, ""),
  robots: pick(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/),
  h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/),
  // Il vecchio next/image ripeteva ogni immagine in <noscript>: si contano solo quelle visibili.
  imgs: (html.replace(/<noscript>[\s\S]*?<\/noscript>/g, "").match(/<img\b/g) ?? []).length,
});

const xml = await (await fetch(`${PROD}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => !p.endsWith("/404"));

let bad = 0;
async function check(path) {
  const [a, b] = await Promise.all([fetch(PROD + path), fetch(BASE + path)]);
  if (b.status !== a.status) return console.log(`status ${a.status} → ${b.status}  ${path}`), bad++;
  const [fa, fb] = [facts(await a.text()), facts(await b.text())];
  const diff = Object.keys(fa).filter((k) => fa[k] !== fb[k]);
  if (diff.length) bad++, console.log(path, "\n  " + diff.map((k) => `${k}: «${fa[k]}» → «${fb[k]}»`).join("\n  "));
}
for (let i = 0; i < paths.length; i += CONCURRENCY) await Promise.all(paths.slice(i, i + CONCURRENCY).map(check));

console.log(`\n${paths.length} URL confrontati, ${bad} con differenze`);
process.exit(bad ? 1 : 0);
