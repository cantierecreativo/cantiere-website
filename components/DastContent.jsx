import React from "react";
import { StructuredText } from "react-datocms";
import {
  renderRule,
  isHeading,
  isThematicBreak,
  isList,
  isListItem,
  isBlockquote,
  isCode,
  isParagraph,
} from "datocms-structured-text-utils";

import WorkCard from "./cards/WorkCard";
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
import EmbedBlock from "./blocks/EmbedBlock";

export default function DastContent({ content, locale, page }) {
  const getTextSizeForHeading = (nodeLevel) => {
    switch (nodeLevel) {
      case 1:
      case 2:
        return "text-3xl max-w-prose pt-4 lg:pt-8 xl:text-5xl font-bold";
      case 3:
        return "text-2xl max-w-prose pt-2 lg:pt-4 xl:text-3xl font-bold";
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
          case "embed_block":
            return (
              <div className={blockPadding}>
                <EmbedBlock record={record} locale={locale} />
              </div>
            );
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
                <div className="px-6 md:px-10 lg:container lg:grid lg:grid-cols-12 xl:px-0">
                  <WorkCard
                    record={record}
                    locale={locale}
                    fromStructuredText
                  />
                </div>
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
        renderRule(isParagraph, ({ children, key, ancestors }) => {
          {
            if (
              ancestors[0].type === "listItem" &&
              ancestors[0].children.length === 1
            ) {
              return <React.Fragment key={key}>{children}</React.Fragment>;
            }
          }

          return (
            <div key={key} className="container lg:grid lg:grid-cols-12">
              <div className="lg:col-span-10 lg:col-start-2">
                <p className="max-w-prose text-base lg:text-lg">{children}</p>
              </div>
            </div>
          );
        }),
        renderRule(isCode, ({ key, node }) => {
          return (
            <div key={key} className="container lg:grid lg:grid-cols-12">
              <div className="lg:col-span-10 lg:col-start-2">
                <div className="px-8 bg-black text-white py-8 overflow-x-auto max-w-[calc(100vw-1.5rem)]">
                  <pre className="">{node.code}</pre>
                </div>
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
        renderRule(isListItem, ({ children, key }) => {
          return (
            <li key={key} className="max-w-prose">
              {children}
            </li>
          );
        }),
      ]}
      renderLinkToRecord={({ record, children }) => {
        return (
          <InternalLink element={record} label={record.title} locale={locale}>
            <span className="underline underline-offset-4 underline-blue">
              {children}
            </span>
          </InternalLink>
        );
      }}
      renderLink={({ record, children }) => {
        return "CIAOOOOO";
        return (
          <InternalLink element={record} label={record.title} locale={locale}>
            <span className="underline underline-offset-4 underline-blue">
              {children}
            </span>
          </InternalLink>
        );
      }}
    />
  );
}
