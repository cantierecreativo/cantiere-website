import LabButton from "components/lab/LabButton";
import LabVideo from "components/lab/LabVideo";
import { resolveLink } from "lib/utils";
import t from "lib/locales";
import { trackLab } from "lib/lab";

// Progetto in evidenza nell'indice del Lab: anteprima e due azioni.
export default function LabFeatured({ project, heading, locale }) {
  return (
    <section id={heading.id} className="container margin-scroll-standard lg:grid lg:grid-cols-12">
      <div className="lg:col-span-10 lg:col-start-2">
        <p className="text-sm font-bold uppercase text-blue">{heading.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">{heading.title}</h2>
        {heading.text && <p className="mt-6 max-w-prose text-lg lg:text-xl">{heading.text}</p>}
        <article className="mt-10 grid overflow-hidden rounded-3xl bg-[#F7F6FE] lg:grid-cols-2">
          <div className="flex items-center p-4 lg:p-8 lg:pr-0">
            <div className="w-full rounded-2xl bg-white p-1.5 shadow-[0_30px_60px_-30px_rgba(10,8,80,0.45)]">
              <LabVideo media={project.media} locale={locale} className="block h-auto w-full rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-6 p-6 lg:p-10">
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
              <span className="rounded-full bg-green/20 px-3 py-1 text-black">{project.status}</span>
            </div>
            <h3 className="text-2xl font-bold">{project.shortTitle}</h3>
            <p className="text-lg text-gray-dark">{project.previewText}</p>
            <div className="mt-auto flex flex-wrap gap-3">
              <LabButton href={resolveLink(project, locale)} variant="blue">
                {t("lab_discover_project", locale)}
              </LabButton>
              <LabButton
                href={project.atlasUrl}
                external
                locale={locale}
                variant="outline"
                iconClassName="-rotate-45"
                onClick={() => trackLab("atlante_click", { project: project.slug, position: "lab_index" })}
              >
                {t("lab_open_atlas", locale)}
              </LabButton>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
