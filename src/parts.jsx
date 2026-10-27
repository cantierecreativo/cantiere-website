// Viste e blocchi caricati a pezzi: nel browser ognuno è un file JS a sé, scaricato solo dalle pagine che lo usano.
// Sul server sono caricati prima del render (preload in [...path].astro), così l'HTML esce completo e non passa
// da Suspense; nel browser, finché il pezzo non arriva, React lascia in pagina l'HTML del server.
import { Suspense } from "react";

export function parts(loaders) {
  const ready = {};
  const pending = {};
  const load = (name) => (pending[name] ??= loaders[name]().then((m) => (ready[name] = m.default ?? m)));
  function Part({ name, ...props }) {
    const Component = ready[name];
    if (!Component) throw load(name);
    return <Component {...props} />;
  }
  return {
    preload: (names = Object.keys(loaders)) => Promise.all(names.map(load)),
    Part: (props) => (
      <Suspense fallback={null}>
        <Part {...props} />
      </Suspense>
    ),
  };
}
