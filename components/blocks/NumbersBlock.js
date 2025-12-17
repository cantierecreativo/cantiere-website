import { renderHTML, convertToSlug } from "lib/utils";
import { motion } from "framer-motion";

export default function NumbersBlock({ record }) {
  const { numbers, text, title, labelMenu } = record;
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
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-2">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={variants}
            >
              <h3 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold">
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
          <div className="md:col-span-5 md:col-start-7 grid custom-border-top after:hidden lg:col-span-4 lg:col-start-8">
            {numbers &&
              numbers.map(({ id, number, description }) => (
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={variants}
                  key={id}
                  className="text-xl max-w-prose py-8 custom-border-bottom"
                >
                  <p className="text-violet text-5xl xl:text-6xl">{number}</p>
                  <p className="text-lg pt-2">{description}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
