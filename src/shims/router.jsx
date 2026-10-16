// Sostituisce next/router e next/navigation: i componenti leggono lingua e percorso dal contesto
// che src/PageView.jsx imposta per ogni pagina.
import { createContext, useContext } from "react";

export const RouteContext = createContext({ locale: "it", path: "/" });

// Come in Next, asPath non contiene il prefisso di lingua.
export const asPathFrom = (path) => path.replace(/^\/en(?=\/|$)/, "") || "/";

const go = (url) => window.location.assign(url);

export function useRouter() {
  const { locale, path } = useContext(RouteContext);
  return {
    locale,
    asPath: asPathFrom(path),
    pathname: path,
    push: go,
    replace: go,
    // ponytail: navigazione a pagine intere, quindi nessun evento di cambio rotta
    events: { on() {}, off() {} },
  };
}

export const usePathname = () => useContext(RouteContext).path;
