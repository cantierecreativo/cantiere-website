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
// import SectionAbout from "components/sections/SectionAbout";

export default function Home({ locale, site, page, lastNews }) {
  const { mainBlocks, carousel, blueBlocks, orangeBlocks, highlightProject } =
    page;
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      {!carousel && <HeroHp page={page} locale={locale} />}
      {carousel && <Slideshow data={carousel} />}
      <div
        aria-hidden="true"
        className="w-full z-0 top-[1300px] xl:top-[1600px] 2xl:top-[1800px] hidden lg:absolute lg:block"
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
      {/* <div className="bg-blue relative -mt-20 lg:-mt-28 xl:-mt-32 2xl:-mt-44">
        <Icon
          name={"shapeDouble"}
          className="h-full w-auto absolute right-0 top-0 fill-white"
        />
        <div className="vertical-spaces">
          {orangeBlocks.map((b) => (
            <PostContent key={b.id} record={b} locale={locale} page={page} />
          ))}
        </div>
      </div> */}
      {highlightProject &&
        <SectionHighlightProject project={highlightProject} locale={locale} />
      }
      <SectionProjects page={page} locale={locale} site={site} />
      <SectionBlog page={page} locale={locale} site={site} />
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
