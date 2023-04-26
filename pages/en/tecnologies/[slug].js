import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Technology } from "pages/tecnologie/[slug].js";
export default Technology;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllTechnologiesSlugs, {
    locale: "en",
  });
  const paths = response.allTechnologies.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getTechnology,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.technology,
      site,
    },
  };
}
