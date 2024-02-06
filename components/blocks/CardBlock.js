import { renderHTML } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import t from "lib/locales";

export default function CardBlock({ data, showNumbers, l, n }) {
  return (
    <div
      key={data.id}
      className="grid gap-5 lg:gap-x-0 text-black custom-border relative hover:-translate-y-2 duration-200"
    >
      <InternalLink
        element={data.link.relatedElement}
        locale={l}
        label={data.link.title}
        className="group z-10"
      >
        <div className="custom-border-right" />
        <div className="grid gap-4 p-6 content-start lg:p-8 py-8 lg:pt-10 xl:pb-12 ">
          {showNumbers && <div className="">{`0${n + 1}`}</div>}
          {data.title && (
            <h2 className="text-2xl lg:text-xl xl:text-2xl duration-200 text-blue group-hover:text-black">
              {data.title}
            </h2>
          )}
          {data.text && <h3 className="">{renderHTML(data.text)}</h3>}
          {data.link && (
            <div className="inline-block">
              <div className="underline-default after:bg-black inline-block mt-4">
                {data.link?.cta ? data.link.cta : t("more", l)}
              </div>
            </div>
          )}
        </div>
      </InternalLink>
    </div>
  );
}
