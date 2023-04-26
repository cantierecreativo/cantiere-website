import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Service } from "pages/servizi/[slug].js";
export default Service;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllServicesSlugs, {
    locale: "en",
  });
  const paths = response.allServices.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getService,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.service,
      site,
    },
  };
}
