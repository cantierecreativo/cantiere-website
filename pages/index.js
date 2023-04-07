import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroHp from "components/hero/HeroHp";
import PostContent from "components/PostContent";
import Icon from "components/layout/Icon";
import SectionProjects from "components/sections/SectionProjects";
import SectionAbout from "components/sections/SectionAbout";
import SectionHighlightProject from "components/sections/SectionHighlightProject";
import SectionLastNews from "components/sections/SectionLastNews";
import BannerBlock from "components/blocks/BannerBlock";

export default function Home({ locale, site, page, lastNews }) {
  const { mainBlocks, blueBlocks, orangeBlocks, highlightProject } = page;
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      <HeroHp page={page} locale={locale} />
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
          <PostContent
            key={b.id}
            record={b}
            locale={locale}
            page={"homepage"}
          />
        ))}
      </div>
      <div className="bg-red relative">
        <Icon
          name={"shapeOrange"}
          className="h-full w-auto absolute right-0 top-0"
        />
        <div className="vertical-spaces">
          {orangeBlocks.map((b) => (
            <PostContent key={b.id} record={b} locale={locale} />
          ))}
        </div>
      </div>
      <div className="bg-blue text-white">
        <div className="vertical-spaces">
          {blueBlocks.map((b) => (
            <PostContent
              key={b.id}
              record={b}
              locale={locale}
              page={"homepage"}
            />
          ))}
        </div>
      </div>
      <SectionProjects page={page} locale={locale} site={site} />
      <SectionAbout page={page} locale={locale} />
      <SectionHighlightProject project={highlightProject} locale={locale} />
      <SectionLastNews site={site} items={lastNews} locale={locale} />
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
