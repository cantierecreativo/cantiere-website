import Icon from "components/layout/Icon";
import { renderHTML } from "lib/utils";
import Image from "next/image";

export default function HeroOrange({ locale, page }) {
  const { title, subtitle, abstract } = page;
  return (
    <>
      <header className="bg-red text-black relative md:mb-8 lg:mb-16 xl:mb-0">
        <div className="container pt-32 pb-8 md:pt-40 lg:pt-48 lg:pb-16 z-10 relative h-full min-h-[200px]">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
            <div className="grid gap-4 md:gap-6 lg:gap-12 lg:col-span-9 xl:col-span-8 lg:col-start-2 xl:col-start-2">
              <h1 className="text-3xl md:text-4xl xl:text-6xl max-w-prose">
                {title}
              </h1>
              {subtitle && (
                <h2 className="text-lg max-w-prose xl:text-2xl">
                  {renderHTML(subtitle)}
                </h2>
              )}
              {abstract && (
                <h2 className="text-lg max-w-prose xl:text-xl">
                  {renderHTML(abstract)}
                </h2>
              )}
              <div aria-hidden="true" className="md:inline-block">
                <div className="py-5 rounded-full px-2 border border-black hidden md:inline-block w:auto">
                  <Icon name="arrow" className="rotate-90" size="22" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-cover justify-end md:absolute md:right-0 md:top-0 md:h-full">
          <div
            aria-hidden="true"
            className="w-2/3 aspect-square lg:w-4/5 xl:w-[60vw] h-full absolute bottom-0 md:relative"
          >
            <Image
              src="/shape/shape-orange.svg"
              layout="fill"
              objectFit="contain"
              objectPosition="right"
              alt="shape orange"
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="py-5 rounded-full px-2 inline-block ml-6 mb-6 border border-black left-6 md:hidden"
        >
          <Icon name="arrow" className="rotate-90" size="22" />
        </div>
      </header>
    </>
  );
}
