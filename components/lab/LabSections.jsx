import { Fragment } from "react";
import LabManifesto from "components/lab/LabManifesto";
import LabTools from "components/lab/LabTools";
import LabFeatured from "components/lab/LabFeatured";
import LabIndexCta from "components/lab/LabIndexCta";
import LabServices from "components/lab/LabServices";
import LabFacts from "components/lab/LabFacts";
import LabChapters from "components/lab/LabChapters";
import LabStory from "components/lab/LabStory";
import LabCta from "components/lab/LabCta";

// Un componente per ogni blocco Lab di Dato.
const BLOCKS = {
  lab_cards_block: (b) => (b.variant === "tiles" ? <LabTools tools={b} /> : <LabManifesto manifesto={b} />),
  lab_projects_block: (b, p) => <LabFeatured heading={b} projects={b.projects} locale={p.locale} />,
  lab_call_block: (b, p) => <LabIndexCta cta={b} locale={p.locale} />,
  lab_services_block: (b, p) => <LabServices services={b} locale={p.locale} />,
  lab_facts_block: (b) => <LabFacts facts={b} />,
  lab_chapters_block: (b) => <LabChapters chapters={b} />,
  lab_story_block: (b, p) => <LabStory story={b} locale={p.locale} />,
  lab_contact_block: (b, p) => <LabCta cta={b} project={p.project} locale={p.locale} />,
};

// Questi blocchi sono fasce a tutta larghezza; gli altri stanno nella colonna con la spaziatura del sito.
const FULL_WIDTH = ["lab_call_block", "lab_services_block", "lab_contact_block"];

export default function LabSections({ sections, locale, project }) {
  const runs = [];
  for (const block of sections) {
    const full = FULL_WIDTH.includes(block.model);
    const last = runs[runs.length - 1];
    if (!full && last?.contained) last.blocks.push(block);
    else runs.push({ contained: !full, blocks: [block] });
  }
  const render = (b) => {
    const el = BLOCKS[b.model]?.(b, { locale, project });
    return el ? <Fragment key={b.id}>{el}</Fragment> : null;
  };
  return runs.map((run) =>
    run.contained ? (
      <div key={run.blocks[0].id} className="vertical-spaces !pt-0 lg:!pt-0">
        {run.blocks.map(render)}
      </div>
    ) : (
      <Fragment key={run.blocks[0].id}>{run.blocks.map(render)}</Fragment>
    )
  );
}
