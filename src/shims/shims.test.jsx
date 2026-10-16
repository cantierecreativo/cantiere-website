import { test, expect } from "bun:test";
import { asPathFrom, localize } from "./router.jsx";
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

test("push resta nella lingua corrente, come Next con i18n", () => {
  expect(localize("/grazie", "en")).toBe("/en/grazie");
  expect(localize("/grazie", "it")).toBe("/grazie");
  expect(localize("/en/portfolio?filter=web", "en")).toBe("/en/portfolio?filter=web");
  expect(localize("/en?x=1", "en")).toBe("/en?x=1");
  expect(localize("/english", "en")).toBe("/en/english");
  expect(localize("?page=2", "en")).toBe("?page=2");
});
