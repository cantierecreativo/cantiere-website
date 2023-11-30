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

const videoImage = `
  responsiveImage(sizes: "(min-width:1024px) 80vw, 100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "16:9"}){
    ...imgFrag
  }
`;

const workImage = `
  responsiveImage(sizes: "(min-width:1024px) 80vw, 100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "5:4"}){
    ...imgFrag
  }
`;

const squareImage = `
  responsiveImage(sizes: "(min-width:1024px) 40vw, 100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
    ...imgFrag
  }
`;

const standardImage = `
  responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], w: 1200, fit: max}){
    ...imgFrag
  }
`;

const coverImage = `
  responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], h: 800, w: 1920, fit: crop}){
    ...imgFrag
  }
`;

const logoImage = `
format
url
alt
title
responsiveImage(sizes: "280px", imgixParams: {auto: [format, compress], h: 125, w: 125, fit: max}){
    ...imgFrag
  }
`;

const standardPreview = `
  ${modelAndId}
  title
  abstract
  cover {
    ${standardImage}
  }
`;

const jobPreview = `
  ${modelAndId}
  title
  abstract
`;

const teamPreview = `
  id
  model: _modelApiKey
  name
  role
  active
  description
  email
  linkedinUrl
  image {
    ${squareImage}
  }
`;

const relatedElement = `
... on ArticleRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${standardImage}
  }
}
... on CaseStudyRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${standardImage}
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
  ${standardPreview}
}
... on TechnologiesIndexRecord {
  ${modelAndId}
  title
  abstract
  cover {
    ${standardImage}
  }
}
... on WorkRecord {
  ${modelAndId}
  title
  abstract
  subtitle
  cover: previewImage {
    ${standardImage}
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
  id
  model: _modelApiKey
  ${ExternalVideo}
  menuLabel
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
  cta
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
    ${standardImage}
  }
  labelMenu
  description
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
  labelMenu
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
  labelMenu
  image {
    ${previewImage}
  }
`;

const CardsBlock = `
  id
  model: _modelApiKey
  showNumbers
  labelMenu
  inLine
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
        format
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
  labelMenu
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
    slug
    model: _modelApiKey
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

const ImageDoubleBlock = `
  id
  model: _modelApiKey
  images {
    image {
      ${standardImage}
    }
    caption
  }
`;

const NumbersBlock = `
  id
  model: _modelApiKey
  title
  text
  labelMenu
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
  labelMenu
`;

const AttachmentsBlock = `
  id
  text
  title
  model: _modelApiKey
  attachments {
    file {
      url
      format
      size
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
      ${videoImage}
    }
  }
`;

const TextFormBlock = `
  model: _modelApiKey
  id
  title
  text
  labelMenu
`;

const Quote = `
  model: _modelApiKey
  id
  text
  author
  authorRole
