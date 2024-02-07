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
    <header className={`relative`}>
      <Swiper
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
              className="w-full h-[60vh] md:h-screen max-h-full"
              key={`slide-${id}`}
            >
              <SwiperSlide>
                <div className="relative w-full h-[60vh] md:h-screen max-h-full">
                  <Image
                    className="h-full w-full"
                    data={image.responsiveImage}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />

                  <div className="h-full w-full absolute z-10  bg-[#4637F1] bg-opacity-90">
                    {/* <InView>
                      {({ inView, ref, entry }) => (
                        <div className="h-full w-full" ref={ref}>
                          {inView && !isMobile && (
                            <div className="mt-[10vh] flex justify-end items-end">
                              <motion.div
                                initial={{ opacity: 0, x: 500 }}
                                animate={{ opacity: 0.7, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                              >
                                <Icon
                                  className="mx-4  h-[80vh] max-h-full fill-violet mix-blend-hue"
                                  name="shapeSingle"
                                />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, x: 500 }}
                                animate={{ opacity: 0.7, x: 0 }}
                                transition={{ duration: 0.6, delay: 0 }}
                              >
                                <Icon
                                  className="mx-4   h-[80vh] max-h-full fill-violet mix-blend-hue"
                                  name="shapeSingle"
                                />
                              </motion.div>
                            </div>
                          )}
                        </div>
                      )}
                    </InView> */}
                  </div>

                  <div className="h-full w-full absolute z-20 flex flex-col  justify-center items-center ">
                    <InView>
                      {({ inView, ref, entry }) => {
                        //bg-black bg-opacity-20
                        return (
                          <div ref={ref}>
                            {inView && (
                              <motion.div
                                className="max-w-[80vw] 2xl:max-w-[60vw] p-10 rounded-xl overflow-hidden"
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
                                <div className="m-10 box-decoration-clone">
                                  {title.split(" ").map((el, i) => (
                                    <motion.span
                                      className=" text-white shadow-title md:shadow-title-xl 2xl:shadow-title-2xl  text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{
                                        duration: 2,
                                        delay: i / 10,
                                      }}
                                      key={i}
                                    >
                                      {` ${el}`}
                                    </motion.span>
                                  ))}
                                </div>
                                <motion.div
                                  initial={{ opacity: 0, y: 200 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: 1 }}
                                  className="m-10 text-md lg:text-lg xl:text-xl 2xl:text-2xl box-decoration-clone text-white  shadow-title md:shadow-title-lg  "
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
