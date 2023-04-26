import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as CaseStudiesIndex } from "pages/case-studies/index.js";
export default CaseStudiesIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(
    queries.getCaseStudiesIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.caseStudiesIndex,
      allItems: response.allCaseStudies,
      site,
    },
  };
}
