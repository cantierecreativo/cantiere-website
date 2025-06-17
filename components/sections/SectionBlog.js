import InternalLink from "components/links/InternalLink";
import TitleButton from "components/blocks/TitleButton";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";
import Masonry from "react-masonry-css";
import { formatDate } from "lib/utils";
import { cleanFileName } from "lib/utils";

export function BlogCard({
  item,
  locale,
  containerClasses = "",
  itemClasses = "",
  imgClasses = "",
  n,
}) {
  const fallbackAlt = item ? cleanFileName(item?.cover?.filename) : "";

  return (
    <div key={item.id} className={containerClasses}>
      <InternalLink
        className={"group"}
        element={item}
        locale={locale}
        label={item.subtitle}
      >
        <div className={`relative ${itemClasses}`}>
          {item.cover && (
            <div className={`mb-5 ${imgClasses}`}>
              <DatoImage
                className={``}
                data={item.cover.responsiveImage}
                alt={item.cover.responsiveImage.alt || fallbackAlt}
                title={item.cover.responsiveImage.title || fallbackAlt}
                layout=""
              />
            </div>
          )}
          <div className="basis-[60%]">
            <h2 className="text-lg text-black md:text-xl mb-4 duration-400 lg:mb-4 font-bold group-hover:underline-offset-4	group-hover:underline">
              {item.title}
            </h2>
            <div className="flex gap-2 flex-wrap lg:gap-y-1 text-sm capitalize">
              {item.tags.length > 0 && <div>{item.tags[0].title}</div>}
              {item.date && (
                <>
                  <div>|</div>
                  <div>{formatDate(item.date, locale)}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </InternalLink>
    </div>
  );
}

export default function SectionBlog({
  page,
  locale,
  site,
  articles,
  titleBlog,
  titleBlogClass,
}) {
  return (
    <section className="vertical-spaces container">
      <TitleButton
        title={titleBlog}
        text=""
        element={site.articlesIndex}
        locale={locale}
        titleClass={titleBlogClass}
      />

      <div className="py-6 lg:pb-24 pb-16 xl:py-0 xl:pb-12">
        <div className="xl:container">
          <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:mx-[calc(100%/12)]">
            <BlogCard
              item={articles[0]}
              locale={locale}
              imgClasses={`lg:overflow-hidden lg:max-h-[330px] xl:max-h-[382px] 3xl:max-h-[490px]`}
            />
            <div className="space-y-16 lg:space-y-6 w-full lg:gap-8">
              {articles.map((a, i) => {
                {
                  if (i !== 0) {
                    return (
                      <BlogCard
                        key={a.id}
                        item={a}
                        locale={locale}
                        containerClasses={``}
                        itemClasses={`lg:flex lg:gap-x-5`}
                        imgClasses={`mb-0 basis-[40%] flex-none`}
                      />
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
