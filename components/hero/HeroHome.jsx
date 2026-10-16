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
        <div className="relative z-10 lg:col-span-7">
          <h1 id="hero-title" className="hero-in mb-5 text-sm font-bold uppercase tracking-wider [--d:0.1s]">
            {page.title}
          </h1>
          {slide && (
            <>
              <p className="hero-in text-balance font-bold text-[2.75rem]/[0.9] tracking-[-0.03em] md:text-6xl/[0.9] xl:text-7xl/[0.9] [--d:0.3s]">
                {slide.title}
              </p>
              {slide.text && (
                <div className="hero-in mt-6 max-w-xl text-pretty text-lg leading-relaxed md:text-xl [--d:0.55s]">{renderHTML(slide.text)}</div>
              )}
            </>
          )}
        </div>
        <div className="lg:col-span-5">
          <HeroArt sectionRef={ref} />
        </div>
      </div>
      <Wave below="#8f87f0" className="h-auto" />
    </section>
  );
}
