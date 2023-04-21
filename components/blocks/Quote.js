import Icon from "components/layout/Icon";
import { renderHTML } from "lib/utils";

export default function Quote({ locale, record }) {
  return (
    <>
      <section className="container">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-start-2 lg:col-span-10">
            <Icon name="quote" className="" fill="black" size="20" />
            <div className="text-2xl md:text-3xl lg:text-4xl py-8 max-w-prose">
              {renderHTML(record.text)}
            </div>
            <p className="text-violet text-base uppercase font-bold">
              {record.author}
            </p>
            <div className="text-xs py-3">{renderHTML(record.authorRole)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
