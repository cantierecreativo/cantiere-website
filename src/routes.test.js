import { test, expect } from "bun:test";
import { pathFor, matchPath } from "./routes.mjs";

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

test("matchPath: dall'URL alla vista, per la preview a richiesta", () => {
  const views = ["index", "[slug]", "contatti", "blog/index", "blog/[slug]", "blog/tags/[slug]", "servizi/[slug]", "chi-siamo/offerte-lavoro/[slug]"];
  expect(matchPath("/", views)).toEqual({ view: "index", locale: "it", params: {} });
  expect(matchPath("/en", views)).toEqual({ view: "index", locale: "en", params: {} });
  expect(matchPath("/contatti", views)).toEqual({ view: "contatti", locale: "it", params: {} });
  expect(matchPath("/en/contact-us", views)).toEqual({ view: "contatti", locale: "en", params: {} });
  expect(matchPath("/blog", views).view).toBe("blog/index");
  expect(matchPath("/blog/nuovo/", views)).toEqual({ view: "blog/[slug]", locale: "it", params: { slug: "nuovo" } });
  expect(matchPath("/blog/tags/ai", views)).toEqual({ view: "blog/tags/[slug]", locale: "it", params: { slug: "ai" } });
  expect(matchPath("/en/services/web", views)).toEqual({ view: "servizi/[slug]", locale: "en", params: { slug: "web" } });
  expect(matchPath("/en/about/job-positions/dev", views).view).toBe("chi-siamo/offerte-lavoro/[slug]");
  expect(matchPath("/una-landing", views)).toEqual({ view: "[slug]", locale: "it", params: { slug: "una-landing" } });
  expect(matchPath("/a/b/c", views)).toBe(null);
});
