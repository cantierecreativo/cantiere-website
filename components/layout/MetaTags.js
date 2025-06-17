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
        locales.map((l) => {
          const link = alts?.find((alt) => alt.locale === l)?.value;
          const shareUrl = `${siteUrl}${resolveLink(page, l, link)}`;
          const hrefLang = l === localeDefault ? "x-default" : l;
          return (
            <link
              key={l}
              rel={localeDefault === l ? "canonical" : "alternate"}
              href={shareUrl}
            />
          );
        })}
    </Head>
  );
}
