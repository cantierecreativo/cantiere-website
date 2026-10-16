// La giornata del progetto: chi ha fatto cosa, persone e agente AI.
const badge = {
  human: "bg-yellow text-black",
  ai: "bg-blue text-white",
  both: "bg-violet text-black",
};

export default function LabStory({ story }) {
  return (
    <section className="container margin-scroll-standard lg:grid lg:grid-cols-12">
      <div className="lg:col-span-10 lg:col-start-2">
        <p className="text-sm font-bold uppercase text-blue">{story.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-4xl xl:text-5xl">{story.title}</h2>
        <p className="mt-6 max-w-prose text-lg lg:text-xl">{story.text}</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold uppercase" aria-hidden="true">
          {Object.entries(story.legend).map(([key, label]) => (
            <span key={key} className={`rounded-full px-3 py-1 ${badge[key]}`}>
              {label}
            </span>
          ))}
        </div>
        <ol className="mt-10 border-l-2 border-violet-dark">
          {story.steps.map((s) => (
            <li key={s.id} className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[110px_minmax(0,1fr)] md:gap-8 md:pl-10">
              <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue" />
              <span className="text-xl font-bold text-blue">{s.time}</span>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase ${badge[s.who]}`}>
                    {story.legend[s.who]}
                  </span>
                </div>
                <p className="max-w-prose text-base text-gray-dark lg:text-lg">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
