import HeroText from "components/hero/HeroText";
import Icon from "components/layout/Icon";
import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InternalLink from "components/links/InternalLink";
import Link from "next/link";

export default function IndexPortfolio({ locale, page, works }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const pageSize = 24;

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

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    const url = getFilterUrl(selectedFilter, currentPage + 1);
    router.push(url);
  };

  return (
    <div className="overflow-hidden">
      <div className="absolute z-0 w-full">
        <Icon name={"shapeStar"} className="fill-violet-dark/10" />
      </div>
      <header className="container pt-32 pb-8 md:pt-40 lg:pb-16 z-10 relative">
        <div className="gap-6 lg:flex lg:gap-x-0 border-b border-b-black/25 items-center justify-between">
          <h1 className="text-3xl md:text-4xl xl:text-6xl max-w-prose font-bold">
            {page.title}
          </h1>
          {page.id == 684735 && (
            <div className="mb-10 lg:mb-6 lg:w-1/2 xl:w-[560px]">
              <div className="pt-6 custom-select-contain md:flex md:items-center md:gap-12 relative md:justify-between">
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="border-2 border-black/70 p-2 w-full custom-select md:w-2/3 lg:w-[75%] cursor-pointer"
                >
                  <option value="">Filtra i progetti per categoria</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <Link
                  className="hidden md:block"
                  title="Cacella i filtri"
                  href={"/portfolio"}
                >
                  Vedi Tutti
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="container z-10 relative pb-10 lg:pb-24">
        <div
          className={`${
            page.model.includes("article")
              ? ""
              : "md:grid-cols-2 lg:grid-cols-3 grid gap-y-16 gap-x-6 py-6 lg:gap-y-16 xl:gap-y-20"
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
