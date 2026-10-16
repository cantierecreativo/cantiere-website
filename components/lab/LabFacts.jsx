// Numeri del progetto, con lo stile delle card del sito (CardBlock): fondo violet-custom, cifra in blu.
export default function LabFacts({ facts }) {
  return (
    <section className="container pt-12 lg:grid lg:grid-cols-12 lg:pt-16">
      <div className="lg:col-span-10 lg:col-start-2">
        {facts.eyebrow && (
          <p className="text-sm font-bold uppercase text-blue">
            {facts.eyebrow}
          </p>
        )}
        {facts.title && (
          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">
            {facts.title}
          </h2>
        )}
        <dl className="mt-10 grid gap-8 md:grid-cols-3">
          {facts.items.map((f) => (
            <div
              key={f.id}
              className="flex flex-col gap-4 rounded-xl bg-violet-custom p-6 py-8 lg:p-8 lg:pt-10 xl:pb-12"
            >
              {/* Etichetta letta una sola volta: nel DOM viene prima, a schermo dopo il numero. */}
              <dt className="order-2 text-lg">{f.label}</dt>
              <dd className="order-1 text-4xl font-bold text-blue xl:text-5xl">
                {f.number}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
