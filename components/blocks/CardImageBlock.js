import { renderHTML, convertToSlug } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import InternalLink from "../links/InternalLink";
import t from "lib/locales";
import { cleanFileName } from "lib/utils";

export default function CardImageBlock({ locale, record, page }) {
  const { title, text, related, labelMenu } = record;

  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-6 xl:gap-8">
            {title && (
              <h2
                className={`${
                  page?.model === "homepage"
                    ? "md:text-4xl xl:text-6xl"
                    : "xl:text-5xl"
                } max-w-prose text-3xl font-bold`}
              >
                {title}
              </h2>
            )}
            {text && (
              <div
                className={`${
                  page?.model === "homepage" ? "text-lg" : ""
                } max-w-prose xl:text-xl xl:max-w-2xl`}
              >
                {renderHTML(text)}
              </div>
            )}
          </div>
        </div>
        {page?.model === "homepage" ? (
          <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0 pb-8 mt-10 lg:mt-16">
            <div className="lg:col-span-10 lg:col-start-2 grid gap-10 xl:gap-12 border-t border-dotted border-white">
              {related.map((c, n) => (
                <div
                  key={c.id}
                  className="grid gap-6 lg:grid-cols-10 lg:gap-x-0 lg:pb-10 lg:items-center first:pt-8 pb-8 xl:pb-12 border-b border-dotted border-white"
                >
                  <div className="grid gap-6 lg:col-span-4 content-center">
                    <div className="">{`0${n + 1}`}</div>
                    <h2 className="text-2xl lg:text-3xl max-w-prose">
                      {c.title}
                    </h2>
                    <h3 className="max-w-prose">{renderHTML(c.abstract)}</h3>
                    <InternalLink element={c} locale={locale} label={c.title}>
                      <div className="underline-default after:bg-white inline-block">
                        {t("more", locale)}
                      </div>
                    </InternalLink>
                  </div>
                  {c.cover && (
                    <div className="lg:col-span-5 lg:col-start-6">
                      <DatoImage
                        className="rounded-full my-2 mb-4 lg:m-0"
                        data={c.cover.responsiveImage}
                        alt={
                          c.cover.responsiveImage.alt ||
                          cleanFileName(c.cover.filename)
                        }
                        title={
                          c.cover.responsiveImage.title ||
                          cleanFileName(c.cover.filename)
                        }
                        layout=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="border-t border-dotted border-white pb-8 mt-10 lg:mt-20 md:grid-cols-2 lg:gap-x-0 grid gap-8 lg:gap-y-16 xl:gap-y-20">
              {related.map((c, n) => (
                <div
                  key={c.id}
                  className={
                    "content-start lg:grid-cols-6 grid gap-y-6 pb-8 xl:pb-12 border-b border-dotted border-white"
                  }
                >
                  <InternalLink
                    element={c}
                    locale={locale}
                    label={c.title}
                    className="group grid gap-2 lg:col-span-5 lg:col-start-2 content-start"
                  >
                    {c.cover && (
                      <DatoImage
                        className="group-hover:-translate-y-2 duration-200 mb-6"
                        data={c.cover.responsiveImage}
                        alt={c.cover.responsiveImage.alt}
                        title={c.cover.responsiveImage.title}
                      />
                    )}
                    <div className="grid gap-4 group-hover:-translate-y-2 duration-200">
                      {c.subtitle && (
                        <div className="text-gray-dark font-bold text-xs uppercase lg:text-sm">
                          {c.subtitle}
                        </div>
                      )}
                      <h2 className="text-blue text-2xl max-w-prose custom-border-bottom pb-4 font-bold">
                        {c.title}
                      </h2>

                      <div className="max-h-24 line-clamp-4">
                        <h3 className="max-w-prose">
                          {renderHTML(c.abstract)}
                        </h3>
                      </div>
                      <div className="inline-block">
                        <div className="underline-default inline-block after:bg-black md:mt-4">
                          {t("more", locale)}
                        </div>
                      </div>
                    </div>
                  </InternalLink>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
