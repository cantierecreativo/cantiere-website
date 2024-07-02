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
  return (
    <Link href={resolveLink(element, locale, slug)} title={label} className={className}>
      {children}
    </Link>
  );
}
