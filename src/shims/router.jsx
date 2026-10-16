// Sostituisce next/router e next/navigation: i componenti leggono lingua e percorso dal contesto
// che src/PageView.jsx imposta per ogni pagina.
import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export const RouteContext = createContext({ locale: "it", path: "/" });

// Come in Next, asPath non contiene il prefisso di lingua.
export const asPathFrom = (path) => path.replace(/^\/en(?=\/|$)/, "") || "/";

// Come il router di Next con i18n: un percorso assoluto resta nella lingua corrente.
export function localize(url, locale) {
  if (locale === "it" || typeof url !== "string" || !url.startsWith("/") || /^\/en(?=[/?#]|$)/.test(url)) return url;
  return url === "/" ? "/en" : `/en${url}`;
}

// Stessa pagina (filtri, ?page=): si aggiorna solo l'URL, come la navigazione client di Next. Altrimenti si carica la pagina.
function go(url, locale, method) {
  const target = new URL(localize(url, locale), window.location.href);
  if (target.pathname !== window.location.pathname) return window.location.assign(target);
  window.history[method](null, "", target);
  window.dispatchEvent(new Event(HISTORY_EVENT));
  // Prima lo faceva routeChangeComplete in pages/_app.js.
  window.dataLayer?.push({ event: "virtual_pageview", page_path: target.pathname + target.search });
}

// L'URL corrente come stato React: con pushState e con Indietro/Avanti i componenti che dipendono
// dal router rileggono l'URL, come quando il router di Next cambiava a ogni navigazione.
const HISTORY_EVENT = "shim:history";
function subscribe(callback) {
  window.addEventListener("popstate", callback);
  window.addEventListener(HISTORY_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(HISTORY_EVENT, callback);
  };
}
const useHref = () => useSyncExternalStore(subscribe, () => window.location.href, () => "");

export function useRouter() {
  const { locale, path } = useContext(RouteContext);
  const href = useHref();
  // Nuovo oggetto solo quando cambia l'URL: alcuni componenti mettono il router nelle dipendenze di useEffect.
  return useMemo(() => ({
    locale,
    asPath: asPathFrom(path),
    pathname: path,
    push: (url) => go(url, locale, "pushState"),
    replace: (url) => go(url, locale, "replaceState"),
    // ponytail: navigazione a pagine intere, quindi nessun evento di cambio rotta
    events: { on() {}, off() {} },
  }), [locale, path, href]);
}

export const usePathname = () => useContext(RouteContext).path;
