import Script from "next/script";
import "/styles/globals.css";
import { useRouter } from "next/router";

import t from "lib/locales";

const GTM = process.env.NEXT_PUBLIC_GTM;
const GTM_2 = process.env.NEXT_PUBLIC_GTM_2;
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

      {GTM_2 && process.env.NEXT_PUBLIC_ENV !== "staging" && (
        <>
          <script
            type="plain/text"
            className="_iub_cs_activate"
            data-iub-purposes="4"
            dangerouslySetInnerHTML={{
              __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),service:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-${GTM_2}');
        `,
            }}
          />
          <noscript
            type="text/plain"
            className="_iub_cs_activate"
            data-iub-purposes="4"
          >
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-${GTM_2}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </>
      )}
    </>
  );
}

export default MyApp;
