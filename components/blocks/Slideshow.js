"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InView } from "react-intersection-observer";
import DatoImage from "react-datocms/image";
import {
  Autoplay,
  A11y,
  EffectFade,
  Pagination,
  Navigation,
  Parallax,
} from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/bundle";
import { cleanFileName } from "lib/utils";
import Icon from "../layout/Icon";

export default function Carousel({ data, pageTitle }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const rotate1 = useTransform(scrollY, [0, 500], [0, 20]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);
  const rotate2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [50, -100]);

  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(circle,_#8281D2_0%,_#3938E0_80%)] pb-[35vh]">
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-[15%] right-[12%] w-[10%] aspect-square z-10"
        >
          <Icon
            name="star"
            className="w-full h-full"
            size="100%"
            fill="yellow"
          />
        </motion.div>
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-[50%] left-[-5%] w-[20%] aspect-square z-10"
        >
          <Icon
            name="star"
            className="w-full h-full"
            size="100%"
            fill="yellow"
          />
        </motion.div>
        <motion.div
          style={{ y: y3 }}
          className={`absolute bottom-[20%] w-[40%] lg:w-[20%] aspect-[1/1] left-auto right-[-1%] z-10`}
        >
          <Image
            src="/icons/heroRight.svg"
            alt="heroRight"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            aria-hidden="true"
          />
        </motion.div>
        <Swiper
          speed={1500}
          effect={"fade"}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "active",
          }}
          navigation={true}
          modules={[
            Autoplay,
            EffectFade,
            Pagination,
            Navigation,
            A11y,
            Parallax,
          ]}
        >
          {data.map((slide, i) => {
            const { id, image, title, text } = slide;
            return (
              <div key={i} className="w-full h-[60vh] md:h-screen max-h-full">
                <SwiperSlide>
                  <div className="relative w-full h-[80vh] max-h-full">
                    {image && (
                      <div className="absolute top-[70px] md:top-[90px] left-0 right-0 bottom-0 overflow-hidden">
                        <DatoImage
                          className="h-full w-full"
                          data={image.responsiveImage}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="50% 50%"
                          priority={i === 0 ? true : false}
                          alt={title || cleanFileName(image.filename)}
                        />
                      </div>
                    )}

                    <div className="h-full w-full absolute z-20 flex flex-col  justify-center items-center">
                      <InView>
                        {({ inView, ref, entry }) => {
                          //bg-black bg-opacity-20
                          return (
                            <div ref={ref}>
                              {inView && (
                                <motion.div
                                  className="container px-8 lg:px-10 rounded-xl overflow-hidden text-center"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {pageTitle && i == 0 && (
                                    <h1 className="uppercase text-center mx-auto text-white shadow-title mb-10">
                                      {pageTitle.split(" ").map((el, i) => (
                                        <motion.span
                                          className="uppercase font-bold"
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
                                    </h1>
                                  )}
                                  <div className="mb-6 box-decoration-clone lg:max-w-[90%] mx-auto gradient-text">
                                    {title.split(" ").map((el, i) => (
                                      <motion.span
                                        className="font-bold italic text-white mx-auto shadow-title md:shadow-title-xl 2xl:shadow-title-2xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
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
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.75, delay: 1.25 }}
                                    className="lg:max-w-[60%] text-lg lg:text-xl box-decoration-clone text-white shadow-title md:shadow-title-lg mx-auto"
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
        <div
          className={`absolute bottom-0 h-[20vh] lg:h-[35vh] left-1/2 -translate-x-1/2 w-full top-auto`}
        >
          <Image
            src="/icons/top-yellow-violet.svg"
            alt="lineHero"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            aria-hidden="true"
          />
        </div>
      </header>
    </>
  );
}
