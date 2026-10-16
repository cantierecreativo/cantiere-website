import Icon from "./Icon";
import ExternalLink from "components/links/ExternalLink";

export default function Social({ locale, site }) {
  const size = "30";
  const iconStyle = "fill-red-600";
  return (
    <>
      <div className="flex gap-2">
        {site.facebookUrl && (
          <ExternalLink
            url={site.facebookUrl}
            title={"Facebook"}
            className="group"
            locale={locale}
          >
            <Icon name="facebook" size={size} className={iconStyle} />
          </ExternalLink>
        )}
        {site.instagramUrl && (
          <ExternalLink
            url={site.instagramUrl}
            title={"Instagram"}
            className="group"
            locale={locale}
          >
            <Icon name="instagram" size={size} className={iconStyle} />
          </ExternalLink>
        )}
        {site.twitterUrl && (
          <ExternalLink
            url={site.twitterUrl}
            title={"Twitter"}
            className="group"
            locale={locale}
          >
            <Icon name="twitter" size={size} className={iconStyle} />
          </ExternalLink>
        )}
        {site.linkedinUrl && (
          <ExternalLink
            url={site.linkedinUrl}
            title={"Linkedin"}
            className="group"
            locale={locale}
          >
            <Icon name="linkedin" size={size} className={iconStyle} />
          </ExternalLink>
        )}
      </div>
    </>
  );
}
