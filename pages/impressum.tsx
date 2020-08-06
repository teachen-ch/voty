import Head from "next/head";

export default function Impressum() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <div>
      <Head>
        <title>voty - Datenschutz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-800">
        <h1>voty</h1>
        <h2>Impressum</h2>
        <p>
          Voty ist ein Projekt des Vereins{" "}
          <a href="https://teachen.ch/verein-teachen/">«Teachen!»</a>
        </p>
        <blockquote>
          Verein «Teachen!»
          <br />
          Alpenweg 11
          <br />
          3110 Münsingen
        </blockquote>

        <a onClick={sendMail} role="button" className="button primary">
          Email senden
        </a>
        <p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
      </main>
    </div>
  );
}
