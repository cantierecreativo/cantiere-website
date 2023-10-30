import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";

function TagsArticle({ locale, site, page, allItems }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.articlesIndex}>
      <IndexTmp locale={locale} items={allItems} page={page} />
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

export default TagsArticle;
