import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";

export default function CardsBlock({ locale, record, page }) {
  const { cards, orientation, layout } = record;
  return page === "homepage" ? (
    <section className="container">
      <div className="lg:grid lg:grid-cols-12 pb-8 xl:pb-16">
        <div className="border-y border-gray border-dashed grid gap-10 lg:col-span-10 lg:col-start-2 divide-y divide-dashed divide-gray pb-10">
          {cards.map((c) => (
            <div
              key={c.id}
              className="grid gap-5 pt-8 lg:pt-10 md:grid-cols-2 lg:gap-x-0 lg:grid-cols-10 md:gap-8 md:items-center"
            >
              {c.image && (
                <DatoImage
                  className="rounded-l-full my-2 mt-4 lg:col-span-3 lg:m-0"
                  data={c.image.responsiveImage}
                  alt={c.image.responsiveImage.alt}
                  title={c.image.responsiveImage.title}
                  layout=""
                />
              )}
              <div className="grid gap-5 content-start lg:col-span-6 lg:col-start-5">
                {c.title && <h2 className="text-blue text-2xl">{c.title}</h2>}
                {c.text && (
                  <h3 className="lg:text-lg max-w-prose">
                    {renderHTML(c.text)}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <>
      {orientation === true ? (
        <section className="container">
          <div className="lg:grid lg:grid-cols-12">
            <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:col-span-10 lg:col-start-2">
              {cards.map((c, n) => (
                <div
                  key={c.id}
                  className="grid gap-5 p-6 py-8 border border-dashed border-gray lg:pt-10 lg:gap-x-0 bg-white"
                >
                  <div className="grid gap-4 content-start">
                    {layout === false && <div className="">{`0${n + 1}`}</div>}
                    {c.title && (
                      <h2 className="text-blue text-xl">{c.title}</h2>
                    )}
                    {c.text && (
                      <h3 className="xl:text-lg">{renderHTML(c.text)}</h3>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}{" "}
    </>
  );
}
