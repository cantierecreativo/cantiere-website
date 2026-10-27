// Unica isola React della pagina: sceglie la vista e fornisce lingua e percorso agli shim di Next.
// Astro non idrata componenti scelti a runtime, per questo la scelta avviene qui dentro.
import { RouteContext } from "./shims/router.jsx";
import { parts } from "./parts.jsx";

// Una vista per file JS: ogni pagina scarica solo la sua (vedi parts.jsx).
// Solo il componente (import: "default"): getStaticProps e le query a Dato restano fuori dal browser.
export const views = parts(import.meta.glob("../views/**/*.jsx", { import: "default" }));

export default function PageView({ view, locale, path, props }) {
  return (
    <RouteContext.Provider value={{ locale, path }}>
      <views.Part name={`../views/${view}.jsx`} {...props} />
    </RouteContext.Provider>
  );
}
