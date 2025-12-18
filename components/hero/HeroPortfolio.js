import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import ExternalLink from "components/links/ExternalLink";
import Button from "components/blocks/Button";
import t from "lib/locales";
import { cleanFileName } from "lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroPortfolio({ locale, page }) {
  const { title, urlWebsite, abstract, cover, teamMembers } = page;
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 500], [0, -60]);
  const image = cover;
  return (
    <>
      <header className="overflow-hidden py-24 pb-12 md:pt-44 z-10 relative bg-gradient-to-b from-violet/50 to-white">
        <motion.div
          style={{ x: x1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[150%] xl:w-[110%] h-[60vh] top-[30%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke1Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="container lg:w-10/12 xl:w-8/12">
          <div className="space-y-4 md:space-y-6 text-center xl:space-y-8">
            <div className="uppercase text-center font-bold tracking-wider">
              portfolio
            </div>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {title}
            </h1>
            {abstract && (
              <div className="md:text-lg">{renderHTML(abstract)}</div>
            )}
            {urlWebsite && (
              <ExternalLink
                url={urlWebsite}
                label={title}
                locale={locale}
                className="group md:col-span-5 md:justify-end md:flex md:items-start"
              >
                <Button bg="blue" label={t("go-to-website", locale)} />
              </ExternalLink>
            )}
            {/* <div className="md:col-span-3 md:pt-6">
                  {teamMembers?.length > 0 && (
                    <div className="grid gap-2 content-start md:col-start-10">
                      <div className="text-xs text-black/50 pb-1">Team</div>
                      {teamMembers.map((t) => (
                        <div key={t.id}>{t.name}</div>
                      ))}
                    </div>
                  )}
                </div> */}
          </div>
        </div>
        {image && (
          <div className="lg:mt-36 aspect-[5/3] w-[80%] mt-12 lg:w-[60%] rounded-2xl overflow-hidden relative mx-auto md:mt-24">
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
      </header>
    </>
  );
}
