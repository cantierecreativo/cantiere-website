import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as ArticlesIndex } from "pages/blog/index.js";
export default ArticlesIndex;

async function getAllArticlesPaged(query, offset, locale, results) {
  const response = await fetchData(query, { locale, offset });
  const allArticles = [...results, ...response.allArticles];
  if (response.allArticles.length === 100) {
    return getAllArticlesPaged(query, offset + 100, locale, allArticles);
  }
  return allArticles;
}

export async function getStaticProps({ locale = "en", preview }) {
  const items = await getAllArticlesPaged(
    queries.getAllArticlesPaged,
    0,
    "en",
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
