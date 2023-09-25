import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as ArticlesIndex } from "pages/blog/index.js";
export default ArticlesIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(
    queries.getArticlesIndex,
    { locale },
    preview
  );

  const {
    _allArticlesMeta: { count },
  } = await fetchData(queries.getArticlesCount, { locale }, preview);

  const maxPages = Math.ceil(count / 24);
  let news = {};
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
    page++;
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
