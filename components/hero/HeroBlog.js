import { renderHTML, formatDate } from "lib/utils";
import InternalLink from "components/links/InternalLink";
import { Image as DatoImage } from "react-datocms";

export default function HeroBlog({ locale, page }) {
  const { title, text, date, author, abstract, tags, cover, model } = page;
  return (
    <>
      <header className="container pt-20 pb-8 md:pt-32 lg:pt-40 lg:pb-16 z-10 relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="grid gap-4 md:gap-6 md:grid-cols-12 lg:grid-cols-11 lg:gap-12 lg:col-span-11 lg:gap-x-0 lg:col-start-2">
            <div className="grid gap-4 md:gap-6 md:col-span-8 xl:gap-10">
              {model !== "job" && (
                <div className="flex gap-4">
                  <div className="font-bold">{formatDate(date, locale)}</div>
                  {author && <div>{author.name}</div>}
                </div>
              )}
              <h1 className="text-2xl md:text-2xl lg:text-4xl max-w-prose pt-4 md:pt-0">
                {title}
              </h1>
              {text && <h2 className="subtitleHero">{renderHTML(text)}</h2>}
              {abstract && (
                <h3 className="subtitleHero">{renderHTML(abstract)}</h3>
              )}
            </div>
            {tags.length > 0 && (
              <div className="grid gap-2 content-start pt-6 md:pt-12 md:col-start-10 xl:pt-20">
                <div className="text-xs text-black/50 pb-1">Tag</div>
                {tags.map((t) => (
                  <InternalLink
                    key={t.id}
                    element={t}
                    locale={locale}
                    label={t.title}
                    className={"group"}
                  >
                    <div className="group-hover:text-blue duration-200">
                      {t.title}
                    </div>
                  </InternalLink>
                ))}
              </div>
            )}
          </div>
        </div>
        {cover && (
          <div className="unwrapped-on-mobile mt-8 lg:mt-12 xl:mt-16 lg:pt-16">
            <DatoImage
              className=""
              data={cover.responsiveImage}
              alt={cover.responsiveImage.alt}
              title={cover.responsiveImage.title}
              layout=""
            />
          </div>
        )}{" "}
      </header>
    </>
  );
}
