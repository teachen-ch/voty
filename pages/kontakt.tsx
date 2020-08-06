import Head from "next/head";
import Newsletter from "../components/Newsletter";

export default function Kontakt() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <div>
      <Head>
        <title>voty - Kontakt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-800">
        <h1>voty</h1>
        <h2>Kontakt</h2>
        <p>
          Für Feedback, Anregungen und Fragen dürft ihr uns gerne per Email
          kontaktieren:
        </p>
        <br />
        <p>
          <a onClick={sendMail} role="button" className="button primary">
            Email senden
          </a>
        </p>
        <br />

        <div className="card bg-light" id="newsletter">
          <header>
            <h3>Möchtet ihr regelmässig über «voty» informiert werden?</h3>
          </header>
          <Newsletter />
        </div>
      </main>
    </div>
  );
}
