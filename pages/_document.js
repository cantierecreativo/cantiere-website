import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const GTM_2 = process.env.NEXT_PUBLIC_GTM_2;
  return (
    <Html lang="it">
      <Head>
        <script
          async
          src="https://s.widgetwhats.com/wwwa.js"
          data-wwwa="24811"
        ></script>
        {GTM_2 && process.env.NEXT_PUBLIC_ENV !== "staging" && (
          <>
            <script
              type="plain/text"
              className="_iub_cs_activate"
              id="google-tag-manager"
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
