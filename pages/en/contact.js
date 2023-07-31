import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as Contact } from "pages/contatti.js";
export default Contact;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getContactPage, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.contactsIndex,
      solutions: response.allSolutions,
      site,
    },
  };
}
