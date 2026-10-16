// Gli strumenti usati nel progetto, spiegati in una riga ciascuno.
export default function LabTools({ tools }) {
  return (
    <section className="bg-[#F7F6FE] py-16 lg:py-24">
      <div className="container margin-scroll-standard lg:grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <p className="text-sm font-bold uppercase text-blue">{tools.eyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">{tools.title}</h2>
          <p className="mt-6 max-w-prose text-lg lg:text-xl">{tools.text}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.items.map((t) => (
              <div key={t.id} className="flex flex-col gap-3 rounded-3xl bg-white p-6 lg:p-8">
                <h3 className="text-xl font-bold">{t.title}</h3>
                <p className="text-base text-gray-dark">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
