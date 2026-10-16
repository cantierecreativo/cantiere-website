// Endpoint del plugin "Web Previews" di DatoCMS, allo stesso indirizzo dell'API Next che sostituisce.
// Restituisce l'URL pubblicato e, se DRAFT_SITE_URL è impostato, quello del deploy di preview con le bozze.
import { pathFor } from "../../src/routes.mjs";

// api_key del modello Dato → vista in views/ (stessa corrispondenza di resolveLink in lib/utils.jsx)
const VIEWS = {
  homepage: "index",
  landing_page: "[slug]",
  article: "blog/[slug]",
  article_tag: "blog/tags/[slug]",
  articles_index: "blog/index",
  case_study: "case-studies/[slug]",
  case_studies_index: "case-studies/index",
  about_index: "chi-siamo/index",
  job: "chi-siamo/offerte-lavoro/[slug]",
  jobs_index: "chi-siamo/offerte-lavoro/index",
  team_index: "chi-siamo/team/index",
  contacts_index: "contatti",
  method: "metodo/[slug]",
  methods_index: "metodo/index",
  partners_index: "partners/index",
  work: "portfolio/[slug]",
  works_index: "portfolio/index",
  service: "servizi/[slug]",
  services_index: "servizi/index",
  company_service: "settori/[slug]",
  solution: "soluzioni/[slug]",
  solutions_index: "soluzioni/index",
  technology: "tecnologie/[slug]",
  technologies_index: "tecnologie/index",
};

export function previewLinks({ item, itemType, locale } = {}, { siteUrl, draftUrl }) {
  const view = VIEWS[itemType?.attributes?.api_key];
  if (!view || !item?.attributes) return [];
  const lang = locale === "en" ? "en" : "it";
  const slug = item.attributes.slug?.[lang] ?? item.attributes.slug;
  if (view.includes("[slug]") && typeof slug !== "string") return [];
  const path = pathFor(view, lang, { slug });
  return [
    { label: "Published version", url: `${siteUrl}${path}` },
    ...(draftUrl ? [{ label: "Draft version", url: `${draftUrl}${path}` }] : []),
  ];
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON non valido" }, { status: 400, headers: CORS });
  }
  const links = previewLinks(body, {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cantierecreativo.net",
    draftUrl: process.env.DRAFT_SITE_URL,
  });
  return Response.json({ previewLinks: links }, { headers: CORS });
};

export const config = { path: "/api/preview-links" };
