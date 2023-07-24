import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Article } from "pages/blog/[slug].js";
export default Article;

async function getAllArticlesPaged(query, offset, locale, results) {
  const response = await fetchData(query, { locale, offset });
  const allArticles = [...results, ...response.allArticles];
  if (response.allArticles.length === 100) {
    return getAllArticlesPaged(query, offset + 100, locale, allArticles);
  }
  return allArticles;
}

export async function getStaticPaths() {
  const allArticles = await getAllArticlesPaged(
    queries.getAllArticlesPaged,
    0,
    "en",
    []
  );
  const paths = allArticles.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(queries.getNews, { slug, locale }, preview);
  if (!response.article) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.article,
      site,
    },
  };
}
