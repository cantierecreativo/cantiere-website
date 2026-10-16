// Sostituisce next/link con un <a> semplice: ogni link è un caricamento di pagina.
// Come next/link con i18n, un href assoluto senza lingua prende quella corrente (locale={false} lo evita).
import { useContext } from "react";
import { RouteContext, localize } from "./router.jsx";

export default function Link({ href, children, prefetch, legacyBehavior, passHref, scroll, shallow, locale, ...rest }) {
  const current = useContext(RouteContext).locale;
  const url = typeof href === "object" ? href.pathname : href;
  return (
    <a href={locale === false ? url : localize(url, locale || current)} {...rest}>
      {children}
    </a>
  );
}
