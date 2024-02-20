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
    <div className="grid lg:grid-cols-12">
      <nav
        aria-label={t("pagination", locale)}
        className="lg:col-start-2 lg:justify-center lg:col-span-10 content-start flex custom-border-top mt-8 flex-wrap gap-2 font-bold text-base py-8 lg:pt-16 justify-between items-center"
      >
        {current > 1 ? (
          <>
            <div aria-label={t("pagination-back", locale)} className="">
              <Link
                className="group relative"
                href={`${pathname}?${fParams}page=${current - 1}`}
              >
                <span className="sr-only">{t("pagination-back", locale)}</span>
                <Button bg="border" reverse />
              </Link>
            </div>

            {minPage > 0 && (
              <div aria-hidden="true" className="hidden md:block">
                <a
                  className={`border-black border hover:border-blue py-2 px-4 cursor-pointer rounded-sm`}
                >
                  ...
                </a>
              </div>
            )}
          </>
        ) : (
          <div aria-hidden="true" className="opacity-20">
            <span className="sr-only">{t("pagination-back", locale)}</span>
            <Button bg="border" reverse />
          </div>
        )}

        {pages.slice(minPage, maxPage).map((num) => {
          return (
            <>
              {num !== currentPage ? (
                <div aria-label={`page ${num}`}>
                  <Link
                    className={buttonClass + " hidden md:block"}
                    href={`${pathname}?${fParams}page=${num}`}
                    key={num}
                  >
                    {num}
                  </Link>
                </div>
              ) : (
                <div aria-label={t("current-page", locale)}>
                  <a
                    className={`border-blue bg-blue text-white border py-2.5 2xl:py-2 px-4 rounded-sm`}
                  >
                    {num}
                  </a>
                </div>
              )}
            </>
          );
        })}

        {current < pages.length ? (
          <>
            {maxPage < pages.length && (
              <div aria-hidden="true" className=" hidden md:block">
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
                <span className="sr-only">
                  {t("pagination-forward", locale)}
                </span>
                <Button bg="border" />
              </Link>
            </div>
          </>
        ) : (
          <div aria-hidden="true" className="opacity-20">
            <span className="sr-only">{t("pagination-forward", locale)}</span>
            <Button bg="border" />
          </div>
        )}
      </nav>
    </div>
  );
}
