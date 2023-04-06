import TitleButton from "components/blocks/TitleButton";
import InternalLink from "components/links/InternalLink";
import { formatDate } from "lib/utils";
import Button from "components/blocks/Button";

export default function SectionLastNews({ locale, items, site }) {
  return (
    <>
      <section className="vertical-spaces container">
        <TitleButton
          title="Blog"
          element={site.articlesIndex}
          locale={locale}
        />
        <div className="border-t border-gray border-dashed">
          {items.map((n) => (
            <InternalLink
              element={n}
              locale={locale}
              label={n.title}
              key={n.id}
              className={"group"}
            >
              <div className="rounded-full xl:group-hover:bg-gradient-to-r from-blue via-[#3ABBC7] to-[#B954FF] xl:group-hover:text-white">
                <div className="grid gap-6 py-8 xl:py-12 border-b border-gray border-dashed md:grid-cols-12 md:py-12">
                  <header className="flex gap-4 md:col-span-4 md:block lg:col-start-2">
                    <div className="font-bold">
                      {formatDate(n.date, locale)}
                    </div>
                    <div className="md:pt-2">{n.author.name}</div>
                  </header>
                  <div className="grid gap-6 md:col-span-7 lg:col-span-6">
                    <div className="uppercase font-bold">
                      {n.tags.map((t) => t.title).join(", ")}
                    </div>
                    <h2 className="text-2xl xl:max-w-md">{n.title}</h2>
                    <Button bg="border" />
                  </div>
                </div>
              </div>
            </InternalLink>
          ))}
        </div>
      </section>
    </>
  );
}
