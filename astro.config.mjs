// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// In locale le variabili stanno in .env.local (come per scripts/); su Netlify arrivano dall'ambiente.
dotenv.config({ path: ".env.local", quiet: true });

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

// Le sole variabili che possono finire nel browser. Il token Dato resta lato server.
const PUBLIC_ENV = ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_ENV", "NEXT_PUBLIC_GTM_2", "NEXT_PUBLIC_IUBENDA_SITE_ID"];

export default defineConfig({
  site: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cantierecreativo.net",
  trailingSlash: "never",
  build: { format: "directory" },
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/blog/tags/") })],
  vite: {
    resolve: {
      alias: {
        "next/link": r("./src/shims/link.jsx"),
        "next/image": r("./src/shims/image.jsx"),
        "next/head": r("./src/shims/head.jsx"),
        "next/router": r("./src/shims/router.jsx"),
        "next/navigation": r("./src/shims/router.jsx"),
        "next/dynamic": r("./src/shims/dynamic.jsx"),
        components: r("./components"),
        lib: r("./lib"),
        views: r("./views"),
        styles: r("./styles"),
        "src/data": r("./src/data"),
      },
    },
    define: Object.fromEntries(
      PUBLIC_ENV.map((k) => [`process.env.${k}`, JSON.stringify(process.env[k] ?? "")])
    ),
  },
});
