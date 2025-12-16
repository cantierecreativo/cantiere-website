import InternalLink from "components/links/InternalLink";
import Button from "./Button";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";
import { cleanFileName } from "lib/utils";
import Image from "next/image";

export default function CardTitleImageTextHover({ data, showNumbers, l, n }) {
  const fallbackAlt = cleanFileName(data.image.filename);

  return (
    <div
      key={data.id}
      className="grid gap-5 lg:gap-x-0 text-white rounded-[24px] bg-blue/20 hover:bg-blue/40 motion-safe:duration-500 relative p-4 xl:p-6 backdrop-blur-sm border border-white/30"
    >
      <InternalLink
        element={data.link.relatedElement}
        locale={l}
        label={data.link.title}
        className="group z-10"
      >
        <div className="content-start space-y-6">
          {showNumbers && <div className="">{`0${n + 1}`}</div>}
          {data.image && (
            <DatoImage
              className="rounded-[12px] group-hover:scale-105 motion-safe:duration-500"
              data={data.image.responsiveImage}
              alt={data.image.responsiveImage.alt || fallbackAlt}
              title={data.image.responsiveImage.title || fallbackAlt}
            />
          )}
          {data.label && (
            <div className="text-lg lg:text-base motion-safe:duration-500 group-hover:text-white">
              {data.label}
            </div>
          )}
          <div className="flex justify-between items-center pb-4">
            {data.title && (
              <h2 className="text-2xl lg:text-xl font-bold motion-safe:duration-500 group-hover:text-white max-w-1">
                {data.title}
              </h2>
            )}
            {data.link && <Button bg="blue" />}
          </div>
        </div>
      </InternalLink>
    </div>
  );
}
