import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import t from "lib/locales";
import { resolveLink } from "lib/utils";
import Script from "next/script";
import ExternalLink from "components/links/ExternalLink";
import InternalLink from "components/links/InternalLink";

export default function Footer({ locale, site }) {
  const { menu, allSolutions, allServices, allTechnologies, allMethods } = site;
  const year = new Date().getFullYear();
  const info = ["©" + year + " Cantiere Creativo Srl", "P.Iva 05210970488"];
  return (
    <>
      <footer
        id="footer"
        data-datocms-noindex
        className=" bg-white z-30 relative"
      >
        <div className="container py-6 pt-8 xl:pt-16">
          <nav className="grid grid-cols-2 md:flex md:gap-4 gap-2 gap-y-8 justify-between pb-6 custom-border-bottom xl:grid xl:grid-cols-6">
            {menu.menuFirstLevels.map((item) => (
              <>
                {item.label ? (
                  item.hide ? null : (
                    <InternalLink
                      locale={locale}
                      element={item.link}
                      label={item.label}
                      className="font-bold text-xs block py-1"
                    >
                      {item.label}
                    </InternalLink>
                  )
                ) : (
                  <div className="">
                    <div className="font-bold text-xs py-1 pb-3">
                      {item.mainLabel}
                    </div>
                    {item.menuItems.map((item) => (
                      <div key={item.id}>
                        <InternalLink
                          locale={locale}
                          element={item.link}
                          label={item.label}
                          className="text-xs block py-1"
                        >
                          {item.label}
                        </InternalLink>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </nav>
          <nav className="xl:grid xl:grid-cols-6 grid grid-cols-2 md:flex md:gap-4 gap-2 gap-y-8 justify-between py-6 custom-border-bottom">
            <div className="">
              <div className="font-bold text-xs py-1 pb-3">
                {t("solutions", locale)}
              </div>
              {allSolutions.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-xs block py-1"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-xs py-1 pb-3">
                {t("services", locale)}
              </div>
              {allServices.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-xs block py-1"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-xs py-1 pb-3">
                {t("technologies", locale)}
              </div>
              {allTechnologies.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-xs block py-1"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-xs py-1 pb-3">
                {t("methods", locale)}
              </div>
              {allMethods.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-xs block py-1"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-xs py-1 pb-3">
                {t("contacts", locale)}
              </div>
              <ExternalLink
                url="mailto:info@cantierecreativo.net"
                label="Email"
                className="text-xs block py-1"
              >
                info@cantierecreativo.net
              </ExternalLink>
              <ExternalLink
                url="https://www.google.it/maps/place/Cantiere+Creativo+-+Siti+web+Firenze/@43.769635,11.21525,17z/data=!3m1!4b1!4m2!3m1!1s0x132a512cfd40a6d7:0xab02d55f2e455d26"
                label="Google Maps"
                className="text-xs block py-1"
              >
                Via F. Botticini, 3 50143 - Firenze
              </ExternalLink>
              <ExternalLink
                url="tel:+393501083703"
                label={t("phone", locale)}
                className="text-xs block py-1"
              >
                Tel: +39 350 108 3703
              </ExternalLink>
            </div>
          </nav>

          <div className="pt-6">
            <div className="lg:flex lg:justify-center lg:gap-6 text-xs">
              <div className="">{info.join(" - ")}</div>
              <ExternalLink
                url="https://www.datocms.com"
                label="DatoCMS Headless CMS"
              >
                Made with DatoCMS
              </ExternalLink>
              <div className="">
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={`${t("externaLink", locale)} Privacy Policy`}
                  className="iubenda-cs-preferences-link duration-200"
                >
                  Privacy Policy
                </Link>
                <span className="px-1"> - </span>
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}/cookie-policy`}
                  title={`${t("externaLink", locale)} Cookie Policy`}
                  className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
