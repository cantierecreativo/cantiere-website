import TitleButton from "components/blocks/TitleButton";
import InternalLink from "components/links/InternalLink";
import { formatDate } from "lib/utils";
import Button from "components/blocks/Button";
import WhichCard from "components/cards/WhichCard";

export default function SectionLastNews({ locale, items, site }) {
  return (
    <>
      <section className="vertical-spaces container">
        <TitleButton
          title="Blog"
          element={site.articlesIndex}
          locale={locale}
        />
        <div className="border-t border-gray border-dashed">
          {items.map((n) => (
            <WhichCard key={n.id} record={n} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
