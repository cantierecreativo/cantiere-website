import { Image as DatoImage } from "react-datocms";
import { convertToSlug } from "lib/utils";

export default function ImageDoubleBlock({ record }) {
  const { labelMenu, images } = record;
  return (
    <>
      <div
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-span-10 md:grid md:grid-cols-2 md:gap-6">
            {images.map((i) => (
              <div key={i.id}>
                <DatoImage
                  className=""
                  data={i.image.responsiveImage}
                  alt={i.image.responsiveImage.alt}
                  title={i.image.responsiveImage.title}
                  layout="responsive"
                />
                {i.caption && (
                  <div className="text-xs xl:text-base py-2">{i.caption}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
