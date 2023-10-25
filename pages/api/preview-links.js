import { resolveLink } from "lib/utils";

function generatePreviewUrl({ item, itemType, locale }) {
  console.info("locale", locale);
  if (!item?.attributes) return null;

  const apiKey = itemType.attributes.api_key || null;
  console.info("apiKey", apiKey);

  const slug = item.attributes.slug || null;
  const slugLocale = slug ? (locale ? slug[locale] : slug["it"]) : null;
  console.info("slug", slugLocale);

  const record = { slug: slugLocale, apiKey };
  const link =
    apiKey === "homepage" ? "/" : resolveLink(record, locale, slugLocale);
  console.info("link", link);
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
