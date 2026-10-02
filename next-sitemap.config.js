// EN pages are prerendered under the Italian folders (/en/servizi/...) and served at the
// translated URLs through the rewrites in next.config.js: keep this map in sync with them.
const EN_SEGMENTS = {
  contatti: "contact-us",
  "chi-siamo": "about",
  "offerte-lavoro": "job-positions",
  servizi: "services",
  soluzioni: "solutions",
  tecnologie: "technologies",
  metodo: "methods",
  settori: "industries",
};

module.exports = {
  siteUrl: "https://www.cantierecreativo.net",
  generateRobotsTxt: true,
  sitemapSize: 10000,
  generateIndexSitemap: false,
  exclude: ["/blog/tags/*", "/en/blog/tags/*"],
  transform: async (config, path) => ({
    loc: path.startsWith("/en/")
      ? path
          .split("/")
          .map((s) => EN_SEGMENTS[s] || s)
          .join("/")
      : path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
};
