// Sostituisce next/dynamic con ssr: false (unico uso: react-player): il componente si carica solo nel browser.
import { lazy, Suspense, useEffect, useState } from "react";

export default function dynamic(loader) {
  const Lazy = lazy(loader);
  return function Dynamic(props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted ? (
      <Suspense fallback={null}>
        <Lazy {...props} />
      </Suspense>
    ) : null;
  };
}
