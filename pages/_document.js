import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <Script async src="https://s.widgetwhats.com/wwwa.js" data-wwwa="24811"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
