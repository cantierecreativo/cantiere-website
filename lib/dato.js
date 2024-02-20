const API_KEY = process.env.NEXT_PUBLIC_DATO_API_KEY;
const DATO_ENV = process.env.NEXT_PUBLIC_DATO_ENV;

export default async function fetchData(q, v = null, preview = false) {
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
