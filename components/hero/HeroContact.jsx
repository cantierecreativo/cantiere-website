import Icon from "components/layout/Icon";
import { renderHTML } from "lib/utils";
import Image from "next/legacy/image";
import Menu from "components/layout/Menu";
import { Image as DatoImage } from "react-datocms";

export default function HeroContact({ locale, page }) {
  const { heroTitle, heroPrefix, heroText, avatars } = page;

  return (
    <>
      <header className="bg-blue text-white relative md:mb-8 lg:mb-16 xl:mb-0 hero-contact">
        <div className="container pt-32 pb-8 md:pt-40 lg:pt-48 lg:pb-16 z-10 relative h-full min-h-[200px]">
          <div className="grid gap-6 lg:gap-x-0">
            <div className="grid gap-4 text-center md:gap-6 lg:gap-12">
              <div className="flex justify-center">
                {avatars.map((image, index) => (
                  <div
                    key={index}
                    className="last-of-type:-translate-x-4 first-of-type:translate-x-4"
                  >
                    <DatoImage
                      className="rounded-full border-4 border-blue"
                      data={image.responsiveImage}
                      alt={image.responsiveImage?.alt || "avatar placeholder"}
                      title={
                        image.responsiveImage?.title || "avatar placeholder"
                      }
                      layout="responsive"
                    />
                  </div>
                ))}
              </div>
              {heroPrefix && (
                <div className="text-lg xl:text-2xl">
                  {renderHTML(heroPrefix)}
                </div>
              )}
              <h1 className="text-3xl md:py-6 md:text-4xl xl:text-6xl font-bold text-center">
                {renderHTML(heroTitle)}
              </h1>
              {heroText && (
                <h2 className="text-lg xl:text-xl">{renderHTML(heroText)}</h2>
              )}
              <a href="#contattaci">
                <div aria-hidden="true" className="md:inline-block md:pt-20">
                  <div className="py-5 rounded-full px-2 border border-white hidden md:inline-block w:auto">
                    <Icon
                      name="arrow"
                      className="rotate-90 fill-white"
                      size="22"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex bg-cover justify-end md:absolute md:right-0 md:top-0 md:h-full">
          <div
            aria-hidden="true"
            className="w-2/3 aspect-square lg:w-4/5 xl:w-[60vw] h-full absolute bottom-0 md:relative"
          >
            <Image
              src="/shape/shape-blue.svg"
              layout="fill"
              objectFit="contain"
              objectPosition="right"
              alt="shape blue"
              priority="true"
            />
          </div>
        </div>
        <div aria-hidden="true" className="flex justify-center md:hidden">
          <div className="py-5 rounded-full px-2 mb-6 border border-white">
            <Icon name="arrow" className="rotate-90 fill-white" size="22" />
          </div>
        </div>
      </header>
    </>
  );
}
