import InternalLink from "components/links/InternalLink";
import Button from "./Button";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";
import { cleanFileName } from "lib/utils";

export default function CardTitleImageTextHover({ data, showNumbers, l, n }) {
  const fallbackAlt = cleanFileName(data.image.filename);

  return (
    <div
      key={data.id}
      className="grid gap-5 lg:gap-x-0 text-black border border-black/20 relative border-dotted"
    >
      <InternalLink
        element={data.link.relatedElement}
        locale={l}
        label={data.link.title}
        className="group z-10"
      >
        <div className="content-start">
          {showNumbers && <div className="">{`0${n + 1}`}</div>}
          {(data.label || data.title) && (
            <div className="absolute top-8 left-8 z-[3] right-8">
              {data.label && (
                <div className="text-lg lg:text-base mb-4 motion-safe:duration-500 text-black group-hover:text-white">
                  {data.label}
                </div>
              )}
              {data.title && (
                <h2 className="text-2xl lg:text-xl font-bold motion-safe:duration-500 text-black group-hover:text-white">
                  {data.title}
                </h2>
              )}
              {data.text && (
                <div
                  className={`mt-6 text-white opacity-0 group-hover:opacity-90 motion-safe:duration-700 card`}
                >
                  {renderHTML(data.text)}
                </div>
              )}
            </div>
          )}
          {data.image && (
            <DatoImage
              className="absolute top-0 -z-[1]"
              data={data.image.responsiveImage}
              alt={data.image.responsiveImage.alt || fallbackAlt}
              title={data.image.responsiveImage.title || fallbackAlt}
            />
          )}
          {data.text && (
            <div
              className={`absolute inset-0 overflow-hidden p-8 ${
                data.label ? "pt-28" : "pt-20"
              } text-white bg-gradient-to-b from-violet from-40% to-cyan-500 to-90% z-[2] opacity-0 group-hover:opacity-90 motion-safe:duration-700 after:absolute after:z-[-1] after:opacity-40 after:-top-40 after:-left-40 after:w-80 after:h-80 after:bg-pink after:rounded-full after:blur-2xl`}
            ></div>
          )}
          {data.link && (
            <div className="absolute bottom-8 right-8 z-[4]">
              <Button bg="blueWhite" />
            </div>
          )}
        </div>
      </InternalLink>
    </div>
  );
}
