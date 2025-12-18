import Masonry from "react-masonry-css";
import { BlogCard } from "components/sections/SectionBlog";
import PostContent from "components/PostContent";
import Pagination from "components/layout/Pagination";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const breakpointColumnsObj = {
  default: 2,
  767: 1,
};

export default function BlogTmp({ locale, page, items, pagination }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(null);
  const [selected, setSelected] = useState([]);
  const count = items.length;
  const maxPages = Array.from({ length: Math.ceil(count / 24) }, (_, i) =>
    (i + 1).toString()
  );
  useEffect(() => {
    let page = "1";
    const urlParams = new URLSearchParams(window.location.search);
    const pageParams = urlParams.get("page");

    if (pageParams && items[pageParams]) {
      page = pageParams;
    }

    const end = page * 24;
    const start = end - 24;

    setSelected(items.slice(start, end));
    setCurrentPage(page);
  }, [router, items]);

  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 500], [0, -60]);

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
                Articoli
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
      <div className="container z-10 relative pt-8 pb-10 lg:pb-24 translate-y-[-40vh] mb-[-40vh]">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-2">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {currentPage &&
                selected.map((i, n) => (
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
            pages={maxPages}
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
