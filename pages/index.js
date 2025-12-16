import { useRef } from "react";
import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import { motion, useScroll, useTransform } from "framer-motion";
import fetchData from "lib/dato";
import PostContent from "components/PostContent";
import SectionProjects from "components/sections/SectionProjects";
import Slideshow from "components/blocks/Slideshow";
import SectionHighlightsProjects from "components/sections/SectionHighlightsProjects";
import Image from "next/image";

export default function Home({ locale, site, page }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const { mainBlocks, carousel, whiteBlocks } = page;
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      {carousel && <Slideshow data={carousel} pageTitle={page.title} />}
      <div
        ref={containerRef}
        className="bg-[#8F87F0] text-white relative overflow-hidden pb-40 md:pb-80"
      >
        <div className="relative z-10 space-y-16 pb-20 lg:pb-28 xl:pb-32 xl:space-y-32 2xl:space-y-36 2xl:pb-44">
          {mainBlocks.map((b) => (
            <PostContent
              key={b.id}
              record={b}
              locale={locale}
              page={page}
              textColor="white"
            />
          ))}
        </div>
        <motion.div
          style={{ x: x1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[120%] h-[60vh] top-[10%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke1Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ x: x2 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[120%] xl:h-[120vh] h-[100vh] top-[50%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke2Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full opacity-50"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ x: x3 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[130%] h-[80vh] top-[55%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke3Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute w-full xl:h-[40vh] lg:h-[30vh] h-[20vh] top-auto bottom-0 left-1/2 -translate-x-1/2"
        >
          <Image
            src="/icons/lineWhite.svg"
            alt="lineWhite"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="vertical-spaces bg-white text-black pt-0">
        {whiteBlocks.map((b) => (
          <PostContent key={b.id} record={b} locale={locale} page={page} />
        ))}
      </div>
      <SectionProjects page={page} locale={locale} site={site} />
      <SectionHighlightsProjects page={page} locale={locale} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getHomepage, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.homepage,
      lastNews: response.lastNews,
      site,
    },
  };
}
