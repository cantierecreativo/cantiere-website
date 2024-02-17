import { renderHTML, convertToSlug } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import InternalLink from "../links/InternalLink";
import t from "lib/locales";
import Image from "next/image";

export default function RowsIconTextBlock({ locale, record }) {
  const { title, text, rows, labelMenu, dark } = record;
  return (
    <section
      id={`${convertToSlug(labelMenu)}`}
      className={`${
        dark
          ? "bg-blue text-white py-12 lg:py-24 xl:py-40"
          : "p-4 lg:py-12 xl:py-24"
      }`}
    >
      <div className="container margin-scroll-standard lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <h2 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold">
            {title}
          </h2>
          {text && (
            <h3 className="lg:text-lg max-w-prose py-8 pt-6 xl:pb-20">
              {renderHTML(text)}
            </h3>
          )}
          <div className="grid gap-4 mt-6 border-b border-white">
            {rows.map((r) => (
              <div
                className="grid gap-6 py-6 md:py-10 border-t border-white md:grid-cols-3"
                key={r.id}
              >
                <div className="w-20 h-20 relative">
                  <Image
                    aria-hidden="true"
                    src={r.icon.url}
                    objectFit="contain"
                    layout="fill"
                    alt={title}
                    className="w-full h-full"
                  />
                </div>
                <div className="md:col-span-2 grid gap-6">
                  <div className="text-xl md:text-2xl lg:text-3xl max-w-prose font-bold">
                    {r.title}
                  </div>
                  <div className="">{renderHTML(r.text)}</div>
                  {r.link && (
                    <InternalLink
                      element={r.link}
                      locale={locale}
                      label={r.link.title}
                    >
                      <div className="underline-default after:bg-white inline-block">
                        {t("more", locale)}
                      </div>
                    </InternalLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
