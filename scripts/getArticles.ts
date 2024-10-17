import fetchData from "lib/dato";
import fs from "fs";

const LANGS = ["it", "en"];
const query = `query allArticlesQuery($locale: SiteLocale!, $skip: IntType) {
  allEvents(locale: $locale, first: "100", skip: $skip, orderBy: endDate_DESC) {
    id
    title
    slug
    position
    apiKey: _modelApiKey
    __typename
    seo: _seoMetaTags {
      ...seoMetaFragment
    }
    titles: _allTitleLocales {
      locale
      value
    }
    slugs: _allSlugLocales {
      locale
      value
    }
    abstract
    artworksCollections {
      ...artworkCollectionsFragment
    }
    project {
      title
      apiKey: _modelApiKey
      slug
      id
      logo
    }
    museums {
      ...museumFragment
    }
    projectLocations {
      title
      apiKey: _modelApiKey
      id
      slug
      project {
        id
        slug
      }
    }
    featured
    startDate
    endDate
    endExtensionDate
    onlineEvent
    category {
      title
      slug
      position
      id
    }
    descriptiveTags {
      id
      title
      slug
    }
    coverImage {
      responsiveImage(
        imgixParams: {auto: [format, compress],  h: 400, w: 1920, fit: crop, cs: srgb}
      ) {
        ...imgFragment
      }
    }
    previewImage {
      id
      title
      responsiveImage(
        sizes: "(min-width:768px) 50vw, 100vw, 780px"
          imgixParams: { auto: [format, compress], fit: crop, h: 926, w: 780, cs: srgb }
      ) {
        ...imgFragment
      }
    }
  }
}

fragment seoMetaFragment on Tag {
  attributes
  content
  tag
}

fragment imgFragment on ResponsiveImage {
  src
  srcSet
  base64
  width
  height
  alt
  title
}

fragment museumFragment on MuseumRecord {
  apiKey: _modelApiKey
  __typename
  titles: _allTitleLocales {
    locale
    value
  }
  slugs: _allSlugLocales {
    locale
    value
  }
  title
  slug
  id
  colorCode
  abstract
  logo
  coverImage {
    responsiveImage(
      sizes: "100vw, 1920px"
      imgixParams: {
        auto: [format, compress]
        h: "800"
        w: "1920"
        fit: crop
        cs: srgb
      }
    ) {
      ...imgFragment
    }
  }
}

fragment artworkCollectionsFragment on ArtworkCollectionRecord {
  apiKey: _modelApiKey
  __typename
  id
  abstract
  title
  text
  slug
  museum {
    ...museumFragment
  }
  previewImage {
    id
    url
    responsiveImage(
      sizes: "(min-width:768px) 33vw, 100vw, 400px"
      imgixParams: {auto: [format, compress], fit: crop, h: 926, w: 780, cs: srgb}
    ) {
      ...imgFragment
    }
  }
}
`;

async function getAllEvents(locale: string = "it") {
  console.info("Fetching all events for locale", locale);
  const list = [];
  let skip = 0;
  let condition = true;
  while (condition) {
    const { allEvents } = await fetchData(query, { locale, skip });
    list.push(...allEvents);
    skip += 100;
    if (allEvents.length <= 0) {
      condition = false;
    }
  }
  console.info("Fetched", list.length, "events");
  return list;
}

(async () => {
  const start = Date.now();
  console.info("DOWNLOADING EVENTS");
  const it = await getAllEvents(LANGS[0]);
  const en = await getAllEvents(LANGS[1]);

  console.info("SAVE EVENTS TO JSON");
  fs.writeFileSync(`src/data/all_events_${LANGS[0]}.json`, JSON.stringify(it, null, 2));
  fs.writeFileSync(`src/data/all_events_${LANGS[1]}.json`, JSON.stringify(en, null, 2));

  //TODO write to file
  const elapsed = Date.now() - start;
  console.info("ELAPSED", elapsed / 1000, "seconds");
})();
