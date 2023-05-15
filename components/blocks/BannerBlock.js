import DynamicLink from "components/links/DynamicLink";
import { renderHTML, convertToSlug } from "lib/utils";
import Image from "next/image";
import Button from "./Button";
import t from "lib/locales";
import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";

export default function BannerBlock({ locale, record }) {
  const { title, text, link, labelMenu, image, prefix } = record;
  return (
    <>
      {image ? (
        <div
          id={`${convertToSlug(labelMenu)}`}
          className="bg-[url('/background/gradient.svg')] bg-cover text-white relative margin-scroll-standard"
        >
          <div className="pt-12 md:py-0 padding-left-container">
            <div className="grid gap-7 pb-8 md:pb-0 md:items-center md:grid-cols-2 md:gap-0 lg:pb-0 lg:items-center lg:gap-0">
              <div className="grid gap-7 xl:max-w-sm xl:py-24">
                <div className="font-bold pr-6">{prefix}</div>
               {title && <h2 className="text-3xl md:text-4xl xl:text-5xl max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20">
                  {title}
                </h2>
               } 
                {text && <h3 className="pr-6 line-clamp-4 xl:line-clamp-none">
                  {renderHTML(text)}
                </h3>} 
                <InternalLink
                  element={link.relatedElement}
                  locale={locale}
                  label={link.relatedElement.title}
                >
                  <Button
                    bg="white"
                    label={link?.cta ? link.cta : t("more", locale)}
                  />
                </InternalLink>
              </div>
              <div className="w-full h-full aspect-square relative my-6 md:my-0">
                <DatoImage
                  className="rounded-l-full"
                  data={image.responsiveImage}
                  alt={image.responsiveImage.alt}
                  title={image.responsiveImage.title}
                  layout="fill"
                  objectFit="cover"
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
            <div className="container py-16 2xl:py-40 xl:py-28 relative z-10 grid gap-8 lg:gap-x-0 lg:grid-cols-12 items-start">
              <div className="lg:col-span-7 lg:col-start-2">
                <h2 className="text-3xl xl:text-5xl">{title}</h2>
                {text && (
                  <h3 className="pt-5 pb-10 text-lg lg:pb-0 xl:text-xl xl:pt-10">
                    {renderHTML(text)}
                  </h3>
                )}
              </div>
              <div className="lg:col-span-3 lg:col-start-10 lg:justify-end lg:flex lg:mt-2 xl:-translate-x-14 xl:translate-y-[8px]">
                <DynamicLink record={link} locale={locale} className={"group"}>
                  <Button
                    label={link?.cta ? link.cta : t("more", locale)}
                    bg="white"
                  />
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
