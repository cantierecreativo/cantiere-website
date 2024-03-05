import Masonry from "react-masonry-css";
import HeroText from "components/hero/HeroText";
import Icon from "components/layout/Icon";
import { BlogCard } from "components/sections/SectionBlog";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const breakpointColumnsObj = {
  default: 2,
  767: 1,
};

export default function BlogTmp({ locale, page, items, pagination }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    let page = "1";
    const urlParams = new URLSearchParams(window.location.search);
    const pageParams = urlParams.get("page");

    if (pageParams && items[pageParams]) {
      page = pageParams;
    }

    setCurrentPage(page);
  }, [router, items]);

  return (
    <div className="overflow-hidden">
      <div className="absolute z-0 w-full">
        <Icon name={"shapeStar"} className="fill-violet-dark/10" />
      </div>
      <HeroText locale={locale} page={page} />
      <div className="container z-10 relative pt-8 pb-10 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-2">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {currentPage &&
                items[currentPage].map((i, n) => (
                  <BlogCard
                    key={n}
                    item={i}
                    n={n}
                    locale={locale}
                    itemClasses={`${i.previewLarge ? "" : "flex gap-4"}`}
                    imgClasses={`${
                      i.previewLarge ? "" : "mb-0 basis-[40%] flex-none"
                    }`}
                  />
                ))}
            </Masonry>
          </div>
        </div>
        {pagination && Object.keys(items).length > 1 && (
          <Pagination
            pages={Object.keys(items)}
            currentPage={currentPage}
            locale={locale}
          />
        )}
      </div>
      {page.blocks?.length > 0 && (
        <PostContent
          key={page.blocks[0].id}
          record={page.blocks[0]}
          locale={locale}
        />
      )}
    </div>
  );
}
