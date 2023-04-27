import ImageBlock from "components/blocks/ImageBlock";
import VideoBlock from "components/blocks/VideoBlock";
import PartnerBlock from "components/blocks/PartnerBlock";
import TextBlock from "components/blocks/TextBlock";
import DoubleCtaBlock from "components/blocks/DoubleCtaBlock";
import BannerBlock from "components/blocks/BannerBlock";
import CardsBlock from "components/blocks/CardsBlock";
import CardImageBlock from "components/blocks/CardImageBlock";
import ArticleLinkBlock from "components/blocks/ArticleLinkBlock";
import TitleTextBlock from "components/blocks/TitleTextBlock";
import ImageDoubleBlock from "components/blocks/ImageDoubleBlock";
import NumbersBlock from "components/blocks/NumbersBlock";
import TextForm from "components/blocks/TextForm";
import Quote from "components/blocks/Quote";

export default function PostContent({
  record,
  locale,
  page = null,
  services = null,
}) {
  // return <div>{record.model}</div>;
  switch (record.model) {
    case "image_block":
    case "article_image_block":
      return <ImageBlock record={record} locale={locale} />;
    case "video_block":
      return <VideoBlock record={record} locale={locale} />;
    case "partner_block":
      return <PartnerBlock record={record} locale={locale} />;
    case "double_cta_block":
      return <DoubleCtaBlock record={record} locale={locale} />;
    case "banner_block":
      return <BannerBlock record={record} locale={locale} />;
    case "cards_block":
      return <CardsBlock record={record} locale={locale} page={page} />;
    case "card_image_block":
      return <CardImageBlock record={record} locale={locale} page={page} />;
    case "article_link_block":
      return <ArticleLinkBlock record={record} locale={locale} page={page} />;
    case "video_block":
      return <VideoBlock record={record} locale={locale} />;
    case "text_block":
      return <TextBlock record={record} locale={locale} />;
    case "article_text_block":
    case "header_block":
    case "title_text_block":
      return <TitleTextBlock record={record} locale={locale} />;
    case "image_double_block":
      return <ImageDoubleBlock record={record} locale={locale} />;
    case "numbers_block":
      return <NumbersBlock record={record} locale={locale} />;
    case "text_form_block":
      return <TextForm record={record} locale={locale} services={services} />;
    case "quote":
      return <Quote record={record} locale={locale} services={services} />;
  }
}
