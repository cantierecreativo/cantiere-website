import { renderHTML } from "lib/utils";
import Icon from "components/layout/Icon";
import ExternalLink from "components/links/ExternalLink";

export default function AttachmentsBlock({ locale, record }) {
  const { title, text, attachments } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10  grid gap-6">
            <h2 className="text-3xl md:col-start-5 max-w-prose">{title}</h2>
            <div className="text-lg md:col-start-5 max-w-prose pb-6">{renderHTML(text)}</div>
            <div className="border-t border-dashed md:col-start-5">
              {attachments && attachments.map(({ id, file, title }) => (
                <div key={id} className="border-b border-dashed py-4 flow-root">
                  <div className="float-left">
                    <p className="text-violet text-base pb-2">{title}</p>
                    <p className="text-xs">{(file.url.substring(file.url.lastIndexOf('.') + 1)).toUpperCase() + " - 230 Kb"}</p>
                  </div>
                    <ExternalLink
                      label="download"
                      className="space-x-2 items-center bg-violet rounded-full p-3 float-right text-white"
                      url={file.url}>
                      <Icon name="download" className="" fill="white" size="25"/>
                    </ExternalLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

