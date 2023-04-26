import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as TeamIndex } from "pages/chi-siamo/team/index.js";
export default TeamIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getTeamIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.teamIndex,
      allItems: response.allTeamMembers,
      site,
    },
  };
}
