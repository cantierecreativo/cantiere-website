import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { resolveLink } from "lib/utils";

export default function MetaTags({ site, page }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const alts = page.alts;
  const locales = ["it", "en"];
  const localeDefault = "it";

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
                key={hrefLang}
                href={shareUrl}
                hrefLang={hrefLang}
                rel="alternate"
              />
            );
          }
        })}
    </Head>
  );
}
