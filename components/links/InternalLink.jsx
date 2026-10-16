import Link from "next/link";
import { resolveLink } from "lib/utils";

export default function InternalLink({
  children,
  element,
  label,
  className = "group",
  locale,
  slug = null,
}) {
  let page = element;
  if (element.model === "article_link_block") {
    page = element.element.relatedElement;
  }

  return (
    <Link
      href={resolveLink(page, locale, slug)}
      title={label}
      className={className}
    >
      {children}
    </Link>
  );
}
