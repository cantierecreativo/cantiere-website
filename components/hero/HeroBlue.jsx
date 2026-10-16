import { renderHTML, resolveLink } from "lib/utils";
import Link from "next/link";
import Icon from "components/layout/Icon";
import t from "lib/locales";

// Sezione a cui appartiene la pagina, mostrata nel percorso sopra il titolo.
const SECTIONS = {
  solution: { model: "solutions_index", label: (l) => t("solutions", l) },
  technology: { model: "technologies_index", label: (l) => t("technologies", l) },
  method: { model: "methods_index", label: (l) => t("methods", l) },
  case_study: { model: "case_studies_index", label: () => "Case studies" },
};

// Hero compatta: il centro del gradiente (#6766D9) tiene il testo bianco sopra 4.5:1.
export default function HeroBlue({ page, children, abstractTag = "h2", locale = "it" }) {
  const AbstractTag = abstractTag;
  const { title, subtitle, abstract, text, model } = page;
  const section = SECTIONS[model];
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(circle,_#6766D9_0%,_#3938E0_80%)] pb-[14vh] lg:pb-[18vh]"
    >
      <div className="container relative z-10 pt-28 pb-6 md:pt-32 lg:pt-36 lg:pb-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-white xl:space-y-6">
          {section && (
            <nav aria-label={t("breadcrumbs", locale)}>
              <ol className="flex flex-wrap items-center justify-center gap-1 text-sm font-bold uppercase tracking-wider">
                <li>
                  <Link
                    href={resolveLink({ model: section.model }, locale)}
                    className="underline decoration-white/40 underline-offset-4 duration-200 hover:decoration-white"
                  >
                    {section.label(locale)}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <Icon name="down" size="20" className="-rotate-90 fill-white" />
                </li>
                <li aria-current="page" className="max-w-[60vw] truncate">
                  {title}
                </li>
              </ol>
            </nav>
          )}
          <h1 id="hero-title" className="text-balance text-3xl font-bold md:text-4xl xl:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <h2 className="mx-auto max-w-prose text-balance text-lg xl:text-2xl">{renderHTML(subtitle)}</h2>
          )}
          {(abstract || text) && (
            <AbstractTag className="mx-auto max-w-prose text-md xl:text-lg">{renderHTML(abstract || text)}</AbstractTag>
          )}
        </div>
        {children}
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-[12vh] w-full lg:h-[16vh]">
        <img src="/icons/top-yellow-white.svg" alt="" className="h-full w-full object-cover object-top" />
      </div>
    </section>
  );
}
