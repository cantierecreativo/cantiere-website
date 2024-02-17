import { renderHTML, convertToSlug } from "lib/utils";

export default function TitleTextBlock({ locale, record, color = "black" }) {
  const { title, text, labelMenu } = record;

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
            className={`lg:col-span-10 lg:col-start-2 grid gap-9 xl:gap-12 ${colorText[color]}`}
          >
            {record.label && (
              <label className="text-lg xl:text-xl max-w-prose">
                {record.label}
              </label>
            )}
            {title && (
              <h2 className="xl:text-5xl max-w-prose text-3xl font-bold">
                {title}
              </h2>
            )}
            {text && (
              <div className="max-w-prose xl:text-xl">
                <div
                  className="grid gap-6 formatted-text xl:gap-8 paragraph"
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
