import { renderHTML, convertToSlug } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";
import { Image as DatoImage } from "react-datocms";

function RenderCards(cards, showNumbers, l) {
  return (
    <div className="lg:grid lg:grid-cols-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:col-span-10 lg:col-span-12 xl:col-start-2">
        {cards.map((c, n) =>
          c.link ? (
            <div
              key={c.id}
              className="grid gap-5 lg:gap-x-0 text-black custom-border relative hover:-translate-y-2 duration-200"
            >
              <InternalLink
                element={c.link.relatedElement}
                locale={l}
                label={c.link.title}
                className="group z-10"
              >
                <div className="grid gap-4 p-6 content-start lg:p-8 py-8 lg:pt-10 xl:pb-12 ">
                  <div className="custom-border-right" />
                  {showNumbers && <div className="">{`0${n + 1}`}</div>}
                  {c.title && (
                    <h2 className="text-2xl lg:text-xl xl:text-2xl duration-200 text-blue group-hover:text-black">
                      {c.title}
                    </h2>
                  )}
                  {c.text && <h3 className="">{renderHTML(c.text)}</h3>}
                  {c.link && (
                    <div className="inline-block">
                      <div className="underline-default after:bg-black inline-block mt-4">
                        {c.link?.cta ? c.link.cta : t("more", l)}
                      </div>
                    </div>
                  )}
                </div>
              </InternalLink>
            </div>
          ) : (
            <div
              key={c.id}
              className="grid gap-5 lg:gap-x-0 text-black custom-border relative content-start"
            >
              <div className="custom-border-right" />
              {c.image && (
                <div className="relative aspect-[4/3]">
                  <DatoImage
                    className=""
                    data={c.image.responsiveImage}
                    alt={c.image.responsiveImage.alt}
                    title={c.image.responsiveImage.title}
                  />
                </div>
              )}
              <div className="grid gap-4 content-start p-6 lg:p-8 py-8 lg:pt-10 xl:pb-12">
                {showNumbers && <div className="">{`0${n + 1}`}</div>}
                {c.title && <h2 className="text-xl sm:text-2xl">{c.title}</h2>}
                {c.text && <h3 className="">{renderHTML(c.text)}</h3>}
              </div>
            </div>
          )
        )}
      </div>
    </div>
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
          <div className="grid gap-10 lg:col-span-12 custom-border-bottom pb-10">
            {cards.map((c, n) => (
              <div
                key={c.id}
                className="grid gap-5 pt-8 lg:pt-10 md:grid-cols-2 content-start lg:gap-x-0 lg:grid-cols-12 md:gap-8 custom-border-top after:hidden"
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
                      element={c.link.relatedElement}
                      locale={locale}
                      label={c.link.title}
                    >
                      <div className="underline-default after:bg-black inline-block mt-4">
                        {c.link?.cta ? c.cta : t("more", locale)}
                      </div>
                    </InternalLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        RenderCards(cards, showNumbers, locale)
      )}
    </section>
  ) : (
    <>
      <section className="container">
        {inLine ? RenderCards(cards, showNumbers, locale) : <></>}
      </section>
    </>
  );
}
