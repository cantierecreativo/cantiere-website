import t from "lib/locales";
import Link from "next/link";

export default function ExternalLink({
  children,
  url,
  label,
  className,
  locale,
}) {
  return (
    <Link
      href={url}
      className={className}
      rel="noreferrer"
      target="_blank"
      title={`${t("externaLink", locale)} ${label}`}
    >
      {children}
    </Link>
  );
}
