import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";

export default function ServicesIndex({ locale, site, page, allItems }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <IndexTmp locale={locale} items={allItems} page={page} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(
    queries.getServicesIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.servicesIndex,
      allItems: response.allServices,
      site,
    },
  };
}
