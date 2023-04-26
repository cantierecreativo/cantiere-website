import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Partners } from "pages/partners/index.js";
export default Partners;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(
    queries.getPartnersIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.partnersIndex,
      site,
    },
  };
}
