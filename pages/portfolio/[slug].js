import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ModularTmp from "components/templates/ModularTmp";
import PostContent from "components/PostContent";

export default function Work({ locale, site, page }) {
  const { blocks } = page || {};
  return (
    <Layout
      site={site}
      locale={locale}
      page={page}
      parent={site.worksIndex}
      headerTxt="black"
    >
      <ModularTmp locale={locale} page={page}>
        <div className="vertical-spaces">
          {blocks &&
            blocks.map((b) => (
              <PostContent key={b.id} record={b} locale={locale} page={page} />
            ))}
        </div>
      </ModularTmp>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchData(queries.getAllSlugsWorks, { locale: "it" });
  const paths = response.allWorks.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const { slug } = params;
  const response = await fetchData(queries.getWork, { slug, locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response?.work || null,
      site,
    },
  };
}
