import { useRef } from "react";
import InternalLink from "components/links/InternalLink";
import TitleTextBlock from "components/blocks/TitleTextBlock";
import { Image as DatoImage } from "react-datocms";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
// import ExpoEffect from "components/swiper/ExpoEffect";
import "swiper/css";
import Icon from "components/layout/Icon";
import Image from "next/image";

export default function SectionProjects({ page, locale, site }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const { titleProject, textProject, labelProject } = page;

  const record = {
    label: labelProject,
    title: titleProject,
    text: textProject,
  };
  return (
    <div ref={containerRef} className="bg-blue overflow-hidden relative">
      <motion.div
        aria-hidden="true"
        style={{ y: y1, rotate: rotate1 }}
        className="absolute w-[20%] lg:w-[15%] top-[6%] right-[0] left-auto pointer-events-none"
      >
        <Icon name="star" size="100%" fill="#B79CED" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute w-[110%] h-[80vh] bottom-[0] left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <Image
          src="/icons/lineProject.svg"
          alt="lineProject"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <section className="vertical-spaces text-center">
        <TitleTextBlock record={record} locale={locale} color="white" />
      </section>
      <div className="pb-12 md:pb-24">
        <Swiper
          modules={[Autoplay]}
          centeredSlides={true}
          loop={true}
          spaceBetween={0}
          autoplay={true}
          speed={1000}
          breakpoints={{
            768: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 1.5,
            },
          }}
          className="w-full swiper-projects"
        >
          {page.projects.map((p, i) => {
            return (
              <SwiperSlide key={p.id} className="">
                <InternalLink
                  className="block aspect-[8/5] relative rounded-2xl overflow-hidden"
                  element={p}
                  locale={locale}
                  label={p.subtitle}
                >
                  <DatoImage
                    className="h-full w-full"
                    data={p.previewImage.responsiveImage}
                    alt={p.previewImage.responsiveImage.alt || ""}
                    title={p.previewImage.responsiveImage.title || ""}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute w-[90%] bottom-0 p-6 md:p-12 z-30 text-center mx-auto left-1/2 -translate-x-1/2">
                    <h2 className="mb-4 text-2xl font-bold text-white uppercase lg:text-3xl">
                      {p.title}
                    </h2>
                    <h3 className="text-sm tracking-wide text-white/90 xl:text-lg">
                      {p.subtitle}
                    </h3>
                  </div>
                  <div className="bg-gradient-dark absolute inset-0 z-10" />
                  <div className="bg-gray-800/50 absolute inset-0 z-20" />
                </InternalLink>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
