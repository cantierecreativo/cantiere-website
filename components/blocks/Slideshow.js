"use client";
import { Image } from "react-datocms";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import {
  Autoplay,
  A11y,
  Pagination,
  Navigation,
  Parallax,
} from "swiper/modules";
import "swiper/css/bundle";

export default function Carousel({ data }) {
  return (
    <header className={`relative bg-blue`}>
      <Swiper
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "active",
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation, A11y, Parallax]}
      >
        {data.map((slide, i) => {
          const { id, image, title, text } = slide;

          return (
            <div
              className="w-full h-[60vh] md:h-screen max-h-full "
              key={`slide-${id}`}
            >
              <SwiperSlide>
                <div className="relative w-full h-[60vh] lg:h-[90vh] max-h-full">
                  <div className="absolute top-[70px] md:top-[90px] left-[15px] right-[15px] bottom-[15px] lg:left-[30px] lg:right-[30px] lg:bottom-[30px] overflow-hidden">
                    <Image
                      className="h-full w-full"
                      data={image.responsiveImage}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    />
                    <div className="h-full w-full absolute z-10  bg-[#4637F1] bg-opacity-80" />
                  </div>

                  <div className="h-full w-full absolute z-20 flex flex-col  justify-center items-center ">
                    <InView>
                      {({ inView, ref, entry }) => {
                        //bg-black bg-opacity-20
                        return (
                          <div ref={ref}>
                            {inView && (
                              <motion.div
                                className="container px-8 lg:px-10 rounded-xl overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                              >
                                {/* <motion.div
                                  initial={{ opacity: 0, y: 200 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
                                  className="m-10 box-decoration-clone font-bold  text-white shadow-title  text-lg md:shadow-title-xl 2xl:shadow-title-2xl  text-xl md:text-4xl xl:text-4xl"
                                >
                                  {title}
                                </motion.div> */}
                                <div className="my-10 box-decoration-clone xl:max-w-[60%]">
                                  {title.split(" ").map((el, i) => (
                                    <motion.span
                                      className="font-bold text-white shadow-title md:shadow-title-xl 2xl:shadow-title-2xl text-3xl md:text-4xl lg:text-5xl "
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{
                                        duration: 1.25,
                                        delay: i / 7,
                                      }}
                                      key={i}
                                    >
                                      {` ${el}`}
                                    </motion.span>
                                  ))}
                                </div>
                                <motion.div
                                  initial={{ opacity: 0, y: 50 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: .75, delay: 1.25}}
                                  className="xl:max-w-[60%] my-10 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl box-decoration-clone text-white  shadow-title md:shadow-title-lg  "
                                >
                                  {text}
                                </motion.div>
                              </motion.div>
                            )}
                          </div>
                        );
                      }}
                    </InView>
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
