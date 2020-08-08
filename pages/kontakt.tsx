import Head from "next/head";
import Newsletter from "../components/Newsletter";
import Page from "../components/Page";

export default function Kontakt() {
  function sendMail() {
    const email = "hc.nehcaet@ytov:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page>
      <Head>
        <title>voty - Kontakt</title>
      </Head>
      <h2>Kontakt</h2>
      <p className="text-center">
        Für Feedback, Anregungen und Fragen freuen wir uns auf eure Email:
      </p>
      <p className="text-center">
        <a onClick={sendMail} role="button" className="button primary">
          Email öffnen
        </a>
      </p>
      <br />

      <div className="bg-light padding-2" id="newsletter">
        <header>
          <h3>Möchtet ihr regelmässig über «voty» informiert werden?</h3>
        </header>
        <Newsletter />
      </div>
    </Page>
  );
}
