import { test, expect } from "bun:test";
import { wavePath } from "../components/hero/LivingWave.jsx";

test("il nastro è una curva continua che cambia forma nel tempo", () => {
  const a = wavePath(0);
  expect(a).toMatch(/^M-?[\d.]+,[\d.]+(C[\d.,\s-]+)+$/);
  expect(a).not.toContain("NaN");
  expect(wavePath(5)).not.toBe(a);
  expect(wavePath(5).split("C").length).toBe(a.split("C").length); // stessa struttura, solo i valori cambiano
});
