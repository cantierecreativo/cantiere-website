import { Image as DatoImage } from "react-datocms";
import { convertToSlug } from "lib/utils";
import Image from "next/image";

export default function ImageBlock({ record }) {
  const { labelMenu, description, image } = record;
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
                alt={image.responsiveImage.alt}
                title={image.responsiveImage.title}
                layout="responsive"
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
