import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroHp from "components/hero/HeroHp";
import PostContent from "components/PostContent";
import Icon from "components/layout/Icon";
import BannerBlock from "components/blocks/BannerBlock";
import SectionProjects from "components/sections/SectionProjects";
import Slideshow from "components/blocks/Slideshow";
import SectionBlog from "components/sections/SectionBlog";
import SectionHighlightProject from "components/sections/SectionHighlightProject";

export default function Home({ locale, site, page, lastNews }) {
  const { mainBlocks, carousel, highlightProject } = page;
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      {carousel && <h1 className="fixed ">{page.title}</h1>}
      {!carousel && <HeroHp page={page} locale={locale} />}
      {carousel && <Slideshow data={carousel} />}
      <div
        aria-hidden="true"
        className="w-full z-0 top-[800px] 2xl:top-[1000px] hidden lg:absolute lg:block"
      >
        <Icon
          name={"shapeDouble"}
          className="w-full fill-violet-dark/10 rotate-180"
        />
      </div>
      <div className="vertical-spaces">
        {mainBlocks.map((b) => (
          <PostContent key={b.id} record={b} locale={locale} page={page} />
        ))}
      </div>
      {highlightProject && (
        <SectionHighlightProject project={highlightProject} locale={locale} />
      )}
      <SectionProjects page={page} locale={locale} site={site} />
      <SectionBlog
        page={page}
        locale={locale}
        site={site}
        articles={page.articles}
        titleBlog={page.titleBlog}
      />
      <BannerBlock record={page.blocksFooter[0]} locale={locale} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getHomepage, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.homepage,
      lastNews: response.lastNews,
      site,
    },
  };
}
