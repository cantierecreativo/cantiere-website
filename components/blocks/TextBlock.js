import { renderHTML } from "lib/utils";

export default function TextBlock({ locale, record }) {
  const { title, text } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-6 xl:gap-10">
            {title && (
              <h2 className="text-3xl md:text-4xl xl:text-6xl max-w-prose">
                {title}
              </h2>
            )}
            {text && (
              <div className="text-lg max-w-prose">{renderHTML(text)}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
