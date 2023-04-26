import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as CasteStudy } from "pages/case-studies/[slug].js";
export default CasteStudy;

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsCaseStudies, {
    locale: "en",
  });
  const paths = response.allCaseStudies.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getCaseStudy,
    { slug, locale },
    preview
  );
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.caseStudy,
      site,
    },
  };
}
