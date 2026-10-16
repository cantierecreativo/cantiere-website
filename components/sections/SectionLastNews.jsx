import TitleButton from "components/blocks/TitleButton";
import WhichCard from "components/cards/WhichCard";
import t from "lib/locales";

export default function SectionLastNews({ locale, items, site }) {
  return (
    <>
      <section className="vertical-spaces container">
        <TitleButton
          title={t("blog", locale)}
          element={site?.articlesIndex}
          locale={locale}
        />
        <div className="custom-border-bottom">
          {items?.map((n) => (
            <WhichCard key={n.id} record={n} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
