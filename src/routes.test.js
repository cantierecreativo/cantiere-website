import { test, expect } from "bun:test";
import { pathFor } from "./routes.js";

test("URL IT ed EN come nel sito Next", () => {
  expect(pathFor("index", "it")).toBe("/");
  expect(pathFor("index", "en")).toBe("/en");
  expect(pathFor("servizi/[slug]", "it", { slug: "web" })).toBe("/servizi/web");
  expect(pathFor("servizi/[slug]", "en", { slug: "web" })).toBe("/en/services/web");
  expect(pathFor("chi-siamo/offerte-lavoro/[slug]", "en", { slug: "dev" })).toBe("/en/about/job-positions/dev");
  expect(pathFor("chi-siamo/team/index", "en")).toBe("/en/about/team");
  expect(pathFor("settori/[slug]", "en", { slug: "moda" })).toBe("/en/industries/moda");
  expect(pathFor("contatti", "en")).toBe("/en/contact-us");
  expect(pathFor("blog/tags/[slug]", "en", { slug: "ai" })).toBe("/en/blog/tags/ai");
  expect(pathFor("[slug]", "it", { slug: "servizi-web" })).toBe("/servizi-web");
  expect(pathFor("[slug]", "en", { slug: "servizi" })).toBe("/en/servizi");
});
