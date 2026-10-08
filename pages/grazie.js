import Link from "next/link";
import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import t from "lib/locales";

function ThankyouPage({ site, locale }) {
  return (
    <Layout site={site} locale={locale} page="404">
      <div className="pt-24 pb-12">
        <div className="container lg:py-12 xl:py-20">
          <div className="">
            <div className="">
              <div className="lg:text-4xl text-2xl text-blue pb-3">
                {t("formSuccessTitle", locale)}
              </div>
            </div>
            <h1 className="text-lg lg:py-4">{t("formSuccessText", locale)}</h1>
            <Link className="mt-4 block" href="/">
              <span className="underline-default after:bg-black">
                {t("404cta", locale)}
              </span>
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

export default ThankyouPage;
