import { renderHTML, convertToSlug } from "lib/utils";
import ContactForm from "../form/ContactForm";

export default function TextForm({ locale, record, solutions, formProps = {} }) {
  const { labelMenu } = record;
  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard xl:grid xl:grid-cols-12"
      >
        <div className="xl:col-start-2 xl:col-span-10">
          <div className="md:col-span-12 md:col-start-1 lg:col-start-2 lg:col-span-4">
            {record.title && (
              <h2 className="xl:text-5xl max-w-prose text-3xl font-bold mb-8">
                {record.title}
              </h2>
            )}
            <div className="text-xl pb-4 max-w-prose">
              {renderHTML(record.text)}
            </div>
          </div>
          <div className="md:col-start-3 md:col-span-8 lg:col-start-7 lg:col-span-5">
            <ContactForm locale={locale} solutions={solutions} {...formProps} />
          </div>
        </div>
      </section>
    </>
  );
}
