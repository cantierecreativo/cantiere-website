import Button from "components/blocks/Button";
import t from "lib/locales";
import { renderHTML } from "lib/utils";
import InternalLink from "components/links/InternalLink";

export default function TitleButton({ locale, title, text = null, element }) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-0">
        <div className="grid gap-4 md:gap-6 lg:col-span-6 lg:col-start-2">
          <h2 className="text-3xl md:text-4xl xl:text-6xl max-w-prose">
            {title}
          </h2>
          {text && (
            <h3 className="text-lg max-w-prose xl:text-xl">
              {renderHTML(text)}
            </h3>
          )}
        </div>
        <div className="lg:col-span-3 lg:flex lg:justify-end lg:items-start lg:translate-y-2 xl:translate-y-7">
          <InternalLink element={element} locale={locale} label={title}>
            <Button bg="blue" label={t("more", locale)} />
          </InternalLink>
        </div>
      </div>
    </>
  );
}
