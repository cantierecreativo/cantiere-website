import { renderHTML } from "lib/utils";

export default function NumbersBlock({ locale, record }) {
  const { numbers, text, title } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="md:col-span-5 md:col-start-2">
            <h3 className="text-3xl md:text-2xl lg:text-4xl max-w-prose">{title}</h3>
            {text && (
              <div className="text-lg lg:text-xl max-w-prose py-8">{renderHTML(text)}</div>
            )}
          </div>
          <div className="md:col-span-4 md:col-start-8 grid border-b-2 border-dashed">
            {numbers && numbers.map(({ id, number, description }) => (
              <div key={id} className="text-xl max-w-prose border-t-2 border-dashed py-8">
                <p className="text-violet text-5xl xl:text-6xl">{number}</p>
                <p className="text-lg">{description}</p>
              </div>))}
          </div>
        </div>
      </section>
    </>
  );
}
