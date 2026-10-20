module.exports = {
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
    localeDetection: false,
  },
  // EN URLs use translated segments, served by the Italian page folders.
  // Keep in sync with lib/locales/labels.json (slug_* in "en") and next-sitemap.config.js.
  async rewrites() {
    return [
      { source: "/en/contact-us", destination: "/en/contatti", locale: false },
      {
        source: "/en/about/job-positions/:slug*",
        destination: "/en/chi-siamo/offerte-lavoro/:slug*",
        locale: false,
      },
      { source: "/en/about/:path*", destination: "/en/chi-siamo/:path*", locale: false },
      { source: "/en/services/:slug*", destination: "/en/servizi/:slug*", locale: false },
      { source: "/en/solutions/:slug*", destination: "/en/soluzioni/:slug*", locale: false },
      { source: "/en/technologies/:slug*", destination: "/en/tecnologie/:slug*", locale: false },
      { source: "/en/methods/:slug*", destination: "/en/metodo/:slug*", locale: false },
      { source: "/en/industries/:slug", destination: "/en/settori/:slug", locale: false },
    ];
  },
  // Legacy URLs (old blog /blog/YYYY/MM/DD/name, old pages) → current pages. Source of truth: redirects/legacy-map.json
  // Note: public/_redirects is applied by Netlify before these rules and wins on overlapping URLs.
  async redirects() {
    // With i18n, Next matches unprefixed IT URLs as "/it/...", so IT sources get the default-locale prefix.
    const legacy = require("./redirects/legacy-map.json").map((r) => ({
      source: r.source.startsWith("/en/") ? r.source : `/it${r.source}`,
      destination: r.destination,
      statusCode: 301,
      locale: false,
    }));
    // The Lab moved from /lab to /ai-lab (Oct 2026). Only page URLs: the media under /lab/... (public/lab) stay where they are,
    // so the project slug must be a single segment without dots.
    const lab = [
      { source: "/it/lab", destination: "/ai-lab" },
      { source: "/it/lab/:slug([a-z0-9-]+)", destination: "/ai-lab/:slug" },
      { source: "/en/lab", destination: "/en/ai-lab" },
      { source: "/en/lab/:slug([a-z0-9-]+)", destination: "/en/ai-lab/:slug" },
    ].map((r) => ({ ...r, statusCode: 301, locale: false }));
    return [...lab, ...legacy];
  },
  async headers() {
    return [
      {
        source: "/blog/:slug*",
        headers: [
          {
            key: "Cache-Tag",
            value: ":slug*", // Matched parameters can be used in the value
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  // output: "export",
  images: {
    // unoptimized: true,
    domains: ["www.datocms-assets.com", "image.mux.com"],
  },
};
