import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import t from "lib/locales";
import Button from "components/blocks/Button";

export default function Pagination({
  pages,
  currentPage,
  locale,
  currentView,
}) {
  const pathname = usePathname();
  const current = parseInt(currentPage);
  const [windowWidth, setWindowWidth] = useState(0);

  let fParams = "";
  if (currentView) {
    fParams = `f=${currentView}&`;
  }

  const handleMaxPage = () => {
    let max;
    if (windowWidth > 0 && windowWidth < 720) {
      max = current == 1 ? 2 + current : 1 + current;
    } else {
      max = 4 + current;
    }
    return max;
  };

  const handleMinPage = () => {
    let min;
    if (windowWidth > 0 && windowWidth < 720) {
      min =
        current == 1
          ? current - 1
          : current == pages.length
          ? current - 3
          : current - 2;
    } else {
      min = current > 5 ? current - 5 : 0;
    }
    return min;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxPage = windowWidth ? handleMaxPage() : 0;
  const minPage = windowWidth ? handleMinPage() : 0;

  const buttonClass =
    "border-black border hover:border-blue py-2 px-4 rounded-sm after:-z-10 hover:text-white text-black duration-200 after:bg-blue after:absolute relative after:w-full after:top-0 after:bottom-full after:left-0 hover:after:bottom-0 after:duration-300";
  return (
    <nav className="flex flex-wrap gap-2 font-bold text-base py-8 lg:pt-16 justify-center items-center">
      {current > 1 && (
        <>
          <div className="hidden lg:block">
            <Link className={buttonClass} href={`${pathname}?${fParams}page=1`}>
              <span>{t("pagination-start", locale)}</span>
            </Link>
          </div>

          <div className="">
            <Link
              className="group relative"
              href={`${pathname}?${fParams}page=${current - 1}`}
            >
              <span className="sr-only">{t("pagination-back", locale)}</span>
              <Button bg="border" reverse />
            </Link>
          </div>

          {minPage > 0 && (
            <div className="hidden md:block">
              <a
                className={`border-black border hover:border-blue py-2 px-4 cursor-pointer rounded-sm`}
              >
                ...
              </a>
            </div>
          )}
        </>
      )}

      {pages.slice(minPage, maxPage).map((num) => {
        return (
          <div key={num}>
            {num !== currentPage ? (
              <Link
                className={buttonClass + " hidden md:block"}
                href={`${pathname}?${fParams}page=${num}`}
              >
                {num}
              </Link>
            ) : (
              <a
                className={`border-blue bg-blue text-white border py-2 px-4 rounded-sm hidden md:block`}
              >
                {num}
              </a>
            )}
          </div>
        );
      })}

      {current < pages.length && (
        <>
          {maxPage < pages.length && (
            <div className=" hidden md:block">
              <a
                className={`border-black border hover:border-blue py-2 px-4 cursor-pointer rounded-sm`}
              >
                ...
              </a>
            </div>
          )}
          <div className="">
            <Link
              className="group relative"
              href={`${pathname}?${fParams}page=${current + 1}`}
            >
              <span className="sr-only">{t("pagination-forward", locale)}</span>
              <Button bg="border" />
            </Link>
          </div>
          <div className=" hidden lg:block">
            <Link
              className={buttonClass}
              href={`${pathname}?${fParams}page=${pages.length}`}
            >
              {t("pagination-end", locale)}{" "}
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
