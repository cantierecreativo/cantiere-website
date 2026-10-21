import Head from "next/head";
import { resolveLink } from "lib/utils";
import { SITE_URL } from "lib/lab";

// Dati strutturati dell'indice Lab: raccolta di progetti, breadcrumb ed elenco dei progetti.
export default function LabIndexJsonLd({ page, locale = "it" }) {
  const projects = page.sections.flatMap((s) => s.projects || []);
  const home = `${SITE_URL}${locale === "it" ? "" : `/${locale}`}`;
  const url = `${SITE_URL}${resolveLink({ model: page.model, slug: null }, locale)}`;
  const graph = [
    {
      "@type": "CollectionPage",
      "@id": url,
      url,
      name: page.seoData?.title || page.title,
      description: page.seoData?.description || page.abstract,
      inLanguage: locale === "en" ? "en" : "it-IT",
      isPartOf: { "@type": "WebSite", name: "Cantiere Creativo", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Cantiere Creativo", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: "Lab", item: url },
      ],
    },
    {
      "@type": "ItemList",
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
