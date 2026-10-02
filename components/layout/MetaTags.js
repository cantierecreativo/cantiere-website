import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { resolveLink } from "lib/utils";

const LOCALES = ["it", "en"];
const DEFAULT_LOCALE = "it";

export default function MetaTags({ site, page, locale = DEFAULT_LOCALE }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const alts = page?.alts || [];
  // Pages queried without alts (homepage, indexes) exist in every locale.
  const locales = LOCALES.filter(
    (l) => alts.length === 0 || alts.some((a) => a.locale === l && a.value)
  );
  const url = (l) =>
    `${siteUrl}${resolveLink(page, l, alts.find((a) => a.locale === l)?.value || null)}`;

  return (
    <Head>
      {renderMetaTags(page.seo.concat(site.site.favicon))}
      <link rel="canonical" href={url(locale)} />
      {locales.length > 1 &&
        locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={url(l)} />
        ))}
      {locales.length > 1 && (
        <link rel="alternate" hrefLang="x-default" href={url(DEFAULT_LOCALE)} />
      )}
    </Head>
  );
}
