import Link from "next/link";
import { resolveLink } from "lib/utils";
import t from "lib/locales";
import { FOCUS } from "./glass";

const LOCALES = ["it", "en"];
// Nome di ogni lingua nella lingua stessa: lo leggono gli screen reader al posto della sigla.
const LANGUAGE_NAMES = { it: "Italiano", en: "English" };

const item = "flex min-w-11 items-center justify-center rounded-full px-3 py-2 text-sm font-bold uppercase tracking-wider";

// Selettore IT/EN: la lingua corrente è evidenziata, l'altra è il link alla stessa pagina tradotta.
function LanguageSwitcher({ page, locale, className = "" }) {
  const alts = page?.alts || [];
  // Pagina pubblicata in una sola lingua: niente da scegliere.
  if (alts.length === 1) return null;
  return (
    <div role="group" aria-label={t("languageSwitch", locale)} className={`flex items-center gap-0.5 ${className}`}>
      {LOCALES.map((l) => {
        const label = (
          <>
            <span aria-hidden="true">{l}</span>
            <span className="sr-only">{LANGUAGE_NAMES[l]}</span>
          </>
        );
        if (l === locale) {
          return (
            <span key={l} lang={l} aria-current="true" className={`${item} bg-black text-white`}>
              {label}
            </span>
          );
        }
        const slug = alts.find((alt) => alt.locale === l)?.value || null;
        return (
          <Link
            key={l}
            href={resolveLink(page, l, slug)}
            locale={l}
            hrefLang={l}
            lang={l}
            className={`${item} ${FOCUS} text-black duration-200 hover:bg-black/10`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
