import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";
import t from "lib/locales";
import { cleanFileName } from "lib/utils";

export default function StandardCard({ locale, record }) {
  const { title, cover, abstract } = record;
  return (
    <>
      <div className="lg:grid lg:grid-cols-6">
        <div className="grid gap-2 lg:col-span-5 lg:col-start-2 content-start">
          <InternalLink
            element={record}
            label={title}
            locale={locale}
            className={"group grid gap-2 lg:gap-4"}
          >
            <div className="group-hover:-translate-y-2 duration-200 grid gap-2 lg:gap-4">
              {cover && (
                <DatoImage
                  className=""
                  data={cover.responsiveImage}
                  alt={
                    cover.responsiveImage.alt || cleanFileName(cover.filename)
                  }
                  title={
                    cover.responsiveImage.title || cleanFileName(cover.filename)
                  }
                  layout=""
                />
              )}
              <h2 className="text-blue group-hover:text-black duration-200 text-xl lg:text-2xl">
                {title}
              </h2>
              <h3 className="">{renderHTML(abstract)}</h3>
              <div className="inline-block">
                <div className="underline-default after:bg-black inline-block">
                  {t("more", locale)}
                </div>
              </div>
            </div>
          </InternalLink>
        </div>
      </div>
    </>
  );
}
