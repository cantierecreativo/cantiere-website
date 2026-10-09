// I tre principi del Lab, ognuno con la prova presa dal progetto: testo e immagine alternati.
export default function LabChapters({ chapters }) {
  return (
    <section className="container margin-scroll-standard lg:grid lg:grid-cols-12">
      <div className="lg:col-span-10 lg:col-start-2">
        <p className="text-sm font-bold uppercase text-blue">{chapters.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">{chapters.title}</h2>
        <ol className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {chapters.items.map((c, i) => (
            <li key={c.id} className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? "md:order-2" : undefined}>
                <p className="text-2xl font-bold text-blue lg:text-3xl">{c.line}</p>
                <h3 className="mt-4 text-xl font-bold lg:text-2xl">{c.title}</h3>
                <p className="mt-4 max-w-prose text-lg text-gray-dark">{c.text}</p>
                <ul className="mt-6 space-y-3">
                  {c.points.map((point) => (
                    <li key={point} className="flex gap-3 text-base lg:text-lg">
                      <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-blue" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="overflow-hidden rounded-3xl bg-[#F7F6FE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image.src}
                  alt={c.image.alt}
                  width={c.image.width}
                  height={c.image.height}
                  loading="lazy"
                  className="h-auto w-full"
                />
                {c.image.caption && (
                  <figcaption className="px-5 py-3 text-sm text-gray-dark">{c.image.caption}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
