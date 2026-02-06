"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import { cleanFileName } from "lib/utils";

export default function HeroHp({ locale, page }) {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 500], [100, -100]);

  const { title, image, abstract, model } = page;

  const menuLabel =
    model === "service"
      ? "Servizi"
      : model === "company_service"
        ? "Settori"
        : "Chi siamo";

  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(circle,_rgba(255,255,255,0.54)_20%,_rgba(112,97,240,0.54)_100%)] pb-[10vh] lg:pb-[30vh] xl:pb-[45vh] 2xl:pb-[55vh]">
        <motion.div
          style={{ x: x1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[160%] xl:w-[110%] h-[60vh] top-[25%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke1Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="relative w-full h-[70vh] lg:h-[80vh] xl:h-[90vh] max-h-full z-20">
          {image && (
            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 aspect-[5/3] w-[80%] lg:w-[60%] rounded-2xl overflow-hidden">
              <DatoImage
                priority="true"
                data={image.responsiveImage}
                alt={image.responsiveImage.alt}
                title={image.responsiveImage.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          <div className="h-[80%] w-full absolute z-20 flex flex-col justify-center items-center">
            <motion.div
              className="container px-8 lg:px-10 text-center space-y-4 xl:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="uppercase text-center font-bold tracking-wider">
                {menuLabel}
              </div>
              <h1 className="xl:text-5xl text-black md:text-4xl font-bold max-w-prose lg:block lg:pr-0 z-20 text-2xl">
                {title}
              </h1>
              <h2 className="text-lg max-w-prose lg:block lg:pr-0 z-20 xl:text-xl mx-auto">
                {renderHTML(abstract)}
              </h2>
            </motion.div>
          </div>
        </div>
        <div
          className={`absolute bottom-0 h-[20vh] lg:h-[35vh] left-1/2 -translate-x-1/2 w-full top-auto`}
        >
          <Image
            src="/icons/top-yellow-white.svg"
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
