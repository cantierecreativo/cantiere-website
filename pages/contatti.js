import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ContactTmp from "components/templates/ContactTmp";
import PostContent from "components/PostContent";

export default function Contact({ locale, site, page }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.newsIndex}>
      <ContactTmp locale={locale} page={page}>
        <div className="formatted-text vertical-spaces">
          {page.blocks.map((b) => (
            <PostContent key={b.id} record={b} locale={locale} />
          ))}
        </div>
      </ContactTmp>
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getContactPage, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.contactsIndex,
      site,
    },
  };
}
