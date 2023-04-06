import InternalLink from "../links/InternalLink";
import { renderHTML } from "lib/utils";
import Button from "components/blocks/Button";
import t from "lib/locales";

export default function DoubleCtaBlock({ locale, record }) {
  return (
    <section className="container">
      <div className="grid gap-2 md:grid-cols-2 md:gap-5">
        {record.links.map((l) => (
          <InternalLink
            key={l.id}
            locale={locale}
            element={l.link.relatedElement}
            label={renderHTML(l.text)}
            className={"group"}
          >
            <div className="border border-dashed border-black/50 px-8 py-10 grid gap-4 bg-white lg:text-center lg:gap-5 lg:py-16">
              {l.title && (
                <div className="text-sm uppercase font-bold text-blue">
                  {l.title}
                </div>
              )}
              {l.text && (
                <div className="text-lg lg:text-xl xl:max-w-xs xl:mx-auto">
                  {renderHTML(l.text)}
                </div>
              )}
              <div className="lg:flex lg:justify-center">
                <Button label={t("more", locale)} bg="blue" />
              </div>
            </div>
          </InternalLink>
        ))}
      </div>
    </section>
  );
}
