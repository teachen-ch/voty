import "chota";
import "../styles/voty.css";
import Head from "next/head";
import Menu from "../components/Menu";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen" className="underline">
          «Teachen!»
        </a>
      </p>
      <p>
        mit tatkräftiger Unterstützung durch den
        <br />
        <a
          href="https://prototypefund.opendata.ch"
          target="_blank"
          className="underline"
        >
          PrototypeFund
        </a>
      </p>

      <a href="https://prototypefund.opendata.ch" target="_blank">
        <img
          src="/images/pf_logo.png"
          alt="Prototypefund Logo"
          style={{ width: "40px" }}
        />
      </a>

      <hr />

      <nav>
        <a href="/user/login">Anmelden / Login</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/impressum">Impressum</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/datenschutz">Datenschutz</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/kontakt">Kontakt</a>
      </nav>
      <br />
    </footer>
  );
}

function Header() {
  return (
    <Head>
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
    </Head>
  );
}
export default MyApp;
