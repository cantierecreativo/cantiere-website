import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";

export default function WorksIndex({ locale, site, page, items }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <IndexTmp locale={locale} items={items.works} page={page} pagination />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getWorksIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  const {
    _allWorksMeta: { count },
  } = await fetchData(queries.getWorksCount, { locale }, preview);
  const maxPages = Math.ceil(count / 24);
  let works = {};
  let page = 0;

  while (page < maxPages) {
    const { allWorks } = await fetchData(
      queries.getAllWorksPaged,
      {
        locale,
        offset: page * 24,
        first: 24,
      },
      preview
    );
    works[page + 1] = allWorks;
    page++;
  }
  return {
    props: {
      locale,
      page: response.worksIndex,
      items: { works },
      site,
    },
  };
}
