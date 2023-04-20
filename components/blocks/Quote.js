import Icon from 'components/layout/Icon'
import { renderHTML } from 'lib/utils';

export default function Quote({ locale, record }) {
  return (
    <>
      <section className="container">
        <div className="grid grid-cols-12 col-start-2 col-span-10 gap-4">
          <div className="col-start-2 col-span-10">
            <Icon name="quote" className="" fill="black" size="20" />
            <div className="text-2xl md:text-3xl lg:text-4xl py-12">{renderHTML(record.text)}</div>
              <p className="text-violet text-base">{(record.author).toUpperCase()}</p>
              <div className="text-xs py-3">{renderHTML(record.authorRole)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
