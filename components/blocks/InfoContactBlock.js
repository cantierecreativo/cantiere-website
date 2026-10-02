import ExternalLink from "components/links/ExternalLink";
import SocialList from "components/blocks/SocialList";
import t from "lib/locales";

export default function InfoContactBlock({ locale, record }) {
  const urlClass = "hover:text-blue duration-200";
  return (
    <>
      <section className="container">
        <div className="grid gap-6 md:grid-cols-12 pb-10">
          <div className="md:col-span-5 md:col-start-1 lg:col-start-2">
            <p className="text-base">{t("address", locale)}</p>
            <p className="text-lg lg:text-xl pt-1">
              Cantiere Creativo Srl
              <br /> Via Botticini, 3 <br /> 50143 Firenze - Italy
            </p>
          </div>
          <div className="md:col-start-7 md:col-span-5 grid gap-6 lg:gap-8">
            <div className="">
              <p className="text-base">{t("email", locale)}</p>
              <ExternalLink
                url="mailto:info@cantierecreativo.net"
                label={t("address", locale)}
                className="text-lg block pt-1"
              >
                <span className={urlClass}>info@cantierecreativo.net</span>
              </ExternalLink>
            </div>
            <div>
              <p className="text-base">PEC</p>
              <ExternalLink
                url="mailto:cantierecreativo@pec.it"
                label="PEC"
                className="text-lg block pt-1"
              >
                <span className={urlClass}>cantierecreativo@pec.it</span>
              </ExternalLink>
            </div>
            <div>
              <p className="text-base">{t("phone", locale)}</p>
              <ExternalLink
                url="tel:+390555387851"
                label={t("phone", locale)}
                className="text-lg block pt-1"
              >
                <span className={urlClass}>
                  {t("phoneHours", locale)}
                </span>
              </ExternalLink>
            </div>
            <div>
              <p className="text-base">{t("socialMedia", locale)}</p>
              <div className="flex flex-col md:flex-row flex-wrap gap-1 pt-2 md:gap-x-4 grid-col-1 col-start-1 text-lg">
                <SocialList/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
