import { executeQuery } from "@datocms/cda-client";

// Lette solo lato server (build Astro): nessuna di queste variabili arriva al browser,
// perché astro.config.mjs espone solo quelle elencate in PUBLIC_ENV.
// ponytail: nomi NEXT_PUBLIC_* tenuti per non toccare l'ambiente Netlify; rinominare dopo il go-live.
const token = process.env.NEXT_PUBLIC_DATO_API_KEY;
const environment = process.env.NEXT_PUBLIC_DATO_ENV || undefined;
// Il deploy di preview (DATOCMS_DRAFT=true) builda con le bozze, come faceva la preview mode di Next.
export const draft = process.env.DATOCMS_DRAFT === "true";

// executeQuery ritenta da solo sui 429 e solleva un errore se Dato risponde con errori GraphQL.
export default async function fetchData(query, variables = null, preview = draft) {
  if (!token) throw new Error("NEXT_PUBLIC_DATO_API_KEY mancante");
  return executeQuery(query, {
    token,
    environment,
    includeDrafts: Boolean(preview),
    variables: variables ?? undefined,
  });
}
