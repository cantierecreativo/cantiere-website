// Sostituisce next/router e next/navigation: i componenti leggono lingua e percorso dal contesto
// che src/PageView.jsx imposta per ogni pagina.
import { createContext, useContext, useMemo } from "react";

export const RouteContext = createContext({ locale: "it", path: "/" });

// Come in Next, asPath non contiene il prefisso di lingua.
export const asPathFrom = (path) => path.replace(/^\/en(?=\/|$)/, "") || "/";

// Come il router di Next con i18n: un percorso assoluto resta nella lingua corrente.
export const localize = (url, locale) =>
  locale !== "it" && url.startsWith("/") && !/^\/en(?=[/?#]|$)/.test(url) ? `/en${url}` : url;

// Stessa pagina (filtri, ?page=): si aggiorna solo l'URL, come la navigazione client di Next. Altrimenti si carica la pagina.
function go(url, locale, method) {
  const target = new URL(localize(url, locale), window.location.href);
  if (target.pathname === window.location.pathname) window.history[method](null, "", target);
  else window.location.assign(target);
}

export function useRouter() {
  const { locale, path } = useContext(RouteContext);
  // Oggetto stabile: alcuni componenti mettono il router nelle dipendenze di useEffect.
  return useMemo(() => ({
    locale,
    asPath: asPathFrom(path),
    pathname: path,
    push: (url) => go(url, locale, "pushState"),
    replace: (url) => go(url, locale, "replaceState"),
    // ponytail: navigazione a pagine intere, quindi nessun evento di cambio rotta
    events: { on() {}, off() {} },
  }), [locale, path]);
}

export const usePathname = () => useContext(RouteContext).path;
