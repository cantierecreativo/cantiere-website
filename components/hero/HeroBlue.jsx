import { renderHTML, resolveLink } from "lib/utils";
import Link from "next/link";
import Icon from "components/layout/Icon";
import t from "lib/locales";
import { useRef } from "react";
import HeroArt from "./HeroArt";
import Wave from "./Wave";

// Sezione a cui appartiene la pagina, mostrata nel percorso sopra il titolo.
const SECTIONS = {
  solution: { model: "solutions_index", label: (l) => t("solutions", l) },
  technology: { model: "technologies_index", label: (l) => t("technologies", l) },
  method: { model: "methods_index", label: (l) => t("methods", l) },
  case_study: { model: "case_studies_index", label: () => "Case studies" },
};

// Hero delle pagine interne, stesso modello della home (HeroHome): testo a sinistra, a destra la grafica
// del sito animata e interattiva (HeroArt). Il centro del gradiente tiene il bianco sopra 4.5:1.
export default function HeroBlue({ page, children, abstractTag = "h2", locale = "it" }) {
  const AbstractTag = abstractTag;
  const { title, subtitle, abstract, text, model } = page;
  const section = SECTIONS[model];
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_15%_10%,_#6766D9_0%,_#3938E0_55%,_#2f2ed0_100%)] text-white"
    >
      <div className="container grid items-center gap-10 pt-28 pb-8 md:pt-36 lg:grid-cols-12 lg:pb-10 xl:pt-40">
        <div className="lg:col-span-7">
          {section && (
            <nav aria-label={t("breadcrumbs", locale)} className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-sm font-bold uppercase tracking-wider">
                <li>
                  <Link
                    href={resolveLink({ model: section.model }, locale)}
                    className="underline decoration-white/40 underline-offset-4 duration-200 hover:decoration-white"
                  >
                    {section.label(locale)}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <Icon name="down" size="20" className="-rotate-90 fill-yellow" />
                </li>
                <li aria-current="page" className="max-w-[60vw] truncate">
                  {title}
                </li>
              </ol>
            </nav>
          )}
          <h1
            id="hero-title"
            className={`text-balance font-bold leading-[1.02] tracking-[-0.025em] ${
              typeof title === "string" && title.length > 60
                ? "text-3xl md:text-4xl xl:text-5xl"
                : "text-[2.5rem] md:text-5xl xl:text-6xl"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <h2 className="mt-5 max-w-2xl text-balance text-xl leading-snug md:text-2xl">{renderHTML(subtitle)}</h2>
          )}
          {(abstract || text) && (
            <AbstractTag className="mt-5 max-w-xl text-pretty text-base leading-relaxed md:text-lg">
              {renderHTML(abstract || text)}
            </AbstractTag>
          )}
          {children}
        </div>
        <div className="hidden sm:block lg:col-span-5">
          <HeroArt sectionRef={ref} />
        </div>
      </div>
      <Wave className="h-14 md:h-20 xl:h-24" />
    </section>
  );
}
