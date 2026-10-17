import { renderHTML, resolveLink } from "lib/utils";
import Link from "next/link";
import Icon from "components/layout/Icon";
import t from "lib/locales";
import { useRef } from "react";
import HeroArt from "./HeroArt";
import Wave from "./Wave";
import HeroBackdrop from "./HeroBackdrop";

// Sezione a cui appartiene la pagina, mostrata nel percorso sopra il titolo.
const SECTIONS = {
  solution: { model: "solutions_index", label: (l) => t("solutions", l) },
  technology: { model: "technologies_index", label: (l) => t("technologies", l) },
  method: { model: "methods_index", label: (l) => t("methods", l) },
  case_study: { model: "case_studies_index", label: () => "Case studies" },
};

// Hero delle pagine interne, stesso modello della home (HeroHome): testo centrato e il nastro viola
// che cambia forma (HeroArt minimal), senza stelle né ricciolo. Il centro del gradiente tiene il bianco sopra 4.5:1.
// aside: azioni sotto il testo, centrate (Lab); children: sotto, a tutta larghezza.
export default function HeroBlue({ page, children, aside, abstractTag = "h2", locale = "it" }) {
  const AbstractTag = abstractTag;
  const { title, subtitle, abstract, text, model } = page;
  const section = SECTIONS[model];
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden text-white"
    >
      <HeroBackdrop />
      <div className="container grid items-center gap-10 pt-28 pb-8 md:pt-36 lg:grid-cols-12 lg:pb-10 xl:pt-40">
        <div className="relative z-10 mx-auto max-w-4xl text-center lg:col-span-12">
          {section && (
            <nav aria-label={t("breadcrumbs", locale)} className="hero-in mb-5 [--d:0.1s]">
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
            className={`hero-in text-balance font-bold tracking-[-0.025em] [--d:0.3s] ${
              typeof title === "string" && title.length > 60
                ? "text-3xl/[0.95] md:text-4xl/[0.95] xl:text-5xl/[0.95]"
                : "text-[2.5rem]/[0.92] md:text-5xl/[0.92] xl:text-6xl/[0.9]"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <h2 className="hero-in mx-auto mt-4 max-w-2xl text-balance text-lg leading-snug sm:text-xl md:mt-5 md:text-2xl [--d:0.5s]">{renderHTML(subtitle)}</h2>
          )}
          {(abstract || text) && (
            <AbstractTag className="hero-in mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed md:text-lg [--d:0.7s]">
              {renderHTML(abstract || text)}
            </AbstractTag>
          )}
        </div>
        {aside && <div className="hero-in relative z-10 flex justify-center lg:col-span-12 [--d:0.85s]">{aside}</div>}
        {children && <div className="relative z-10 lg:col-span-12">{children}</div>}
      </div>
      <HeroArt sectionRef={ref} minimal />
      <Wave className="h-auto" />
    </section>
  );
}
