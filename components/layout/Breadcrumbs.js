import Link from "next/link";
import InternalLink from "components/links/InternalLink";
import Icon from "components/layout/Icon";

export default function Breadcrumbs({
  page,
  parent,
  ancestor,
  grandParent,
  locale,
}) {
  const breadcrumbItemClass = "gap-2 items-center text-white truncate text-xs";
  const breadcrumbLinkClass = "duration-200 hover:text-red-200";
  return (
    <nav aria-label="Breadcrumbs" className="bg-black">
      <div className="container py-2">
        <ol className="flex items-center gap-2">
          <li className={breadcrumbItemClass}>
            <div className="flex items-center gap-1">
              <Link
                href={`${locale === "en" ? "/en" : "/"}`}
                key="homepage"
                className={breadcrumbLinkClass}
                title="Homepage"
              >
                Home
              </Link>
              {page.model !== "homepage" && (
                <Icon name="down" className="fill-white -rotate-90" size="20" />
              )}
            </div>
          </li>
          {ancestor && (
            <li className={breadcrumbItemClass}>
              <div className="flex max-w-[150px] items-center gap-1">
                <InternalLink
                  locale={locale}
                  label={ancestor.title}
                  element={ancestor}
                  className={breadcrumbLinkClass}
                >
                  {ancestor.menuLabel}
                </InternalLink>
                <Icon name="down" className="fill-white -rotate-90" size="20" />
              </div>
            </li>
          )}
          {grandParent && (
            <li className={breadcrumbItemClass}>
              <div className="flex max-w-[150px] items-center gap-1">
                <InternalLink
                  locale={locale}
                  label={grandParent.title}
                  element={grandParent}
                  className={breadcrumbLinkClass}
                >
                  {grandParent.menuLabel}
                </InternalLink>
                <Icon name="down" className="fill-white -rotate-90" size="20" />
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
                  className={breadcrumbLinkClass}
                >
                  {parent.menuLabel !== undefined
                    ? parent.menuLabel
                    : parent.title}
                </InternalLink>
                <Icon name="down" className="fill-white -rotate-90" size="20" />
              </div>
            </li>
          )}
          {page.model !== "homepage" && (
            <li className={breadcrumbItemClass} aria-current="page">
              {page.title}
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
}
