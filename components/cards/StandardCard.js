import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";
import { renderHTML, resolveLink } from "lib/utils";

export default function StandardCard({ locale, record }) {
  const { title, cover, abstract } = record;
  return (
    <>
      <div className="lg:grid lg:grid-cols-6">
        <div className="grid gap-2 lg:col-span-5 lg:col-start-2">
          <InternalLink
            element={record}
            label={title}
            locale={locale}
            className={"group grid gap-2"}
          >
            {cover && (
              <DatoImage
                className=""
                data={cover.responsiveImage}
                alt={cover.responsiveImage.alt}
                title={cover.responsiveImage.title}
                layout=""
              />
            )}
            <h2 className="text-blue text-xl lg:text-2xl">{title}</h2>
            <h3 className="">{renderHTML(abstract)}</h3>
          </InternalLink>
          <div className="">{resolveLink(record, locale)}</div>
          <div className="">{record.model}</div>
        </div>
      </div>
    </>
  );
}
