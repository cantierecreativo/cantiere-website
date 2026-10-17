import { useRef } from "react";
import { renderHTML } from "lib/utils";
import HeroArt from "./HeroArt";
import Wave from "./Wave";
import HeroBackdrop from "./HeroBackdrop";

// Hero della home: testo centrato come nel resto del sito, intorno la grafica animata e interattiva (HeroArt).
// Il centro del gradiente tiene il bianco sopra 4.5:1.
export default function HeroHome({ page }) {
  const ref = useRef(null);
  const slide = page.carousel?.[0]; // ponytail: si mostra la prima slide del carosello di Dato
  return (
    <section
      ref={ref}
      aria-labelledby={slide ? "hero-title" : undefined}
      aria-label={slide ? undefined : page.title}
      className="relative isolate overflow-hidden text-white"
    >
      <HeroBackdrop />
      <div className="container grid items-center gap-10 pt-28 pb-8 md:pt-36 lg:grid-cols-12 lg:pb-10 xl:pt-40">
        <div className="relative z-10 mx-auto max-w-4xl text-center lg:col-span-12">
          {slide && (
            <>
              <h1 id="hero-title" className="hero-in text-balance font-bold text-[2.25rem]/[0.95] tracking-[-0.03em] sm:text-[2.75rem]/[0.9] md:text-6xl/[0.9] xl:text-7xl/[0.9] [--d:0.15s]">
                {slide.title}
              </h1>
              {slide.text && (
                <div className="hero-in mx-auto mt-5 max-w-xl text-pretty text-[1.0625rem] leading-relaxed md:mt-6 md:text-xl [--d:0.4s]">{renderHTML(slide.text)}</div>
              )}
            </>
          )}
        </div>
        <div className="lg:col-span-12">
          <HeroArt sectionRef={ref} />
        </div>
      </div>
      <Wave below="#8f87f0" className="h-auto" />
    </section>
  );
}
