import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Home } from "pages/index.js";
export default Home;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getHomepage, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.homepage,
      lastNews: response.lastNews,
      site,
    },
  };
}
