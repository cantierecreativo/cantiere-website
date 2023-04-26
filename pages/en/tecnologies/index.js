import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as TechnologiesIndex } from "pages/tecnologie/index.js";
export default TechnologiesIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(
    queries.getTechnologiesIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.technologiesIndex,
      allItems: response.allTechnologies,
      site,
    },
  };
}
