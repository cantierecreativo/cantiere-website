import { Image as DatoImage } from "react-datocms";
import { convertToSlug, cleanFileName } from "lib/utils";
import Image from "next/legacy/image";

export default function ImageBlock({ record }) {
  const { labelMenu, description, image } = record;
  const fallbackAlt = cleanFileName(image.filename);
  return (
    <>
      <div
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-span-10">
            {image.responsiveImage ? (
              <DatoImage
                className=""
                data={image.responsiveImage}
                alt={image.responsiveImage?.alt || fallbackAlt}
                title={image.responsiveImage?.title || fallbackAlt}
                layout="responsive"
                objectFit="contain"
                objectPosition="left"
              />
            ) : (
              "Da sostituire l'svg!"
            )}
            {description && (
              <div className="text-xs xl:text-base py-2">{description}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
