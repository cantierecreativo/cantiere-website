import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ModularTemplate from "components/templates/ModularTemplate";
import DastContent from "components/DastContent";
import NewsCard from "components/blocks/cards/NewsCard";
import t from "lib/locales";

export default function News({ locale, site, page, lastNews }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.newsIndex}>
      <ModularTemplate locale={locale} page={page}>
        <div className="prose">
          <DastContent content={page.body} locale={locale} site={site} />
        </div>
      </ModularTemplate>
      <section className="verticalPadding container">
        <h2 className="titleBig text-green-dark">{t("lastNews", locale)}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:mt-16">
          {lastNews.map((i) => (
            <NewsCard wide="full" key={i.id} locale={locale} record={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsNews, { locale: "it" });
  const paths = response.allNews.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const { slug } = params;
  const response = await fetchData(queries.getNews, { slug, locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.news,
      lastNews: response.lastNews,
      site,
    },
  };
}
