import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";

export default function ArticlesIndex({ locale, site, page, items }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <IndexTmp locale={locale} items={items} page={page} />
    </Layout>
  );
}

async function getAllArticlesPaged(query, offset, locale, results) {
  const response = await fetchData(query, { locale, offset });
  const allArticles = [...results, ...response.allArticles];
  if (response.allArticles.length === 100) {
    return getAllArticlesPaged(query, offset + 100, locale, allArticles);
  }
  return allArticles;
}

export async function getStaticProps({ locale = "it", preview }) {
  const items = await getAllArticlesPaged(
    queries.getAllArticlesPaged,
    0,
    "it",
    []
  );
  const response = await fetchData(
    queries.getArticlesIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      items: items,
      site,
      page: response.articlesIndex,
    },
  };
}
