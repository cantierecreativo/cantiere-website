import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as JobIndex } from "pages/chi-siamo/offerte-lavoro/index.js";
export default JobIndex;

export async function getStaticProps({ locale = "en", preview }) {
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
