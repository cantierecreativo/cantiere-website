import HeroNewsDetail from "components/headers/HeroNewsDetail";
import Menu from "components/layout/Menu";
import t from "lib/locales";
import Button from "components/layout/Button";
import StandardCard from "components/cards/StandardCard";
import InternalLink from "components/links/InternalLink";

export default function NewsTmp({ locale, page, children, site, lastNews }) {
  return (
    <>
      <HeroNewsDetail locale={locale} page={page} />
      <Menu page={page} locale={locale} color="light" />
      <div className="bg-yellow-light text-black formatted-text">
        {children}
      </div>
      <section className="container py-10 mb-8 lg:-mb-8">
        <div className="flex justify-between items-center flex-wrap gap-5">
          <h2 className="uppercase font-serif text-2xl md:text-3xl lg:text-4xl w-full md:w-auto">
            {t("news_title", locale)}
          </h2>
          <InternalLink
            element={site.newsIndex}
            locale={locale}
            className="group"
          >
            <Button
              locale={locale}
              arrow={true}
              color="transparent"
              label={t("show_all", locale)}
            />
          </InternalLink>
        </div>
        <div className="mt-8 lg:my-16">
          <div className="grid gap-5 mt-6 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {lastNews?.map((n) => (
              <StandardCard key={n.id} record={n} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
