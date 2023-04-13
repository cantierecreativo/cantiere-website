import { renderHTML } from "lib/utils";

export default function TitleTextBlock({ locale, record }) {
  const { title, text } = record;
  return (
      <>
        <section className="container">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
            <div className="lg:col-span-10 lg:col-start-2 grid gap-9 xl:gap-12">
                <h2 className="text-3xl md:text-4xl xl:text-5xl max-w-prose">{title}</h2>
              {text && (
                <div className="text-lg md:text-xl max-w-prose">{renderHTML(text)}</div>
              )}
            </div>
          </div>
        </section>
      </>
    );
}
