import LabButton, { CalendlyButton } from "components/lab/LabButton";

// Azioni dell'hero dell'indice Lab: i progetti come prova, la call come contatto.
export default function LabIndexHeroActions({ actions, locale = "it" }) {
  return (
    <div className="relative z-10 flex flex-wrap gap-4 lg:flex-col lg:items-end">
      <LabButton href={actions.primary.href} size="lg" iconClassName="rotate-90">
        {actions.primary.label}
      </LabButton>
      <CalendlyButton project="lab_index" position="hero" locale={locale} variant="ghost" size="lg">
        {actions.secondary.label}
      </CalendlyButton>
    </div>
  );
}
