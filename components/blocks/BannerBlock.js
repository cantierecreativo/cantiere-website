import DynamicLink from "components/links/DynamicLink";
import { renderHTML, convertToSlug } from "lib/utils";
import Image from "next/legacy/image";
import Button from "./Button";
import t from "lib/locales";
import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";
import { cleanFileName } from "lib/utils";

export default function BannerBlock({ locale, record }) {
  const { title, text, link, labelMenu, image, prefix } = record;
  const fallbackAlt = image && cleanFileName(image?.filename);

  return (
    <>
      {image ? (
        <div
          id={`${convertToSlug(labelMenu)}`}
          className="bg-[url('/background/gradient.svg')] bg-cover text-white relative overflow-x-hidden"
        >
          <div className="pt-12 md:py-0 padding-left-container">
            <div className="grid gap-7 pb-8 md:pb-0 md:items-center md:grid-cols-2 md:gap-0 lg:pb-0 lg:items-center lg:gap-0">
              <div className="grid gap-7 xl:max-w-sm xl:py-24 md:py-12 lg:py-20">
                <div className="font-bold pr-6">{prefix}</div>
                {title && (
                  <h2 className="text-3xl md:text-4xl xl:text-5xl max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20">
                    {title}
                  </h2>
                )}
                {text && (
                  <h3 className="pr-6 max-h-24 line-clamp-4 xl:max-h-36 xl:line-clamp-6">
                    {renderHTML(text)}
                  </h3>
                )}
                <DynamicLink record={link} locale={locale} className={"group"}>
                  <Button
                    bg="white"
                    label={link?.label ? link.label : t("more", locale)}
                  />
                </DynamicLink>
              </div>
              <div className="xl:w-full xl:h-full aspect-square relative my-6 md:my-0">
                <DatoImage
                  className="rounded-l-full w-full h-full"
                  data={image.responsiveImage}
                  alt={image.responsiveImage.alt || fallbackAlt}
                  title={image.responsiveImage.title || fallbackAlt}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-full">
          <div
            id={`${convertToSlug(labelMenu)}`}
            className="bg-blue text-white bg-cover relative overflow-hidden lg:py-12 margin-scroll-standard"
          >
            <div className="container py-16 2xl:py-40 xl:py-28 relative z-10">
              <div className="text-center lg:max-w-[70%] mx-auto text-balance">
                {prefix && <div className="text-lg lg:text-xl">{prefix}</div>}
                <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl mt-4">
                  {title}
                </h2>
                {text && (
                  <h3 className="pt-5 text-base lg:text-lg xl:text-xl mt-6">
                    {renderHTML(text)}
                  </h3>
                )}
              </div>
              <div className="text-center mt-12 lg:mt-16 xl:mt-20">
                <DynamicLink record={link} locale={locale} className={"group"}>
                  <div className="inline-block group text-2xl md:text-3xl lg:text-4xl px-16 py-4 md:px-28 md:py-5 lg:px-36 lg:py-6 rounded-full after:bg-white border-white fill-black group-hover:fill-white group-hover:after:top-full after:bottom-0 border duration-300 after:z-0 after:absolute after:left-0 after:right-0 after:top-0 relative after:motion-safe:duration-300 overflow-hidden">
                    <span className="relative z-[1] text-black group-hover:text-white motion-safe:duration-300">
                      {link?.label ? link.label : t("more", locale)}
                    </span>
                  </div>
                </DynamicLink>
              </div>
            </div>
          </div>
          <Image
            aria-hidden="true"
            src="/background/contactBanner.svg"
            objectFit="cover"
            layout="fill"
            className="absolute w-full h-full z-0 mx-auto"
            alt="shape"
          />
        </div>
      )}
    </>
  );
}
