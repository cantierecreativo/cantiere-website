import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";
import { Image as DatoImage } from "react-datocms";

export default function Gallery({ locale, record }) {
  const { images } = record;
  return (
    <>
      <div className="container">
        <div className="lg:grid-cols-12 lg:grid">
          <div className="lg:col-span-10 lg:col-start-2">
            <Splide
              hasTrack={false}
              aria-label="Gallery Images"
              options={{
                classes: {
                  arrows: "fill-white",
                  prev: "-left-4 rotate-180 md:left-4 md:pl-3 fill-white",
                  next: "-right-4 left-auto md:right-4 md:pl-3",
                },
                arrowPath:
                  "M26.6,20.8H10.2v-1.7h16.4l-4.9-4.9l1.2-1.2l6.9,6.9l-6.9,6.9l-1.2-1.2C21.7,25.7,26.6,20.8,26.6,20.8z",
              }}
            >
              <SplideTrack>
                {images.map((i) => (
                  <SplideSlide key={i.id}>
                    <div className="">
                      <DatoImage
                        className=""
                        data={i.image.responsiveImage}
                        alt={i.image.responsiveImage.alt}
                        title={i.image.responsiveImage.title}
                        layout=""
                      />
                    </div>
                    {i.caption && (
                      <div className="text-xs xl:text-base py-2">
                        {i.caption}
                      </div>
                    )}
                  </SplideSlide>
                ))}
              </SplideTrack>
              <div className="aspect-video absolute top-0 left-0 right-0">
                <div className="splide__arrows" />
              </div>
            </Splide>
          </div>
        </div>
      </div>
    </>
  );
}
