import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as AboutIndex } from "pages/chi-siamo/index.js";
export default AboutIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getAboutIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.aboutIndex,
      site,
    },
  };
}
