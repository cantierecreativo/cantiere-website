import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import BlogTmp from "components/templates/BlogTmp";
import { getAllArticles } from "lib/utils";

export default function ArticlesIndex({ locale, site, page, items }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <BlogTmp locale={locale} items={items} page={page} pagination />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(
    queries.getArticlesIndex,
    { locale },
    preview
  );
  let articles = [];
  if (preview) {
    const { allArticles } = await fetchData(
      queries.getAllArticlesPaged,
      {
        locale,
        offset: 0,
        first: 500,
      },
      preview
    );
    articles = allArticles;
  } else {
    articles = getAllArticles(locale);
  }

  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      items: articles,
      site,
      page: response.articlesIndex,
    },
  };
}
