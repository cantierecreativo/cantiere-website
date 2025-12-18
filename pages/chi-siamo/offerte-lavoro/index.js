import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import IndexTmp from "components/templates/IndexTmp";
import FormWork from "components/form/FormWork";

export default function JobIndex({ locale, site, page, allItems }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.aboutIndex}>
      <IndexTmp locale={locale} items={allItems} page={page} />
      <div className="container py-12 relative xl:grid xl:grid-cols-12">
        <FormWork locale={locale} openPosition="false" />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getJobsIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.jobsIndex,
      allItems: response.allJobs,
      site,
    },
  };
}
