import InternalLink from "components/links/InternalLink";
import TitleTextBlock from "components/blocks/TitleTextBlock";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";

export default function SectionProjects({ page, locale, site }) {
  const { titleProject, textProject, labelProject } = page;
  const record = {
    label: labelProject,
    title: titleProject,
    text: textProject,
  };
  return (
    <div className="bg-blue">
      <section className="vertical-spaces container ">
        <TitleTextBlock record={record} locale={locale} color="white" />
      </section>
      <div className="-mt-12 xl:-mt-20 py-6 lg:pb-24 pb-16 xl:py-0 xl:pb-12 container">
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
                        alt={p.previewImage.responsiveImage.alt}
                        title={p.previewImage.responsiveImage.title}
                        objectFit="cover"
                      />
                      <DatoImage
                        className={`mb-2 md:hidden`}
                        data={p.previewImage.responsiveImage}
                        alt={p.previewImage.responsiveImage.alt}
                        title={p.previewImage.responsiveImage.title}
                        objectFit="cover"
                      />
                      <h2 className="py-2 md:pb-4 uppercase text-black font-bold text-sm tracking-wide text-white">
                        {p.subtitle}
                      </h2>
                      <h3 className="text-xl text-blue md:text-xl lg:text-2xl mb-4 lg:mb-6 text-white">
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
