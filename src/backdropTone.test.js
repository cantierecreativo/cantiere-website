import { test, expect } from "bun:test";
import { toneOf } from "../components/layout/backdropTone.js";

const el = (o) => ({ tagName: "DIV", backgroundColor: "rgba(0, 0, 0, 0)", backgroundImage: "none", ...o });

test("sfondi del sito", () => {
  expect(toneOf(el({ backgroundImage: "radial-gradient(circle at 50% 40%, rgb(103, 102, 217) 0%, rgb(57, 56, 224) 75%)" }))).toBe("dark");
  expect(toneOf(el({ backgroundColor: "rgb(82, 81, 245)" }))).toBe("dark"); // bg-blue
  expect(toneOf(el({ backgroundColor: "rgb(143, 135, 240)" }))).toBe("dark"); // viola delle card
  expect(toneOf(el({ backgroundColor: "rgb(255, 255, 255)" }))).toBe("light");
  expect(toneOf(el({ backgroundColor: "rgb(228, 255, 134)" }))).toBe("light"); // giallo dell'onda
  expect(toneOf(el({ backgroundColor: "rgb(221, 214, 254)" }))).toBe("light"); // lilla delle hero servizio
});

test("trasparenze e immagini", () => {
  expect(toneOf(el({}))).toBe(null);
  expect(toneOf(el({ backgroundColor: "rgba(255, 255, 255, 0.2)" }))).toBe(null);
  expect(toneOf(el({ tagName: "IMG" }))).toBe("image");
  expect(toneOf(el({ backgroundImage: 'url("/background/gradient.svg")' }))).toBe("image");
});
