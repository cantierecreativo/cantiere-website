const API_KEY = process.env.NEXT_PUBLIC_DATO_API_KEY;
const DATO_ENV = process.env.NEXT_PUBLIC_DATO_ENV;

const MAX_RETRIES = 5;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function fetchData(q, v = null, preview = false) {
  try {
    let response;
    // The build prerenders both locales; retry when DatoCMS rate-limits instead of rendering an empty page.
    for (let attempt = 0; ; attempt++) {
      response = await fetch(
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
      if (response.status !== 429 || attempt >= MAX_RETRIES) break;
      const reset = Number(response.headers.get("x-ratelimit-reset"));
      await sleep((reset > 0 ? reset * 1000 : 1000 * 2 ** attempt) + Math.random() * 500);
    }
    if (!response.ok) {
      throw new Error(`DatoCMS responded ${response.status} ${response.statusText}`);
    }
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
