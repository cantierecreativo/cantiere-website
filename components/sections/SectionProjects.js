import InternalLink from "components/links/InternalLink";
import TitleTextBlock from "components/blocks/TitleTextBlock";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";
import { cleanFileName } from "lib/utils";

export default function SectionProjects({ page, locale, site }) {
  const { titleProject, textProject, labelProject } = page;

  const record = {
    label: labelProject,
    title: titleProject,
    text: textProject,
  };
  return (
    <div className="bg-blue">
      <section className="vertical-spaces">
        <TitleTextBlock record={record} locale={locale} color="white" />
      </section>
      <div className="-mt-12 xl:-mt-20 py-6 lg:pb-24 pb-16 xl:pb-32">
        <div className="container">
          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-16 lg:gap-24 lg:mx-[calc(100%/12)]">
            {page.projects.map((p, i) => {
              const index = i + 1;
              const colSpanClass =
                index != 0 && index % 3 === 0 ? "col-span-2" : "";
              const maxHClass =
                index != 0 && index % 3 === 0 ? "aspect-[2/1]" : "";
              const image =
                index != 0 && index % 3 === 0
                  ? p.previewImage.wideresponsiveImage
                  : p.previewImage.responsiveImage;

              const fallbackAlt = cleanFileName(p.previewImage.filename);

              return (
                <div key={p.id} className={`block w-full ${colSpanClass}`}>
                  <InternalLink
                    className={"group"}
                    element={p}
                    locale={locale}
                    label={p.subtitle}
                  >
                    <div className="relative group-hover:-translate-y-2 duration-200">
                      <DatoImage
                        className={`mb-2 hidden md:block ${maxHClass}`}
                        data={image}
                        alt={p.previewImage.responsiveImage.alt || fallbackAlt}
                        title={
                          p.previewImage.responsiveImage.title || fallbackAlt
                        }
                        objectFit="cover"
                      />
                      <DatoImage
                        className={`mb-2 md:hidden`}
                        data={p.previewImage.responsiveImage}
                        alt={p.previewImage.responsiveImage.alt || fallbackAlt}
                        title={
                          p.previewImage.responsiveImage.title || fallbackAlt
                        }
                        objectFit="cover"
                      />
                      <h2 className="py-2 md:pt-4 xl:text-lg text-sm tracking-wide text-white/90">
                        {p.subtitle}
                      </h2>
                      <h3 className="text-xl font-bold lg:text-xl mb-4 lg:mb-6 text-white">
                        {p.title}
                      </h3>
                      <Button bg="white" />
                    </div>
                  </InternalLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
