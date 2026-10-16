import Link from "next/link";
import { Fragment } from "react";
import { resolveLink } from "lib/utils";
import t from "lib/locales";

// Accessible name of each language, in that language (the visible text is the short "Eng" / "Ita").
const LANGUAGE_NAMES = { it: "Italiano", en: "English" };

function LanguageSwitcher({ page, locale }) {
  const locales = ["it", "en"];
  const alts = page?.alts || [];
  return (
    <>
      {locales &&
        locales.map((l, i) => {
          const link = alts?.find((alt) => alt.locale === l)?.value || null;
          if ((alts && alts.length == 1) || locale === l) {
            return;
          } else
            return (
              <Fragment key={l}>
                <Link
                  href={resolveLink(page, l, link)}
                  locale={l}
                  hrefLang={l}
                  lang={l}
                  aria-label={LANGUAGE_NAMES[l]}
                  className="bg-white rounded-full text-black px-4 py-2 lg:bg-transparent lg:p-0 lg:text-inherit lg:text-sm xl:text-base"
                >
                  <span className="underline-on-hover">
                    {t(`${l}`, locale)}
                  </span>
                </Link>
              </Fragment>
            );
        })}
    </>
  );
}

export default LanguageSwitcher;
