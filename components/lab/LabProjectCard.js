import Link from "next/link";
import { resolveLink } from "lib/utils";
import t from "lib/locales";
import LabVideo from "components/lab/LabVideo";
import { accents } from "components/lab/accents";

// Card di un progetto nell'indice del Lab. Con `cardMedia` mostra un video in loop: il link copre
// tutta la card (after:inset-0) e il bottone pausa del video resta sopra, fuori dal link.
export default function LabProjectCard({ project, locale }) {
  const accent = accents[project.accent];
  const muted = accent ? "text-black" : "text-gray-dark";
  return (
    <article
      className={`group relative grid overflow-hidden rounded-3xl duration-200 hover:-translate-y-1 md:grid-cols-2 ${accent?.card ?? "bg-[#F7F6FE]"}`}
    >
      <div className="relative aspect-[16/10] md:aspect-auto">
        {project.cardMedia ? (
          <LabVideo
            media={project.cardMedia}
            locale={locale}
            rounded=""
            className="block h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.media.poster}
            alt={project.media.alt}
            width={project.media.width}
            height={project.media.height}
            loading="lazy"
            className="h-full w-full bg-white object-cover object-left"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-6 lg:p-10">
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
          <span className={`rounded-full px-3 py-1 text-black ${accent ? "bg-white/70" : "bg-green/20"}`}>
            {project.status}
          </span>
        </div>
        <h2 className="text-2xl font-bold lg:text-3xl">
          <Link href={resolveLink(project, locale)} className="after:absolute after:inset-0">
            {project.shortTitle}
          </Link>
        </h2>
        <p className={`text-lg ${muted}`}>{project.previewText}</p>
        <span
          aria-hidden="true"
          className={`mt-auto text-sm font-bold uppercase tracking-wider group-hover:underline ${accent ? "text-black" : "text-blue"}`}
        >
          {t("lab_discover_project", locale)} →
        </span>
      </div>
    </article>
  );
}
