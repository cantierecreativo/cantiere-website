export default function TextBlock({ locale, record }) {
  const { title, text } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-6 xl:gap-10">
            {title && (
              <h2 className="xl:text-5xl max-w-prose text-3xl font-bold">
                {title}
              </h2>
            )}
            {text && (
              <div
                className="text-lg max-w-prose grid gap-3 lg:gap-6 formatted-text"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
