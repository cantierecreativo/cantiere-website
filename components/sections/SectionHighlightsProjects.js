import InternalLink from "components/links/InternalLink";
import TitleTextBlock from "components/blocks/TitleTextBlock";
import { Image as DatoImage } from "react-datocms";
import "swiper/css";
import Icon from "components/layout/Icon";
import Image from "next/image";
import { renderHTML } from "lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionHighlightsProjects({ page, locale, site }) {
  const {
    labelHighlightProjects,
    titleHighlightProjects,
    textHighlightProjects,
  } = page;

  const record = {
    label: labelHighlightProjects,
    title: titleHighlightProjects,
    text: textHighlightProjects,
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [400, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-600, 200]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const variants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
      },
    },
  };

  return (
    <div className="text-black overflow-hidden relative">
      <motion.div
        style={{ x: x2, rotate: rot }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Icon
          name="star"
          className={`absolute top-[30%] right-[2%]`}
          size="20%"
          fill="#E4FF86"
        />
      </motion.div>
      <motion.div
        style={{ x: x1 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <div className="absolute w-[150%] h-[120vh] bottom-[10%] left-1/2 -translate-x-1/2">
          <Image
            src="/icons/lineProject.svg"
            alt="lineProject"
            layout="fill"
            objectFit="cover"
            className="w-full h-full rotate-180 opacity-20"
          />
        </div>
      </motion.div>
      <section className="vertical-spaces text-center">
        <TitleTextBlock record={record} locale={locale} />
      </section>
      <div className="container xl:w-2/3 lg:w-10/12 mx-auto">
        <div className="pb-12 md:pb-24 grid md:grid-cols-2 gap-12">
          {page.highlightProjects.map((p, i) => {
            return (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
                key={p.id}
                className={`${
                  i === 2 ? "md:col-span-2" : ""
                } block relative rounded-[36px] overflow-hidden bg-white border-black/15 border`}
              >
                <InternalLink element={p} locale={locale} label={p.subtitle}>
                  <div
                    className={`${
                      i === 2 ? "h-[50vh]" : "h-[60vh] md:h-[30vh]"
                    } relative bg-white`}
                  >
                    <DatoImage
                      className="h-full w-full"
                      data={p.previewImage.responsiveImage}
                      alt={p.previewImage.responsiveImage.alt || ""}
                      title={p.previewImage.responsiveImage.title || ""}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6 space-y-4 py-8 bg-white">
                    <h2 className="text-xl font-bold lg:text-2xl">{p.title}</h2>
                    <h3 className="text-sm tracking-wide xl:text-base line-clamp-3">
                      {renderHTML(p.abstract)}
                    </h3>
                  </div>
                </InternalLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
