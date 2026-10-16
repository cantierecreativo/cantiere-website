import { convertToSlug } from "lib/utils";
import { motion } from "framer-motion";

export default function TitleTextBlock({ locale, record, color = "black" }) {
  const { title, left = true, text, labelMenu } = record;

  const colorText = {
    black: "text-black",
    white: "text-white",
  };

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
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div
            className={`lg:col-span-10 lg:col-start-2 grid gap-9 xl:gap-10 ${
              colorText[color]
            } ${left ? "" : "text-center"}`}
          >
            {record.label && (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
              >
                <label className="text-lg xl:text-xl max-w-prose">
                  {record.label}
                </label>
              </motion.div>
            )}
            {title && (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
              >
                <h2
                  className="xl:text-5xl max-w-prose text-2xl font-bold title"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </motion.div>
            )}
            {text && (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={variants}
              >
                <div className="xl:text-xl">
                  <div
                    className={`${
                      left ? "" : "max-w-[600px] mx-auto"
                    } grid gap-6 formatted-text xl:gap-8 paragraph max-w-prose`}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
