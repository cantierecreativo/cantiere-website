import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as MethodsIndex } from "pages/metodi/index.js";
export default MethodsIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(
    queries.getMethodsIndex,
    { locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.methodsIndex,
      allItems: response.allMethods,
      site,
    },
  };
}
