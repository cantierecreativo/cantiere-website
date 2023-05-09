import InternalLink from "components/links/InternalLink";
import Button from "components/blocks/Button";
import { formatDate } from "lib/utils";

export default function ArticleCard({ locale, record }) {
  const { date, author, tags, title } = record;
  return (
    <>
      <div className="rounded-full">
        <div className="grid gap-6 py-8 xl:py-12 custom-border-top md:grid-cols-12 md:py-12 after:hidden">
          <header className="flex gap-4 md:col-span-4 md:block lg:col-start-2">
            <div className="font-bold">{formatDate(date, locale)}</div>
            <div className="md:pt-2">{author.name}</div>
          </header>
          <div className="grid gap-6 md:col-span-7 lg:col-span-6">
            <div className="uppercase font-bold text-sm md:text-lg">
              {tags.map((t) => (
                <InternalLink
                  key={t.id}
                  element={t}
                  locale={locale}
                  label={t.title}
                  className={"group"}
                >
                  <span className="group-hover:text-blue duration-200">
                    {t.title}
                  </span>
                  <span className="mr-1 group-last:hidden">,</span>
                </InternalLink>
              ))}
            </div>
            <InternalLink
              element={record}
              locale={locale}
              label={title}
              className={"group grid gap-6"}
            >
              <h2 className="text-2xl xl:max-w-md group-hover:text-violet duration-200">
                {title}
              </h2>
              <Button bg="border" />
            </InternalLink>
          </div>
        </div>
      </div>
    </>
  );
}
