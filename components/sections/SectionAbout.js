import Button from "components/blocks/Button";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";
import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";

export default function SectionAbout({ page, locale, site }) {
  const { titleAbout, textAbout, linkAbout, imageAbout } = page;
  return (
    <>
      <section className="grid gap-16 pb-20 lg:py-28 xl:pb-32 xl:gap-20 2xl:gap-28 2xl:pb-44 z-10 relative container">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="grid gap-6 lg:col-span-10 lg:col-start-2 md:gap-10">
            <h2 className="text-2xl md:text-3xl xl:text-4xl max-w-prose">
              {titleAbout}
            </h2>
            <DatoImage
              className=""
              data={imageAbout.responsiveImage}
              alt={imageAbout.responsiveImage.alt}
              title={imageAbout.responsiveImage.title}
              layout=""
            />
            <div className="-mt-3 text-sm lg:-mt-6">
              {imageAbout.responsiveImage.alt}
            </div>
            <h3 className="text-lg max-w-prose lg:max-w-lg xl:max-w-2xl">
              {renderHTML(textAbout)}
            </h3>
            <InternalLink
              element={linkAbout.relatedElement}
              locale={locale}
              label={titleAbout}
            >
              <div className="border-black border-b-2 pb-1 inline-block">
                {t("more", locale)}
              </div>
            </InternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
