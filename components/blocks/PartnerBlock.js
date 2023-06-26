import { Image as DatoImage } from "react-datocms";
import Image from "next/image";
import { renderHTML } from "lib/utils";
import ExternalLink from "components/links/ExternalLink";

function renderImage(image) {
  if (image.format !== "svg") {
    return (
      <DatoImage
        className=""
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
        className=""
        src={image.url}
        alt={image.alt}
        title={image.title}
        layout="fill"
        objectFit="contain"
      />
    );
  }
}

export default function PartnerBlock({ locale, page, record }) {
  const { partners } = record;
  return (
    <>
      <section className="container">
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
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray border-dotted">
            {partners.map((p) => (
              <div key={p.id} className="p-2 xl:p-6 xl:px-10 px-4 border-logo">
                <div key={p.id} className="relative aspect-[5/3]">
                  {renderImage(p.image)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
