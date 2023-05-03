import InternalLink from "components/links/InternalLink";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";
import TitleButton from "components/blocks/TitleButton";
import { Image as DatoImage } from "react-datocms";

export default function SectionProjects({ page, locale, site }) {
  const { titleProject, textProject } = page;
  return (
    <>
      <section className="vertical-spaces container">
        <TitleButton
          title={titleProject}
          text={textProject}
          element={site.worksIndex}
          locale={locale}
        />
      </section>
      <div className="-mt-12 xl:-mt-20 py-6 lg:pb-24 pb-16 xl:py-0 xl:pb-12 padding-left-container">
        <Splide
          aria-label="Projects Gallery"
          options={{ autoWidth: true, arrows: false, pagination: false }}
        >
          {page.projects.map((p) => (
            <SplideSlide key={p.id}>
              <InternalLink
                className={"group"}
                element={p}
                locale={locale}
                label={p.subtitle}
              >
                <div className="w-[280px] md:w-[385px] xl:w-[440px] mr-4 relative md:mr-6 group-hover:-translate-y-2 duration-200">
                  <DatoImage
                    className="mb-2"
                    data={p.previewImage.responsiveImage}
                    alt={p.previewImage.responsiveImage.alt}
                    title={p.previewImage.responsiveImage.title}
                    layout=""
                  />
                  <h2 className="py-2 md:pb-4 uppercase text-black font-bold text-sm tracking-wide">
                    {p.title}
                  </h2>
                  <h3 className="text-xl text-blue md:text-xl lg:text-2xl">
                    {p.subtitle}
                  </h3>
                </div>
              </InternalLink>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
