import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Job } from "pages/chi-siamo/offerte-lavoro/[slug].js";

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsJobs, {
    locale: "en",
  });
  const paths = response.allJobs.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "en", preview }) {
  const { slug } = params;
  const response = await fetchData(queries.getJob, { slug, locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.job,
      site,
    },
  };
}

export default Job;
