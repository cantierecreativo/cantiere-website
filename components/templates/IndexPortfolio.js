import Icon from "components/layout/Icon";
import WhichCard from "components/cards/WhichCard";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image as DatoImage } from "react-datocms";
import Image from "next/image";

export default function IndexPortfolio({ locale, page, works }) {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 500], [0, -60]);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const pageSize = 24000;

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
      <header className="z-10 relative overflow-hidden bg-gradient-to-b from-violet/50 to-white">
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
          <div className="h-[60%] w-full absolute z-20 flex flex-col justify-center items-center">
            <motion.div
              className="container px-8 lg:px-10 text-center space-y-4 xl:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="uppercase text-center font-bold tracking-wider">
                I nostri lavori
              </div>
              <h1 className="xl:text-5xl text-black md:text-4xl font-bold max-w-prose lg:block lg:pr-0 z-20 text-2xl">
                {page.title}
              </h1>
              {page.abstract && (
                <h2 className="text-lg max-w-prose lg:block lg:pr-0 z-20 xl:text-xl mx-auto">
                  {renderHTML(page.abstract)}
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

      <div className="container z-10 relative -translate-y-[40vh] -mb-[40vh]">
        <div
          className={`${
            page.model.includes("article")
              ? ""
              : "md:grid-cols-2 lg:grid-cols-3 grid gap-y-16 gap-x-6 py-6 lg:gap-y-16 xl:gap-y-16"
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
