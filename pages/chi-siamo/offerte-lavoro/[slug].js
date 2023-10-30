import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import EditorialTmp from "components/templates/EditorialTmp";
import DastContent from "components/DastContent";
import FormWork from "components/form/FormWork";

export default function Job({ locale, site, page }) {
  return (
    <Layout
      site={site}
      locale={locale}
      page={page}
      parent={site.jobsIndex}
      grandParent={site.aboutIndex}
    >
      <EditorialTmp locale={locale} page={page}>
        <div className="grid gap-6 py-6 lg:py-20 xl:py-26 xl:gap-8 2xl:py-32 z-10 relative">
          <DastContent content={page.body} locale={locale} site={site} />
        </div>
      </EditorialTmp>
      <div className="bg-blue text-white">
        <div className="container py-12 relative z-10 xl:grid xl:grid-cols-12">
          <FormWork locale={locale} openPosition="true" position={page.title} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsJobs, {
    locale: "it",
  });
  const paths = response.allJobs.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
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
