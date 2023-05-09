import { renderHTML } from "lib/utils";

export default function HeroText({ locale, page }) {
  const { title, text } = page;
  return (
    <>
      <header className="container pt-20 pb-8 md:pt-32 lg:pt-40 lg:pb-16 z-10 relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="grid gap-4 md:gap-6 lg:gap-12 lg:col-span-9 xl:col-span-8 lg:col-start-2 xl:col-start-2 break-words">
            <h1 className="text-3xl md:text-4xl xl:text-6xl max-w-prose overflow-hidden">
              {title}
            </h1>
            {text && (
              <h2 className="text-lg max-w-prose xl:text-xl">
                {renderHTML(text)}
              </h2>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
