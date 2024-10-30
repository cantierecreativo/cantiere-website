import type { Context } from "@netlify/functions";
import { purgeCache } from "@netlify/functions";

export default async (request: Request, context: Context) => {
  const body = await request.json();
  const { tags } = body || {};

  if (tags) {
    try {
      await purgeCache({ tags });
      console.log("Purged ", JSON.stringify(tags));
      return new Response(`Purged tags: ${JSON.stringify(tags)}`, { status: 202 });
    } catch (err) {
      return new Response(err, { status: 500 });
    }
  } else {
    return new Response(`No tags`, { status: 202 });
  }
};
