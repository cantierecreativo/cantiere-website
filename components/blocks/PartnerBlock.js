import { Image as DatoImage } from "react-datocms";

export default function PartnerBlock({ locale, record }) {
  const { partners } = record;
  return (
    <>
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray border-dashed">
          {partners.map((p) => (
            <div key={p.id} className="p-2 xl:p-8 px-4 border-logo">
              <div key={p.id} className="relative aspect-[5/3]">
                <DatoImage
                  className=""
                  data={p.image.responsiveImage}
                  alt={p.image.responsiveImage.alt}
                  title={p.image.responsiveImage.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
