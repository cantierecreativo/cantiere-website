import { useRef } from "react";
import { renderHTML } from "lib/utils";
import HeroArt from "./HeroArt";
import Wave from "./Wave";

// Hero della home: testo a sinistra, a destra la grafica del sito animata e interattiva (HeroArt).
// Il centro del gradiente tiene il bianco sopra 4.5:1.
export default function HeroHome({ page }) {
  const ref = useRef(null);
  const slide = page.carousel?.[0]; // ponytail: si mostra la prima slide del carosello di Dato
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_15%_10%,_#6766D9_0%,_#3938E0_55%,_#2f2ed0_100%)] text-white"
    >
      <div className="container grid items-center gap-10 pt-28 pb-8 md:pt-36 lg:grid-cols-12 lg:pb-10 xl:pt-40">
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
        </div>
        <div className="lg:col-span-5">
          <HeroArt sectionRef={ref} />
        </div>
      </div>
      <Wave below="#8f87f0" className="h-14 md:h-20 xl:h-24" />
    </section>
  );
}
