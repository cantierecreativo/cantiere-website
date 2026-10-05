import TextForm from "components/blocks/TextForm";
import { CalendlyButton } from "components/lab/LabButton";
import { trackLab } from "lib/lab";

// CTA per i decisori: fascia con video call, poi il form del sito su fondo bianco (come in /contatti).
export default function LabCta({ locale, project }) {
  const { cta, slug } = project;
  return (
    <>
      <section
        id={cta.id}
        className="margin-scroll-standard bg-banner-blue bg-cover py-16 text-white lg:py-24"
      >
        <div className="container lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:col-start-2">
            <p className="text-sm font-bold uppercase text-yellow">{cta.eyebrow}</p>
            <h2 className="mt-4 text-balance text-3xl font-bold md:text-4xl xl:text-5xl">{cta.title}</h2>
            <CalendlyButton project={slug} position="cta" locale={locale} className="mt-10">
              {cta.callLabel}
            </CalendlyButton>
          </div>
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <p className="text-lg lg:text-xl">{cta.text}</p>
            <ul className="mt-6 space-y-3 text-lg">
              {cta.deliverables.map((d) => (
                <li key={d} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-2 w-2 flex-none rotate-45 rounded-sm bg-yellow" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="py-16 lg:py-24">
        <TextForm
          locale={locale}
          record={{ title: cta.formTitle, text: cta.formText, labelMenu: "scrivici" }}
          formProps={{
            origin: cta.origin,
            interests: cta.interests,
            showBudget: false,
            onSubmitted: () => trackLab("lab_form_submit", { project: slug, position: "form" }),
          }}
        />
      </div>
    </>
  );
}
