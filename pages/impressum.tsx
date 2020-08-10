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
      <h1>Impressum</h1>
      <p>
        Voty ist ein Projekt des Vereins{" "}
        <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
      </p>
      <div className="margin-bottom">
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
