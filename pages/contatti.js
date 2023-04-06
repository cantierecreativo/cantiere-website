import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import FormBlock from "components/blocks/FormBlock";

export default function Contact({ locale, site, page }) {
  return (
    <Layout site={site} locale={locale} page={page}>
      <div className="container py-20 text-5xl border-t">
        <p>{page.title}</p>
        <p>{page.model}</p>
      </div>
      <FormBlock locale={locale} />
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
