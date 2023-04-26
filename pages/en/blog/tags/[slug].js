import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as TagsArticle } from "pages/blog/tags/[slug].js";
export default TagsArticle;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllArticleTags, {
    locale: "en",
  });
  const paths = response.allArticleTags.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getArticleTag,
    { slug, locale },
    preview
  );
  const id = response.articleTag.id;
  const filter = await fetchData(queries.getArticleByTag, { id, locale });
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.articleTag,
      allItems: filter.allArticles,
      site,
    },
  };
}
