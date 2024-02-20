import { renderHTML, convertToSlug } from "lib/utils";

export default function TitleTextBlock({ locale, record, color = "black" }) {
  const { title, left = true, text, labelMenu } = record;

  const colorText = {
    black: "text-black",
    white: "text-white",
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
              <label className="text-lg xl:text-xl max-w-prose">
                {record.label}
              </label>
            )}
            {title && (
              <h2
                className="xl:text-5xl max-w-prose text-3xl font-bold title"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {text && (
              <div className="xl:text-xl">
                <div
                  className={`${
                    left ? "" : "max-w-[600px] mx-auto"
                  } grid gap-6 formatted-text xl:gap-8 paragraph max-w-prose`}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
