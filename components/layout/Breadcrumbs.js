import Link from "next/link";
import Icon from "components/layout/Icon";
import InternalLink from "components/links/InternalLink";

export default function Breadcrumbs({
  page,
  parent,
  grandParent = null,
  locale,
  color,
}) {
  const breadcrumbItemClass = "gap-2 items-center text-xxs lg:text-xs";
  return (
    <nav
      aria-label="Breadcrumbs"
      className={`${
        color === "rev"
          ? "bg-black"
          : color === "light"
          ? "bg-[#f8f2e8] text-black font-semibold"
          : ""
      } md:pt-28 pt-20 absolute z-20 w-full`}
    >
      <div className="container">
        <div className="lg:grid-cols-12 lg:grid">
          <ol
            className={`flex items-center gap-1 xl:col-start-2 xl:col-span-10 ${
              color === "white" ? "text-white" : "text-black"
            }`}
          >
            <li className={breadcrumbItemClass}>
              <div className="flex items-center gap-1">
                <Link
                  href={`${locale === "en" ? "/en" : "/"}`}
                  className="duration-200 xl:hover:text-blue fill-white hover:fill-yellow"
                  title="Homepage"
                  key="homepage"
                >
                  <Icon
                    name="home"
                    size="15"
                    className={color === "white" ? "fill-white" : "fill-blue"}
                  />
                </Link>
                {page.model !== "homepage" && (
                  <Icon
                    name="down"
                    className={`-rotate-90 ${
                      color === "white" ? "fill-white" : "fill-black"
                    }`}
                    size="23"
                  />
                )}
              </div>
            </li>
            {grandParent && (
              <li className={breadcrumbItemClass}>
                <div className="flex max-w-[150px] items-center gap-1">
                  <InternalLink
                    locale={locale}
                    label={grandParent.title}
                    element={grandParent}
                    className="truncate duration-200 xl:hover:text-blue"
                  >
                    {grandParent.menuLabel || grandParent.title}
                  </InternalLink>
                  <Icon
                    name="down"
                    className={`-rotate-90 ${
                      color === "white" ? "fill-white" : "fill-black"
                    }`}
                    size="23"
                  />
                </div>
              </li>
            )}
            {parent && (
              <li className={breadcrumbItemClass}>
                <div className="flex max-w-[150px] items-center gap-1">
                  <InternalLink
                    locale={locale}
                    label={parent.title}
                    element={parent}
                    slug={parent.slug}
                    className="truncate duration-200 xl:hover:text-blue text-xs"
                  >
                    {parent.menuLabel || parent.title}
                  </InternalLink>
                  <Icon
                    name="down"
                    className={`-rotate-90 ${
                      color === "white" ? "fill-white" : "fill-black"
                    }`}
                    size="23"
                  />
                </div>
              </li>
            )}
            {page.model !== "homepage" && (
              <li
                className={`${breadcrumbItemClass} truncate text-xs max-w-[300px]`}
                aria-current="page"
              >
                {page.menuLabel || page.title}
              </li>
            )}
          </ol>
        </div>
      </div>
    </nav>
  );
}
