module.exports = {
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
