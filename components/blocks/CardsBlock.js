import { renderHTML, convertToSlug } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";
import CardTextImageBlock from "./CardTextImageBlock";
import CardBlock from "./CardBlock";
import CardTitleImageTextHover from "./CardTitleImageTextHoverBlock";
import CardTitleImageText from "./CardTitleImageText";

function WhichCard({ c, showNumbers = false, l, n = null, inLine }) {
  if (!c || !c.model) return;
  switch (c.model) {
    case "card":
      return (
        <CardBlock key={c.id} data={c} showNumbers={showNumbers} l={l} n={n} />
      );
    case "card_title_image_text_hover":
      return inLine ? (
        <CardTitleImageTextHover key={c.id} data={c} l={l} />
      ) : (
        <CardTitleImageText key={c.id} data={c} l={l} />
      );
    case "card_text_image":
      return inLine ? (
        <CardTextImageBlock
          key={c.id}
          data={c}
          showNumbers={showNumbers}
          n={n}
        />
      ) : (
        <CardTitleImageText key={c.id} data={c} l={l} />
      );
  }
}

function RenderCards(cards, showNumbers, l, inLine) {
  return inLine ? (
    <div className="lg:grid lg:grid-cols-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:col-span-10 lg:col-span-12 xl:col-start-2">
        {cards.map((c, n) => {
          return (
            <WhichCard
              key={c.id}
              c={c}
              showNumbers={showNumbers}
              l={l}
              n={n}
              inLine={inLine}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="lg:grid lg:grid-cols-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:col-span-10 lg:col-span-12 xl:col-start-2">
        {cards.map((c, n) => {
          return (
            <WhichCard
              key={c.id}
              c={c}
              showNumbers={showNumbers}
              l={l}
              n={n}
              inLine={inLine}
            />
          );
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
      <div className="lg:grid lg:grid-cols-12">
        <div
          className={`${
            !inLine
              ? "lg:col-span-10 lg:col-start-2"
              : "md:grid-cols-2 lg:grid-cols-3 lg:col-span-12"
          } grid gap-4 xl:col-span-10 xl:col-start-2`}
        >
          {cards.map((c, n) => {
            return (
              <WhichCard
                key={c.id}
                c={c}
                showNumbers={showNumbers}
                l={locale}
                n={n}
                inLine={inLine}
              />
            );
          })}
        </div>
      </div>
    </section>
  ) : (
    <section className="container">
      {RenderCards(cards, showNumbers, locale, inLine)}
    </section>
  );
}
