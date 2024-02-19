import InternalLink from "components/links/InternalLink";
import TitleButton from "components/blocks/TitleButton";
import { Image as DatoImage } from "react-datocms";
import Button from "components/blocks/Button";

export function BlogCard({
  item,
  locale,
  containerClasses = "",
  itemClasses = "",
  imgClasses = "",
}) {
  return (
    <div key={item.id} className={containerClasses}>
      <InternalLink
        className={"group"}
        element={item}
        locale={locale}
        label={item.subtitle}
      >
        <div className={`relative ${itemClasses}`}>
          <div className={`mb-5 ${imgClasses}`}>
            <DatoImage
              className={``}
              data={item.cover.responsiveImage}
              alt={item.cover.responsiveImage.alt}
              title={item.cover.responsiveImage.title}
              layout=""
            />
          </div>
          <div className="basis-[60%]">
            <h2 className="text-base lg:text-lg text-black md:text-xl mb-4 lg:mb-6 font-bold group-hover:underline">
              {item.title}
            </h2>
            <div className="flex gap-2 flex-wrap lg:gap-y-1">
              {item.tags &&
                item.tags.map((t) => {
                  return <div key={t.id}>{t.title}</div>;
                })}
              {item.date && (
                <>
                  <div>|</div>
                  <div>{item.date.split("-").reverse().join("/")}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </InternalLink>
    </div>
  );
}

export default function SectionBlog({ page, locale, site }) {
  const { titleBlog } = page;
  return (
    <section className="vertical-spaces container">
      <TitleButton
        title={titleBlog}
        text=""
        element={site.articlesIndex}
        locale={locale}
      />

      <div className="py-6 lg:pb-24 pb-16 xl:py-0 xl:pb-12">
        <div className="xl:container">
          <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 lg:mx-[calc(100%/12)]">
            <BlogCard
              item={page.articles[0]}
              locale={locale}
              imgClasses={`lg:overflow-hidden lg:max-h-[330px] xl:max-h-[382px] 3xl:max-h-[490px]`}
            />
            <div className="space-y-16 lg:space-y-6 w-full lg:gap-8">
              {page.articles.map((a, i) => {
                {
                  if (i !== 0) {
                    return (
                      <BlogCard
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
