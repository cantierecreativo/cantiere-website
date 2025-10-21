import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";
import { Image as DatoImage } from "react-datocms";
import Icon from "components/layout/Icon";
import { renderHTML } from "lib/utils";
import { convertToSlug } from "lib/utils";

export default function CarouselQuote({ locale, record }) {
  const { labelMenu, quotes } = record;
  // return console.log("caio", record);
  return (
    <>
      <div
        id={`${convertToSlug(labelMenu)}`}
        className="bg-blue text-white max-w-screen overflow-hidden -mt-12"
      >
        <div className="text-center py-12 lg:py-20">
          {labelMenu && <h2>{labelMenu}</h2>}
          <div className="">
            <div className="">
              <Splide
                pagination={true}
                hasTrack={false}
                aria-label="Gallery Images"
                options={{
                  classes: {
                    arrows: "fill-white",
                    prev: "fill-violet",
                    next: "rotate-180 fill-white/40 -translate-y-2.5",
                    pagination: "",
                    page: "size-2.5 bg-white/40 pagination rounded-full mx-2",
                  },
                  arrowPath:
                    "M17 3.08271L5.95726 14.9624L16.9274 26.9925L14.094 30L0 15.1128L13.9487 0L17 3.08271Z",
                }}
              >
                <SplideTrack>
                  {quotes.map((record) => (
                    <SplideSlide key={record.id}>
                      <blockquote className="text-center relative py-8 lg:py-16 px-10 md:px-16">
                        <Icon
                          name="quote"
                          className="mx-auto lg:scale-125"
                          fill="#F6F69C"
                          size="40"
                        />
                        <div className="space-y-4 max-w-[780px] mx-auto">
                          <div className="">
                            <div className="text-2xl md:text-3xl lg:text-3xl py-4 max-w-prose lg:py-8">
                              {renderHTML(record.text)}
                            </div>
                            <div className="flex items-center pt-2 gap-4 justify-center">
                              <DatoImage
                                className="rounded-full"
                                data={record.avatar.responsiveImage}
                                alt={
                                  record.avatar.responsiveImage?.alt ||
                                  "avatar placeholder"
                                }
                                title={
                                  record.avatar.responsiveImage?.title ||
                                  "avatar placeholder"
                                }
                              />
                              <div className="text-left">
                                <p className="text-accent text-base uppercase font-bold">
                                  {record.author}
                                </p>
                                <div className="text-xs">
                                  {renderHTML(record.authorRole)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </blockquote>
                    </SplideSlide>
                  ))}
                </SplideTrack>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[30px]">
                  <div className="splide__arrows flex justify-between" />
                </div>
                <div className="absolute top-auto bottom-0 w-full">
                  <div className="splide__pagination flex justify-between" />
                </div>
              </Splide>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
