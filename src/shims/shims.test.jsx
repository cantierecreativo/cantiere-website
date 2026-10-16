import { test, expect } from "bun:test";
import { asPathFrom } from "./router.jsx";
import { imgStyle } from "./image.jsx";

test("asPath senza prefisso di lingua, come in Next", () => {
  expect(asPathFrom("/en/services/web")).toBe("/services/web");
  expect(asPathFrom("/en")).toBe("/");
  expect(asPathFrom("/english-page")).toBe("/english-page");
  expect(asPathFrom("/servizi/web")).toBe("/servizi/web");
});

test("layout fill diventa un'immagine assoluta", () => {
  expect(imgStyle({ layout: "fill", objectFit: "cover" })).toMatchObject({ position: "absolute", objectFit: "cover" });
  expect(imgStyle({ fill: true })).toMatchObject({ position: "absolute" });
  expect(imgStyle({ width: 10 })).toBeUndefined();
});
