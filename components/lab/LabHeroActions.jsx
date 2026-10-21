import LabButton from "components/lab/LabButton";
import LabVideo from "components/lab/LabVideo";
import t from "lib/locales";
import { trackLab, labMedia } from "lib/lab";

// Bottoni (part="buttons", a destra del testo) e anteprima (part="media", sotto) dell'oggetto, dentro HeroBlue.
export default function LabHeroActions({
  project,
  locale = "it",
  part = "all",
}) {
  const { projectUrl, slug, primaryLabel, secondaryLabel } = project;
  const media = labMedia(project);
  return (
    <div className="relative z-10">
      {part !== "media" && (
        <div className="flex flex-wrap justify-center gap-4">
          <LabButton
            href={projectUrl}
            external
            locale={locale}
            iconClassName="-rotate-45"
            onClick={() =>
              trackLab("atlante_click", { project: slug, position: "hero" })
            }
          >
            {primaryLabel}
          </LabButton>
          <LabButton
            href={`#${t("lab_contact_anchor", locale)}`}
            variant="ghost"
            onClick={() =>
              trackLab("cta_scroll", { project: slug, position: "hero" })
            }
          >
            {secondaryLabel}
          </LabButton>
        </div>
      )}
      {part !== "buttons" && (
        <figure className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white p-2 shadow-[0_40px_80px_-30px_rgba(10,8,80,0.6)] lg:mt-16">
          <LabVideo
            media={media}
            locale={locale}
            className="block h-auto w-full"
            href={projectUrl}
            label={primaryLabel}
            onOpen={() =>
              trackLab("atlante_click", {
                project: slug,
                position: "hero_video",
              })
            }
          />
          <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3 pb-1 text-left text-sm text-gray-dark">
            <span>{media.caption}</span>
            <span className="rounded-full bg-[#F7F6FE] px-3 py-0.5 text-xs text-blue">
              {t("lab_made_by", locale)}
            </span>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
