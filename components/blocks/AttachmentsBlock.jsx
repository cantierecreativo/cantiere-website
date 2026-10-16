import { renderHTML } from "lib/utils";
import Icon from "components/layout/Icon";
import ExternalLink from "components/links/ExternalLink";

export default function AttachmentsBlock({ locale, record }) {
  const { title, text, attachments } = record;
  return (
    <>
      <section className="container overflow-hidden">
        <div className="grid gap-4 md:gap-6 md:grid-cols-12 md:gap-x-0">
          <div className="grid gap-6 md:col-start-5 md:col-span-8 lg:col-start-7 lg:col-span-5">
            <h2 className="text-3xl max-w-prose">{title}</h2>
            <div className="text-lg max-w-prose pb-6">{renderHTML(text)}</div>
            <div className="custom-border-bottom">
              {attachments &&
                attachments.map(({ id, file, title }) => (
                  <div
                    key={id}
                    className="custom-border-top py-4 flow-root after:hidden"
                  >
                    <ExternalLink
                      label="download"
                      className="group"
                      url={file.url}
                    >
                      <div className="float-left">
                        <h2 className="text-violet text-base pb-2">{title}</h2>
                        <div className="text-xs flex">
                          <div className="uppercase">{file.format}</div>
                          <span className="px-1">-</span>
                          <div className="">
                            {`${Math.trunc(file.size / 1000)} Kb`}
                          </div>
                        </div>
                      </div>
                      <div className="space-x-2 items-center bg-violet rounded-full p-3 float-right text-white">
                        <Icon
                          name="download"
                          className=""
                          fill="white"
                          size="25"
                        />
                      </div>
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
