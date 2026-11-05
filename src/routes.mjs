// URL di ogni vista in views/, uguali a quelli del sito Next: IT senza prefisso, EN sotto /en
// con i segmenti tradotti (erano i rewrites di next.config.js e la mappa di next-sitemap.config.js).
export const EN_SEGMENTS = {
  contatti: "contact-us",
  "chi-siamo": "about",
  "offerte-lavoro": "job-positions",
  servizi: "services",
  soluzioni: "solutions",
  tecnologie: "technologies",
  metodo: "methods",
  settori: "industries",
};

// "servizi/[slug]" → "/servizi/web" (it) o "/en/services/web" (en)
export function pathFor(view, locale, params = {}) {
  // Si traducono solo i segmenti fissi, mai gli slug che arrivano da Dato.
  const segments = view
    .replace(/(^|\/)index$/, "")
    .split("/")
    .filter(Boolean)
    .map((s) => (locale === "en" && EN_SEGMENTS[s]) || s)
    .map((s) => s.replace(/^\[(\w+)\]$/, (_, k) => params[k]));
  return locale === "it" ? "/" + segments.join("/") : ["/en", ...segments].join("/");
}

// Le viste con un parametro ([slug]) cedono alle viste statiche con lo stesso URL, come in Next.
export const isDynamic = (view) => view.includes("[");

// Inverso di pathFor, per la preview renderizzata a richiesta: "/en/services/web" → { view: "servizi/[slug]", locale: "en", params: { slug: "web" } }.
// Come in Next le viste statiche vincono su quelle con [slug]; se lo slug non esiste lo dice poi getStaticProps (notFound).
export function matchPath(path, views) {
  path = path.replace(/(.)\/$/, "$1");
  const locale = path === "/en" || path.startsWith("/en/") ? "en" : "it";
  const ordered = [...views].sort((a, b) => isDynamic(a) - isDynamic(b));
  for (const view of ordered) {
    const [pre, post] = pathFor(view, locale, { slug: "\0" }).split("\0");
    if (post === undefined) {
      if (pre === path) return { view, locale, params: {} };
      continue;
    }
    const slug = path.startsWith(pre) && path.endsWith(post) ? path.slice(pre.length, path.length - post.length) : "";
    if (slug && !slug.includes("/")) return { view, locale, params: { slug } };
  }
  return null;
}
