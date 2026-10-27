import { parts } from "../src/parts.jsx";

// Ogni blocco è un file JS a sé: la pagina scarica solo quelli che usa (vedi src/parts.jsx).
export const blocks = parts({
  ImageBlock: () => import("components/blocks/ImageBlock"),
  VideoBlock: () => import("components/blocks/VideoBlock"),
  PartnerBlock: () => import("components/blocks/PartnerBlock"),
  RowsIconTextBlock: () => import("components/blocks/RowsIconTextBlock"),
  DoubleCtaBlock: () => import("components/blocks/DoubleCtaBlock"),
  BannerBlock: () => import("components/blocks/BannerBlock"),
  CardsBlock: () => import("components/blocks/CardsBlock"),
  CardImageBlock: () => import("components/blocks/CardImageBlock"),
  ArticleLinkBlock: () => import("components/blocks/ArticleLinkBlock"),
  TitleTextBlock: () => import("components/blocks/TitleTextBlock"),
  ImageDoubleBlock: () => import("components/blocks/ImageDoubleBlock"),
  NumbersBlock: () => import("components/blocks/NumbersBlock"),
  TextForm: () => import("components/blocks/TextForm"),
  Quote: () => import("components/blocks/Quote"),
  CarouselQuote: () => import("components/blocks/CarouselQuote"),
  FAQBlock: () => import("./blocks/FAQBlock"),
});

const BLOCKS = {
  image_block: "ImageBlock",
  article_image_block: "ImageBlock",
  video_block: "VideoBlock",
  partner_block: "PartnerBlock",
  double_cta_block: "DoubleCtaBlock",
  banner_block: "BannerBlock",
  cards_block: "CardsBlock",
  card_image_block: "CardImageBlock",
  article_link_block: "ArticleLinkBlock",
  text_block: "TitleTextBlock",
  article_text_block: "TitleTextBlock",
  header_block: "TitleTextBlock",
  title_text_block: "TitleTextBlock",
  image_double_block: "ImageDoubleBlock",
  numbers_block: "NumbersBlock",
  text_form_block: "TextForm",
  quote: "Quote",
  rows_icon_text_block: "RowsIconTextBlock",
  carousel_quote: "CarouselQuote",
  block_faq: "FAQBlock",
};

export default function PostContent({
  record,
  locale,
  page = null,
  solutions = null,
  textColor = "black",
}) {
  const name = BLOCKS[record.model];
  if (!name) return null;
  // Ogni blocco riceve gli stessi props che aveva prima: quelli in più li ignora.
  return (
    <blocks.Part
      name={name}
      record={record}
      locale={locale}
      page={page}
      solutions={solutions}
      color={textColor}
    />
  );
}
