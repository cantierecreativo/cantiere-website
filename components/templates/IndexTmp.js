import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { renderHTML } from "lib/utils";
import Link from "next/link";

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
    { id: 5, label: "Design & Furniture" },
  ];

  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <div className="overflow-hidden">
      <header className="bg-gradient-to-b from-violet/50 to-white">
        <motion.div
          style={{ x: x1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="absolute w-[150%] xl:w-[110%] h-[60vh] top-[35%] left-1/2 -translate-x-1/2">
            <Image
              src="/icons/stroke1Violet.svg"
              alt="stroke1Violet"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="relative w-full h-[100vh] max-h-full z-20">
          <div className="h-[70%] w-full absolute z-20 flex flex-col justify-center items-center">
            <motion.div
              className="container px-8 lg:px-10 text-center space-y-4 xl:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="xl:text-5xl text-black md:text-4xl font-bold max-w-prose lg:block lg:pr-0 z-20 text-2xl">
                {page.title}
              </h1>
              {page.text && (
                <h2 className="text-lg max-w-prose lg:block lg:pr-0 z-20 xl:text-xl mx-auto">
                  {renderHTML(page.text)}
                </h2>
              )}
              {page.id == 684735 && (
                <div className="pt-4 md:flex md:items-center justify-center md:gap-8">
                  <div className="inline-block relative custom-select-contain">
                    <select
                      value={filter}
                      onChange={handleFilterChange}
                      className="border border-black/10 p-2 appearance-none inline-block w-auto cursor-pointer px-6 pr-12 rounded-[24px] bg-white/80 backdrop-blur-sm uppercase font-bold text-sm"
                    >
                      <option value="">Filtra i progetti per categoria</option>
                      {uniqueCategories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Link
                    className="hidden md:block underline-offset-4 hover:underline rounded-[24px] bg-white/80 backdrop-blur-sm p-2 px-6 uppercase font-bold text-sm"
                    title="Cacella i filtri"
                    href={"/portfolio"}
                  >
                    Vedi Tutti
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </header>
      <div className="container z-10 relative pb-10 lg:pb-24 translate-y-[-40vh] -mb-[40vh]">
        {page.id == 684735 && (
          <div className="grid grid-cols-12 my-10 md:my-16">
            <div className="flex flex-wrap gap-x-5 gap-y-3 md:gap-6 lg:col-start-2 col-span-12 lg:col-span-11 border-t border-t-black/25 pt-8 md:pt-14 ">
              {portfolioAreas.map((a) => {
                return (
                  <div
                    key={a.id}
                    className={`rounded-l-full xl:text-lg whitespace-nowrap border-2 ${
                      a.id == selectedTab
                        ? "border-blue px-7"
                        : "border-black/70 px-5"
                    }  py-2 hover:border-blue hover:text-blue  cursor-pointer motion-safe:duration-300`}
                    onClick={() => setSelectedTab(a.id)}
                  >
                    {a.label}
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
