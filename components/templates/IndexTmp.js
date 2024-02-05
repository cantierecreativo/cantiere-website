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

  const portfolioAreas = [
    { id: 0, label: "Tutti i progetti" },
    { id: 1, label: "Pubblica Amministrazione" },
    { id: 2, label: "Food & Wine" },
    { id: 3, label: "Musei" },
    { id: 4, label: "Corporate" },
    { id: 5, label: "Design & Furniture" }
  ]

  return (
    <div className="overflow-hidden">
      <div className="absolute z-0 w-full">
        <Icon name={"shapeStar"} className="fill-violet-dark/10" />
      </div>
      <HeroText locale={locale} page={page} />
      {/* <HeroOrange locale={locale} page={page} /> */}
      <div className="container z-10 relative pb-10 lg:pb-24">

        {page.id == 684735 &&
          <div className="grid grid-cols-12 my-10 md:my-16">
            <div className="flex flex-wrap gap-x-5 gap-y-3 md:gap-6 lg:col-start-2 col-span-12 lg:col-span-11 border-t border-t-black/25 pt-8 md:pt-14 ">
              {portfolioAreas.map((a) => {
                return (
                  <div
                    key={a.id}
                    className={`rounded-l-full xl:text-lg whitespace-nowrap border-2 ${a.id == selectedTab ? "border-blue px-7" : "border-black/70 px-5"}  py-2 hover:border-blue hover:text-blue  cursor-pointer motion-safe:duration-300`}
                    onClick={() => setSelectedTab(a.id)}
                  >
                    {a.label}
                  </div>
                )
              })}
            </div>
          </div>
        }

        <div
          className={`${page.model.includes("article")
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
