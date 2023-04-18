import { renderHTML } from "lib/utils";
import Icon from "components/layout/Icon";
import ExternalLink from "components/links/ExternalLink";

export default function AttachmentsBlock({ locale, record }) {
  const { title, text, attachments } = record;
  return (
    <>
      <section className="container">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-x-0">
          <div className="lg:col-span-10 lg:col-start-2 grid gap-6">
            <h2 className="text-3xl max-w-prose">{title}</h2>
            <div className="text-lg max-w-prose pb-8">{renderHTML(text)}</div>
            <div className="border-b-2 border-dashed">
              {attachments && attachments.map(({ id, file, title }) => (
                <div key={id} className="border-t-2 border-dashed py-6 flow-root">
                  <div className="float-left">
                    <p className="text-violet text-base pb-3">{title}</p>
                    <p className="text-xs">{(file.url.substring(file.url.lastIndexOf('.') + 1)).toUpperCase() + " - 230 Kb"}</p>
                  </div>
                    <ExternalLink
                      label="download"
                      className="space-x-2 items-center bg-violet rounded-full p-3 float-right text-white"
                      url={file.url}>
                      <Icon name="download" className="" fill="white"/>
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

