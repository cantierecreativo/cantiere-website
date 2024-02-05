import HeroText from "components/hero/HeroText";
import HeroOrange from "components/hero/HeroOrange";
import Icon from "components/layout/Icon";
import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function IndexTmp({ locale, page, items, pagination }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(null);
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
      {/* <HeroOrange locale={locale} page={page} /> */}
      <div className="container z-10 relative pb-10 lg:pb-24">
        <div
          className={`${
            page.model.includes("article")
              ? ""
              : "md:grid-cols-2 lg:gap-x-0 grid gap-y-16 gap-x-8 py-6 lg:gap-y-16 xl:gap-y-20"
          }`}
        >
          {pagination
            ? currentPage &&
              items[currentPage].map((i) => (
                <WhichCard key={i.id} locale={locale} record={i} />
              ))
            : items.map((i) => (
                <WhichCard key={i.id} locale={locale} record={i} />
              ))}
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
