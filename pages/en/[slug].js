import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as LandingPage } from "pages/[slug].js";
export default LandingPage;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllLandingSlugs, {
    locale: "en",
  });
  const paths = response.allLandingPages.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getLandingPage,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.landingPage,
      site,
    },
  };
}
