// Il messaggio del Lab: velocità dell'AI, scelte fatte da persone, prodotti come prova.
export default function LabManifesto({ manifesto }) {
  return (
    <section className="container margin-scroll-standard lg:grid lg:grid-cols-12">
      <div className="lg:col-span-10 lg:col-start-2">
        <p className="text-sm font-bold uppercase text-blue">{manifesto.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">{manifesto.title}</h2>
        <div className="mt-12 grid gap-8 border-t border-gray pt-10 md:grid-cols-3">
          {manifesto.items.map((m) => (
            <div key={m.id} className="space-y-3">
              <h3 className="text-xl font-bold">{m.title}</h3>
              <p className="text-lg text-gray-dark">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
