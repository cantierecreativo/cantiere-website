import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import ContactTmp from "components/templates/ContactTmp";
import PostContent from "components/PostContent";
import InfoContanctBlock from "components/blocks/InfoContactBlock";

export default function Contact({ locale, site, page, services }) {
  return (
    <Layout site={site} locale={locale} page={page} parent={site.newsIndex}>
      <ContactTmp locale={locale} page={page}>
        <div className="vertical-spaces">
          {page.blocks.map((b) => (
            <PostContent
              key={b.id}
              record={b}
              locale={locale}
              services={services}
            />
          ))}
        </div>
      </ContactTmp>
      <InfoContanctBlock></InfoContanctBlock>
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
      services: response.allServices,
      site,
    },
  };
}
