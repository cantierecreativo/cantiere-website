import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";
import BlogTmp from "components/templates/BlogTmp";

function TagsArticle({ locale, site, page, allItems }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.articlesIndex}>
      <BlogTmp locale={locale} items={allItems.news} page={page} pagination />
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllArticleTags, {
    locale: "it",
  });
  const paths = response.allArticleTags.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const { slug } = params;
  let news = [];

  const responseArticles = await fetchData(
    queries.getArticleTag,
    {
      locale,
      slug,
      // offset: page * itemForPage,
      first: "500",
    },
    preview
  );
  if (responseArticles?.articleTag?.articles?.length > 0) {
    news = responseArticles.articleTag.articles;
  }

  const response = await fetchData(
    queries.getArticleTag,
    { slug, locale },
    preview
  );

  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response?.articleTag || null,
      allItems: { news: news ? news : null },
      site,
    },
  };
}

export default TagsArticle;
