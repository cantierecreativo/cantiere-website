import Icon from "components/layout/Icon";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";
import Menu from "components/layout/Menu";
import { cleanFileName } from "lib/utils";

export default function HeroHp({ page, locale }) {
  const { title, image, abstract, model, menuLabel } = page;
  return (
    <>
      <header className="text-white bg-blue relative pt-20">
        <div className="pl-6 md:pl-10 pt-8 md:pt-12 lg:pt-0 xl:pl-[calc((100vw-1100px)/2)] 3xl:pl-[calc((100vw-1355px)/2)] lg:pl-[calc((100vw-946px)/2)]">
          <div className="grid gap-7 lg:grid-cols-2 lg:pb-0 lg:items-center lg:gap-0 pt-8 ">
            <div className="space-y-3 xl:pl-20 xl:pr-8 xl:space-y-6">
              {model === "company_service" && (
                <div className="text-lg xl:text-xl">{menuLabel}</div>
              )}
              <h1
                className={`${
                  model === "company_service"
                    ? "xl:text-4xl md:text-3xl"
                    : "xl:text-5xl md:text-4xl"
                } text-blue-light font-bold max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20 text-2xl`}
              >
                {title}
              </h1>
              <h2 className="text-lg max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20 xl:text-xl">
                {renderHTML(abstract)}
              </h2>
              <div className="pt-2 xl:pt-4">
                <Menu page={page} locale={locale} />
              </div>
            </div>
            <div className="mt-8 xl:w-full xl:h-full aspect-square relative my-6 md:my-0">
              <DatoImage
                priority="true"
                className="rounded-l-full"
                data={image.responsiveImage}
                alt={image.responsiveImage.alt || cleanFileName(image.filename)}
                title={
                  image.responsiveImage.title || cleanFileName(image.filename)
                }
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
