import { renderHTML, convertToSlug } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";
import CardTextImageBlock from "./CardTextImageBlock";
import CardBlock from "./CardBlock";
import CardTitleImageTextHover from "./CardTitleImageTextHoverBlock";

function WhichCard({ c, showNumbers=false, l, n=null }) {
  if (!c || !c.model) return;
  switch (c.model) {
    case "card":
      return (
        <CardBlock key={c.id} data={c} showNumbers={showNumbers} l={l} n={n} />
      );
    case "card_title_image_text_hover":
      return <CardTitleImageTextHover key={c.id} data={c} l={l} />;
    case "card_text_image":
      return (
        <CardTextImageBlock
          key={c.id}
          data={c}
          showNumbers={showNumbers}
          n={n}
        />
      );
  }
}

function RenderCards(cards, showNumbers, l) {
  return (
    <div className="lg:grid lg:grid-cols-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:col-span-10 lg:col-span-12 xl:col-start-2">
        {cards.map((c, n) => {
          const card = { c, showNumbers, l, n };
          return <WhichCard key={c.id} card={card} />;
        })}
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
                      element={c.link?.relatedElement}
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
    <section className="container">
      {inLine ? RenderCards(cards, showNumbers, locale) : <></>}
    </section>
  );
}
