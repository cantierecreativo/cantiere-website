import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { resolveLink } from "lib/utils";

export default function MetaTags({ site, page }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const alts = page?.alts || [];
  const locales = ["it"];
  const localeDefault = "it";
  const linkEng = alts?.find((alt) => alt.locale === "en")?.value || null;

  return (
    <Head>
      {renderMetaTags(page.seo.concat(site.site.favicon))}
      {locales &&
        locales.map((l, i) => {
          const link = alts?.find((alt) => alt.locale === l)?.value || null;
          const prefixSlug = resolveLink(page, l, link);
          const shareUrl = `${siteUrl}${prefixSlug}`;
          const hrefLang = l === localeDefault ? "x-default" : l;
          if (page.model === "homepage" || link !== null) {
            return (
              <link
                key={l}
                href={shareUrl}
                hrefLang={l}
                title={page.title}
                rel={localeDefault === l ? "canonical" : "alternate"}
                type="text/html"
              />
            );
          }
        })}
      <link
        href={`${siteUrl}/`}
        // hrefLang="x-default"
        rel="alternate"
        type="text/html"
      />
    </Head>
  );
}
