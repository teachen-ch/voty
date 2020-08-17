import Head from "next/head";
import Newsletter from "components/Newsletter";
import Page from "components/Page";

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
      <h1>Newsletter</h1>

      <p className="marginBottom">&nbsp;</p>
      <div className="card" id="newsletter">
        <header>
          <h2>Möchtet ihr regelmässig über «voty» informiert werden?</h2>
        </header>
        <Newsletter />
      </div>
    </Page>
  );
}
