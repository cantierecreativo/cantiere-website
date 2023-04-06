import Script from "next/script";
import "/styles/globals.css";
import { useRouter } from "next/router";

import t from "lib/locales";

const GTM = process.env.NEXT_PUBLIC_GTM;
const IUBENDA_SITE_ID = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const locale = pathname.indexOf("en") !== -1 ? "en" : "it";

  return (
    <>
      <Component {...pageProps} />
      {IUBENDA_SITE_ID && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <Script id="iubenda-cs" src="//cdn.iubenda.com/cs/iubenda_cs.js" />
      )}
      {IUBENDA_SITE_ID && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <Script
          id="iubenda"
          dangerouslySetInnerHTML={{
            __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "lang":"${locale}",
            "siteId":${IUBENDA_SITE_ID},
            "cookiePolicyId":"${t("cookiePolicyId", locale)}",
            perPurposeConsent: true,
            consentOnContinuedBrowsing: false,
            consentOnDocument: true,
            purposes: "1, 3, 4",
            "banner":{
              "acceptButtonDisplay":true,
              "customizeButtonDisplay":true,
              "position":"float-bottom-right",
              "closeButtonDisplay":false,
              "acceptButtonColor":"#6d5b31",
              "acceptButtonCaptionColor":"white",
              "customizeButtonColor":"#6d5b31",
              "customizeButtonCaptionColor":"white",
              "rejectButtonColor":"#6d5b31",
              "rejectButtonCaptionColor":"white",
              "textColor":"#ffffff",
              "backgroundColor":"#27231B",
              "rejectButtonDisplay":true,
              "closeButtonRejects":true,
              "showPurposesToggles":true
            },
            callback: {
              onPreferenceExpressedOrNotNeeded: function(preference) {
                window.consentIsGiven = preference;
              }
            }
          }`,
          }}
        />
      )}

      {IUBENDA_SITE_ID && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <Script
          id="active-modal-cookie"
          dangerouslySetInnerHTML={{
            __html: `(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
          }}
        />
      )}

      {GTM && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <Script
          type="plain/text"
          className="_iub_cs_activate"
          data-iub-purposes="4"
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM}`}
        />
      )}

      {GTM && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <Script
          id="google-analytics-script"
          type="plain/text"
          className="_iub_cs_activate"
          data-iub-purposes="4"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTM}', {
          page_path: window.location.pathname,
        });
        `,
          }}
        />
      )}
    </>
  );
}

export default MyApp;
