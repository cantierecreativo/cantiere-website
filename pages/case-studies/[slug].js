import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ModularTmp from "components/templates/ModularTmp";
import PostContent from "components/PostContent";

export default function Work({ locale, site, page }) {
  const { blocks } = page;
  return (
    <Layout site={site} locale={locale} page={page} parent={site.newsIndex}>
      <ModularTmp locale={locale} page={page}>
        <div className="vertical-spaces">
          {blocks.map((b) => (
            <PostContent key={b.id} record={b} locale={locale} page={page} />
          ))}
        </div>
      </ModularTmp>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsCaseStudies, {
    locale: "it",
  });
  const paths = response.allCaseStudies.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
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
