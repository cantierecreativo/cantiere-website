import ExternalLink from "components/links/ExternalLink";
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
              Cantiere Creativo Srl<br /> Via Garibaldi, 15 <br /> 05143
              Firenze - Italy
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
                url="tel:+393501083703"
                label={t("phone", locale)}
                className="text-lg block pt-1"
              >
                <span className={urlClass}>Tel: +39 350 108 3703 (Lun-Ven, 9-13 e 14-18)</span>
              </ExternalLink>
            </div>
            <div>
              <p className="text-base">Social Media</p>
              <div className="flex flex-col md:flex-row flex-wrap gap-1 pt-2 md:gap-x-4 grid-col-1 col-start-1">
                <ExternalLink
                  url="https://twitter.com/teamcantiere"
                  label="Twitter"
                  className={urlClass}
                >
                  <span className="text-lg md:pt-1 md:pb-9">Twitter</span>
                </ExternalLink>
                <ExternalLink
                  url="https://www.linkedin.com/company/cantiere-creativo/mycompany/?viewAsMember=true"
                  label="Linkedin"
                  className={urlClass}
                >
                  <span className="text-lg md:pt-1 md:pb-9">Linkedin</span>
                </ExternalLink>
                <ExternalLink
                  url="https://www.instagram.com/cantiere_creativo_/"
                  label="Instagram"
                  className={urlClass}
                >
                  <span className="text-lg  md:pt-1 md:pb-9">Instagram</span>
                </ExternalLink>
                <ExternalLink
                  url="https://www.facebook.com/cantierecreativo"
                  label="Facebook"
                  className={urlClass}
                >
                  <span className="text-lg pt-0 md:pt-1 md:pb-9">Facebook</span>
                </ExternalLink>
                <ExternalLink
                  url="https://medium.com/cantiere-creativo"
                  label="Medium"
                  className={urlClass}
                >
                  <span className="text-lg pt-0 md:pt-1 md:pb-9">Medium</span>
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
