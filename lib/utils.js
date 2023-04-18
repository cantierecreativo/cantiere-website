import t from "lib/locales";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import * as dayjs from "dayjs";
import "dayjs/locale/it";
import { useRouter } from "next/router";

export function getStaticParent(page) {
  switch (page.model) {
    case "jobs_index":
    case "team_index":
      return "about";
    case "work":
      return "portfolio";
    case "article":
      return "blog";
    case "service":
      return "services_index";
    case "solution":
      return "solutions_index";
    case "technology":
      return "technologies_index";
    case "method":
      return "methods_index";
    case "article_tag":
      return "tag";
  }
}

export function getStaticSlug(model, locale) {
  const name = `slug_${model}`;
  return t(name, locale);
}

export function resolveLink(page, locale, slug = null) {
  let pageSlug = "";
  let staticParentPath = "";
  let prefixPath = "";
  let staticParent = getStaticParent(page);
  let language = locale === "it" ? "/" : "/" + locale + "/";
  const model = page.model;

  if (staticParent) {
    staticParentPath = `${getStaticSlug(staticParent, locale)}/`;
  }

  if (model?.includes("category")) {
    prefixPath = "c/";
  }

  if (page.model !== "homepage") {
    pageSlug = slug
      ? slug
      : page.slug
      ? page.slug
      : getStaticSlug(page.model, locale);
  }

  const parentPath =
    page.parent && page.parent.slug ? `/${page.parent.slug}` : "";

  // return `${pageSlug}`;
  return `/${language}${staticParentPath}${prefixPath}${parentPath}${pageSlug}`.replace(
    "//",
    "/"
  );
}

export function IsActive(item, locale) {
  const router = useRouter();
  let path = Object(router.asPath);
  if (item.link) {
    const model = item.link.model;
    let link = resolveLink(item.link, locale, item.link.slug);
    if (model === "homepage") {
      if ((path == "/") | (path == "/en")) {
        return true;
      }
    } else if (path.indexOf(link) > -1) {
      return true;
    } else false;
  } else if (path.indexOf(item.slug) > -1) {
    return true;
  }
}

export function renderHTML(dirt) {
  // return <div>dangerouslySetInnerHTML={{ __html: dirt }}</div>
  const clean = DOMPurify.sanitize(dirt, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });
  return parse(clean);
}

export function showCategories(category) {
  let categoryTitle;
  if (category) {
    if (Array.isArray(category)) {
      categoryTitle = category
        .map((cat) => {
          return cat.title;
        })
        .join(", ");
    } else {
      categoryTitle = category.title;
    }
  }
  return categoryTitle;
}

export function formatDate(str, locale) {
  const fmt = "DD.MM.YY";
  return dayjs(str).locale(locale).format(fmt);
}

// Show common array from 2 objects by ID
export function getCommon(array1, array2) {
  return array1.filter((object1) => {
    return array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
}

export function convertToSlug(label) {
  if (label)
    return label
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
}
