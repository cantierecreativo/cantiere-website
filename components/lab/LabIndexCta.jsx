import { CalendlyButton } from "components/lab/LabButton";

// Chiusura dell'indice: CTA per chi ha dati da trasformare in un progetto.
export default function LabIndexCta({ cta, locale = "it" }) {
  return (
    <section className="bg-banner-blue bg-cover py-16 text-white lg:py-24">
      <div className="container text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl xl:text-5xl">{cta.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg lg:text-xl">{cta.text}</p>
        <CalendlyButton project="lab_index" position="cta" locale={locale} className="mt-10">
          {cta.callLabel}
        </CalendlyButton>
      </div>
    </section>
  );
}
