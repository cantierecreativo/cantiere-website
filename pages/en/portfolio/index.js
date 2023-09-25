import * as queries from "lib/queries";
import fetchData from "lib/dato";

import { default as WorksIndex } from "pages/portfolio/index.js";
export default WorksIndex;

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchData(queries.getWorksIndex, { locale }, preview);
  const site = await fetchData(queries.site, { locale });
  const {
    _allWorksMeta: { count },
  } = await fetchData(queries.getWorksCount, { locale }, preview);
  const maxPages = Math.ceil(count / 24);
  let works = {};
  let page = 0;

  while (page < maxPages) {
    const { allWorks } = await fetchData(
      queries.getAllWorksPaged,
      {
        locale,
        offset: page * 24,
        first: 24,
      },
      preview
    );
    works[page + 1] = allWorks;
    page++;
  }
  return {
    props: {
      locale,
      page: response.worksIndex,
      items: { works },
      site,
    },
  };
}
