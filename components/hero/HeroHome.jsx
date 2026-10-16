import Link from "next/link";
import Icon from "components/layout/Icon";
import { renderHTML, resolveLink } from "lib/utils";
import { FOCUS } from "components/layout/glass";
import t from "lib/locales";
import Swirl from "./Swirl";
import Wave from "./Wave";

// Posizione di ciascuna carta del mazzo dei case study (dalla più indietro alla più avanti).
const CARDS = [
  "left-0 top-10 -rotate-6 z-0",
  "right-0 top-16 rotate-6 z-[1]",
  "left-[13%] top-0 rotate-1 z-[2]",
];

// Hero della home: titolo e azioni a sinistra, i case study in evidenza come carte a destra,
// il ricciolo rosa che si disegna e la stella. Il centro del gradiente tiene il bianco sopra 4.5:1.
export default function HeroHome({ page, locale }) {
  const slide = page.carousel?.[0]; // ponytail: si mostra la prima slide del carosello di Dato
  const cases = (page.highlightProjects || []).slice(0, 3);
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_15%_10%,_#6766D9_0%,_#3938E0_55%,_#2f2ed0_100%)] text-white"
    >
      <div className="container grid items-center gap-12 pt-28 pb-8 md:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-10 xl:pt-40">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="mb-5 text-sm font-bold uppercase tracking-wider">
            {page.title}
          </h1>
          {slide && (
            <>
              <p className="text-balance font-bold text-[2.75rem] leading-[0.98] tracking-[-0.03em] md:text-6xl xl:text-7xl">
                {slide.title}
              </p>
              {slide.text && (
                <div className="mt-6 max-w-xl text-pretty text-lg leading-relaxed md:text-xl">{renderHTML(slide.text)}</div>
              )}
            </>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={t("contact-us-url", locale)}
              className={`${FOCUS} group flex items-center gap-2 rounded-full bg-yellow px-6 py-3 text-sm font-bold uppercase tracking-wider text-black duration-200 hover:bg-white`}
            >
              {t("contact-us-label", locale)}
              <Icon name="arrow" size="18" className="fill-black motion-safe:duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={resolveLink({ model: "case_studies_index" }, locale)}
              className={`${FOCUS} rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wider underline decoration-white/40 underline-offset-4 duration-200 hover:decoration-white`}
            >
              {t("caseStudiesCta", locale)}
            </Link>
          </div>
        </div>

        {cases.length > 0 && (
          <div className="relative mx-auto mb-20 h-[320px] w-full max-w-[460px] sm:h-[400px] lg:col-span-5 lg:mb-0 lg:h-[440px]">
            <ul className="contents">
              {cases.map((c, i) => {
                const img = c.previewImage?.responsiveImage;
                return (
                  <li key={c.id} className={`absolute w-[70%] ${CARDS[i]}`}>
                    <Link
                      href={resolveLink(c, locale)}
                      className={`${FOCUS} block overflow-hidden rounded-3xl bg-white text-black shadow-[0_24px_40px_-20px_rgba(5,14,57,0.6)] motion-safe:transition-transform motion-safe:duration-300 hover:-translate-y-1.5`}
                    >
                      {img && (
                        <img
                          src={img.src}
                          srcSet={img.srcSet}
                          sizes="(min-width: 1024px) 320px, 70vw"
                          alt={img.alt || ""}
                          width={img.width}
                          height={img.height}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      )}
                      <span className="line-clamp-2 block px-4 py-3 text-sm font-bold leading-snug">{c.title.trim()}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Icon name="star" size="100%" fill="yellow" className="pointer-events-none absolute -right-3 -top-8 z-10 h-16 w-16 md:h-20 md:w-20" />
            <Swirl className="pointer-events-none absolute -bottom-28 left-[2%] z-10 w-[30%] sm:-bottom-24 lg:-bottom-20 lg:-left-[40%] lg:w-[44%]" />
          </div>
        )}
      </div>
      <Wave below="#8f87f0" className="h-14 md:h-20 xl:h-24" />
    </section>
  );
}
