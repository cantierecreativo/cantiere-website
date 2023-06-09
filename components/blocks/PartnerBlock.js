import { Image as DatoImage } from "react-datocms";
import Image from "next/image";

export default function PartnerBlock({ locale, record }) {
  const { partners } = record;
  return (
    <>
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray border-dotted">
          {partners.map((p) => (
            <div key={p.id} className="p-2 xl:p-6 xl:px-10 px-4 border-logo">
              <div key={p.id} className="relative aspect-[5/3]">
                {/* {p.image.format} */}
                {p.image.format !== "svg" ? (
                  <DatoImage
                    className=""
                    data={p.image.responsiveImage}
                    alt={p.image.responsiveImage.alt}
                    title={p.image.responsiveImage.title}
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <Image
                    className=""
                    src={p.image.url}
                    alt={p.image.alt}
                    title={p.image.title}
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
