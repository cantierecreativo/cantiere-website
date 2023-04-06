import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import t from "lib/locales";
import { resolveLink } from "lib/utils";
import Script from "next/script";
import ExternalLink from "components/links/ExternalLink";
import InternalLink from "components/links/InternalLink";

export default function Footer({ locale, site }) {
  const data = site.footer;
  const year = new Date().getFullYear();
  const info = ["©" + year + " Cantiere Creativo Srl", "P.Iva 05210970488"];
  return (
    <>
      <footer
        id="footer"
        data-datocms-noindex
        className="border-t border-black"
      >
        <div className="border-y border-white">
          <div className="mx-auto xl:container">
            <div className="lg:flex xl:justify-between">
              <div className="">{info.join(" - ")}</div>
              <ExternalLink
                url="https://www.datocms.com"
                label="DatoCMS Headless CMS"
              >
                Made with DatoCMS
              </ExternalLink>
              <div className="">
                <Link
                  href={`//www.iubenda.com/privacy-policy/${t(
                    "cookiePolicyId"
                  )}`}
                  title={`${t("externaLink", locale)} Privacy Policy`}
                  className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe duration-200"
                >
                  Privacy Policy
                </Link>
                <span className="px-1"> - </span>
                <Link
                  href={`//www.iubenda.com/privacy-policy/${t(
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
