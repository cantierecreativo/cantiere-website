import { renderHTML } from "lib/utils";
import Image from "next/image";

export default function HeroBlue({ page, children, abstractTag = "h2" }) {
  const AbstractTag = abstractTag;
  const { title, subtitle, abstract, text } = page;
  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(circle,_#8281D2_0%,_#3938E0_80%)] pb-[35vh]">
        <div className="container pt-32 pb-8 md:pt-40 lg:pt-48 lg:pb-16 z-10 relative h-full min-h-[200px]">
          <div className="text-center space-y-6 xl:space-y-12 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl md:text-4xl xl:text-5xl max-w-prose font-bold">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-lg max-w-prose mx-auto xl:text-2xl">
                {renderHTML(subtitle)}
              </h2>
            )}
            {(abstract || text) && (
              <AbstractTag className="text-md max-w-prose mx-auto xl:text-lg">
                {renderHTML(abstract || text)}
              </AbstractTag>
            )}
          </div>
          {children}
        </div>
        <div
          className={`absolute bottom-0 h-[20vh] lg:h-[35vh] left-1/2 -translate-x-1/2 w-full top-auto`}
        >
          <Image
            src="/icons/top-yellow-white.svg"
            alt="lineHero"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            aria-hidden="true"
          />
        </div>
      </header>
    </>
  );
}
