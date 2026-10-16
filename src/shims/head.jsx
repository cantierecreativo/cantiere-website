// Sostituisce next/head: i figli restano dove sono resi. Va bene per il JSON-LD, valido nel body;
// title e meta li scrive src/layouts/BaseLayout.astro.
export default function Head({ children }) {
  return <>{children}</>;
}
