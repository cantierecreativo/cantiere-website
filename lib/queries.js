const modelAndId = `
  id
  model: _modelApiKey
  slug
`;

const linkMenu = `
... on AboutIndexRecord {
  ${modelAndId}
  title
}
... on ArticleRecord {
  ${modelAndId}
  title
}
... on ArticleTagRecord {
  ${modelAndId}
  title
}
... on ArticlesIndexRecord {
  ${modelAndId}
  title
}
... on CaseStudiesIndexRecord {
  ${modelAndId}
  title
}
... on CaseStudyRecord {
  ${modelAndId}
  title
}
... on ContactsIndexRecord {
  ${modelAndId}
  title
}
... on HomepageRecord {
  id
  model: _modelApiKey
  title
}
... on JobRecord {
  ${modelAndId}
  title
}
... on JobsIndexRecord {
  ${modelAndId}
  title
}
... on MethodRecord {
  ${modelAndId}
  title
}
... on MethodRecord {
  ${modelAndId}
  title
}
... on MethodsIndexRecord {
  ${modelAndId}
  title
}
... on PartnersIndexRecord {
  ${modelAndId}
  title
}
... on ServiceRecord {
  ${modelAndId}
  title
}
... on ServicesIndexRecord {
  ${modelAndId}
  title
}
... on SolutionRecord {
  ${modelAndId}
  title
}
... on SolutionsIndexRecord {
  ${modelAndId}
  title
}
... on TeamIndexRecord {
  ${modelAndId}
  title
}
... on TechnologiesIndexRecord {
  ${modelAndId}
  title
}
... on TechnologyRecord {
  ${modelAndId}
  title
}
... on WorkRecord {
  ${modelAndId}
  title
}
... on WorksIndexRecord {
  ${modelAndId}
  title
}

`;

const allLinks = `
  ${linkMenu}
`;

const imgFrag = `
  fragment imgFrag on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    webpSrcSet
    width
    alt
    title
  }
`;

const bannerImage = `
  responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "5:2"}){
    ...imgFrag
  }
`;

const homeImage = `
  responsiveImage(sizes: "(min-width:1024px) 40vw, 50vw", imgixParams: {auto: [format, compress], fit: crop, ar: "5:7"}){
    ...imgFrag
  }
`;

const previewCard = `
  responsiveImage(sizes: "(min-width:500px) 40vw, 60vw", imgixParams: {auto: [format, compress], fit: crop, ar: "2:1"}){
    ...imgFrag
  }
`;

const previewImage = `
  responsiveImage(sizes: "(min-width:500px) 40vw, 60vw", imgixParams: {auto: [format, compress], fit: crop, ar: "10:11"}){
    ...imgFrag
  }
`;

const squareImage = `
  responsiveImage(sizes: "(min-width:1024px) 40vw, 100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
    ...imgFrag
  }
`;

const standardImage = `
  responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], h: 500, fit: max}){
    ...imgFrag
  }
`;

const coverImage = `
  responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], h: 800, w: 1920, fit: crop}){
    ...imgFrag
  }
`;

const logoImage = `
responsiveImage(sizes: "280px", imgixParams: {auto: [format, compress], h: 125, w: 125, fit: max}){
    ...imgFrag
  }
`;

const relatedElement = `
... on ArticleRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
... on CaseStudyRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
... on JobsIndexRecord {
  ${modelAndId}
  title
  abstract
}
... on MethodsIndexRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
... on PartnersIndexRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
... on ServiceRecord {
  ${modelAndId}
  title
  abstract
}
... on SolutionRecord {
  ${modelAndId}
  title
  abstract
}
... on TechnologiesIndexRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
... on WorkRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${previewCard}
  }
}
`;

const ExternalVideo = `
  externalVideo {
    url
    height
    width
    title
    provider
    providerUid
    thumbnailUrl
  }
`;

const VideoBlock = `
  ${ExternalVideo}
  internalVideo {
    height
    width
    title
    url
    video {
      mp4Url
      thumbnailUrl
      streamingUrl
    }
  }
`;

const seoBlock = `
tag
attributes
content
`;

const internalLink = `
  id
  model: _modelApiKey
  label
  relatedElement {
    ${allLinks}
  }
  linkContactForm
`;

const externalLink = `
  id
  model: _modelApiKey
  label
  url
`;

const ImageBlock = `
  id
  model: _modelApiKey
  image {
    responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 450px", imgixParams: {auto: [format, compress], fit: crop, ar: "16:9"}){
      ...imgFrag
    }
  }
`;

const MenuItem = `
  id
  model: _modelApiKey
  label
  link {
    ${linkMenu}
  }
  hide
`;

