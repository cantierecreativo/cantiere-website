import InternalLink from "../links/InternalLink";
import Button from "./Button";
import { renderHTML } from "lib/utils";
import t from "lib/locales";

export default function ArticleLinkBlock({ locale, record }) {
  const { title, abstract, element } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-6 xl:gap-10">
            {title && (
              <h2 className="text-3xl md:text-4xl xl:text-6xl max-w-prose">
                {title}
              </h2>
            )}
            {abstract && (
              <div className="text-lg max-w-prose xl:text-xl lg:max-w-md">
                {renderHTML(abstract)}
              </div>
            )}
            <InternalLink
              element={element.relatedElement}
              locale={locale}
              label={element.title}
            >
              <Button bg="black" label={t("more", locale)} />
            </InternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
