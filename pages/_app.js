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
              "countryDetection":true,
              "enableUspr":true,
              "lang":"${locale}",
              "perPurposeConsent":true,
              "siteId":${IUBENDA_SITE_ID},
              "cookiePolicyId":"${t("cookiePolicyId", locale)}",
              purposes: "1, 3, 4",
              "banner":{
                "acceptButtonColor":"#FF6A6C",
                "acceptButtonDisplay":true,
                "backgroundColor":"#4637F1",
                "brandBackgroundColor":"#4637F1",
                "closeButtonRejects":true,
                "customizeButtonColor":"#FF6A6C",
                "customizeButtonDisplay":true,
                "logo":"https://www.datocms-assets.com/9862/1682511229-white.svg",
                "position":"float-bottom-center",
                "rejectButtonColor":"#FF6A6C",
                "rejectButtonDisplay":true,
                "slideDown":false
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
