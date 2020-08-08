import Head from "next/head";
import Page from "../components/Page";

export default function Impressum() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page>
      <Head>
        <title>voty - Datenschutz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Impressum</h2>
      <p>
        Voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
      </p>
      <div className="marginBottom">
        <pre>
          Verein «Teachen!»
          <br />
          Alpenweg 11
          <br />
          3110 Münsingen
        </pre>
      </div>
      <p>
        <a onClick={sendMail} role="button" className="button primary">
          Email senden
        </a>
      </p>
    </Page>
  );
}
