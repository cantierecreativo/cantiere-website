import { resolveLink } from "lib/utils";

async function generatePreviewUrl({ item, itemType, locale }) {
  console.log("getItem:", item.attributes);
  console.log("getlocale:", locale);
  //  console.log("getItem.slug:", item.attributes.slug[locale]);
  if (!item?.attributes) return null;

  const apiKey = itemType.attributes.api_key || null;
  const slug = item.attributes.slug || null;
  const slugLocale = slug ? (locale ? slug[locale] : slug["it"]) : null;
  // let record = { slug: slugLocale, apiKey };
  const link =
    apiKey === "homepage"
      ? "/"
      : resolveLink(item.attributes, locale, item.attributes.slug);
  return link;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  const url = await generatePreviewUrl(req.body);
  if (!url) {
    return res.status(200).json({ previewLinks: [] });
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const previewLinks = [
    {
      label: "Published version",
      url: `${baseUrl}${url}`,
    },
    {
      label: "Draft version",
      url: `${baseUrl}/api/preview?redirect=${url}`,
    },
  ];
  return res.status(200).json({ previewLinks });
}
