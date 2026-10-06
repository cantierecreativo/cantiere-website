import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroBlue from "components/hero/HeroBlue";
import LabFeatured from "components/lab/LabFeatured";
import LabProjectCard from "components/lab/LabProjectCard";
import LabManifesto from "components/lab/LabManifesto";
import LabIndexHeroActions from "components/lab/LabIndexHeroActions";
import LabIndexCta from "components/lab/LabIndexCta";
import LabServices from "components/lab/LabServices";
import { getLabProjects, getLabIndex } from "src/data/lab";
import { buildSeoTags, getLabSite } from "lib/lab";
import { resolveLink } from "lib/utils";
import LabIndexJsonLd from "components/lab/LabIndexJsonLd";

export default function LabIndex({ locale, site, page }) {
  const labIndex = getLabIndex(locale);
  const [featured, ...others] = getLabProjects(locale);
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      <LabIndexJsonLd labIndex={labIndex} projects={[featured, ...others]} locale={locale} />
      <HeroBlue
        page={{
          title: (
            <>
              {labIndex.heroLines.map((l) => (
                <span key={l.id} className={`block text-balance ${l.accent ? "mt-2 text-yellow" : ""}`}>
                  {l.text}{" "}
                </span>
              ))}
            </>
          ),
          abstract: labIndex.abstract,
        }}
        abstractTag="div"
      >
        <LabIndexHeroActions actions={labIndex.heroActions} locale={locale} />
      </HeroBlue>
      <div className="vertical-spaces !pt-0 lg:!pt-0">
        <LabManifesto manifesto={labIndex.manifesto} />
        <LabFeatured project={featured} heading={labIndex.projects} locale={locale} />
        {others.length > 0 && (
          <section className="container lg:grid lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-10 lg:col-start-2">
              {others.map((p) => (
                <LabProjectCard key={p.id} project={p} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
      <LabIndexCta cta={labIndex.cta} locale={locale} />
      <LabServices services={labIndex.services} locale={locale} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it" }) {
  const labIndex = getLabIndex(locale);
  const site = await getLabSite(fetchData, queries.site, locale);
  const page = {
    model: labIndex.model,
    id: labIndex.id,
    slug: null,
    title: labIndex.title,
    seo: buildSeoTags(labIndex.seo, locale, resolveLink({ model: labIndex.model, slug: null }, locale)),
  };
  return { props: { locale, site, page } };
}
