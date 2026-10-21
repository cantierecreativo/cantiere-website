import Head from "next/head";
import { resolveLink } from "lib/utils";
import { SITE_URL, ORGANIZATION } from "lib/lab";

// Dati strutturati della pagina progetto: pagina, breadcrumb e oggetto, nella lingua della pagina.
export default function LabJsonLd({ project, labIndex, locale = "it" }) {
  const home = `${SITE_URL}${locale === "it" ? "" : `/${locale}`}`;
  const url = `${SITE_URL}${resolveLink(project, locale)}`;
  const inLanguage = locale === "en" ? "en" : "it-IT";
  const labUrl = `${SITE_URL}${resolveLink({ model: "lab_index", slug: null }, locale)}`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: project.seoData?.title || project.title,
      description: project.seoData?.description || project.abstract,
      inLanguage,
      isPartOf: { "@type": "WebSite", name: "Cantiere Creativo", url: SITE_URL, publisher: { "@id": ORGANIZATION["@id"] } },
      publisher: { "@id": ORGANIZATION["@id"] },
    },
    ORGANIZATION,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: labIndex.menuLabel, item: labUrl },
        { "@type": "ListItem", position: 3, name: project.shortTitle, item: url },
      ],
    },
    {
      "@type": "CreativeWork",
      name: project.shortTitle,
      url: project.projectUrl,
      description: project.abstract,
      inLanguage: "it-IT",
      dateModified: project.dataDate,
      creator: { "@id": ORGANIZATION["@id"] },
      about: project.about,
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
