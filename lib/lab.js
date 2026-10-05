// Helper per la sezione Lab (contenuti statici, fuori da DatoCMS).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cantierecreativo.net";

export const CALENDLY_URL = "https://calendly.com/francesco-giovannetti-cantiere-creativo/meet";

export const labMenuItem = {
  id: "lab-menu-item",
  label: "Lab",
  title: "Cantiere Creativo Lab",
  link: { model: "lab_index", slug: null, title: "Cantiere Creativo Lab" },
  menuItems: [],
};

// Aggiunge la voce "Lab" dopo "Case studies" nel menu letto da DatoCMS.
export function withLabMenu(items = []) {
  const after = items.findIndex((i) => i.link?.model === "case_studies_index");
  const position = after === -1 ? items.length : after + 1;
  return [...items.slice(0, position), labMenuItem, ...items.slice(position)];
}

// Meta tag nella stessa forma di _seoMetaTags, letta da renderMetaTags.
export function buildSeoTags({ title, description, image }, locale = "it") {
  const imageUrl = image ? `${SITE_URL}${image}` : null;
  const tags = [
    { tag: "title", attributes: null, content: title },
    { tag: "meta", attributes: { name: "description", content: description }, content: null },
    { tag: "meta", attributes: { property: "og:title", content: title }, content: null },
    { tag: "meta", attributes: { property: "og:description", content: description }, content: null },
    { tag: "meta", attributes: { property: "og:type", content: "website" }, content: null },
    { tag: "meta", attributes: { property: "og:locale", content: locale === "en" ? "en_GB" : "it_IT" }, content: null },
    { tag: "meta", attributes: { name: "twitter:card", content: "summary_large_image" }, content: null },
    { tag: "meta", attributes: { name: "twitter:title", content: title }, content: null },
    { tag: "meta", attributes: { name: "twitter:description", content: description }, content: null },
  ];
  if (imageUrl) {
    tags.push(
      { tag: "meta", attributes: { property: "og:image", content: imageUrl }, content: null },
      { tag: "meta", attributes: { name: "twitter:image", content: imageUrl }, content: null }
    );
  }
  return tags;
}

// Eventi per GTM: la configurazione dei tag GA4 resta in Google Tag Manager.
// Ogni evento riscrive tutte le chiavi, così GTM non eredita valori dagli eventi precedenti.
export function trackLab(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    lab_project: params.project ?? null,
    position: params.position ?? null,
    opera: params.opera ?? null,
  });
}

export { SITE_URL };

// Menu e footer da DatoCMS. Solo in sviluppo locale e senza chiave si usa la copia
// dei dati pubblici; in build e in produzione la chiave è obbligatoria.
export async function getLabSite(fetchData, siteQuery, locale) {
  const devWithoutKey =
    process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_DATO_API_KEY;
  if (devWithoutKey) {
    const fallback = await import("src/data/lab/site-fallback.json");
    return fallback.default || fallback;
  }
  return fetchData(siteQuery, { locale });
}
