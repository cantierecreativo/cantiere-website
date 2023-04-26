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
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.articlesIndex,
      allItems: response.allArticles,
      site,
    },
  };
}
