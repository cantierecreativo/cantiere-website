import { renderHTML, convertToSlug } from "lib/utils";

export default function TitleTextBlock({ locale, record }) {
  const { title, text, labelMenu } = record;
  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-9 xl:gap-12">
            <h2 className="xl:text-5xl max-w-prose text-3xl">{title}</h2>
            {text && (
              <div className="max-w-prose xl:text-xl">
                <div
                  className="grid gap-6 formatted-text xl:gap-8"
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
