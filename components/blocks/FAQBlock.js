"use client";

import { useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import { motion, Variants } from "framer-motion";

const closeIcon = (
  <span className="flex-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 xl:size-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".8"
        d="M18 12H6"
      />
    </svg>
  </span>
);

const openIcon = (
  <span className="flex-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 xl:size-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </span>
);

const FAQBlock = ({ record, locale }) => {
  const { faqs, title, text } = record;

  const [openQuestions, setOpenQuestions] = useState([]);

  function toggleQuestion(id) {
    if (openQuestions.includes(id)) {
      setOpenQuestions((openQuestions) => {
        return [...openQuestions.filter((qID) => qID !== id)];
      });
    } else {
      setOpenQuestions((openQuestions) => [...openQuestions, id]);
    }
  }

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
    <div className="standard-vertical-m bg-[#F7F6FE] py-16 xl:py-24">
      <div className="container">
        <div className="bg-white">
          <div className="grid gap-6 px-4 py-8 lg:p-10 xl:py-20 lg:flex lg:gap-16 xl:gap-24 xl:px-0 xl:w-10/12 xl:mx-auto">
            <div className="space-y-6 lg:w-1/3">
              {title && <h2 className="text-2xl xl:text-4xl">{title}</h2>}
              {text && (
                <div
                  className="text xl:text-xl"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
            </div>
            <div className="">
              <div className="custom-border-bottom" />
              {faqs.map((f, n) => {
                const isOpen = openQuestions.includes(f.id);
                return (
                  <motion.div
                    layout="position"
                    key={f.id}
                    className={
                      "py-6 xl:py-10 custom-border-top flow-root after:hidden"
                    }
                    onClick={() => {
                      toggleQuestion(f.id);
                    }}
                  >
                    <button className="flex w-full items-center gap-x-4 xl:gap-x-8">
                      {isOpen ? closeIcon : openIcon}
                      <div
                        className="text-blue text-left xl:text-xl"
                        dangerouslySetInnerHTML={{ __html: f.request }}
                      />
                    </button>

                    <motion.div
                      animate={isOpen ? "open" : "closed"}
                      variants={{
                        open: { opacity: 1 },
                        closed: { opacity: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                      className={"mt-6 text-sm" + (isOpen ? "" : " hidden")}
                    >
                      <div
                        className="pl-12 xl:pl-20 xl:text-lg"
                        dangerouslySetInnerHTML={{ __html: f.answer }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQBlock;
