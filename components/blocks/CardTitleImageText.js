import InternalLink from "components/links/InternalLink";
import Button from "./Button";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";
import { cleanFileName } from "lib/utils";

export default function CardTitleImageText({ data, showNumbers, l, n }) {
  return (
    <div
      key={data.id}
      className="grid gap-6 md:grid-cols-2 items-center border-b border-black pb-8 mb-8 md:pb-12"
    >
      {data.image?.responsiveImage && (
        <div className="aspect-[7/8] relative">
          <DatoImage
            className="w-full h-full rounded-3xl"
            data={data.image?.responsiveImage}
            alt={
              data.image?.responsiveImage?.alt ||
              cleanFileName(data.image.filename)
            }
            title={
              data.image?.responsiveImage?.title ||
              cleanFileName(data.image.filename)
            }
            objectFit="cover"
          />
        </div>
      )}
      <div className="xl:pl-12">
        {data.title && (
          <h2 className="text-2xl lg:text-xl font-bold xl:text-3xl">
            {data.title}
          </h2>
        )}
        {data.text && (
          <h3 className={`text-base lg:text-lg mt-6 mb-6`}>
            {renderHTML(data.text)}
          </h3>
        )}
        {data.link && (
          <div className="inline-block">
            <InternalLink
              element={data.link.relatedElement}
              locale={l}
              label={data.link.title}
              className="group z-10"
            >
              {data.link && <Button bg="blueWhite" />}
            </InternalLink>
          </div>
        )}
      </div>
    </div>
  );
}
