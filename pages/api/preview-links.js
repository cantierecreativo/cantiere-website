import { resolveLink } from "lib/utils";

async function generatePreviewUrl({ item, itemType, locale }) {
  if (!item?.attributes) return null;
  const apiKey = itemType.attributes.api_key || null;
  const slug = item.attributes.slug || null;
  const slugLocale = slug ? (locale ? slug[locale] : slug["it"]) : null;
  let record = { slug: slugLocale, apiKey };
  const link =
    apiKey === "homepage"
      ? "/"
      : resolveLink(item.attributes, item.attributes.slug[locale], locale);
  return link;
}

console.log("getItem:", item.attributes);
console.log("getlocale:", locale);
console.log("getItem.slug:", item.attributes.slug[locale]);

export default async function handler(req, res) {
  // setup CORS permissions
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");
  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  // console.info("req.body", req.body);
  const url = await generatePreviewUrl(req.body);
  if (!url) {
    return res.status(200).json({ previewLinks: [] });
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  {
    console.log("getUrl:", url);
    console.log("getBaseUrl:", baseUrl);
  }
  const previewLinks = [
    // Public URL:
    {
      label: "Published version",
      url: `${baseUrl}${url}`,
    },
    // >This requires an API route on your project that starts Next.js Preview Mode
    // and redirects to the URL provided with the `redirect` parameter:
    {
      label: "Draft version",
      url: `${baseUrl}/api/preview?redirect=${url}`,
    },
  ];
  return res.status(200).json({ previewLinks });
}
