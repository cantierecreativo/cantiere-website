import { renderHTML, convertToSlug } from "lib/utils";

export default function NumbersBlock({ record }) {
  const { numbers, text, title, labelMenu } = record;
  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-2">
            <h3 className="text-3xl md:text-2xl lg:text-4xl max-w-prose font-bold">
              {title}
            </h3>
            {text && (
              <div className="text-lg lg:text-xl max-w-prose py-8">
                {renderHTML(text)}
              </div>
            )}
          </div>
          <div className="md:col-span-5 md:col-start-7 grid custom-border-top after:hidden lg:col-span-4 lg:col-start-8">
            {numbers &&
              numbers.map(({ id, number, description }) => (
                <div
                  key={id}
                  className="text-xl max-w-prose py-8 custom-border-bottom"
                >
                  <p className="text-violet text-5xl xl:text-6xl">{number}</p>
                  <p className="text-lg pt-2">{description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
