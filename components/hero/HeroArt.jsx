"use client";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Icon from "components/layout/Icon";
import Swirl from "./Swirl";
import LivingWave from "./LivingWave";

// Inseguimento esponenziale: a ogni fotogramma gli strati coprono una frazione della distanza dal
// bersaglio, quindi andata e ritorno al centro sono sempre continui, senza salti né rimbalzi.
// TAU è il tempo (s) in cui coprono circa il 63% della distanza: più alto = più lento.
const TAU = 1.6;
const POP = { type: "spring", duration: 0.5, bounce: 0.3 };
const MAX_STARS = 12;

// Uno strato che si sposta col puntatore in proporzione alla sua profondità.
// dx riduce lo spostamento orizzontale (la stella di sinistra non deve finire sopra il testo).
function Layer({ px, py, depth, dx = 1, rotate = 0, className, children }) {
  const x = useTransform(px, (v) => v * depth * dx * 180);
  const y = useTransform(py, (v) => v * depth * 120);
  const r = useTransform(px, (v) => v * rotate);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
  // Il div esterno posiziona (classi Tailwind, anche translate), quello interno si muove.
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <motion.div style={{ transform }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

// La grafica originale delle hero (nastro viola, ricciolo rosa, stelle gialle) resa viva: entra in sequenza,
// il nastro cambia forma di continuo, gli strati seguono il puntatore in profondità, un click o un tocco
// fa spuntare una stella. Con riduci movimento resta tutto fermo.
// minimal: solo il nastro viola che cambia forma, per le pagine interne.
export default function HeroArt({ sectionRef, minimal = false }) {
  const reduce = useReducedMotion();
  const artRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const target = useRef({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (e) => {
      const r = section.getBoundingClientRect();
      target.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
    };
    const leave = () => {
      target.current = { x: 0, y: 0 };
    };
    let frame = 0;
    let last = performance.now();
    const follow = (now) => {
      const k = 1 - Math.exp(-Math.min(now - last, 100) / 1000 / TAU);
      last = now;
      const { x, y } = target.current;
      const cx = px.get();
      const cy = py.get();
      if (Math.abs(x - cx) > 1e-4 || Math.abs(y - cy) > 1e-4) {
        px.set(cx + (x - cx) * k);
        py.set(cy + (y - cy) * k);
      }
      frame = requestAnimationFrame(follow);
    };
    if (finePointer) frame = requestAnimationFrame(follow);
    const pop = (e) => {
      if (e.target.closest("a, button, input, textarea, select")) return;
      const r = section.getBoundingClientRect();
      const star = {
        id: performance.now(),
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        size: 28 + Math.round(Math.random() * 36),
        turn: Math.random() < 0.5 ? -90 : 90,
      };
      setStars((s) => [...s.slice(-(MAX_STARS - 1)), star]);
      setTimeout(() => setStars((s) => s.filter((x) => x.id !== star.id)), 1400);
    };
    if (finePointer) {
      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", leave);
    }
    if (!minimal) section.addEventListener("pointerdown", pop);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      section.removeEventListener("pointerdown", pop);
    };
  }, [sectionRef, reduce, px, py, minimal]);

  // Sequenza: i testi (0.1–0.7s, nelle hero), poi il nastro viola, il ricciolo che si disegna, le stelle una per volta.
  return (
    <>
      <Layer px={px} py={py} depth={0.25} className="inset-x-0 top-[40%] -z-10 h-[42%] lg:top-[8%] lg:h-[78%]">
        <LivingWave className="hero-fade h-full w-full" style={{ "--d": "0.9s" }} />
      </Layer>

      {!minimal && (
        <>
      {/* Stelle nelle posizioni e dimensioni della grafica originale della home. */}
      <Layer px={px} py={py} depth={1.4} rotate={50} className="right-[12%] top-[15%] hidden aspect-square w-[10%] lg:block">
        <div className="hero-pop h-full w-full" style={{ "--d": "2.4s" }}>
          <Icon name="star" size="100%" fill="yellow" className="h-full w-full" />
        </div>
      </Layer>
      <Layer px={px} py={py} depth={1.9} dx={0.15} rotate={-60} className="-left-[5%] top-[36%] hidden aspect-square w-[20%] lg:block">
        <div className="hero-pop h-full w-full" style={{ "--d": "2.7s" }}>
          <Icon name="star" size="100%" fill="yellow" className="h-full w-full" />
        </div>
      </Layer>

      {/* Ricciolo in basso a destra, come nell'originale, ma grande. */}
      {/* Sotto lg il ricciolo sta a destra sotto il testo e scende sopra l'onda: non allunga la hero. */}
      <div className="relative z-10 -mb-[18vw] -mt-2 ml-auto aspect-square w-[46%] max-w-[320px] sm:w-[36%] lg:absolute lg:bottom-[4%] lg:right-[2%] lg:m-0 lg:w-[30vw] lg:max-w-[500px]">
        <Layer px={px} py={py} depth={0.7} className="inset-0">
          <Swirl className="h-full w-full" style={{ "--d": "1.1s" }} />
        </Layer>
      </div>

        </>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence>
          {stars.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.6, rotate: s.turn }}
              animate={{ opacity: 1, scale: 1, rotate: 0, transition: POP }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
              style={{ left: s.x - s.size / 2, top: s.y - s.size / 2, width: s.size, height: s.size }}
              className="absolute"
            >
              <Icon name="star" size="100%" fill="yellow" className="h-full w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
