import LabButton from "components/lab/LabButton";
import LabVideo from "components/lab/LabVideo";
import t from "lib/locales";
import { trackLab } from "lib/lab";

// Bottoni e anteprima dell'oggetto, dentro HeroBlue.
export default function LabHeroActions({ project, locale = "it" }) {
  const { atlasUrl, media, cta, slug, heroActions } = project;
  return (
    <div className="relative z-10">
      <div className="flex flex-wrap justify-center gap-4 pt-8 xl:pt-12">
        <LabButton
          href={atlasUrl}
          external
          locale={locale}
          iconClassName="-rotate-45"
          onClick={() => trackLab("atlante_click", { project: slug, position: "hero" })}
        >
          {heroActions.primary.label}
        </LabButton>
        <LabButton
          href={`#${cta.id}`}
          variant="ghost"
          onClick={() => trackLab("cta_scroll", { project: slug, position: "hero" })}
        >
          {heroActions.secondary.label}
        </LabButton>
      </div>
      <figure className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white p-2 shadow-[0_40px_80px_-30px_rgba(10,8,80,0.6)] lg:mt-16">
        <LabVideo
          media={media}
          locale={locale}
          className="block h-auto w-full"
          href={atlasUrl}
          onOpen={() => trackLab("atlante_click", { project: slug, position: "hero_video" })}
        />
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3 pb-1 text-left text-sm text-gray-dark">
          <span>{media.caption}</span>
          <span className="rounded-full bg-[#F7F6FE] px-3 py-0.5 text-xs text-blue">
            {t("lab_made_by", locale)}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
