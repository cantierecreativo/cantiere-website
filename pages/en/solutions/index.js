import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as SolutionsIndex } from "pages/soluzioni/index.js";
export default SolutionsIndex;

export async function getStaticProps({ locale = "en", preview }) {
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
