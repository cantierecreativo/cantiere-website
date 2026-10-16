import Head from "next/head";
import { resolveLink } from "lib/utils";
import { SITE_URL } from "lib/lab";

// Dati strutturati della pagina progetto: pagina, breadcrumb e oggetto, nella lingua della pagina.
export default function LabJsonLd({ project, locale = "it" }) {
  const home = `${SITE_URL}${locale === "it" ? "" : `/${locale}`}`;
  const url = `${SITE_URL}${resolveLink(project, locale)}`;
  const inLanguage = locale === "en" ? "en" : "it-IT";
  const organization = {
    "@type": "Organization",
    name: "Cantiere Creativo",
    url: SITE_URL,
  };
  const graph = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: project.seo.title,
      description: project.seo.description,
      inLanguage,
      isPartOf: { "@type": "WebSite", name: "Cantiere Creativo", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: home },
        { "@type": "ListItem", position: 2, name: "Lab", item: `${home}/lab` },
        { "@type": "ListItem", position: 3, name: project.shortTitle, item: url },
      ],
    },
    {
      "@type": "CreativeWork",
      name: project.shortTitle,
      url: project.atlasUrl,
      description: project.abstract,
      inLanguage: "it-IT",
      dateModified: project.dataDate,
      creator: organization,
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
