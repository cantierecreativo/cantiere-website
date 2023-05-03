import Link from "next/link";
import { Fragment } from "react";
import { resolveLink } from "lib/utils";
import t from "lib/locales";

function LanguageSwitcher({ page, locale }) {
  const locales = ["it", "en"];
  const alts = page.alts;
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