const Menu = `
  id
  model: _modelApiKey
  menuFirstLevels {
    ... on MenuItemRecord {
      ${MenuItem}
    }
    ... on MenuGroupRecord {
      id
      mainLabel
      menuItems {
        ... on MenuItemRecord {
          ${MenuItem}
        }
        ... on MenuGroupRecord {
          id
          mainLabel
            menuItems {
              ... on MenuItemRecord {
                ${MenuItem}
              }
              ... on MenuGroupRecord {
                id
                mainLabel
              }
            }
          }
        }
      }
    }
`;

const ArticleTextBlock = `
  id
  model: _modelApiKey
  title
  text
`;

const BannerBlock = `
  id
  model: _modelApiKey
  link {
    ... on ExternalLinkRecord {
      ${externalLink}
    }
    ... on InternalLinkRecord {
      ${internalLink}
    }
  }
  prefix
  text
  title
  image {
    ${squareImage}
  }
`;

const CardsBlock = `
  id
  model: _modelApiKey
  layout
  orientation
  cards {
    ... on CardRecord {
      id
      model: _modelApiKey
      title
      text
      link {
        ${internalLink}
      }
    }
    ... on CardTextImageRecord {
      id
      model: _modelApiKey
      title
      text
      image {
        responsiveImage(sizes: "(min-width:1024px) 30vw, 90vw", imgixParams: {auto: [format, compress], fit: crop, ar: "7:6"}){
          ...imgFrag
        }
      }
    }
  }
`;

const CardImageBlock = `
  id
  model: _modelApiKey
  text
  title
  related {
    ${relatedElement}
  }
`;

const DoubleCtaBlock = `
  id
  model: _modelApiKey
  links {
    id
    model: _modelApiKey
    title
    text
    link {
      ${internalLink}
    }
  }
`;

const PartnerBlock = `
  id
  model: _modelApiKey
  partners {
    id
    model: _modelApiKey
    image {
      ${logoImage}
    }
    text
    linkLabel
    link
  }

`;

const forAllPages = `
  model: _modelApiKey
  id
  title
  seo: _seoMetaTags {
    ${seoBlock}
  }
`;

const previewProject = `
  id
  title
  model: _modelApiKey
  slug
  subtitle
  abstract
  previewImage {
    ${previewImage}
  }
`;

const previewArticle = `
  id
  title
  model: _modelApiKey
  slug
  date
  tags {
    id
    title
  }
  author {
    id
    name
  }
`;

const ArticleLinkBlock = `
  id
  model: _modelApiKey
  title
  abstract
  element {
    ${internalLink}
  }
  image {
    ${standardImage}
  }
`;

const HeaderBlock = `
  id
  model: _modelApiKey
  linkUrl
  text
  title
`;

const ImageDoubleBlock = `
  id
  model: _modelApiKey
  images {
    image {
      ${previewImage}
    }
    caption
  }
`;

const NumbersBlock = `
  id
  model: _modelApiKey
  title
  text
  numbers {
    number
    id
    description
  }
`;

const TextBlock = `
  id
  text
  title
  model: _modelApiKey
`;

const TitleTextBlock = `
  id
  text
  title
  model: _modelApiKey
`;

const AttachmentsBlock = `
  id
  text
  title
  model: _modelApiKey
  attachments {
    file {
      url
    }
    id
    title
  }
`;

const Gallery = `
  model: _modelApiKey
  id
  images {
    id
    caption
    image {
      ${standardImage}
    }
  }
`;

const ModularBlocks = `
... on BannerBlockRecord {
  ${BannerBlock}
}
... on CardImageBlockRecord {
  ${CardImageBlock}
}
... on CardsBlockRecord {
  ${CardsBlock}
}
... on DoubleCtaBlockRecord {
  ${DoubleCtaBlock}
}
... on HeaderBlockRecord {
  ${HeaderBlock}
}
... on ImageBlockRecord {
  ${ImageBlock}
}
... on ImageDoubleBlockRecord {
  ${ImageDoubleBlock}
}
... on NumbersBlockRecord {
  ${NumbersBlock}
}
... on PartnerBlockRecord {
  ${PartnerBlock}
}
... on PartnerRecord {
  id
}
... on SpacingBlockRecord {
  id
  model: _modelApiKey
}
... on TextBlockRecord {
  ${TextBlock}
}
... on TitleTextBlockRecord {
  ${TitleTextBlock}
}
... on VideoBlockRecord {
  ${VideoBlock}
}
`;

