import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";

export default function WorkCard({
  locale,
  record,
  fromStructuredText = false,
}) {
  const { title, previewImage, subtitle, oneColumn, image } = record;
  const chooseImage = previewImage ? previewImage : image;
  return (
    <>
      <div
        className={`${
          oneColumn
            ? "md:col-span-1"
            : fromStructuredText
            ? "lg:col-span-8 lg:col-start-2 xl:col-span-6 xl:col-start-2 xl:px-0"
            : "md:col-span-1"
        } lg:grid`}
      >
        <div
          className={`${
            oneColumn
              ? "lg:col-start-2 lg:col-span-12"
              : "lg:col-start-2 lg:col-span-5"
          } grid gap-2 content-start`}
        >
          <InternalLink
            element={record}
            label={title}
            locale={locale}
            className={
              "group grid gap-2 lg:gap-4 hover:-translate-y-2 duration-200"
            }
          >
            {chooseImage && (
              <DatoImage
                className=""
                data={chooseImage.responsiveImage}
                alt={chooseImage.responsiveImage.alt}
                title={chooseImage.responsiveImage.title}
                layout=""
              />
            )}
            <div className="text-blue font-bold text-xs uppercase lg:text-sm md:pt-2">
              {subtitle}
            </div>
            <h2 className="text-black text-xl lg:text-2xl font-bold">
              {title}
            </h2>
          </InternalLink>
        </div>
      </div>
    </>
  );
}
