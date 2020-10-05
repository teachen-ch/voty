import Head from "next/head";
import { ReactElement } from "react";
export function Header(): ReactElement {
  return (
    <Head>
      <Icons />
      <Stats />
    </Head>
  );
}

function Icons() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d9000d" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#d9000d" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}

function Stats() {
  //return process.env.NEXT_PUBLIC_ENV === "production" ?
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `

    var _paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://stats.teachen.ch/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '2']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  
  `,
      }}
    />
  ); // : null;
}
