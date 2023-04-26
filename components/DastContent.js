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

import ArticleLinkBlock from "./blocks/ArticleLinkBlock";
import ImageBlock from "./blocks/ImageBlock";
import BannerBlock from "./blocks/BannerBlock";
import AttachmentsBlock from "./blocks/AttachmentsBlock";
import InternalLink from "./links/InternalLink";
import Gallery from "./blocks/Gallery";
import ExternalVideo from "./video/VideoEmbedded";
import CardImageBlock from "./blocks/CardImageBlock";
import Quote from "./blocks/Quote";
import { convertToSlug } from "lib/utils";
import TextBlock from "./blocks/TextBlock";

export default function DastContent({ content, locale, page }) {
  const getTextSizeForHeading = (nodeLevel) => {
    switch (nodeLevel) {
      case 1:
      case 2:
        return "text-3xl max-w-prose pt-4 lg:pt-8 lg:text-5xl";
      case 3:
        return "text-2xl max-w-prose pt-2 lg:pt-4 lg:text-3xl";
      default:
        "";
    }
  };
  const blockPadding = "py-8";
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.model) {
          case "image_block":
          case "article_image_block":
            return (
              <div className={blockPadding}>
                <ImageBlock record={record} locale={locale} />
              </div>
            );
          case "article_link_block":
            return (
              <div className={blockPadding}>
                <ArticleLinkBlock record={record} locale={locale} />
              </div>
            );
          case "article_text_block":
            return (
              <div className={blockPadding}>
                <TextBlock record={record} locale={locale} />
              </div>
            );
          case "article_video_block":
            return (
              <div className={blockPadding}>
                <div className="container lg:grid lg:grid-cols-12">
                  <div className="lg:col-start-2 lg:col-span-10">
                    <div className="aspect-video">
                      <ExternalVideo
                        record={record}
                        video={record.externalVideo}
                        locale={locale}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          case "attachments_block":
            return (
              <div className={blockPadding}>
                <AttachmentsBlock record={record} locale={locale} />
              </div>
            );
          case "banner_block":
            return (
              <div className={blockPadding}>
                <BannerBlock record={record} locale={locale} />
              </div>
            );
          case "card_image_block":
            return (
              <div className={blockPadding}>
                <CardImageBlock record={record} locale={locale} />
              </div>
            );
          case "gallery":
            return (
              <div className={blockPadding}>
                <Gallery record={record} locale={locale} />
              </div>
            );
          case "quote":
            return (
              <div className={blockPadding}>
                <Quote record={record} locale={locale} />
              </div>
            );
          default:
            return null;
        }
      }}
      customRules={[
        renderRule(isHeading, ({ node, children, key }) => {
          const Tag =
            (node.level === 1) | (node.level === 2) ? "h2" : "h" + node.level;
          const textSize = getTextSizeForHeading(node.level);
          return (
            <div
              key={key}
              id={`${convertToSlug(children[0].props.children[0])}`}
              className="container lg:grid lg:grid-cols-12 margin-scroll-standard"
            >
              <div className="lg:col-span-10 lg:col-start-2">
                <Tag className={textSize}>{children}</Tag>
              </div>
            </div>
          );
        }),
        renderRule(isParagraph, ({ children, key }) => {
          return (
            <div key={key} className="container lg:grid lg:grid-cols-12">
              <div className="lg:col-span-10 lg:col-start-2">
                <p className="max-w-prose text-base lg:text-lg">{children}</p>
              </div>
            </div>
          );
        }),
        renderRule(isList, ({ children, key, node }) => {
          return (
            <div key={key} className="container lg:grid lg:grid-cols-12">
              <div className="lg:col-span-10 lg:col-start-2">
                {node.style == "numbered" ? (
                  <ol className="">{children}</ol>
                ) : (
                  <ul className="">{children}</ul>
                )}
              </div>
            </div>
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
