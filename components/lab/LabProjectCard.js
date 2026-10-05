import Link from "next/link";
import { resolveLink } from "lib/utils";
import t from "lib/locales";


// Card di un progetto nell'indice del Lab.
export default function LabProjectCard({ project, locale }) {
  return (
    <Link
      href={resolveLink(project, locale)}
      className="group grid overflow-hidden rounded-3xl bg-[#F7F6FE] duration-200 hover:-translate-y-1 md:grid-cols-2"
    >
      <div className="relative aspect-[16/10] bg-white md:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.media.poster}
          alt={project.media.alt}
          width={project.media.width}
          height={project.media.height}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 lg:p-10">
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
          <span className="rounded-full bg-green/20 px-3 py-1 text-black">{project.status}</span>
        </div>
        <h2 className="text-2xl font-bold lg:text-3xl">{project.shortTitle}</h2>
        <p className="text-lg text-gray-dark">{project.previewText}</p>
        <span className="mt-auto text-sm font-bold uppercase tracking-wider text-blue group-hover:underline">
          {t("lab_discover_project", locale)} →
        </span>
      </div>
    </Link>
  );
}
