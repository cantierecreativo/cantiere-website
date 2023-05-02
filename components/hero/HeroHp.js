import Icon from "components/layout/Icon";
import { Image as DatoImage } from "react-datocms";

export default function HeroHp({ locale, page }) {
  const { title, image } = page;
  return (
    <>
      <header className="text-white bg-blue relative pt-20">
        <div className="pl-6 md:pl-10 pt-8 md:pt-12 lg:pt-0 xl:pl-[calc((100vw-1100px)/2)]">
          <div className="grid gap-7 pb-8 lg:grid-cols-2 lg:pb-0 lg:items-center lg:gap-0">
            <h1 className="text-3xl md:text-5xl max-w-prose md:pr-12 pr-6 lg:block lg:pr-0 z-20 xl:hidden">
              {title}
            </h1>
            <div className="flex relative xl:col-start-2">
              <Icon
                className="w-[41.2%] h-full fill-violet lg:absolute lg:right-full lg:top-0 lg:w-[75%] xl:w-[50%]"
                name="shapeSingle"
              />
              <div className="w-[58.8%] lg:w-full aspect-[5/7] xl:aspect-[5/5] relative">
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
        <div
          aria-hidden="true"
          className="hidden container z-20 xl:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 left"
        >
          <div className="xl:grid grid-cols-12">
            <div className="text-6xl 2xl:text-7xl col-span-6 xl:col-span-7 2xl:col-span-8 3xl:col-span-7 3xl:col-start-2 col-start-2">
              {title}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
