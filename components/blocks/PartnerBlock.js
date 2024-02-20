import { Image as DatoImage } from "react-datocms";
import Image from "next/image";
import { renderHTML } from "lib/utils";
import ExternalLink from "components/links/ExternalLink";

function renderImage(image) {
  if (image.format !== "svg") {
    return (
      <DatoImage
        className="md:scale-50"
        data={image.responsiveImage}
        alt={image.responsiveImage.alt}
        title={image.responsiveImage.title}
        layout="fill"
        objectFit="contain"
      />
    );
  } else {
    return (
      <Image
        className="md:scale-50"
        src={image.url}
        alt={image.alt}
        title={image.title}
        layout="fill"
        objectFit="contain"
      />
    );
  }
}

export function PartnerList({ partners, direction }) {
  const directionClass =
    direction === "left" ? "animate-card-loop-left" : "animate-card-loop-right";

  return (
    <div className={`w-full ${directionClass}`}>
      <div className="grid grid-cols-4 border-b border-gray border-dotted">
        {partners.map((p) => (
          <div key={p.id} className="border-logo">
            <div key={p.id} className="relative aspect-[5/3]">
              {renderImage(p.image)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function PartnerBlock({ locale, page, record }) {
  const { partners } = record;
  const tot = partners.length;
  const half = tot / 2;
  const firstHalf = partners.slice(0, half);
  const lastHalf = partners.slice(half, tot);

  return (
    <>
      <section className="">
        {page.model === "partners_index" ? (
          <div className="lg:grid lg:grid-cols-12">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:col-span-10 lg:col-start-2 items-start">
              {partners.map((p) => (
                <div
                  key={p.id}
                  className="grid gap-5 lg:gap-x-0 text-black custom-border relative content-start"
                >
                  <div class="custom-border-right" />
                  <div
                    key={p.id}
                    className="relative aspect-[5/3] w-[99%] mx-auto custom-border-bottom"
                  >
                    {renderImage(p.image)}
                  </div>
                  {p.text && <div className="px-6">{renderHTML(p.text)}</div>}
                  {p.link && (
                    <ExternalLink url={p.link} locale={locale} label={p.title}>
                      <div className="inline-block px-6 pb-8">
                        <div className="underline-default after:bg-black inline-block">
                          {p.linkLabel ? p.linkLabel : t("more", locale)}
                        </div>
                      </div>
                    </ExternalLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <div className="flex w-[200%]">
              <PartnerList partners={firstHalf} direction="left" />
              <PartnerList partners={firstHalf} direction="left" />
            </div>
            <div className="flex w-[200%] -mt-[1px]">
              <PartnerList partners={lastHalf} direction="right" />
              <PartnerList partners={lastHalf} direction="right" />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
