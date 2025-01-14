import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import BlogTmp from "components/templates/BlogTmp";
import { getAllArticles } from "lib/utils";

export default function ArticlesIndex({ locale, site, page, items }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <BlogTmp locale={locale} items={items.news} page={page} pagination />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(
    queries.getArticlesIndex,
    { locale },
    preview
  );
  let news = {};
  if (preview) {
    const {
      _allArticlesMeta: { count },
    } = await fetchData(queries.getArticlesCount, { locale }, preview);

    const maxPages = Math.ceil(count / 24);

    let page = 0;

    while (page < maxPages) {
      const { allArticles } = await fetchData(
        queries.getAllArticlesPaged,
        {
          locale,
          offset: page * 24,
          first: 24,
        },
        preview
      );
      news[page + 1] = allArticles;
      p++;
    }
  } else {
    const allArticles = getAllArticles(locale);
    const count = allArticles.length;

    const maxPages = Math.ceil(count / 24);
    let page = 0;

    while (page < maxPages) {
      const offset = page * 24;
      const articles = allArticles.slice(offset, 24);
      news[page + 1] = articles;
      page++;
    }
  }

  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      items: { news },
      site,
      page: response.articlesIndex,
    },
  };
}
