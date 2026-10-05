import t from "lib/locales";
import * as dayjs from "dayjs";
import "dayjs/locale/it";
import { useRouter } from "next/router";
import allArticlesIt from "src/data/all_articles_it.json";
import allArticlesEn from "src/data/all_articles_en.json";

export function getStaticGrandParent(page) {
  switch (page.model) {
    case "job":
      return "about";
  }
}

export function getStaticParent(page) {
  switch (page.model || page.apiKey) {
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
    case "case_study":
      return "case_studies_index";
    case "lab_project":
      return "lab_index";
    case "job":
      return "jobs_index";
    case "article_tag":
      return "tag";
    case "company_service":
      return "company_services_index";
  }
}

export function getStaticSlug(model, locale) {
  const name = `slug_${model}`;
  return t(name, locale);
}

export function resolveLink(page, locale, slug = null) {
  let pageSlug = "";
  let staticParentPath = "";
  let staticGrandParentPath = "";
  let prefixPath = "";
  let staticParent = getStaticParent(page);
  let staticGrandParent = getStaticGrandParent(page);
  let language = locale === "it" ? "/" : "/" + locale + "/";
  const model = page.model;

  if (staticGrandParent) {
    staticGrandParentPath = `${getStaticSlug(staticGrandParent, locale)}/`;
  }

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

  return `/${language}${staticGrandParentPath}${staticParentPath}${prefixPath}${parentPath}${pageSlug}`
    .replace("//", "/")
    .replace(/(.)\/$/, "$1");
}

export function IsActive(item, locale) {
  const router = useRouter();
  // asPath never contains the locale prefix, while resolveLink output does.
  const path =
    `${locale === "it" ? "" : "/" + locale}${router.asPath}`.replace(/\/$/, "") ||
    "/";
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
  return <div dangerouslySetInnerHTML={{ __html: dirt }} />;
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
  const fmt = "DD MMMM YY";
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
  if (typeof label !== "string") return "-";
  if (label)
    return label
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .toLowerCase();
  else return "";
}

// Articles

function containsLocale(item, locale) {
  const exists = item.slugs.find((s) => s.locale === locale);
  return exists ? true : false;
}

export function getAllArticles(locale = "it") {
  return locale === "it"
    ? allArticlesIt.filter((i) => containsLocale(i, "it"))
    : allArticlesEn.filter((i) => containsLocale(i, "en"));
}

export function cleanFileName(input) {
  return input
    .replace(/\.[^/.]+$/, "") // Rimuove l'estensione del file
    .replace(/[_\-]+/g, " ") // Sostituisce _ o - con spazio
    .trim() // Rimuove spazi iniziali e finali
    .split(" ") // Divide in parole
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Title Case
    .join(" ");
}
