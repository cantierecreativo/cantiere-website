import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import EditorialTmp from "components/templates/EditorialTmp";
import DastContent from "components/DastContent";
import PostContent from "components/PostContent";

function Article({ locale, site, page }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <EditorialTmp locale={locale} page={page}>
        <div className="grid gap-6 py-6 lg:py-28 xl:py-32 xl:gap-8 2xl:py-44 z-10 relative prose">
          <DastContent content={page.body} locale={locale} site={site} />
          {/* {page.body != null ? (
          ) : (
            page.content.map((b) => (
              <PostContent key={b.id} record={b} locale={locale} page={page} />
            ))
          )} */}
        </div>
      </EditorialTmp>
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

export async function getStaticPaths() {
  const allArticles = await getAllArticlesPaged(
    queries.getAllArticlesPaged,
    0,
    "it",
    []
  );
  const paths = allArticles.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
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

export default Article;
