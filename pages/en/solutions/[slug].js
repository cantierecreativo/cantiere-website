import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Solution } from "pages/soluzioni/[slug].js";
export default Solution;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSolutionsSlugs, {
    locale: "en",
  });
  const paths = response.allSolutions.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getSolution,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.solution,
      site,
    },
  };
}
