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
