import { renderHTML } from "lib/utils";
import { Image as DatoImage } from "react-datocms";

export default function CardTextImageBlock({ data, showNumbers, n }) {
  return (
    <div
      key={data.id}
      className="grid gap-5 lg:gap-x-0 text-black custom-border relative content-start"
    >
      <div className="custom-border-right" />
      {data.image?.responsiveImage && (
        <div className="relative aspect-[4/3]">
          <DatoImage
            className=""
            data={data.image.responsiveImage}
            alt={data.image.responsiveImage?.alt || ""}
            title={data.image.responsiveImage?.title || ""}
          />
        </div>
      )}
      <div className="grid gap-4 content-start p-6 lg:p-8 py-8 lg:pt-10 xl:pb-12">
        {showNumbers && <div className="">{`0${n + 1}`}</div>}
        {data.title && <h2 className="text-xl sm:text-2xl">{data.title}</h2>}
        {data.text && <h3 className="">{renderHTML(data.text)}</h3>}
      </div>
    </div>
  );
}