`;

const ModularBlocksForCaseStudy = `
... on ArticleTextBlockRecord {
  ${TitleTextBlock}
}
... on ArticleImageBlockRecord {
  ${ImageBlock}
}
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
... on ImageDoubleBlockRecord {
  ${ImageDoubleBlock}
}
... on NumbersBlockRecord {
  ${NumbersBlock}
}
... on PartnerBlockRecord {
  ${PartnerBlock}
}
... on QuoteRecord {
  ${Quote}
}
... on TitleTextBlockRecord {
  ${TitleTextBlock}
}
... on VideoBlockRecord {
  ${VideoBlock}
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
... on ImageDoubleBlockRecord {
  ${ImageDoubleBlock}
}
... on NumbersBlockRecord {
  ${NumbersBlock}
}
... on PartnerBlockRecord {
  ${PartnerBlock}
}
... on QuoteRecord {
  ${Quote}
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
    ... on QuoteRecord {
      ${Quote}
    }
    ... on EmbedBlockRecord {
      model: _modelApiKey
      id
      src
      properties
      embedType
    }
  }
  links {
      __typename
      ... on AboutIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ArticleRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ArticleTagRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ArticlesIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on CaseStudiesIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on CaseStudyRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ContactsIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on HomepageRecord {
        apiKey: _modelApiKey
        id
        title
      }
      ... on JobRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on JobsIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on MethodRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on MethodsIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on PartnersIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ServiceRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on ServicesIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on SolutionRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on SolutionsIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on TeamIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on TechnologiesIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on TechnologyRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on WorkRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
      ... on WorksIndexRecord {
        apiKey: _modelApiKey
        id
        title
        slug
      }
    }
  value
}
`;

const ContactBlocks = `
... on ArticleTextBlockRecord {
  ${ArticleTextBlock}
}
... on BannerBlockRecord {
  ${BannerBlock}
}
... on CardImageBlockRecord {
  ${CardImageBlock}
}
... on TextFormBlockRecord {
  ${TextFormBlock}
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
    menuLabel
  }
  jobsIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  articlesIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  solutionsIndex (locale: $locale) {
    ${modelAndId}
    title
  }
  technologiesIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  caseStudiesIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  servicesIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  aboutIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
  }
  methodsIndex (locale: $locale) {
    ${modelAndId}
    title
    menuLabel
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
    abstract
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

export const getTechnologiesIndex = `
query technologiesIndex($locale: SiteLocale!) {
  technologiesIndex(locale: $locale) {
    ${forAllPages}
    text
    blocks: otherBlocks{
      ${BannerBlock}
    }
  }
  allTechnologies (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${standardPreview}
  }
}
${imgFrag}
`;

export const getMethodsIndex = `
query methodsIndex($locale: SiteLocale!) {
  methodsIndex(locale: $locale) {
    ${forAllPages}
    text
    blocks: mainBlocks{
      ${BannerBlock}
    }
  }
  allMethods (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${standardPreview}
  }
}
${imgFrag}
`;

export const getSolutionsIndex = `
query solutionsIndex($locale: SiteLocale!) {
  solutionsIndex(locale: $locale) {
    ${forAllPages}
    text
    blocks{
      ${BannerBlock}
    }
  }
  allSolutions (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${standardPreview}
  }
}
${imgFrag}
`;

export const getServicesIndex = `
query servicesIndex($locale: SiteLocale!) {
  servicesIndex(locale: $locale) {
    ${forAllPages}
    text
    blocks{
      ${BannerBlock}
    }
  }
  allServices (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${standardPreview}
  }
}
${imgFrag}
`;

export const getWorksIndex = `
query worksIndex($locale: SiteLocale!) {
  worksIndex(locale: $locale) {
    text
    ${forAllPages}
    blocks{
      ${BannerBlock}
    }
  }
}
${imgFrag}
`;

export const getTeamIndex = `
query teamIndex($locale: SiteLocale!) {
  teamIndex(locale: $locale) {
    text
    ${forAllPages}
    blocks{
      ${BannerBlock}
    }
  }
  allTeamMembers (locale: $locale, first: "100", filter: {active: {eq: "true"}}) {
    ${teamPreview}
  }
}
${imgFrag}
`;

export const getJobsIndex = `
query jobsIndex($locale: SiteLocale!) {
  jobsIndex(locale: $locale) {
    text
    menuLabel
    ${forAllPages}
    blocks{
      ${BannerBlock}
    }
  }
  allJobs (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${jobPreview}
  }
}
${imgFrag}
`;

export const getArticlesCount = `
query articlesCount($locale: SiteLocale!) {
  _allArticlesMeta(locale: $locale, filter: {slug: {neq: null}}) {
    count
  }
}`;

export const getWorksCount = `
query worksCount($locale: SiteLocale!) {
  _allWorksMeta(locale: $locale, filter: {slug: {neq: null}}) {
    count
  }
}`;

export const getArticlesIndex = `
query articlesIndex($locale: SiteLocale!) {
  articlesIndex(locale: $locale) {
    text
    ${forAllPages}
    blocks{
      ${BannerBlock}
    }
  }
  allArticles (locale: $locale, first: "100", orderBy: date_DESC, filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${previewArticle}
  }
}
${imgFrag}
`;

export const getAllArticlesPaged = `
query allArticles($locale: SiteLocale!, $offset: IntType, $first: IntType = "100") {
  allArticles(locale: $locale, first: $first, skip : $offset, orderBy: date_DESC, filter: {slug: {neq: null}}) {
    ${forAllPages}
    ${previewArticle}
  }
}
`;

export const getAllWorksPaged = `
query allWorks($locale: SiteLocale!, $offset: IntType, $first: IntType = "100") {
  allWorks(locale: $locale, first: $first, skip : $offset, filter: {slug: {neq: null}}) {
    ${forAllPages}
    subtitle
    oneColumn
    ${modelAndId}
    title
    abstract
    previewImage {
      ${standardImage}
    }
  }
}
${imgFrag}
`;

export const getCaseStudiesIndex = `
query caseStudiesIndex($locale: SiteLocale!) {
  caseStudiesIndex(locale: $locale) {
    ${forAllPages}
    text
    blocks{
      ${BannerBlock}
    }
  }
  allCaseStudies (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    abstract
    oneColumn
    ${forAllPages}
    ${standardPreview}
  }
}
${imgFrag}
`;

export const getContactPage = `
query contactsIndex($locale: SiteLocale!) {
  contactsIndex(locale: $locale) {
    ${forAllPages}
    abstract
    blocks{
      ${ContactBlocks}
    }
  }
  allSolutions(filter: {slug: {neq: null}}, locale: $locale){
    ${modelAndId}
    title
    menuLabel
    slug
  }
}
${imgFrag}
`;

export const getAllArticleTags = `
query allArticleTags ($locale: SiteLocale!){
  allArticleTags (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
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

export const getAllSlugsCaseStudies = `
query allCaseStudies ($locale: SiteLocale!){
  allCaseStudies (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
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
    alts: _allSlugLocales {
      locale
      value
    }
    ${EditorialTemplate}
    date
    tags {
      id
      title
      slug
      model: _modelApiKey
    }
    author {
      id
      name
    }
    abstract
    cover {
      ${standardImage}
    }
  }
}
${imgFrag}
`;

export const getAllSlugsJobs = `
query allJobs ($locale: SiteLocale!){
  allJobs (locale: $locale, first: "100", filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getJob = `
query job($slug: String!, $locale: SiteLocale!){
  job(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    ${EditorialTemplate}
    abstract
  }
}
${imgFrag}
`;

export const getAllLandingSlugs = `
query allLandingPages ($locale: SiteLocale!){
  allLandingPages (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getLandingPage = `
query landingPage($slug: String!, $locale: SiteLocale!){
  landingPage(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    subtitle
    abstract
    blocks {
      ${ModularBlocks}
    }
  }
}
${imgFrag}
`;

export const getAllSolutionsSlugs = `
query allSolutions ($locale: SiteLocale!){
  allSolutions (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getSolution = `
query solution($slug: String!, $locale: SiteLocale!){
  solution(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    subtitle
    abstract
    blocks {
      ${ModularBlocks}
    }
  }
}
${imgFrag}
`;

export const getAllTechnologiesSlugs = `
query allTechnologies ($locale: SiteLocale!){
  allTechnologies (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getTechnology = `
query technology($slug: String!, $locale: SiteLocale!){
  technology(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    abstract
    blocks: mainBlocks {
      ${ModularBlocks}
      ... on ImageBlockRecord {
        ${ImageBlock}
      }
    }
  }
}
${imgFrag}
`;

export const getAllMethodsSlugs = `
query allMethods ($locale: SiteLocale!){
  allMethods (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getMethod = `
query method($slug: String!, $locale: SiteLocale!){
  method(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    abstract
    blocks: mainBlocks {
      ${ModularBlocks}
      ... on ImageBlockRecord {
        ${ImageBlock}
      }
    }
  }
}
${imgFrag}
`;

export const getAllServicesSlugs = `
query allServices ($locale: SiteLocale!){
  allServices (locale: $locale, first: 100, filter: {slug: {neq: null}}) {
    slug
  }
}
`;

export const getService = `
query service($slug: String!, $locale: SiteLocale!){
  service(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    abstract
    blocks: mainBlocks {
      ${ModularBlocks}
    }
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
    urlWebsite
    abstract
    subtitle
    cover {
      ${workImage}
    }
    teamMembers {
      id
      name
    }
    blocks {
      ${ModularBlocks}
      ... on ImageBlockRecord {
        ${ImageBlock}
      }
      ... on HeaderBlockRecord {
        id
        model: _modelApiKey
        text
        title
      }
    }
  }
}
${imgFrag}
`;

export const getAboutIndex = `
query aboutIndex($locale: SiteLocale!){
  aboutIndex(locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    menuLabel
    abstract
    blocks {
      ${ModularBlocks}
    }
  }
}
${imgFrag}
`;

export const getPartnersIndex = `
query partnersIndex($locale: SiteLocale!){
  partnersIndex(locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    abstract
    subtitle
    blocks {
      ${ModularBlocks}
    }
  }
}
${imgFrag}
`;

export const getCaseStudy = `
query caseStudy($slug: String!, $locale: SiteLocale!){
  caseStudy(filter: {slug: {eq: $slug}}, locale: $locale) {
    ${forAllPages}
    alts: _allSlugLocales {
      locale
      value
    }
    abstract
    blocks {
      ${ModularBlocksForCaseStudy}
    }
  }
}
${imgFrag}
`;

export const getArticleByTag = `
query allArticles($id: [ItemId], $locale: SiteLocale!){
  allArticles(filter: {tags: {anyIn: $id}, slug: {neq: null}}, locale: $locale, first: "100") {
    ${forAllPages}
    ${previewArticle}
  }
}
`;
