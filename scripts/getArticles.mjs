import fs from "fs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: ".env.local" }); //SE USATE direnv non serve specificare il path

const API_KEY = process.env.NEXT_PUBLIC_DATO_API_KEY;
const DATO_ENV = process.env.NEXT_PUBLIC_DATO_ENV;

async function fetchData(q, v = null, preview = false) {
  try {
    const response = await fetch(
      `https://graphql.datocms.com${preview ? "/preview" : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "X-Environment": `${DATO_ENV}`,
        },
        body: JSON.stringify({ query: q, variables: v }),
      }
    );
    const result = await response.json();
    if (result?.errors) {
      console.error("RESPONSE ERROR");
      throw result.errors;
    }
    return result?.data;
  } catch (error) {
    console.error("QUERY ERROR", v, q);
    console.error(Object.values(error));
    throw error;
  }
}

const LANGS = ["it", "en"];
const query = `query allArticlesQuery($locale: SiteLocale, $skip: IntType) {
  allArticles(
    fallbackLocales: it
    locale: $locale
    orderBy: date_DESC
    first: "100"
    filter: {slug: {neq: null}}
    skip: $skip
  ) {
    model: _modelApiKey
    id
    title
    slugs: _allSlugLocales {
      locale
      value
    }
    seo: _seoMetaTags {
      tag
      attributes
      content
    }
    previewLarge
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
      image {
        responsiveImage(
          sizes: "50px"
          imgixParams: {auto: [format, compress], fit: crop, h: 50, w: 50}
        ) {
          ...imgFrag
        }
      }
      email
      githubId
    }
    cover {
      filename
      responsiveImage(
        sizes: "(min-width:500px) 40vw, 60vw"
        imgixParams: {auto: [format, compress], fit: crop, ar: "10:11"}
      ) {
        ...imgFrag
      }
    }
    abstract(fallbackLocales: it, locale: $locale)
  }
}

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

async function allArticles(locale = "it") {
  console.info("Fetching all articles for locale", locale);
  const list = [];
  let skip = 0;
  let condition = true;
  while (condition) {
    const { allArticles } = await fetchData(query, { locale, skip });
    list.push(...allArticles);
    skip += 100;
    if (allArticles.length <= 0) {
      condition = false;
    }
  }
  console.info("Fetched", list.length, "articles");
  return list;
}

(async () => {
  const start = Date.now();
  console.info("DOWNLOADING ARTICLES");
  const it = await allArticles(LANGS[0]);
  const en = await allArticles(LANGS[1]);

  console.info("SAVE EVENTS TO JSON");
  fs.writeFileSync(
    `src/data/all_articles_${LANGS[0]}.json`,
    JSON.stringify(it, null, 2)
  );
  fs.writeFileSync(
    `src/data/all_articles_${LANGS[1]}.json`,
    JSON.stringify(en, null, 2)
  );

  //TODO write to file
  const elapsed = Date.now() - start;
  console.info("ELAPSED", elapsed / 1000, "seconds");
})();
