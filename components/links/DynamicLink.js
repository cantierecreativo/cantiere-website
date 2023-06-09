import { Children } from "react";
import ExternalLink from "./ExternalLink";
import InternalLink from "./InternalLink";
import t from "lib/locales";
import Link from "next/link";

export default function DynamicLink({ record, locale, children, className }) {
  // return console.log("record:", record);
  return record.model === "internal_link" ? (
    record.linkContactForm === false ? (
      <InternalLink
        element={record.relatedElement}
        label={record.label}
        locale={locale}
        className={className}
      >
        {children}
      </InternalLink>
    ) : (
      <Link
        href={t("contact-us-url", locale)}
        title={t("contact-us-label", locale)}
        locale={locale}
        className={className}
      >
        {children}
      </Link>
    )
  ) : (
    <ExternalLink
      url={record.url}
      label={record.label}
      locale={locale}
      className={className}
    >
      {children}
    </ExternalLink>
  );
}
