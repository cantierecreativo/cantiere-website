import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";

export default function WorkCard({ locale, record }) {
  const { title, previewImage, subtitle, oneColumn } = record;
  return (
    <>
      <div
        className={`${
          oneColumn
            ? "md:col-span-2 lg:grid-cols-12"
            : "md:col-span-1 lg:grid-cols-6"
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
            {previewImage && (
              <DatoImage
                className=""
                data={previewImage.responsiveImage}
                alt={previewImage.responsiveImage.alt}
                title={previewImage.responsiveImage.title}
                layout=""
              />
            )}
            <div className="text-gray-dark font-bold text-xs uppercase lg:text-sm md:pt-2">
              {subtitle}
            </div>
            <h2 className="text-blue text-xl lg:text-2xl">{title}</h2>
            <Button bg="border" />
          </InternalLink>
        </div>
      </div>
    </>
  );
}