const EditorialTemplate = `
body: structuredTextContent {
  blocks {
    ... on ArticleImageBlockRecord {
      ${ImageBlock}
    }
    ... on ArticleLinkBlockRecord {
      ${ArticleLinkBlock}
    }
    ... on ArticleTextBlockRecord {
      ${ArticleTextBlock}
    }
    ... on ArticleVideoBlockRecord {
      ${ExternalVideo}
      id
      model: _modelApiKey
    }
    ... on AttachmentsBlockRecord {
      ${AttachmentsBlock}
    }
    ... on BannerBlockRecord {
      ${BannerBlock}
    }
    ... on CardImageBlockRecord {
      ${CardImageBlock}
    }
    ... on GalleryRecord {
      ${Gallery}
    }
  }
  links
  value
}
`;

export const site = `
query site($locale: SiteLocale!) {
  site: _site(locale: $locale) {
    favicon: faviconMetaTags {
      tag
      content
      attributes
    }
  }
  menu (locale: $locale) {
    ${Menu}
  }
  worksIndex (locale: $locale) {
    ${modelAndId}
    title
  }
  articlesIndex (locale: $locale) {
    ${modelAndId}
    title
  }
  allSolutions(filter: {slug: {neq: null}}, locale: $locale){
    ${modelAndId}
    title
    menuLabel
  }
  allServices(filter: {slug: {neq: null}}, locale: $locale){
    ${modelAndId}
    title
    menuLabel
  }
  allTechnologies(filter: {slug: {neq: null}}, locale: $locale){
    ${modelAndId}
    title
    menuLabel
  }
  allMethods(filter: {slug: {neq: null}}, locale: $locale){
    ${modelAndId}
    title
    menuLabel
  }
}
`;

export const getHomepage = `
query homepage($locale: SiteLocale!) {
  homepage(locale: $locale) {
    ${forAllPages}
    image {
      ${homeImage}
    }
    mainBlocks {
      ... on ArticleTextBlockRecord {
        ${ArticleTextBlock}
      }
      ... on BannerBlockRecord {
        ${BannerBlock}
      }
      ... on CardsBlockRecord {
        ${CardsBlock}
      }
      ... on DoubleCtaBlockRecord {
        ${DoubleCtaBlock}
      }
      ... on PartnerBlockRecord {
        ${PartnerBlock}
      }
    }
    orangeBlocks {
      ... on ArticleLinkBlockRecord {
        ${ArticleLinkBlock}
      }
      ... on CardsBlockRecord {
        ${CardsBlock}
      }
    }
    blueBlocks {
      ... on ArticleTextBlockRecord {
        ${ArticleTextBlock}
      }
      ... on CardImageBlockRecord {
        ${CardImageBlock}
      }
    }
    titleProject
    textProject
    projects {
      ${previewProject}
    }
    titleAbout
    textAbout
    linkAbout {
      ${internalLink}
    }
    imageAbout {
      ${standardImage}
    }
    highlightProject {
      ${previewProject}
    }
    blocksFooter {
      ${BannerBlock}
    }
  }
  lastNews: allArticles (locale: $locale, first: "3", filter: {slug: {neq: null}}) {
    ${previewArticle}
  }
}
${imgFrag}
`;

export const getContactPage = `
query contactsIndex($locale: SiteLocale!) {
  contactsIndex(locale: $locale) {
    ${forAllPages}
  }
}
`;

export const getSolutionsIndex = `
query solutionsIndex($locale: SiteLocale!) {
  solutionsIndex(locale: $locale) {
    ${forAllPages}
    text
  }
  allSolutions (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
  }
}
`;

export const getArticlesIndex = `
query articlesIndex($locale: SiteLocale!) {
  articlesIndex(locale: $locale) {
    ${forAllPages}
  }
}
`;

export const getAllArticleTags = `
query allArticleTags ($locale: SiteLocale!){
  allArticleTags (locale: $locale, filter: {slug: {neq: null}}) {
    slug
    id
    title
    model: _modelApiKey
  }
}
`;

export const getArticleTag = `
query articleTag($slug: String!, $locale: SiteLocale!){
  articleTag(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
  }
}
`;

export const getAllSlugsWorks = `
query allWorks ($locale: SiteLocale!){
  allWorks (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getAllSlugsPages = `
query allPages ($locale: SiteLocale!){
  allPages (locale: $locale, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getAllSlugsArticles = `
query allArticles ($locale: SiteLocale!){
  allArticles (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getNews = `
query article($slug: String!, $locale: SiteLocale!){
  article(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    tags {
      title
      id
    }
    alts: _allSlugLocales {
      locale
      value
    }
    ${EditorialTemplate}
  }
}
${imgFrag}
`;

export const getWork = `
query work($slug: String!, $locale: SiteLocale!){
  work(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    blocks {
      ${ModularBlocks}
    }
  }
}
${imgFrag}
`;

export const getArticleByTag = `
query allArticles($id: [ItemId], $locale: SiteLocale!){
  allArticles(filter: {tags: {anyIn: $id}, slug: {neq: null}}, locale: $locale, first: "100") {
    ${forAllPages}
    slug
  }
}
`;
