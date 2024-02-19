import HeroText from "components/hero/HeroText";
import Icon from "components/layout/Icon";
import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function IndexPortfolio({ locale, page, works }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const pageSize = 24;

  const path = locale === "it" ? "/portfolio" : "/en/portfolio";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParams = urlParams.get("page");
    const len = works.length;
    let maxPage = Math.ceil(len / pageSize);
    if (len % pageSize > 0) maxPage += 1;
    if (pageParams && Number(pageParams) < maxPage) {
      page = Number(pageParams);
    }
    setCurrentPage(page);
    const filterParam = urlParams.get("filter");
    if (filterParam) {
      setFilter(filterParam);
    }
  }, [router, works]);

  function getFilterUrl(f) {
    return `${path}/?page=${currentPage}&filter=${f.slug}`;
  }

  const allCategories = works.reduce((acc, item) => {
    if (item.categories) {
      return [...acc, ...item.categories];
    }
    return acc;
  }, []);
  const category = allCategories.find((item) => item.slug == filter);

  const list = category
    ? works.filter((i) => {
        return i.categories.find((c) => c.slug == filter);
      })
    : works;
  // const start = currentPage * pageSize;
  // const end = start + pageSize;

  return (
    <div className="overflow-hidden">
      <div className="absolute z-0 w-full">
        <Icon name={"shapeStar"} className="fill-violet-dark/10" />
      </div>
      <HeroText locale={locale} page={page} />
      <div className="container z-10 relative pb-10 lg:pb-24">
        {page.id == 684735 && (
          <div className="grid grid-cols-12 my-10 md:my-16">
            <div className="flex flex-wrap gap-x-5 gap-y-3 md:gap-6 lg:col-start-2 col-span-12 lg:col-span-11 border-t border-t-black/25 pt-8 md:pt-14 ">
              {allCategories.map((cat) => {
                return (
                  <div
                    key={cat.id}
                    className={`rounded-l-full xl:text-lg whitespace-nowrap border-2 ${
                      cat.slug === filter
                        ? "border-blue px-7"
                        : "border-black/70 px-5"
                    }  py-2 hover:border-blue hover:text-blue  cursor-pointer motion-safe:duration-300`}
                    onClick={() => setSelectedTab(a.id)}
                  >
                    <a href={getFilterUrl(cat)}>{cat.title}</a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div
          className={`${
            page.model.includes("article")
              ? ""
              : "md:grid-cols-2 lg:gap-x-0 grid gap-y-16 gap-x-8 py-6 lg:gap-y-16 xl:gap-y-20"
          }`}
        >
          {list.map((i) => (
            <WhichCard key={i.id} locale={locale} record={i} />
          ))}
        </div>
        {/* {pagination && Object.keys(items).length > 1 && (
          <Pagination
            pages={Object.keys(items)}
            currentPage={currentPage}
            locale={locale}
          />
        )} */}
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
