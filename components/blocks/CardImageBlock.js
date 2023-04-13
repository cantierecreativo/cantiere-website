import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import InternalLink from "../links/InternalLink";
import t from "lib/locales";

export default function CardImageBlock({ locale, record }) {
  const { title, text, related } = record;
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
              <div className="text-lg max-w-prose xl:text-xl xl:max-w-2xl">
                {renderHTML(text)}
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0 pb-8 mt-10 lg:mt-16">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-10 xl:gap-12 border-t border-dashed border-white">
            {related.map((c, n) => (
              <div
                key={c.id}
                className="grid gap-6 lg:grid-cols-10 lg:gap-x-0 lg:pb-10 lg:items-center first:pt-8 pb-8 xl:pb-12 border-b border-dashed border-white"
              >
                <div className="grid gap-6 lg:col-span-4 content-center">
                  <div className="">{`0${n + 1}`}</div>
                  <h2 className="text-2xl lg:text-3xl max-w-prose">
                    {c.title}
                  </h2>
                  <h3 className="max-w-prose">{renderHTML(c.abstract)}</h3>
                  <InternalLink element={c} locale={locale} label={c.title}>
                    <div className="border-white border-b-2 pb-1 inline-block">
                      {t("more", locale)}
                    </div>
                  </InternalLink>
                </div>
                {c.cover && (
                  <div className="lg:col-span-5 lg:col-start-6">
                    <DatoImage
                      className="rounded-full my-2 mb-4 lg:m-0"
                      data={c.cover.responsiveImage}
                      alt={c.cover.responsiveImage.alt}
                      title={c.cover.responsiveImage.title}
                      layout=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
