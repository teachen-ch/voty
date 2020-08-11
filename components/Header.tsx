import Head from "next/head";
export function Header() {
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
      <link rel="icon" href="/images/favicon16.png" sizes="16x16" />
      <link rel="icon" href="/images/favicon32.png" sizes="32x32" />
      <link rel="icon" href="/images/favicon192.png" sizes="192x192" />
      <link rel="apple-touch-icon" href="/images/favicon16.png" sizes="16x16" />
      <link rel="apple-touch-icon" href="/images/favicon32.png" sizes="32x32" />
      <link
        rel="apple-touch-icon"
        href="/images/favicon192.png"
        sizes="192x192"
      />
    </>
  );
}

function Stats() {
  return process.env.NEXT_PUBLIC_ENV === "production" ? (
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
  ) : null;
}
