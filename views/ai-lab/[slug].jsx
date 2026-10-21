import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroBlue from "components/hero/HeroBlue";
import LabHeroActions from "components/lab/LabHeroActions";
import LabSections from "components/lab/LabSections";
import LabJsonLd from "components/lab/LabJsonLd";

export default function LabProject({ locale, site, page }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.labIndex} headerTxt="white">
      <LabJsonLd project={page} labIndex={site.labIndex} locale={locale} />
      <HeroBlue
        page={{ title: page.title, abstract: page.abstract }}
        abstractTag="div"
        aside={<LabHeroActions project={page} locale={locale} part="buttons" />}
      >
        <LabHeroActions project={page} locale={locale} part="media" />
      </HeroBlue>
      <LabSections sections={page.sections} locale={locale} project={page} />
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const response = await fetchData(queries.getAllLabProjectSlugs, { locale });
    paths.push(...response.allLabProjects.map(({ slug }) => ({ params: { slug }, locale })));
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const response = await fetchData(queries.getLabProject, { slug: params.slug, locale }, preview);
  if (!response.labProject) return { notFound: true };
  const site = await fetchData(queries.site, { locale });
  return { props: { locale, site, page: response.labProject } };
}
