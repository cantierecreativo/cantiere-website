import { Image as DatoImage } from "react-datocms";
import { convertToSlug } from "lib/utils";

export default function ImageBlock({ record }) {
  const { labelMenu, description } = record;
  return (
    <>
      <div
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-span-10">
            <DatoImage
              className=""
              data={record.image.responsiveImage}
              alt={record.image.responsiveImage.alt}
              title={record.image.responsiveImage.title}
              layout="responsive"
            />
            {description && (
              <div className="text-xs xl:text-base py-2">{description}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
