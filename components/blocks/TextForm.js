import { renderHTML, convertToSlug } from "lib/utils";
import ContactForm from "../form/ContactForm";

export default function TextForm({ locale, record, solutions }) {
  const { labelMenu } = record;
  return (
    <>
      <section
        id={`${convertToSlug(labelMenu)}`}
        className="container margin-scroll-standard"
      >
        <div className="">
          <div className="md:col-span-12 md:col-start-1 lg:col-start-2 lg:col-span-4">
            {record.title && (
              <h2 className="text-2xl text-violet pb-6 uppercase font-bold lg:pb-10">
                {record.title}
              </h2>
            )}
            <div className="text-xl pb-4">{renderHTML(record.text)}</div>
          </div>
          <div className="md:col-start-3 md:col-span-8 lg:col-start-7 lg:col-span-5">
            <ContactForm locale={locale} solutions={solutions} />
          </div>
        </div>
      </section>
    </>
  );
}
