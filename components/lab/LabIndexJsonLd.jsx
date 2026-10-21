import Head from "next/head";
import { resolveLink } from "lib/utils";
import { SITE_URL, ORGANIZATION } from "lib/lab";

// Dati strutturati dell'AI Lab: raccolta di progetti, organizzazione, breadcrumb ed elenco dei progetti.
export default function LabIndexJsonLd({ page, locale = "it" }) {
  const home = `${SITE_URL}${locale === "it" ? "" : `/${locale}`}`;
  const url = `${SITE_URL}${resolveLink({ model: page.model, slug: null }, locale)}`;
  const projectsBlock = page.sections.find((s) => s.projects);
  const projects = projectsBlock?.projects || [];
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": url,
      url,
      name: page.seoData?.title || page.title,
      description: page.seoData?.description || page.abstract,
      inLanguage: locale === "en" ? "en" : "it-IT",
      isPartOf: { "@type": "WebSite", name: "Cantiere Creativo", url: SITE_URL, publisher: { "@id": ORGANIZATION["@id"] } },
      publisher: { "@id": ORGANIZATION["@id"] },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      mainEntity: { "@id": `${url}#projects` },
    },
    ORGANIZATION,
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: page.menuLabel, item: url },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${url}#projects`,
      name: projectsBlock?.title,
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.shortTitle,
        url: `${SITE_URL}${resolveLink(p, locale)}`,
      })),
    },
  ];
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
    </Head>
  );
}
