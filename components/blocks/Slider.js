"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  A11y,
  Parallax,
  Pagination,
  Navigation,
} from "swiper/modules";
import { Image } from "react-datocms";
//import 'swiper/css';
import { cleanFileName } from "lib/utils";

export default function Carousel({ slides, locale }) {
  return (
    <header className={`relative`}>
      <Swiper
        modules={[Autoplay, A11y, Parallax, Pagination, Navigation]}
        spaceBetween={24}
        speed={900}
        slidesPerView={1.25}
        className="mySwiper"
        breakpoints={{
          1280: {
            spaceBetween: 20,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((slide, i) => {
          const { id, image, title, text, label = "" } = slide;

          return (
            <div className="relative" key={`slide-${id}`}>
              <SwiperSlide>
                <div className="relative h-screen w-screen">
                  <div className="absolute h-full w-full">
                    <Image
                      className="h-full w-full duration-300 group-hover:scale-105"
                      data={image.responsiveImage}
                      alt={title || cleanFileName(image.filename)}
                      title={title || cleanFileName(image.filename)}
                    />
                  </div>

                  <div className="absolute top-1/2 z-20 -translate-y-2/4  xl:w-2/3 ">
                    <h2 className="box-decoration-clone font-semibold uppercase text-black bg-white shadow-title md:shadow-title-lg 2xl:shadow-title-xl  text-xl md:text-2xl xl:text-4xl">
                      {title}
                    </h2>
                    <h5 className="text-lg md:text-xl xl:text-3xl box-decoration-clone bg-white shadow-title md:shadow-title-lg 2xl:shadow-title-xl ">
                      {text}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </header>
  );
}
