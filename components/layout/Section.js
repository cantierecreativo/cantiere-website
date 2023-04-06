import DastContent from "components/DastContent";
import { convertToSlug } from "lib/utils";

export default function Section({ locale, blocks, site }) {
  return (
    <>
      <div className="py-12 gap-24 grid">
        {blocks.map((b) => {
          return (
            <div
              className="gap-4 grid scroll-mt-24 container"
              id={convertToSlug(b.label)}
              key={b.id}
            >
              {b.title && <h2 className="text-xl">{b.title}</h2>}
              <DastContent content={b.content} locale={locale} site={site} />
            </div>
          );
        })}
      </div>
    </>
  );
}
