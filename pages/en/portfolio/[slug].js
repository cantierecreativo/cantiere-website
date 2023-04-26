import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Work } from "pages/portfolio/[slug].js";
export default Work;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsWorks, { locale: "en" });
  const paths = response.allWorks.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(queries.getWork, { slug, locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.work,
      site,
    },
  };
}
