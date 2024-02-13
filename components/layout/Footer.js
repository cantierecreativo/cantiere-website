import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import t from "lib/locales";
import { resolveLink } from "lib/utils";
import Script from "next/script";
import ExternalLink from "components/links/ExternalLink";
import InternalLink from "components/links/InternalLink";
import SocialList from "components/blocks/SocialList";


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
          <nav className="grid grid-cols-2 md:flex md:gap-4 gap-2 gap-y-8 justify-between pb-6   xl:grid xl:grid-cols-5">
            {menu.menuFirstLevels.slice(0, 4).map((item) => (
              <>
                {item.label ? (
                  item.hide ? null : (
                    <InternalLink
                      locale={locale}
                      element={item.link}
                      label={item.label}
                      className="font-bold text-sm block py-1.5"
                    >
                      {item.label}
                    </InternalLink>
                  )
                ) : (
                  <div className="">
                    <div className="font-bold text-sm py-1 pb-3">
                      {item.mainLabel}
                    </div>
                    {item.menuItems.map((item) => (
                      <div key={item.id}>
                        <InternalLink
                          locale={locale}
                          element={item.link}
                          label={item.label}
                          className="text-sm block py-1.5"
                        >
                          {item.label}
                        </InternalLink>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
            <div className="">
              <div className="font-bold text-sm py-1 pb-3">
                {t("contacts", locale)}
              </div>
              <ExternalLink
                url="mailto:info@cantierecreativo.net"
                label="Email"
                className="text-sm block py-1.5"
              >
                info@cantierecreativo.net
              </ExternalLink>
              <ExternalLink
                url="https://goo.gl/maps/1ryVbBc5zSoimBr57"
                label="Google Maps"
                className="text-sm block py-1.5"
              >
                Via Botticini 3 - 50143 Firenze (FI)
              </ExternalLink>
              <ExternalLink
                url="tel:+390555387851"
                label={t("phone", locale)}
                className="text-sm block py-1.5"
              >
                Tel: +39 055 5387851 (Lun-Ven, 9-13 e 14-18)
              </ExternalLink>
            </div>
          </nav>
          {/* <nav className="xl:grid xl:grid-cols-5 grid grid-cols-2 md:flex md:gap-4 gap-2 gap-y-8 justify-between py-6 custom-border-bottom">
            <div className="">
              <div className="font-bold text-sm py-1 pb-3">
                {t("solutions", locale)}
              </div>
              {allSolutions.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-sm block py-1.5"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-sm py-1 pb-3">
                {t("services", locale)}
              </div>
              {allServices.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-sm block py-1.5"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-sm py-1 pb-3">
                {t("technologies", locale)}
              </div>
              {allTechnologies.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-sm block py-1.5"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-sm py-1 pb-3">
                {t("methods", locale)}
              </div>
              {allMethods.map((item) => (
                <div key={item.id}>
                  <InternalLink
                    locale={locale}
                    element={item}
                    label={item.title}
                    className="text-sm block py-1.5"
                  >
                    {item.menuLabel}
                  </InternalLink>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-sm py-1 pb-3">
                {t("contacts", locale)}
              </div>
              <ExternalLink
                url="mailto:info@cantierecreativo.net"
                label="Email"
                className="text-sm block py-1.5"
              >
                info@cantierecreativo.net
              </ExternalLink>
              <ExternalLink
                url="https://goo.gl/maps/1ryVbBc5zSoimBr57"
                label="Google Maps"
                className="text-sm block py-1.5"
              >
                Via Botticini 3 - 50143 Firenze (FI)
              </ExternalLink>
              <ExternalLink
                url="tel:+390555387851"
                label={t("phone", locale)}
                className="text-sm block py-1.5"
              >
                Tel: +39 055 5387851 (Lun-Ven, 9-13 e 14-18)
              </ExternalLink>
            </div>
          </nav> */}

          <div className="mt-3 pt-3 border-t border-dashed border-black flex flex-col sm:flex-row md:flex-wrap justify-between gap-4 text-base md:text-lg">
            <SocialList />
          </div>
          <div className="mt-3 pt-6 border-t border-dashed	border-black">
            <div className="lg:flex lg:justify-between space-y-3 lg:space-y-0 lg:gap-6 text-xs">
              <div className="">{info.join(" - ")}
                <ExternalLink
                  url="https://www.datocms.com"
                  label="DatoCMS Headless CMS"
                >
                  <span> - </span>Made with DatoCMS
                </ExternalLink>
              </div>
              <div className="">
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={`${t("externaLink", locale)} Privacy Policy`}
                  className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200"
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
                <span className="px-1"> - </span>
                <Link
                  href={`https://www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={t("privacyPreferences", locale)}
                  className="iubenda-cs-preferences-link iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200"
                >
                  {t("privacyPreferences", locale)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
