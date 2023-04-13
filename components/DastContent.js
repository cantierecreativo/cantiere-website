import { StructuredText } from "react-datocms";
import {
  renderRule,
  isHeading,
  isThematicBreak,
  isList,
  isListItem,
  isBlockquote,
  isParagraph,
} from "datocms-structured-text-utils";

import Icon from "./layout/Icon";
import ImageBlock from "components/blocks/ImageBlock";
import BannerBlock from "components/blocks/BannerBlock";
import AttachmentsBlock from "components/blocks/AttachmentsBlock";
import InternalLink from "./links/InternalLink";
import Gallery from "components/blocks/Gallery";
import ExternalVideo from "components/video/VideoEmbedded";
import CardImageBlock from "components/blocks/CardImageBlock";

export default function DastContent({ content, locale, page }) {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.model) {
          case "image_block":
            return <ImageBlock record={record} locale={locale} />;
          case "article_link_block":
            return <ArticleLinkBlock record={record} locale={locale} />;
          case "article_text_block":
            return <ArticleTextBlock record={record} locale={locale} />;
          case "article_video_block":
            return null;
            return <ExternalVideo record={record} locale={locale} />;
          case "attachments_block":
            return <AttachmentsBlock record={record} locale={locale} />;
          case "banner_block":
            return <BannerBlock record={record} locale={locale} />;
          case "card_image_block":
            return <CardImageBlock record={record} locale={locale} />;
          case "gallery":
            return <Gallery record={record} locale={locale} />;
          default:
            return null;
        }
      }}
      customRules={[
        renderRule(isHeading, ({ node, children, key }) => {
          const Tag = `h${node.level}`;
          let classTitle;
          if (node.level == 2) {
            classTitle = "text-3xl";
          } else classTitle = "text-xl";
          return (
            <div key={key} className="max-w-prose">
              <Tag className={classTitle}>{children}</Tag>
            </div>
          );
        }),
        renderRule(isParagraph, ({ children, key }) => {
          return (
            <div key={key} className="">
              <p className="max-w-prose">{children}</p>
            </div>
          );
        }),
        renderRule(isList, ({ children, key, node }) => {
          return (
            <div key={key} className="">
              {node.style == "numbered" ? (
                <ol className="">{children}</ol>
              ) : (
                <ul className="">{children}</ul>
              )}
            </div>
          );
        }),
        renderRule(isThematicBreak, () => {
          return (
            <div className="">
              <hr className="border-black" />
            </div>
          );
        }),
        renderRule(isBlockquote, ({ node, children, key }) => {
          return (
            <blockquote
              key={key}
              className="px-4 py-6 container xl:grid xl:grid-cols-12 lg:py-12"
            >
              <div className="p-8 xl:col-span-10 xl:col-start-2">
                <div className="px-4">
                  <Icon
                    name="quote"
                    className="xl:scale-150 ml-1 fill-red-900"
                    size="25"
                  />
                </div>
                <div className="">{children}</div>
                <footer className="text-xxs uppercase pt-6 px-4 xl:px-20">
                  {node.attribution}
                </footer>
              </div>
            </blockquote>
          );
        }),
      ]}
      renderLinkToRecord={({ record, children }) => {
        return (
          <InternalLink element={record} label={record.title} locale={locale}>
            <span className="underline">{children}</span>
          </InternalLink>
        );
      }}
    />
  );
}
