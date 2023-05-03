import InternalLink from "../links/InternalLink";
import { renderHTML } from "lib/utils";
import Button from "components/blocks/Button";
import t from "lib/locales";

export default function DoubleCtaBlock({ locale, record }) {
  return (
    <section className="container">
      <div className="lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <div className="grid gap-8 md:grid-cols-2">
            {record.links.map((l) => (
              <InternalLink
                key={l.id}
                locale={locale}
                element={l.link.relatedElement}
                label={l.link.relatedElement.title}
                className="group relative hover:-translate-y-2 duration-200"
              >
                <div className="custom-border py-10 grid gap-8 lg:text-center lg:gap-10 lg:py-16">
                  <div className="custom-border-right" />
                  {l.title && (
                    <div className="text-sm uppercase font-bold text-blue px-6">
                      {l.title}
                    </div>
                  )}
                  {l.text && (
                    <div className="text-lg lg:text-xl xl:max-w-xs xl:mx-auto px-6">
                      {renderHTML(l.text)}
                    </div>
                  )}
                  <div className="lg:flex lg:justify-center px-6">
                    <Button label={t("more", locale)} bg="blue" />
                  </div>
                </div>
              </InternalLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
