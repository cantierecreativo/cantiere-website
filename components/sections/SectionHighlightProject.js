import InternalLink from "components/links/InternalLink";
import Button from "components/blocks/Button";
import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import t from "lib/locales";

export default function SectionHighlightProject({ locale, project }) {
  const { title, slug, subtitle, previewImage, abstract } = project;
  return (
    <>
      <div className="bg-[url('/background/gradient.svg')] bg-cover text-white relative overflow-x-hidden">
        <div className="pt-12 md:py-0 padding-left-container">
          <div className="grid grid-cols-1 gap-7 pb-8 md:pb-0 md:items-center md:grid-cols-2 md:gap-0 lg:pb-0 lg:items-center lg:gap-0">
            <div className="grid gap-7 xl:max-w-sm xl:py-24 md:py-12 lg:py-20">
              <div className="font-bold pr-6">{subtitle}</div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20">
                {title}
              </h2>
              <h3 className="pr-6 max-h-24 line-clamp-4 xl:max-h-36 xl:line-clamp-6">
                {renderHTML(abstract)}
              </h3>
              <InternalLink element={project} locale={locale} label={title}>
                <Button bg="white" label={t("more", locale)} />
              </InternalLink>
            </div>
            <div className="w-full h-full aspect-square relative my-6 md:my-0">
              <DatoImage
                className="rounded-l-full"
                data={previewImage.responsiveImage}
                alt={previewImage.responsiveImage.alt}
                title={previewImage.responsiveImage.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
