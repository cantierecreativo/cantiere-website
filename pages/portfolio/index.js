import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroText from "components/hero/HeroText";
import Icon from "components/layout/Icon";

export default function NewsIndex({ locale, site, page, allItems }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <Icon
        name={"shapeStar"}
        className="w-full fill-violet-dark/10 absolute"
      />
      <HeroText locale={locale} page={page} />
      {/* <section className="verticalPadding container">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allNews.map((n) => (
            <NewsCard wide="full" key={n.id} locale={locale} record={n} />
          ))}
        </div>
      </section> */}
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(
    queries.getSolutionsIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.solutionsIndex,
      allItems: response.allSolutions,
      site,
    },
  };
}
