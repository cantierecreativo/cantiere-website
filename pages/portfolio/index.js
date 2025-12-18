import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexPortfolio from "components/templates/IndexPortfolio";

export default function WorksIndex({ locale, site, page, works }) {
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="black">
      <IndexPortfolio locale={locale} works={works} page={page} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getWorksIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  let condition = true;
  let all = [];
  let page = 0;
  while (condition) {
    const { allWorks } = await fetchData(
      queries.getAllWorksPaged,
      {
        locale,
        offset: page * 100,
        first: 100,
      },
      preview
    );
    if (allWorks?.length > 0) {
      all = [...all, ...allWorks];
      page++;
    } else {
      condition = false;
    }
  }
  return {
    props: {
      locale,
      page: response.worksIndex,
      works: all,
      site,
    },
  };
}
