import Link from "next/link";
import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import { useEffect, useState } from "react";
import t from "lib/locales";

function Template404({ site }) {
  const [locale, setLocale] = useState();

  useEffect(() => {
    const lang = () =>
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.userLanguage ||
          navigator.language ||
          navigator.browserLanguage ||
          "en";
    if (lang().indexOf("it") !== -1) {
      setLocale("it");
    } else {
      setLocale("en");
    }
  }, []);

  return (
    <Layout site={site} locale={locale} page="404">
      <div className="">
        <div className="container lg:py-12 xl:py-20">
          <div className="">
            <div className="">
              <div className="">{t("404title", locale)}</div>
            </div>
            <h1 className="">{t("404text", locale)}</h1>
            <Link href="/" legacyBehavior>
              <span className="">{t("404cta", locale)}</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "it" }) {
  const site = await fetchData(queries.site, { locale });
  return {
    props: {
      locale,
      site,
    },
  };
}

export default Template404;
