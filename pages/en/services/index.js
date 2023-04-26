import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as ServicesIndex } from "pages/servizi/index.js";
export default ServicesIndex;

export async function getStaticProps({ locale = "en", preview }) {
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
