import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ModularTmp from "components/templates/ModularTmp";
import PostContent from "components/PostContent";

export default function Solution({ locale, site, page }) {
  const { blocks } = page;
  return (
    <Layout
      site={site}
      locale={locale}
      page={page}
      headerTxt="white"
      parent={site.solutionsIndex}
    >
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

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const response = await fetchData(queries.getAllSolutionsSlugs, { locale });
    paths.push(
      ...response.allSolutions.map(({ slug }) => ({ params: { slug }, locale }))
    );
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const { slug } = params;
  const response = await fetchData(
    queries.getSolution,
    { slug, locale },
    preview
  );
  if (!response.solution) return { notFound: true };
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.solution,
      site,
    },
  };
}
