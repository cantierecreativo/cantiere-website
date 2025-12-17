import PreviewCard from "components/cards/PreviewCard";
import InternalLink from "components/links/InternalLink";
import { motion } from "framer-motion";

export default function DoubleElements({ locale, elements, title }) {
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
      <div className="container margin-scroll-standard lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          {title && (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={variants}
            >
              <h2 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold">
                {title}
              </h2>
            </motion.div>
          )}
          <div className="grid md:grid-cols-2 py-8 gap-8 xl:py-20">
            {elements.map((e) => (
              <div key={e.id}>
                <InternalLink
                  element={e}
                  locale={locale}
                  className="group grid gap-4"
                  label={e.title}
                >
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true }}
                    variants={variants}
                  >
                    <PreviewCard record={e} />
                  </motion.div>
                </InternalLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
