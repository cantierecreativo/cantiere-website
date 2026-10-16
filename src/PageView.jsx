// Unica isola React della pagina: sceglie la vista e fornisce lingua e percorso agli shim di Next.
// Astro non idrata componenti scelti a runtime, per questo la scelta avviene qui dentro.
import { RouteContext } from "./shims/router.jsx";

const views = import.meta.glob("../views/**/*.jsx", { eager: true, import: "default" });

// ponytail: tutte le viste in un solo bundle, come un'unica app; dividerlo quando i componenti statici diventano .astro
export default function PageView({ view, locale, path, props }) {
  const View = views[`../views/${view}.jsx`];
  return (
    <RouteContext.Provider value={{ locale, path }}>
      <View {...props} />
    </RouteContext.Provider>
  );
}
