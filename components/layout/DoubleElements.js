import PreviewCard from "components/cards/PreviewCard";
import InternalLink from "components/links/InternalLink";

export default function DoubleElements({ locale, elements, title }) {
  return (
    <>
      <div className="container margin-scroll-standard lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          {title && (
            <h2 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold">
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 py-8 gap-8 xl:py-20">
            {elements.map((e) => (
              <div key={e.id}>
                <InternalLink
                  element={e}
                  locale={locale}
                  className="group grid gap-4"
                  label={e.title}
                >
                  <PreviewCard record={e} />
                </InternalLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
