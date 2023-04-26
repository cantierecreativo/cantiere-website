import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as WorksIndex } from "pages/portfolio/index.js";
export default WorksIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getWorksIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.worksIndex,
      allItems: response.allWorks,
      site,
    },
  };
}
