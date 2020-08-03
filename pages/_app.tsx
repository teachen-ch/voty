import "chota";
import "../styles/voty.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen">«Teachen!»</a>
      </p>
      <p>
        <img src="/pf_logo.png" alt="Prototypefund Logo" className="logo" />
        mit tatkräftiger Unterstützung durch den&nbsp;
        <a href="https://prototypefund.opendata.ch" target="_blank">
          PrototypeFund.ch
        </a>
      </p>

      <nav>
        <a href="/impressum">Impressum</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/datenschutz">Datenschutz</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="/kontakt">Kontakt</a>
      </nav>
    </footer>
  );
}

export default MyApp;
