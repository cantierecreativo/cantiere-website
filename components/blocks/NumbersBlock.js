import { renderHTML, convertToSlug } from "lib/utils";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function NumbersBlock({ record }) {
  const { numbers, text, title, labelMenu, icon } = record;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="overflow-hidden relative"
      >
        <div className="container margin-scroll-standard">
          <div className="text-center relative">
            <div className="">
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
              >
                <h3 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold mx-auto">
                  {title}
                </h3>
              </motion.div>
              {text && (
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={variants}
                >
                  <div className="text-lg lg:text-xl max-w-prose py-8">
                    {renderHTML(text)}
                  </div>
                </motion.div>
              )}
            </div>
            <div className="lg:flex lg:gap-4 lg:justify-center mt-20 lg:mt-32">
              {numbers &&
                numbers.map(({ id, number, description, icon }) => (
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true }}
                    variants={variants}
                    key={id}
                    className="lg:w-[30%] rounded-3xl p-12 flex flex-col gap-6 justify-end items-center relative bg-gradient-to-t from-[#5251f5] to-[#b9b3ed] bg-[linear-gradient(-74.16524839381304deg, #5251f5 0.00%, #b9b3ed 100.00%)]"
                  >
                    {icon && (
                      <div className="bg-blue rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[30%] flex items-center justify-center">
                        <Image
                          src={icon.url}
                          alt={icon.alt}
                          className="!w-1/2"
                          width="10"
                          height="10"
                        />
                      </div>
                    )}
                    <div className="space-y-[18px] pt-12 text-white">
                      <p className="text-base leading-[19px] text-center">
                        <span className="text-white text-base font-bold uppercase">
                          {description}
                        </span>
                      </p>

                      <h1 className="text-6xl leading-[63px] text-center">
                        <span className="text-5xl font-bold">{number}</span>
                      </h1>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
