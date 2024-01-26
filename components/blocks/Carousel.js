import React, { useCallback, Fragment } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./CarouselDots";
import Icon from "components/layout/Icon";
import { Image as DatoImage } from "react-datocms";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { useWindowSize } from "usehooks-ts";

export default function Carousel({ data }) {
  const { width, height } = useWindowSize();
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onButtonClick = useCallback((emblaApi) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );

  if (width > 400) {
    return (
      <div className="text-white bg-blue relative py-20 w-[calc(screen-10px)] h-screen ">
        <div className="embla min-h-[84vh] min-h-[90vh]" ref={emblaRef}>
          <div className="embla__container w-full h-full my-20">
            {data.map((slide, index) => {
              const { id, title, image, text, label = "" } = slide;

              return (
                <Fragment key={id}>
                  <InView>
                    {({ inView, ref, entry }) => (
                      <div
                        key={id}
                        className="embla__slide  w-full h-full"
                        ref={ref}
                      >
                        {inView && (
                          <div className="flex flex-col lg:flex-row">
                            <div className="w-full h-full lg:w-[40vw]">
                              <div className="lg:absolute lg:top-[-9rem] lg:pl-[2rem] lg:z-10 lg:w-[70vw] lg:h-[80vh] flex flex-col  justify-center">
                                <motion.div
                                  className="w-full lg:w-[40vw] p-10 rounded-xl"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                  >
                                    <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold">
                                      {title}
                                    </h1>
                                  </motion.div>
                                  <motion.div
                                    className="mt-6"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                  >
                                    <h2 className="text-lg">{text}</h2>
                                  </motion.div>
                                </motion.div>
                              </div>
                            </div>

                            <div className="flex h-[70vh] items-center xl:justify-end">
                              <motion.div
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 1.5 }}
                              >
                                <Icon
                                  className="h-[50vh] xl:h-[70vh] fill-violet "
                                  name="shapeSingle"
                                />
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 1 }}
                                className="h-[50vh] xl:h-[70vh] aspect-[5/7] xl:aspect-[5/5] relative"
                              >
                                <DatoImage
                                  className="rounded-l-full"
                                  data={image.responsiveImage}
                                  alt={image.responsiveImage.alt}
                                  title={image.responsiveImage.title}
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="right"
                                />
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </InView>
                </Fragment>
              );
            })}
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-white bg-blue relative py-20 w-screen min-h-screen ">
        <div className="embla  w-full h-full" ref={emblaRef}>
          <div className="embla__container w-full h-full my-10">
            {data.map((slide, index) => {
              const { id, title, image, text, label = "" } = slide;

              return (
                <Fragment key={id}>
                  <InView>
                    {({ inView, ref, entry }) => (
                      <div
                        key={id}
                        className="embla__slide  w-full h-full"
                        ref={ref}
                      >
                        {inView && (
                          <div className="flex flex-col">
                            <div className="w-full h-full">
                              <div className="flex h-[70vh] items-center xl:justify-end">
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                >
                                  <Icon
                                    className="h-[50vh] xl:h-[70vh] fill-violet "
                                    name="shapeSingle"
                                  />
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1.2, delay: 0.5 }}
                                  className="h-[50vh] xl:h-[70vh] aspect-[5/7] xl:aspect-[5/5] relative"
                                >
                                  <DatoImage
                                    className="rounded-l-full"
                                    data={image.responsiveImage}
                                    alt={image.responsiveImage.alt}
                                    title={image.responsiveImage.title}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="right"
                                  />
                                </motion.div>
                              </div>
                              <div className="absolute top-[10px] left-[10px] lg:z-10">
                                <motion.div
                                  className="w-full p-10 rounded-xl"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                  >
                                    <h1 className="text-3xl font-bold">
                                      {title}
                                    </h1>
                                  </motion.div>
                                  <motion.div
                                    className="mt-6"
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                  >
                                    <h2 className="text-lg">{text}</h2>
                                  </motion.div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </InView>
                </Fragment>
              );
            })}
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
