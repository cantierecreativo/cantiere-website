import { Image as DatoImage } from "react-datocms";
import { renderHTML, convertToSlug } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";

function RenderCards(cards, showNumbers) {
  return (
    <section className="container">
      <div className="lg:grid lg:grid-cols-12">
        <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:col-span-10 lg:col-start-2">
          {cards.map((c, n) => (
            <div
              key={c.id}
              className="grid gap-5 p-6 py-8 border border-dashed border-gray lg:pt-10 lg:gap-x-0 bg-white"
            >
              <div className="grid gap-4 content-start">
                {showNumbers && <div className="">{`0${n + 1}`}</div>}
                {c.title && <h2 className="text-blue text-xl">{c.title}</h2>}
                {c.text && <h3 className="xl:text-lg">{renderHTML(c.text)}</h3>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CardsBlock({ locale, record, page }) {
  const { cards, inLine, showNumbers, labelMenu } = record;
  return page.model !== "homepage" ? (
    <section
      id={`${convertToSlug(labelMenu)}`}
      className="container margin-scroll-standard"
    >
      {!inLine ? (
        <div className="lg:grid lg:grid-cols-12 pb-8 xl:pb-16">
          <div className="border-y border-gray border-dashed grid gap-10 lg:col-span-12 divide-y divide-dashed divide-gray pb-10">
            {cards.map((c, n) => (
              <div
                key={c.id}
                className="grid gap-5 pt-8 lg:pt-10 md:grid-cols-2 content-start lg:gap-x-0 lg:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-2 lg:col-start-2 lg:col-span-1">
                  {showNumbers && `0${n + 1}`}
                </div>
                <div className="grid gap-5 content-start lg:col-start-3 lg:col-span-4">
                  {c.title && <h2 className="text-blue text-2xl">{c.title}</h2>}
                </div>
                <div className="grid gap-5 content-start lg:col-start-8 lg:col-span-4">
                  {c.text && (
                    <h3 className="lg:text-lg max-w-prose">
                      {renderHTML(c.text)}
                    </h3>
                  )}
                  {c.link && (
                    <InternalLink
                      element={c.link}
                      locale={locale}
                      label={c.link.title}
                    >
                      <div className="border-black border-b-2 pb-1 inline-block mt-4">
                        {t("more", locale)}
                      </div>
                    </InternalLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        RenderCards(cards, showNumbers)
      )}
    </section>
  ) : (
    <>{inLine ? RenderCards(cards, showNumbers) : <></>}</>
  );
}
