"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { renderHTML, resolveLink } from "lib/utils";
import Link from "next/link";
import Icon from "components/layout/Icon";
import t from "lib/locales";
import Wave from "./Wave";

// Sezione a cui appartiene la pagina, mostrata nel percorso sopra il titolo.
const SECTIONS = {
  solution: { model: "solutions_index", label: (l) => t("solutions", l) },
  technology: { model: "technologies_index", label: (l) => t("technologies", l) },
  method: { model: "methods_index", label: (l) => t("methods", l) },
  case_study: { model: "case_studies_index", label: () => "Case studies" },
};

// Hero compatta nel linguaggio della home: gradiente blu, stella gialla, tratto viola, onda.
// La grafica è in scala con l'altezza della hero, non ritagliata.
// Il centro del gradiente (#6766D9) tiene il testo bianco sopra 4.5:1.
export default function HeroBlue({ page, children, abstractTag = "h2", locale = "it" }) {
  const AbstractTag = abstractTag;
  const { title, subtitle, abstract, text, model } = page;
  const section = SECTIONS[model];

  // L'unico movimento: la stella ruota e sale con lo scroll, come nella home.
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 400], [0, reduce ? 0 : 45]);
  const y = useTransform(scrollY, [0, 400], [0, reduce ? 0 : -40]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_50%_40%,_#6766D9_0%,_#3938E0_75%)]"
    >
      <img
        src="/icons/stroke1Violet.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 w-[220%] max-w-none -translate-x-1/2 md:top-1/2 md:w-[115%] md:-translate-y-1/2"
      />
      <motion.div
        aria-hidden="true"
        style={{ rotate, y }}
        className="pointer-events-none absolute right-[6%] top-24 -z-10 w-10 md:right-[10%] md:top-28 md:w-16 xl:w-20"
      >
        <Icon name="star" size="100%" fill="yellow" className="h-full w-full" />
      </motion.div>

      <div className="container relative pt-28 pb-10 md:pt-32 lg:pt-36 lg:pb-14">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-white xl:space-y-5">
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
                  <Icon name="down" size="20" className="-rotate-90 fill-yellow" />
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
            <h2 className="mx-auto max-w-2xl text-balance text-lg xl:text-2xl">{renderHTML(subtitle)}</h2>
          )}
          {(abstract || text) && (
            <AbstractTag className="mx-auto max-w-prose text-pretty text-md xl:text-lg">
              {renderHTML(abstract || text)}
            </AbstractTag>
          )}
        </div>
        {children}
      </div>
      <Wave className="h-14 md:h-20 xl:h-24" />
    </section>
  );
}
