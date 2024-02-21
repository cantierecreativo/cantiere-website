import { renderHTML, formatDate } from "lib/utils";
import { Image as DatoImage } from "react-datocms";
import InternalLink from "components/links/InternalLink";
import Icon from "components/layout/Icon";

export default function HeroBlog({ locale, page }) {
  const { title, text, date, author, abstract, tags, cover, model } = page;
  return (
    <>
      <header className="container pt-32 pb-8 md:pt-40 lg:pt-48 lg:pb-16 z-10 relative">
        <div
          aria-hidden="true"
          className="w-[90vw] -z-10 top-0 absolute xl:w-[105%] overflow-hidden"
        >
          <Icon name={"shapeDouble"} className="w-full fill-violet-dark/10" />
        </div>
        <div className="grid gap-6 z-[1] relative">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:gap-12 items-start">
            <div className="grid gap-4 md:gap-6 xl:gap-10 items-start">
              {model !== "job" && (
                <div className="flex gap-4">
                  {tags.length > 0 && (
                    <>
                      <InternalLink
                        className="underline underline-offset-4"
                        element={tags[0]}
                        locale={locale}
                        label={tags[0].title}
                      >
                        <div className="font-bold">{tags[0].title}</div>
                      </InternalLink>
                      |
                    </>
                  )}
                  <div className="font-bold capitalize">
                    {formatDate(date, locale)}
                  </div>
                </div>
              )}
              <h1 className="text-xl font-bold md:text-2xl lg:text-3xl max-w-prose pt-4 md:pt-0 xl:pr-20">
                {title}
              </h1>
              {text && (
                <h2 className="subtitleHero xl:pr-20">{renderHTML(text)}</h2>
              )}
              {abstract && (
                <h3 className="text-sm lg:text-base xl:pr-20">
                  {renderHTML(abstract)}
                </h3>
              )}
              {author && (
                <div className="flex items-center gap-2 flex-wrap gap-y-4">
                  {author.image && (
                    <DatoImage
                      className="rounded-full w-[50px] h-[50px]"
                      data={author.image.responsiveImage}
                      alt={author.image.responsiveImage.alt}
                      title={author.image.responsiveImage.title}
                    />
                  )}
                  <span className="font-bold text-xs">{author.name}</span>
                  <span className="text-xs">{author.role}</span>
                </div>
              )}
            </div>
            {cover && (
              <div className="mt-8 md:mt-0 ">
                <DatoImage
                  className=""
                  data={cover.responsiveImage}
                  alt={cover.responsiveImage.alt}
                  title={cover.responsiveImage.title}
                  layout=""
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
