export default async function handler(req, res) {
  const HOST = process.env.NEXT_PUBLIC_HOST || "";
  res.setPreviewData({});
  let path = req.query.redirect || "/";
  let splitUrl = path.split("/").filter(Boolean);
  let slug = splitUrl.at(-1);

  // Clear Netlify cache by tag
  if (slug) {
    try {
      await fetch(`${HOST}/.netlify/functions/purge-cache`, {
        method: "POST",
        body: JSON.stringify({ tags: [slug] }),
      });
    } catch (err) {
      console.error(`Unable to purge cache by tag: ${slug}`, err);
    }
  }

  // Redirect to the path from the fetched post
  // res.redirect(path);
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.setPreviewData({});
  res.writeHead(307, { Location: `${path}` });
  res.end();
}
