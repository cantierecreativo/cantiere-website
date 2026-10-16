// Il tono dello sfondo reale sotto un punto dello schermo: "dark", "light" o "image".
// Serve al logo dell'header per scegliere la versione bianca o a colori.
import { useEffect, useState } from "react";

const MEDIA = new Set(["IMG", "PICTURE", "VIDEO", "CANVAS", "IFRAME"]);

// "rgb(57, 56, 224)" / "rgba(0,0,0,0)" → [r, g, b, a]
export function parseColor(value) {
  const m = value?.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return [r, g, b, a];
}

// Luminanza relativa WCAG, 0 (nero) … 1 (bianco)
export function luminance([r, g, b]) {
  const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// Il logo bianco ha più contrasto del logo a colori sotto questa luminanza.
const DARK_BELOW = 0.35;

// Tono di un elemento dai suoi stili calcolati, o null se è trasparente e bisogna guardare sotto.
export function toneOf({ tagName, backgroundColor, backgroundImage }) {
  if (MEDIA.has(tagName)) return "image";
  if (backgroundImage && backgroundImage !== "none") {
    const colors = [...backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map((m) => parseColor(m[0]));
    if (colors.length) {
      const avg = colors.reduce((t, c) => t + luminance(c), 0) / colors.length;
      return avg < DARK_BELOW ? "dark" : "light";
    }
    if (/url\(/.test(backgroundImage)) return "image";
  }
  const color = parseColor(backgroundColor);
  if (color && color[3] >= 0.5) return luminance(color) < DARK_BELOW ? "dark" : "light";
  return null;
}

function toneAt(x, y, exclude) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (exclude.contains(el)) continue;
    const style = getComputedStyle(el);
    const tone = toneOf({ tagName: el.tagName, backgroundColor: style.backgroundColor, backgroundImage: style.backgroundImage });
    if (tone) return tone;
  }
  return "light"; // sotto c'è solo il body bianco
}

// Ricalcola il tono sotto il centro di `ref` a ogni scroll e resize (al massimo una volta per frame).
export function useBackdropTone(ref, excludeRef, initial = "dark") {
  const [tone, setTone] = useState(initial);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el || !excludeRef.current) return;
      const r = el.getBoundingClientRect();
      if (!r.width) return; // nascosto a questo breakpoint
      setTone(toneAt(r.left + r.width / 2, r.top + r.height / 2, excludeRef.current));
    };
    const schedule = () => frame || (frame = requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, excludeRef]);
  return tone;
}
