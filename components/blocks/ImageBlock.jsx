import { Image as DatoImage } from "react-datocms";
import { convertToSlug, cleanFileName } from "lib/utils";
import { motion } from "framer-motion";

export default function ImageBlock({ record }) {
  const { labelMenu, description, image } = record;
  const fallbackAlt = cleanFileName(image.filename);
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
    <>
      <div
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-start-2 lg:col-span-10">
            {image.responsiveImage ? (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
              >
                <DatoImage
                  className="rounded-xl xl:rounded-[24px]"
                  data={image.responsiveImage}
                  alt={image.responsiveImage?.alt || fallbackAlt}
                  title={image.responsiveImage?.title || fallbackAlt}
                  layout="responsive"
                  objectFit="contain"
                  objectPosition="left"
                />
              </motion.div>
            ) : (
              "Da sostituire l'svg!"
            )}
            {description && (
              <div className="text-xs xl:text-base py-2">{description}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
