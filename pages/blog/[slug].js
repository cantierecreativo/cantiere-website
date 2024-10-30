import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import EditorialTmp from "components/templates/EditorialTmp";
import DastContent from "components/DastContent";
import InternalLink from "components/links/InternalLink";
import SectionBlog from "components/sections/SectionBlog";
import { getAllArticles } from "lib/utils";

function Article({ locale, site, page, articles }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.articlesIndex}>
      <EditorialTmp locale={locale} page={page}>
        <div className="grid gap-6 py-6 lg:py-28 xl:py-32 xl:gap-8 2xl:py-44 z-10 relative prose">
          <DastContent content={page.body} locale={locale} site={site} />
        </div>
        {page.tags?.length > 0 && (
          <div className="container py-8 lg:grid lg:grid-cols-12 lg:pb-24">
            <div className="grid gap-4 content-start lg:col-start-2 lg:col-span-10 border-dashed border-t border-black/25 pt-8">
              <div className="text-xl text-black font-bold pb-3">Tag</div>
              <div className="flex gap-4 flex-wrap">
                {page.tags.map((t) => (
                  <InternalLink
                    key={t.id}
                    element={t}
                    locale={locale}
                    label={t.title}
                    className={"group"}
                  >
                    <div className="group border border-[#E8E8E8] bg-[#E8E8E8] hover:border-violet duration-200 rounded-l-full px-5 py-2 pb-3 xl:text-base truncate ... max-w-[80vw] inline-block">
                      {t.title}
                    </div>
                  </InternalLink>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="bg-violet-dark/20">
          <SectionBlog
            page={page}
            locale={locale}
            site={site}
            articles={articles}
            titleBlog="Altri articoli"
            titleBlogClass="text-xl xl:text-3xl max-w-prose font-bold lg:translate-y-3 xl:translate-y-5"
          />
        </div>
      </EditorialTmp>
    </Layout>
  );
}

export async function getStaticPaths() {
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    return { paths: [], fallback: "blocking" };
  }

  const allEvents = getAllArticles(locale);
  return {
    paths: allEvents.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
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
      articles: response.allArticles,
    },
  };
}

export default Article;
