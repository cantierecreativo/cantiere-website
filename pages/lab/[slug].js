import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroBlue from "components/hero/HeroBlue";
import LabFacts from "components/lab/LabFacts";
import LabHeroActions from "components/lab/LabHeroActions";
import LabStory from "components/lab/LabStory";
import LabTools from "components/lab/LabTools";
import LabCta from "components/lab/LabCta";
import LabJsonLd from "components/lab/LabJsonLd";
import { getLabProjects, getLabProject, getLabIndex, getLabAlts } from "src/data/lab";
import { buildSeoTags, getLabSite } from "lib/lab";

export default function LabProject({ locale, site, page }) {
  const project = getLabProject(page.slug, locale);
  return (
    <Layout site={site} locale={locale} page={page} parent={getLabIndex(locale)} headerTxt="white">
      <LabJsonLd project={project} locale={locale} />
      <HeroBlue page={{ title: project.title, abstract: project.abstract }}>
        <LabHeroActions project={project} locale={locale} />
      </HeroBlue>
      <div className="vertical-spaces !pt-0 lg:!pt-0">
        <LabFacts facts={project.facts} />
        <LabStory story={project.story} />
        <LabTools tools={project.tools} />
      </div>
      <LabCta locale={locale} project={project} />
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = locales.flatMap((locale) =>
    getLabProjects(locale).map(({ slug }) => ({ params: { slug }, locale }))
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it" }) {
  const project = getLabProject(params.slug, locale);
  if (!project) return { notFound: true };
  const site = await getLabSite(fetchData, queries.site, locale);
  // Solo i campi che Layout, MetaTags, Header e LanguageSwitcher leggono da `page`.
  const page = {
    model: project.model,
    id: project.id,
    slug: project.slug,
    title: project.shortTitle,
    alts: getLabAlts(project.id),
    seo: buildSeoTags(project.seo, locale),
  };
  return { props: { locale, site, page } };
}
