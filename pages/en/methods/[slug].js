import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Method } from "pages/metodo/[slug].js";
export default Method;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllMethodsSlugs, {
    locale: "en",
  });
  const paths = response.allMethods.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getMethod,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.method,
      site,
    },
  };
}
