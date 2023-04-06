import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import Link from "next/link";
import { resolveLink } from "lib/utils";

export default function IndexBlog({ locale, site, page, tags }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <div className="container py-20 text-5xl border-t">
        <p>Title: {page.title}</p>
        <p>Model: {page.model}</p>
        <ul className="pt-5 mt-5 text-xl border-t">
          ELENCO tag
          {tags.map((c) => (
            <li key={c.id}>
              <Link
                href={resolveLink(c, locale)}
                title=""
                className=""
                legacyBehavior
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(
    queries.getArticlesIndex,
    { locale },
    preview
  );
  const tags = await fetchData(queries.getAllArticleTags, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.articlesIndex,
      tags: tags.allArticleTags,
      site,
    },
  };
}
