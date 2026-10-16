"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Il nastro viola di sfondo delle hero (era /icons/stroke1Violet.svg, #A5A0F2 al 30%):
// stesso andamento, ma generato qui e deformato lentamente nel tempo, come un'onda.
// Due armoniche con velocità diverse → la forma non si ripete mai uguale.
const W = 1512;
const H = 702;
const STEP = 84;

export function wavePath(t) {
  const pts = [];
  for (let x = -STEP * 2; x <= W + STEP * 2; x += STEP) {
    const y =
      H * 0.5 +
      150 * Math.sin(x / 270 + t * 0.32) +
      70 * Math.sin(x / 150 - t * 0.21 + 1.3) +
      30 * Math.sin(x / 90 + t * 0.47 + 2.1);
    pts.push([x, y]);
  }
  // Catmull-Rom → Bézier cubiche: curva continua senza spigoli.
  let d = `M${pts[0][0]},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] || pts[i], pts[i], pts[i + 1], pts[i + 2] || pts[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
  }
  return d;
}

export default function LivingWave({ className = "", style }) {
  const pathRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const path = pathRef.current;
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const tick = (now) => {
      path.setAttribute("d", wavePath((now - start) / 1000));
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    // Fermo quando la hero è fuori schermo: niente lavoro inutile durante lo scroll.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(path);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduce]);

  return (
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={className} style={style}>
      <path ref={pathRef} d={wavePath(0)} fill="none" stroke="#A5A0F2" strokeOpacity="0.3" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "clamp(56px, 8vw, 128px)" }} />
    </svg>
  );
}
