import { renderHTML } from "lib/utils";
import Form from "../form/Form"

export default function TextForm({ locale, record }) {
  console.log(record)
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:grid-cols-12 pb-10">
           <div className="md:col-span-12 md:col-start-1 lg:col-start-2">
            <p className="text-base text-violet pb-9">{(record.title).toUpperCase()}</p>
            <p className="text-lg lg:text-xl pb-6">{renderHTML(record.text)}</p>
          </div>
          <div className="md:col-start-3 md:col-span-8 lg:col-start-7 lg:col-span-5"><Form></Form></div>
        </div>
      </section>
    </>
  );
}
