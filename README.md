# Cantiere Creativo — sito

Astro (statico) con i componenti React del sito e i contenuti da DatoCMS. Il Lab (`src/data/lab`) vive fuori da Dato.

```bash
bun install
bun run dev        # sviluppo
bun run build      # export articoli, build Astro, redirect in dist/_redirects
bun run preview    # serve dist/
bun test           # test di rotte e shim
bun run parity     # confronta la build con www.cantierecreativo.net (BASE=url per un deploy)
```

Le variabili d'ambiente stanno in `.env.local` (stessi nomi del vecchio sito Next). Il token Dato è letto solo in build;
nel browser arrivano solo le variabili elencate in `PUBLIC_ENV` di `astro.config.mjs`.

## Come è fatto

- `views/` sono le pagine (ex `pages/` di Next): ogni file esporta il componente e i suoi `getStaticPaths`/`getStaticProps`.
- `src/pages/[...path].astro` li chiama per IT ed EN e rende la vista come unica isola React (`src/PageView.jsx`).
- Gli URL vengono da `src/routes.js`: IT senza prefisso, EN sotto `/en` con i segmenti tradotti (`EN_SEGMENTS`).
- `src/shims/` sostituisce le API di Next (`next/link`, `next/image`, `next/head`, `next/router`, `next/dynamic`).
- Meta, GTM e Iubenda stanno in `src/layouts/BaseLayout.astro`.
- Redirect: `public/_redirects` più `redirects/legacy-map.json`, uniti da `scripts/redirects.mjs` dopo la build.
