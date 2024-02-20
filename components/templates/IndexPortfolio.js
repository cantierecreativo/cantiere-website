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
  const pageSize = 12;

  const path = locale === "it" ? "/portfolio" : "/en/portfolio";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParams = urlParams.get("page");
    const filterParam = urlParams.get("filter");

    setCurrentPage(pageParams ? parseInt(pageParams) - 1 : 0);
    setFilter(filterParam ? filterParam : "");
  }, [router, works]);

  function getFilterUrl(f, p) {
    if (p && filter === f) {
      return `${path}?page=${p}&filter=${f}`;
    }
    return `${path}?filter=${f}`;
  }

  const allCategories = works.reduce((acc, item) => {
    if (item.categories) {
      return [...acc, ...item.categories];
    }
    return acc;
  }, []);
  const uniqueCategories = allCategories.reduce((acc, item) => {
    if (!acc.find((i) => i.id === item.id)) {
      return [...acc, item];
    }
    return acc;
  }, []);

  const category = allCategories.find((item) => item.slug == filter);
  const list = category
    ? works.filter((i) => {
        return i.categories.find((c) => c.slug == filter);
      })
    : works;

  const maxPage = Math.ceil(list.length / pageSize);
  let pages = new Array(maxPage).fill(1).map((_, i) => i + 1);
  const start = currentPage * pageSize;
  const paged = list.length > 0 ? list.slice(start, start + pageSize) : list;

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
              <div
                className={`rounded-l-full xl:text-lg whitespace-nowrap border-2 ${
                  filter === "" ? "border-blue px-7" : "border-black/70 px-5"
                }  py-2 hover:border-blue hover:text-blue  cursor-pointer motion-safe:duration-300`}
              >
                <a href={getFilterUrl("", currentPage + 1)}>Tutti</a>
              </div>
              {uniqueCategories.map((cat) => {
                return (
                  <div
                    key={cat.id}
                    className={`rounded-l-full xl:text-lg whitespace-nowrap border-2 ${
                      cat.slug === filter
                        ? "border-blue px-7"
                        : "border-black/70 px-5"
                    }  py-2 hover:border-blue hover:text-blue  cursor-pointer motion-safe:duration-300`}
                  >
                    <a href={getFilterUrl(cat?.slug || "", currentPage + 1)}>
                      {cat.title}
                    </a>
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
          {paged.map((i) => (
            <WhichCard key={i.id} locale={locale} record={i} />
          ))}
        </div>
        {list?.length > pageSize && (
          <>
            <Pagination
              pages={pages}
              currentPage={currentPage + 1}
              locale={locale}
            />
          </>
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
