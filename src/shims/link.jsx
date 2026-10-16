// Sostituisce next/link con un <a> semplice: ogni link è un caricamento di pagina.
export default function Link({ href, children, prefetch, legacyBehavior, passHref, scroll, shallow, locale, ...rest }) {
  const url = typeof href === "object" ? href.pathname : href;
  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
}
