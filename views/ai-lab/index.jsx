import Layout from "components/layout/Layout";
import * as queries from "lib/queries";
import fetchData from "lib/dato";
import HeroBlue from "components/hero/HeroBlue";
import LabSections from "components/lab/LabSections";
import LabIndexJsonLd from "components/lab/LabIndexJsonLd";

export default function LabIndex({ locale, site, page }) {
  // Ogni frase del titolo va a capo, l'ultima è evidenziata.
  const lines = page.title.split(/(?<=\.)\s+/);
  return (
    <Layout site={site} locale={locale} page={page} headerTxt="white">
      <LabIndexJsonLd page={page} locale={locale} />
      <HeroBlue
        page={{
          title: (
            <>
              <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-white/80 md:text-base">
                {page.eyebrow}
                <span className="sr-only">:</span>{" "}
              </span>
              {lines.map((line, i) => (
                <span key={i} className={`block text-balance ${i > 0 && i === lines.length - 1 ? "mt-2 text-yellow" : ""}`}>
                  {line}{" "}
                </span>
              ))}
            </>
          ),
          abstract: page.abstract,
        }}
        abstractTag="div"
      />
      <LabSections sections={page.sections} locale={locale} />
    </Layout>
  );
}

export async function getStaticProps({ locale = "it", preview }) {
  const response = await fetchData(queries.getLabIndex, { locale }, preview);
  if (!response.labIndex) return { notFound: true };
  const site = await fetchData(queries.site, { locale });
  return { props: { locale, site, page: response.labIndex } };
}
