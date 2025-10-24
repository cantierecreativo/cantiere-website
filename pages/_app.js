import Script from "next/script";
import "/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

import t from "lib/locales";

const IUBENDA_SITE_ID = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const locale = pathname.indexOf("en") !== -1 ? "en" : "it";

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: url,
        });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      {IUBENDA_SITE_ID && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <>
          <Script
            id="iubenda-cs"
            src="//cdn.iubenda.com/cs/iubenda_cs.js"
            strategy="beforeInteractive"
          />
          <Script
            id="iubenda-config"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "askConsentAtCookiePolicyUpdate":true,
              "countryDetection":true,
              "enableUspr":true,
              "enableLgpd":true,
              "lang":"${locale}",
              "perPurposeConsent":true,
              "siteId":${IUBENDA_SITE_ID},
              "cookiePolicyId":"${t("cookiePolicyId", locale)}",
              purposes: "1, 3, 4",
              "banner":{
                "acceptButtonColor":"#4637F1",
                "acceptButtonDisplay":true,
                "backgroundColor":"#EBEBEB",
                "brandBackgroundColor":"#EBEBEB",
                "closeButtonRejects":true,
                "customizeButtonColor":"#4637F1",
                "customizeButtonDisplay":true,
                "brandTextColor":"#000000",
                "logo":"https://www.cantierecreativo.net/logos/color.svg",
                "position":"float-bottom-center",
                "rejectButtonColor":"#4637F1",
                "rejectButtonDisplay":true,
                "explicitWithdrawal":true,
                "listPurposes":true,
                "slideDown":false,
                "linksColor":"#000000",
                "showPurposesToggles":true,
                "textColor":"#000000"
              }
            }`,
            }}
          />
          <Script
            id="active-modal-cookie"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
            }}
          />
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
